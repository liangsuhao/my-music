import React, {useEffect, useMemo, useState, useRef} from "react";
import { connect } from "react-redux";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import style from './Player.module.scss';
import { set } from "lodash";
import { resizeImage } from "../../utils/filter";
import SVGIcon from "../../component/SvgIcon/SvgIcon";
import ButtonIcon from "../../component/ButtonIcon/ButtonIcon";
import player from "../../reducers/player";

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {};
}

let Player = (props) => {
  const handler = (v) => {console.log(v);return v;}
  const audioTimer = useRef(null);
  const [playerProgress,setPlayerProgress] = useState(0);
  const [currentTrack,setCurrentTrack] = useState(props.player.currentTrack);
  // const playerValue = useMemo(()=>handler(props.player.progress),[props.player.progress]);

  const formatTrackTime = (value) => {
    if (!value) return '';
    let min = ~~((value / 60) % 60);
    let sec = (~~(value % 60)).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

  const changeProgress = (progress) => {
    props.player._howler.seek(progress);
    setPlayerProgress(props.player.progress);
  }

  const goToAlbum = () => {

  }

  const hasList = () => {

  }

  const goToList = () => {

  }

  const goToArtist = (id) => {

  }

  const goToNextTracksPage = () => {

  }

  useEffect(()=>{
    if(!audioTimer.current) {
      audioTimer.current = setInterval(() => {
        if(props.player.playing) {
          setPlayerProgress(props.player.progress);
          console.log(props.player);
        }
      }, 1000);
    }
  },[])
  console.log(props.player)

  return (
    <div className={style.player}>
      <div className="progress-bar">
        <Slider value={playerProgress} onChange={changeProgress}/>
        <div className={style.settingBar}>
          <div className={style.settingLeft}>
            <img
              src={currentTrack.al &&  resizeImage(currentTrack.al.picUrl,224)}
              onClick={goToAlbum}
            />
            <div className={style.songsName}>
              <div className={style.songsTitle} onClick={hasList() && goToList}>{ currentTrack.name }</div>
              <div className={style.artists}>
                {
                  currentTrack.ar.map((ar,index)=>
                  <span key={ar.id} onClick={ar.id && goToArtist(ar.id)}>
                    <span className={ar.id}>{ar.name}</span>
                    {(index !== currentTrack.ar.length - 1) && <span>, </span>}
                  </span>
                  )
                }
              </div>
            </div>
            <div className={style.likeButton}>
                <SVGIcon iconClass="heart" width="16px" height="16px"></SVGIcon>
            </div>
          </div>
          <div className={style.settingMiddle}>
            <div className={style.middleContainer}>
              <ButtonIcon content={<SVGIcon iconClass="previous" width="16px" height='16px'/>} onClick={props.player.playPrevTrack} />
              {props.player.isPersonalFM && <ButtonIcon content={<SVGIcon iconClass="thumbs-down" width="16px" height='16px'/>} onClick={props.player.moveToFMTrash} />}
              <ButtonIcon content={<SVGIcon iconClass={props.player.playing ? "pause" : "play"} width="20px" height='20px'/>} onClick={props.player.playOrPause} />
              <ButtonIcon content={<SVGIcon iconClass="next" width="16px" height='16px'/>} onClick={props.player.playNextTrack} />
            </div>
          </div>
          <div className={style.settingRight}>

          </div>
        </div>
      </div>
    </div>
  )
}

Player = connect(mapStateToProps,mapDispatchToProps)(Player);

export default Player;
