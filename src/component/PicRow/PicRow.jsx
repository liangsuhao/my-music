import React, { useState } from 'react'
import style from './PicRow.module.scss'
import PicBlock from '../PicBlock/PicBlock'

const PicRow = (props) => {
  const [playButtonSize,setPlayButtonSize] = useState(props.playButtonSize ? props.playButtonSize : 22);
  const columnNumber = props.columnNumber ? props.columnNumber : 5;
  const gap = props.gap ? props.gap : "44px 24px";

  const getImageUrl = (item) => {  //这个方式直接套用，应该是调用网易云的接口获取头像之类的
    if (item.img1v1Url) {
      let img1v1ID = item.img1v1Url.split('/');
      img1v1ID = img1v1ID[img1v1ID.length - 1];
      if (img1v1ID === '5639395138885805.jpg') {
        // 没有头像的歌手，网易云返回的img1v1Url并不是正方形的 😅😅😅
        return 'https://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=512y512';
      }
    }
    let img = item.img1v1Url || item.picUrl || item.coverImgUrl;
    return `${img?.replace('http://', 'https://')}?param=512y512`;
  }

  return (
    <div className={style.picRow} style={{"gridTemplateColumns":`repeat(${columnNumber}, 1fr)`,"gap":gap}}>
      {
        props.items && props.items.map((item,key)=>
          <div key={key}>
            <PicBlock id={item.id} imageUrl={getImageUrl(item)} type={props.type} playButtonSize={props.type === 'artist' ? 26 : playButtonSize}/>
            <span>{item.name}</span>
          </div>
        )
      }
    </div>
  );
}

export default PicRow;