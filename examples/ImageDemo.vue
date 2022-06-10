<template>
  <div>
    <cx-button @click="showImage = !showImage">显示/隐藏Image</cx-button>
    <div class="image-wrap" v-if="showImage">
      <cx-image src="http://static.home.baidu.com/homebd/imlbejgkndchaf1496971659.jpg?authorization=bce-auth-v1%2Fe6803def36ae467f81ebdb4bdc75f119%2F2017-06-09T01%3A27%3A39Z%2F-1%2F%2F25b707ca10a5e3ef1300fc624c81c33c6c6519306163eea9b527a3feca5ffa2a" />
    </div>
  </div>
</template>

<script>
import { Image } from '../packages/index'
export default {
  name: 'ImageScaleTest',
  data () {
    return {
      showImage: false,
    }
  },
  components: {
    [Image.name]: Image,
  },
  mounted(){
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.image-wrap{
  width: 37.5rem;
  height: 37.5rem;
  margin-top: 1.25rem;
}
</style>
