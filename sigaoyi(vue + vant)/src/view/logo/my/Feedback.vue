<template>
  <div class="feedback" :style="{minHeight: H +'px'}">
    <div class="title">
      <van-nav-bar
        title="意见反馈"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
    </div>
    <div class="totas">
      <van-notice-bar
        wrapable
        :scrollable="false"
        color="#409eff"
        background="#ecf9ff"
        mode="closeable"
        >为了更快的解决您的问题,请在发生问题时或再次遇到问题随时,立即反馈。</van-notice-bar
      >
    </div>
    <div class="feedback-type">反馈类型</div>
    <div class="set">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell
            title="功能异常"
            value="不能使用现有功能"
            clickable
            @click="radio = '1'"
          >
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell
            title="其他功能"
            value="用得不流畅，不方便等。"
            clickable
            @click="radio = '2'"
          >
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="feedback-int">问题和建议</div>
    <div class="proposal">
      <textarea rows="10" v-model="textareaText" :placeholder="placeholderText"></textarea>
    </div>
    <div class="feedback-image">添加图片（选填，提供问题截图）</div>
    <div class="img">
      <van-uploader v-model="fileList" multiple :after-read="afterRead" />
    </div>
    <div class="btn">
        <van-button type="info" @click="confirm()">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      H:"",
      radio: "1",
      placeholderText:
        "请详细描述您遇到的问题：\n1、打开了某个页面\n2、执行了某个操作遇到了什么问题\n3、其他附加描述",
      fileList: [
        { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' },
      ],
      textareaText:"",
      // 提交拿到的数组
      confirmList:{
        type:"",
        problem:"",
        fileList:[],
      }   
    };
  },
  created () {
    this.H = document.documentElement.clientHeight - 46;  
  },
  methods: {
    //   返回
    onClickLeft() {
      this.$router.back();
    },
    // 上传文件
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log("file ==>",file);
      console.log("this.fileList ==>",this.fileList)
    },
    // 提交
    confirm(){
        this.confirmList.type = this.radio;
        this.confirmList.problem = this.textareaText;
        this.confirmList.fileList = this.fileList;

        console.log("this.confirmList ==>",this.confirmList);
        this.$toast("提交成功，感谢您的反馈！")
    },
  },
};
</script>

<style lang="less" scoped>
.feedback {
  padding-top: 46px;
  position: relative;
  .totas {
    color: #409eff;
    /deep/ .van-notice-bar--wrapable {
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .feedback-type,
  .feedback-int,
  .feedback-image {
    padding: 10px 15px;
  }
  .set {
    .van-cell__value {
      flex: 3;
      text-align: left;
    }
  }
  .proposal {
    padding: 10px 15px;
    background-color: #fff;
    textarea {
      width: 100%;
      border-color: #fff;
      resize: none;
    }
  }
  .img {
    padding: 10px 15px;
    padding-bottom: 2px;
    background: #fff;
    /deep/ .van-uploader {
      .van-uploader__preview{
          .van-uploader__preview-image{
              height: 60px;
              width: 60px;
          }
      }
      .van-uploader__upload {
        width: 60px;
        height: 60px;
      }
      &:nth-of-type(5n+5){
         .van-uploader__upload{
             margin-right: 0;
         }
      }
    }
  }
  .btn{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      button{
          width: 100%;
          background-color: #409eff;
          border: 1px solid #409eff;
      }
  }
}
</style>