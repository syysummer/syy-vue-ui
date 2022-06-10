// 导入组件，组件必须声明 name
import Vue from 'vue'
import CxDialog from './src/dialog.vue'


const dialog = (option) => {
  const DialogController = Vue.extend(CxDialog)
  const instance = new DialogController().$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  instance.show(option)
  dialog.close = instance.close
  let timer = setTimeout(() => {
    const confirmBtn = instance.$refs.confirmBtn
    confirmBtn && confirmBtn.addEventListener('click',() => {
      instance.confirmFn()
    })
    const cancelBtn = instance.$refs.cancelBtn
    cancelBtn && cancelBtn.addEventListener('click',() => {
      instance.cancelFn()
    })
    clearTimeout(timer)
  })
}

dialog.confirm = (option) => {
  //打开之前关闭上一个loading
  if(typeof Vue.prototype.$cxdialog.close === 'function'){
    Vue.prototype.$cxdialog.close()
  }
  return new Promise((resove,reject) => {
    const DialogController = Vue.extend(CxDialog)
    const instance = new DialogController().$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    instance.show(option)
    dialog.close = instance.close
    clearTimeout(timer)
    let timer = setTimeout(() => {
      const confirmBtn = instance.$refs.confirmBtn
      confirmBtn && confirmBtn.addEventListener('click',() => {
        instance.confirmFn()
        resove(instance)
      })
      const cancelBtn = instance.$refs.cancelBtn
      cancelBtn && cancelBtn.addEventListener('click',() => {
        instance.cancelFn()
        reject(instance)
      })
      clearTimeout(timer)
    })
  })
}

dialog.alert = (option) => {
  //打开之前关闭上一个loading
  if(typeof Vue.prototype.$cxdialog.close === 'function'){
    Vue.prototype.$cxdialog.close()
  }
  return new Promise((resove) => {
    const DialogController = Vue.extend(CxDialog)
    const instance = new DialogController().$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    option.showCancelButton = false
    instance.show(option)
    dialog.close = instance.close
    clearTimeout(timer)
    let timer = setTimeout(() => {
      const confirmBtn = instance.$refs.confirmBtn
      confirmBtn && confirmBtn.addEventListener('click',() => {
        instance.confirmFn()
        resove(instance)
      })
    })
  })
}

// 为组件提供 install 安装方法，供按需引入
CxDialog.install = function (Vue) {
  Vue.component(CxDialog.name, CxDialog)
  Vue.prototype.$cxdialog = dialog
}

export default CxDialog
