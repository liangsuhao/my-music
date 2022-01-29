

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
      data.songs.map(song => {
        const privileges = data.privileges.find(t => t.id === song.id);
        cacheTrackDetail(song, privileges);
      });
      data.songs = mapTrackPlayableStatus(data.songs, data.privileges);
      return data;
    });
  };
  fetchLatest();

  let idsInArray = [String(ids)];
  if (typeof ids === 'string') {
    idsInArray = ids.split(',');
  }

  return getTrackDetailFromCache(idsInArray).then(result => {
    if (result) {
      result.songs = mapTrackPlayableStatus(result.songs, result.privileges);
    }
    return result ?? fetchLatest();
  });
}

/**
 * 听歌打卡
 * 说明 : 调用此接口 , 传入音乐 id, 来源 id，歌曲时间 time，更新听歌排行数据
 * - id - 歌曲 id
 * - sourceid - 歌单或专辑 id
 * - time - 歌曲播放时间,单位为秒
 * @param {Object} params
 * @param {number} params.id
 * @param {number} params.sourceid
 * @param {number=} params.time
 */
 export function scrobble(params) {
  params.timestamp = new Date().getTime();
  return request({
    url: '/scrobble',
    method: 'get',
    params,
  });
}