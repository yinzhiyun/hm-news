<template>
  <div class="comments">
    <hm-header>我的跟帖</hm-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      :offset="50"
    >
      <div class="cmlist" v-for="item in list" :key="item.id">
        <div class="time">{{item.create_date | date("YYYY-MM-DD HH:mm")}}</div>
        <div class="parent" v-if="item.parent">
          <div class="postname">回复: {{item.parent.user.nickname}}</div>
          <div class="postcontent">{{item.parent.content}}</div>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="title">
          <div class="left one-txt-cut">原文：{{item.post.title}}</div>
          <div class="right">
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 8
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.$axios({
        url: "/user_comments",
        method: "get",
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.list = [...this.list, ...data];
        if (data.length < this.pageSize) {
          this.finished = true;
        }
        this.loading = false;
      }
    },
    onLoad() {
      this.pageIndex++;
      setTimeout(() => {
        this.getList();
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.comments {
  .cmlist {
    border-bottom: 1px solid #999;
    padding: 16px;
    .time {
      font-size: 12px;
      color: rgba(134, 134, 134, 0.866666666666667);
    }
    .content {
      font-size: 14px;
      padding: 10px 0;
    }
    .title {
      font-size: 14px;
      color: rgba(134, 134, 134, 0.866666666666667);
      display: flex;
      justify-content: space-between;
      .left {
        margin-right: 25px;
      }
    }
    .parent {
      background-color: rgba(228, 228, 228, 1);
      padding: 10px;
      font-size: 12px;
      line-height: 30px;
      margin-top: 10px;
      color: rgba(134, 134, 134, 0.866666666666667);
    }
  }
}
</style>
