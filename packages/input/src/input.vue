<template>
  <div class="cx-input-wrap" ref="inputWrap" :style="handleSize()">
    <div class="cx-input-label" v-if="label">{{label}}</div>
    <div class="cx-input" :class="[{'cx-input--suffix': showSuffix},{'buttonIcon': $slots.button}]">
      <input
        class="cx-input__inner"
        :class="[{'is-disabled': disabled}]"
        :placeholder="placeholder"
        :type="realType"
        :disabled="disabled"
        v-model="currentValue"
        @input="handleInput"
        @blur="handleBlur"
        onkeyup="javascript:this.value.substring(0,1)=='0'?this.value='0':this.value=this.value"
      >
      <span class="cx-input__suffix" v-if="showSuffix || $slots.button">
        <span  v-if="clearable && value" class="iconfont-wrap" @click="clear"><i class="iconfont icon-hm_close_light"></i></span>
        <span v-if="showPassword" class="iconfont-wrap" @click="handlePasswordVisible"><i :class="['iconfont', 'password-icon',  realType === 'password' ? 'icon-Eyesclosed' : 'icon-eyes']"></i></span>
        <div class="cx-input-btn"><slot name="button"></slot></div>
      </span>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'CxInput',
  data () {
    return {
      passwordVisible: false,
      currentValue: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: [String, Number],
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    this.currentValue = this.value
  },
  computed: {
    showSuffix () {
      return this.clearable || this.showPassword
    },
    realType () {
      const typeMap = {
        text: 'text',
        password: 'password',
        number: 'text',
        digit: 'text'
      }
      return typeMap[this.type]
    },
  },
  methods: {
    handleInput (e) {
      const regDigit = /[^0-9]+/
      const regNumber = /[^0-9.]+/
      if(this.type === 'digit'){
        this.currentValue = this.currentValue.replace(regDigit, '')
      }
      if(this.type === 'number'){
        this.currentValue = this.currentValue.replace(regNumber, '')
      }
      this.$emit('input',this.currentValue, e)
      this.$emit('update:value', this.currentValue)
    },
    handleBlur (e) {
      this.$emit('blur', e.target.value, e)
    },
    clear () {
      if( this.disabled ) { return}
      this.$emit('clear', '')
    },
    handlePasswordVisible () {
      if( this.disabled ) { return}
      this.passwordVisible = !this.passwordVisible
      let curType = 'text'
      if(this.type === 'password'){
        curType = 'text'
      }else{
        curType = 'password'
      }
      this.$emit('changeType', this.type)
      this.$emit('update:type', curType)
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
  },
  watch: {
    value(newValue){
      this.currentValue = newValue
    }
  }
}
</script>

<style lang="scss">
@import "@theme/_handle.scss";
.cx-input-wrap{
  width: 23rem;
  height: 4.625rem;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  @include font_color('font_color1');
  .cx-input-label{
    min-width:6.25rem;
    font-size: 1.5rem;
    padding: 0 .625rem;
    text-align: right;
  }
  .cx-input {
    height: 100%;
    flex: 1;
    border-radius: .625rem;
    position: relative;
    font-size: 1.625rem;
    display: inline-block;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-content: center;
    -webkit-tap-highlight-color: transparent;
    @include background_color("background_color16");
    overflow: hidden;
    .cx-input__inner {
      cursor: pointer;
      @include font_color("font_color10");
      border: none;
      -webkit-appearance: none;
      background-image: none;
      box-sizing: border-box;
      display: inline-block;
      font-size: inherit;
      outline: none;
      padding: 0 .9375rem;
      background: transparent;
      border-radius: .625rem;
      box-sizing: border-box;
      width: 100%;
      &:focus {
        outline: none;
      }
      &::-webkit-input-placeholder{
        @include font_color("font_color11");
      }
      &::-moz-placeholder{
        @include font_color("font_color11");
      }
      &::-ms-input-placeholder{
        @include font_color("font_color11");
      }
      /* 谷歌去除type为number的加减器 */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
      }
      /* 火狐去除type为number的加减器 */
      -moz-appearance:textfield;
    }
    &.buttonIcon{
      .cx-input__suffix {
        min-width: 3.75rem;
        .cx-input-btn{
          font-size: 2.125rem;
          height: 100%;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          align-content: center;
          align-items: center;
        }
      }
    }

    &.cx-input--suffix {
      .cx-input__suffix {
        height: 100%;
        margin-right: .625rem;
        line-height: 100%;
        text-align: center;
        color: #c0c4cc;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        .iconfont-wrap{
          width: 2.5rem;
          height: 100%;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          align-items: center;
          .iconfont{
            font-size: 2.5rem;
          }
        }
      }
    }
  }
}

</style>
