<template>
  <div class="tagbox">
    <div class="header">
      <div class="left" @click="$router.go(-1)">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <slot></slot>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tagbox {
  height: 50px;
}
.header {
  display: flex;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid red;
  padding: 0 10px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #f2f2f2;
  z-index: 999;
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
