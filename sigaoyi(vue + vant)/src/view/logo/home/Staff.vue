<template>
  <div class="staff" ref="staff">
    <van-nav-bar
      title="员工管理"
      left-text="返回"
      right-text="管理"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="sreach">
      <van-search
        v-model="sreachVal"
        placeholder="员工名字"
        @search="onSearch"
      />
    </div>
    <div class="list">
      <div
        class="v-list"
        v-for="(item, index) in staffList"
        :key="index"
        :style="{ marginLeft: Mleft + '%' }"
      >
        <div class="set">
          <van-checkbox v-model="item.checked" shape="square"></van-checkbox>
        </div>
        <div class="img" @click.stop="clickStaff(item, index)">
          <img src="../../../assets/img/defaultImg.jpg" alt="" />
        </div>
        <div class="detail" @click.stop="clickStaff(item, index)">
          <div>
            <span>{{ item.name }}</span>
            <span>{{ item.grade }}&nbsp;&nbsp;{{ item.phoneName }}</span>
          </div>
          <div class="icon">
            <van-icon name="arrow" size="14px" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer" :style="{ bottom: footerB + 'px' }">
      <div
        v-for="(item, index) in btnList"
        :key="index"
        :style="{
          background: item.isActive ? item.activeBgColor : item.bgColor,
        }"
        @touchstart="startDiv(item)"
        @touchend="endDiv(item)"
        @click="clickDiv(item, index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
import "../../../assets/less/staff/staff.css";
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      //   v-detils marginLeft
      Mleft: "-10",
      MleftStatus: true,
      //   搜索Val
      sreachVal: "",
      // 员工列表
      staffList: [
        {
          imgSrc: "",
          name: "厂长",
          grade: "一级店长",
          phoneName: "15678960225",
          checked: false,
        },
        {
          imgSrc: "",
          name: "工长",
          grade: "二级店长",
          phoneName: "17896542365",
          checked: false,
        },
        {
          imgSrc: "",
          name: "莉莉",
          grade: "三级店长",
          phoneName: "15687941613",
          checked: false,
        },
        {
          imgSrc: "",
          name: "哗哗",
          grade: "员工",
          phoneName: "15451941613",
          checked: false,
        },
        {
          imgSrc: "",
          name: "小明",
          grade: "员工",
          phoneName: "17541669116",
          checked: false,
        },
        {
          imgSrc: "",
          name: "小王1",
          grade: "员工",
          phoneName: "14679352181",
          checked: false,
        },
        {
          imgSrc: "",
          name: "小王2",
          grade: "员工",
          phoneName: "14679352181",
          checked: false,
        },
        {
          imgSrc: "",
          name: "小王3",
          grade: "员工",
          phoneName: "14679352181",
          checked: false,
        },
        {
          imgSrc: "",
          name: "小王4",
          grade: "员工",
          phoneName: "14679352181",
          checked: false,
        },
        {
          imgSrc: "",
          name: "小王5",
          grade: "员工",
          phoneName: "14679352181",
          checked: false,
        },
        {
          imgSrc: "",
          name: "小王6",
          grade: "员工",
          phoneName: "14679352181",
          checked: false,
        },
        {
          imgSrc: "",
          name: "小王7",
          grade: "员工",
          phoneName: "14679352181",
          checked: false,
        },
        {
          imgSrc: "",
          name: "小王8",
          grade: "员工",
          phoneName: "14679352181",
          checked: false,
        },
        {
          imgSrc: "",
          name: "小王9",
          grade: "员工",
          phoneName: "14679352181",
          checked: false,
        },
        {
          imgSrc: "",
          name: "小王10",
          grade: "员工",
          phoneName: "14679352181",
          checked: false,
        },
        {
          imgSrc: "",
          name: "小王11",
          grade: "员工",
          phoneName: "14679352181",
          checked: false,
        },
      ],
      // 底部弹出的内容
      btnList: [
        {
          name: "全选",
          bgColor: "#71b3f7",
          isActive: false,
          activeBgColor: "#67a4e2",
        },
        {
          name: "催收",
          bgColor: "#5dadfd",
          isActive: false,
          activeBgColor: "#4d95de",
        },
        {
          name: "添加",
          bgColor: "#4ca4fb",
          isActive: false,
          activeBgColor: "#4596e6",
        },
        {
          name: "删除",
          bgColor: "#409eff",
          isActive: false,
          activeBgColor: "#388de4",
        },
      ],
      //  footerB
      footerB: "-42",
      // 全选状态值
      allStatus: true,
    };
  },
  created() {
    this.$nextTick(() => {
      this.H = document.documentElement.clientHeight;
      this.$refs.staff.style.minHeight = this.H - 92 + "px";
    });
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 点击管理
    onClickRight() {
      if (this.MleftStatus) {
        this.footerB = "0";
        this.Mleft = "0";
        this.MleftStatus = false;
      } else {
        this.Mleft = "-10";
        this.footerB = "-42";
        this.MleftStatus = true;
      }
    },
    // 搜索
    onSearch() {
      console.log("this.sreachVal ==>", this.sreachVal);
    },
    // 点击员工列表
    clickStaff(item, index) {
        this.$router.push({name:"StaffDetails",query:{item:JSON.stringify(item),flag:true}})
    },
    // footer 按下事件
    startDiv(item) {
      item.isActive = true;
    },
    // footer 放开事件
    endDiv(item) {
      item.isActive = false;
    },
    // footer 点击事件
    clickDiv(item, index) {
      if (item.name == "全选") {
        if (this.allStatus) {
          this.staffList.forEach((e) => {
            e.checked = true;
          });
          this.allStatus = false;
        } else {
          this.staffList.forEach((e) => {
            e.checked = false;
          });
          this.allStatus = true;
        }
      }else if(item.name == "添加"){
          this.$router.push({name:"AddStaff"})
      }
    },
  },
};
</script>