<template>
  <div class="stock" :style="{ height: H + 'px' }">
    <div class="title">
      <van-nav-bar title="库存列表" left-arrow fixed @click-left="onClickLeft">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </div>
    <div class="tabs">
      <van-tabs v-model="tabsIndex" color="#409eff">
        <van-tab
          v-for="(item, index) in tabsList"
          :key="index"
          :title="item.name"
        >

        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import "@/assets/less/stock/stock.css";
export default {
  data() {
    return {
      H: "",
      tabsIndex: 1,
      tabsList: [
        { name: "全部" },
        { name: "待出库" },
        { name: "已出库" },
        { name: "已退回" },
      ],
    };
  },
  created() {
    this.H = document.documentElement.clientHeight;
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style>
</style>