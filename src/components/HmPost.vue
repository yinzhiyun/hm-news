<template>
  <div class="hm-post">
    <!-- 视频 -->
    <div class="video-article" v-if="post.type==2">
      <div class="title">{{post.title}}</div>
      <div class="video">
        <img :src="getUrl(post.cover[0].url)" alt>
        <div class="sclp">
          <span class="iconfont iconshipin"></span>
        </div>
      </div>
      <div class="xx">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
    <!-- 单图片文章 -->
    <div class="Single-article" v-else-if="post.cover.length<3">
      <div class="info">
        <div class="title">{{post.title}}</div>
        <div class="xx">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src="getUrl(post.cover[0].url)" alt>
      </div>
    </div>
    <!-- 多图片文章 -->
    <div class="Many-article" v-else>
      <div class="title">{{post.title}}</div>
      <div class="img">
        <img :src="getUrl(post.cover[0].url)" alt>
        <img :src="getUrl(post.cover[1].url)" alt>
        <img :src="getUrl(post.cover[2].url)" alt>
      </div>
      <div class="xx">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    post: Object
  },
  methods: {
    getUrl(img) {
      if (img.startsWith("https") || img.startsWith("http")) {
        return img;
      } else {
        return this.$axios.defaults.baseURL + img;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
}
.xx {
  color: #999;
  span {
    margin-right: 10px;
  }
}
//单文章
.Single-article {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #999;
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .img {
    img {
      width: 115px;
      height: 74px;
      display: block;
      object-fit: cover;
    }
  }
}
//多文章
.Many-article {
  padding: 10px;
  border-bottom: 1px solid #999;
  .img {
    display: flex;
    justify-content: space-between;
    img {
      width: 112px;
      height: 74px;
      display: block;
      object-fit: cover;
    }
    margin: 8px 0;
  }
}
//视频
.video-article {
  padding: 10px;
  border-bottom: 1px solid #999;
  .video {
    padding: 10px 0;
    position: relative;
    img {
      width: 340px;
      height: 170px;
      display: block;
    }
    .sclp {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 50px;
      span {
        color: #fff;
        font-size: 36px;
      }
    }
  }
}
</style>

