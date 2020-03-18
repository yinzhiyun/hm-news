<template>
  <div class="concern">
    <hm-header>我的关注</hm-header>
    <ul class="concern-list">
      <li>
        <div class="left">
          <img src="../../public/images/1.jpg" alt>
        </div>
        <div class="center">
          <span class="nickname">火星新闻播报</span>
          <p class="time">2019-10-22</p>
        </div>
        <div class="right">
          <van-button round type="info">取消关注</van-button>
        </div>
      </li>
      <li>
        <div class="left">
          <img src="../../public/images/1.jpg" alt>
        </div>
        <div class="center">
          <span class="nickname">火星新闻播报</span>
          <p class="time">2019-10-22</p>
        </div>
        <div class="right">
          <van-button round type="info">取消关注</van-button>
        </div>
      </li>
      <li>
        <div class="left">
          <img src="../../public/images/1.jpg" alt>
        </div>
        <div class="center">
          <span class="nickname">火星新闻播报</span>
          <p class="time">2019-10-22</p>
        </div>
        <div class="right">
          <van-button round type="info">取消关注</van-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.concern-list {
  li {
    display: flex;
    height: 80px;
    border-bottom: 1px solid #999;
    align-items: center;
    padding: 0 20px;
    .left {
      img {
        width: 40px;
        height: 40px;
        display: block;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      margin-left: 16px;
      .nickname {
        font-size: 16px;
      }
      .time {
        color: #999;
        font-size: 14px;
      }
    }
    .right {
      button {
        background-color: #ccc;
        border-color: #ccc;
        color: #363636;
        height: 30px;
        line-height: 30px;
        width: 90px;
        font-size: 12px;
      }
    }
  }
}
</style>
