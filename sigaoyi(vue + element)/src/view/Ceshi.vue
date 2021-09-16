<template>
  <div class="wangeditor"></div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      property: "value",
    };
  },
  computed: {
    
  },
  mounted() {
    const E = window.wangEditor;
    const editor = new E("#div1");
    // 或者 const editor = new E( document.getElementById('div1') )
    editor.create();
  },
};
</script>

<style>
</style>