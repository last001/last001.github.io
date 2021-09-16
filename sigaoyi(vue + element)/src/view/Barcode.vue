<template>
  <div class="barcode">
    <div class="barcode2">
      <div class="title">
        <div>10000006</div>
        <div><strong>1/1</strong></div>
      </div>
      <div class="code">
        <div class="header">SUGOI-YC-65B158BE06</div>
        <div class="v-code">
          <img id="barcode" />
        </div>
      </div>
      <div class="TO">
        <div><strong>TO:</strong>打的家电节大家啊</div>
        <div class="ercode">
          <div class="two">
            <div>
              俺的撒旦门上的纳税的mdm俺的撒旦门的mdm俺的撒旦门上的纳税的mdm
            </div>
            <div>462-0037</div>
          </div>
          <div class="v-ercode">
            <div class="qrcode" id="qrCode" ref="qrCode"></div>
          </div>
        </div>
        <div>
          <span>090-4217-1496</span>
          <span>country JAPAN</span>
        </div>
      </div>
      <div class="footer">
        <div class="ele">Electric pot*1;</div>
        <div class="data">2021-06-01</div>
      </div>
    </div>
    
  </div>
</template>

<script>
import "../assets/less/barcode/barcode.css";
import JsBarcode from "jsbarcode";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      barcode: "",
    };
  },
  created() {
    this.barcode = this.$route.query.barcode;
  },
  mounted() {
    JsBarcode("#barcode", this.barcode, {
      format: "CODE128",
      lineColor: "#000",
      background: "#fff",
      width: 2,
      height: 70,
      fontOptions: "italic",
      fontSize: 15, //设置文本的大小
      displayValue: true,
    });
     new QRCode(this.$refs["qrCode"], {
        text: this.barcode,
        width: 66,
        height: 66,
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel:QRCode.CorrectLevel.H,
      });
  },
  methods: {
      
  },
};
</script>

<style>
</style>