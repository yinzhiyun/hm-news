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
          ref="username"
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
      <template v-slot:daohan>
        没有账号?去
        <router-link to="register">注册</router-link>
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
  created() {
    this.username = this.$route.params.username;
    this.password = this.$route.params.password;
  },
  methods: {
    login() {
      let isusername = this.$refs.username.vlidete(this.username);
      let ispassword = this.$refs.password.vlidete(this.password);
      if (!isusername || !ispassword) {
        return;
      }
      this.$axios({
        url: "/login",
        method: "post",
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        if (res.data.statusCode === 200) {
          const { data } = res.data;
          //console.log(data);
          this.$toast.success(res.data.message);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.id);
          this.$router.push("/user");
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>

