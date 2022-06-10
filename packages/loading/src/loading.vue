<template>
  <div class="loading-dialog" :class="[className]" v-if="visible" @click.self="handleClose">
    <div class="loading-dialog-content">
      <div class="loading-tip-content">
        <slot v-if="istemplete && $slots.content" name="content"></slot>
        <slot v-if="istemplete && !$slots.content"></slot>
        <div v-if="content && isHtml" v-html="content"></div>
        <div v-if="content && !isHtml">{{content}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'CxLoading',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    closeTipMsg: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 3000,
    },
    closeCallBack: {
      type: Function,
      default: null
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      istemplete: true,
      isHtml: false,
      content: '',
      durTimer: null
    }
  },
  mounted(){
    if(this.visible){
      this.startTimer()
    }
  },
  methods: {
    startTimer(){
      if(this.durTimer){clearTimeout(this.durTimer)}
      this.durTimer = setTimeout(() => {
        this.close()
        clearTimeout(this.durTimer)
      }, this.duration);
    },
    show (option) {
      this.visible = true
      this.istemplete = false
      this.duration = (option.duration && typeof option.duration === 'number') ? option.duration : 3000
      this.closeTipMsg = option.closeTipMsg ? option.closeTipMsg : ''
      this.closeCallBack = option.closeCallBack ? option.closeCallBack : null
      this.closeOnClickModal = option.closeOnClickModal ? option.closeOnClickModal : false
      this.className = option.className ? option.className : ''
      this.isHtml = option.isHtml ? option.isHtml : false
      this.content = option.content
    },
    close (){
      this.$emit('update:visible', false)
      clearTimeout(this.durTimer)
      this.closeTipMsg && this.$toast(this.closeTipMsg)
      typeof this.closeCallBack === 'function' && this.closeCallBack()
      if(!this.istemplete){
        this.visible = false
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
        this.$destroy(true)
      }
    },
    handleClose(){
      if(this.closeOnClickModal){this.close()}
    }
  },
  watch: {
    visible(newV, oldV){
      if(newV && !oldV){
        this.startTimer()
      }else {
        clearTimeout(this.durTimer)
      }
    }
  },
  beforeDestroy(){
    clearTimeout(this.durTimer)
  }
}
</script>
<style scoped lang="scss">
@import "@theme/_handle.scss";
 .loading-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.875rem;
  font-family: Source Han Sans CN;
  font-weight: 400;
  @include font_color('font_color8');
  background: rgba(0,0,0,.5);
  z-index: 100010;
  .loading-dialog-content{
    width: 25rem;
    min-height: 12.5rem;
    text-align: center;
    padding: 1.25rem;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    @include background_color("background_color13");
    border-radius: 1.25rem;
    .loading-tip-content{
      word-break: break-all;
    }
 }
}
</style>