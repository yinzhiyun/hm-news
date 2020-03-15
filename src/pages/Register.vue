<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-entrance @login="register">
      <template v-slot:text>
        <hm-input
          type="text"
          placeholder="用户名/手机号码"
          v-model="username"
          :regexp="/^1\d{4,10}$/"
          message="用户名格式错误"
          ref="username"
        ></hm-input>
        <hm-input
          type="text"
          placeholder="昵称"
          v-model="nickname"
          :regexp="/^[a-zA-Z\u4e00-\u9fa5]{2,8}$/"
          message="昵称格式错误"
          ref="nickname"
        ></hm-input>
        <hm-input
          type="password"
          placeholder="密码"
          v-model="password"
          :regexp="/^\d{3,12}$/"
          message="密码格式错误"
          ref="password"
        ></hm-input>
      </template>
      <template v-slot:button>注册</template>
      <template v-slot:daohan>
        已有账号?去
        <router-link to="login">登录</router-link>
      </template>
    </hm-entrance>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      nickname: "",
      password: ""
    };
  },
  methods: {
    register() {
      let isusername = this.$refs.username.vlidete(this.username);
      let isnickname = this.$refs.nickname.vlidete(this.nickname);
      let ispassword = this.$refs.password.vlidete(this.password);
      if (!isusername || !isnickname || !ispassword) {
        return;
      }
      this.$axios({
        url: "/register",
        method: "post",
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }
      }).then(res => {
        if (res.data.statusCode === 200) {
          this.$toast.success(res.data.message);
          this.$router.push({
            name: "login",
            params: {
              username: this.username,
              password: this.password
            }
          });
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    }
  }
};
</script>

<style>
</style>

