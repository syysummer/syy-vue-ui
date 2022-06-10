## Toast组件使用

### 组件注册

```javascript
// 全局注册
import {
  Toast
} from 'cx-ui'
Vue.use(Toast)
```

### 模板中使用

```vue
    <!-- 1、常规的轻提示 -->
    <cx-toast 
      v-if="isShow"
      :visible.sync="isShow"
      position="center"
      :duration="3000"
      :onClose="()=>{}"
      className="diy-toast"
    >我是提示的内容呢</cx-toast>

    <!--2、info提示 -->
    <cx-toast 
      v-if="isShow"
      :visible.sync="isShow"
      position="center"
      :duration="3000"
      type="info"
      needIcon
      :onClose="()=>{}"
      className="diy-toast"
    >我是提示的内容呢</cx-toast>

	<!--3、success提示-->
	 <cx-toast 
      v-if="isShow"
      :visible.sync="isShow"
      position="center"
      :duration="3000"
      type="success"
      needIcon
      :onClose="()=>{}"
      className="diy-toast"
    >我是提示的内容呢</cx-toast>

   <!--添加v-if熟悉可以在关闭弹窗时就销毁组件-->
```



### `Javascript`中使用

```javascript
 this.$cxToast({
    message: '我只是一个微弱的toast',
    duration: 1000,
    position: 'center',
    needIcon,
    type: 'success',
    className: 'diy-toast',
    onClose: ()=>{
    }
  })
 
或者默认提示样式 this.$cxToast('我也是提示内容')
```



### 插槽

| name | 说明        |
| ---- | ----------- |
| ——   | toast的内容 |



### 参数说明

| 参数      | 描述                                      | type     | 默认值    |
| --------- | ----------------------------------------- | -------- | --------- |
| visible   | 提示显示隐藏                              | Boolean  | false     |
| duration  | 显示多长时间关闭                          | Number   | 2000      |
| onClose   | 提示框关闭时的回调                        | Function | null      |
| position  | 提示框展示位置（"center","top","bottom"） | String   | "center"  |
| type      | 提示框类型（"primary","info","success"）  | String   | "primary" |
| needIcon  | type为"info"和"success"时，是否需要icon   | Boolean  | false     |
| className | 自定义类名                                | String   | 空        |

