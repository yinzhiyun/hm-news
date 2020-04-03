<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="info" @click="$router.push('/editUser')">
      <div class="left">
        <img :src="getimgUrl" alt>
      </div>
      <div class="center">
        <span v-if="info.gender===1" class="iconfont iconxingbienan"></span>
        <span v-else class="iconfont iconxingbienv"></span>
        <span class="nickname">{{info.nickname}}</span>
        <p class="time">{{info.create_date | date}}</p>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar title="我的关注" content="关注的用户" @click="$router.push('/Myconcern')"></hm-navbar>
    <hm-navbar title="我的跟帖" content="跟帖/回复" @click="$router.push('/Mycomments')"></hm-navbar>
    <hm-navbar title="我的收藏" content="文章/视频" @click="$router.push('/Mycollection')"></hm-navbar>
    <hm-navbar title="栏目管理" @click="$router.push('/Column')"></hm-navbar>
    <hm-navbar title="设置" @click="$router.push('/editUser')"></hm-navbar>
    <hm-navbar title="退出" @click="logout"></hm-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    };
  },
  created() {
    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");
    this.$axios({
      url: `/user/${userId}`,
      method: "get",
      headers: { Authorization: token }
    }).then(res => {
      this.info = res.data.data;
    });
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "确认要退出吗?"
        })
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("column");
          localStorage.removeItem("delcolumn");
          this.$toast.success("退出成功");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$toast("操作取消");
        });
    }
  },
  computed: {
    getimgUrl() {
      return this.$axios.defaults.baseURL + this.info.head_img;
    }
  }
};
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
    .iconxingbienv {
      color: pink;
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

