<template>
  <div className="picture-editor-component">
    <iframe
      id="editor-Iframe"
      src="https://www.alifanyi.com/erp/imageTrans.html"
      frameBorder="no"
      scrolling="no"
    />
  </div>
</template>

<script>
export default {
  name: "PictureEditor",
  props: {
    data: {
      type: Object,
      required: true,
    },
    onChange: {
      type: Function,
      required: false,
    },
    onCompleted: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.postMessage();
    window.addEventListener("message", this.receiveMessage, true);
  },
  methods: {
    receiveMessage(event) {
      if (event.data && !event.data.type) {
        const postData = JSON.parse(event.data);
        const { type, data } = postData;
        switch (type) {
          case "base64":
            this.onCompleted(data);
            break;
          case "psd":
            this.onChange(data);
            break;
          case "autoHeight":
            const iframe = document.getElementById("editor-Iframe");
            iframe.style.height = data.editorHeight + "px";
            break;
          default:
            break;
        }
      }
    },
    postMessage() {
      const iFrame = document.getElementById("editor-Iframe");
      const { sourceLang, targetLang, templateJson } = this.data;
      if (iFrame) {
        iFrame.onload = function () {
          const data = {
            sourceLang,
            targetLang,
            templateJson,
          };
          iFrame.contentWindow.postMessage(JSON.stringify(data), "*");
        };
      }
    },
  },
};
</script>
<style lang="less" scoped>
.picture-editor-component {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
}
iframe {
  border-bottom: 1px solid #ebebeb;
  width: 100%;
  height: 720px !important;
}
</style>