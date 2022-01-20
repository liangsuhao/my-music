import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import localMessage from '../../locale';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import SVGIcon from '../SvgIcon/SvgIcon';

import style from "./TopNav.module.scss";

function TopNav(props) {
  const [ifActive,setIfActive] = useState(false);
  const [avatarUrl,setAvatarUrl] = useState("http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60");
  const navigate = useNavigate();

  function GoForward() {
    console.log("前进")
    navigate(1);
  }

  function GoBack() {
    console.log("后退")
    navigate(-1);
  }

  return (
    <div className={style.TopNav}>
      <nav>
        <div className={style.navigationButtons}>
            <ButtonIcon content={<SVGIcon iconClass="arrow-left" width="24px" height='24px'/>} onClick={GoBack}/>
            <ButtonIcon content={<SVGIcon iconClass="arrow-right" width="24px" height='24px'/>} onClick={GoForward}/>
        </div>
        <div className={style.linkNav}>
          <Link to="/home">{localMessage.nav.home}</Link>
          <Link to="/explore">{localMessage.nav.explore}</Link>
          <Link to="/library">{localMessage.nav.library}</Link>
        </div>
        <div className={style.rightPart}>
          <div className={style.searchBox} className={ifActive ? style.active : ""}>
            <div className={style.container}>
              <SVGIcon iconClass="search" width="18px" height='18px' className="svg-icon"/>
              <input
                className={style.searchInput}
                type="search" 
                placeholder={ifActive ? "" : localMessage.nav.search}
                onFocus={() => setIfActive(true)}
                onBlur={() => setIfActive(false)}
              />
            </div>
          </div>
          <img className={style.avatar} src={avatarUrl}/>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;