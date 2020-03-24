<template>
  <div class="collection">
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="post in list" :key="post.id" :post="post"></hm-post>
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
      const { statusCode, data } = res.data;
      data.forEach(item => {
        item.comment_length = item.comments.length;
      });
      if (statusCode === 200) {
        this.list = data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
