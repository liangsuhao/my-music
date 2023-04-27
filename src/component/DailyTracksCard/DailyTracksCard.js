import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import style from './DailyTracksCard.module.scss'
import { sample } from 'lodash';
import { dailyRecommendTracks } from '../../api/playlist';
import { getDailyTracks } from '../../action';

const mapStateToProps = (state) => {
  return state;
}
const mapDispatchToProps = (dispatch) => {
  return {
    getDailyTracks: () => {
      dispatch(getDailyTracks())
    }
  };
}
let DailyTracksCard = (props) => {
  const [imgSrc, setImgSrc] = useState('');

  const defaultCovers = [
    'https://p2.music.126.net/0-Ybpa8FrDfRgKYCTJD8Xg==/109951164796696795.jpg',
    'https://p2.music.126.net/QxJA2mr4hhb9DZyucIOIQw==/109951165422200291.jpg',
    'https://p1.music.126.net/AhYP9TET8l-VSGOpWAKZXw==/109951165134386387.jpg',
  ];
  
  useEffect(()=>{
    if(!props.dailyTracks) {
      dailyRecommendTracks().then((data)=>{
        setImgSrc(this.dailyTracks[0]?.al.picUrl)
      }).catch((arr)=>{
        if(!props.dailyTracks) {
          setImgSrc(sample(defaultCovers));
        }
      })
    } else {
      let url = `${
        props.dailyTracks[0]?.al.picUrl || sample(defaultCovers)
      }?param=1024y1024`;
      setImgSrc(url);
    }
  }, [])

  const playFailyTrack = () => {

  }

  return (
    <div className={style.DailyTracksCard}>
      <img src={imgSrc}></img>
      <div className={style.totalTitle}>
        <div className={style.title}>每日推荐</div>
      </div>
      <div className={style.buttonBlock}>
        <button className={style.showButton} onClick={()=>{playFailyTrack()}}></button>
      </div>
    </div>
  )
}

DailyTracksCard = connect(mapStateToProps, mapDispatchToProps)(DailyTracksCard);
export default DailyTracksCard;