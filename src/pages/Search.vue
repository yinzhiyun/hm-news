<template>
  <!-- 搜索 -->
  <div class="search">
    <!-- 头部 -->
    <div class="header">
      <div class="left" @click="Regression">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input type="text" v-model="keyword" @keyup.enter="getSearch" @input="getRecommend">
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="getSearch">搜索</div>
    </div>
    <!-- 推荐列表 -->
    <div class="recommendList" v-if="recommendList.length>0">
      <div
        class="item"
        v-for="recommend in recommendList"
        :key="recommend.id"
        @click="addkeyword(recommend.title)"
      >
        <div class="title">{{recommend.title}}</div>
        <div class="icon">
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </div>
    <!-- 搜索页展示的 -->
    <div class="concat" v-else-if="searchList.length===0">
      <!-- 历史纪录 -->
      <div class="record">
        <div class="title">
          <div class="left">历史纪录</div>
          <div class="right" @click="clear">清空</div>
        </div>
        <div class="content">
          <div
            class="record_content"
            v-for="item in recordList"
            :key="item"
            @click="addkeyword(item)"
          >{{item}}</div>
        </div>
      </div>
      <!-- 热门搜索 -->
      <div class="Popular_search">
        <div class="text">热门搜索</div>
        <div class="search_list">
          <div
            class="title"
            v-for="popular in popularList"
            :key="popular"
            @click="addkeyword(popular)"
          >{{popular}}</div>
        </div>
      </div>
    </div>
    <!-- 文章列表 -->
    <div class="post_list" v-else>
      <hm-post v-for="post in searchList" :key="post.id" :post="post"></hm-post>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //历史纪录列表
      recordList: [],
      //热门列表
      popularList: [],
      //推荐列表
      recommendList: [],
      //搜索列表
      searchList: [],
      //搜索关键字
      keyword: ""
    };
  },
  created() {
    const record = localStorage.getItem("record");
    if (record) {
      this.recordList = JSON.parse(record);
    }
    this.popularList = ["关晓彤", "情", "阿信", "新冠肺炎", "劳伦斯", "王祖贤"];
  },
  methods: {
    //获取搜索数据
    async getSearch() {
      if (!this.keyword) return;
      this.recommendList = [];
      this.recordList = this.recordList.filter(item => item !== this.keyword);
      this.recordList.unshift(this.keyword);
      localStorage.setItem("record", JSON.stringify(this.recordList));
      const res = await this.$axios.get("post_search", {
        params: {
          keyword: this.keyword
        }
      });
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.searchList = data;
      }
    },
    //获取推荐数据
    async getRecommend() {
      if (!this.keyword) {
        this.recommendList = [];
        return;
      }
      const res = await this.$axios.get("/post_search_recommend", {
        params: {
          keyword: this.keyword
        }
      });
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.recommendList = data;
      }
    },
    //回退功能
    Regression() {
      if (this.keyword) {
        this.keyword = "";
      } else {
        this.$router.back();
      }
    },
    //点击关键字进行搜索
    addkeyword(keyword) {
      this.keyword = keyword;
      this.recommendList = [];
      this.getSearch();
    },
    //清空历史纪录
    async clear() {
      if (this.recordList.length > 0) {
        try {
          await this.$dialog.confirm({
            title: "温馨提示",
            message: "确认要清空吗?"
          });
          this.$toast.success("删除成功");
          this.recordList = [];
          localStorage.removeItem("record");
        } catch (error) {
          this.$toast("操作取消");
        }
      }
    }
  },
  watch: {
    keyword() {
      if (!this.keyword) {
        this.searchList = [];
        this.recommendList = [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  padding: 0 10px;
}
.header {
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid red;
  .left {
    width: 36px;
    text-align: center;
  }
  .center {
    flex: 1;
    position: relative;
    input {
      width: 240px;
      border-radius: 20px;
      border: none;
      border: 1px solid #ccc;
      outline: none;
      height: 36px;
      text-indent: 36px;
    }
    span {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
    }
  }
  .right {
    font-size: 14px;
    width: 50px;
  }
}
.record {
  padding: 10px;
  border-bottom: 1px solid #999;
  .title {
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 14px;
      font-weight: 700;
    }
    .right {
      font-size: 12px;
    }
  }
  .content {
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    .record_content {
      padding: 11px;
      font-size: 12px;
      padding-left: 0;
    }
  }
}
.Popular_search {
  padding: 0 10px;
  .text {
    padding: 20px 0;
    font-size: 14px;
    font-weight: 700;
  }
  .search_list {
    display: flex;
    flex-wrap: wrap;
    .title {
      width: 50%;
      padding: 10px 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.recommendList {
  padding: 0 10px;
  .item {
    padding: 14px 0;
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
  }
}
</style>
