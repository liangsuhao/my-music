import React, {useEffect, useMemo, useState, useRef} from "react";
import { connect } from "react-redux";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import style from './Player.module.scss';
import { set } from "lodash";
import { resizeImage } from "../../utils/filter";

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

  return (
    <div className={style.player}>
      <div className="progress-bar">
        <Slider value={playerProgress} onChange={changeProgress}/>
        <div className="setting-bar">
          <div className="setting-left">
            <img
              src={currentTrack.al &&  resizeImage(currentTrack.al.picUrl,224)}
              onClick={goToAlbum}
            />
          </div>
          <div className="setting-middle">

          </div>
          <div className="setting-right">

          </div>
        </div>
      </div>
    </div>
  )
}

Player = connect(mapStateToProps,mapDispatchToProps)(Player);

export default Player;
