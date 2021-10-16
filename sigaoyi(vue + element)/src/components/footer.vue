<template>
  <div ref="footer" class="footer">
    ©{{
      years
    }}&nbsp;&nbsp;&nbsp;广州思高易网络科技有限公司&nbsp;&nbsp;&nbsp;粤ICP备19040870号
  </div>
</template>

<script>
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
import "../assets/less/footer/footer.less";
export default {
  data() {
    return {
      // 年份
      years: "",
    };
  },
  created() {
    let d = new Date();
    this.years = d.getFullYear();
    this.$nextTick(() => {
      // this.footerClass();
    });
  },
  computed: {
    ...homeState(["WstateStatus"]),
  },
  methods: {
    footerClass() {
      if (document.querySelector(".footer") == null) {
        return;
      }
      // this.setWstateStatus(true);
      let footerBox = document.querySelector(".footer").parentElement;
      this.footerBoxH = footerBox.offsetHeight;
      this.footerBoxW = footerBox.offsetWidth;
      this.screenH = document.documentElement.clientHeight - 82;
      // if(this.footerBoxH + 82 < this.screenH){
      //    footerBox.style.height = this.screenH - 82 + 'px'
      // }else{
      //     footerBox.style.height = this.footerBoxH + 'px'
      // }
    },
    getH() {
      let timer = null;
      timer = setInterval(() => {
        if (document.querySelector(".footer") == null) {
          timer = null;
          clearInterval(timer);

          return;
        }
        let footerBox = document.querySelector(".footer").parentElement;
        this.footerBoxH = footerBox.offsetHeight;
      }, 400);

      //    if(this.footerBoxH){
      //        timer = null
      //        clearInterval(timer)
      //    }
    },
    getW() {
      let timer = null;
      timer = setInterval(() => {
        if (document.querySelector(".footer") == null) {
          timer = null;
          clearInterval(timer);

          return;
        }
        let footerBox = document.querySelector(".footer").parentElement;
        this.footerBoxW = footerBox.offsetWidth;
      }, 400);

      if (this.WstateStatus) {
        this.BoxW = 100;
        this.BoxL = 0;
      } else {
        this.BoxW = 87;
        this.BoxL = 13;
      }
    },
    ...homeActions(["setWstateStatus"]),
  },
  watch: {
    footerBoxH: "getH",
    footerBoxW: "getW",
  },
};
</script>
