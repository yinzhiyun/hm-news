<template>
  <div class="concern">
    <hm-header>我的关注</hm-header>
    <ul class="concern-list">
      <li v-for="item in concern" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL+item.head_img" alt>
        </div>
        <div class="center">
          <span class="nickname">{{item.nickname}}</span>
          <p class="time">{{item.create_date | date}}</p>
        </div>
        <div class="right">
          <van-button round type="info" @click="editconcern(item.id)">取消关注</van-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      concern: []
    };
  },
  created() {
    this.getUser_list();
  },
  methods: {
    async getUser_list() {
      const res = await this.$axios({
        url: "/user_follows",
        method: "get"
      });
      this.concern = res.data.data;
    },
    async editconcern(id) {
      try {
        await this.$dialog.confirm({
          title: "温馨提示",
          message: "确认要取消关注吗?"
        });
        const res = await this.$axios({
          url: `/user_unfollow/${id}`,
          method: "get"
        });
        if (res.data.statusCode === 200) {
          this.$toast.success(res.data.message);
          this.getUser_list();
        }
      } catch {
        this.$toast("操作取消");
      }
    }
  }
};
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
