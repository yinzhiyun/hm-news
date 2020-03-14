<template>
  <div class="input">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="input"
      :class="{error:status===true,success:status===false}"
    >
    <span v-show="status">{{message}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: ""
    };
  },
  props: {
    type: String,
    placeholder: {
      type: String,
      default: "请输入..."
    },
    value: String,
    regexp: RegExp,
    message: String
  },
  methods: {
    input(e) {
      let value = e.target.value;

      if (this.regexp) {
        if (this.regexp.test(value)) {
          this.status = false;
          this.$emit("input", value);
        } else {
          this.status = true;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.input {
  input {
    width: 100%;
    border: none;
    font-size: 18px;
    outline: none;
    height: 40px;
    margin-top: 10px;
    border-bottom: 1px solid #000;
    &.success {
      border-color: lime;
    }
    &.error {
      border-color: red;
    }
  }
  span {
    display: block;
    height: 20px;
    line-height: 20px;
    color: red;
    font-size: 12px;
  }
}
</style>
