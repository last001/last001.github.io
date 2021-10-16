<template>
  <div>
    <div class="loading">
      <img
        style="width: 100px; height: 100px"
        class="loadingImg"
        src="../../assets/img/jiazai.jpg"
        alt=""
      />
      <p>{{ imgCount }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgArr: [
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
        require("../../assets/img/initial.png"),
      ],
      imgCount: 0,
    };
  },
  mounted() {
    // this.abc();
  },
  methods: {
    abc() {
      var imgs = document.getElementsByTagName("img");
      function lazyload() {
        var scrollTop =
          window.pageXOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        var viewportSize =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
        for (var i = 0, len = imgs.length; i < len; i++) {
          var x = scrollTop + viewportSize - imgs[i].offsetTop;
          if (x > 0) {
            imgs[i].src = imgs[i].getAttribute("loadpic");
          }
        }
      }
      setInterval(lazyload, 1000);
    },
  },
};
</script>

<style>
</style>