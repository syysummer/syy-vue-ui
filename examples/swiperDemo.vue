<template>
  <div class="swiper-test">
    <cx-button @click="swiperShow = !swiperShow">显示Swiper</cx-button>
    <cx-swiper class="my-swipe" v-if="swiperShow" :autoplay="3000" width="500" height="300" indicator-color="#00deff">
      <cx-swiper-item v-for="(item, idx) in swiperList" :key="idx">
        <img :src="item" alt="">
      </cx-swiper-item>
    </cx-swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperList: [
        'https://pic-cdn.creality.com/model/B84214F11417D54C812745CB1FD062FE4.png',
        'https://pic-cdn.creality.com/model/FF0A753C3758BD4990CD2CE8601830821.png',
        'https://pic-cdn.creality.com/model/860c7395-37d5-4d3c-8201-7fa76a072955',
      ],
      swiperShow: true,
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.my-swipe{
  width: 100%;
  height: 100%;
  margin-top: 20px;
  background-size: 100% 100%;
}
</style>
