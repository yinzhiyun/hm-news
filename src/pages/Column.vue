<template>
  <!-- 栏目管理 -->
  <div class="column">
    <hm-header>栏目管理</hm-header>
    <!-- 删除频道 -->
    <div class="delChannel">
      <div class="title">点击删除以下频道</div>
      <div class="column_list">
        <div
          class="channel"
          v-for="item in columnList"
          :key="item.id"
          @click="delColumn(item.id)"
        >{{item.name}}</div>
      </div>
    </div>
    <!-- 添加频道 -->
    <div class="addChannel" v-if="delColumnList.length>0">
      <div class="title">点击添加以下频道</div>
      <div class="column_list">
        <div
          class="channel"
          v-for="item in delColumnList"
          :key="item.id"
          @click="addColumn(item.id)"
        >{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnList: [],
      delColumnList: []
    };
  },
  async created() {
    const columnList = localStorage.getItem("column");
    const delColumnList = localStorage.getItem("delcolumn");
    if (columnList && delColumnList) {
      this.columnList = JSON.parse(columnList);
      this.delColumnList = JSON.parse(delColumnList);
      return;
    }
    const res = await this.$axios.get("/category");
    const { statusCode, data } = res.data;
    if (statusCode === 200) {
      this.columnList = data;
    }
  },
  methods: {
    //删除频道
    delColumn(id) {
      if (this.columnList.length <= 3) {
        this.$toast("至少保留3条哦");
        return;
      }
      let cid = this.columnList.findIndex(i => i.id === id);
      this.delColumnList.push(this.columnList[cid]);
      this.columnList.splice(cid, 1);
    },
    //添加频道
    addColumn(id) {
      let cid = this.delColumnList.findIndex(i => i.id === id);
      this.columnList.push(this.delColumnList[cid]);
      this.delColumnList.splice(cid, 1);
    }
  },
  watch: {
    columnList: {
      deep: true,
      handler(input) {
        localStorage.setItem("column", JSON.stringify(this.columnList));
        localStorage.setItem("delcolumn", JSON.stringify(this.delColumnList));
      }
    }
  }
};
</script>

<style lang="less" scoped>
.column {
  .delChannel,
  .addChannel {
    padding: 0 14px;
  }
  .title {
    margin: 16px 0;
    padding: 0 10px;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .column_list {
    display: flex;
    flex-wrap: wrap;
    .channel {
      margin: 10px;
      padding: 8px 10px;
      font-size: 14px;
      background-color: #ccc;
      width: 40px;
      text-align: center;
      border: 1px solid #000;
    }
  }
}
</style>
