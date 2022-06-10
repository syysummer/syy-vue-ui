## Container组件使用

### 组件注册

```javascript
// Container暂时只是外部容器，用于多主题切换，暂时未写入相关布局
// 全局注册
import {
  Container
} from 'cx-ui'
Vue.use(Container)
```

### 模板中使用

```vue
  <cx-container>
    <div id="app">
      啦啦啦，我只是用于主题控制可以控制背景
    </div>
  </cx-container>
   
```

### 插槽

| name | 说明        |
| ---- | ----------- |
| ——   | Container内的内容 |

### 参数说明

| 参数      | 描述                                      | type     | 默认值    |
| --------- | ----------------------------------------- | -------- | --------- |
| className | 自定义类名                                | String   | 空        |

