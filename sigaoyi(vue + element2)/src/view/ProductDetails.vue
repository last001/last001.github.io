<template>
  <div class="ProductDetails">
    <!-- <div class="main" v-title data-title="产品详情"></div> -->
    <sideNavbar1 ref="sideNavbar1" @Wstate="getWstate"></sideNavbar1>
    <!-- <titleNavbar ref="titlePage" :getParent="flag"></titleNavbar> -->
    <div
      class="details"
      :style="{
        width: W,
        marginLeft: leftName + 'px',
      }"
    >
      <titleNavbar
        ref="titlePage"
        :style="{
          width: W,
          marginLeft: leftName + 'px',
        }"
      ></titleNavbar>
      <div class="v_details">
        <!-- 基本信息 -->
        <div class="default_info">
          <div class="tips">基本信息</div>
          <div class="list">
            <span class="text">产品标题：</span>
            <input
              type="text"
              v-model="item.title"
              placeholder="请输入产品标题"
            />
          </div>
          <div class="list">
            <span class="text">产品价格：</span>
            <input
              type="text"
              v-model="item.price"
              placeholder="请输入产品价格"
            />
          </div>
          <div class="list">
            <span class="text">产品运费：</span>
            <input
              type="text"
              v-model="item.express_fee"
              placeholder="请输入产品运费"
            />
          </div>
          <div class="list">
            <span class="text">产品原链接：</span>
            <input
              type="text"
              v-model="item.detail_url"
              placeholder="请输入产品的原链接"
            />
          </div>
          <div class="list">
            <span class="text">关键词：</span>
            <input
              type="text"
              placeholder="请输入关键词，关键词不超10个，多个以英文逗号隔开"
              v-model="item.nick"
            />
          </div>
          <div class="classify">
            <span class="text">分类：</span>
            <div class="set">
              <el-select
                v-model="largeIndex"
                clearable
                @change="changeSet(largeIndex, 'large')"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in largeList"
                  :key="item.value"
                  :label="item.catalogName"
                  :value="item.catalogId"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="mediumIndex"
                @change="changeSet(mediumIndex, 'medium')"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in mediumList"
                  :key="item.value"
                  :label="item.catalogName"
                  :value="item.catalogId"
                >
                </el-option>
              </el-select>
              <el-select v-model="smallIndex" clearable placeholder="请选择">
                <el-option
                  v-for="item in smallList"
                  :key="item.value"
                  :label="item.catalogName"
                  :value="item.catalogId"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="list remarks">
            <span class="text">产品简介：</span>
            <textarea
              v-model="item.summary"
              cols="30"
              rows="10"
              placeholder="请输入产品详情介绍"
            ></textarea>
          </div>
        </div>
        <!-- 图片详情 -->
        <div class="img_details">
          <div class="tips">图片详情</div>
          <div class="pic_url">
            <span class="text">产品图片：</span>
            <div>
              <img :src="item.pic_url" alt="" v-if="item.pic_url != ''" />
              <i class="el-icon-plus" v-else></i>
              <input
                type="file"
                accept="image/*"
                ref="uploadVal"
                @change="upImg($event, 'one')"
              />
            </div>
          </div>
          <div class="item_imgs">
            <span class="text">多图片：</span>
            <div class="item_imgs_list">
              <div class="list" v-for="(item, index) in samllImg" :key="index">
                <el-image
                  :src="item"
                  :preview-src-list="samllImg"
                  title="点击放大预览"
                  alt="加载失败"
                >
                </el-image>
                <i
                  class="el-icon-close"
                  @click.stop="deleteZtuImg(item, index)"
                ></i>
              </div>
              <!-- 添加图片 -->
              <div class="addImg">
                <i class="el-icon-plus"></i>
                <input
                  type="file"
                  accept="image/*"
                  ref="uploadVal"
                  @change="upImg($event, 'more')"
                />
              </div>
            </div>
          </div>
          <div class="img_details_btn">
            <span class="text">操作：</span>
            <el-button
              type="primary"
              icon="el-icon-download"
              @click="downImg('product')"
              >下载图片</el-button
            >
          </div>
        </div>
        <!-- 产品属性 -->
        <div class="product_attribute">
          <div class="tips">产品属性</div>
          <div class="table">
            <span class="text">规格列表：</span>
            <div class="v-table">
              <el-table
                :data="tableData"
                v-loading="tableLoading"
                style="width: 100%"
              >
                <el-table-column prop="type" label="类型">
                  <template slot-scope="scope">
                    <div class="remask">
                      <input
                        type="text"
                        v-model="scope.row.type"
                        placeholder="请输入"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="名称">
                  <template slot-scope="scope">
                    <div class="remask">
                      <input
                        type="text"
                        v-model="scope.row.name"
                        placeholder="请输入"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="英文">
                  <template slot-scope="scope">
                    <div class="remask">
                      <input
                        type="text"
                        v-model="scope.row.name_en"
                        placeholder="请输入"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="日文">
                  <template slot-scope="scope">
                    <div class="remask">
                      <input
                        type="text"
                        v-model="scope.row.name_jp"
                        placeholder="请输入"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="库存">
                  <template slot-scope="scope">
                    <div class="remask">
                      <input
                        type="text"
                        v-model="scope.row.stock"
                        placeholder="请输入"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="加价">
                  <template slot-scope="scope">
                    <div class="remask">
                      <input
                        type="text"
                        v-model="scope.row.markup"
                        placeholder="请输入"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="图片">
                  <template slot-scope="scope">
                    <div class="img-clear">
                      <img
                        :src="scope.row.imgurl"
                        width="40"
                        height="40"
                        @click="tableImg(scope.$index, scope.row)"
                      />
                      <span
                        class="clear"
                        @click="deleteTableIMG(scope.$index, scope.row)"
                        v-show="
                          scope.row.imgurl !=
                          'http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg'
                        "
                        >×</span
                      >
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button
                    >
                    <el-button
                      type="primary"
                      size="mini"
                      @click="handleSave(scope.$index, scope.row)"
                      >保存</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="addList">
            <span class="text">列表操作：</span>
            <el-button
              type="text"
              icon="el-icon-download"
              @click="downImg('xls')"
              >下载图片</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-add-location"
              @click="addTable()"
              >添加</el-button
            >
          </div>
        </div>
        <!-- 详情模板 -->
        <div class="detailBox">
          <div class="tips">详情模板</div>
          <div class="btn">
            <span class="text">操作：</span>
            <div class="btnList">
              <el-button type="text" @click="template1()">模板1</el-button>
              <el-button type="text">模板2</el-button>
              <el-button type="text">模板3</el-button>
              <el-button
                type="primary"
                class="downBtn"
                icon="el-icon-download"
                @click="downImg('quill')"
                >下载图片</el-button
              >
              <div>
                <el-button type="primary" class="downBtn" icon="el-icon-upload2"
                  >上传图片</el-button
                >
                <input
                  type="file"
                  class="file"
                  ref="quillUpdata"
                  title="点击上传图片"
                  multiple
                  accept="image/*"
                  @change="updataQullImg($event)"
                />
              </div>
            </div>
          </div>
          <div class="quillEditor" v-loading="quillLoading">
            <span class="text">模板：</span>
            <quill-editor
              v-model="item.details"
              ref="quillEditor"
              :options="editorOption"
              @change="onEditorChange($event)"
              :disabled="quillDisabled"
            >
              <div class="ql-container ql-snow">
                <div class="ql-editor">
                  <div v-html="text0">{{ text0 }}</div>
                </div>
              </div>
            </quill-editor>
          </div>
        </div>
        <!-- <footer></footer> -->
        <div class="footer">
          ©{{
            years
          }}&nbsp;&nbsp;&nbsp;广州思高易网络科技有限公司&nbsp;&nbsp;&nbsp;粤ICP备19040870号
        </div>
        <!-- 全局按钮 -->
        <div class="allBtn" :style="{ width: W, marginLeft: leftName + 'px' }">
          <el-button
            type="primary"
            icon="el-icon-folder-checked"
            @click="saveQuillEditorValue()"
            >保存</el-button
          >
          <el-button
            type="primary"
            @click="publishStatus = true"
            icon="el-icon-s-promotion"
            >刊登</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-brush"
            @click="clickTranslate()"
            >图片翻译</el-button
          >
        </div>
      </div>
    </div>
    <!-- top bottom -->
    <div class="clickToTop" :style="{ opacity: opacity }" @click="toTop()">
      <i class="el-icon-caret-top"></i>
    </div>
    <div
      class="clickToButtom clickToTop"
      :style="{ opacity: opacity }"
      @click="toBottom()"
    >
      <i class="el-icon-caret-bottom"></i>
    </div>
    <!-- 变体添加弹出层 -->
    <el-dialog
      title="添加变体"
      :visible.sync="detailChangeStatus"
      width="34%"
      custom-class="detailChange"
    >
      <div class="content">
        <div>
          <span>类型：</span>
          <input
            type="text"
            placeholder="请输入类型"
            v-model="AddTableList.type"
          />
        </div>
        <div>
          <span>名称：</span>
          <input
            type="text"
            placeholder="请输入名称"
            v-model="AddTableList.name"
          />
        </div>
        <div>
          <span>英文：</span>
          <input
            type="text"
            placeholder="请输入英文"
            v-model="AddTableList.name_en"
          />
        </div>
        <div>
          <span>中文：</span>
          <input
            type="text"
            placeholder="请输入中文"
            v-model="AddTableList.name_jp"
          />
        </div>
        <div>
          <span>库存：</span>
          <input
            type="text"
            placeholder="请输入库存"
            v-model="AddTableList.stock"
          />
        </div>
        <div>
          <span>加价：</span>
          <input
            type="text"
            placeholder="请输入加价"
            v-model="AddTableList.markup"
          />
        </div>
        <div>
          <span>图片：</span>
          <div>
            <input
              type="file"
              title="点击上传图片"
              accept="image/*"
              @change="uploadImg($event)"
              ref="uploadSrc"
              multiple
            /><img :src="AddTableList.imgurl" alt="" />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addAuthor()">确 定</el-button>
        <el-button @click="detailChangeStatus = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 翻译弹出层 -->
    <div class="translate-dialog">
      <el-dialog
        title="图片翻译(收费，翻译一张图片收费0.1元)"
        :visible.sync="translateStatus"
        @close="closeTranslate()"
        width="50%"
      >
        <div class="content">
          <!-- 主图 -->
          <div class="main" v-show="mianList.length > 0">
            <el-divider content-position="left">主图</el-divider>
            <div class="img">
              <div
                v-for="(item, index) in mianList"
                :key="index"
                @click="selectImg(item, index)"
              >
                <img :src="item.imgSrc" alt="加载失败" />
                <el-checkbox
                  v-model="item.checked"
                  @change="selectImg(item, index)"
                ></el-checkbox>
              </div>
            </div>
          </div>
          <!-- 变体图 -->
          <div class="table" v-show="tableData.length > 0">
            <el-divider content-position="left">变体图</el-divider>
            <div class="img">
              <div
                v-for="(item, index) in tableData"
                :key="index"
                @click="selectImg(item, index)"
              >
                <img :src="item.imgurl" alt="加载失败" />
                <el-checkbox
                  v-model="item.checked"
                  @change="selectImg(item, index)"
                ></el-checkbox>
              </div>
            </div>
          </div>
          <!-- 详情图 -->
          <div class="details" v-show="detailsList.length > 0">
            <el-divider content-position="left">详情图</el-divider>
            <div class="img">
              <div
                v-for="(item, index) in detailsList"
                :key="index"
                @click="selectImg(item, index)"
              >
                <img :src="item.src" alt="加载失败" />
                <el-checkbox
                  v-model="item.checked"
                  @change="selectImg(item, index)"
                ></el-checkbox>
              </div>
            </div>
          </div>
        </div>
        <!-- 翻译层按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="translateBtn()"
            >翻 译</el-button
          >
          <el-button size="small" @click="translateStatus = false"
            >关 闭</el-button
          >
        </span>
      </el-dialog>
    </div>
    <!-- 图片翻译Dome -->
    <div class="translateDome">
      <el-dialog
        title="图片翻译"
        :visible.sync="translateDome"
        custom-class="v-translateDome"
        width="80%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <div class="cotnent">
          <PictureEditor ref="pic" :data="data" :onCompleted="onCompleted" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="translateDomeClose()"
            >关 闭</el-button
          >
        </span>
      </el-dialog>
    </div>
    <!-- 点击表格 图片弹出层 -->
    <div class="table-dialog">
      <el-dialog title="选择图片" :visible.sync="tableImgStatus" width="50%">
        <div class="content">
          <div class="imgList">
            <div v-for="(item, index) in AllImgList" :key="index">
              <img
                :src="item.imgSrc"
                alt="加载失败"
                @click="tableSelectImg(item, index)"
              />
              <el-checkbox
                v-model="item.checked"
                @change="tableSelectImg(item, index)"
              ></el-checkbox>
            </div>
            <div class="el-icon-plus">
              <input
                type="file"
                ref="fileText"
                multiple
                accept="image/*"
                @change="updataImg($event)"
              />
            </div>
          </div>
        </div>
        <!-- 翻译层按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="clickConfirmImg()"
            >确 定</el-button
          >
          <el-button size="small" @click="tableImgStatus = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
    </div>
    <!-- 刊登 -->
    <div class="derive">
      <el-dialog title="刊登产品" :visible.sync="publishStatus" width="33%">
        <div class="deriveInfo">
          <div>
            <span class="text">选择店铺：</span>
            <el-select
              v-model="qoo10shopsIndex"
              @change="changeSet(qoo10shopsIndex, 'qoo10shops')"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in qoo10shopsList"
                :key="item.value"
                :label="item.shopuser"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">分类编号：</span>
            <input type="text" v-model="publishList.SecondSubCat" />
          </div>
          <div>
            <span class="text">运费编号：</span>
            <el-select
              v-model="freightIndex"
              @change="changeSet(freightIndex, 'freight')"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in freightList"
                :key="item.value"
                :label="item.ShippingName"
                :value="item.ShippingNo"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">价格公式：</span>
            <input type="text" v-model="publishList.priceCount" />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="publish()">刊 登</el-button>
          <el-button @click="publishStatus = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import "../assets/less/productDetails/productDetails.less";
import titleNavbar from "@/components/titleNavbar.vue";
import sideNavbar from "@/components/sideNavbar.vue";
import sideNavbar1 from "@/components/sideNavbar1.vue";
import PictureEditor from "@/components/PictureEditor.vue";
// import { quillEditor } from "vue-quill-editor";
import qureyStrs from "../assets/js/qureyStr";
import qs from "qs";
import uploadFiles from "../assets/js/uploadFile";
import uploadPdfs from "../assets/js/uploadPdf";
// 打包图片下载
import JSZip from "jszip";
import FileSaver from "file-saver";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  name: "HelloWolrd",
  data() {
    return {
      // sideNavbar 的状态
      chilrenVal: "",
      //   left 值
      leftName: 220,
      // 侧边栏的宽度
      W: "calc(100% - 220px)",
      // 传给子元素的状态值
      flag: "",
      opacity: 0,
      tableData: [],
      tableLoading: false,
      //   点击图片弹出层 状态值
      tableImgStatus: false,
      //  点击图片 index
      tableList: "",
      tableRow: {},
      // 添加变体
      AddTableList: {},
      //   弹出层List
      AllImgList: [],
      search: "",
      //   富文本
      //   quillEidtorValue: "<div class='myQuill'>my quill page</div>",
      editorOption: {
        placeholder: "开始编辑吧",
        modules: {
          clipboard: {
            matchVisual: false,
          },
          toolbar: true,
          //开启拖拽
          imageDrop: true,
          // 调整图片大小
          //   imageResize: {
          //     displayStyles: {
          //       backgroundColor: "black",
          //       border: "none",
          //       color: "white",
          //     },
          //   },
        },
      },
      quillDisabled: true,
      quillLoading: false,
      // 小图片 index*50
      samllImg: [],
      //   年份
      years: "",
      //   传过来的item
      item: {},
      //   点击表格修改 的row
      row: {},
      //   点击表格修改的状态值
      detailChangeStatus: false,
      // 大类 中类 小类
      largeIndex: "",
      largeList: [],
      mediumIndex: "",
      mediumList: [],
      smallIndex: "",
      smallList: [],
      text0: "",
      // 下载图片的arr
      arrImages: [],
      // 图片翻译
      // 图片翻译Dome状态
      translateDome: false,
      // 传入语向及psd图层信息
      data: {
        targetLang: "en", //图片翻译目标语种
        sourceLang: "zh", //图片翻译原语种
        //图片编辑器图层数据，使用上面的pictureEditor字段数据
        templateJson: [],
      },
      // 图片翻译弹出层状态值
      translateStatus: false,
      // 图片翻译弹出层 详情图 数组
      detailsList: [],
      //   图片翻译弹出层 主图 数组
      mianList: [],
      // 刊登
      publishStatus: false,
      // 店铺
      qoo10shopsIndex: 0,
      qoo10shopsList: [],
      // 运费编号
      freightIndex: 0,
      freightList: [{ ShippingName: "全部", ShippingNo: 0 }],
      // 刊登List
      publishList: {
        priceCount: "(price*2+55)*1.2/0.058",
        CertificationKey: "",
        SecondSubCat: 0,
        ShippingNo: "",
      },
      //
      imgUrl: "",
      biantiimgs: "",
      xiangqingtuimgs: "",
    };
  },
  components: {
    PictureEditor,
    titleNavbar,
    sideNavbar,
    sideNavbar1,
  },
  //   判断页面是否刷新
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    let d = new Date();
    this.years = d.getFullYear();
    // 店铺
    this.qoo10shopsList = JSON.parse(this.$route.query.shopData);
    let qoo10shopsObj = {
      shopuser: "全部",
      id: 0,
    };
    this.qoo10shopsList.unshift(qoo10shopsObj);
    this.getTable();
  },
  activated() {},
  computed: {
    editor() {
      return this.$refs.quillEditor.quill;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollTop, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollTop, true);
  },
  computed: {
    ...homeState(["InfoData", "WstateStatus", "shopData"]),
  },
  methods: {
    // 子组件向父组件 传过来的状态值
    getWstate(v) {
      this.chilrenVal = v;
    },
    // 监听 侧边栏的状态
    Wchange() {
      //   传给子元素的值
      this.flag = this.chilrenVal;
      if (this.chilrenVal) {
        this.leftName = 220;
        this.W = "calc(100% - 220px)";
        this.setWstateStatus(true);
      } else {
        this.leftName = 50;
        this.W = "calc(100% - 50px)";
        this.setWstateStatus(false);
      }
    },
    //   初始化数据
    creatData() {
      this.$refs.titlePage.getInfoData();
      // 小图片 imgSrc
      if (this.item.item_imgs == "") {
        return (this.samllImg = []);
      }
      this.samllImg = this.item.item_imgs.split(",");
    },
    //   table 删除 按钮
    handleDelete(index, row) {
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/delectVariants",
        method: "POST",
        params: {
          id: row.id,
        },
      })
        .then((result) => {
          setTimeout(() => {
            this.tableLoading = false;
          }, 500);
          if (result.data.Code == "200") {
            this.tableData.splice(index, 1);
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.tableLoading = false;
          }, 500);
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    //   table 保存 按钮
    handleSave(index, row) {
      console.log("row.imgurl ==>", row.imgurl);
      this.tableLoading = true;
      let data = {
        product_id: this.item.id,
        id: `${row.id}`,
        mark: row.mark,
        type: row.type,
        name: row.name,
        imgurl: row.imgurl,
        name_en: row.name_en,
        name_jp: row.name_jp,
        stock: Number(row.stock),
        markup: row.markup,
      };
      if (
        data.imgurl ==
        "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg"
      ) {
        data.imgurl = "";
      }

      this.$axios({
        url: "/sigaoyi/NEWaddarants",
        method: "POST",
        params: data,
      })
        .then((result) => {
          this.tableLoading = false;

          if (result.data.Code == "200") {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.tableLoading = false;

          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // table 添加 按钮
    addTable() {
      this.AddTableList = {
        type: "",
        name: "",
        name_en: "",
        name_jp: "",
        stock: "",
        markup: "",
        imgurl:
          "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg",
      };
      this.detailChangeStatus = true;
    },
    // table 点击图片
    tableImg(index, row) {
      this.AllImgList = [];
      // 主图
      let mianList = this.item.item_imgs.split(",");
      for (let i = 0; i < mianList.length; i++) {
        let obj1 = {
          imgSrc: "",
          checked: false,
        };
        obj1.imgSrc = mianList[i];
        this.AllImgList.push(obj1);
      }
      // 表格图
      this.tableData.forEach((e) => {
        //   没有图片
        if (
          e.imgurl ==
          "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg"
        ) {
          return;
        }
        let objXLS = {
          imgSrc: "",
          checked: false,
        };
        objXLS.imgSrc = e.imgurl;
        this.AllImgList.push(objXLS);
      });
      // 详情图
      let imgList = document.querySelectorAll(".quillEditor img");

      for (let i = 0; i < imgList.length; i++) {
        let obj = {
          imgSrc: "",
          checked: false,
        };
        obj.imgSrc = imgList[i].src;
        this.AllImgList.push(obj);
      }
      this.tableImgStatus = true;
      this.tableList = index;
      this.tableRow = row;
    },
    // table 删除图片
    deleteTableIMG(index, row) {
      row.imgurl =
        "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
    },
    // 选中图片
    tableSelectImg(item, index) {
      this.AllImgList.forEach((e) => {
        e.checked = false;
      });
      item.checked = true;
    },
    // table 点击图片 弹出层 上传图片按钮
    updataImg(e) {
      let files = e.target.files[0];

      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      //   formData.append("file", this.);
      formData.append("productcode", this.item.id);
      let loading = this.$loading({
        lock: false,
        text: "上传中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let url = "/sigaoyi/variantsImgupload";
      this.$axios(uploadPdfs.uploadPdf(url, formData))
        .then((result) => {
          loading.close();
          this.$refs.fileText.value = null;
          if (result.data.Code == 200) {
            // 后来添加的
            let objAdd = {
              imgSrc: "",
              checked: false,
            };
            objAdd.imgSrc = result.data.path;
            this.AllImgList.push(objAdd);

            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          loading.close();
          this.$refs.fileText.value = null;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请示后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // table 点击图片 弹出层 确定 按钮
    clickConfirmImg() {
      let imgSrc = "";
      this.AllImgList.forEach((e) => {
        if (e.checked) {
          imgSrc = e.imgSrc;
        }
      });
      this.tableData[this.tableList].imgurl = imgSrc;
      this.tableImgStatus = false;
    },
    // table 点击图片上传图片
    uploadImg(e) {
      let files = e.target.files[0];

      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      //   formData.append("file", this.);
      formData.append("productcode", this.item.id);
      let loading = this.$loading({
        lock: false,
        text: "上传中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let url = "/sigaoyi/variantsImgupload";
      this.$axios(uploadPdfs.uploadPdf(url, formData))
        .then((result) => {
          console.log(result);
          loading.close();
          this.$refs.uploadSrc.value = null;
          if (result.data.Code == "200") {
            this.AddTableList.imgurl = result.data.path;
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          loading.close();
          this.$refs.uploadSrc.value = null;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请示后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 点击确定添加
    addAuthor() {
      this.tableLoading = true;
      this.detailChangeStatus = false;
      let data = {
        product_id: this.item.id,
        id: 0,
        type: this.AddTableList.type,
        name: this.AddTableList.name,
        imgurl: this.AddTableList.imgurl,
        name_en: this.AddTableList.name_en,
        name_jp: this.AddTableList.name_jp,
        stock: this.AddTableList.stock,
        mark: "",
        markup: Number(this.AddTableList.markup),
      };
      this.$axios({
        url: "/sigaoyi/NEWaddarants",
        method: "POST",
        params: data,
      })
        .then((result) => {
          this.tableLoading = false;
          if (result.data.Code == "200") {
            this.tableData.push(result.data.variants);
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    onEditorReady(editor) {}, // 准备编辑器
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus(val, editor) {}, // 获得焦点事件
    onEditorChange({ quill, html, text }) {
      this.item.details = html;
    }, // 内容改变事件
    // 保存 0000
    saveQuillEditorValue() {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      let data = {
        id: this.item.id,
        sortid: this.smallIndex,
        status: this.item.status,
        title: this.item.title,
        nick: this.item.nick,
        price: this.item.price,
        express_fee: this.item.express_fee,
        summary: this.item.summary,
        elm1: this.item.details,
        imglist: "",
        language: this.$route.query.language,
      };
      // 分类
      if (data.sortid == "") {
        data.sortid = 0;
      }
      // 处理price 单位
      data.price = data.price.replace(/[^\d.]/g, "");
      // 主图图片

      this.samllImg.unshift(this.item.pic_url);
      this.samllImg.forEach((e) => {
        data.imglist += e + ",";
      });
      data.imglist = data.imglist.substring(0, data.imglist.length - 1);
      // 提示
      if (data.title == "") {
        this.$message({
          message: "请输入标题",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      if (data.price == "") {
        this.$message({
          message: "请输入价格",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      console.log("data ==>", data);
      // 初始值问题
      let data1 = qs.stringify(data);
      //   laoding
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      // 请求
      this.$axios({
        url: "/sigaoyi/updateproduct",
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        data: data1,
      })
        .then((result) => {
          console.log("result ==>", result);

          setTimeout(() => {
            loading.close();
          }, 500);

          if (result.data.code == 200) {
            // this.$notify({
            //   title: "请求成功",
            //   message: result.data.msg,
            //   type: "success",
            //   offset: 50,
            // });
            location.reload();
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          console.log("err ==>", err);

          loading.close();

          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 返回
    Exit() {
      window.close();
    },
    //头部 上传图片
    upImg(e, string) {
      let files = e.target.files[0];

      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      let url = "/sigaoyi/NEWaddzhutu";
      //   formData.append("file", this.file2);
      let loading = this.$loading({
        lock: false,
        text: "上传中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios(uploadPdfs.uploadPdf(url, formData))
        .then((result) => {
          loading.close();
          console.log("result ==>", result);
          this.$refs.uploadVal.value = null;
          if (result.data.Code == "200") {
            if (string == "more") {
              this.samllImg.push(result.data.imglist);
            } else {
              this.item.pic_url = result.data.imglist;
            }
            this.$message({
              message: "上传图片成功!",
              center: true,
              type: "success",
              duration: 800,
            });
          } else {
            this.$message({
              message: "上传图片失败!",
              center: true,
              type: "warning",
              duration: 800,
            });
          }
        })
        .catch((err) => {
          this.$refs.uploadVal.value = null;
          loading.close();

          this.$message({
            message: "系统繁忙,请稍后再试!",
            center: true,
            type: "warning",
            duration: 800,
          });
        });
    },
    // 头部 多图删除图片
    deleteZtuImg(item, index) {
      this.samllImg.splice(index, 1);
    },
    // 点击下载图片
    downImg(val) {
      this.arrImages = [];
      if (val == "product") {
        for (let i = 0; i < this.samllImg.length; i++) {
          let objImg = {
            fileUrl: "",
            renameFileName: "",
          };
          objImg.fileUrl = this.samllImg[i];
          let name = this.samllImg[i].split(".")[
            this.samllImg[i].split(".").length - 1
          ];
          let count = i + 1 >= 10 ? i + 1 : "0" + (i + 1);
          objImg.renameFileName = `${this.item.id}_${count}.${name}`;

          this.arrImages.push(objImg);
        }
        if (this.arrImages.length <= 0) {
          this.$message({
            message: "暂无下载图片!",
            center: true,
            duration: 800,
            type: "warning",
          });
          return;
        }

        this.filesToRar(this.arrImages, "产品图片");
      } else if (val == "xls") {
        let copyTableData = JSON.parse(JSON.stringify(this.tableData));
        for (let i = copyTableData.length - 1; i >= 0; i--) {
          if (
            copyTableData[i].imgurl ==
            "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg"
          ) {
            copyTableData.splice(i, 1);
          }
        }
        if (copyTableData.length <= 0) {
          this.$message({
            message: "暂无下载图片!",
            center: true,
            duration: 800,
            type: "warning",
          });
          return;
        }
        copyTableData.forEach((e, index) => {
          let objImg = {
            fileUrl: "",
            renameFileName: "",
          };
          objImg.fileUrl = e.imgurl;
          let count = index + 1 >= 10 ? index + 1 : "0" + (index + 1);
          let name = e.imgurl.split(".")[e.imgurl.split(".").length - 1];

          objImg.renameFileName = `${e.id}_${count}.${name}`;
          this.arrImages.push(objImg);
        });

        this.filesToRar(this.arrImages, "变体图片");
      } else if (val == "quill") {
        let editor = document
          .querySelector(".ql-editor")
          .getElementsByTagName("img");

        for (let i = 0; i < editor.length; i++) {
          let objImg = {
            fileUrl: "",
            renameFileName: "",
          };

          objImg.fileUrl = editor[i].src;
          let count = i + 1 >= 10 ? i + 1 : "0" + (i + 1);
          let name = editor[i].src.split(".")[
            editor[i].src.split(".").length - 1
          ];
          objImg.renameFileName = `quill_${count}.${name}`;
          //   objImg.renameFileName = `为什么.${name}`;

          this.arrImages.push(objImg);
        }

        if (this.arrImages.length == 0) {
          this.$message({
            message: "暂无图片下载!",
            center: true,
            type: "warning",
            duration: 800,
          });
          return;
        }
        this.filesToRar(this.arrImages, "详情图片");
      }
    },
    /**文件打包
     * arrImages:文件list:[{fileUrl:文件url,renameFileName:文件名}]
     * filename 压缩包名
     * */
    filesToRar(arrImages, filename) {
      let _this = this;
      let zip = new JSZip();
      let cache = {};
      let promises = [];
      _this.title = "正在加载压缩文件";

      for (let item of arrImages) {
        const promise = _this.getImgArrayBuffer(item.fileUrl).then((data) => {
          // 下载文件, 并存成ArrayBuffer对象(blob)

          zip.file(item.renameFileName, data, { binary: true }); // 逐个添加文件
          cache[item.renameFileName] = data;
        });
        promises.push(promise);
      }
      Promise.all(promises)
        .then(() => {
          zip.generateAsync({ type: "blob" }).then((content) => {
            _this.title = "正在压缩";
            // 生成二进制流
            FileSaver.saveAs(content, filename); // 利用file-saver保存文件  自定义文件名
            _this.title = "压缩完成";
          });
        })
        .catch((res) => {
          _this.$message.error("文件压缩失败");
        });
    },
    //获取文件blob
    getImgArrayBuffer(url) {
      let _this = this;
      return new Promise((resolve, reject) => {
        //通过请求获取文件blob格式
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.responseType = "blob";
        xmlhttp.onload = function () {
          if (this.status == 200) {
            resolve(this.response);
          } else {
            reject(this.status);
          }
        };
        xmlhttp.send();
      });
    },
    // 富文本上传图片
    updataQullImg(e) {
      let files = e.target.files[0];
      let formData = new FormData();
      // 向 formData 对象中添加文件
      if (e.target.files.length > 1) {
        for (let i = 0; i < e.target.files.length; i++) {
          // 向 formData 对象中添加文件
          formData.append("file", e.target.files[i]);
        }
      } else {
        this.file = e.target.files[0];
        // 向 formData 对象中添加文件
        formData.append("file", this.file);
      }
      this.quillLoading = true;

      this.$axios({
        url: "/sigaoyi/addxiangqingtu",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((result) => {
          this.quillLoading = false;

          this.$refs.quillUpdata.value = null;
          if (result.data.Code == "200") {
            result.data.imglist.forEach((e) => {
              this.item.details += e;
            });
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.quillLoading = false;
          this.$refs.quillUpdata.value = null;

          this.$notify({
            title: "请求失败",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 点击图标window.scroll = 0
    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      let timer = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 400;
        if (top <= 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    // window.scroll 事件
    scrollTop(e) {
      let top = document.documentElement.scrollTop || document.body.scrollTop;

      top > 50 ? (this.opacity = 1) : (this.opacity = 0);
    },
    // 点击图标window.scroll = docuemnt.body.clientHeight
    toBottom() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      let timer = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top += 400;
        if (top >= document.body.clientHeight) {
          clearInterval(timer);
        }
      }, 20);
    },
    // 拿到产品table
    getTable() {
      if (this.$route.query.userID == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        return;
      }
      //   if (this.InfoData.id == undefined) {
      //     alert("登陆时间过期,请重新登陆!");
      //     sessionStorage.removeItem("token");
      //     this.$router.push({ name: "Login" });
      //     return;
      //   }
      // 发请求
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/NEWgetProduct",
        method: "POST",
        params: {
          userId: this.$route.query.userID,
          id: this.$route.query.id,
          language: this.$route.query.language,
        },
      })
        .then((result) => {
          loading.close();
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            document.title = result.data.product.title;
            //   个人信息
            this.setInfoData(result.data.userinfo);
            // 向子组件传值
            this.flag = true;

            //   表格
            if (result.data.variants.length > 0) {
              for (let i = 0; i < result.data.variants.length; i++) {
                if (result.data.variants[i].imgurl == "") {
                  result.data.variants[i].imgurl =
                    "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
                }
                result.data.variants[i]["checked"] = false;
                result.data.variants[i]["address"] = "";
                result.data.variants[i]["addPrice"] = "";
              }
              this.tableData = result.data.variants;
            } else {
              this.tableData = result.data.variants;
            }
            //  分类
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
            };
            result.data.catalogs.unshift(classObj);
            this.largeList = result.data.catalogs;
            // 初始渲染 分类 set
            if (
              result.data.catalog0 != undefined ||
              result.data.catalog1 != undefined ||
              result.data.catalog2 != undefined
            ) {
              this.mediumIndex = result.data.catalog1.catalogId;
              this.smallIndex = result.data.catalog2.catalogId;
              setTimeout(() => {
                this.largeIndex = result.data.catalog0.catalogId;
                this.changeSet(this.largeIndex, "large");
              }, 200);
              // 分类编号 赋值
              this.publishList.SecondSubCat = result.data.catalog2.catalogId;
            } else {
              this.mediumList.push(classObj);
              this.smallList.push(classObj);
            }
            result.data.product.price = result.data.product.price.toFixed(2);
            // express_fee
            if (result.data.product.express_fee == "") {
              result.data.product.express_fee = 0;
            }
            // 钱符号
            if (result.data.product.currencytype == 0) {
              result.data.product.price = result.data.product.price + " ¥";
            } else if (result.data.product.currencytype == 1) {
              result.data.product.price = result.data.product.price + " $";
            } else {
              result.data.product.price = result.data.product.price + " 円";
            }

            this.item = result.data.product;
            this.quillDisabled = false;
            this.creatData();
            // 富文本 重渲染
            this.$nextTick(() => {
              let detailsVal = document.querySelector(".ql-editor").innerHTML;
              result.data.product.details = detailsVal
                .replace(/&lt;/g, "<")
                .replace(/&lt;/g, ">");
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
          loading.close();
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 分类 changeSet
    changeSet(index, string) {
      // 请求
      if (string == "large") {
        console.log("indexindexindexindex  ===>", index);
        if (index == 99) {
          this.mediumIndex = 99;
          this.smallIndex = 99;
          this.mediumList = [
            {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
            },
          ];
          this.smallList = [
            {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
            },
          ];
          return;
        }
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: index,
          },
        })
          .then((result) => {
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
            };

            result.data.catalogs.unshift(classObj);
            this.mediumList = result.data.catalogs;
            // catalog2
            this.changeSet(this.mediumIndex, "medium");
          })
          .catch((err) => {});
      } else if (string == "medium") {
        if (index == 99) {
          this.smallIndex = 99;
          this.smallList = [
            {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
            },
          ];
          return;
        }
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: index,
          },
        })
          .then((result) => {
            console.log(result);
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
            };
            this.smallList = result.data.catalogs;
            this.smallList.unshift(classObj);
          })
          .catch((err) => {});
      } else if (string == "qoo10shops") {
        if (this.qoo10shopsIndex == 0) {
          this.freightList = [{ ShippingName: "全部", ShippingNo: 0 }];
          return;
        }
        this.$axios({
          url: "/sigaoyi/searchShop",
          method: "POST",
          params: {
            id: this.qoo10shopsIndex,
          },
        })
          .then((result) => {
            console.log("result ==>", result);
            let freightObj = {
              ShippingName: "全部",
              ShippingNo: 0,
            };
            this.freightList = result.data.ShippingList;
            this.freightList.unshift(freightObj);
            this.publishList.CertificationKey = result.data.CertificationKey;
          })
          .catch((err) => {});
      } else if (string == "freight") {
        this.publishList.ShippingNo = this.freightIndex;
      }
    },
    // 点击模板一
    template1() {
      let data = {
        color: this.tableData[0].name,
        elm1: this.item.details,
      };
      if (data.color == undefined) {
        this.$message({
          message: "暂时没有该模板,请稍后再试。",
          center: true,
          type: "warning",
          duration: 800,
        });
        return;
      }
      data = qs.stringify(data);

      // 发请求
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/Conversiontemplate1",
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        data: data,
      })
        .then((result) => {
          loading.close();

          if (result.data.code == 200) {
            this.$message({
              message: "切换成功",
              center: true,
              duration: 800,
              type: "success",
            });
            this.item.details = result.data.elm;
          } else {
            this.$meesge({
              message: "系统业务繁忙,请稍后再试！",
              center: true,
              type: "warning",
              duration: 800,
            });
          }
        })
        .catch((err) => {
          loading.close();

          this.$message({
            message: "系统业务繁忙,请稍后再试！",
            center: true,
            type: "warning",
            duration: 800,
          });
        });
    },
    // 点击图片翻译按钮
    clickTranslate() {
      // 初始清空
      this.mianList = [];
      this.detailsList = [];
      // 主图
      let mianList = this.item.item_imgs.split(",");
      for (let i = 0; i < mianList.length; i++) {
        let obj1 = {
          imgSrc: "",
          checked: false,
        };
        obj1.imgSrc = mianList[i];
        this.mianList.push(obj1);
      }
      // 详情图
      let imgList = document.querySelectorAll(".quillEditor img");
      for (let i = 0; i < imgList.length; i++) {
        let obj = {
          src: "",
          checked: false,
        };
        obj.src = imgList[i].src;
        this.detailsList.push(obj);
      }
      // 弹出层状态
      this.translateStatus = true;
    },
    // 图片翻译弹出层选中图片
    selectImg(item, index) {
      item.checked = !item.checked;
    },
    // 关闭所有图片 转为false
    closeTranslate() {
      // mianList tableData detailsList
      this.mianList.forEach((e) => {
        e.checked = false;
      });
      this.tableData.forEach((e) => {
        e.checked = false;
      });
      this.detailsList.forEach((e) => {
        e.checked = false;
      });
    },
    // 图片翻译弹出层 翻译按钮
    translateBtn() {
      // translateStatus
      if (
        this.mianList.findIndex((target) => target.checked === true) == -1 &&
        this.tableData.findIndex((target) => target.checked === true) == -1 &&
        this.detailsList.findIndex((target) => target.checked === true) == -1
      ) {
        this.$message({
          message: "请勾选要翻译的图片",
          duration: 600,
          center: true,
          type: "warning",
        });
        return;
      }
      //   this.translateStatus = true;
      //   this.translateDome = true;

      // 为空
      this.imgUrl = "";
      this.biantiimgs = "";
      this.xiangqingtuimgs = "";
      // 主图
      this.mianList.forEach((e, i) => {
        if (e.checked) {
          this.imgUrl += e.imgSrc + ",";
        }
      });
      // 表格图
      this.tableData.forEach((e) => {
        if (e.checked) {
          this.biantiimgs += e.imgurl + ",";
        }
      });
      // 详情图
      this.detailsList.forEach((e, i) => {
        if (e.checked) {
          this.xiangqingtuimgs += e.src + ",";
        }
      });
      this.imgUrl = this.imgUrl.substring(0, this.imgUrl.length - 1);
      this.biantiimgs = this.biantiimgs.substring(
        0,
        this.biantiimgs.length - 1
      );
      this.xiangqingtuimgs = this.xiangqingtuimgs.substring(
        0,
        this.xiangqingtuimgs.length - 1
      );

      this.gettranslate();
    },
    // 翻译调接口
    gettranslate() {
      let money =
        (this.imgUrl.split(",").length +
          this.biantiimgs.split(",").length +
          this.xiangqingtuimgs.split(",").length) *
        0.1;
      if (this.imgUrl == "") {
        money -= 0.1;
      }
      if (this.biantiimgs == "") {
        money -= 0.1;
      }
      if (this.xiangqingtuimgs == "") {
        money -= 0.1;
      }
      money = money.toFixed(2);

      if (this.InfoData.balance < money) {
        let alertText = confirm("余额不足,是否前往充值");
        if (alertText) {
          this.$router.push({ name: "RechargeWidthdraw" });
        }
        return;
      }
      //   清空
      this.data.templateJson = [];
      this.translateStatus = false;
      let data = {
        USERID: this.InfoData.id,
        imgUrl: this.imgUrl,
        biantiimgs: this.biantiimgs,
        xiangqingtuimgs: this.xiangqingtuimgs,
      };
      //   发起请求
      let loading = this.$loading({
        lock: false,
        text: "翻译中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.$axios({
        url: "/sigaoyi/NEWPictureTranslation",
        method: "POST",
        params: data,
      })
        .then((result) => {
          loading.close();
          console.log("result ==>", result);
          if (result.data.code == "200") {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
              customClass: "translate",
            });
            this.InfoData.balance -= money;
            this.setInfoData(this.InfoData);
            this.translateStatus = true;
            this.translateDome = true;
            if (result.data.imgUrls.length > 0) {
              result.data.imgUrls.forEach((e) => {
                e["PictureEditor1"] = JSON.parse(e.PictureEditor);
                this.data.templateJson.push(e.PictureEditor1);
              });
            }
            if (result.data.biantiimgss.length > 0) {
              result.data.biantiimgss.forEach((e) => {
                e["PictureEditor1"] = JSON.parse(e.PictureEditor);
                this.data.templateJson.push(e.PictureEditor1);
              });
            }
            if (result.data.xiangqingtuimgss.length > 0) {
              result.data.xiangqingtuimgss.forEach((e, i) => {
                e["PictureEditor1"] = JSON.parse(e.PictureEditor);
                e["number"] = i;
                this.data.templateJson.push(e.PictureEditor1);
              });
            }
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
              customClass: "translate",
            });
            this.translateDome = false;
            this.translateStatus = false;
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
          loading.close();
          this.translateDome = false;
          this.translateStatus = false;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "warning",
            offset: 50,
            customClass: "translate",
          });
        });
    },
    // translateDomeClose
    translateDomeClose() {
      //   (this.data = {
      //     targetLang: "en",
      //     sourceLang: "zh",
      //     templateJson: [],
      //   }),
      //   this.imgUrl = "";
      //   this.biantiimgs = "";
      //   this.xiangqingtuimgs = "";
      //   this.detailsList.forEach(e => {
      //        e.checked = false;
      //   });
      //   this.mianList.forEach(e => {
      //       e.checked = false;
      //   });
      //   this.$refs.pic.receiveMessage(this.data);
      //   this.$refs.pic.postMessage();
      //   this.translateDome = false;
      location.reload();
    },
    // 完成编辑 || 一键机翻
    onCompleted(data) {
      // 处理base64转file
      for (let i = 0; i < data.length; i++) {
        data[i] = this.dataURLtoFile(data[i]);
      }

      // 添加原图
      for (let i = 0; i < data.length; i++) {
        data[i]["besaImg"] = this.data.templateJson[i].children[0].src;
      }

      //   发起请求
      let loading = this.$loading({
        lock: false,
        text: "翻译中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      var formData = new FormData();
      if (data.length > 1) {
        for (let i = 0; i < data.length; i++) {
          formData.append("file", data[i]);
          formData.append("text", data[i].besaImg);
        }
      } else {
        formData.append("file", data[0]);
        formData.append("text", data[0].besaImg);
      }

      let url = "/sigaoyi/NEWbase64ImageSave";
      this.$axios(uploadPdfs.uploadPdf(url, formData))
        .then((result) => {
          console.log("result ==>", result);
          loading.close();
          if (result.data.Code == 200) {
            result.data.list.forEach((e) => {
              // 主图
              for (let i = 0; i < this.samllImg.length; i++) {
                if (e.imgs0URL == this.samllImg[i]) {
                  this.samllImg[i] = e.imgs1URL;
                  if (i == 0) {
                    this.bgImgSrc = e.imgs1URL;
                  }
                }
              }
              // 变体图
              for (let i = 0; i < this.tableData.length; i++) {
                if (e.imgs0URL == this.tableData[i].imgurl) {
                  this.tableData[i].imgurl = e.imgs1URL;
                  this.handleSave(i, this.tableData[i]);
                }
              }
              // 详情图
              let imgList = document.querySelectorAll(".quillEditor img");
              for (let i = 0; i < imgList.length; i++) {
                if (e.imgs0URL == imgList[i].src) {
                  imgList[i].src = e.imgs1URL;
                }
              }
              if (this.item.details.indexOf(e.imgs0URL) > -1) {
                this.item.details = this.item.details.replace(
                  e.imgs0URL,
                  e.imgs1URL
                );
              }
            });
            this.translateDome = false;
            this.translateStatus = false;
            // this.data.templateJson = [];

            this.saveQuillEditorValue();
            location.reload();
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          loading.close();

          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // this.data.templateJson
    // base64 转图片
    dataURLtoFile(dataurl, filename = "file") {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime,
      });
    },
    // 刊登
    publish() {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      console.log("this.shopData ==>", this.shopData);
      // 提示
      if (this.qoo10shopsIndex == 0) {
        this.$message({
          message: "请先选择店铺",
          center: true,
          type: "warning",
          duration: 600,
        });
        return;
      }
      if (this.publishList.ShippingNo == 0) {
        this.$message({
          message: "请先选择运费编号",
          center: true,
          type: "warning",
          duration: 600,
        });
        return;
      }
      if (this.publishList.priceCount == "") {
        this.$message({
          message: "请先填写价格公示",
          center: true,
          type: "warning",
          duration: 600,
        });
        return;
      }
      let data = {
        pricefromula: this.publishList.priceCount,
        id: this.item.id,
        language: this.$route.query.language,
        shopid: this.qoo10shopsIndex,
        CertificationKey: this.publishList.CertificationKey,
        SecondSubCat: this.publishList.SecondSubCat,
        ShippingNo: this.publishList.ShippingNo,
      };

      this.publishStatus = false;
      // 发请求
      let loading = this.$loading({
        lock: false,
        text: "刊登中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      if (data.SecondSubCat == "全部") {
        this.$message({
          message: "请选择运费方式",
          durtion: 600,
          center: true,
          type: "error",
        });
        return;
      }
      this.$axios({
        url: "/sigaoyi/publishedProducts",
        method: "POST",
        params: data,
      })
        .then((result) => {
          loading.close();
          if (result.data.code == "200") {
            this.publishStatus = false;
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            setTimeout(() => {
              this.publishStatus = true;
            }, 500);
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.publishStatus = true;
          }, 500);

          loading.close();
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    ...homeActions(["setWstateStatus", "setInfoData"]),
  },
  watch: {
    chilrenVal: "Wchange",
  },
};
</script>