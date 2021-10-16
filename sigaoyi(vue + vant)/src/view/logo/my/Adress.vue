<template>
  <div class="adress" ref="adress">
    <div class="title">
      <van-nav-bar
        title="收货地址"
        left-text="返回"
        right-text="设为默认"
        left-arrow
        @click-left="onClickLeft"
         @click-right="onClickRight"
      />
    </div>
    <div class="list">
      <van-address-list
        v-if="list.length > 0"
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="toLinkExit"
        @edit="onEdit"
      />
      <van-empty description="暂无地址" v-else>
        <van-button
          round
          type="danger"
          class="bottom-button"
          @click="toLinkExit()"
          >添加地址</van-button
        >
      </van-empty>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 屏幕高度
      H: "",
      // 默认地址 index
      chosenAddressId: "1",
      copyList: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          //   address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          areaCode: "330106",
          province: "浙江省",
          city: "杭州市",
          county: "西湖区",
          addressDetail: "文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
          postalCode: "546312",
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          //   address: "浙江省杭州市拱墅区莫干山路 50 号",
          areaCode: "330106",
          province: "浙江省",
          city: "杭州市",
          county: "拱墅区",
          addressDetail: "莫干山路 50 号",
          isDefault: false,
          postalCode: "546312",
        },
      ],
      list: [],
    };
  },
  created() {
    this.$nextTick(() => {
      this.H = document.documentElement.clientHeight;
      this.$refs.adress.style.minHeight = this.H + "px";
      this.initData();
    });
  },
  methods: {
    // 处理list
    initData() {
      this.copyList.forEach((e) => {
        e["address"] = e.province + e.city + e.county + e.addressDetail;
      });
      this.list = JSON.parse(JSON.stringify(this.copyList))
      console.log("this.list ==>", this.list);
    },
    //   返回
    onClickLeft() {
      this.$router.back();
    },
    // 设置为默认地址
    onClickRight(){
        console.log("this.chosenAddressId ==>",this.chosenAddressId)
        this.list.forEach((e,i) => {
            e.isDefault = false;
            if(i == (Number(this.chosenAddressId) - 1)){
                e.isDefault = true;
            }
        });
        console.log("this.list ==>",this.list)
    },
    // 去编辑地址
    toLinkExit() {
      this.$router.push({ name: "AddressEdit", query: { flag: false } });
    },
    // 点击编辑
    onEdit(item, index) {
      console.log("item ==>", item);
      this.$router.push({
        name: "AddressEdit",
        query: { item: JSON.stringify(item), flag: true },
      });
    },
  },
};
</script>
<style lang="less">
.adress {
  background: #f4f4f4;
  .list {
    .van-address-list {
      .van-radio-group {
        .van-address-item {
          .van-radio__icon--checked .van-icon {
            background-color: #409eff;
            border-color: #409eff;
          }
          .van-tag--danger {
            background-color: #409eff;
          }
        }
      }

      .van-address-list__bottom {
        background: #f4f4f4;
        bottom: 15px;

        button {
          background: #409eff;
          border: 1px solid #409eff;
        }
      }
    }
    .van-empty {
      padding: 0 10px;
      .van-empty__bottom {
        position: fixed;
        bottom: 15px;
        left: 0;
        z-index: 999;
        box-sizing: border-box;
        width: 100%;
        padding: 0 16px;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
        .bottom-button {
          width: 100%;
          background: #409eff;
          border: 1px solid #409eff;
        }
      }
    }
  }
}
</style>