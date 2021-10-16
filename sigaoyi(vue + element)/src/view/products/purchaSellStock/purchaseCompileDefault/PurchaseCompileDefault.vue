<template>
  <div class="purchaseCompileDefault">
    <purchaseCompil></purchaseCompil>
  </div>
</template>

<script>
import purchaseCompil from "@/components/PurchaseCompile.vue";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path == "/") {
        vm.setFirstStatus(true);
      } else {
        vm.setFirstStatus(false);
      }
    });
    // next();
  },
  data() {
    return {};
  },
  created() {},
  components: {
    purchaseCompil,
  },
  computed: {
    ...homeState(["firstStatus"]),
  },
  methods: {
    ...homeActions(["setFirstStatus"]),
  },
};
</script>

<style>
</style>