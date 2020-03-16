<template>
  <div class="header">
    <div class="left" @click="$router.go(-1)">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid red;
  padding: 0 10px;
  .left {
    width: 30px;
  }
  .center {
    flex: 1;
    font-size: 16px;
    font-weight: 700;
  }
  .right {
    width: 30px;
  }
}
</style>
