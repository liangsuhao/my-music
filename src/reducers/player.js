import initLocalStorage from './initLocalStorage';
import pkg from '../../package.json';
import updateApp from '../utils/updateApp';
import thePlayer from '../utils/player'

if (localStorage.getItem('appVersion') === null) {
  localStorage.setItem('settings', JSON.stringify(initLocalStorage.settings));
  localStorage.setItem('data', JSON.stringify(initLocalStorage.data));
  localStorage.setItem('appVersion', pkg.version);
}

updateApp();

let thePlayer2 = new thePlayer();
let thePlayer3 = new Proxy(thePlayer2, {
  set(target, prop, val) {
    // console.log({ prop, val });
    target[prop] = val;
    if (prop === '_howler') return true;
    target.saveSelfToLocalStorage();
    target.sendSelfToIpcMain();
    return true;
  },
});

const player = (state = thePlayer3, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
      }
    default:
      return state
  }
}

export default player