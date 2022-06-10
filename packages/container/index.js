// 导入组件，组件必须声明 name
import CxContainer from './src/container.vue'
// 为组件提供 install 安装方法，供按需引入
CxContainer.install = function (Vue) {
  Vue.component(CxContainer.name, CxContainer)
}
// 默认导出组件
export default CxContainer