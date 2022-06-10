
<template>
  <div class="cx-image-scale" @doubleTap="handleDblClick" @dblclick="handleDblClick" ref="imgWrap">
    <canvas ref="bargraphCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script>
export default {
  name: 'CxImage',
  props: {
    src: {
      type: String,
      default: '',
    }
  },
  data () { 
    return {
      canvasWidth: 600,
      canvasHeight: 600,
      myCanvas: null,
      ctx: null,
      imgX: 0, // 图片在画布中渲染的起点x坐标
      imgY: 0,
      MINIMUM_SCALE: 0.2,
      imgScale: 1, // 图片启示的缩放大小
      loadImgObj: null,
      img: null,
      flag: false,
      pos: {},
      posl: {},
      flagPC: true,
      scaleSpeed: 0.1,
    }
  },
  mounted() {
    this.canvasWidth = this.$refs.imgWrap.offsetWidth
    this.canvasHeight = this.$refs.imgWrap.offsetHeight
    this.flagPC = this.IsPC()
    this.myCanvas = this.$refs.bargraphCanvas
    this.ctx = this.myCanvas.getContext('2d')
    this.src && this.loadImg()
  },
  watch: {
    src(){
      this.initData()
      this.loadImg()
    }   
  },
  methods: {
    loadImg() {
      let _this = this
      _this.img = new Image()
      _this.img.src = this.src
      _this.img.onload = function () {
        _this.drawImage()
        _this.canvasEventsInit()
      }
      !_this.src &&  _this.drawImage()
    },
    drawImage() {
      let _this = this
      this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height)
      this.ctx.drawImage(
        _this.img, //规定要使用的图像、画布或视频。
        0, 0, //开始剪切的 x 坐标位置。
        _this.img.width, _this.img.height,  //被剪切图像的高度。
        _this.imgX, _this.imgY,//在画布上放置图像的 x 、y坐标位置。
        _this.img.width * _this.imgScale, _this.img.height * _this.imgScale  //要使用的图像的宽度、高度
      )
    },
    canvasEventsInit() {
      var pageX, pageY, initX, initY
      var start = []
      let _this = this
      if(this.flagPC) {//PC
        this.myCanvas.onmousedown = function (event) {
          _this.flag = true
          _this.pos = _this.windowToCanvas(event.clientX, event.clientY) //坐标转换，将窗口坐标转换成canvas的坐标
        }
        this.myCanvas.onmousemove = function (evt) {  //移动
          if(_this.flag ){
            _this.posl = _this.windowToCanvas(evt.clientX, evt.clientY)
            var x = _this.posl.x - _this.pos.x, y = _this.posl.y - _this.pos.y
            _this.imgX  += x
            _this.imgY  += y
            _this.pos = JSON.parse(JSON.stringify(_this.posl))
            _this.drawImage()//重新绘制图片
          }
        }
        this.myCanvas.onmouseup = function () {
          _this.flag  = false
        }
        this.myCanvas.onmousewheel = this.myCanvas.onwheel = function (event) {    //滚轮放大缩小
          var pos = _this.windowToCanvas(event.clientX, event.clientY)
          var newPos = {x:((pos.x-_this.imgX)/_this.imgScale).toFixed(2) , y:((pos.y-_this.imgY)/_this.imgScale).toFixed(2)}
          if (event.wheelDelta > 0) {// 放大
                  _this.imgScale += _this.scaleSpeed
                  _this.imgX = (1-_this.imgScale)*newPos.x+(pos.x-newPos.x)
                  _this.imgY = (1-_this.imgScale)*newPos.y+(pos.y-newPos.y)
          } else {//  缩小
              _this.imgScale -= _this.scaleSpeed
              if(_this.imgScale<_this.MINIMUM_SCALE) {//最小缩放1
                  _this.imgScale = _this.MINIMUM_SCALE
              }
              _this.imgX = (1-_this.imgScale)*newPos.x+(pos.x-newPos.x)
              _this.imgY = (1-_this.imgScale)*newPos.y+(pos.y-newPos.y)
          }
          _this.drawImage()  //重新绘制图片
          event.preventDefault()
        }
      } else { //移动端或Pad端
        this.myCanvas.addEventListener('touchstart', function (event) {
          _this.flag = true
          if(event.touches && event.touches.length < 2) {
            let touch = event.touches[0]
            _this.pos = _this.windowToCanvas(touch.clientX, touch.clientY) //坐标转换，将窗口坐标转换成canvas的坐标
          }else{
            let touches = event.touches
            //手指按下时的手指所在的X，Y坐标  
            pageX = touches[0].pageX
            pageY = touches[0].pageY
            //初始位置的X，Y 坐标  
            initX = event.target.offsetLeft
            initY = event.target.offsetTop
            console.log(pageX,pageY,initX,initY)
            //记录初始 一组数据 作为缩放使用
            if (touches.length >= 2) { //判断是否有两个点在屏幕上
              start = touches//得到第一组两个点
            }
          }
        })
        this.myCanvas.addEventListener('touchmove', function (evt) {  //移动
          if(_this.flag ){
            if(evt.touches && evt.touches.length < 2) {
              let touch = evt.touches[0]
              _this.posl = _this.windowToCanvas(touch.clientX, touch.clientY)
              var x = _this.posl.x - _this.pos.x, y = _this.posl.y - _this.pos.y
              _this.imgX  += x
              _this.imgY  += y
              _this.pos = JSON.parse(JSON.stringify(_this.posl))
            }else{
              let touches = evt.touches
              // 2 根 手指执行 目标元素放大操作
              //得到第二组两个点
              var now = touches
              var pos = _this.windowToCanvas (now[0].clientX, now[0].clientY)
              var newPos = {x:((pos.x-_this.imgX)/_this.imgScale).toFixed(2) , y:((pos.y-_this.imgY)/_this.imgScale).toFixed(2)}
              //当前距离变小， getDistance 是勾股定理的一个方法
              if(_this.getDistance(now[0], now[1]) < _this.getDistance(start[0], start[1])){
                // 缩小
                _this.imgScale -= _this.scaleSpeed
                if(_this.imgScale<_this.MINIMUM_SCALE) {//最小缩放1
                  _this.imgScale = _this.MINIMUM_SCALE
                }
                _this.imgX = (1-_this.imgScale)*newPos.x+(pos.x-newPos.x)
                _this.imgY = (1-_this.imgScale)*newPos.y+(pos.y-newPos.y)
              }else if(_this.getDistance(now[0], now[1]) > _this.getDistance(start[0], start[1])){
                // 放大
                _this.imgScale += _this.scaleSpeed
                _this.imgX = (1-_this.imgScale)*newPos.x+(pos.x-newPos.x)
                _this.imgY = (1-_this.imgScale)*newPos.y+(pos.y-newPos.y)
              }
              start = now
            }
            _this.drawImage() //重新绘制图片
          }
        })
        this.myCanvas.addEventListener('touchend', function () {
          _this.flag  = false
        })
     }
    },
    /*坐标转换*/
    windowToCanvas(x,y) {
      var box = this.myCanvas.getBoundingClientRect()//这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
      return {
        x: x - box.left - (box.width - this.myCanvas.width) / 2,
        y: y - box.top - (box.height - this.myCanvas.height) / 2
      }
    },
    //缩放 勾股定理方法-求两点之间的距离
    getDistance(p1, p2) {
      var x = p2.pageX - p1.pageX,
      y = p2.pageY - p1.pageY
      return Math.sqrt((x * x) + (y * y))
    },
    IsPC() {
      var userAgentInfo = navigator.userAgent
      var Agents = ["Android", "iPhone",
                  "SymbianOS", "Windows Phone",
                  "iPad", "iPod", "QtWebEngine"]
      var flag = true
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }
      return flag
    },
    handleDblClick () { //双击还原
      this.initData()
      this.src && this.drawImage() //重新绘制图片
    },
    initData () { //src变化和双击时需要初始化数据
      this.imgScale = 1
      this.imgX = 0
      this.imgY = 0
    }
  }
}
</script>

<style scoped lang="scss">
.cx-image-scale {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #001;
  &::-webkit-scrollbar  
  {  
    width: 0;  /*滚动条宽度*/
    height: 0;  /*滚动条高度*/
  }  
  /*定义滚动条轨道 内阴影+圆角*/  
  &::-webkit-scrollbar-track  
  {  
    -webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0.3);  
    border-radius: 0;  /*滚动条的背景区域的圆角*/
  }  
  /*定义滑块 内阴影+圆角*/  
  &::-webkit-scrollbar-thumb  
  {  
    border-radius: 0;  /*滚动条的圆角*/
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
  }
 }
</style>