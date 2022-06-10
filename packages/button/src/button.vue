<template>
  <button
    class="cx-button"
    @click="handleClick"
    :disabled="disabled"
    :class="[
      `cx-button--${type}`,
      {
        'is-round': round,
        'is-square': square,
        'is-disabled': disabled
      },
      className
    ]"
    :style="handleSize()"
  >
    <!-- 字体图标的支持 -->
    <i :class="['iconfont', icon]" v-if="icon"></i>
    <span :class="[{iconText: icon}]" v-if="$slots.default && $slots.default[0].text"><slot></slot></span>
  </button>
</template>

<script type="text/babel">
export default {
  name: 'CxButton',
  props: {
    type: {
      type: String,
      default: ''
    },
    // 是否是圆角按钮
    round: {
      type: Boolean,
      default: false
    },
    // 是否是方形图标
    square: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    width: {
      type: String || Number,
      defalut: '',
    },
    height: {
      type: String || Number,
      defalut: '',
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
      e.preventDefault()
    },
    handleSize(){
      const rem = parseFloat(document.documentElement.style.fontSize)
      let width,height,style = {}
      if(this.width){
        width = this.width / rem
        style.width = width + 'rem'
      }
      if(this.height){
        height = this.height / rem
        style.height = height + 'rem'
      }
      return style
    }
  }
}
</script>

<style lang='scss'>
@import "@theme/_handle.scss";
.cx-button {
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  outline: null;
  -webkit-tap-highlight-color: transparent;
  @include font_color("font_color1");
  @include background_color("background_color1");
  border: none;
  outline: none;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  font-size: 2.125rem;
  padding: 0 1.25rem;
  border-radius: .875rem;
  min-width: 10.25rem;
  height: 4.75rem;
  .iconfont{
    font-size: 2.125rem;
  }
  .iconText{
    margin-left: .625rem;
  }
  &:active{
    @include font_color("font_color2");
  }
  &--primary {
    @include font_color("font_color1");
    @include background_color("background_color4");
    &:active{
      @include font_color("font_color1");
      @include background_color("background_color4");
    }
  }
  &--info {
    @include font_color("font_color1");
    @include background_color("background_color7");
    &:active{
      @include font_color("font_color2");
      @include background_color("background_color7");
    }
  }
  &--grayInfo {
    @include font_color("font_color3");
    @include background_color("background_color5");
    &:active{
      @include font_color("font_color1");
      @include background_color("background_color5");
    }
  }
  &--lightInfo {
    @include font_color("font_color4");
    @include background_color("background_color6");
    &:active{
      @include font_color("font_color4");
      @include background_color("background_color6");
    }
  }

  &.is-disabled{
    @include font_color("font_color3");
    @include background_color("background_color1");
    &:active{
      @include font_color("font_color3");
      @include background_color("background_color1");
    }
  }

  // 圆角
  &.is-round {
    border-radius: 2.375rem;
  }
  &.is-square {
    min-width: 0rem;
    width: 4.75rem;
    height: 4.75rem;
    border-radius: 0;
    padding: 0rem;
    background: transparent;
    &:hover,&:focus{
      background: transparent;
    }
    text-align: center;
    .iconfont{
      font-size: 3rem;
    }
  }
}

</style>
