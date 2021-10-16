<template>
  <div class="addressEdit" ref="addressEdit">
    <div class="title">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="exitAdress">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :address-info="content"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import areaLists from "../../../../assets/js/area.js";
export default {
  data() {
    return {
      title:"",
      // 三级联动数组
      areaList: areaLists.areaList,
      // 初始对象
      content:{},   
      // 传过来的item
      item: {},
    };
  },
  created() {
    this.$nextTick(() => {
      this.H = document.documentElement.clientHeight;
      this.$refs.addressEdit.style.minHeight = this.H + "px";
      this.initData();
    });
  },
  methods: {
    //   初始化数据
    initData() {
        console.log("this.$route.query.flag ==>",this.$route.query.flag)
      if (this.$route.query.flag) {
        this.item = JSON.parse(this.$route.query.item);
        this.title = "编辑地址";
        console.log("this.item ==>", this.item);
      } else {
        this.item = {};
        this.title = "新增地址";
        console.log("this.item ==>", this.item);
      }
      this.content = this.item;
    },
    //   返回
    onClickLeft() {
      this.$router.back();
    },
    // 保存按钮
    onSave(content) {
      console.log("content ==>", content);
    },
    // 删除
    onDelete(content) {
      this.$toast("delete");
    },
  },
};
</script>

<style lang="less">
.addressEdit {
  background: #f4f4f4;
  .exitAdress {
    .van-button--danger {
      background-color: #409eff;
      border: 1px solid #409eff;
    }
  }
}
</style>