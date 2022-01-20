import React from 'react'
import style from './PicRow.module.scss'

const PicRow = (props) => {

  return (
    <div className={style.picRow}>
      {
        props.items && props.items.map((item,key)=>
          <div key={key}>
            <img className={style.picRowNav} src={item.coverImgUrl} />
            <span>{item.name}</span>
          </div>
        )
      }
    </div>
  );
}

export default PicRow;