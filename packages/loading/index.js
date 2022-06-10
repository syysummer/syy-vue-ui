// 导入组件，组件必须声明 name
import Vue from 'vue'
import CxLoading from './src/loading.vue'


const cxLoading = (option) => {
  //打开之前关闭上一个loading
  if(typeof Vue.prototype.$cxLoading.close === 'function'){
    Vue.prototype.$cxLoading.close()
  }
  const CxLoadingController = Vue.extend(CxLoading)
  const instance = new CxLoadingController().$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  instance.show(option)
  cxLoading.close = instance.close
}

// 为组件提供 install 安装方法，供按需引入
CxLoading.install = function (Vue) {
  Vue.component(CxLoading.name, CxLoading)
  Vue.$cxLoading = Vue.prototype.$cxLoading = cxLoading
}

export default CxLoading