import React, {useState} from "react";
import { connect } from "react-redux";
import SvgIcon from "../SvgIcon/SvgIcon";
import style  from "./PicBlock.module.scss";

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {};
}

let PicBlock = (props) => {
  const [coverHover,setCoverHover] = useState(props.coverHover);
  const [focus,setFocus] = useState(false);
  const [clickCoverToPlay,setClickCoverToPlay] = useState(props.coverHover ? true : false);

  const { type } = props;

  const play = () => {
    const player = props.player.instance;
    const playActions = {
      album: player.playAlbumByID,
      playlist: player.playPlaylistByID,
      artist: player.playArtistByID,
    };
    playActions[props.type].bind(player)(props.id);
  }

  const goTo = () => {
    
  }

  const getStyle = () => {
    let typeStr = type==='artist' ? style.atristBlock : '';
    let coverHoverStr = coverHover ? "coverHover" : "";
    return `${style.PicBlock} ${typeStr} ${coverHoverStr}`
  }

  return (
    <div 
      className={getStyle()} 
      onClick={() => {clickCoverToPlay ? play(): goTo()}} 
      onMouseOver={()=>setFocus(true)} 
      onMouseLeave={()=>setFocus(false)}
    >
      <div className={style.coverContainer}>
        <div className="shadow">
          {
            // focus && 
            <button onClick={play} className="playButton">
              <SvgIcon iconClass="play" width="18px" height='18px' />
            </button>
          }
        </div>
        <img src={props.imageUrl} style={props.imageStyles} />
        
      </div>
    </div>
  )
}
PicBlock = connect(mapStateToProps,mapDispatchToProps)(PicBlock);

export default PicBlock;