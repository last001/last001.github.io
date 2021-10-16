<template>
  <div class="productDetails" :style="{ minHeight: H + 'px' }">
    <div class="icon" @click="goBack()">
      <van-icon name="arrow-left" color="#fff" size="24px" />
    </div>
    <!-- 修改 -->
    <div class="changeBtn" @click="goChange()">
      <van-button type="info" size="mini">修改</van-button>
    </div>
    <!-- 轮播图 -->
    <div class="wrap">
      <van-swipe :autoplay="3000" style="height: 200px" @change="onChange">
        <van-swipe-item v-for="(item, index) in imgList" :key="index">
          <img v-lazy="item" @click="onClick(item)" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{ imgList.length }}
          </div>
        </template>
      </van-swipe>
    </div>
    <!-- 内容 -->
    <div class="details-content" v-if="skeletionState">
      <!-- 详情 文字 -->
      <div class="proInfo">
        <div class="price clearfix">
          <div class="v-price fl">
            ￥<em>{{ item.price }}</em>
          </div>
        </div>
        <div class="title">
          <span>{{ item.title }}</span>
          <span
            >运费 <em>{{ item.express_fee }}</em></span
          >
          <van-icon name="fire-o" color="#999" size="18" />
        </div>
      </div>
      <!-- 尺寸 分类 -->
      <div class="calssify">
        <div class="v-calssify">
          <div>
            <span>尺寸(cm)</span>
            <span>长 * 0</span>
            <span>宽 * 0</span>
            <span>高 * 0</span>
          </div>
          <div>
            <span>大类</span>
            <span>{{ catalog0 }}</span>
          </div>
          <div>
            <span>中类</span>
            <span>{{ catalog1 }}</span>
          </div>
          <div>
            <span>小类</span>
            <span>{{ catalog2 }}</span>
          </div>
          <!-- 采集链接 -->
          <div>
            <span>链接</span>
            <span>{{ item.detail_url }}</span>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <div class="table">
        <div class="v-table">
          <table border="1" rules="all">
            <tr>
              <th>类型</th>
              <th>名称</th>
              <th>英文</th>
              <th>日文</th>
              <th>库存</th>
              <th>加价</th>
            </tr>
            <tr v-for="(item, index) in variants" :key="index">
              <td>{{ item.type }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.name_en }}</td>
              <td>{{ item.name_jp }}</td>
              <td>{{ item.stock }}</td>
              <td>{{ item.markup }}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 简介 -->
      <div class="remakrs">
        <div class="v-remakrs">
          <span>简介：</span>
          <textarea v-model="item.summary"></textarea>
        </div>
      </div>
      <!-- 详情title -->
      <div class="detail_title">
        <van-divider :style="{ borderColor: '#ddd' }">产品详情</van-divider>
      </div>
      <!-- 详情内容 -->
      <div class="detail">
        <div class="v-detail">
          <!-- item.details -->
          <!-- 引入富文本 -->
          <quill-editor
            v-model="item.details"
            ref="myQuillEditor"
            disabled
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </div>
      </div>
      <!-- 刊登 按钮 -->
      <div class="publish">
        <van-button round type="info" @click="publish()">刊登产品</van-button>
      </div>
      <!-- 图片预览 -->
      <van-image-preview v-model="showImage" :images="previewList">
      </van-image-preview>
    </div>
    <!-- 骨架屏 -->
    <div class="skeletion" v-else>
      <div class="skeletion_details">
        <van-skeleton row-width="30%" :row="1" />
        <van-skeleton row-width="100%" :row="1" />
        <van-skeleton row-width="100%" :row="1" />
        <van-skeleton row-width="100%" :row="1" />
      </div>
      <div class="skeletion_remakrs">
        <div class="v_skeletion_remakrs">
          <van-skeleton row-width="100%" :row="1" />
          <van-skeleton row-width="25%" :row="1" />
          <van-skeleton row-width="35%" :row="1" />
          <van-skeleton row-width="30%" :row="1" />
          <van-skeleton row-width="100%" :row="1" />
        </div>
      </div>
      <div class="skeletion_note">
        <div class="v-skeletion_note">
          <van-skeleton title :row="4" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/less/ProductDetails/productDetails.css";
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      infoData: {},
      // 产品列表
      item: [],
      // 图片列表
      imgList: [],
      // 表格list
      variants: [],
      // 店铺list
      shopList: [],
      // 分类
      catalog0: "",
      catalog1: "",
      catalog2: "",
      catalog2Num: 0,
      // 语言
      language: 0,
      // 轮播图 自定义指示器
      current: 0,
      // 富文本
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            // ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            // ["blockquote", "code-block"], //引用，代码块
            // [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            // [{ list: "ordered" }, { list: "bullet" }], //列表
            // [{ script: "sub" }, { script: "super" }], // 上下标
            // [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{ direction: "rtl" }], // 文本方向
            // [{ size: ["small", false, "large", "huge"] }], // 字体大小
            // [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            // [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            // [{ font: [] }], //字体
            // [{ align: [] }], //对齐方式
            // ["clean"], //清除字体样式
            // ["image", "video"], //上传图片、上传视频
          ],
        },
        theme: "snow",
        placeholder: "请输入内容...",
      },
      // 图片预览
      showImage: false,
      previewList: [],
      // 骨架屏状态值
      skeletionState: true,
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log("from.path ==>", from.path);
    if (from.path == "/changeProduct" || from.path == "/publish") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    this.H = document.documentElement.clientHeight;
    this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    if (!this.$route.meta.isBack) {
      this.skeletionState = false;
      this.item = [];
      this.imgList = [];
      this.getInitData();
    } else {
      console.log("不重新获取数据!!!");
      this.$route.meta.isBack = false;
      if (this.$route.query.first) {
        this.getInitData();
      }
    }
  },
  created() {},
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  methods: {
    //   轮播图滑动事件
    onChange(index) {
      this.current = index;
      // console.log("index ==>",index);
    },
    //   轮播图点击事件
    onClick(item) {
      this.previewList = [];
      this.showImage = true;
      this.previewList = this.imgList;
    },
    // 返回
    goBack() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.push({ name: "Commodity" });
      }, 600);
    },
    // 去 修改页面
    goChange() {
      this.$router.push({
        name: "ChangeProduct",
        query: { id: this.item.id, language: this.language },
      });
    },
    // 获取 初始值 id
    getInitData() {
      if (this.$route.query.first != true) {
        var loading = this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 0,
        });
      }
      this.$axios({
        method: "POST",
        url: "/sigaoyi/NEWgetProduct",
        params: {
          userId: this.infoData.id,
          id: this.$route.query.id,
          language: this.$route.query.language,
        },
      })
        .then((result) => {
          if (this.$route.query.first != true) {
            loading.clear();
          }
          console.log("result ==>", result);
          this.skeletionState = true;
          if (result.data.Code == 200) {
            this.item = result.data.product;
            // 表格
            this.variants = result.data.variants;
            // 店铺
            this.shopList = result.data.qoo10shops;
            this.imgList = result.data.imgs;
            this.language = result.data.language;
            // 分类
            if (result.data.catalog0 != undefined) {
              this.catalog0 = result.data.catalog0.catalogName;
              this.catalog1 = result.data.catalog1.catalogName;
              this.catalog2 = result.data.catalog2.catalogName;
              // 运费编号
              this.catalog2Num = result.data.catalog2.catalogId;
            }else{
                this.catalog0 = "";
                this.catalog1 = "";
                this.catalog2 = "";
                this.catalog2Num = 0;
            }
          } else {
            this.$toast(result.data.msg);
          }
        })
        .catch((err) => {
          if (this.$route.query.first != true) {
            loading.clear();
          }
          this.skeletionState = true;
          this.$toast("系统业务繁忙,请稍后再试");
          console.log("err ==>", err);
        });
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml(event) {
      alert(this.content);
    },
    // 刊登
    publish() {
      this.$router.push({
        name: "Publish",
        query: {
          AllshopLit: JSON.stringify(this.shopList),
          id: this.$route.query.id,
          language: this.$route.query.language,
          catalog2Num: this.catalog2Num,
        },
      });
    },
  },
};
</script>
<style lang="less">
</style>