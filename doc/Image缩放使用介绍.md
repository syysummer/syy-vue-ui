### 全局注册

```javascript
// main.js中添加如下代码
// image缩放平移功能封装， 全局注册
import {
  Image
} from 'cx-ui'
Vue.use(Image)

// 局部注册
在组件内部引入
import { Image } from 'cx-ui'
export default {
  components: {
    [Image.name]: Image,
  },
}
```

### 模板中使用

```vue
<!-- 图片缩放测试 -->
 <div class="image-wrap">
    <cx-image src="https://oktools.net/ph/600x600?t=imageScale&bg=33373E&fg=00DEFF" />
 </div>

<!-- 注意： 在使用组件时最好指定容器的宽高，内部默认占满整个容器 -->
```

### 参数说明

| 参数 | 描述         | type   | 默认值 |
| ---- | ------------ | ------ | ------ |
| src  | 图片资源地址 | String | 空     |

