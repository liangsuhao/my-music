import React, {useState} from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import style  from "./PicBlock.module.scss";

const PicBlock = (props) => {
  const [coverHover,setCoverHover] = useState(props.coverHover);
  const [focus,setFocus] = useState(false);

  const play = () => {

  }

  const goTo = () => {

  }

  return (
    <div className={style.PicBlock} className={coverHover ? "coverHover" : ""} onClick={() => {props.clickCoverToPlay ? play(): goTo()}} onMouseOver={()=>setFocus(true)} onMouseLeave={()=>setFocus(false)}>
      <div className="coverContainer">
        <div className="shadow">
          {
            focus && 
            <button onClick={play()} className="playButton">
              <SvgIcon iconClass="play" width="24px" height='24px' />
            </button>
          }
        </div>
        <img src={props.imageUrl} style={props.imageStyles} />
        
      </div>
    </div>
  )
}

export default PicBlock;