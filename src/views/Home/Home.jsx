import React, { useState, useRef } from 'react';
import PicRow from '../../component/PicRow/PicRow'
import style from './Home.module.scss';
import { byAppleMusic } from '../../utils/staticData';

function Home() {
  const [showPlaylistsByAppleMusic,setShowPlaylistsByAppleMusic] = useState(true);

  console.log(byAppleMusic);
  return (
    <div className={style.homePage}>
      {showPlaylistsByAppleMusic &&
        <div className={style.homeContent}>
          <div className={style.title}>by Apple Music</div>
          <PicRow type="playList" items={byAppleMusic} sub-text="appleMusic" image-size="1024" />
        </div>}
    </div> 
  )
}
export default Home;