<template>
  <div class="detail" :class="!isfous?'pd70':'pd130'">
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="follow" v-if="details.has_follow" @click="editunfollow">已关注</div>
        <div class="nofollow" v-else @click="editfollow">关注</div>
      </div>
    </div>
    <div class="post_main">
      <div class="title">{{details.title}}</div>
      <div class="xx">
        <span>{{details.user.nickname}}</span>
        <span>{{details.create_date | date}}</span>
      </div>
      <div class="content" v-if="details.type===1" v-html="details.content"></div>
      <video v-else :src="details.content" controls></video>
      <div class="sharing_points">
        <div class="points" :class="{active:details.has_like}" @click="post_link">
          <span class="iconfont icondianzan"></span>
          <span>{{details.like_length || 0}}</span>
        </div>
        <div class="sharing">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <div class="comment">
      <h2>精彩跟帖</h2>
      <div class="main" v-if="commentList.length===0">暂无跟帖，抢占沙发</div>
      <hm-comment v-else v-for="item in commentList" :key="item.id" :comment="item" @plack="plack"></hm-comment>
    </div>
    <div class="tail" v-if="!isfous">
      <div class="input">
        <input type="text" placeholder="写跟帖" @focus="showfocus">
      </div>
      <div class="icon">
        <div class="commentLength">{{details.comment_length}}</div>
        <span class="iconfont iconpinglun-"></span>
        <span
          class="iconfont iconshoucang"
          :class="{starActive:details.has_star}"
          @click="has_star"
        ></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>
    <div class="send" v-else>
      <textarea v-model="content" :placeholder="'回复:'+postName" @blur="unshowfocus" ref="textarea"></textarea>
      <div class="btnsend" @click="send">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getDetail();
    this.getPostComment();
  },
  data() {
    return {
      details: {
        user: {}
      },
      commentList: [],
      isfous: false,
      postId: "",
      postName: "",
      content: ""
    };
  },
  methods: {
    //文章详情列表
    async getDetail() {
      const id = this.$route.params.id;
      const res = await this.$axios.get(`/post/${id}`);
      const { data, statusCode } = res.data;
      //console.log(data);
      if (statusCode === 200) {
        this.details = data;
      }
    },
    //文章评论列表
    async getPostComment() {
      const id = this.$route.params.id;
      const res = await this.$axios.get(`/post_comment/${id}`);
      const { data, statusCode } = res.data;
      if (statusCode === 200) {
        this.commentList = data;
      }
    },
    //关注用户
    async editfollow() {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await this.$axios.get(
          "/user_follows/" + this.details.user.id
        );
        const { statusCode, message } = res.data;
        if (statusCode === 200) {
          this.$toast.success(message);
          this.getDetail();
        }
      } else {
        sessionStorage.setItem("path", this.$route.path);
        this.$router.push("/login");
      }
    },
    //取关
    async editunfollow() {
      const res = await this.$axios.get(
        "/user_unfollow/" + this.details.user.id
      );
      const { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.$toast.success(message);
        this.getDetail();
      }
    },
    //点赞
    async post_link() {
      const token = localStorage.getItem("token");
      if (!token) {
        sessionStorage.setItem("path", this.$route.path);
        this.$router.push("/login");
      } else {
        const res = await this.$axios.get("/post_like/" + this.details.id);
        const { statusCode, message } = res.data;
        if (statusCode === 200) {
          this.$toast.success(message);
          this.getDetail();
        }
      }
    },
    //收藏
    async has_star() {
      const token = localStorage.getItem("token");
      if (!token) {
        sessionStorage.setItem("path", this.$route.path);
        this.$router.push("/login");
      } else {
        const res = await this.$axios.get("/post_star/" + this.details.id);
        const { statusCode, message } = res.data;
        if (statusCode === 200) {
          this.$toast.success(message);
          this.getDetail();
        }
      }
    },
    //控制自动获取焦点并显示text框
    async showfocus() {
      this.isfous = true;
      await this.$nextTick();
      this.$refs.textarea.focus();
    },
    //关闭框
    unshowfocus() {
      if (!this.content) {
        this.isfous = false;
        this.postId = "";
        this.postName = "";
      }
    },
    //接受comment传输的数据进行处理
    async plack(id, nickname) {
      this.postId = id;
      this.postName = "@" + nickname;
      this.isfous = true;
      await this.$nextTick();
      this.$refs.textarea.focus();
    },
    //发送请求
    async send() {
      const token = localStorage.getItem("token");
      if (!token) {
        sessionStorage.setItem("path", this.$route.path);
        this.$router.push("/login");
      } else {
        const res = await this.$axios({
          method: "post",
          url: "/post_comment/" + this.$route.params.id,
          data: {
            content: this.content,
            parent_id: this.postId
          }
        });
        const { statusCode, message } = res.data;
        if (statusCode === 200) {
          this.$toast.success(message);
          this.postId = "";
          this.postName = "";
          this.isfous = false;
          this.content = "";
          this.getPostComment();
          this.getDetail();
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.pd70 {
  padding-bottom: 70px;
}
.pd130 {
  padding-bottom: 130px;
}
.header {
  display: flex;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  height: 50px;
  background-color: #f2f2f2;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid red;
  .center {
    flex: 1;
    .iconnew {
      font-size: 46px;
    }
  }
  .right {
    width: 80px;
    height: 50px;
    display: flex;
    align-items: center;
  }
  .follow,
  .nofollow {
    border: 1px solid #999;
    width: 50px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 20px;
  }
  .nofollow {
    border: 1px solid red;
    background-color: red;
    color: #fff;
  }
}
.post_main {
  padding: 16px;
  border-bottom: 5px solid rgba(0, 0, 0, 0.2);
  margin-top: 50px;
  video {
    width: 100%;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
  }
  .xx {
    font-size: 12px;
    color: #999;
    margin: 6px 0;
    span {
      margin-right: 10px;
    }
  }
  .content {
    margin-top: 20px;
    font-size: 14px;
    /deep/ img {
      width: 100%;
      display: block;
      margin: 4px 0;
    }
  }
  .sharing_points {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    margin-top: 15px;
    .points,
    .sharing {
      height: 25px;
      line-height: 25px;
      width: 80px;
      text-align: center;
      border: 1px solid #999;
      border-radius: 20px;
      span:last-child {
        margin-left: 10px;
      }
    }
    .active {
      color: red;
      border-color: red;
    }
    .sharing {
      border: 1px solid limegreen;
      color: limegreen;
    }
  }
}
//内容
.comment {
  text-align: center;
  margin-top: 10px;
  border-bottom: 1px solid #999;
  h2 {
    font-size: 16px;
    font-weight: 400;
  }
  .main {
    padding: 25px;
    font-size: 12px;
    color: #999;
  }
}
//底部评论
.tail {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f2f2f2;
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  .input {
    input {
      border-radius: 20px;
      border: none;
      outline: none;
      color: rgb(51, 51, 51);
      flex: 1;
      height: 30px;
      padding: 0 10px;
      background-color: rgba(215, 215, 215, 1);
      width: 160px;
    }
  }
  .icon {
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    span {
      display: block;
      font-size: 20px;
    }
    .commentLength {
      position: absolute;
      top: -9px;
      left: 10px;
      padding: 2px 6px;
      background-color: red;
      color: #fff;
      border-radius: 20px;
    }
  }
}
.starActive {
  color: yellowgreen;
}
//
.send {
  padding: 20px 10px;
  display: flex;
  position: fixed;
  background-color: #f2f2f2;
  width: 100%;
  bottom: 0;
  left: 0;
  textarea {
    border: none;
    outline: none;
    height: 70px;
    flex: 1;
    padding: 10px;
    border-radius: 20px;
    background-color: rgba(215, 215, 215, 1);
  }
  .btnsend {
    width: 60px;
    height: 30px;
    background-color: red;
    text-align: center;
    line-height: 30px;
    border-radius: 20px;
    align-self: flex-end;
    color: #fff;
    margin: 0 10px;
  }
}
</style>
