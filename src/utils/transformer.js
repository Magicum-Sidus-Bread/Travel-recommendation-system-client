/* 将高德数据整合拼接成需要的格式内容 */
export function transformPlacelist (poi) {
  return {
    placename: poi.name,
    city: poi.cityname,
    // key: `${poi.pname}${poi.cityname}${poi.adname}${poi.address}`,
    details: {
      cost: (poi.biz_ext.cost.length === 0) ? '暂无消费信息' : poi.biz_ext.cost,
      rating: poi.biz_ext.rating,
      address: `${poi.pname}${poi.cityname}${poi.adname}${poi.address}`,
      location: poi.location,
      // cityname: poi.cityname,
      photos: poi.photos.map(p => p.url)
    }
  }
}
export function transformEatinglist (poi) {
  return {
    placename: poi.name,
    // key: poi.name,
    details: {
      cost: (poi.biz_ext.cost.length === 0) ? '暂无消费信息' : poi.biz_ext.cost,
      rating: poi.biz_ext.rating,
      address: `${poi.pname}${poi.cityname}${poi.adname}${poi.address}`,
      location: poi.location,
      // cityname: poi.cityname,
      photos: poi.photos.map(p => p.url)
    }
  }
}
