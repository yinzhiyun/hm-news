<template>
  <div class="hm_comment">
    <div class="placs">
      <div class="left">
        <img :src="$axios.defaults.baseURL + comment.user.head_img" alt>
      </div>
      <div class="center">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | date2}}</div>
      </div>
      <div class="right" @click="plack(comment.id,comment.user.nickname)">回复</div>
    </div>
    <Recursion
      class="recusion"
      v-if="comment.parent"
      :parent="comment.parent"
      :count="getCount(0,comment)"
      @placy="plack"
    ></Recursion>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
import Recursion from "./Recursion.vue";
export default {
  props: {
    comment: Object
  },
  components: {
    Recursion
  },
  methods: {
    getCount(count, data) {
      if (data.parent) {
        return this.getCount(count + 1, data.parent);
      } else {
        return count;
      }
    },
    plack(id, nickname) {
      this.$emit("plack", id, nickname);
    }
  }
};
</script>

<style lang="less" scoped>
.hm_comment {
  border-bottom: 1px solid #999;
}
.placs {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  .left {
    img {
      width: 50px;
      height: 50px;
      display: block;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    text-align: left;
    margin-left: 10px;
    .name {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .time {
      font-size: 12px;
      color: #999;
    }
  }
  .right {
    font-size: 12px;
    color: #999;
    align-self: flex-start;
  }
}
.content {
  padding: 10px 16px;
  text-align: left;
  font-size: 14px;
}
.recusion {
  margin: 10px 16px;
}
</style>
