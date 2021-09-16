<template>
  <div class="imclient">
      <Echarts3></Echarts3>
  </div>
</template>

<script>
import Echarts3 from "@/components/Echarts3.vue";
export default {
    data() {
        return {
            property: 'value',
        };
    },
    components:{
        Echarts3
    }
}
</script>

<style>
    .imclient{
        overflow: hidden;
    }
</style>