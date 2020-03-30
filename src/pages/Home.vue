<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="center" @click="$router.push('/Search')">
        <span class="iconfont iconsearch"></span>
        <span class="text">搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-tabs v-model="active" sticky swipeable animated>
      <van-tab v-for="item in tab_list" :key="item.id" :title="item.name">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="50"
          >
            <hm-post v-for="post in post_list" :key="post.id" :post="post"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      active: 0,
      tab_list: [],
      post_list: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  created() {
    const column = localStorage.getItem("column");
    if (column) {
      this.tab_list = JSON.parse(column);
      this.getpost_list(this.tab_list[this.active].id);
      return;
    }
    this.gettabList();
  },
  methods: {
    //获取栏目数据
    async gettabList() {
      const res = await this.$axios.get("/category");
      const { data, statusCode } = res.data;
      if (statusCode === 200) {
        this.tab_list = data;
        this.getpost_list(data[this.active].id);
      }
    },
    //获取文章数据
    async getpost_list(id) {
      const res = await this.$axios({
        url: "/post",
        method: "get",
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });
      if (this.post_list.length > 0 && this.pageIndex === 1) {
        this.post_list = [];
      }
      const { data, statusCode } = res.data;
      if (statusCode === 200) {
        this.post_list = [...this.post_list, ...data];
        if (data.length < this.pageSize) {
          this.finished = true;
        }
        this.loading = false;
        this.refreshing = false;
      }
    },
    //控制分页
    onLoad() {
      this.pageIndex++;
      setTimeout(() => {
        this.getpost_list(this.tab_list[this.active].id);
      }, 1000);
    },
    //下拉加载
    onRefresh() {
      this.pageIndex = 0;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    }
  },
  watch: {
    active(value) {
      this.post_list = [];
      this.pageIndex = 0;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  .header {
    height: 50px;
    background-color: #ff0000;
    display: flex;
    align-items: center;
    color: #fff;
    text-align: center;
    padding: 0 10px;
    .left {
      width: 50px;
      .iconnew {
        font-size: 50px;
      }
    }
    .right {
      width: 50px;
      .iconwode {
        font-size: 20px;
      }
    }
    .center {
      flex: 1;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      border-radius: 18px;
      margin: 0 10px;
      background-color: rgba(255, 255, 255, 0.5);
      .text {
        margin-left: 5px;
      }
    }
  }

  /deep/ .van-tabs__nav {
    background-color: #ccc;
  }
}
</style>
