<template>
  <div>
    <!-- 不同type的button样式 -->
    <div class="row">
      <cx-button>按 钮</cx-button>
      <cx-button type="primary">按 钮</cx-button>
      <cx-button type="info">按 钮</cx-button>
      <cx-button type="grayInfo">按 钮</cx-button>
      <cx-button type="lightInfo">按 钮</cx-button>
      <cx-button disabled type="grayInfo">按 钮</cx-button>
    </div>

    <!-- 绑定click事件+自定义宽高 -->
    <div class="row">
      <cx-button round @click="handleAdd">添加</cx-button>
      <cx-button round  width="328" type="primary">尺寸</cx-button>
      <cx-button round  type="info">添加</cx-button>
      <cx-button round  type="grayInfo">添加</cx-button>
      <cx-button round  className="add-btn" type="lightInfo">添加</cx-button>
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
      <cx-button icon="icon-loading" square type="primary"></cx-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleAdd(){
      console.log('点击了添加按钮')
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  padding: 10px 0;
}
.cx-button {
  margin-left: 10px;
}
</style>
