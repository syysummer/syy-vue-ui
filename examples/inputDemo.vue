<template>
  <div class="input-wrap">
    <cx-button @click="inputShow = !inputShow">显示Input</cx-button>
    <div class="input-content-wrap" v-show="inputShow">
      <!-- @changeType="changeType"  -->
      <cx-input 
        :type.sync="type" 
        :value.sync="inputContent" 
        @input="handleInput"
        @blur="handleBlur"
        @clear="handleClear"
        label=""
        width="500"
        height="60"
        :showPassword="true" 
        placeholder="请输入内容" 
        :clearable="true"
        :disabled="false"
      >
      <!-- <template v-slot:button><i class="iconfont icon-chakan1"></i></template> -->
      </cx-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputWrap',
  data () {
    return {
      inputShow: false,
      inputContent: '',
      type: 'number'
    }
  },
  mounted(){
  },
  methods: {
    handleInput (value,e) {
      this.inputContent = value
      console.log(e)
    },
    handleBlur (value, e) {
      this.inputContent = value
      console.log(e)
    },
    handleClear (value) {
      this.inputContent = value
    },
    changeType (value) {
      const type = value === 'password' ? 'text' : 'password'
      this.type = type
    }
  }
}
</script>

<style lang="scss" scoped>
.input-wrap{
  .input-content-wrap{
    margin-top: 1.25rem;
  }
  .iconfont{
    font-size:2.5rem;
  }
}
</style>
