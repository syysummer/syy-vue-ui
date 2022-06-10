### 全局注册

```javascript
// loading封装
import CxLoading from 'cx-ui'
Vue.use(CxLoading)
```

### 模板中使用

```vue
<cx-loading v-if="loadingShow" :visible.sync="loadingShow"
 :closeOnClickModal= true
 :closeCallBack="handleClose"
 className="loading-defined"
>
   <template v-slot:content>
     <div>加载中...</div>
   </template>
</cx-loading>
或者
<cx-loading v-if="loadingShow" :visible.sync="loadingShow"
 :closeOnClickModal= true
 :closeCallBack="handleClose"
 className="loading-defined"
>
 加载中...
</cx-loading>
<!--添加v-if熟悉可以在关闭弹窗时就销毁组件-->
```

### JS调用

```javascript
this.$cxLoading({
  content: '哈哈哈',
  closeOnClickModal: true,
  closeCallBack: () => {
    console.log('关闭啦')
  }
})
```

### 参数说明

| 参数              | 描述                                                   | type     | 默认值    |
| ----------------- | ------------------------------------------------------ | -------- | --------- |
| visible           | 显示/隐藏                                              | Boolean  | false     |
| closeTipMsg       | 弹窗关闭后的提示语                                     | String   | 空        |
| duration          | 弹窗自动关闭时间周期                                   | Number   | 180000 ms |
| closeCallBack     | 弹窗关闭后的回调函数                                   | Function | null      |
| closeOnClickModal | 点击遮罩层是否关闭弹窗                                 | Boolean  | false     |
| className         | 自定义类名                                             | String   | 空        |
| isHtml            | js调用时content传入的是否是html                        | Boolean  | false     |
| content           | js调用时的提示内容，isHtml为true可传标签，默认传String | /        | 空        |

### js关闭弹窗

```
this.$cxLoading.close()
```

