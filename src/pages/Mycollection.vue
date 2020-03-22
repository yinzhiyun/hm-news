<template>
  <div class="collection">
    <hm-header>我的收藏</hm-header>
    <div class="coll_list" v-for="item in list" :key="item.id">
      <div class="title">
        <span class="left">{{item.title}}</span>
        <img v-if="item.cover.length === 1" class="oneimg" :src="item.cover[0].url" alt>
      </div>
      <div v-if="item.cover.length > 1" class="img">
        <img v-for="img in item.cover" :src="img.url" alt>
      </div>
      <div class="news">
        <span class="type">{{item.user.nickname}}</span>
        <span class="comments">{{item.comments.length}}评论</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.$axios({
        url: "/user_star",
        method: "get"
      });
      console.log(res);
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.list = data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.collection {
  .coll_list {
    border-bottom: 1px solid #999;
    padding: 10px;
    .title {
      font-size: 16px;
      display: flex;
      .oneimg {
        margin: 0 10px;
        width: 112px;
        height: 74px;
        display: block;
        object-fit: cover;
      }
    }
    .img {
      display: flex;
      justify-content: space-evenly;
      img {
        width: 112px;
        height: 74px;
        display: block;
        object-fit: cover;
      }
      margin: 8px 0;
    }
    .news {
      color: rgba(134, 134, 134, 0.86666667);
      .comments {
        margin-left: 10px;
      }
    }
  }
}
</style>
