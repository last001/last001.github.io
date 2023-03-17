<template>
  <div class="ds-filter-bar">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="filter-bar" :class="{ hide: options.showBatchBar }" v-if="options.filterBar">
          <slot name="filterBar"></slot>
          <template v-for="item in options.filterBar">
            <!--dropselect-->
            <el-select :style="item.width ? 'width:' + item.width + 'px' : 'width:150px'"
              v-model="filterData[item.field]" v-if="item.type === 'dropselect'"
              @visible-change="handler('dropSelectVisibleChange', item, $event)" :data-field="item.field"
              @change="handler('dropSelectChange', item, $event)" :multiple="item.multiple" clearable filterable
              collapse-tags collapse-tags-tooltip :placeholder="item.name" class="mr-10 mb-5">
              <el-option v-for="option in item.options" :key="option.value" :label="option.name"
                :value="option.value" />
            </el-select>

            <!--inputsearch-->
            <el-input v-model="filterData[item.field]" :data-filters="JSON.stringify(item.filters)"
              :data-field="item.field" @keyup.enter="handler('inputSearchChange', '', $event)" class="w-250 mr-10 mb-5"
              :placeholder="item.name" v-if="item.type === 'inputsearch'">
              <template #suffix>
                <el-icon @click="handler('inputSearchClick', '', $event)" :data-filters="JSON.stringify(item.filters)"
                  :data-field="item.field">
                  <Search />
                </el-icon>
              </template>
            </el-input>
            <!--tag-->
            <el-select :style="item.width ? 'width:' + item.width + 'px' : 'width:200px'"
              v-model="filterData[item.field]" v-if="item.type === 'tag'" :data-field="item.field"
              @visible-change="handler('tagVisibleChange', item, $event)" multiple clearable collapse-tags
              collapse-tags-tooltip filterable remote :reserve-keyword="false" default-first-option
              :loading="options.tagLoading" :remote-method="(query) => searchTagList(query, item)"
              @change="handler('tagChange', item, $event)" :placeholder="item.name" class="mr-10 mb-5">
              <el-option v-for="option in item.options" :key="option.value" :label="option.name" :value="option.value"
                :disabled="option.value === '_manage'">
                <div v-if="option.value === '_manage'" class="ds-fx ai-c jc-c" style="margin-top: 8px">
                  <el-button size="small" type="primary" plain @click="handler('tagManage', item, $event)">
                    <el-icon>
                      <Setting />
                    </el-icon><span>{{ option.name }}</span>
                  </el-button>
                </div>
                <div v-else class="ds-fx ai-c w-full">
                  <div class="mr-5" style="width: 16px; height: 16px" :style="
                    'background-color:var(--el-color-' + option.color + ');'
                  ">
                    &nbsp;
                  </div>
                  <div class="mr-10 fx-size-1">{{ option.name }}</div>
                </div>
              </el-option>
            </el-select>
          </template>
          <el-link v-if="options.adFilterEnable" type="primary" :underline="false" class="mr-10"
            @click="options.adFilterBarShow = !options.adFilterBarShow">
            <span class="mr-3">高级搜索</span>
            <el-icon class="rotate" :class="{ 'rotate-180': options.adFilterBarShow }">
              <caret-bottom />
            </el-icon>
          </el-link>
        </div>
        <div class="batch-bar" :class="{ hide: !options.showBatchBar }" v-if="options.batchBar">
          <slot name="batchBarLeft"> </slot>
          <template v-for="item in options.batchBar">
            <el-button :type="item.buttonCss" :icon="item.icon" class="mb-5" v-if="item.type === 'button'"
              :data-command="item.command" @click="handler('buttonClick', '', $event)">{{ item.name }}</el-button>
          </template>
          <slot name="batchBar">
          </slot>
        </div>
      </el-col>
      <el-col :span="8" class="ta-r" v-if="options.toolBar">
        <slot name="toolBar"></slot>
        <template v-for="item in options.toolBar">
          <el-button :type="item.buttonCss" :icon="item.icon" :title="item.tooltip" class="ml-10"
            v-if="item.type === 'button'" :data-command="item.command" @click="handler('buttonClick', '', $event)">{{
                item.name
            }}</el-button>
          <el-dropdown class="ml-10" v-if="item.type === 'btngroup'" @command="handler('buttonClick', $event, null)">
            <el-button type="" :type="item.buttonCss" :title="item.tooltip">{{ item.name
            }}<el-icon v-if="item.icon" class="el-icon-right ml-3">
                <component :is="item.icon"></component>
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="button in item.buttons" :command="button.command">{{ button.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>

      </el-col>
    </el-row>
    <!--高级搜索-->
    <el-collapse-transition>
      <div v-show="options.adFilterBarShow" class="ad-filter-bar">
        <div class="ad-filter-form">
          <slot v-if="options.adFilterSlot" name="adFilterBar"></slot>
          <template v-else>
            <!--<el-form :inline="true" label-width="100px" label-position="left">
                            <el-form-item label="操作者">
                                <el-input placeholder="Approved by" />
                            </el-form-item>
                            <el-form-item label="操作时间">
                                <el-date-picker
                                        v-model="value2"
                                        type="daterange"
                                        unlink-panels
                                        range-separator="To"
                                        start-placeholder="Start date"
                                        end-placeholder="End date"
                                />
                            </el-form-item>
                            <el-form-item label="操作者">
                                <el-input placeholder="Approved by" />
                            </el-form-item>
                            <el-form-item label="操作时间">
                                <el-select placeholder="操作时间">
                                    <el-option label="Zone one" value="shanghai" />
                                    <el-option label="Zone two" value="beijing" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="操作者">
                                <el-input placeholder="Approved by" />
                            </el-form-item>
                            <el-form-item label="操作时间">
                                <el-select placeholder="操作时间">
                                    <el-option label="Zone one" value="shanghai" />
                                    <el-option label="Zone two" value="beijing" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="操作者">
                                <el-input placeholder="Approved by" />
                            </el-form-item>
                            <el-form-item label="操作时间">
                                <el-select placeholder="操作时间">
                                    <el-option label="Zone one" value="shanghai" />
                                    <el-option label="Zone two" value="beijing" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="操作时间1">
                                <el-select placeholder="操作时间">
                                    <el-option label="Zone one" value="shanghai" />
                                    <el-option label="Zone two" value="beijing" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label=" ">
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                                <el-button type="" @click="onSubmit">清空</el-button>
                            </el-form-item>
                        </el-form>-->
          </template>
        </div>
      </div>
    </el-collapse-transition>
    <!--自定义显示列-->
    <el-dialog v-model="options.showCusColDialog" title="自定义显示列" width="60%">
      <draggable v-model="options.gridColumn.visibleColumns" chosen-class="chosen" force-fallback="true" animation="300"
        handle=".mover" class="el-dropdown-menu tablebar-dropdown-menu nopd">
        <template #item="{ element, index }">
          <li class="el-dropdown-menu__item">
            <div class="ds-fx ai-c w-full">
              <span class="mr-8" style="color: var(--el-color-info-light-3)">{{
                  index + 1
              }}</span>
              <div class="mr-10 fx-size-1">{{ element.fieldLabel }}</div>
              <el-input-number v-if="element.editWidth" :min="10" :max="1000" v-model="element.width"
                value-on-clear="100" :controls="false" controls-position="right" class="mr-10 w-60" size="small"
                @keyup.enter="element.editWidth = false" @blur="element.editWidth = false" />
              <el-button v-else class="mr-10 w-60" size="small" @click="element.editWidth = true">{{ element.width }}px
              </el-button>
              <el-link icon="close" :underline="false" class="hover-btn pl-3 pr-3"
                @click="handler('remove2HiddenColumn', element.field, $event)" title="移除"></el-link>
              <el-link icon="grid" :underline="false" class="mover hover-btn pl-3 pr-3" style="cursor: move"
                title="拖动以调整顺序"></el-link>
            </div>
          </li>
        </template>
      </draggable>
      <div class="mt-30 pb-15 fs-13 ds-fx ai-c divider">
        <span class="divider-icon mr-8"></span><span>未在表格中显示的列</span>
      </div>
      <ul class="el-dropdown-menu tablebar-dropdown-menu nopd">
        <li class="el-dropdown-menu__item" v-for="col in options.gridColumn.hiddenColumns"
          @click="handler('add2VisibleColumn', col.field, $event)">
          <div class="ds-fx ai-c w-full">
            <div class="mr-10 fx-size-1">{{ col.fieldLabel }}</div>
            <el-link icon="plus" :underline="false" class="hover-btn pl-3" title=""></el-link>
          </div>
        </li>
      </ul>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="options.showCusColDialog = false">取消</el-button>
          <el-button type="primary" @click="handler('cusColSubmit', '', $event)">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--导入导出设置-->
    <el-dialog v-model="options.showExpImpDialog" custom-class="exp-imp-dialog" title="导入导出设置" width="60%">
      <el-tabs model-value="export" class="">
        <el-tab-pane label="导出设置" name="export">
          <draggable v-model="options.gridColumn.exportAbleColumns" chosen-class="chosen" force-fallback="true"
            animation="300" handle=".mover" class="el-dropdown-menu tablebar-dropdown-menu nopd">
            <template #item="{ element, index }">
              <li class="el-dropdown-menu__item">
                <div class="ds-fx ai-c w-full">
                  <span class="mr-8" style="color: var(--el-color-info-light-3)">{{ index + 1 }}</span>
                  <div class="mr-10 fx-size-1">{{ element.fieldLabel }}</div>
                  <el-input-number v-if="element.editWidth" :min="10" :max="1000" v-model="element.widthInExcel"
                    value-on-clear="100" :controls="false" controls-position="right" class="mr-10 w-60" size="small"
                    @keyup.enter="element.editWidth = false" @blur="element.editWidth = false" />
                  <el-button v-else class="mr-10 w-60" size="small" @click="element.editWidth = true">{{
                      element.widthInExcel
                  }}px</el-button>
                  <el-link icon="close" :underline="false" class="hover-btn pl-3 pr-3" @click="
                    handler('remove2UnableExpColumn', element.field, $event)
                  " title="移除"></el-link>
                  <el-link icon="grid" :underline="false" class="mover hover-btn pl-3 pr-3" style="cursor: move"
                    title="拖动以调整顺序"></el-link>
                </div>
              </li>
            </template>
          </draggable>
          <span v-if="options.gridColumn.exportAbleColumns.length == 0">无</span>
          <div class="mt-30 pb-15 fs-13 ds-fx ai-c divider">
            <span class="divider-icon mr-8"></span><span>未导出的列</span>
          </div>
          <ul class="el-dropdown-menu tablebar-dropdown-menu nopd">
            <li class="el-dropdown-menu__item" v-for="col in options.gridColumn.exportUnableColumns"
              @click="handler('add2AbleExpColumn', col.field, $event)">
              <div class="ds-fx ai-c w-full">
                <div class="mr-10 fx-size-1">{{ col.fieldLabel }}</div>
                <el-link icon="plus" :underline="false" class="hover-btn pl-3" title=""></el-link>
              </div>
            </li>
          </ul>
          <span v-if="options.gridColumn.exportUnableColumns.length == 0">无</span>
        </el-tab-pane>
        <el-tab-pane label="导入设置" name="import">
          <draggable v-model="options.gridColumn.importAbleColumns" chosen-class="chosen" force-fallback="true"
            animation="300" handle=".mover" class="el-dropdown-menu tablebar-dropdown-menu nopd">
            <template #item="{ element, index }">
              <li class="el-dropdown-menu__item">
                <div class="ds-fx ai-c w-full">
                  <span class="mr-8" style="color: var(--el-color-info-light-3)">{{ index + 1 }}</span>
                  <div class="mr-10 fx-size-1">{{ element.fieldLabel }}</div>
                  <el-link icon="close" :underline="false" class="hover-btn pl-3 pr-3" @click="
                    handler('remove2UnableImpColumn', element.field, $event)
                  " title="移除"></el-link>
                  <el-link icon="grid" :underline="false" class="mover hover-btn pl-3 pr-3" style="cursor: move"
                    title="拖动以调整顺序"></el-link>
                </div>
              </li>
            </template>
          </draggable>
          <span v-if="options.gridColumn.importAbleColumns.length == 0">无</span>
          <div class="mt-30 pb-15 fs-13 ds-fx ai-c divider">
            <span class="divider-icon mr-8"></span><span>未导入的列</span>
          </div>
          <ul class="el-dropdown-menu tablebar-dropdown-menu nopd">
            <li class="el-dropdown-menu__item" v-for="col in options.gridColumn.importUnableColumns"
              @click="handler('add2AbleExpColumn', col.field, $event)">
              <div class="ds-fx ai-c w-full">
                <div class="mr-10 fx-size-1">{{ col.fieldLabel }}</div>
                <el-link icon="plus" :underline="false" class="hover-btn pl-3" title=""></el-link>
              </div>
            </li>
          </ul>
          <span v-if="options.gridColumn.importUnableColumns.length == 0">无</span>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="options.showExpImpDialog = false">取消</el-button>
          <el-button type="primary" @click="handler('cusColSubmit', '', $event)">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--标签管理-->
    <el-dialog v-model="options.showTagDialog" title="标签管理" width="50%">
      <template #default>
        <!--新增标签dialog-->
        <el-dialog v-model="options.showAddTagDialog" width="30%" title="新增标签">
          <template #default>
            <el-form ref="tagFormRef" :model="options.tagFormData" :rules="options.tagFormRules" label-width="auto"
              label-position="left" style="padding: 30px">
              <el-form-item prop="name" label="标签名称" required>
                <el-input class="w-300" v-model="options.tagFormData.name" />
              </el-form-item>
              <el-form-item label="标签颜色" prop="color" required>
                <div class="ds-fx fd-c">
                  <div class="br-2 w-30 h-30" :style="
                    'background-color:var(--el-color-' +
                    options.tagFormData.color +
                    ');border-color:var(--el-color-' +
                    options.tagFormData.color +
                    ');'
                  ">
                    &nbsp;
                  </div>
                  <!--                  <el-color-picker v-model="options.tagFormData.color"/>-->
                  <div class="ds-fx ai-c mt-10">
                    <div class="w-30 h-30 br-2 mr-10 cs-p" @click="options.tagFormData.color = 'primary'"
                      style="background-color: var(--el-color-primary)"></div>
                    <div class="w-30 h-30 br-2 mr-10 cs-p" @click="options.tagFormData.color = 'success'"
                      style="background-color: var(--el-color-success)"></div>
                    <div class="w-30 h-30 br-2 mr-10 cs-p" @click="options.tagFormData.color = 'info'"
                      style="background-color: var(--el-color-info)"></div>
                    <div class="w-30 h-30 br-2 mr-10 cs-p" @click="options.tagFormData.color = 'danger'"
                      style="background-color: var(--el-color-danger)"></div>
                    <div class="w-30 h-30 br-2 mr-10 cs-p" @click="options.tagFormData.color = 'warning'"
                      style="background-color: var(--el-color-warning)"></div>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="options.showAddTagDialog = false">取消</el-button>
              <el-button type="primary" @click="tagFormSubmit(tagFormRef)">确定</el-button>
            </span>
          </template>
        </el-dialog>
        <ul class="el-dropdown-menu tablebar-dropdown-menu nopd">
          <li class="el-dropdown-menu__item" v-for="tag in options.tags">
            <div class="ds-fx ai-c w-full">
              <div class="mr-5" style="width: 16px; height: 16px"
                :style="'background-color:var(--el-color-' + tag.color + ');'">
                &nbsp;
              </div>
              <div class="mr-10 fx-size-1">{{ tag.name }}</div>
              <el-tag type="info" class="mr-5" size="small" effect="plain" round
                :title="'关联' + tag.subscribeNumber + '条数据'">{{ tag.subscribeNumber }}</el-tag>
              <el-link icon="delete" :underline="false" class="hover-btn pl-3"
                @click="handler('tagDelete', tag.id, $event)" title="删除标签"></el-link>
            </div>
          </li>
        </ul>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="options.showAddTagDialog = true">新增标签</el-button>
          <el-button @click="options.showTagDialog = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, watch, onMounted, } from "vue";
import draggable from "vuedraggable/src/vuedraggable";
import dsmain from "@dscloud/api/dsmain";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
export default defineComponent({
  name: "DsTablebar",
  components: { draggable },
  props: {
    dsTableRef: null,
    filterBar: {
      type: Object,
      default: false,
    },
    batchBar: {
      type: Object,
      default: false,
    },
    toolBar: {
      type: Object,
      default: false,
    },
    adFilterEnable: {
      type: Boolean,
      default: true,
    },
    adFilterSlot: {
      type: Boolean,
      default: true,
    },
    queryMetaPageFun: {
      //列头查询方法
      type: Function,
      default: false,
    },
    onButtonClick: {
      type: Function,
      default: false,
    },
  },
  emits: [],
  setup(props, context) {
    const options: any = reactive({
      adFilterEnable: props.adFilterEnable,
      adFilterSlot: props.adFilterSlot,
      adFilterBarShow: false,
      filterBar: props.filterBar,
      batchBar: props.batchBar,
      toolBar: props.toolBar,
      showBatchBar: false,
      showCusColDialog: false,
      showExpImpDialog: false,
      showTagDialog: false,
      showAddTagDialog: false,
      gridColumn: {
        visibleColumns: [],
        hiddenColumns: [],
        exportUnableColumns: [],
        exportAbleColumns: [],
        importUnableColumns: [],
        importAbleColumns: [],
      },
      tags: [],
      tagFormData: {
        id: null,
        dataRange: "public",
        name: "",
        color: "primary",
        tagType: "ds_dictionary:tagIdList",
      },
      tagFormRules: {
        name: [
          {
            required: true,
            message: "请输入标签名称",
            trigger: ["blur", "change"],
          },
        ],
        color: [
          {
            required: true,
            message: "请选择标签颜色",
            trigger: ["blur", "change"],
          },
        ],
      },
      tagLoading: false,
    });
    const tagFormRef = ref();
    const filterData: any = reactive({});
    options.filterBar.forEach((val: any, idx: number, arr: []) => {
      if (val.field) {
        filterData[val.field] = val.defaultValue || "";
      }
    });
    const adFilterData = reactive({});
    let filterFilters: any = {};
    let adFilterFilters: any = [];
    //region 事件、方法
    const handler = (command: string, data: any, event: any) => {
      switch (command) {
        case "inputSearchChange":
          var value = event.currentTarget.value;
          var field = event.currentTarget.dataset.field;
          if (value) {
            let filters = JSON.parse(event.currentTarget.dataset.filters);
            let filter: any = { key: "$or", items: [] };
            if (filters) {
              filters.forEach((it: any, idx: number, arr: any) => {
                let newitem: any = { key: it.field, data: {} };
                newitem.data[it.expression] = value;
                filter.items.push(newitem);
              });
              filterFilters[field] = filter;
            }
          } else {
            delete filterFilters[field];
          }
          reloadTable();
          break;
        case "inputSearchClick":
          var field = event.currentTarget.dataset.field;
          var value = filterData[field];
          if (value) {
            let filters = JSON.parse(event.currentTarget.dataset.filters);
            let filter: any = { key: "$or", items: [] };
            if (filters) {
              filters.forEach((it: any, idx: number, arr: []) => {
                let newitem: any = { key: it.field, data: {} };
                newitem.data[it.expression] = value;
                filter.items.push(newitem);
              });
              filterFilters[field] = filter;
            }
          } else {
            delete filterFilters[field];
          }
          reloadTable();
          break;
        case "buttonClick":
          let command = data || event.currentTarget.dataset.command;
          if (command == "_cuscol") {
            typeof props.queryMetaPageFun === "function" &&
              props.queryMetaPageFun().then((res: any) => {
                if (res && res.gridColumnList) {
                  let visibleColumns: any = [];
                  let hiddenColumns: any = [];
                  res.gridColumnList.forEach(
                    (col: any, idx: number, arr: []) => {
                      if (col.visible) {
                        col["editWidth"] = false;
                        col.display && visibleColumns.push(col);
                        !col.display && hiddenColumns.push(col);
                      }
                    }
                  );
                  options.gridColumn.visibleColumns = visibleColumns;
                  options.gridColumn.hiddenColumns = hiddenColumns;
                  options.showCusColDialog = true;
                }
              });
          } else if (command == "_cusimpexp") {
            typeof props.queryMetaPageFun === "function" &&
              props.queryMetaPageFun().then((res: any) => {
                if (res && res.gridColumnList) {
                  let exportUnableColumns: any = [];
                  let exportAbleColumns: any = [];
                  let importUnableColumns: any = [];
                  let importAbleColumns: any = [];
                  res.gridColumnList.forEach(
                    (col: any, idx: number, arr: []) => {
                      if (col.exportColumn) {
                        col["editWidth"] = false;
                        col.exportable && exportAbleColumns.push(col);
                        !col.exportable && exportUnableColumns.push(col);
                      }
                      if (col.importColumn) {
                        col.importable && importAbleColumns.push(col);
                        !col.importable && importUnableColumns.push(col);
                      }
                    }
                  );
                  options.gridColumn.exportUnableColumns = exportUnableColumns;
                  options.gridColumn.exportAbleColumns = exportAbleColumns;
                  options.gridColumn.importUnableColumns = importUnableColumns;
                  options.gridColumn.importAbleColumns = importAbleColumns;
                  options.showExpImpDialog = true;
                }
              });
          } else {
            if (props.onButtonClick) {
              props.onButtonClick(command, data, event);
            }
          }
          break;
        case "remove2HiddenColumn":
          var item: any = options.gridColumn.visibleColumns.find(
            (obj) => obj.field === data
          );
          if (item) {
            item.display = false;
            options.gridColumn.hiddenColumns.push(item);
          }
          var index = options.gridColumn.visibleColumns.findIndex(
            (obj) => obj.field === data
          );
          options.gridColumn.visibleColumns.splice(index, 1);
          break;
        case "add2VisibleColumn":
          var item = options.gridColumn.hiddenColumns.find(
            (obj) => obj.field === data
          );
          if (item) {
            item.display = true;
            options.gridColumn.visibleColumns.push(item);
          }
          var index = options.gridColumn.hiddenColumns.findIndex(
            (obj) => obj.field === data
          );
          options.gridColumn.hiddenColumns.splice(index, 1);
          break;
        case "cusColSubmit":
          if (props.dsTableRef) {
            props.dsTableRef.setGridColumnList(
              options.gridColumn.visibleColumns
            );
          }
          options.showCusColDialog = false;
          break;
        case "remove2UnableExpColumn":
          var item = options.gridColumn.exportAbleColumns.find(
            (obj) => obj.field === data
          );
          if (item) {
            item.exportable = false;
            options.gridColumn.exportUnableColumns.push(item);
          }
          var index = options.gridColumn.exportAbleColumns.findIndex(
            (obj) => obj.field === data
          );
          options.gridColumn.exportAbleColumns.splice(index, 1);
          break;
        case "add2AbleExpColumn":
          var item = options.gridColumn.exportUnableColumns.find(
            (obj) => obj.field === data
          );
          if (item) {
            item.exportable = true;
            options.gridColumn.exportAbleColumns.push(item);
          }
          var index = options.gridColumn.exportUnableColumns.findIndex(
            (obj) => obj.field === data
          );
          options.gridColumn.exportUnableColumns.splice(index, 1);
          break;
        case "tagVisibleChange": //标签显示改变事件
          if (event === true && !data.loaded) {
            options.tagFormData.dataRange = data.dataRange;
            options.tagFormData.tagType = data.tagType;
            const queryInfo = {
              criteria: {
                key: "$and",
                items: [
                  {
                    key: "tagType",
                    data: { $eq: options.tagFormData.tagType },
                  },
                  {
                    key: "dataRange",
                    data: { $eq: options.tagFormData.dataRange },
                  },
                ],
              },
              sort: { orders: [{ field: "name", direction: "asc" }] },
              limit: 10,
            };
            options.tagLoading = true;
            dsmain.searchTagList(queryInfo).then((res: any) => {
              const tags = [];
              res.forEach((item, idx, arr) => {
                tags.push({
                  name: item.name,
                  value: item.id,
                  color: item.color,
                  subscribeNumber: item.subscribeNumber,
                });
              });
              tags.push({ name: "管理标签", value: "_manage" });
              data["options"] = tags;
              options.tagLoading = false;
            });
            data["loaded"] = true;
          }
          break;
        case "dropSelectVisibleChange":
          if (event === true && !data.loaded && data.remote) {
            var param = { componentKey: "dsselect", datasource: data.dataSource, key: data.dataSourceKey, textField: data.textField, valueField: data.valueField }
            dsmain.requestComponentData(param).then((res: any) => {
              if (res) {
                var options = [];
                res.forEach((item, idx, arr) => {
                  options.push({ name: item.text, value: item.value });
                });
                data.options = options;
              }
            });
            data["loaded"] = true;
          }
          break;
        case "dropSelectChange":
          var value = event;
          var field = data.field;
          if (value) {
            filterFilters[field] = { key: field, data: { "$eq": value } };
          } else {
            delete filterFilters[field];
          }
          reloadTable();
          break;
        case "tagManage":
          if (data) {
            options.tagFormData.dataRange = data.dataRange;
            options.tagFormData.tagType = data.tagType;
          }
          dsmain.getTagList(options.tagFormData.tagType, options.tagFormData.dataRange).then((res: any) => {
            options.tags = res;
            options.showTagDialog = true;
          });
          break;
        case "tagDelete":
          ElMessageBox.alert("确认删除？", "提示", {
            confirmButtonText: "OK",
            callback: (action: string) => {
              if (action == "confirm") {
                dsmain.removeTag(data).then((res) => {
                  if (res && res.deletedCount > 0) {
                    handler("tagManage", null, null);
                  }
                });
              }
            },
          });
          break;
        case "tagChange":
          var field = data.field;
          var value = filterData[field];
          if (value && value.length > 0) {
            let filter: any = { key: field, data: { $in: value } };
            filterFilters[field] = filter;
          } else {
            delete filterFilters[field];
          }
          reloadTable();
          break;
      }
    };
    //region 标签
    //搜索标签列表
    const searchTagList = (query: string, sltdata: object) => {
      if (!query) return;
      const data = {
        criteria: {
          key: "$and",
          items: [
            { key: "tagType", data: { $eq: options.tagFormData.tagType } },
            { key: "dataRange", data: { $eq: options.tagFormData.dataRange } },
            { key: "name", data: { $regex: query } },
          ],
        },
        sort: { orders: [{ field: "name", direction: "asc" }] },
        limit: 10,
      };
      options.tagLoading = true;
      dsmain.searchTagList(data).then((res: any) => {
        const tags = [];
        res.forEach((item, idx, arr) => {
          tags.push({
            name: item.name,
            value: item.id,
            color: item.color,
            subscribeNumber: item.subscribeNumber,
          });
        });
        tags.push({ name: "管理标签", value: "_manage" });
        sltdata["options"] = tags;
        options.tagLoading = false;
      });
    };
    //增加标签提交
    const tagFormSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          if (options.tagFormData.id) {
          } else {
            dsmain.addTag(options.tagFormData).then((res: any) => {
              handler("tagManage", null, null);
              options.showAddTagDialog = false;
              ElMessage.success("提交成功");
            });
          }
        }
      });
    };
    //endregion
    const reloadTable = (adFilters?: Array<any>) => {
      if (adFilters) adFilterFilters = adFilters;
      let tableFilters: any = [];
      Object.keys(filterFilters).forEach((key) => {
        tableFilters.push(filterFilters[key]);
      });
      tableFilters = tableFilters.concat(adFilterFilters);
      if (props.dsTableRef) {
        props.dsTableRef.reloadData(tableFilters);
      }
    };
    const showBatchBar = (visible: Boolean) => {
      options.showBatchBar = visible;
    };
    //endregion
    return {
      options,
      filterData,
      adFilterData,
      handler,
      showBatchBar,
      reloadTable,
      tagFormSubmit,
      tagFormRef,
      searchTagList,
    };
  },
});
</script>

<style lang="scss" scoped>
.ds-filter-bar {
  margin-bottom: -5px;
  position: relative;
  z-index: 2;

  .ad-filter-bar {
    padding-top: 15px;
    padding-bottom: 5px;

    .ad-filter-form {
      background-color: white;
      padding: 18px 20px 0px 18px;

      ::v-deep .el-form-item {
        width: 450px;
      }
    }
  }
}

.tablebar-dropdown-menu {
  color: var(--el-text-color-primary);
  display: flex;
  flex-wrap: wrap;

  .el-dropdown-menu__item {
    width: 245px;
    border: var(--el-color-info-light-8) 1px solid;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 10px 16px;
    padding-right: 5px;
    font-size: 12px;

    &:hover {
      background-color: var(--el-fill-color-light);
      color: var(--el-color-black);
    }

    &.chosen {
      background-color: var(--el-color-primary-light-9);
    }
  }
}

.divider {
  color: var(--el-color-danger);

  .divider-icon {
    width: 2px;
    height: 16px;
    background-color: var(--el-color-danger);
  }
}

::v-deep .exp-imp-dialog {
  .el-dialog__body {
    padding-top: 10px;
  }
}

.el-tabs {
  ::v-deep .el-tabs__nav-wrap {
    &:after {
      background-color: transparent;
    }
  }
}
</style>
