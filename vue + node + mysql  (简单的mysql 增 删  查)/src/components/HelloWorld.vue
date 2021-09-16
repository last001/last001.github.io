<template>
  <div class="hello">
    <form action="">
      姓名：<input type="text" name="username" v-model="userName" /><br />
      密码：<input type="text" name="password" v-model="passWord" /><br />
      年龄：<input type="text" name="age" v-model="age" /><br />
      性别：<input type="text" name="gender" v-model="gender" /><br />
      <button type="button" @click="addUser">注册用户</button>
      <button type="button" @click="addUser1">登陆用户</button>
      <button type="button" @click="changePassWord">修改密码</button>
    </form>
    <form action="">
      <input type="text" v-model="keywords" placeholder="输入姓名查询" />
      <button type="button" @click="selectUser">查询</button>
    </form>
    <form action="">
      <input type="text" v-model="deleteVal" />
      <button type="button" @click="ClickDelete">删除</button>
    </form>
    <form action="">
      <input type="file" @change="update($event)" name="" id="" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import qs from 'qs'
export default {
  name: "HelloWorld",
  data() {
    return {
      userName: "",
      passWord: "",
      age: "", // int
      gender: "",

      keywords: "",
      deleteVal: "",

      // 路径
      headerURL: "",
    };
  },
  methods: {
    //   注册
    addUser() {
    //   let data = qs.stringify({
    //     userName: this.userName,
    //     passWord: this.passWord,
    //     age: Number(this.age),
    //     gender: this.gender,
    //   });

       let data = {
        userName: this.userName,
        passWord: this.passWord,
        age: Number(this.age),
        gender: this.gender,
      }

      this.$axios({
        url: "/user/addUser",
        method: "POST",
        data,
      })
        .then((res) => {
          console.log("res ==>", res);
          if (res.data.code == 200) {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 登陆
    addUser1() {
      // login
      let data = {
        userName: this.userName,
        passWord: this.passWord,
      };
      this.$axios({
        url: "user/login",
        method: "GET",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 查询
    selectUser() {
      axios
        .post("user/selectUser", {
          userName: this.keywords,
        })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.code == 200) {
            alert(result.data.msg);
          } else {
            alert(result.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除
    ClickDelete() {
      axios
        .post("user/deleteUser", {
          userName: this.deleteVal,
        })
        .then((result) => {
          console.log("result  ==>", result);
          if (result.data.code == 200) {
            alert(result.data.msg);
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 修改
    changePassWord() {
      let data = {
        userName: this.userName,
        passWord: this.passWord,
      };
      this.$axios({
        url: "user/changePassWord",
        method: "POST",
        data,
      })
        .then((result) => {
          console.log("result ==>", result);
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // input change
    update(e) {
      let files = e.target.files[0];
     
      let formData = new FormData();
      formData.append("file",files);
      formData.append("userName",this.userName);
      console.log("000 ==>",formData.get('file'))
       this.$axios({
        url: "user/updataURL",
        method: "POST",
        headers:{'Content-Type': 'multipart/form-data'},
        data:formData,
      })
        .then((result) => {
          console.log("result ==>", result);
        })
        .catch((err) => {
          console.log("err ==>", err);
        });

    },
  },
};
</script>
<style scoped>
</style>
