import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import localMessage from '../../locale';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

function TopNav() {
  return (
    <div className='topNav'>
      <nav>
        <div className='navigation-buttons'>
            <ButtonIcon content="后退" onClick="go('forward')"/>
            <ButtonIcon content="前进" onClick="go('back')"/>
        </div>
        <div>
          <Link to="/home">{localMessage.nav.home}</Link>
          <Link to="/explore">{localMessage.nav.explore}</Link>
          <Link to="/library">{localMessage.nav.library}</Link>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;