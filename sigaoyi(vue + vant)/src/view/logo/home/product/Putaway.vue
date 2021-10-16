<template>
  <div class="putaway">
    <van-nav-bar
      title="上架编辑"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <div class="putawayList">
      <div class="list" v-for="(item, index) in list" :key="index">
        <div class="title">{{ item.title }}</div>
        <div class="content1" v-if="item.isActive">
          <van-cell
            is-link
            :title="item.cellTitle"
            @click="item.cellVal = true"
          />
          <div v-if="!item.isSolt">
            <van-action-sheet
              v-model="item.cellVal"
              :actions="item.cellArr"
              cancel-text="取消"
              close-on-click-action
              @select="onSelect($event.name,item)"
            />
          </div>
          <div v-else>
            <van-action-sheet v-model="item.cellVal">
              <div class="content">
                <van-picker
                  @confirm="onConfirm($event,item,index)"
                  @cancel="onCancel(item)"
                  :columns="item.cellArr"
                  :title="item.cellTitle"
                  show-toolbar
                />
              </div>
            </van-action-sheet>
          </div>
        </div>
        <div class="content" v-else>
          <input type="text" :placeholder="item.placeholder" />
        </div>
        <div class="icon" v-show="!item.isActive">
          <van-icon name="arrow" size="15px" color="#969799" />
        </div>
      </div>
      <div class="remark">
        <!-- <div class="text">备注</div> -->
        <textarea placeholder="请填写简介" cols="26" rows="7"></textarea>
      </div>
      <div class="loadImg">
          <div class="imgList">
              <img src="../../../../assets/img/defaultImg.jpg" alt="">
          </div>
          <div class="imgList">
              <img src="../../../../assets/img/defaultImg.jpg" alt="">
          </div>
          <div class="imgList">
              <img src="../../../../assets/img/defaultImg.jpg" alt="">
          </div>
          <div class="imgList">
              <img src="../../../../assets/img/defaultImg.jpg" alt="">
          </div>
          <div class="imgList">
              <img src="../../../../assets/img/defaultImg.jpg" alt="">
          </div>
          <div class="add">
              <van-icon name="plus" color="#ddd" size="62px" />
          </div>
      </div>
      <div class="btn">
          <van-button type="info">上架</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../../assets/less/product/putaway/putaway.css";
export default {
  data() {
    return {
      // 标签列表
      list: [
        {
          title: "商品大类",
          isActive: true,
          isSolt:true,
          cellTitle: "请选择大类",
          cellArr: ["大类1","大类2","大类3","大类4","大类5","大类6","大类7","大类8"],
          cellVal: false,
        },
        {
          title: "商品中类",
          isActive: true,
          isSolt:true,
          cellTitle: "请选择中类",
          cellArr: ["中类1","中类2","中类3","中类4","中类5","中类6","中类7","中类8"],
          cellVal: false,
        },
        {
          title: "商品小类",
          isActive: true,
          isSolt:true,
          cellTitle: "请选择小类",
          cellArr: ["小类1","小类2","小类3","小类4","小类5","小类6","小类7","小类8"],
          cellVal: false,
        },
        { title: "商品标题", isActive: false, placeholder: "请输入商品标题",isSolt:false, },
        { title: "商品价格", isActive: false, placeholder: "请输入商品价格",isSolt:false, },
        {
          title: "商品类型",
          isActive: true,
          isSolt:false,
          cellTitle: "请选择",
          cellArr: [{ name: "普质" }, { name: "精品" }, { name: "原创" }],
          cellVal: false,
        },
        {
          title: "商品属性",
          isActive: true,
          isSolt:false,
          cellTitle: "请选择",
          cellArr: [{ name: "带电" }, { name: "粉末" }, { name: "液体" }],
          cellVal: false,
        },
        { title: "商品尺寸", isActive: false, placeholder: "请输入商品尺寸",isSolt:false, },
        { title: "商品重量", isActive: false, placeholder: "请输入商品重量",isSolt:false, },
        { title: "商品库存", isActive: false, placeholder: "请输入商品库存",isSolt:false, },
      ],
      // 赋值
    };
  },
  created() {},
  methods: {
    // 返回
    onClickLeft() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.go(-1);
      }, 600);
    },
    // 弹出层的改变事件
    onSelect(value,item) {
        item.cellVal = false;
        item.cellTitle = value;
        // console.log("value ==>",value)
    },
    // 弹出层确定按钮
    onConfirm(value,item,index){
        item.cellVal = false;
        item.cellTitle = value;
        console.log("value ==>",value)
        console.log("item ==>",item)
        console.log("index ==>",index)
    },
    // 取消按钮
    onCancel(item,index){
        item.cellVal = false;
    },
  },
};
</script>