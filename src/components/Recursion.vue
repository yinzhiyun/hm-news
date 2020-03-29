<template>
  <div class="rows">
    <recursion v-if="parent.parent" :parent="parent.parent" :count="count - 1" @placy="placy"></recursion>
    <div class="recursion" :class="{bordertop:!parent.parent}">
      <div class="title">
        <div class="name">{{count}}楼 {{parent.user.nickname}}</div>
        <div class="time">{{parent.create_date | date2}}</div>
        <div @click="placy(parent.id,parent.user.nickname)">回复</div>
      </div>
      <div class="content">{{parent.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recursion",
  props: {
    parent: Object,
    count: Number
  },
  methods: {
    placy(id, nickname) {
      this.$emit("placy", id, nickname);
    }
  }
};
</script>

<style lang="less" scoped>
.recursion {
  border: 1px solid #999;
  border-top: none;
  padding: 10px;
  .title {
    display: flex;
    color: #999;
    .name {
      font-size: 14px;
      color: #000;
    }
    .time {
      flex: 1;
      text-align: left;
      padding-left: 15px;
      font-size: 12px;
      color: #999;
    }
  }
  .content {
    padding-top: 10px;
    font-size: 14px;
    text-align: left;
  }
}
.bordertop {
  border-top: 1px solid #999;
}
</style>
