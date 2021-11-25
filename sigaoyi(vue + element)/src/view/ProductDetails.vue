<template>
  <div class="ProductDetails">
    <!-- <div class="main" v-title data-title="产品详情"></div> -->
    <titleNavbar ref="titlePage" :getParent="flag"></titleNavbar>
    <div class="details">
      <div class="v_details">
        <div class="title">
          <div>
            <input type="text" v-model="item.title" placeholder="标题" />
          </div>
        </div>
        <div class="d-dtail">
          <div class="img">
            <div
              class="v-img"
              @mouseover="overImg($event)"
              @mousemove="moveImg($event)"
              @mouseleave="leaveImg($event)"
              :style="{ backgroundImage: 'url(' + bgImgSrc + ')' }"
            >
              <div class="smallDiv" v-show="smallStatus"></div>
            </div>
            <div
              class="magnifyDiv"
              v-show="magnifyStatus"
              :style="{ backgroundImage: 'url(' + cybgImgSrc + ')' }"
              @mouseover="overImg($event)"
              @mouseleave="leaveImg($event)"
            ></div>
            <div class="list-img">
              <div
                class="v-left-icon"
                :class="count <= 0 ? 'active' : ''"
                @click="addBtnNum && leftMove()"
              >
                <i class="el-icon-caret-left"></i>
              </div>
              <div class="v-list-img">
                <div class="mask" ref="mask">
                  <div
                    class="imgDiv"
                    v-for="(item, index) in samllImg"
                    v-loading="item.loadingImg"
                    :key="index"
                    :style="{ left: item.imgLeft + 'px' }"
                    @mouseover="showLarge(item, index)"
                    :class="item.isActive ? 'active' : ''"
                  >
                    <img
                      :src="item.imgSrc"
                      @load="loadingImg(item, index)"
                      :onerror="errorImage"
                      alt="失败"
                    />
                    <i class="el-icon-close" @click.stop="deleteImg(index)"></i>
                  </div>
                </div>
              </div>
              <div class="addImg">
                <i class="el-icon-plus"></i>
                <input
                  type="file"
                  ref="uploadVal"
                  title="点击上传图片"
                  @change="upImg($event)"
                />
              </div>
              <div
                class="v-right-icon"
                :class="count + 6 > samllImg.length - 1 ? 'active' : ''"
                @click="addBtnFlag && rightMove()"
              >
                <i class="el-icon-caret-right"></i>
              </div>
            </div>
            <el-button
              type="primary"
              icon="el-icon-download"
              @click="downImg('product')"
              >下载图片</el-button
            >
          </div>
          <div class="text">
            <div class="price">
              <span>价格</span>
              <div>
                <input type="text" v-model="item.price" placeholder="必须填" />
              </div>
              <span>运费</span>
              <div class="yunfei">
                <input
                  type="text"
                  v-model="item.express_fee"
                  placeholder="必须填"
                />
              </div>
            </div>
            <div class="classify">
              <span>分类</span>
              <div>
                <select
                  v-model="largeIndex"
                  @change="changeSet(largeList, largeIndex, 'large')"
                >
                  <option
                    v-for="(item, index) in largeList"
                    :value="index"
                    :key="index"
                    :id="item.catalogId"
                  >
                    {{ item.catalogName }}
                  </option>
                </select>
              </div>
              <div>
                <select
                  v-model="mediumIndex"
                  @change="changeSet(mediumList, mediumIndex, 'medium')"
                >
                  <option
                    v-for="(item, index) in mediumList"
                    :value="index"
                    :key="index"
                    :id="item.catalogId"
                  >
                    {{ item.catalogName }}
                  </option>
                </select>
              </div>
              <div>
                <select
                  v-model="smallIndex"
                  @change="changeSet(smallList, smallIndex)"
                >
                  <option
                    v-for="(item, index) in smallList"
                    :value="index"
                    :key="index"
                    :id="item.catalogId"
                  >
                    {{ item.catalogName }}
                  </option>
                </select>
              </div>
              <!-- <div class="classs_number">
                编码：{{ largeList[largeIndex].catalogId }}，{{
                  mediumList[mediumIndex].catalogId
                }}，{{ smallList[smallIndex].catalogId }}
              </div> -->
            </div>
            <div class="type">
              <span>类型</span>
              <div>
                <el-radio v-model="radio" label="1">普质</el-radio>
                <el-radio v-model="radio" label="2">精品</el-radio>
                <el-radio v-model="radio" label="3">原创</el-radio>
              </div>
            </div>
            <div class="property">
              <span>属性</span>
              <div>
                <el-radio v-model="radio2" label="1">带电</el-radio>
                <el-radio v-model="radio2" label="2">粉末</el-radio>
                <el-radio v-model="radio2" label="3">液体</el-radio>
              </div>
            </div>
            <div class="size">
              <span>尺寸</span>
              <div class="v-size">
                <span>长</span><input type="text" value="0" /> <span>宽</span
                ><input type="text" value="0" /> <span>高</span
                ><input type="text" value="0" />
                <span>cm</span>
              </div>
            </div>
            <div class="weight">
              <span>重量</span>
              <div><input type="text" value="0" /><span>g</span></div>
            </div>
            <div class="orderStatus">
              <span>状态</span>
              <select>
                <option
                  :selected="item.selected"
                  :value="item.value"
                  v-for="(item, index) in orderStatusList"
                  :key="index"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="inventory">
              <span>库存</span>
              <div>
                <input type="text" value="1999" />
              </div>
            </div>
            <div class="link">
              <span>采集链接</span>
              <div>
                {{ item.detail_url }}
              </div>
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <div class="change">
          <div class="fr">
            <el-button
              type="primary"
              icon="el-icon-add-location"
              @click="addTable()"
              >添加</el-button
            >
            <el-button
              type="success"
              icon="el-icon-download"
              @click="downImg('xls')"
              >下载图片</el-button
            >
          </div>
          <el-table
            :data="tableData"
            border
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
            <el-table-column label="编辑">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleSave(scope.$index, scope.row)"
                  >保存</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 简介 -->
        <div class="brief">
          <div>简介</div>
          <div>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="item.summary"
              show-word-limit
              :rows="10"
            >
            </el-input>
          </div>
        </div>
        <!-- 保存 按钮 -->
        <div class="detail-footer">
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
          <el-button type="danger" @click="Exit" icon="el-icon-close"
            >关闭</el-button
          >
        </div>
        <!-- 模板 按钮 -->
        <div class="v-details">
          <span>详情模板：</span>
          <el-button type="primary" plain @click="template1()">模板1</el-button>
          <el-button type="primary" plain>模板2</el-button>
          <el-button type="primary" plain>模板3</el-button>
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
        <!-- 富文本 -->
        <div class="detailBox">
          <div class="quillEditor" v-loading="quillLoading">
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
        <!-- <div v-html="text0">{{text0}}</div> -->
        <div class="footer">
          ©{{
            years
          }}&nbsp;&nbsp;&nbsp;广州思高易网络科技有限公司&nbsp;&nbsp;&nbsp;粤ICP备19040870号
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
      width="29%"
      center
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
            type="number"
            placeholder="请输入库存"
            v-model="AddTableList.stock"
          />
        </div>
        <div>
          <span>加价：</span>
          <input
            type="number"
            placeholder="请输入加价"
            v-model="AddTableList.markup"
          />
        </div>
        <div>
          <span>图片：</span>
          <span
            ><input
              type="file"
              title="点击上传图片"
              accept="image/*"
              @change="uploadImg($event)"
              ref="uploadSrc"
              multiple /><img :src="AddTableList.imgurl" alt=""
          /></span>
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
        center
      >
        <div class="content">
          <!-- 主图 -->
          <div class="main" v-show="mianList.length > 0">
            <div class="title">主图</div>
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
          <!-- <div class="table" v-show="tableData.length > 0">
            <div class="title">变体图</div>
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
          </div> -->
          <!-- 详情图 -->
          <div class="details" v-show="detailsList.length > 0">
            <div class="title">详情图</div>
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
        center
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
      <el-dialog
        title="选择图片"
        :visible.sync="tableImgStatus"
        width="50%"
        center
      >
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
      <el-dialog
        title="刊登产品"
        :visible.sync="publishStatus"
        width="33%"
        center
      >
        <div class="deriveInfo">
          <div>
            <span>选择店铺：</span>
            <div>
              <select
                v-model="qoo10shopsIndex"
                @change="
                  changeSet(qoo10shopsList, qoo10shopsIndex, 'qoo10shops')
                "
              >
                <option
                  v-for="(item, index) in qoo10shopsList"
                  :key="index"
                  :value="index"
                  :selected="item.selected"
                >
                  {{ item.shopuser }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <span>分类编号：</span>
            <div>
              <input type="text" v-model="publishList.SecondSubCat" />
            </div>
          </div>
          <div>
            <span>运费编号：</span>
            <div>
              <select
                v-model="freightIndex"
                @change="changeSet(freightList, freightIndex, 'freight')"
              >
                <option
                  v-for="(item, index) in freightList"
                  :key="index"
                  :value="index"
                  :selected="item.selected"
                >
                  {{ item.ShippingName }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <span>价格公式：</span>
            <div>
              <input type="text" v-model="publishList.priceCount" />
            </div>
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
      errorImage: 'this.src="' + require("../assets/img/errorImg.png") + '"',
      // sideNavbar 的状态
      chilrenVal: "",
      //   left 值
      leftName: 250,
      // 侧边栏的宽度
      W: "",
      opacity: 0,
      // 传子元素的 值
      flag: false,
      // 标题
      // show大图
      bgImgSrc: "",
      //   smallDiv 状态值
      smallStatus: false,
      //   产品状态list
      orderStatusList: [
        { name: "上架", selected: true, value: 0 },
        { name: "下架", selected: false, value: 1 },
        { name: "爆款", selected: false, value: 2 },
        { name: "新品", selected: false, value: 3 },
        { name: "缺货", selected: false, value: 4 },
      ],
      //
      radio: "2",
      radio2: "1",
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
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
          },
        },
      },
      quillDisabled: true,
      quillLoading: false,
      // 小图片 index*50
      samllImg: [],
      // maskDiv
      maskDiv: "",
      // 点击左右边的次数
      count: 0,
      // 左右按钮点击状态值
      addBtnNum: false,
      addBtnFlag: true,
      // 删除状态
      delShow: false,
      //
      fileList: [],
      //
      cbd: "",
      //   放大层 imgSrc
      cybgImgSrc: "",
      magnifyStatus: false,
      //   年份
      years: "",
      //   传过来的item
      item: {},
      //   点击表格修改 的row
      row: {},
      //   点击表格修改 的index
      tableIndex: "",
      //   点击表格修改的状态值
      detailChangeStatus: false,
      // 大类 中类 小类
      largeIndex: 0,
      largeList: [],
      mediumIndex: 0,
      mediumList: [],
      smallIndex: 0,
      smallList: [],
      // 中等分类初始值
      catalog1: {},
      catalog2: {},
      //   标题定时器
      timer: null,
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
    this.qoo10shopsList.forEach((e) => {
      e["selected"] = false;
    });
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
    ...homeState(["InfoData", "WstateStatus"]),
  },
  methods: {
    //   初始化数据
    creatData() {
      // 产品状态值的初始化
      this.orderStatusList.forEach((e) => {
        e.selected = false;
        if (e.status == this.item.status) {
          e.selected = true;
        }
      });
      // 小图片 imgSrc
      this.item.item_imgs = this.item.pic_url + "," + this.item.item_imgs;
      this.bgImgSrc = this.item.pic_url;
      let imgList = this.item.item_imgs.split(",");
      //图片翻译 详情图图片 数组   00000

      for (let i = 0; i < imgList.length; i++) {
        let objImg = {
          imgSrc: "",
          isActive: false,
          imgLeft: "",
          loadingImg: true,
        };
        objImg.imgSrc = imgList[i];
        objImg.imgLeft = i * 50;
        this.samllImg.push(objImg);
      }
      this.samllImg.forEach((e, index) => {
        if (index == 0) {
          e.isActive = true;
        } else {
          e.isActive = false;
        }
      });
    },
    // 点击图片 在大Box展示
    showLarge(item, index) {
      if (item.isActive) {
        return;
      }
      this.samllImg.forEach((e) => {
        e.isActive = false;
      });
      this.bgImgSrc = item.imgSrc;
      item.isActive = true;
    },
    // magnifyImg()
    overImg(e) {
      this.cybgImgSrc = this.bgImgSrc;
      this.magnifyStatus = true;
      this.smallStatus = true;
    },
    moveImg(e) {
      //获取对象
      let smallDiv = document.querySelector(".v-img");
      let maskDiv = document.querySelector(".smallDiv");
      let zoomDiv = document.querySelector(".magnifyDiv");
      let img = document.querySelector(".img");
      let dtailDiv = document.querySelector(".d-dtail");
      let detailsBox = document.querySelector(".details");
      let v_details = document.querySelector(".v_details");

      // 获取鼠标在小盒子中的坐标
      let maskX = e.pageX - 140;
      let maskY = e.pageY - dtailDiv.offsetTop - 10;
      // 让鼠标在遮挡层的中心
      maskX = maskX - maskDiv.offsetWidth / 2;
      maskY = maskY - maskDiv.offsetHeight / 2;

      //限制遮挡层不能跑出小盒子外面
      if (maskX < 0) {
        maskX = 0;
      } else if (maskX >= smallDiv.offsetWidth - maskDiv.offsetWidth) {
        maskX = smallDiv.offsetWidth - maskDiv.offsetWidth;
      }

      if (maskY < 0) {
        maskY = 0;
      } else if (maskY >= smallDiv.offsetHeight - maskDiv.offsetHeight) {
        maskY = smallDiv.offsetHeight - maskDiv.offsetHeight;
      }
      // 把鼠标在小盒子中坐标个我遮挡层
      maskDiv.style.left = maskX + "px";
      maskDiv.style.top = maskY + "px";
      // 移动遮挡层,大图片跟随移动
      // 获取大图片和小图片的backgroundSize
      let bigSize = parseInt(
        window.getComputedStyle(zoomDiv)["background-size"]
      );
      let smallSize = parseInt(
        window.getComputedStyle(smallDiv)["background-size"]
      );
      //  -position的距离 / mask移动的距离 = 大img的backgSize / 小img的backgSize
      zoomDiv.style.backgroundPositionX = -maskX * (bigSize / smallSize) + "px";
      zoomDiv.style.backgroundPositionY = -maskY * (bigSize / smallSize) + "px";
    },
    leaveImg(e) {
      this.magnifyStatus = false;
      this.smallStatus = false;
    },
    // 图片加载
    loadingImg(item, index, e) {
      item.loadingImg = false;
    },
    //   table 删除 按钮
    handleDelete(index, row) {
      this.$confirm("", "是否要删除", {
        dangerouslyUseHTMLString: true,
        center: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        customClass: "delMessage",
        type: "warning",
      })
        .then(() => {
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
        })
        .catch(() => {});
    },
    //   table 保存 按钮
    handleSave(index, row) {
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
        sortid: this.smallList[this.smallIndex].catalogId,
        status: this.item.status,
        title: this.item.title,
        price: this.item.price,
        express_fee: this.item.express_fee,
        summary: this.item.summary,
        elm1: this.item.details,
        imglist: "",
        language: this.$route.query.language,
      };
      // 处理price 单位
      data.price = data.price.replace(/[^\d.]/g, "");
      // 主图图片
      this.samllImg.forEach((e) => {
        data.imglist += e.imgSrc + ",";
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
    // 点击rightMove
    rightMove() {
      this.maskDiv = this.$refs.mask;
      if (this.count + 6 >= this.samllImg.length) {
        this.addBtnFlag = false;

        return;
      }
      if (this.count >= 0) {
        this.addBtnNum = true;
      }
      this.count++;
      this.cbd = this.maskDiv.style.marginLeft = -(this.count * 50) + "px";
    },
    // 点击leftMove
    leftMove() {
      this.maskDiv = this.$refs.mask;
      if (this.count <= 0) {
        this.addBtnNum = false;
        return;
      }
      if (this.count + 6 <= this.samllImg.length) {
        this.addBtnFlag = true;
      }
      this.count--;
      this.cbd = this.maskDiv.style.marginLeft = -(this.count * 50) + "px";
    },
    // 删除图片
    deleteImg(index) {
      let imgDivList = document.querySelectorAll(".imgDiv");
      this.samllImg.splice(index, 1);
      this.samllImg.forEach((e, i) => {
        if (i >= index) {
          e.imgLeft = 50 * i;
        }
      });

      //   点击this.count >0 的图片
      this.maskDiv = this.$refs.mask;
      // index ==> 5 < length
      if (this.count > 0 && this.samllImg.length >= 5) {
        this.cbd = this.maskDiv.style.marginLeft =
          parseInt(this.cbd) + 50 + "px";
        this.count--;
      }
      if (this.samllImg.length <= 5) {
        this.cbd = this.maskDiv.style.marginLeft = 0 + "px";
        this.count = 0;
      }
    },
    //头部 上传图片
    upImg(e) {
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

          this.$refs.uploadVal.value = null;
          if (result.data.Code == "200") {
            let objImg = {
              imgSrc: "",
              isActive: false,
              imgLeft: "",
            };
            objImg.imgSrc = result.data.imglist;
            this.samllImg.push(objImg);
            for (let i = 0; i < this.samllImg.length; i++) {
              if (i == this.samllImg.length - 1) {
                this.samllImg[i].imgLeft = i * 50;
              }
            }
            if (this.count + 6 < this.samllImg.length) {
              this.addBtnFlag = true;
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
    // 点击下载图片
    downImg(val) {
      this.arrImages = [];
      if (val == "product") {
        for (let i = 0; i < this.samllImg.length; i++) {
          let objImg = {
            fileUrl: "",
            renameFileName: "",
          };
          objImg.fileUrl = this.samllImg[i].imgSrc;
          let name = this.samllImg[i].imgSrc.split(".")[
            this.samllImg[i].imgSrc.split(".").length - 1
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
              selected: true,
            };
            result.data.catalogs.forEach((e) => {
              e["selected"] = false;
            });
            result.data.catalogs.unshift(classObj);
            this.largeList = result.data.catalogs;
            // 初始渲染 分类 set
            if (
              result.data.catalog0 != undefined ||
              result.data.catalog1 != undefined ||
              result.data.catalog2 != undefined
            ) {
              this.catalog1 = result.data.catalog1;
              this.catalog2 = result.data.catalog2;
              this.largeList.forEach((e, i) => {
                e.selected = false;
                if (e.catalogId == result.data.catalog0.catalogId) {
                  e.selected = true;
                  this.largeIndex = i;
                }
              });
              // 分类编号 赋值
              this.publishList.SecondSubCat = result.data.catalog2.catalogId;
              this.changeSet(this.largeList, this.largeIndex, "large");
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
    changeSet(array, index, string) {
      array.forEach((e) => {
        e.selected = false;
      });
      array[index].selected = true;
      // 请求
      if (string == "large") {
        if (index == 0) {
          this.mediumIndex = 0;
          this.smallIndex = 0;
          this.mediumList = [
            {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            },
          ];
          this.smallList = [
            {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            },
          ];
          return;
        }
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: array[index].catalogId,
          },
        })
          .then((result) => {
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            };
            result.data.catalogs.forEach((e) => {
              e["selected"] = false;
            });
            result.data.catalogs.unshift(classObj);
            this.mediumList = result.data.catalogs;

            this.mediumList.forEach((e, i) => {
              e.selected = false;
              if (e.catalogId == this.catalog1.catalogId) {
                e.selected = true;
                this.mediumIndex = i;
              }
            });
            // catalog2
            this.changeSet(this.mediumList, this.mediumIndex, "medium");
          })
          .catch((err) => {});
      } else if (string == "medium") {
        if (index == 0) {
          this.smallIndex = 0;
          this.smallList = [
            {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            },
          ];
          return;
        }
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: array[index].catalogId,
          },
        })
          .then((result) => {
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            };

            this.smallList = result.data.catalogs;
            this.smallList.unshift(classObj);

            this.smallList.forEach((e, i) => {
              e.selected = false;
              if (e.catalogId == this.catalog2.catalogId) {
                e.selected = true;
                this.smallIndex = i;
              }
            });
          })
          .catch((err) => {});
      } else if (string == "qoo10shops") {
        if (this.qoo10shopsList[this.qoo10shopsIndex].id == 0) {
          this.freightList = [{ ShippingName: "全部", ShippingNo: 0 }];
          return;
        }
        this.$axios({
          url: "/sigaoyi/searchShop",
          method: "POST",
          params: {
            id: this.qoo10shopsList[this.qoo10shopsIndex].id,
          },
        })
          .then((result) => {
            console.log("result ==>", result);
            let freightObj = {
              ShippingName: "全部",
              ShippingNo: 0,
            };
            this.freightList = result.data.ShippingList;
            this.freightList.forEach((e) => {
              e["selected"] = false;
            });
            this.freightList.unshift(freightObj);
            this.publishList.CertificationKey = result.data.CertificationKey;
          })
          .catch((err) => {});
      } else if (string == "freight") {
        this.publishList.ShippingNo = this.freightList[
          this.freightIndex
        ].ShippingNo;
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
            // this.text0 = result.data.elm;
            // let html = result.data.elm
            // let quill = this.$refs.quillEditor
            // this.onEditorChange({quill,html})
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
          loading.close();
          if (result.data.Code == 200) {
            result.data.list.forEach((e) => {
              // 主图
              for (let i = 0; i < this.samllImg.length; i++) {
                if (e.imgs0URL == this.samllImg[i].imgSrc) {
                  this.samllImg[i].imgSrc = e.imgs1URL;
                  if (i == 0) {
                    this.bgImgSrc = e.imgs1URL;
                  }
                }
              }
              //   // 变体图
              //   for (let i = 0; i < this.tableData.length; i++) {
              //     if (e.imgs0URL == this.tableData[i].imgurl) {
              //       this.tableData[i].imgurl = e.imgs1URL;
              //     }
              //   }
              //   // 详情图
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
      // 提示
      if (this.qoo10shopsList[this.qoo10shopsIndex].id == 0) {
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
        shopid: this.qoo10shopsList[this.qoo10shopsIndex].id,
        CertificationKey: this.publishList.CertificationKey,
        SecondSubCat: this.publishList.SecondSubCat,
        ShippingNo: this.publishList.ShippingNo,
      };

      this.publishStatus = false;
      // 发请求
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
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
};
</script>