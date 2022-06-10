<template>
  <div class="main-container" :class="[className]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CxContainer',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang='scss'>
@import "@theme/_handle.scss";
.main-container{
  @include font_color("font_color9");
  @include background_color("background_color14");
}
</style>