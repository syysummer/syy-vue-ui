## Switch组件使用

### 组件注册

```javascript
// 全局注册
import {
  Switch
} from 'cx-ui'
Vue.use(Switch)

// 局部注册
在组件内部引入
import { Switch } from 'cx-ui'
export default {
  components: {
    [Switch.name]: Switch,
  },
}
```

### 模板中使用

```vue
<cx-switch 
  :disabled="false"
  :value="isChecked" 
  @change="handleSwitchChange"
  @beforeSwitch="handleBeforeSwitch"
  activeColor="#0e5964"
  inactiveColor="#EAEAEA"
>
</cx-switch>

```

### JS部分

```javascript
<script>
export default {
  data(){
    return {
      isChecked: false,
    }
  },
  methods: {
    handleSwitchChange(value){
      this.isChecked = value
    },
    handleBeforeSwitch(){
      // await 你的逻辑
      this.isChecked = !this.isChecked
    },
  }
}
</script>
```



### 参数说明

| 参数          | 描述                                                  | type           | 默认值             |
| ------------- | ----------------------------------------------------- | -------------- | ------------------ |
| value         | 当前switch的状态，true为开，false为关                 | Boolean        | false              |
| disabled      | 当前switch是否禁用                                    | Boolean        | false              |
| change        | 改变switch状态时触发                                  | Function       | null               |
| beforeSwitch  | 点击switch改变前执行的逻辑(需要自己手动改变isChecked) | Function       | null               |
| activeColor   | switch开启的背景色                                    | String（色值） | "\#02C6E3"(创想蓝) |
| inactiveColor | switch关闭的背景色                                    | String（色值） | "\#dcdfe6"         |

