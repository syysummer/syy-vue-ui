<template>
  <cx-container className="app-container">
    <div id="app">
      <!-- button测试 -->
      <div class="test-item">
        <h3>Button测试</h3>
        <cx-button @click="handleClick">button显示/隐藏</cx-button>
        <cx-button @click="toggleTheme" style="margin-left: 20px;">切换主题</cx-button>
        <ButtonTest v-show="isButtonShow"/>
      </div>
    
      <!-- dialog测试 -->
      <div class="test-item">
        <h3>Dialog测试</h3>
        <DialogTest />  
      </div>

      <!-- 图片缩放测试 -->
      <div class="test-item ">
        <h3>ImageScale测试</h3>
        <ImageScaleTest />
      </div>

      <!-- toast测试 -->
      <div class="test-item ">
        <h3>Toast测试</h3>
        <ToastTest />
      </div>

      <!-- loadingToast测试 -->
      <div class="test-item ">
        <h3>Loading测试</h3>
        <LoadingTest />
      </div>

      <!-- switch测试 -->
      <div class="test-item">
        <h3>Switch测试</h3>
        <cx-switch 
          :disabled="false"
          :value="isChecked" 
          @change="handleSwitchChange"
          @beforeSwitch="handleBeforeSwitch"
        >
        </cx-switch>
      </div>
         
      <!-- input测试 -->
      <div class="test-item">
        <h3>Input测试</h3>
        <InputTest />
      </div>

      <!-- input测试 -->
      <div class="test-item">
        <h3>Swiper测试</h3>
        <SwiperTest />
      </div>

      <div class="to-top" @click="handleScroll"><img src="./assets/img/back-to-top.png" alt=""></div>
    </div>
  </cx-container>
</template>

<script>
import ButtonTest from './ButtonDemo.vue'
import DialogTest from './DialogDemo.vue'
import ImageScaleTest from './ImageDemo.vue'
import ToastTest from './ToastTestDemo.vue'
import LoadingTest from './loadingDemo.vue'
import InputTest from './inputDemo.vue'
import SwiperTest from './swiperDemo.vue'
export default {
  name: 'App',
  data(){
    return {
      inputContent: '',
      isChecked: false,
      toastShow: false,
      isButtonShow: false,
    }
  },
  components: {
    ButtonTest,
    DialogTest,
    ImageScaleTest,
    ToastTest,
    LoadingTest,
    InputTest,
    SwiperTest,
  },
  created () {
    document.documentElement.setAttribute('data-theme', 'dark')
  },
  methods: {
    handleClick(){
      this.isButtonShow = !this.isButtonShow
    },
    toggleTheme () {
      const currentTheme = document.documentElement.getAttribute('data-theme')
      if(currentTheme === 'light'){
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
      }
    },
    handleSwitchChange(value){
      this.isChecked = value
    },
    handleBeforeSwitch(){
      // await 你的逻辑
      this.isChecked = !this.isChecked
    },
    handleScroll(){
      window.scrollTo(0,0)
    }
  }
}
</script>

<style lang='scss'>
@import "@theme/_handle.scss";
body{
  padding: 0;
  margin: 0;
}
#app{
  min-height: 100vh;
  color: #000;
  overflow: auto;
  scroll-behavior: smooth;
  @include font_color("font_color2");
  display: flex;
  flex-direction: column;
  display: -webkit-flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2.5rem;
  padding-bottom: 6.25rem;
  .test-item{
    margin-top: 2.5rem;
    &.image-wrap{
      width: 30rem;
      height: 30rem;
    }
  }
  .input-content{
    margin-top: .625rem;
  }
  .to-top{
    width: 3.75rem;
    height: 3.75rem;
    position: fixed;
    bottom: 2.5rem;
    right: 2.5rem;
    border-radius: 50%; 
    @include background_color("background_color4");
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
