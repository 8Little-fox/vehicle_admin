/** 腾讯地图 URI（论文：腾讯地图显示详细位置），H5 用外链唤起地图 App */
export function tencentMapMarkerUri(opts: { lat: number, lng: number, title: string, addr: string }) {
  const { lat, lng, title, addr } = opts
  return `https://apis.map.qq.com/uri/v1/marker?marker=coord:${lat},${lng};title:${encodeURIComponent(title)};addr:${encodeURIComponent(addr)}&referer=驾校管理系统`
}
