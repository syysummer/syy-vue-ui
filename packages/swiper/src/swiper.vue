<template>
   <div class="cx-swiper-content" ref="swiperWrap" :style="handleSize()">
    <div
      tag="ul"
      class="slide-ul"
      id="sliderList"
      @touchstart = "fnTouchStart"
      @touchmove = "fnTouchMove"
      @touchend = "fnTouchEnd"
      @transitionend="fnTransitionEnd"
    >
      <slot></slot>
    </div>
    <section class="pagination-items">
      <div :class="{active: (currentIndex - 1) === index}" v-for="(item,index) in paginationList" :key="index"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: "CxSwiper",
  props: {
    duration: {
      type: Number,
      default: 3000,
    },
    indicatorColor: {
      type: String,
      default: '#00deff',
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
  data() {
    return {
      currentIndex: 1,
      timer: "",
      offX: 0, //sliderList的左偏移量
      paginationList: [],
      bReady: true,  //设置一个开关,是css运动结束后解锁
      sliderList: null,
      sliderItems: [],
      num: 0, // slider的总页数
      disX: 0,
      downX: 0,
    }
  },
  methods: {
    stop() {
      clearInterval(this.timer)
      this.timer = null
    },
    autoPlay() {
      this.stop()
      this.timer = setInterval(() => {
        this.currentIndex++
        if(this.currentIndex == this.num + 1) {
          this.offX = -1 * this.sliderItems[0].offsetWidth
          this.sliderList.style.transition = 'none'
          this.sliderList.style.transform = 'translate3d(' + 0 * this.sliderItems[0].offsetWidth + 'px,0,0)'
          let timerInner = setTimeout(() => {
            this.sliderList.style.transition = '500ms all ease'
            this.sliderList.style.transform = 'translate3d(' + this.offX + 'px,0,0)'
            clearTimeout(timerInner)
          })
          this.bReady = true
          this.currentIndex = 1
        } else {
          this.sliderList.style.transition = 'none'
          this.offX = -this.currentIndex * this.sliderItems[0].offsetWidth
          this.sliderList.style.transform = 'translate3d(' + this.offX + 'px,0,0)'
          this.sliderList.style.transition = '500ms all ease'
          this.bReady = true
        }
      }, this.duration)
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
    },
    init(){
      this.sliderList = document.getElementById('sliderList')
      this.sliderItems = this.sliderList.children
      this.num = this.sliderItems.length
      this.sliderList.style.width = (this.num + 2) * 100 + '%'
      this.sliderList.style.transform = 'translateX(-' + 100 / (this.num + 2) + '%)'
      this.sliderList.appendChild(this.sliderItems[0].cloneNode(true))
      this.sliderList.insertBefore(this.sliderItems[this.num - 1].cloneNode(true), this.sliderItems[0])
      this.paginationList = new Array(this.num)
      for(var i = 0; i < this.num + 2; i++) {
        this.sliderItems[i].style.width = 100 / (this.num + 2) + '%'
      }
      this.offX = -this.currentIndex * this.sliderItems[0].offsetWidth
    },
    fnTouchStart (ev) {
      this.stop()
      if(this.bReady == false) {
        return
      }
      this.bReady = false
      this.sliderList.style.transition = 'none'
      this.disX = ev.targetTouches[0].pageX - this.offX
      this.downX = ev.targetTouches[0].pageX
      ev.preventDefault()
    },
    fnTouchMove (ev) {
      this.stop()
      this.offX = ev.targetTouches[0].pageX - this.disX
      this.sliderList.style.transform = 'translate3d(' + this.offX + 'px,0,0)'
      ev.preventDefault()
    },
    fnTouchEnd (ev) {
      let upX = ev.changedTouches[0].pageX
      //判断是否移动距离大于50
      if(Math.abs(upX - this.downX) > 0) {
          //左边移动
        if(upX - this.downX < 0) {
          this.currentIndex++
          if(this.currentIndex == this.sliderItems.length) {
            this.currentIndex = this.sliderItems.length - 1
          }
        } else {
          //右边移动
          this.currentIndex--
          if(this.currentIndex == -1) {
            this.currentIndex = 0
          }
        }
      }
      //储存此时ul的位置
      this.stop()
      this.isTouchTransition = true
      this.offX = -this.currentIndex * this.sliderItems[0].offsetWidth
      this.sliderList.style.transform = 'translate3d(' + this.offX + 'px,0,0)'
      this.sliderList.style.transition = '500ms all ease'
      ev.preventDefault()
    },
    //监听li 当移动到两端的li时  瞬间移回
    fnTransitionEnd() {
      if(this.currentIndex == this.num + 1) {
        this.currentIndex = 1
      }
      if(this.currentIndex == 0) {
        this.currentIndex = this.num
      }
      this.stop()
      this.sliderList.style.transition = 'none'
      this.offX = -this.currentIndex * this.sliderItems[0].offsetWidth
      this.sliderList.style.transform = 'translate3d(' + this.offX + 'px,0,0)'
      this.bReady = true
      clearTimeout(this.rePlayTimer)
      this.rePlayTimer = setTimeout(() => {
        clearTimeout(this.rePlayTimer)
        this.autoPlay()
      })
    }
  },
  beforeDestroy() {
    this.stop()
  },
  mounted() {
    this.initTimer = setTimeout(async () => {
      this.init()
      await this.$nextTick()
      this.autoPlay()
      clearTimeout(this.initTimer)
    })
  },
};
</script>
<style lang="scss" scoped>
 @import "@theme/_handle.scss";
 .cx-swiper-content{
    width: 100%;
    height: 18.75rem;
    position: relative;
    @include background_color("background_color18");
    background-color: #FFFFFF;
    overflow: hidden;
    .slide-ul{
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding: 0;
      margin: 0;
      list-style: none;
      &:after {
        content: '';
        display: block;
        height: 0;
        visibility: hidden;
        line-height: 0;
        clear: both;
      }
    }
    .pagination-items{
      position: absolute;
      width: 100%;
      height: 2.5rem;
      bottom: 0rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      div{
        width: 1.125rem;
        height: 1.125rem;
        margin: 0 .3125rem;
        border-radius: 50%;
        border: .0625rem solid;
        @include border_color("border_color6");
        &.active{
          @include border_color("background_color17");
          @include background_color("background_color17");
        }
      }
    }
  }
</style>