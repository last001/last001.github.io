<template>
  <div class="introduce" :style="{ minHeight: H + 'px' }">
    <!-- top bottom -->
    <div class="clickToTop" :style="{ opacity: opacity }" @click="toTop()">
      <i class="el-icon-caret-top"></i>
    </div>
    <div
      class="clickToButtom clickToTop"
      :style="{ opacity: opacity }"
      @click="toBottom()"
    >
      <i class="el-icon-caret-bottom"></i>
    </div>
    <!-- 背景 -->
    <div class="one" :style="{ height: H + 'px' }">
      <div class="bg"></div>
      <!-- 导航 -->
      <div class="header">
        <el-row>
          <el-col :span="9" :offset="3">
            <div class="logo">
              <div class="logoImg">
                <img src="../assets/img/icon.png" alt="" />
              </div>
              <div class="logoText">思高易跨境</div>
            </div>
          </el-col>
          <el-col :span="9" :offset="3">
            <div class="headerText">
              <ul>
                <li v-for="(item, index) in headerLit" :key="index">
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="two"></div>
  </div>
</template>

<script>
import "../assets/less/introduce/introduce.css";
export default {
  data() {
    return {
      scrollTop: "",
      opacity: 0,
      // headerText
      headerLit: [
        { name: "主页", isChild: false },
        { name: "ERP介绍", isChild: true },
        { name: "软件方案", isChild: false },
        { name: "我们的优势", isChild: false },
        { name: "视频教程", isChild: false },
        { name: "联系我们", isChild: false },
      ],
    };
  },
  created() {
    this.H = document.documentElement.clientHeight;
  },
  mounted() {
    window.addEventListener("scroll", this.lisentScroll);
  },
  destroyed() {
    document.removeEventListener("scroll", this.lisentScroll);
  },
  methods: {
    // 监听屏幕 滚动
    lisentScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      this.scrollTop > 200 ? (this.opacity = 1) : (this.opacity = 0);
    },
    // 点击图标window.scroll = 0
    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      let timer = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 400;
        if (top <= 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    // 点击图标window.scroll = docuemnt.body.clientHeight
    toBottom() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      let timer = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top += 400;
        if (top >= document.body.clientHeight) {
          clearInterval(timer);
        }
      }, 20);
    },
  },
};
</script>