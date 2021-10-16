<template>
  <div class="toStock" :style="{ height: H + 'px' }">
    <div class="title">
      <van-nav-bar
        title="入库"
        left-text="返回"
        right-text="清空"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickright"
      />
    </div>
    <div class="set">
      <!-- 单号 -->
      <div class="orderNum">
        <span>单号</span>
        <span>
          <input type="text" placeholder="请输入" v-model="orderNum" />
        </span>
      </div>
      <!-- 数量 -->
      <div class="number">
        <span>数量</span>
        <span>
          <input type="text" placeholder="请输入" v-model="number" />
        </span>
      </div>
      <!-- 用户 -->
      <div class="userName">
        <div class="header">用户</div>
        <van-cell
          is-link
          :title="userList.title"
          :class="userList.title == '请选择' ? '' : 'active'"
          @click="showFace()"
        />
        <van-action-sheet v-model="userList.status">
          <div class="content">
            <van-picker
              @confirm="confirm($event)"
              @cancel="userList.status = false"
              show-toolbar
              :loading="userList.loading"
              :columns="userList.list"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 备注/图片 -->
      <div class="note">
        <van-field
          v-model="note"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          placeholder="请输入单号备注"
          show-word-limit
        />
        <div class="addImg">
          <!-- +  -->
          <div>
            <span>
              <van-icon name="plus" size="50" color="#ccc" />
              <input
                type="file"
                multiple
                @change="uploading($event)"
                ref="uploadInt"
                accept="image/*"
                title="上传图片"
              />
            </span>
          </div>
          <!-- image -->
          <div>
            <span
              v-for="(item, index) in imgList"
              :key="index"
              @click="lagerImage(item)"
            >
              <img :src="item.imgSrc" />
              <van-icon
                name="cross"
                color="red"
                size="15"
                @click.stop="deleteImg(item, index)"
              />
            </span>
          </div>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="btn">
        <van-button round size="normal" type="info" @click="godown()"
          >确认</van-button
        >
      </div>
    </div>
    <!-- 预览图片 -->
    <van-image-preview v-model="largeImgState" :images="images">
    </van-image-preview>
  </div>
</template>

<script>
import "@/assets/less/toStock/toStock.css";
export default {
  data() {
    return {
      H: "",
      infoData:{},
      orderNum: "",
      number: 1,
      userList: {
        title: "请选择",
        status: false,
        value: "",
        loading: false,
        list: [],
      },
      note: "",
      imgList: [],
      imgListSrc:"",
      // 第一次打开
      firstOpenState: false,
      // 预览图片
      largeImgState: false,
      images: [],
    };
  },
  created() {
    this.H = document.documentElement.clientHeight;
    this.infoData = sessionStorage.getItem("infoData")
  },
  destroyed() {
    this.firstOpenState = false;
    this.userList.list = [];
    this.$store.commit("setUserLists", []);
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // 清空
    onClickright() {
      this.orderNum = "";
      this.number = 1;
      this.userList.value = "";
      this.userList.title = "请选择";
      this.note = "";
      this.imgList = [];
    },
    // 打开 face
    showFace() {
      this.userList.list = [];
      if (this.firstOpenState) {
        // 已缓存
        this.userList.status = true;
        this.userList.loading = false;
        this.userList.list = this.$store.state.userLists;
        return;
      }
      this.userList.status = true;
      this.userList.loading = true;
      this.$axios({
        url: "/sigaoyi/NEWuserinfos",
        method: "POST",
        params: {},
      })
        .then((result) => {
          if (result.data.Code == 200) {
            result.data.users.forEach((e) => {
              e["text"] = e.userName + "：" + (e.id + 10850);
            });
            this.userList.list = result.data.users;
            this.$store.commit("setUserLists", this.userList.list);
            this.userList.loading = false;
            this.firstOpenState = true;
          } else {
            this.$dialog({ message: result.data.msg });
            this.firstOpenState = false;
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
          this.firstOpenState = false;
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
    // 选择用户 确认
    confirm(action) {
      this.userList.title = action.text;
      this.userList.value = action.userName;
      this.userList.status = false;
    },
    // 上传图片
    uploading(e) {
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", e.target.files[0]);

      let loading = this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });

      let url = "/sigaoyi/invoicingupload";
      this.$axios({
        url: "/sigaoyi/invoicingupload",
        method: "POST",
        data: formData,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then((result) => {
          loading.clear();
          console.log("result ==>", result);
          if (result.data.Code == "200") {
            let objImg = {
              imgSrc: result.data.path,
            };
            this.imgList.push(objImg);
            setTimeout(() => {
              this.$refs.uploadInt.value = "";
            }, 500);
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          loading.clear();
          this.$dialog({ message: "出现了不可预期的错误" });
          console.log("err ==>", err);
        });
    },
    // 图片 large
    lagerImage(item) {
      this.largeImgState = true;
      this.imgList.forEach((e) => {
        this.images.push(e.imgSrc);
      });
    },
    // 删除图片
    deleteImg(item, index) {
      this.imgList.splice(index, 1);
    },
    // 入库
    godown() {
      // 提示
      if (this.orderNum == "") {
        this.$toast("请先填写单号");
        return;
      }
      if (this.number == 0 || this.number == "") {
        this.$toast("数量格式不正确");
        return;
      }
      if (this.userList.value == "" || this.userList.title == "请选择") {
        this.$toast("请先选择要入库的用户");
        return;
      }
      // 图片处理
      if(this.imgList.length == 0){
          this.imgListSrc = ""
      } else{
          this.imgListSrc = this.imgList[0].imgSrc;
      }
      // 参数
      let data = {
        userID: this.userList.value,
        invoicingName: this.orderNum,
        number: this.number,
        image: this.imgListSrc,
        remarks: this.note,
      };
      // laoding
      let loading = this.$toast.loading({
          message: "入库中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 0,
        });

        this.$axios({
          url: "/sigaoyi/warehousing",
          method: "POST",
          params: data,
        }).then(result => {
            loading.clear()
          console.log("result ==>",result)
           if (result.data.Code == 200) {
               this.$dialog({ message: result.data.msg });
           }else{
               this.$dialog({ message: result.data.msg });
           }
        }).catch(err =>{
            loading.clear()
          console.log("err ==>",err);
          this.$dialog({ message: "出现了不可预期的错误" });
        })
    },
  },
};
</script>

<style>
</style>