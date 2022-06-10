<template>
  <div ref="swiperItem" class="cx-swiper-item">
    <div class="swiper-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'CxSwiperItem',
}
</script>

<style lang='scss'>
 .cx-swiper-item{
    height: 100%;
    float: left;
    flex-shrink: 0;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    -o-transition-property: transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    .swiper-item-content{
      width: 100%;
      height: 100%;
      object-fit: contain;
      >div{
        width: 100%;
        height: 100%;
      }
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
