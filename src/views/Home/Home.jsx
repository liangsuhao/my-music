import React, { useState, useRef, useEffect } from 'react';
import PicRow from '../../component/PicRow/PicRow'
import DailyTracksCard from '../../component/DailyTracksCard/DailyTracksCard'
import FMCard from '../../component/FMCard/FMCard';
import style from './Home.module.scss';
import { byAppleMusic } from '../../utils/staticData';
import { getRecommendPlaylist, toplists } from '../../api/playlist';
import { toplistOfArtists } from '../../api/artist';

function Home() {
  const [showPlaylistsByAppleMusic,setShowPlaylistsByAppleMusic] = useState(true);
  const [recommendPlaylist,setrecommendPlaylist] = useState({});
  const [recommendArtists, setRecommendArtists] = useState({});
  const [topList, setTopList] = useState({
    items: [],
    ids: [19723756, 180106, 60198, 3812895, 60131],
  });

  useEffect(()=>{
    getRecommendPlaylist({limit: 10}).then((data)=>{
      setrecommendPlaylist({...recommendPlaylist, items: data.result});
    });

    toplistOfArtists().then((data) => {
      let indexs = [];
      while (indexs.length < 6) {
        let tmp = ~~(Math.random() * 100);
        if (!indexs.includes(tmp)) indexs.push(tmp);
      }
      let newRecommendArtists = {};
      newRecommendArtists.indexs = indexs;
      newRecommendArtists.items = data.list.artists.filter((l, index) =>
        indexs.includes(index)
      );
      setRecommendArtists(newRecommendArtists);
    });

    toplists().then(data => {
      topList.items = data.list.filter(l =>
        topList.ids.includes(l.id)
      );
      setTopList({...topList, items: topList.items})
    })
  }, [])

  return (
    <div className={style.homePage}>
      {showPlaylistsByAppleMusic &&
        <div className={style.homeContent}>
          <div className={style.title}>by Apple Music</div>
          <PicRow type="playlist" items={byAppleMusic} sub-text="appleMusic" image-size="1024" />
        </div>}
      <div className={style.homeContent}>
        <div className={style.title}>推荐歌单</div>
        <PicRow type="playlist" items={recommendPlaylist.items} sub-text="appleMusic" image-size="1024"></PicRow>
      </div>
      <div className={style.homeContent}>
        <div className={style.title}>For You</div>
        <div className={style.titleRow}>
          <DailyTracksCard></DailyTracksCard>
          <FMCard></FMCard>
        </div>
      </div>
      <div className={style.homeContent}>
        <div className={style.title}>推荐歌手</div>
        <PicRow type="artist" items={recommendArtists.items} sub-text="appleMusic" image-size="1024" columnNumber="6"></PicRow>
      </div>
      <div className={style.homeContent}>
        <div className={style.title}>排行榜</div>
        <PicRow type="playlist" items={topList.items} sub-text="updateFrequency" image-size="1024"></PicRow>
      </div>
    </div> 
  )
}
export default Home;