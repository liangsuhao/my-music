import { useMemo } from 'react';
import { connect } from 'react-redux'
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import style from './FMCard.module.scss'
import { resizeImage } from '../../utils/filter';
import SVGIcon from '../SvgIcon/SvgIcon';

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

let FMCard = (props) => {

  const player = props.player.instance;
  const backPic = useMemo(()=>{
    return `${player._personalFMNextTrack?.album?.picUrl.replace(
      'http://',
      'https://'
    )}?param=512y512`;
  }, [player._personalFMNextTrack]);

  const track = useMemo(()=>{
    return player.personalFMTrack;
  }, [player.personalFMTrack]);

  const trackArr = useMemo(()=>{
    return track.artists || track.ar || [];
  }, [track])

  const isPlaying = useMemo(()=> {
    return player.playing && player.isPersonalFM;
  }, [track]);

  return (
    <div className={style.FMCard}>
      <img className={style.backPic} src={backPic} style={{"display":"none"}}></img>
      <img className={style.leftPic} src={track.album && resizeImage(track.album?.picUrl ,512)}></img>
      <div className={style.rightBlock}>
        <div className={style.infoBlock}>
          <div className={style.title}>
            {track.name}
          </div>
          <div className={style.detail}>
            {
              trackArr.map((item, index) => {
                return (
                  <div className={style.titleFont}>
                    {item.name}
                    {(index!==trackArr.length-1 ? <span>,</span> : null)}
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className={style.control}>
          <div className={style.controlBtns}>
            <ButtonIcon content={<SVGIcon iconClass='thumbs-down' width='20px' height='20px'></SVGIcon>}></ButtonIcon>
            <ButtonIcon content={<SVGIcon iconClass={isPlaying ? 'pause' : 'play'} width='20px' height='20px'></SVGIcon>}></ButtonIcon>
            <ButtonIcon content={<SVGIcon iconClass='next' width='20px' height='20px'></SVGIcon>}></ButtonIcon>
          </div>
          <div className={style.fmFont}><SVGIcon iconClass='fm' width='20px' height='20px'></SVGIcon> &nbsp;私人fm</div>
        </div>
      </div>
    </div>
  )
}

FMCard = connect(mapStateToProps, mapDispatchToProps)(FMCard);
export default FMCard;