function rem (designWidth, maxWidth) {
  var doc = document,
    docEl = doc.documentElement,
    remStyle = document.createElement('style'),
    html = document.getElementsByTagName('html')[0]

  function refreshRem () {
    var width = docEl.getBoundingClientRect().width
    maxWidth = maxWidth || 750
    width > maxWidth && (width = maxWidth)
    var rem = (width * 16) / designWidth
    html.style.fontSize = rem + 'px'
  }

  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle)
  } else {
    var wrap = doc.createElement('div')
    wrap.appendChild(remStyle)
    doc.write(wrap.innerHTML)
    wrap = null
  }
  refreshRem()

  // 初始化body的字体大小，方式适配时由于屏幕
  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = '16px'
  } else {
    doc.addEventListener(
      'DOMContentLoaded',
      function () {
        doc.body.style.fontSize = '16px'
      },
      false
    )
  }
}

function runRem () {
  var designPageWidth =
    document.documentElement.clientWidth || document.body.clientWidth
  var designPageHeight =
    document.documentElement.clientHeight || document.body.clientHeight
  if (designPageWidth > 1024) {
    rem(1920, 1920)
  }else if (designPageWidth > designPageHeight) {
    rem(1024, 1024)
  }else if(designPageWidth < 600){
    rem(750, 750)
  } else {
    rem(600, 750)
  }
}

runRem()
//要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
function resizeCallBack() {
  clearTimeout(tid)
  let tid = setTimeout(runRem, 300)
}
window.addEventListener(
  'resize',
  resizeCallBack,
  false
)
window.addEventListener(
  'pageshow',
  function (e) {
    if (e.persisted) {
      // 浏览器后退的时候重新计算
      clearTimeout(tid)
      let tid = setTimeout(runRem, 300)
    }
  },
  false
)