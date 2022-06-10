// 导入组件，组件必须声明 name
import CxImage from './src/image.vue'
// 为组件提供 install 安装方法，供按需引入

CxImage.install = function (Vue) {
  console.log('image,hahhahahhah')
  Vue.component(CxImage.name, CxImage)
}
// 默认导出组件
export default CxImage