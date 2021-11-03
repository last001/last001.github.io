<template>
  <div class="changeProduct" :style="{ minHeight: H + 'px' }">
    <div class="title">
      <van-nav-bar
        title="修改产品详情"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <van-button type="info" size="mini">保存</van-button>
        </template>
      </van-nav-bar>
    </div>
    <!-- 修改内容 -->
    <div class="product_content">
      <!-- 标题 -->
      <div class="int">
        <span>标题</span>
        <span>
          <input type="text" placeholder="请输入" v-model="item.title" />
        </span>
      </div>
      <!-- 运费 -->
      <div class="int">
        <span>运费</span>
        <span>
          <input type="text" placeholder="请输入" v-model="item.express_fee" />
        </span>
      </div>
      <!-- 价格 -->
      <div class="int">
        <span>价格</span>
        <span>
          <input type="text" placeholder="请输入" v-model="item.priceSymbol" />
        </span>
      </div>
      <!-- 分类一 -->
      <div class="set">
        <div class="header">分类一</div>
        <van-cell
          is-link
          :title="catalogs.title"
          @click="showFace(catalogs)"
          :class="catalogs.title == '请选择' ? '' : 'active'"
        />
        <van-action-sheet v-model="catalogs.status">
          <div class="content">
            <van-picker
              @confirm="conFirm($event, catalogs, '一')"
              @cancel="onCancel(catalogs)"
              :columns="catalogs.list"
              show-toolbar
              :default-index="catalogs.index"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 分类二 -->
      <div class="set">
        <div class="header">分类二</div>
        <van-cell
          is-link
          :title="catalog1.title"
          @click="showFace(catalog1, '二')"
          :class="catalog1.title == '请选择' ? '' : 'active'"
        />
        <van-action-sheet v-model="catalog1.status">
          <div class="content">
            <van-picker
              @confirm="conFirm($event, catalog1, '二')"
              @cancel="onCancel(catalog1)"
              :columns="catalog1.list"
              show-toolbar
              :loading="catalog1.loading"
              :default-index="catalog1.index"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 分类三 -->
      <div class="set">
        <div class="header">分类三</div>
        <van-cell
          is-link
          :title="catalog2.title"
          @click="showFace(catalog2, '三')"
          :class="catalog2.title == '请选择' ? '' : 'active'"
        />
        <van-action-sheet v-model="catalog2.status">
          <div class="content">
            <van-picker
              @confirm="conFirm($event, catalog2, '三')"
              @cancel="onCancel(catalog2)"
              :columns="catalog2.list"
              show-toolbar
              :loading="catalog2.loading"
              :default-index="catalog2.index"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 分类三的编码 -->
      <div class="int">
        <span>编码</span>
        <span>
          <input type="number" placeholder="请输入" v-model="catalog2Val" />
        </span>
      </div>
      <!-- 简介 -->
      <div class="remakrs">
        <van-field
          v-model="item.summary"
          rows="4"
          autosize
          label="简介"
          type="textarea"
          placeholder="请输入"
          show-word-limit
        />
      </div>
      <!-- 详情内容 -->
      <div class="detail">
        <div class="v-detail">
          <!-- 引入富文本 -->
          <quill-editor
            v-model="item.details"
            ref="myQuillEditor"
            :disabled="quillDis"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/less/changeProduct/changeProduct.css";
import qs from "qs";
var firstRouter = false;
export default {
  data() {
    return {
      H: "",
      infoData: {},
      item: {},
      // 初始 分类
      catalogs0: {},
      catalogs: {
        title: "请选择",
        status: false,
        value: 99,
        index: 0,
        list: [],
      },
      // 分类二
      catalogs01: {},
      catalog1: {
        title: "请选择",
        status: false,
        loading: false,
        value: 99,
        index: 0,
        list: [],
      },
      // 分类三
      catalogs02: {},
      catalog2: {
        title: "请选择",
        status: false,
        loading: false,
        value: 99,
        index: 0,
        list: [],
      },
      // 编码   
      catalog2Val:0,
      // 富文本
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
            ["clean"], //清除字体样式
            ["image", "video"], //上传图片、上传视频
          ],
        },
        theme: "snow",
        placeholder: "请输入内容...",
      },
      quillDis: true,
    };
  },
  created() {
    this.H = document.documentElement.clientHeight - 46;
    this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    this.getInitData();
  },
  mounted() {},
  methods: {
    //  返回
    onClickLeft() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.push({
          name: "ProductDetails",
          query: {
            id: this.$route.query.id,
            language: this.$route.query.language,
            first: firstRouter,
          },
        });
      }, 600);
    },
    //  保存
    onClickRight() {
      let data = {
        id: this.$route.query.id,
        sortid: this.catalog2.value,
        status: this.item.status,
        title: this.item.title,
        price: this.item.priceSymbol,
        express_fee: this.item.express_fee,
        summary: this.item.summary,
        elm1: this.item.details,
        imglist: this.item.item_imgs,
        language: this.$route.query.language,
      };
      if(this.catalog2Val != 0 || this.catalog2Val != ""){
          if(this.catalog2.list.findIndex(target => target.catalogId == this.catalog2Val) > -1){
              console.log("找到了");
              data.sortid = Number(this.catalog2Val);
          }else{
              data.sortid = this.catalog2.value;
          }
      }

      // 处理price 单位
      data.price = data.price.replace(/[^\d.]/g, "");

      console.log("data ==>", data);

      let data1 = qs.stringify(data);
      //  请求
      let loading = this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      this.$axios({
        url: "/sigaoyi/updateproduct",
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        data: data1,
      })
        .then((result) => {
          loading.clear();
          console.log("result ==>", result);
          if (result.data.code == 200) {
            firstRouter = true;
            this.$toast(result.data.msg);
            this.$router.push({
              name: "ProductDetails",
              query: {
                id: this.$route.query.id,
                language: this.$route.query.language,
                first: firstRouter,
              },
            });
          } else {
            this.$dialog({message:result.data.msg});
          }
        })
        .catch((err) => {
          loading.clear();
          this.$dialog({message:"系统业务繁忙,请稍后再试"});
          console.log("err ==>", err);
        });
    },
    // 获取 初始值 id
    getInitData() {
      let loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
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
          loading.clear();
          console.log("result ==>", result);
          if (result.data.Code == 200) {
             if (result.data.product.currencytype == 0) {
              result.data.product["Moneysymbol"] = "¥";
            } else if (result.data.product.currencytype == 1) {
              result.data.product["Moneysymbol"] = "$";
            } else {
              result.data.product["Moneysymbol"] = "円";
            }
            result.data.product["priceSymbol"] = result.data.product.price + result.data.product.Moneysymbol
            this.item = result.data.product;
            // 分类 处理
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "请选择",
              superiorId: 0,
              selected: true,
            };
            result.data.catalogs.unshift(classObj);
            result.data.catalogs.forEach((e) => {
              e["text"] = e.catalogName;
            });
            this.catalogs.list = result.data.catalogs;
            this.quillDis = false;
            if (result.data.catalog0 != undefined) {
              // 3个分类
              this.catalogs0 = result.data.catalog0;
              this.catalogs01 = result.data.catalog1;
              this.catalogs02 = result.data.catalog2;
              this.setClassify();
            }
          } else {
            this.$toast(result.data.msg);
          }
        })
        .catch((err) => {
          loading.clear();
          this.$toast("系统业务繁忙,请稍后再试");
          console.log("err ==>", err);
        });
    },
    // 分类处理
    setClassify() {
      // 一
      this.catalogs.list.forEach((e, i) => {
        if (e.catalogId == this.catalogs0.catalogId) {
          this.catalogs.title = e.text;
          this.catalogs.value = e.catalogId;
          this.catalogs.index = i;
        }
      });

      if (this.catalogs.value != 99) {
        // 二
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: this.catalogs0.catalogId,
          },
        })
          .then((result) => {
            console.log("result ==>", result);
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "请选择",
              superiorId: 0,
              text: "请选择",
            };
            result.data.catalogs.unshift(classObj);
            result.data.catalogs.forEach((e) => {
              e["text"] = e.catalogName;
            });
            this.catalog1.list = result.data.catalogs;
            this.catalog1.list.forEach((e, i) => {
              if (e.catalogId == this.catalogs01.catalogId) {
                this.catalog1.title = e.text;
                this.catalog1.value = e.catalogId;
                this.catalog1.index = i;
              }
            });
          })
          .catch((err) => {
            console.log("err ==>", err);
            this.$toast({ message: "系统服务繁忙,请稍后再试!" });
          });

        // 三
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: this.catalogs01.catalogId,
          },
        })
          .then((result) => {
            console.log("result ==>", result);
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "请选择",
              superiorId: 0,
              text: "请选择",
            };
            result.data.catalogs.unshift(classObj);
            result.data.catalogs.forEach((e) => {
              e["text"] = e.catalogName;
            });
            this.catalog2.list = result.data.catalogs;
            console.log("this.catalog2.list ==>", this.catalog2.list);
            this.catalog2.list.forEach((e, i) => {
              if (e.catalogId == this.catalogs02.catalogId) {
                this.catalog2.title = e.text;
                this.catalog2.value = e.catalogId;
                this.catalog2.index = i;
              }
            });
            this.catalog2Val = this.catalog2.value;
          })
          .catch((err) => {
            console.log("err ==>", err);
            this.$toast({ message: "系统服务繁忙,请稍后再试!" });
          });
      }
    },
    // set 展示层
    showFace(array, string) {
      //   console.log(array.index);
      if (string == "二") {
        if (this.catalogs.value == 99) {
          this.$toast("请先选择分类一选项");
          return;
        }
        this.catalog1.list = [];
        this.catalog1.status = true;
        this.catalog1.loading = true;
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: this.catalogs.value,
          },
        })
          .then((result) => {
            console.log("result ==>", result);
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "请选择",
              superiorId: 0,
              text: "请选择",
            };
            result.data.catalogs.unshift(classObj);
            result.data.catalogs.forEach((e) => {
              e["text"] = e.catalogName;
            });
            this.catalog1.list = result.data.catalogs;
            this.catalog1.loading = false;
          })
          .catch((err) => {
            console.log("err ==>", err);
            this.$toast({ message: "系统服务繁忙,请稍后再试!" });
          });
      } else if (string == "三") {
        if (this.catalog1.value == 99) {
          this.$toast("请先选择分类二选项");
          return;
        }
        this.catalog2.list = [];
        this.catalog2.status = true;
        this.catalog2.loading = true;
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: this.catalog1.value,
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
            this.catalog2.list = result.data.catalogs;
            this.catalog2.loading = false;
          })
          .catch((err) => {
            console.log("err ==>", err);
            this.$toast({ message: "系统服务繁忙,请稍后再试!" });
          });
      } else {
        array.status = true;
      }
    },
    // set 取消选择
    onCancel(array) {
      array.status = false;
    },
    // set 选择确定
    conFirm(e, array, string) {
      array.title = e.text;
      array.value = e.catalogId;
      array.list.forEach((el, i) => {
        if (el.text == array.title) {
          array.index = i;
        }
      });
      this.onCancel(array);
      if (e.catalogId == 99) {
        if (string == "一") {
          //  分类二
          this.catalog1.title = "请选择";
          this.catalog1.value = 99;
          this.catalog1.index = 0;
          this.catalog1.list = [];
          //  分类三
          this.catalog2.title = "请选择";
          this.catalog2.value = 99;
          this.catalog2.index = 0;
          this.catalog2.list = [];
        } else if (string == "二") {
          //  分类三
          this.catalog2.title = "请选择";
          this.catalog2.value = 99;
          this.catalog2.index = 0;
          this.catalog2.list = [];
        } 
      }else{
          if(string == "三"){
              this.catalog2Val = array.value;
          }
      }
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml(event) {
      //   alert(this.content);
    },
  },
};
</script>

<style>
</style>