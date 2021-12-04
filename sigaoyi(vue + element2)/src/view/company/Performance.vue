<template>
  <div class="performance">
    <div class="main" v-title data-title="绩效管理"></div>
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
    return {};
  },

  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    this.$nextTick(() => {
      this.$parent.$refs.sideNavbar1.testRouter();
    });
  },
  components: {
    // footerDiv
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.performance {
  width: 100%;
  position: relative;
  margin-top: 48px;
}
</style>