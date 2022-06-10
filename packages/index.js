// 导入颜色选择器组件
import './utils/rem'
// import FastClick from 'fastclick'
// if ('addEventListener' in document) {
//   document.addEventListener('DOMContentLoaded', function() {
//     FastClick.attach(document.body);
//   }, false);
// }
import Button from './button'
import Dialog from './dialog'
import Input from './input'
import Switch from './switch'
import Toast from './toast'
import Image from './imageScale'
import Loading from './loading'
import Container from './container'
import Swiper from './swiper'
import SwiperItem from './swiperItem'
// import './fonts/font.scss'
// 存储组件列表
const components = [
  Button,
  Dialog,
  Input,
  Switch,
  Toast,
  Image,
  Loading,
  Container,
  Swiper,
  SwiperItem,
]
// 处理移动端click事件300ms延迟

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  if (install.installed) return;
  // 遍历注册全局组件
  components.forEach(component => {
    Vue.use(component)
  })
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 默认暴露，方便全局引入
export default {
  Button,
  Dialog,
  Input,
  Switch,
  Toast,
  Image,
  Loading,
  Container,
  Swiper,
  SwiperItem,
  install
}

// 可以按需引入
export {
  Button,
  Dialog,
  Input,
  Switch,
  Toast,
  Image,
  Loading,
  Container,
  Swiper,
  SwiperItem,
  install
}
