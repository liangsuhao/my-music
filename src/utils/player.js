import { getTrackDetail, scrobble, getMP3} from '@/api/track';
import shuffle from 'lodash/shuffle';
import { Howler, Howl } from 'howler';
import { cacheTrackSource, getTrackSource } from '@/utils/db';
import { getAlbum } from '@/api/album';
import { getPlaylistDetail, intelligencePlaylist } from '@/api/playlist';
import { getArtist } from '@/api/artist';
import { personalFM, fmTrash } from '@/api/others';
import store from '@/store';
import { isAccountLoggedIn } from '@/utils/auth';
import { trackUpdateNowPlaying, trackScrobble } from '@/api/lastfm';

export default class {
  constructor() {
    //播放器状态
    this._playing = false; //是否正在播放
    this._progress = 0;  //当前播放的进度
    this._enabled = false;  //是否启用player
    this._repeatMode = 'off';  //off | on | one
    this._shuffle = false;  //false | true
    this._reversed = false;
    this._volume = 1; // 0 to 1
    this._volumeBeforeMuted = 1; //保存静音前的音量
    this._personalFMLoading = false;  //是否在私人FM中加载新的track
    this._personalFMNextLoading = false; // 是否正在缓存私人FM的下一首歌曲

    //播放信息
    this._list = []; // 播放列表
    this._current = 0; // 当前播放歌曲在播放列表里的index
    this._shuffledList = []; // 被随机打乱的播放列表，随机播放模式下会使用此播放列表
    this._shuffledCurrent = 0; // 当前播放歌曲在随机列表里面的index
    this._playlistSource = { type: 'album', id: 123 }; // 当前播放列表的信息
    this._currentTrack = { id: 86827685 }; // 当前播放歌曲的详细信息
    this._playNextList = []; // 当这个list不为空时，会优先播放这个list的歌
    this._isPersonalFM = false; // 是否是私人FM模式
    this._personalFMTrack = { id: 0 }; // 私人FM当前歌曲
    this._personalFMNextTrack = { id: 0 }; // 私人FM下一首歌曲信息（为了快速加载下一首）

    /**
     * The bolb records for cleanup.
     * 
     * @private
     * @type {string[]}
     */
    this.createdBlobRecords = [];

    //howler (https://github.com/goldfire/howler.js) 一些封装的web audio api
    this._howler = null;
    Object.defineProperty(this, '_howler', {
      enumerable: false,
    });

    //初始化
    this._init();

    window.yesplaymusic = {};
    window.yesplaymusic.player = this;
  }

  get repeatMode() {
    return this._repeatMode;
  }

  set repeatMode(mode) {
    if(this._isPersonalFM) return;
    if(!['off','on','one'].includes(mode)) {
      console.warn("repeatMode: invalid args, must be 'on' | 'off' | 'one'");
      return;
    }
    this._repeatMode = mode;
  }

  get shuffle() {
    return this._shuffle;
  }

  set shuffle(shuffle) {
    if(this._isPersonalFM) return;
    if(shuffle !== true && shuffle !== false) {
      console.warn('shuffle: invalid args, must be Boolean');
      return
    }
    this._shuffle = shuffle;
    if(shuffle) {
      this._shuffleTheList();
    }
  }

  get reversed() {
    return this._reversed;
  }

  set reversed(reversed) {
    if(this._isPersonalFM) return;
    if(reversed !== true && reversed !== false) {
      console.warn('reversed: invalid args, must be Boolean');
      return;
    }
    console.log("changing reverse to:".reversed);
    this._reversed = reversed;
  }

  get volume() {
    return this._volume;
  }

  set volume(volume) {
    this.volume = volume;
    Howler.volume(volume);
  }

  get list() {
    return this.shuffle ? this._shuffledList : this._list;
  }

  set list(list) {
    this._list = list;
  }

  get current() {
    return this._current;
  }

  set current(current) {
    if(this.shuffle) {
      this._shuffledCurrent = current;
    } else {
      this._current = current;
    }
  }

  get enabled() {
    return this._enabled;
  }

  get playing() {
    return this._playing;
  }

  get currentTrack() {
    return this._currentTrack;
  }

  get playlistSource() {
    return this._playlistSource;
  }

  get playNextList() {
    return this._playNextList;
  }

  get isPersonalFM() {
    return this._isPersonalFM;
  }

  get personalFMTrack() {
    return this._personalFMTrack;
  }

  get currentTrackDuration() {
    const trackDuration = this._currentTrack.dt || 1000;
    let duration = ~~(trackDuration / 1000);
    return duration > 1 ? duration -1 : duration;
  }

  get progress() {
    return this._progress;
  }

  set progress(value) {
    if (this._howler) {
      this._howler.seek(value);
    }
  }

  // get isCurrentTrackLiked() {
  //   return store.state.liked.songs.includes(this.currentTrack.id);  //待会儿用redux写
  // }

  _init() {
    this._loadSelfFromLocalStorage();
    Howler.autoUnlock = false; //是否在移动设备（Android ios等）上自动启用音频
    Howler.usingWebAudio = true; //是否启用webAudio的api
    Howler.volume(this.volume);
    
    if(this.enabled) {  //如果是启用的话初始化Howler的参数
      //恢复当前播放的歌曲
      this._replaceCurrentTrack(this._currentTrack.id, false).then(() => {
        this._howler?.seek(localStorage.getItem(playerCurrentTrackTime) ?? 0)
      })
      this._initMediaSession();
    }
    this._setIntervals();

    //初始化私人FM
    if(
      this._personalFMTrack.id === 0 ||
      this._personalFMNextLoading.id === 0 || 
      this.personalFMTrack.id === this._personalFMNextTrack.id
    ) {
      personalFM().then(result => {
        this.personalFMTrack = result.data[0];
        this._personalFMNextTrack = result.data[1];
        return this,this.personalFMTrack;
      })
    }
  }
  _setIntervals() {
    // 同步播放进度到localstorge
    // TODO: 如果 _progress 在别的地方被改变了，这个定时器会覆盖之前改变的值，是bug
    setInterval(() => {
      if (this._howler === null) return;
      this._progress = this._howler.seek();
      localStorage.setItem('playerCurrentTrackTime', this._progress);
    }, 1000);
  }

  _replaceCurrentTrack(
    id,
    autoplay = true,
    ifUnplayableThen = 'playNextTrack'
  ) {
    if (autoplay && this._currentTrack.name) {
      this._scrobble(this.currentTrack, this._howler?.seek());
    }
    return getTrackDetail(id).then(data => {
      let track = data.songs[0];
      this._currentTrack = track;
      this._updateMediaSessionMetaData(track);
      return this._getAudioSource(track).then(source => {
        if (source) {
          this._playAudioSource(source, autoplay);
          this._cacheNextTrack();
          return source;
        } else {
          store.dispatch('showToast', `无法播放 ${track.name}`);
          if (ifUnplayableThen === 'playNextTrack') {
            if (this.isPersonalFM) {
              this.playNextFMTrack();
            } else {
              this.playNextTrack();
            }
          } else {
            this.playPrevTrack();
          }
        }
      });
    });
  }

  async _scrobble(track, time, completed = false) {
    console.debug(
      `[debug][Player.js] scrobble track 👉 ${track.name} by ${track.ar[0].name} 👉 time:${time} completed: ${completed}`
    );
    const trackDuration = ~~(track.dt / 1000);
    time = completed ? trackDuration : ~~time;
    scrobble({
      id: track.id,
      sourceid: this.playlistSource.id,
      time,
    });
    if (
      store.state.lastfm.key !== undefined &&
      (time >= trackDuration / 2 || time >= 240)
    ) {
      const timestamp = ~~(new Date().getTime() / 1000) - time;
      trackScrobble({
        artist: track.ar[0].name,
        track: track.name,
        timestamp,
        album: track.al.name,
        trackNumber: track.no,
        duration: trackDuration,
      });
    }
  }

  _initMediaSession() {  //初始化用户设备控件的media的一些方法
    if('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        this.play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        this.pause();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        this.playPrevTrack();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        if(this.isPersonalFM) {
          this.playNextFMTrack();
        } else {
          this.playNextTrack();
        }
      });
      navigator.mediaSession.setActionHandler('stop', () => {
        this.pause();
      });
      navigator.mediaSession.setActionHandler('seekto', event => {
        this.seek(event.seekTime);
        this._updateMediaSessionPositionState();
      });
      navigator.mediaSession.setActionHandler('seekbackward', event => {
        this.seek(this.seek() - (event.seekOffset || 10));
        this._updateMediaSessionPositionState();
      });
      navigator.mediaSession.setActionHandler('seekforward', event => {
        this.seek(this.seek() + (event.seekOffset || 10));
        this._updateMediaSessionPositionState();
      });
    }
  }

  _loadSelfFromLocalStorage() {
    const player = JSON.parse(localStorage.getItem('player'));
    if(!player) return;
    for(const [key,value] of Object.entries(player)) {
      this[key] = value;
    }
  }

}