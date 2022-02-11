// import { isAccountLoggedIn } from './auth';
import { store } from '../index'

let isAccountLoggedIn = () => {
  return false; //不做登陆的话先写死吧
}

export function isTrackPlayable(track) {
  let result = {
    playable: true,
    reason: '',
  };
  if (track?.privilege?.pl > 0) {
    return result;
  }
  // cloud storage judgement logic
  if (isAccountLoggedIn() && track?.privilege?.cs) {
    return result;
  }
  if (track.fee === 1 || track.privilege?.fee === 1) {
    if (isAccountLoggedIn() && store.getState().data.user.vipType === 11) {
      result.playable = true;
    } else {
      result.playable = false;
      result.reason = 'VIP Only';
    }
  } else if (track.fee === 4 || track.privilege?.fee === 4) {
    result.playable = false;
    result.reason = '付费专辑';
  } else if (
    track.noCopyrightRcmd !== null &&
    track.noCopyrightRcmd !== undefined
  ) {
    result.playable = false;
    result.reason = '无版权';
  } else if (track.privilege?.st < 0 && isAccountLoggedIn()) {
    result.playable = false;
    result.reason = '已下架';
  }
  return result;
}

export function mapTrackPlayableStatus(tracks, privileges = []) {
  if (tracks?.length === undefined) return tracks;
  return tracks.map(t => {
    const privilege = privileges.find(item => item.id === t.id) || {};
    if (t.privilege) {
      Object.assign(t.privilege, privilege);
    } else {
      t.privilege = privilege;
    }
    let result = isTrackPlayable(t);
    t.playable = result.playable;
    t.reason = result.reason;
    return t;
  });
}
