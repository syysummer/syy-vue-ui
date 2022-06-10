<template>
  <div class="cx-dialog__wrapper" v-if="visible" @click.self="handleClose" :class="[{isCenter: isCenter}, className, `cx-dialog__${type}`]">
    <div class="cx-dialog" :style="handleSize()">
      <div class="cx-dialog__header" v-if="title">
        <div class="cx-dialog__title" v-if="$slots.title">
          <slot name="title"></slot>
        </div>
        <div class="cx-dialog__title" v-if="!$slots.title">{{title}}</div>
        <button class="cx-dialog__headerbtn" @click="handleClose" v-if="needClose">
          <i class="iconfont icon-hm_close_light"></i>
        </button>
      </div>
      <div class="cx-dialog__body">
        <!-- 默认插槽 -->
        <div v-if="$slots.content && isHtml" v-html="$slots.content"></div>
        <slot v-else-if="$slots.content && !isHtml" name="content"></slot>
        <slot v-else></slot>
      </div>
      <div class="cx-dialog__footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
      <div class="cx-dialog__footer" v-if="istemplete && !$slots.footer">
        <div class="cx-dialog__confirmbtn" ref="confirmBtn" @click="confirmFn">{{confirmButtonText}}</div>
        <div class="cx-dialog__cancelbtn" ref="cancelBtn" @click="cancelFn" v-if="showCancelButton">{{cancelButtonText}}</div>
      </div>
      <div class="cx-dialog__footer" v-if="!istemplete && !$slots.footer">
        <div class="cx-dialog__confirmbtn" ref="confirmBtn">{{confirmButtonText}}</div>
        <div class="cx-dialog__cancelbtn" ref="cancelBtn" v-if="showCancelButton">{{cancelButtonText}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'CxDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String || Number,
      default: ''
    },
    top: {
      type: String,
      default: '20vh'
    },
    className: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    },
    isCenter: {
      type: Boolean,
      default: true
    },
    needClose: {
      type: Boolean,
      default: false
    },
    confirmButtonText: {
      type: String,
      default: ''
    },
    cancelButtonText: {
      type: String,
      default: ''
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    isHtml: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      istemplete: true,
      confrimCallBack: null,
      cancelCallBack: null,
      closeCallBack: null
    }
  },
  mounted () {
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
      if(!this.istemplete){
        this.visible = false
      }
    },
    show (option) {
      this.istemplete = false
      this.visible = true
      this.$slots.content = option.message
      this.title = option.title ? option.title : ''
      this.confirmButtonText = option.confirmButtonText
      this.cancelButtonText = option.cancelButtonText
      this.showCancelButton = option.showCancelButton
      this.width = option.width ? option.width : ''
      this.top = option.top ? option.top : ''
      this.className = option.className ? option.className : ''
      this.isCenter = option.isCenter === false ? false : true
      this.isHtml = option.isHtml ? option.isHtml : false
      this.type = option.type ? option.type : 'primary'
      this.confrimCallBack = option.confrimCallBack ? option.confrimCallBack : null
      this.cancelCallBack = option.cancelCallBack ? option.cancelCallBack : null
      this.closeCallBack = option.closeCallBack ? option.closeCallBack : null
    },
    async close () {
      this.$emit('update:visible', false)
      await this.$emit('close', this)
      if(!this.istemplete){
        this.visible = false
      }
      typeof this.closeCallBack === 'function' && this.closeCallBack()
      if(!this.istemplete){
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
        this.$destroy(true)
      }
    },
    confirmFn () {
      this.$emit('confirm', this)
      this.close()
    },
    cancelFn () {
      this.$emit('cancel', this)
      this.close()
    },
    handleSize(){
      const rem = parseFloat(document.documentElement.style.fontSize)
      let width,style = {
        margin:`${this.top} auto`,
      }
      if(this.width){
        width = this.width / rem
        style.width = width + 'rem'
      }
      return style
    },
  }
}
</script>

<style lang="scss">
@import "@theme/_handle.scss";
.cx-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0,0,0, .5);
  &.isCenter{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
  }
  .cx-dialog {
    position: relative;
    background: #fff;
    border-radius: 1.375rem;
    @include font_color("font_color1");
    @include background_color("background_color8");
    box-sizing: border-box;
    width: 35.625rem;
    &__header {
      position: relative;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      min-height: 6.0625rem;
      border-bottom: .0625rem solid;
      @include border_color("border_color3");
      .cx-dialog__title {
        font-size: 2.125rem;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 1.25rem 1.875rem;
        @include font_color("font_color1");
      }
      .cx-dialog__headerbtn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 1.25rem;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 2.125rem;
        .iconfont {
          font-size: 2.125rem;
          @include font_color("font_color1");
        }
      }
    }
    &__body {
      padding: 3.125rem 1.875rem;
      @include font_color("font_color1");
      font-size: 2.125rem;
      text-align: center;
      word-break: break-all;
    }
    &__footer {
      display: flex;
      display:-webkit-flex;
      height: 5.125rem;
      justify-content: space-between;
      align-items: center;
      text-align: right;
      box-sizing: border-box;
      @include background_color("background_color9");
      border-top: .0625rem solid;
      @include border_color("border_color3");
      border-radius:0 0 1.375rem 1.375rem;
      >div{
        flex: 1;
        text-align: center;
        align-items: 5.125rem;
        font-size: 2.125rem;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        &:nth-child(2){
          border-left: .0625rem solid;
          @include border_color("border_color2");
        }
      }
      .cx-dialog__confirmbtn{
        cursor: pointer;
        @include font_color("font_color4");
        &:last-child{
          @include font_color("font_color1");
        }
      }
      .cx-dialog__cancelbtn{
        cursor: pointer;
        @include font_color("font_color1");
      }
    }
  }
  &.cx-dialog__light{
    .cx-dialog {
      width: 32.75rem;
      @include font_color("font_color6");
      @include background_color("background_color11");
      &__header{
        border-bottom: .0625rem solid;
        @include border_color("border_color1");
        .cx-dialog__title {
        @include font_color("font_color6");
        }
        .cx-dialog__headerbtn {
          .iconfont {
            @include font_color("font_color6");
          }
        }
      }
      &__body {
       @include font_color("font_color6");
      }
      &__footer {
        @include background_color("background_color11");
        border-top: .0625rem solid;
        @include border_color("border_color1");
        border-radius:0 0 1.375rem 1.375rem;
        >div{
          &:nth-child(2){
            @include border_color("border_color1");
          }
        }
        .cx-dialog__confirmbtn{
          @include font_color("font_color4");
          &:last-child{
            @include font_color("font_color6");
          }
        }
        .cx-dialog__cancelbtn{
          @include font_color("font_color6");
        }
      }
    }
  }
}
</style>
