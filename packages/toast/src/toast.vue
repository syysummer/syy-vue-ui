<template>
  <div
    :class="[
      'cx-toast__wrapper',
      position === 'center' ? 'is-center' : '',
      position,
      type ? `cx-toast__${type}`: '',
      className
    ]"
    :style="positionStyle"
    v-if="visible"
  >
    <div class="cx-toast__content">
      <i :class="['iconfont',currentIcon]" v-if="currentIcon && needIcon"></i>
      <p v-if="message" v-html="message"></p>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'CxToast',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 2000
      },
      onClose: {
        type: Function,
        default: null
      },
      position: {
        type: String,
        default: 'center'
      },
      type: {
        type: String,
        default: 'primary'
      },
      needIcon: {
        type: Boolean,
        default: false
      },
      className: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        istemplete: true,
        message: '',
        closed: false,
        durTimer: null
      }
    },
    computed: {
      positionStyle() {
        const positionMap = {
          top: 'flex-start',
          center: 'center',
          bottom: 'flex-end'
        }
        return {
          alignItems: positionMap[this.position]
        };
      },
      currentIcon(){
        const iconMap = {
          'info': 'icon-info',
          'success': 'icon-success',
          'primary': ''
        }
        return iconMap[this.type]
      },
    },
    methods: {
      show (option) {
        const type = typeof option
        this.istemplete = false;
         if(type === 'string'){
          this.message = option
        }if(type === 'object'){
          this.message = option.message
          this.onClose = option.onClose ? option.onClose : null
          this.duration = option.duration ? option.duration : 2000
          this.position = option.position ? option.position : 'center'
          this.type = option.type ? option.type : 'primary'
          this.needIcon = option.needIcon ? option.needIcon : false
          this.className = option.className
        }
        this.visible = true
        this.closed = false
        this.startTimer()
      },
      handleClose() {
        this.$emit('update:visible', false)
        this.closed = true
        if(!this.istemplete){
          this.visible = false
        }
        if (typeof this.onClose === 'function') {
          this.onClose(this)
        }
        if(!this.istemplete){
          this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
          this.$destroy(true)
        }
      },
      startTimer() {
        if(this.durTimer){clearTimeout(this.durTimer)}
        this.durTimer = setTimeout(() => {
          if(!this.closed){
            this.handleClose()
          }
          clearTimeout(this.durTimer)
        }, this.duration);
      },
      keydown(e) {
        if (e.keyCode === 27) { // esc关闭消息
          this.handleClose();
        }
      }
    },
    mounted() {
      if(this.visible){
        this.startTimer()
      }
      document.addEventListener('keydown', this.keydown);
    },
    watch: {
      visible(newV, oldV){
        if(newV && !oldV){
          this.closed = false
          this.startTimer()
        }else {
          clearTimeout(this.durTimer)
        }
      }
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
  };
</script>
<style lang="scss">
@import "@theme/_handle.scss";
.cx-toast__wrapper{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0,0,0,0);
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  margin: auto auto;
  &.top{
    top: 10vh;
  }
  &.bottom{
    bottom: 10vh;
  }
  .cx-toast__content{
    min-width: 15.625rem;
    max-width: 35.625rem;
    min-height: 6.625rem;
    font-size: 1.625rem;
    padding: 1.25rem;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;
    @include background_color("background_color1");
    @include font_color('font_color1');
    border-radius: .625rem;
    box-sizing: border-box;
    .iconfont{
      margin-bottom: .625rem;
      padding: 0;
    }
    p{
      margin: 0;
    }
  }
  &.cx-toast__primary{
    .cx-toast__content{
      @include background_color("background_color1");
      @include font_color('font_color1');
    }
  }
  &.cx-toast__info, &.cx-toast__success{
    .cx-toast__content{
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconfont{
        font-size: 3.125rem;
        @include font_color('font_color4');
      }
      @include background_color("background_color12");
      @include font_color('font_color7');
    }
  }
}
</style>

