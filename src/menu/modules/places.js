export default {
  path: '/places',
  title: '景点',
  icon: 'map-marker',
  children: [
    { path: '/places/list', title: '景点列表', icon: 'map-o' },
    { path: '/places/eating', title: '餐饮列表', icon: 'cutlery' },
    { path: '/places/living', title: '住宿酒店', icon: 'hospital-o' }
  ]
}
