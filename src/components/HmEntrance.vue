<template>
  <div class="main">
    <div class="login">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="text">
      <slot name="text"></slot>
    </div>
    <div class="button" @click="login">
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
//入口组件
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      this.$emit("login");
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  .login {
    height: 126px;
    text-align: center;
    span {
      font-size: 126px;
      color: rgba(204, 51, 0, 1);
    }
  }
  .text {
    padding: 0 16px;
  }
  .button {
    margin: 20px;
    margin-top: 40px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgba(204, 51, 0, 1);
    color: #fff;
    font-size: 20px;
    border-radius: 25px;
  }
}
</style>

