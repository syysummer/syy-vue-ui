// 导入组件，组件必须声明 name
import CxSwiperItem from './src/swiperItem.vue'
CxSwiperItem.install = function (Vue) {
  Vue.component(CxSwiperItem.name, CxSwiperItem)
}
// 默认导出组件
export default CxSwiperItem