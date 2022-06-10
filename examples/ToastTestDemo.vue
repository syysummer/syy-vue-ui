<template>
  <div class="toast-wrap">
    <cx-button @click="toastShow = !toastShow">显示Toast</cx-button>
    <div class="toast-button-wrap" v-show="toastShow">
      <cx-button @click="primaryToast">Primary</cx-button>
      <cx-button @click="successToast(true)">Success</cx-button>
      <cx-button @click="infoToast(true)">Info</cx-button>
      <cx-button @click="successToast(false)">无Icon Success</cx-button>
      <cx-button @click="infoToast(false)">无Icon Info</cx-button>
    </div>
    <cx-toast 
      :visible.sync="isShow"
      position="center"
      :onClose="()=>{}"
      className="diy-toast"
    >我是提示的内容呢</cx-toast>
  </div>
</template>

<script>
export default {
  name: 'imageScale',
  data () {
    return {
      toastShow: false,
      isShow: false,
    }
  },
  mounted(){
  },
  methods: {
    primaryToast(){
      this.isShow = true
      // this.$cxToast({
      //   message: '我只是一个微弱的toast',
      //   duration: 1000,
      //   position: 'center',
      //   className: 'diy-toast',
      //   onClose: ()=>{
      //   }
      // })
    },
    infoToast(needIcon){
      this.$cxToast({
        message: '我只是一个微弱的toast',
        duration: 1000,
        position: 'center',
        needIcon,
        type: 'info',
        className: 'diy-toast',
        onClose: ()=>{
        }
      })
    },
    successToast(needIcon){
      this.$cxToast({
        message: '我只是一个微弱的toast',
        duration: 1000,
        position: 'center',
        needIcon,
        type: 'success',
        className: 'diy-toast',
        onClose: ()=>{
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.toast-wrap{
  .toast-button-wrap{
    width: 37.5rem;
    margin-top: .625rem;
    >button{
      margin-left: .625rem;
      margin-top: .625rem;
    }
  }
}
</style>
