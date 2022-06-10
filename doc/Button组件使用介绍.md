## Button组件使用

### 组件注册

```javascript
 // 全局引入
 import Cxui from 'cx-ui'
 Vue.use(Cxui)

 // 按需引入
 import {
   Button,
 } from 'cx-ui'
 Vue.use(Button)
```

### 模板中使用

```vue
    <!-- 不同type的button样式 -->
    <div class="row">
      <cx-button>按 钮</cx-button>
      <cx-button type="primary">按 钮</cx-button>
      <cx-button type="info">按 钮</cx-button>
      <cx-button type="grayInfo">按 钮</cx-button>
      <cx-button type="lightInfo">按 钮</cx-button>
    </div>

    <!-- 绑定click事件+自定义宽高 -->
    <div class="row">
      <cx-button round @click="handleAdd">添加</cx-button>
      <cx-button round  width="328" type="primary">尺寸</cx-button>
      <cx-button round  type="info">添加</cx-button>
      <cx-button round  type="grayInfo">添加</cx-button>
      <cx-button round  type="lightInfo">添加</cx-button>
    </div>

    <!-- 字体图标+文字 -->
    <div class="row">
      <cx-button icon="icon-edit">编辑</cx-button>
      <cx-button icon="icon-edit" type="primary">编辑</cx-button>
      <cx-button icon="icon-delete" type="info">删除</cx-button>
      <cx-button icon="icon-delete" type="grayInfo">删除</cx-button>
      <cx-button icon="icon-success" type="lightInfo">编辑</cx-button>
    </div>

    <!-- 字体图标按钮 -->
    <div class="row">
      <cx-button icon="icon-edit" square></cx-button>
      <cx-button icon="icon-edit" square type="primary"></cx-button>
      <cx-button icon="icon-delete" square type="info"></cx-button>
      <cx-button icon="icon-delete" square type="grayInfo"></cx-button>
      <cx-button icon="icon-success" square type="lightInfo"></cx-button>
    </div>
```

###  具体展示效果



![企业微信截图_16233966737027](D:\code\fe-research\ui\doc\Button组件使用介绍.assets\企业微信截图_16233966737027.png)

![企业微信截图_16234007866379](D:\code\fe-research\ui\doc\Button组件使用介绍.assets\企业微信截图_16234007866379.png)



### 参数说明

| 参数      | 描述                                                      | type     | 默认值 |
| --------- | --------------------------------------------------------- | -------- | ------ |
| click     | 点击事件(自定义事件）                                     | Function | null   |
| type      | 类型，可选值primary, info, grayInfo, lightInfo            | String   | 空     |
| round     | 是否是圆角按钮                                            | Boolean  | false  |
| square    | 是否是方形图标                                            | Boolean  | false  |
| disabled  | 禁用button                                                | Boolean  | false  |
| icon      | 使用的是iconfont的icon class,需要添加图标是传入对应的类名 | String   | 空     |
| className | 自定义类名                                                | String   | 空     |
| width     | 宽度，传入对应的Pixel，自动转化成rem， eg: width="300"    | String   | 空     |
| height    | 高度，传入对应的Pixel，自动转化成rem， eg: height="300"   | String   | 空     |

