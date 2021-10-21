<template>
  <div class="changeStock">
    <div class="title">
      <van-nav-bar
        title="库存列表详情"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
    </div>
    <div class="stockDetails">
      <!-- 名称/单号 -->
      <div class="int">
        <span>名称/单号</span>
        <span>
          <input type="text" placeholder="请输入" v-model="item.name" />
        </span>
      </div>
      <!-- 订单编号 -->
      <div class="int">
        <span>订单编号</span>
        <span>
          <input type="text" placeholder="请输入" v-model="item.orderNo" />
        </span>
      </div>
      <!-- 数量 -->
      <div class="int">
        <span>数量</span>
        <span>
          <input type="number" placeholder="请输入" v-model="item.quantity" />
        </span>
      </div>
      <!-- 状态 -->
      <div class="set" v-if="infoData.admitor">
        <div class="header">状态</div>
        <van-cell
          is-link
          :title="stateData.title"
          :class="stateData.title == '请选择' ? '' : 'active'"
          @click="stateData.status = true"
        />
        <van-action-sheet v-model="stateData.status">
          <div class="content">
            <van-picker
              @confirm="conFirm($event, stateData)"
              @cancel="stateData.status = false"
              :columns="stateData.list"
              show-toolbar
              :default-index="stateData.index"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 订单备注 + 上传图片 -->
      <div class="note">
        <van-field
          v-model="item.remarks"
          rows="4"
          autosize
          label="备注"
          type="textarea"
          placeholder="请输入备注"
          show-word-limit
        />
        <div class="addImg">
          <div>
            <span
              ><van-icon name="plus" size="50" color="#ccc" />
              <input
                type="file"
                multiple
                @change="uploading($event)"
                ref="uploadInt"
                accept="image/*"
                title="上传图片"
            /></span>
          </div>
          <div>
            <span>
              <img :src="item.imgSrc" @click="lagerImage()" />
              <van-icon
                name="cross"
                color="red"
                @click.stop="clearImgSrc()"
                v-show="
                  item.imgSrc !=
                  'http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg'
                "
              />
            </span>
          </div>
        </div>
      </div>
      <!-- 保存按钮 -->
      <div class="btn">
        <van-button round type="info" size="normal" @click="saveDetails()"
          >保存</van-button
        >
      </div>
      <!-- 预览图片 -->
      <van-image-preview v-model="largeImgState" :images="images">
        <template v-slot:cover
          ><span @click="saveImage()">保存图片</span></template
        >
      </van-image-preview>
    </div>
  </div>
</template>

<script>
var firtRouter = false;
import "@/assets/less/changeStock/changeStock.css";
export default {
  data() {
    return {
      infoData: {},
      item: {},
      images: [],
      largeImgState: false,
      //   状态
      stateData: {
        title: "待出库",
        status: false,
        value: 3,
        index: 0,
        list: [
          { text: "待出库", value: 3 },
          { text: "已出库", value: 4 },
          { text: "已退回", value: 5 },
        ],
      },
      isSave: false,
    };
  },
  created() {
    this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    this.item = JSON.parse(this.$route.query.item);
    this.getSystem();
  },
  methods: {
    onClickLeft() {
      if (this.isSave) {
        firtRouter = true;
      } else {
        firtRouter = false;
      }
      this.$router.push({ name: "Stock", query: { firtRouter: firtRouter } });
    },
    // 管理员
    getSystem() {
      if (
        this.infoData.statu == "0" ||
        this.infoData.userName == "王焕杰" ||
        this.infoData.userName == "任治琴" ||
        this.infoData.userName == "李健明" ||
        this.infoData.userName == "王杰" ||
        this.infoData.userName == "hzsugoi"
      ) {
        this.infoData["admitor"] = true;
      } else {
        this.infoData["admitor"] = false;
      }
    },
    // set 选择确定
    conFirm(e, array) {
      array.title = e.text;
      array.value = e.value;
      array.status = false;
    },
    // 删除图片
    clearImgSrc() {
      this.item.img = "";
      this.item.imgSrc =
        "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
    },
    // 上传图片
    uploading(e) {
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", e.target.files[0]);

      //   loading
      var loading = this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });

      this.$axios({
        url: "/sigaoyi/invoicingupload",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((result) => {
          loading.clear();
          console.log("result ==>", result);
          setTimeout(() => {
            this.$refs.uploadInt.value = null;
          }, 100);
          if (result.data.Code == "200") {
            this.item.imgSrc = result.data.path;
            this.$toast({ message: result.data.msg });
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.$refs.uploadInt.value = null;
          }, 100);
          loading.clear();
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
          console.log("err ==>", err);
        });
    },
    // 点击放大图片
    lagerImage(item) {
      this.images = [];
      this.largeImgState = true;
      this.images.push(this.item.imgSrc);
    },
    // 保存
    saveDetails() {
      let data = {
        id: this.item.id,
        orderNo: this.item.orderNo,
        belonger: this.item.belonger,
        name: this.item.name,
        quantity: this.item.quantity,
        inventory: this.item.inventory,
        damaged: this.item.damaged,
        lost: this.item.lost,
        ship: this.item.ship,
        remarks: this.item.remarks,
        imgUrl: this.item.imgSrc,
        status: this.stateData.value,
      };

      if (data.imgUrl == "") {
        data.imgUrl ==
          "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
      }

      console.log("data ==>", data);
      //   loading
      var loading = this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });

      this.$axios({
        url: "/sigaoyi/updateInvoicingInfo",
        method: "POST",
        params: data,
      })
        .then((result) => {
          loading.clear();
          console.log("result ==>", result);
          if (result.data.Code == "200") {
            this.isSave = true;
            this.$dialog({
              message: result.data.msg,
              confirmButtonColor: "#409eff",
            });
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          loading.clear();
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
          console.log("err ==>", err);
        });
    },
    // 保存图片
    saveImage() {
      let _this = this;
      if (!window.plus) return;
      plus.gallery.save(
        _this.images[0],
        function () {
          ///刷新相册
        //   var main = plus.android.runtimeMainActivity();
        //   var intent = plus.android.importClass("android.content.Intent");
        //   var Uri = plus.android.importClass("android.net.Uri");
        //   main.sendBroadcast(
        //     new intent(intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse(pant))
        //   );
          _this.$toast("保存相册成功!"); //_this.user_qrcode 是服务器链接，必须是图片格式
        },
        function () {
          _this.$toast("保存失败，请重试!");
        }
      );
    },
  },
};
</script>

<style>
</style>