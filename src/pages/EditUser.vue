<template>
  <div class="edituser">
    <hm-header>编辑资料</hm-header>
    <div class="info">
      <img :src="getimgUrl" alt>
      <van-uploader :after-read="afterRead"/>
    </div>
    <hm-navbar title="昵称" :content="info.nickname" @click="shownickname"></hm-navbar>
    <hm-navbar title="密码" :content="info.password" @click="showpassword"></hm-navbar>
    <hm-navbar title="性别" :content="getgender" @click="showgender"></hm-navbar>
    <!-- 编辑昵称弹出框 -->
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="editnickname">
      <van-cell-group>
        <van-field v-model="nickname" placeholder="请输入昵称"/>
      </van-cell-group>
    </van-dialog>
    <!-- 编辑密码弹出框 -->
    <van-dialog v-model="show1" title="修改密码" show-cancel-button @confirm="editpassword">
      <van-cell-group>
        <van-field type="password" v-model="password" placeholder="请输入昵称"/>
      </van-cell-group>
    </van-dialog>
    <!-- 编辑性别弹出框 -->
    <van-dialog v-model="show2" title="修改性别" show-cancel-button @confirm="editgender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1"/>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <div class="corpper" v-show="showcorpper">
      <vueCropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :centerBox="true"
        :canMoveBox="false"
        :fixedBox="true"
      ></vueCropper>
      <div class="chekcorpper">
        <div class="left" @click="showcorpper=false">
          <span class="iconfont iconicon-test"></span>
        </div>
        <div class="center">裁剪</div>
        <div class="right" @click="clope">√</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      show: false,
      nickname: "",
      show1: false,
      password: "",
      show2: false,
      gender: 1,
      showcorpper: false,
      img: "../../public/images/1.jpg"
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      let userId = localStorage.getItem("userId");
      const res = await this.$axios({
        url: `/user/${userId}`,
        method: "get"
      });
      this.info = res.data.data;
    },
    async editUser(data) {
      let userId = localStorage.getItem("userId");
      let token = localStorage.getItem("token");
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "保存中..."
      });
      const res = await this.$axios({
        url: `/user_update/${userId}`,
        method: "post",
        headers: {
          Authorization: token
        },
        data: data
      });
      const { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.$toast.success(message);
        this.getInfo();
      }
    },
    shownickname() {
      this.show = true;
      this.nickname = this.info.nickname;
    },
    editnickname() {
      this.editUser({
        nickname: this.nickname
      });
    },
    showpassword() {
      this.password = this.info.password;
      this.show1 = true;
    },
    editpassword() {
      this.editUser({
        password: this.password
      });
    },
    showgender() {
      this.show2 = true;
      this.gender = this.info.gender;
    },
    editgender() {
      this.editUser({
        gender: this.gender
      });
    },
    //编辑图片
    afterRead(file) {
      this.showcorpper = true;
      this.img = file.content;
    },
    clope() {
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(data => {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: "上传中..."
        });
        let fd = new FormData();
        fd.append("file", data);
        this.$axios({
          url: "/upload",
          method: "post",
          data: fd
        }).then(res => {
          const { data, statusCode } = res.data;
          if (statusCode === 200) {
            this.editUser({
              head_img: data.url
            });
            this.showcorpper = false;
            this.img = "";
          }
        });
      });
    }
  },
  computed: {
    getimgUrl() {
      return this.$axios.defaults.baseURL + this.info.head_img;
    },
    getgender() {
      if (this.info.gender === 0) {
        return "女";
      } else {
        return "男";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.edituser {
  .info {
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
      width: 70px;
      height: 70px;
      display: block;
      border-radius: 50%;
    }
    .van-uploader {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
  }
  .van-cell-group {
    border: 1px solid #ccc;
    margin: 20px;
  }
  .corpper {
    height: 100%;
    position: relative;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 999;
    .chekcorpper {
      background-color: #000;
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      font-size: 16px;
      text-align: center;
      .left {
        width: 40px;
      }
      .right {
        width: 40px;
      }
      .center {
        flex: 1;
      }
    }
  }
}
</style>
