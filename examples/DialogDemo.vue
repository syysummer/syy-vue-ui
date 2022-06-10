<template>
  <div>
    <cx-button type="primary" @click="toggleDialog">提示Dialog</cx-button>
    <span style="marginLeft: 20px"></span>
    <cx-button type="primary" @click="toggleDialog1">确认Dialog</cx-button>
    <!-- dialog测试 -->
    <cx-dialog 
     title="这是一个弹窗啦"
     :visible.sync="isDialogShow1"
     showCancelButton
     :isHtml="true"
     :confirm-button-text="Btn.confirmBtn"
     :cancel-button-text="Btn.cancelBtn"
     @confirm="fnConfirm"
     @cancel="fnCancel"
     :needClose="false"
     className="diy-dialog"
    >
      <template v-slot:title>
        <div>这是一个弹窗标题啦</div>
      </template>
      这是一个弹窗内容啦啦，代码就是写给人来看的，代码是写出来给人看的，附带能在机器上运行
      <!-- <template v-slot:footer>
        <cx-button @click="isDialogShow = false">取 消</cx-button>
        <cx-button type="primary" @click="isDialogShow = false">确 定</cx-button>
      </template> -->
    </cx-dialog>

    <!-- <cx-dialog 
     title="这是一个弹窗啦"
     :visible.sync="isDialogShow"
     :showCancelButton="false"
     :confirmButtonText="Btn.confirmBtn"
     :cancelButtonText="Btn.cancelBtn"
     @confirm="fnConfirm"
     @cancel="fnCancel"
     :needClose="false"
     className="diy-dialog"
    >
      <template v-slot:title>
        <div>这是一个弹窗标题啦，代码就是写给人来看的</div>
      </template>
      <div> 这是一个弹窗内容啦啦，代码就是写给人来看的，代码是写出来给人看的，附带能在机器上运行</div>
    </cx-dialog> -->
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isDialogShow: false,
      isDialogShow1: false,
      Btn: {
        confirmBtn: '确定',
        cancelBtn: '取消'
      }
    }
  },
  mounted(){
  },
  methods: {
    handleAdd () {
      console.log('点击了添加按钮')
    },
    toggleDialog () {
      this.isDialogShow = !this.isDialogShow
      this.isDialogShow1 = !this.isDialogShow1
      // this.$cxdialog({
      //   message: '弹窗内容',
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   showCancelButton: true,
      // })
      // this.$cxdialog.confirm({
      //   title: '弹窗标题',
      //   message: '<div>这是一个弹窗标题啦，代码就是写给人来看的</div>',
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   showCancelButton: true,
      //   isHtml: true,
      // }).then((res) => {
      //   console.log(res, '点击确定的回调')
      // }).catch((err) => {
      //   console.log(err, '点击取消的回调')
      // })
    },
    toggleDialog1(){
      this.$cxdialog.alert({
        title: '弹窗标题',
        message: '弹窗内容',
        confirmButtonText: '确定',
        className: 'my-class',
        top: '10vh'
      }).then((res) => {
        console.log(res, '确认了')
      })
    },
    fnConfirm(){
      console.log('click confirm')
    },
    fnCancel(){
      console.log('click cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
