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
        ></hm-input>
        <hm-input
          type="text"
          placeholder="昵称"
          v-model="nickname"
          :regexp="/^[a-zA-Z\u4e00-\u9fa5]{2,8}$/"
          message="昵称格式错误"
        ></hm-input>
        <hm-input
          type="password"
          placeholder="密码"
          v-model="password"
          :regexp="/^\d{3,12}$/"
          message="密码格式错误"
        ></hm-input>
      </template>
      <template v-slot:button>注册</template>
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
      if (!this.username) {
        return;
      }
      if (!this.nickname) {
        return;
      }
      if (!this.password) {
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
          this.$router.push("/login");
        } else {
          alert(res.data.message);
        }
      });
    }
  }
};
</script>

<style>
</style>

