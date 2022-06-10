<template>
  <div class="cx-switch" @click="handleChange" :class="{ 'is-checked': this.value }">
    <input
      class="cx-switch__input"
      type="checkbox"
      ref="switchInput"
      :disabled="disabled"
    >
    <span class="cx-switch__core" ref="core">
      <span class="cx-switch__button"></span>
    </span>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'CxSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.$refs.switchInput.checked = this.value
    // 设置背景色
    this.setBackgroundColor()
  },
  methods: {
    async handleChange () {
      if(this.disabled){return}
      if(this._events.beforeSwitch){
        this.$emit('beforeSwitch')
        return
      }
      this.$emit('change', !this.value)
      // 修改checkbox的值
      await this.$nextTick()
      this.$refs.switchInput.checked = this.value
    },
    setBackgroundColor () {
      if (this.activeColor || this.inactiveColor) {
        let newColor = this.value ? this.activeColor : this.inactiveColor
        this.$refs.core.style.borderColor = newColor
        this.$refs.core.style.backgroundColor = newColor
      }
    }
  },
  watch: {
    value () {
      this.setBackgroundColor()
    }
  }
}
</script>

<style lang="scss">
@import "@theme/_handle.scss";
.cx-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 2.125rem;
  width: 5.125rem;
  height: 2.625rem;
  line-height: 100%;
  vertical-align: middle;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  .cx-switch__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .cx-switch__core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 5.125rem;
    height: 2.625rem;
    border: .0625rem solid #dcdfe6;
    outline: none;
    border-radius: 1.3125rem;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color .3s,background-color .3s;
    vertical-align: middle;
    .cx-switch__button {
      position: absolute;
      top: .0625rem;
      left: .0625rem;
      border-radius: 100%;
      transition: all .3s;
      width: 2.4375rem;
      height: 2.4375rem;
      background-color: #FFFFFF;
    }
  }
}
.cx-switch.is-checked {
  .cx-switch__core {
    @include border_color("background_color15");
    @include background_color("background_color15");
    .cx-switch__button {
      transform: translateX(2.4375rem);
    }
  }
}
</style>
