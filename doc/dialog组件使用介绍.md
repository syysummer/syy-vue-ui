## Dialog组件使用

### 组件注册

```javascript
// 全局注册
import {
  Dialog
} from 'cx-ui'
Vue.use(Dialog)

 // 局部注册（只支持标签使用）
 import { Dialog } from 'cx-ui'
 export default {
  components: {
    [Dialog.name]: Dialog,
  },
 }
```

### 模板中使用

```vue
    <!-- 1、带标题的弹窗 -->
     <cx-dialog 
     title="这是一个弹窗啦"
     :visible.sync="isDialogShow"
     showCancelButton
     :confirm-button-text="Btn.confirmBtn"
     :cancel-button-text="Btn.cancelBtn"
     @confirm="fnConfirm"
     @cancel="fnCancel"
     :needClose="false"
     :isCenter="false"
     className="diy-dialog"
    >
      这是一个弹窗内容啦啦，代码就是写给人来看的，代码是写出来给人看的，附带能在机器上运行
    </cx-dialog>


    <!--2、标题需要自定义标签 -->
    <cx-dialog 
     title="这是一个弹窗啦"
     :visible.sync="isDialogShow"
     showCancelButton
     :confirm-button-text="Btn.confirmBtn"
     :cancel-button-text="Btn.cancelBtn"
     @confirm="fnConfirm"
     @cancel="fnCancel"
     :needClose="false"
     :isCenter="false"
     className="diy-dialog"
    >
      <template v-slot:title>
        <div>这是一个弹窗标题啦，代码就是写给人来看的</div>
      </template>
      <div> 这是一个弹窗内容啦啦，代码就是写给人来看的，代码是写出来给人看的，附带能在机器上运行</div>
    </cx-dialog>

	<!--3、自定义底部按钮 传入具名插槽footer-->
	 <cx-dialog 
     title="这是一个弹窗啦"
     :visible.sync="isDialogShow"
     showCancelButton
     :confirm-button-text="Btn.confirmBtn"
     :cancel-button-text="Btn.cancelBtn"
     @confirm="fnConfirm"
     @cancel="fnCancel"
     :needClose="false"
     :isCenter="false"
     className="diy-dialog"
    >
      <template v-slot:title>
        <div>这是一个弹窗标题啦，代码就是写给人来看的</div>
      </template>
      <div> 这是一个弹窗内容啦啦，代码就是写给人来看的，代码是写出来给人看的，附带能在机器上运行</div>
      <template v-slot:footer>
        <cx-button @click="isDialogShow = false">取 消</cx-button>
        <cx-button type="primary" @click="isDialogShow = false">确 定</cx-button>
      </template>
    </cx-dialog>

    <!--4、不需要取消按钮-->
    <cx-dialog 
     title="这是一个弹窗啦"
     :visible.sync="isDialogShow"
     :showCancelButton="false"
     :confirm-button-text="Btn.confirmBtn"
     :cancel-button-text="Btn.cancelBtn"
     @confirm="fnConfirm"
     @cancel="fnCancel"
     :needClose="false"
     :isCenter="false"
     className="diy-dialog"
    >
      <template v-slot:title>
        <div>这是一个弹窗标题啦，代码就是写给人来看的</div>
      </template>
      <div> 这是一个弹窗内容啦啦，代码就是写给人来看的，代码是写出来给人看的，附带能在机器上运行</div>
    </cx-dialog>

	 <!--5、如果需要弹窗居中展示isCenter属性不传-->

```



### `Javascript`中使用

```javascript
 // 确认框
  this.$cxdialog.confirm({
    title: '弹窗标题',
    message: '弹窗内容',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showCancelButton: true,
  }).then((res) => {
    console.log(res, '点击确定的回调')
  }).catch((err) => {
    console.log(err, '点击取消的回调')
  })

 // 提示框
  this.$cxdialog.alert({
    title: '弹窗标题',
    message: '弹窗内容',
    confirmButtonText: '确定',
  }).then((res) => {
    console.log(res, '确认了')
  })
```



### 插槽

| name   | 说明                    |
| ------ | ----------------------- |
| ——     | Dialog 提示的内容       |
| title  | Dialog 标题区的内容     |
| footer | Dialog 按钮操作区的内容 |



### 参数说明

| 参数              | 描述                                                   | type    | 默认值    |
| ----------------- | ------------------------------------------------------ | ------- | --------- |
| visible           | 控制弹窗显示隐藏                                       | Boolean | false     |
| title             | 弹窗标题                                               | String  | 空        |
| width             | 弹窗宽度（传入对应pixel只会自动转化为rem）             | String  | 空        |
| isCenter          | 是否居中展示                                           | Boolean | true      |
| top               | 距离顶部高度(isCenter为false是生效)                    | String  | "20vh"    |
| className         | 自定义类名                                             | String  | 空        |
| type              | dark主题下支持两种风格，primary是暗色调，light是亮色调 | String  | "primary" |
| needClose         | 弹窗上是否带关闭按钮(pc的备用字段)                     | Boolean | false     |
| confirmButtonText | 确定按钮文案                                           | String  | 空        |
| cancelButtonText  | 取消按钮文案                                           | String  | 空        |
| showCancelButton  | confirm弹窗是否展示取消按钮                            | Boolean | true      |
| isHtml            | js调用时content是否传入html                            | Boolean | false     |

