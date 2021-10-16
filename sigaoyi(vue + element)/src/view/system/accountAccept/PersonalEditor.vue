<template>
  <div class="personalEditor">
    <div class="main" v-title data-title="个人编辑"></div>
    <div class="personalEditorInfo">
      <div class="hint"><i class="mustIcon">*</i>为必须填</div>
      <!-- 头像 -->
      <div class="besicInfo">
        <div class="besicHeader clearfix">
          <span class="fl">基本信息</span>
          <hr class="fl" />
        </div>
        <div class="besicContent">
          <div class="headerImg">
            <div class="addDiv" v-if="this.$route.query.saveAdd">
              <input
                type="file"
                accept="image/*"
                title="点击上传头像"
                @change="uploadFile($event)"
              />
              <img :src="defaultUrl" alt="" />
            </div>
            <div class="compile" v-else>
              <input
                type="file"
                accept="image/*"
                title="点击上传头像"
                @change="uploadFile($event)"
              />
              <img :src="defaultUrl" alt="" />
            </div>
          </div>
          <div class="rightList" :style="{ marginLeft: marginleft + 'px' }">
            <div>
              <span><font>编号</font><font>：</font></span>
              <input
                type="text"
                :value="itemList.userId"
                ref="userId"
                placeholder="请输入编号"
              />
            </div>
            <div class="nickName">
              <span><font>昵称</font><font>：</font></span>
              <input
                type="text"
                :value="itemList.userName"
                ref="userName"
                placeholder="必须填"
              />
            </div>
            <div class="name">
              <span><font>姓名</font><font>：</font></span>
              <input
                type="text"
                :value="itemList.actualName"
                ref="actualName"
                placeholder="必须填"
              />
            </div>
            <div>
              <span><font>密码</font><font>：</font></span>
              <input
                type="text"
                :value="itemList.userPassword"
                ref="userPassword"
                placeholder="必须填"
              />
            </div>
            <div>
              <span><font>邮箱</font><font>：</font></span>
              <input
                type="text"
                :value="itemList.mailbox"
                ref="mailbox"
                placeholder="必须填"
              />
            </div>
            <div class="phone">
              <span>手机号码：</span>
              <input
                type="text"
                :value="itemList.phoneNumber"
                ref="phoneNumber"
                placeholder="必须填"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 内容  -->
      <div class="content">
        <div class="besicHeader clearfix">
          <span class="fl">内容描述</span>
          <hr class="fl" />
        </div>
        <div class="v-Content">
          <div class="v-Content-list">
            <div>
              <span>用户级别<i class="mustIcon">*</i></span>
              <!-- itemList.userLever -->
              <select class="userLever" @change="changeUserLever($event)">
                <option
                  v-for="(item, index) in accountLevel"
                  :key="index"
                  :selected="item.selected"
                  :value="item.value"
                >
                  {{ item.text }}
                </option>
              </select>
            </div>
            <div>
              <span>公司<i class="mustIcon">*</i></span>
              <select class="company_id" :disabled="companyDisabled">
                <option value="99">请选择</option>
                <option
                  v-for="(item, index) in allCompanyList"
                  :key="index"
                  :selected="item.selected"
                  :value="item.companyId"
                >
                  {{ item.companyName }}
                </option>
              </select>
            </div>
            <div>
              <span>账户余额</span>
              <input
                type="text"
                disabled
                :value="itemList.balance"
                ref="balance"
                placeholder="账户余额"
              />
            </div>
            <div>
              <span>信用度</span>
              <input
                type="text"
                disabled
                :value="itemList.creditScore"
                ref="creditScore"
                placeholder="信用度"
              />
            </div>
            <div>
              <span>创建时间</span>
              <input
                type="text"
                disabled
                :value="itemList.userCreatTime"
                ref="userCreatTime"
                placeholder="创建时间"
              />
            </div>
            <div>
              <span>推荐人</span>
              <input
                type="text"
                disabled
                :value="itemList.recommended"
                ref="recommended"
                placeholder="推荐人"
              />
            </div>
            <div>
              <span>推荐次数</span>
              <input
                type="text"
                disabled
                :value="itemList.recommendedTimes"
                ref="recommendedTimes"
                placeholder="推荐次数"
              />
            </div>
          </div>
          <div class="v-Content-list">
            <div>
              <span>账号状态<i class="mustIcon">*</i></span>
              <select class="userStatus">
                <option
                  v-for="(item, index) in accountStatus"
                  :key="index"
                  :selected="item.selected"
                  :value="item.value"
                >
                  {{ item.text }}
                </option>
              </select>
            </div>
            <div>
              <span>部门ID<i class="mustIcon">*</i></span>
              <!-- <input
                    type="text"
                    disabled
                    :value="itemList.department_id"
                    ref="department_id"
                    placeholder="必须填"
                  /> -->
              <select :disabled="deparmentDisabled">
                <option ref="department_id" value="0">请选择</option>
              </select>
            </div>
            <div>
              <span>积分</span>
              <input
                type="text"
                disabled
                :value="itemList.integral"
                ref="integral"
                placeholder="积分"
              />
            </div>
            <div>
              <span>登录IP地址</span>
              <input
                type="text"
                disabled
                :value="itemList.loginIP"
                ref="loginIP"
                placeholder="登录IP地址"
              />
            </div>
            <div>
              <span>更改时间</span>
              <input
                type="text"
                disabled
                :value="itemList.modifyTime"
                ref="modifyTime"
                placeholder="更改时间"
              />
            </div>
            <div>
              <span>推荐链接</span>
              <input
                type="text"
                ref="recommendedLinks"
                disabled
                placeholder="推荐链接"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- btn -->
      <div class="btn">
        <el-button icon="el-icon-back" @click="GoBack()">返回</el-button>
        <el-button icon="el-icon-folder-checked" @click="save()"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import "../../../assets/less/accountAccept/personalEditor/personalEditor.less";
import uploadFiles from "../../../assets/js/uploadFile";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
var firstRouter = false;
export default {
  data() {
    return {
      //   marginleft
      marginleft: "",
      //   传过来的item
      itemList: {},
      //   传过来的所有公司Name
      allCompanyList: [],
      //   账号级别 select
      accountLevel: [
        { value: 5, text: "个人账号", selected: true },
        { value: 0, text: "系统管理员账号", selected: false },
        { value: 1, text: "内部公司主账号", selected: false },
        { value: 2, text: "内部公司员工账号", selected: false },
        { value: 3, text: "外部公司主账号", selected: false },
        { value: 4, text: "外部公司员工账号", selected: false },
      ],
      // 账号状态
      accountStatus: [
        { text: "正常", value: 0, selected: false },
        { text: "欠费", value: 1, selected: false },
        { text: "停用", value: 2, selected: false },
      ],
      // 创建时间value
      creatTime: "",
      // 修改时间
      changeTime: "",
      //   传过来的状态值
      saveAdd: "",
      //   个人或者公司的状态值
      companyDisabled: true,
      //   部门的状态值
      deparmentDisabled: true,
      //   默认头像
      defaultUrl:
        "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg",
      //  头像
      file: "",
    };
  },
  //   判断页面是否刷新
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    firstRouter = false;
    if (from.path == "/") {
      
      firstRouter = true;
      
    }
    next();
  },
  created() {
    this.saveAdd = this.$route.query.saveAdd;
    
    
    this.itemList = JSON.parse(this.$route.query.item);
    if (!this.$route.query.saveAdd) {
      this.defaultUrl = this.itemList.avatar;
    }
    
    

    // 页面的marginleft
    
    if (this.WstateStatus) {
      this.marginleft = -202;
    } else {
      this.marginleft = -240;
    }
  },
  computed: {
    ...homeState(["WstateStatus"]),
  },
  methods: {
    ...homeActions(["setWstateStatus"]),
    listenLeft() {
      if (this.WstateStatus) {
        this.marginleft = -202;
      } else {
        this.marginleft = -240;
      }
    },
    // 初始页面
    applayPage() {
      // itemList.userLever 账号级别
      for (let i = 0; i < this.accountLevel.length; i++) {
        this.accountLevel[i].selected = false;
        if (this.accountLevel[i].value == this.itemList.userLever) {
          this.accountLevel[i].selected = true;
        }
      }
      // company_id 公司
      this.allCompanyList.forEach((e) => {
        if (e.companyId == this.itemList.company_id) {
          e.selected = true;
        }
      });
      // userStatus 账号状态
      this.accountStatus.forEach((e) => {
        if (e.value == this.itemList.userStatus) {
          e.selected = true;
        }
      });

      //   companyDisabled deparmentDisabled
      if (this.itemList.userLever != "5") {
        this.companyDisabled = false;
        this.deparmentDisabled = false;
      }
    },
    // 用户级别 change 事件
    changeUserLever(e) {
      
      for (let i = 0; i < e.target.children.length; i++) {
        if (e.target.children[i].selected) {
          if (e.target.children[i].value == "5") {
            this.companyDisabled = true;
            this.deparmentDisabled = true;
            this.allCompanyList = [];
          } else {
            this.companyDisabled = false;
            this.deparmentDisabled = false;
            this.allCompanyList = JSON.parse(this.$route.query.allCompanyList);
          }
        }
      }
    },
    // 上传图片
    // 导入
    uploadFile(e) {
      
      this.file = e.target.files[0];
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", this.file);
      //   formData.append("file", this.file2);

      this.$axios(uploadFiles.uploadFile(formData))
        .then((result) => {
          
          
          if (result.data.Code == 200) {
            this.defaultUrl = result.data.imgsURL;
            this.$message({
              message: result.data.msg,
              center: true,
              type: "success",
              duration: 800,
            });
          }
        })
        .catch((err) => {
          
        });
    },
    // 返回
    GoBack() {
      const loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 400);
      setTimeout(() => {
        this.$router.push({
          name: "AccountAccept",
          query: { firstRouter: firstRouter },
        });
      }, 500);
    },
    // 保存  修改 false 或者 添加 true
    save() {
      if (this.saveAdd) {
        // 提示
        if (this.$refs.userId.value == "") {
          this.$message({
            message: "用户编号不能为空",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        } else if (this.$refs.userName.value == "") {
          this.$message({
            message: "用户昵称不能为空",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        } else if (this.$refs.actualName.value == "") {
          this.$message({
            message: "用户姓名不能为空",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        } else if (this.$refs.userPassword.value == "") {
          this.$message({
            message: "用户密码不能为空",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        } else if (this.$refs.mailbox.value == "") {
          this.$message({
            message: "用户邮箱不能为空",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        } else if (this.$refs.phoneNumber.value == "") {
          this.$message({
            message: "用户手机号码不能为空",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }

        let refsList = {
          //   userCreatTime: this.$refs.userCreatTime.value,
          //   modifyTime: this.$refs.modifyTime.value,
          userName: this.$refs.userName.value,
          actualName: this.$refs.actualName.value,
          userPassword: this.$refs.userPassword.value,
          mailbox: this.$refs.mailbox.value,
          phoneNumber: this.$refs.phoneNumber.value,
          recommendedTimes: this.$refs.recommendedTimes.value,
          recommended: this.$refs.recommended.value,
          balance: this.$refs.balance.value,
          loginIP: this.$refs.loginIP.value,
          recommendedLinks: this.$refs.recommendedLinks.value,
          userLever: 0,
          company_Id: 0,
          Company_name: "",
          department_name: "",
          userStatus: 0,
          integral: Number(this.$refs.integral.value),
          department_id: Number(this.$refs.department_id.value),
          creditScore: Number(this.$refs.creditScore.value),
          avatar: this.defaultUrl,
        };

        //   用户级别
        let userLeverList = document.querySelector(".userLever").children;
        for (let i = 0; i < userLeverList.length; i++) {
          if (userLeverList[i].selected) {
            
            
            refsList.userLever = Number(userLeverList[i].value);
          }
        }

        //   公司
        let companyIdList = document.querySelector(".company_id").children;
        for (let i = 0; i < companyIdList.length; i++) {
          if (companyIdList[i].selected) {
            
            
            refsList.Company_id = Number(companyIdList[i].value);
            refsList.Company_name = companyIdList[i].innerHTML;
          }
        }

        //   账号状态
        let userStatusIdList = document.querySelector(".userStatus").children;
        for (let i = 0; i < userStatusIdList.length; i++) {
          if (userStatusIdList[i].selected) {
            
            refsList.userStatus = Number(userStatusIdList[i].value);
          }
        }

        

        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sugoiERP/increaseUserTableInfo",
          method: "POST",
          params: refsList,
        })
          .then((result) => {
            setTimeout(() => {
              loading.close();
            }, 500);
            if (result.data.ResultMsg == "success") {
              setTimeout(() => {
                let flag = confirm("是否返回上一个页面?");
                if (flag) {
                  this.$router.push({
                    name: "AccountAccept",
                    query: { firstRouter: true },
                  });
                }
              }, 400);
              this.$notify({
                title: "请求成功",
                message: result.data.message,
                type: "success",
                offset: 50,
              });
            } else {
              this.$notify({
                title: "请求失败",
                message: result.data.message,
                type: "warning",
                offset: 50,
              });
            }
            
          })
          .catch((err) => {
            setTimeout(() => {
              loading.close();
            }, 500);
            this.$notify({
              title: "请求错误",
              message: "系统业务繁忙，请稍后再试！",
              type: "error",
              offset: 50,
            });
            
          });
      } else {
        // 提示
        if (this.$refs.userId.value == "") {
          this.$message({
            message: "用户编号不能为空",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        } else if (this.$refs.userName.value == "") {
          this.$message({
            message: "用户昵称不能为空",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        } else if (this.$refs.actualName.value == "") {
          this.$message({
            message: "用户姓名不能为空",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        } else if (this.$refs.userPassword.value == "") {
          this.$message({
            message: "用户密码不能为空",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        } else if (this.$refs.mailbox.value == "") {
          this.$message({
            message: "用户邮箱不能为空",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        } else if (this.$refs.phoneNumber.value == "") {
          this.$message({
            message: "用户手机号码不能为空",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }

        let refsList = {
          //   userCreatTime: this.$refs.userCreatTime.value,
          //   modifyTime: this.$refs.modifyTime.value,
          userId: this.$refs.userId.value,
          userName: this.$refs.userName.value,
          actualName: this.$refs.actualName.value,
          userPassword: this.$refs.userPassword.value,
          mailbox: this.$refs.mailbox.value,
          phoneNumber: this.$refs.phoneNumber.value,
          recommendedTimes: this.$refs.recommendedTimes.value,
          recommended: this.$refs.recommended.value,
          balance: this.$refs.balance.value,
          loginIP: this.$refs.loginIP.value,
          recommendedLinks: this.$refs.recommendedLinks.value,
          userLever: 0,
          company_Id: 0,
          Company_name: "",
          department_name: "",
          userStatus: 0,
          integral: Number(this.$refs.integral.value),
          department_id: Number(this.$refs.department_id.value),
          creditScore: Number(this.$refs.creditScore.value),
          avatar: this.defaultUrl,
        };
        //   用户级别
        let userLeverList = document.querySelector(".userLever").children;
        for (let i = 0; i < userLeverList.length; i++) {
          if (userLeverList[i].selected) {
            
            
            refsList.userLever = Number(userLeverList[i].value);
          }
        }

        //   公司
        let companyIdList = document.querySelector(".company_id").children;
        for (let i = 0; i < companyIdList.length; i++) {
          if (companyIdList[i].selected) {
            
            
            refsList.Company_id = Number(companyIdList[i].value);
            refsList.Company_name = companyIdList[i].innerHTML;
          }
        }

        //   账号状态
        let userStatusIdList = document.querySelector(".userStatus").children;
        for (let i = 0; i < userStatusIdList.length; i++) {
          if (userStatusIdList[i].selected) {
            
            refsList.userStatus = Number(userStatusIdList[i].value);
          }
        }

        

        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sugoiERP/modifyUserTableInfo",
          method: "POST",
          params: refsList,
        })
          .then((result) => {
            loading.close();
            
            if (result.data.ResultMsg == "success") {
              setTimeout(() => {
                let flag = confirm("是否返回上一个页面?");
                if (flag) {
                  this.$router.push({
                    name: "AccountAccept",
                    query: { firstRouter: true },
                  });
                }
              }, 400);
              this.$notify({
                title: "请求成功",
                message: result.data.message,
                type: "success",
                offset: 50,
              });
            } else {
              this.$notify({
                title: "请求失败",
                message: result.data.message,
                type: "warning",
                offset: 50,
              });
            }
          })
          .catch((err) => {
            setTimeout(() => {
              loading.close();
            }, 500);
            this.$notify({
              title: "请求错误",
              message: "系统业务繁忙，请稍后再试！",
              type: "error",
              offset: 50,
            });
            
          });
      }
    },
  },
  watch: {
    WstateStatus: "listenLeft",
  },
};
</script>

<style>
</style>