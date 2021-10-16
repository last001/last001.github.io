<template>
  <div class="collection" :style="{ minHeight: H + 'px' }">
    <div class="title">
      <van-nav-bar title="采集" left-text="返回" right-text="清空" left-arrow fixed @click-left="onClickLeft"  @click-right="clearVal" />
    </div>
    <!-- 来源 -->
    <div class="platform">
      <div class="header">来源</div>
      <van-cell
        is-link
        :title="platformData.title"
        @click="platformData.status = true"
        :class="platformData.title == '请选择' ? '' : 'active'"
      />
      <van-action-sheet v-model="platformData.status">
        <div class="content">
          <van-picker
            @confirm="platformConFirm($event)"
            @cancel="onCancel"
            :columns="platformData.list"
            show-toolbar
          />
        </div>
      </van-action-sheet>
    </div>
    <!-- 分类1 -->
    <div class="classify1">
      <div class="header">分类一</div>
      <van-cell
        is-link
        :title="classifyData1.title"
        @click="classifyData1.status = true"
        :class="classifyData1.title == '请选择' ? '' : 'active'"
      />
      <van-action-sheet v-model="classifyData1.status">
        <div class="content">
          <van-picker
            @confirm="classify1ConFirm($event)"
            @cancel="onCancel"
            show-toolbar
            :columns="classifyData1.list"
          />
        </div>
      </van-action-sheet>
    </div>
    <!-- 分类2 -->
    <div class="classify2">
      <div class="header">分类二</div>
      <van-cell
        is-link
        :title="classifyData2.title"
        :class="classifyData2.title == '请选择' ? '' : 'active'"
        @click="showFace('二')"
      />
      <van-action-sheet v-model="classifyData2.status">
        <div class="content">
          <van-picker
            @confirm="classify2ConFirm($event)"
            @cancel="onCancel"
            show-toolbar
            :loading="classifyData2.loading"
            :columns="classifyData2.list"
          />
        </div>
      </van-action-sheet>
    </div>
    <!-- 分类3 -->
    <div class="classify3">
      <div class="header">分类三</div>
      <van-cell
        is-link
        :title="classifyData3.title"
        :class="classifyData3.title == '请选择' ? '' : 'active'"
        @click="showFace('三')"
      />
      <van-action-sheet v-model="classifyData3.status">
        <div class="content">
          <van-picker
            @confirm="classify3ConFirm($event)"
            @cancel="onCancel"
            show-toolbar
            :loading="classifyData3.loading"
            :columns="classifyData3.list"
          />
        </div>
      </van-action-sheet>
    </div>
    <!-- 关键词 -->
    <div class="keyWord">
      <span>关键词</span>
      <span>
        <input type="text" placeholder="关键词不超十个 多个以英文逗号隔开" v-model="keyWordVal" />
      </span>
    </div>
    <!-- 链接 -->
    <div class="link">
      <van-field
        v-model="linkSrc"
        rows="4"
        autosize
        label="链接"
        type="textarea"
        placeholder="请输入采集链接"
        show-word-limit
      />
    </div>
    <!-- 采集按钮 -->
    <div class="btn">
      <van-button round type="info" size="normal" @click="collectionLink()"
        >采集</van-button
      >
    </div>
  </div>
</template>
<script>
import "../../../assets/less/collection/collection.css";
export default {
  data() {
    return {
      // 屏幕最高度 渲染背景色
      H: "",
      //  来源
      platformData: {
        title: "请选择",
        status: false,
        value: "",
        list: [
          { text: "1688", value: "1" },
          { text: "淘宝/天猫", value: "2" },
          { text: "搜款网", value: "3" },
          { text: "速卖通", value: "4" },
          { text: "拼多多", value: "5" },
          { text: "亚马逊日本网站", value: "6" },
          { text: "乐天", value: "7" },
          { text: "雅虎商城", value: "8" },
        ],
      },
      //   分类1
      classifyData1: {
        title: "请选择",
        status: false,
        value: "",
        list: [],
      },
      //   分类2
      classifyData2: {
        title: "请选择",
        status: false,
        value: "",
        loading: false,
        list: [],
      },
      //   分类3
      classifyData3: {
        title: "请选择",
        status: false,
        value: 99,
        loading: false,
        list: [],
      },
      //  关键词
      keyWordVal: "",
      // 文本框 value
      linkSrc: "",
    };
  },
  created() {
    // 屏幕最小高度
    this.H = document.documentElement.clientHeight;
    // 获取初始值
    this.getClassify1();
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.back();
    },
    // 取消渠道选择
    onCancel() {
      this.platformData.status = false;
      this.classifyData1.status = false;
      this.classifyData2.status = false;
      this.classifyData3.status = false;
    },
    // 渠道选择确定
    platformConFirm(value) {
      this.platformData.title = value.text;
      this.platformData.value = value.value;
      this.onCancel();
    },
    // 获取初始值
    getClassify1() {
      this.$axios({
        url: "/sigaoyi/GetCatalogs",
        method: "POST",
        params: {},
      })
        .then((result) => {
          console.log("result ==>", result);
          let classObj = {
            catalogId: "",
            catalogLevel: 0,
            catalogName: "请选择",
            superiorId: 0,
            text: "请选择",
          };
          result.data.catalogs.unshift(classObj);
          result.data.catalogs.forEach((e) => {
            e["text"] = e.catalogName;
          });
          this.classifyData1.list = result.data.catalogs;
        })
        .catch((err) => {
          console.log("err ==>", err);
          this.$toast({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
    // 点击 打开 面板 的 时候 请求
    showFace(string) {
      if (string == "二") {
        if (this.classifyData1.value == "") {
          this.$toast("请先选择分类一选项");
          return;
        }
        this.classifyData2.list = [];
        this.classifyData2.status = true;
        this.classifyData2.loading = true;
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: this.classifyData1.value,
          },
        })
          .then((result) => {
            console.log("result ==>", result);
            let classObj = {
              catalogId: "",
              catalogLevel: 0,
              catalogName: "请选择",
              superiorId: 0,
              text: "请选择",
            };
            result.data.catalogs.unshift(classObj);
            result.data.catalogs.forEach((e) => {
              e["text"] = e.catalogName;
            });
            this.classifyData2.list = result.data.catalogs;
            this.classifyData2.loading = false;
          })
          .catch((err) => {
            console.log("err ==>", err);
            this.$toast({ message: "系统服务繁忙,请稍后再试!" });
          });
      } else {
        if (this.classifyData2.value == "") {
          this.$toast("请先选择分类二选项");
          return;
        }
        this.classifyData3.list = [];
        this.classifyData3.status = true;
        this.classifyData3.loading = true;
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: this.classifyData2.value,
          },
        })
          .then((result) => {
            console.log("result ==>", result);
            let classObj = {
              catalogId: "",
              catalogLevel: 0,
              catalogName: "请选择",
              superiorId: 0,
              text: "请选择",
            };
            result.data.catalogs.unshift(classObj);
            result.data.catalogs.forEach((e) => {
              e["text"] = e.catalogName;
            });
            this.classifyData3.list = result.data.catalogs;
            this.classifyData3.loading = false;
          })
          .catch((err) => {
            console.log("err ==>", err);
            this.$toast({ message: "系统服务繁忙,请稍后再试!" });
          });
      }
    },
    // 分类一选择确定
    classify1ConFirm(value) {
      if (this.classifyData1.title == value.text) {
        this.onCancel();
        return;
      } else {
        this.classifyData1.title = value.text;
        this.classifyData1.value = value.catalogId;
        // 重置 2 3
        this.classifyData2.title = "请选择";
        this.classifyData3.title = "请选择";
        this.classifyData2.value = "";
        this.classifyData3.value = "";
        this.onCancel();
      }
    },
    // 分类二选择确定
    classify2ConFirm(value) {
      if (this.classifyData2.title == value.text) {
        this.onCancel();
        return;
      } else {
        this.classifyData2.title = value.text;
        this.classifyData2.value = value.catalogId;
        // 重置 3
        this.classifyData3.title = "请选择";
        this.classifyData3.value = "";
        this.onCancel();
      }
    },
    // 分类三选择确定
    classify3ConFirm(value) {
      this.classifyData3.title = value.text;
      this.classifyData3.value = value.catalogId;
      this.onCancel();
    },
    // 点击采集按钮
    collectionLink() {
      let infoData = JSON.parse(sessionStorage.getItem("infoData"));
      if (infoData == undefined || infoData == null) {
        return;
      }
      // 来源提示
      if (this.platformData.value == "") {
        this.$toast("请选择采集来源");
        return;
      }
      // 链接处理
      let textareaVal = this.linkSrc.replace(/(\r\n*$)/, "");
      textareaVal = textareaVal.replace(/(\s*)$/g, "");
      let linkArr = textareaVal.split(/\n/);
    //   console.log("linkArr ==>", linkArr);
      for (let i = linkArr.length - 1; i >= 0; i--) {
        if (linkArr[i] == "") {
          linkArr.splice(i, 1);
        }
      }
      linkArr.forEach((e) => {
        let data = {
          platform: this.platformData.value,
          link: e,
          cookie: "",
          userId: infoData.id,
          nick: this.keyWordVal,
          sortid: this.classifyData3.value,
        };
        console.log("data ==>",data);
        const loading = this.$toast.loading({
          message: "采集中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: "0",
        });
        this.$axios({
          url: "/sigaoyi/NEWgatheringproducts",
          method: "POST",
          params: data,
        })
          .then((result) => {
            console.log("result ==>", result);
            loading.clear();
            if (result.data.code == 200) {
              this.$dialog({ message: result.data.msg,confirmButtonColor:"#409eff" });
            } else {
              this.$dialog({ message: result.data.msg });
            }
          })
          .catch((err) => {
            loading.clear();
            console.log("err ==>", err);
            this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
          });
      });
    },
    // 清空
    clearVal(){
        // 来源
        this.platformData.title = "请选择";
        this.platformData.value = "";
        // 分类
        this.classifyData1.title = "请选择"; 
        this.classifyData1.value = ""; 

        this.classifyData2.title = "请选择"; 
        this.classifyData2.value = ""; 

        this.classifyData3.title = "请选择"; 
        this.classifyData3.value = ""; 
        // 关键词
        this.keyWordVal = "";
        // 链接
        this.linkSrc = "";
    }
  },
};
</script>