## Input组件使用

### 组件注册

```javascript
// 全局引入
import Input from 'cx-ui'
Vue.use(Input)

// 局部注册
在组件内部引入
import { Input } from 'cx-ui'
export default {
  components: {
    [Input.name]: Input,
  },
}
```

### 模板中使用

```vue
  <cx-input 
    :type="type" 
    :value="inputContent" 
    @input="input" 
    label="手机号码"
    width="500"
    height="60"
    @changeType="changeType" 
    :showPassword="false" 
    placeholder="请输入内容" 
    :clearable="false"
  >
  <template v-slot:button><i class="iconfont icon-chakan1"></i></template>
  </cx-input>
```

###  具体展示效果

![image-20210628181659227](D:\code\fe-research\ui\doc\Input组件使用介绍.assets\image-20210628181659227.png)

![image-20210628181742787](D:\code\fe-research\ui\doc\Input组件使用介绍.assets\image-20210628181742787.png)

![image-20210628182031245](D:\code\fe-research\ui\doc\Input组件使用介绍.assets\image-20210628182031245.png)

### 插槽

| name   | 说明             |
| ------ | ---------------- |
| button | 输入框右侧的按钮 |

### 参数说明

| 参数         | 描述                                                         | type    | 默认值 |
| ------------ | ------------------------------------------------------------ | ------- | ------ |
| placeholder  | 占位内容                                                     | String  | 空     |
| type         | 自定义类型text, password, digit, number,组件内需要改变时要加.sync修饰符 | String  | 'text' |
| label        | 输入框左侧标题                                               | String  | 空     |
| width        | 整个框的宽度，包含标题和输入框,内容已经做了适配              | String  | '368'  |
| height       | 整个框的高度，包含标题和输入框,内容已经做了适配              | String  | '74'   |
| disabled     | 输入框是否禁用                                               | Boolean | false  |
| value        | 当前input绑定的值                                            | String  | ''     |
| clearable    | 是否需要有内容时展示清除按钮                                 | Boolean | false  |
| showPassword | 是否需要展示password的eyes按钮                               | Boolean | false  |

### 自定义事件

### 

| 参数       | 描述                   | 是否必传 |
| ---------- | ---------------------- | -------- |
| input      | 输入时实时校验         | 否       |
| blur       | 失去光标时校验         | 否       |
| clear      | 点击清除按钮时重新赋值 | 否       |
| changeType | 点击密码查看按钮时触发 | 否       |

### 测试demo

```vue
<template>
  <div class="input-wrap">
    <cx-button @click="inputShow = !inputShow">显示Input</cx-button>
    <div class="input-content-wrap" v-show="inputShow">
      <cx-input 
        :type.sync="type" 
        :value.sync="inputContent" 
        @input="handleInput" 
        @blur="handleBlur"
        @clear="handleClear"
        @changeType="changeType" 
        label=""
        width="500"
        height="60"
        :showPassword="false" 
        placeholder="请输入内容" 
        :clearable="true"
        :disabled="false"
      >
      <template v-slot:button><i class="iconfont icon-chakan1"></i></template>
      </cx-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputWrap',
  data () {
    return {
      inputShow: false,
      inputContent: '',
      type: 'number'
    }
  },
  mounted(){
  },
  methods: {
    handleInput (value,e) {
      this.inputContent = value
      console.log(e)
    },
    handleBlur (value, e) {
      this.inputContent = value
      console.log(e)
    },
    handleClear (value) {
      this.inputContent = value
    },
    changeType (value) {
      const type = value === 'password' ? 'text' : 'password'
      this.type = type
    }
  }
}
</script>

<style lang="scss" scoped>
.input-wrap{
  .input-content-wrap{
    margin-top: 1.25rem;
  }
  .iconfont{
    font-size:2.5rem;
  }
}
</style>
```

