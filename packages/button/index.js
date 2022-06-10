// 导入组件，组件必须声明 name
import CxButton from './src/button.vue'
// 为组件提供 install 安装方法，供按需引入
CxButton.install = function (Vue) {
  Vue.component(CxButton.name, CxButton)
}
// 默认导出组件
export default CxButton
