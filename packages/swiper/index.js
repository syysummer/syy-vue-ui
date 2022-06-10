// 导入组件，组件必须声明 name
import CxSwiper from './src/swiper.vue'
CxSwiper.install = function (Vue) {
  Vue.component(CxSwiper.name, CxSwiper)
}
// 默认导出组件
export default CxSwiper