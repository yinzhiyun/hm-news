<template>
  <div class="navbar" @click="clickfn">
    <div class="left">{{title}}</div>
    <div class="center">{{getContent}}</div>
    <div class="right">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: String
  },
  methods: {
    clickfn() {
      this.$emit("click");
    }
  },
  computed: {
    getContent() {
      if (!parseInt(this.content)) {
        return this.content;
      } else {
        return this.content.replace(/./g,"*");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  .center {
    flex: 1;
    text-align: right;
    color: #999;
    margin-right: 6px;
  }
  .right {
    width: 30px;
    color: #999;
  }
}
</style>
