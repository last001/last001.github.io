<template>
  <div class="staffManagement">
    <div class="main" v-title data-title="员工管理"></div>
    <router-view></router-view>
    <!-- <footerDiv></footerDiv> -->
  </div>
</template>
<script>
// import footerDiv from "@/components/footer.vue";
export default {
  data() {
    return {};
  },
  components: {
    // footerDiv
  },
  computed: {
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  methods: {
    
  },
};
</script>
<style lang="" scoped>
.staffManagement {
  width: 100%;
  position: relative;
  margin-top: 48px;
}
</style>