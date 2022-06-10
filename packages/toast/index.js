// 导入组件，组件必须声明 name
import Vue from 'vue'
import CxToast from './src/toast.vue'

const toast = (option) => {
  if(typeof Vue.prototype.$cxToast.close === 'function'){
    Vue.prototype.$cxToast.close()
  }
  const ToastController = Vue.extend(CxToast)
  const instance = new ToastController().$mount(document.createElement('div'))  
  document.body.appendChild(instance.$el)
  instance.show(option)
  toast.close = instance.handleClose
}

// 为组件提供 install 安装方法，供按需引入
CxToast.install = function (Vue) {
  Vue.component(CxToast.name, CxToast)
  Vue.prototype.$cxToast = toast
}

export default CxToast
