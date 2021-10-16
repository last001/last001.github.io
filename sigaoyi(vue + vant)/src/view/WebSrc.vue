<template>
  <div class="webSrc">
      <iframe id="ifr" :src="iframeSrc" width='100%' height='1000' frameborder='0'></iframe>
  </div>
</template>

<script>
export default {
    data() {
        return {
            iframeSrc:"",
        };
    },
    created () {
        this.iframeSrc = "http://ow365.cn/?i=23884&furl=" + this.$route.query.iframeSrc;
    }
}
</script>

<style>

</style>