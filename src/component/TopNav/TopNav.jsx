import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import localMessage from '../../locale';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import SVGIcon from '../SvgIcon/SvgIcon';

import style from "./TopNav.module.scss";

function TopNav() {
  const {ifFocus,setIfFocus} = useState("");
  return (
    <div className={style.TopNav}>
      <nav>
        <div className={style.navigationButtons}>
            <ButtonIcon content={<SVGIcon iconClass="arrow-left" width="24px" height='24px'/>} onClick="go('forward')"/>
            <ButtonIcon content={<SVGIcon iconClass="arrow-right" width="24px" height='24px'/>} onClick="go('back')"/>
        </div>
        <div className={style.linkNav}>
          <Link to="/home">{localMessage.nav.home}</Link>
          <Link to="/explore">{localMessage.nav.explore}</Link>
          <Link to="/library">{localMessage.nav.library}</Link>
        </div>
        <div className={style.rightPart}>
          <div className={style.searchBox}>
            <input 
              type="search"

            />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;