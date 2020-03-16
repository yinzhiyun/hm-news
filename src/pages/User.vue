<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <router-link to="/editUser">
      <div class="info">
        <div class="left">
          <img src="../../public/images/1.jpg" alt>
        </div>
        <div class="center">
          <span class="iconfont iconxingbienan"></span>
          <span class="nickname">火星网友</span>
          <p class="time">2019-02-22</p>
        </div>
        <div class="right">
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </router-link>
    <hm-navbar title="我的关注" content="关注的用户"></hm-navbar>
    <hm-navbar title="我的跟帖" content="跟帖/回复"></hm-navbar>
    <hm-navbar title="我的收藏" content="文章/视频"></hm-navbar>
    <router-link to="/editUser">
      <hm-navbar title="设置"></hm-navbar>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.info {
  display: flex;
  height: 130px;
  border-bottom: 3px solid #ccc;
  padding: 0 20px;
  align-items: center;
  .left {
    img {
      width: 70px;
      height: 70px;
      display: block;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    margin-left: 10px;
    font-size: 16px;
    .iconxingbienan {
      color: lightskyblue;
    }
    .nickname {
      margin-left: 5px;
    }
    .time {
      color: #999;
      font-size: 14px;
    }
  }
  .right {
    width: 30px;
    text-align: right;
  }
}
</style>

