<template>
  <div>
    <cx-button type="primary" @click="toggleLoading">Loading显示</cx-button>
    <span style="marginLeft: 20px"></span>
    <cx-button type="primary" @click="toggleLoading2">Loading显示</cx-button>
    <!-- loading测试 -->
    <cx-loading :visible.sync="isLoadingShow"
      :closeOnClickModal= true
      :closeCallBack="handleClose"
      className="hahahahh"
    >
      <template v-slot:content>
        <div>加载中内容...</div>
      </template>
    </cx-loading>
    <cx-loading :visible.sync="isLoadingShow1"
      :closeOnClickModal= true
      :closeCallBack="handleClose"
      className="hahahahh"
    >
      <template v-slot:content>
        <div>加载中内容1...</div>
      </template>
    </cx-loading>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isLoadingShow: false,
      isLoadingShow1: false,
    }
  },
  mounted(){
  },
  methods: {
    handleAdd () {
    },
    toggleLoading () {
      this.isLoadingShow = !this.isLoadingShow
      // this.isLoadingShow1 = !this.isLoadingShow1
    },
    handleClose(){
      console.log('关闭loading')
    },
    toggleLoading2(){
      this.$cxLoading({
        content: '哈哈哈',
        closeOnClickModal: true,
        closeCallBack: () => {
          console.log('关闭啦')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
