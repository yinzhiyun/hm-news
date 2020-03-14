<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-entrance @login="login">
      <template v-slot:button>登陆</template>
      <template v-slot:text>
        <hm-input
          type="text"
          placeholder="用户名/手机号"
          v-model="username"
          :regexp="/^1\d{4,10}$/"
          message="用户名格式错误"
        ></hm-input>
        <hm-input
          type="password"
          placeholder="密码"
          v-model="password"
          :regexp="/^\d{3,12}$/"
          message="密码格式错误"
        ></hm-input>
      </template>
    </hm-entrance>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        Toast("您的用户名或密码不能为空");
      } else {
        this.$axios({
          url: "/login",
          method: "post",
          data: {
            username: this.username,
            password: this.password
          }
        }).then(res => {
          if (res.data.statusCode === 200) {
            Toast.success(res.data.message);
            this.$router.push("/user");
          } else {
            Toast.fail(res.data.message);
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>

