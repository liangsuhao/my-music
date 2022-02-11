import React, {useState} from "react";
import { connect } from "react-redux";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import style from './Player.module.scss';

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {};
}

let Player = (props) => {

  const [playerData,setPlayerData] = useState(props.player)

  const formatTrackTime = (value) => {
    if (!value) return '';
    let min = ~~((value / 60) % 60);
    let sec = (~~(value % 60)).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

  return (
    <div className={style.player}>
      <div className="progress-bar">
        <Slider 
        />
      </div>
    </div>
  )
}

Player = connect(mapStateToProps,mapDispatchToProps)(Player);

export default Player;
