import request from "../utils/request"
import { mapTrackPlayableStatus } from '../utils/common';
// /**
//  * 获取音乐 url
//  * 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,
//  * !!!未登录状态返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
//  * @param {string} id - 音乐的 id，例如 id=405998841,33894312
//  */
//  export function getMP3(id) {
//   let br =
//     store.state.settings?.musicQuality !== undefined
//       ? store.state.settings.musicQuality
//       : 320000;
//   return request({
//     url: '/song/url',
//     method: 'get',
//     params: {
//       id,
//       br,
//     },
//   });
// }

/**
 * 获取歌曲详情
 * 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
 * @param {string} ids - 音乐 id, 例如 ids=405998841,33894312
 */
 export function getTrackDetail(ids) {
  const fetchLatest = () => {
    return request({
      url: '/song/detail',
      method: 'get',
      params: {
        ids,
      },
    }).then(data => {
      // data.songs.map(song => {
      //   const privileges = data.privileges.find(t => t.id === song.id);
      //   cacheTrackDetail(song, privileges);
      // });
      data.songs = mapTrackPlayableStatus(data.songs, data.privileges);
      return data;
    });
  };
  return fetchLatest();

  //先跑流程，先不做数据库缓存这一步
  // let idsInArray = [String(ids)];
  // if (typeof ids === 'string') {
  //   idsInArray = ids.split(',');
  // }

  // return getTrackDetailFromCache(idsInArray).then(result => {
  //   if (result) {
  //     result.songs = mapTrackPlayableStatus(result.songs, result.privileges);
  //   }
  //   return result ?? fetchLatest();
  // });
}

// /**
//  * 听歌打卡
//  * 说明 : 调用此接口 , 传入音乐 id, 来源 id，歌曲时间 time，更新听歌排行数据
//  * - id - 歌曲 id
//  * - sourceid - 歌单或专辑 id
//  * - time - 歌曲播放时间,单位为秒
//  * @param {Object} params
//  * @param {number} params.id
//  * @param {number} params.sourceid
//  * @param {number=} params.time
//  */
//  export function scrobble(params) {
//   params.timestamp = new Date().getTime();
//   return request({
//     url: '/scrobble',
//     method: 'get',
//     params,
//   });
// }