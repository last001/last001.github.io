export default {
  uploadFile: function (data) {
    let config = {
      //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
      url: "/sigaoyi/ImageOnlineURLUpload",
      //基础url前缀
      data:data,
      transformResponse: [
        function (data1) {
          var data = data1;
          if (typeof data1 == "string") {
            data = JSON.parse(data1);
          }
          //这里提前处理返回的数据;
          if (data.message && data.data === "login.invalid.token") {
            window.localStorage.removeItem("access-user");
            alert("超时请重新登陆");
            window.location.href = "/";
          }
          return data;
        },
      ],
      method:'POST',
      //请求头信息
      headers: {
        // "access-user": window.localStorage.getItem("access-user"),
        "Content-Type": "multipart/form-data",
      },

      //跨域请求时是否需要使用凭证
      withCredentials: true,
      // 返回数据类型
      responseType: "json", //default
    };
    return (data, config);
  }
}
