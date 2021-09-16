<template>
  <div class="accountAccept">
    <div class="main" v-title data-title="账号管理"></div>
    <div class="box">
      <router-view></router-view>
    </div>
    <!-- <footerDiv></footerDiv> -->
  </div>
</template>
<script>
// import footerDiv from "@/components/footer.vue";

export default {
  data() {
    return{}
  },
   components: {
    // footerDiv,
  },
  
};
</script>
<style lang="less" scoped>
    .accountAccept{
        position: relative;
        margin-top:48px;
        .box{
            width: 100%;
        }
    }
</style>