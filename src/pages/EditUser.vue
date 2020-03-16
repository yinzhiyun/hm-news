<template>
  <div class="edituser">
    <hm-header>编辑资料</hm-header>
    <div class="info">
      <img src="../../public/images/1.jpg" alt>
    </div>
    <hm-navbar title="昵称" content="火星网友"></hm-navbar>
    <hm-navbar title="密码" content="123"></hm-navbar>
    <hm-navbar title="性别" content="男"></hm-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.edituser {
  .info {
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 70px;
      height: 70px;
      display: block;
      border-radius: 50%;
    }
  }
}
</style>
