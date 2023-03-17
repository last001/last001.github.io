<template>
  <div class="ds-table-panel">
    <el-table ref="tableRef" :data="tableData.entityList" highlight-current-row v-loading="tableData.loading"
      style="width: 100%" row-key="id" :lazy="lazy" :load="load" :tree-props="treeProps"
      @sort-change="handler('sortChange', $event)" @filter-change="handler('filterChange', $event)"
      @selection-change="handler('selectionChange', $event)">
      <el-table-column type="selection" width="40" v-if="tableData.showSelection" />
      <el-table-column type="index" label="序号" width="55" v-if="tableData.showIndex">
        <template #default="scope">
          {{ scope.$index + 1 + (tableData.pageSize * (tableData.pageNo - 1)) }}
        </template>
      </el-table-column>
      <template v-for="column in tableData.gridColumnList">
        <el-table-column v-if="column.visible && column.display && column.tagColumn" :label="column.fieldLabel"
          :key="column.field" :property="column.field">
          <template #default="scope">
            <el-tag v-for="(stag) in scope.row.tagList" :type="stag.color" class="mr-5" :key="stag.id" effect="dark"
              round closable :disable-transitions="false"
              @close="handler('removeTag', { row: scope.row, column: column, tag: stag }, $event)">
              {{ stag.name }}
            </el-tag>
            <el-popover v-if="scope.row.disableAddTag == null || scope.row.disableAddTag === false" trigger="click"
              v-model:visible="scope.row.popoverVisible" :width="300" @show="handler('tagPopoverShow', column, $event)">
              <template #reference>
                <el-button class="" size="small" @click="handler('showTags', scope.row, $event)" circle>
                  <el-icon>
                    <Plus />
                  </el-icon>
                </el-button>
              </template>
              <el-checkbox-group v-model="tableData.selectTags" size="small">
                <el-checkbox v-for="(tag) in tableData.tagList" :label="tag.id" border class="mb-10 mr-10">
                  <div class="ds-fx ai-c">
                    <div class="mr-5" style="width:14px;height:14px;"
                      :style="'background-color:var(--el-color-' + tag.color + ');'">&nbsp;</div>
                    <div class="">{{ tag.name }}</div>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
              <div style="text-align: right; margin: 10px 0px 0px 0px;">
                <el-button size="small" text @click="scope.row.popoverVisible = false">取消</el-button>
                <el-button size="small" type="primary"
                  @click="handler('addTagSubmit', { column: column, row: scope.row }, $event)">确定</el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column v-else-if="column.visible && column.display" :property="column.field" :key="column.field"
          :label="column.fieldLabel" :sortable="column.sortable ? 'custom' : false" :show-overflow-tooltip="true"
          :width="column.autoFillWidth ? 'auto' : column.width" :filters="column.filterColumn ? column.filters : null"
          :column-key="column.targetField"></el-table-column>
      </template>
      <slot name="operationColumn"></slot>
    </el-table>
    <el-pagination v-model:currentPage="tableData.pageNo" :page-size="tableData.pageSize"
      :page-sizes="[13, 30, 50, 100]" :disabled="false" :background="true"
      layout="sizes,total,->, prev, pager, next, jumper" :total="tableData.rowCount"
      @size-change="handler('sizeChange', $event)" @current-change="handler('currentChange', $event)" />
  </div>
</template>

<script lang="ts">
    import { defineComponent, PropType, ref,reactive, watch } from 'vue';
    import {ElMessageBox, ElTable} from 'element-plus';
    import { ClickOutside as vClickOutside } from 'element-plus';
    import util from '@dscloud/utils/util'
    import dsmain from '@dscloud/api/dsmain';
    export default defineComponent({
        name: 'DsTable',
        props: {
          showSelection: {//显示选择框
            type: Boolean,
            default: true
          },
          showIndex: {//显示序号
            type: Boolean,
            default: true
          },
          lazy: {//懒加载
            type: Boolean,
            default: false
          },
          load:{//懒加载方法
            type: Function,
            default: false
          },
          treeProps:{//树对应的属性
            type:Object,
            default: { children: 'children', hasChildren: 'hasChildren' }
          },
          fixedFilters: {//固定条件
            type: Array,
            default: []
          },
          filters: {//查询条件
            type: Array,
            default: []
          },
          fiexedOrders: {//固定排序
            type: Array,
            default: []
          },
          orders: {//排序
            type: Array,
            default: []
          },
          includeFields: [],//包含输出字段
          excludeFields: [],//排除输出字段
          fields: [],//返回结果字段
          limit: {//限制查询记录数量
            type: Number,
            default: 0
          },
          pageSize: {//每页显示记录数
            type: Number,
            default: 13
          },
          pageNo: {//页号
            type: Number,
            default: 1
          },
          queryMetaPageFun: {//列头查询方法
            type: Function,
            default: false
          },
          queryPageInfoFun: {//分页查询方法
            type: Function,
            default: false
          },
          options:{//扩展分页查询属性
            type:Object,
          },
          dsTableBarRef: null
        },
        emits: [],
        setup(props:any, context) {
            const tableRef = ref();
            const tableData:any = reactive({
              showSelection: props.showSelection,
              showIndex: props.showIndex,
              gridColumnList: null,
              entityList: null,
              pageCount: 0,
              pageNo: props.pageNo,
              pageSize: props.pageSize,
              rowCount: 0,
              loading: false,
              tagPopoverVisible:false,
              tagList:[],
              selectTags:[]
            });
            const columnFilters:any = [];//表格列头条件
            const columnOrders:any = [];//表格列排序
            let otherFilters:any = [];//其他条件
            //region 数据监听、事件处理
            const handler = (command:string,data:any,event:any) => {
                switch (command) {
                    case "sizeChange":
                        tableData.pageSize = data;
                        loadData();
                        break;
                    case "currentChange":
                        loadData();
                        break;
                    case "sortChange":
                        if(data.column){
                            let item:any = columnOrders.find(obj=>obj.field===data.column.columnKey);
                            if(item){
                                item.direction = data.order==="ascending"?"asc":"desc";
                            }else{
                                columnOrders.push({"field":data.column.columnKey,"direction":data.order==="ascending"?"asc":"desc"});
                            }
                            loadData();
                        }
                        break;
                    case "filterChange":
                        if(data==null)return;
                        Object.keys(data).forEach((field) => {
                            if(data[field]&&data[field].length>0){
                                let item:any = columnFilters.find(obj=>obj.key===field);
                                if(item){
                                    item.data = {"$in":data[field]};
                                }else {
                                    columnFilters.push({key: field, data: {"$in": data[field]}});
                                }
                            }else{
                                let index = columnFilters.findIndex(obj=>obj.key===field);
                                columnFilters.splice(index,1);
                            }
                        });
                        loadData();
                        break;
                    case "selectionChange":
                        if(props.dsTableBarRef){
                            props.dsTableBarRef.showBatchBar(data.length>0);
                        }
                        break;
                  case "tagPopoverShow":
                    if(!data) return;
                    if(tableData.tagList.length>0)return;
                    dsmain.getTagList(data.tagType,data.dataRange).then((res:any)=>{
                      if(res&&res.length>0){
                        tableData.tagList = res;
                      }
                    });
                    break;
                  case "showTags":
                    tableData.selectTags=data.tagIdList||[];
                    data.popoverVisible = !data.popoverVisible;
                    break;
                  case "addTagSubmit":
                    if(!data||tableData.selectTags.length==0) return;
                    debugger;
                    dsmain.subscribeTag(data.row.id,data.column.tagType,tableData.selectTags).then((res:any)=>{
                      data.row.popoverVisible = false;
                      loadData();
                    });
                    break;
                  case "removeTag":
                    ElMessageBox.alert('确认移除标签？', '提示', {
                      confirmButtonText: 'OK',
                      callback: (action:string) => {
                        if(action=="confirm"){
                          const tagIds:any = [data.tag.id];
                          dsmain.unsubscribeTag(data.row.id,data.column.tagType,tagIds).then((res) => {
                            if(res&&res.deletedCount>0){
                              loadData();
                            }
                          });
                        }
                      },
                    })
                    break;
                }
            }
            //endregion
            //region 方法
            const getParams = () =>{
                //criteria
                let criteria:any = {key:"$and", items:[]};
                criteria.items = criteria.items.concat(props.fixedFilters);
                let filters = util.deepClone(props.filters);
                columnFilters.forEach((cf:any,idx:number,arr:[])=>{
                    let item = filters.find(obj=>obj.key===cf.key);
                    if(item) item.data = cf.data;
                    else filters.push(cf);
                });
                criteria.items = criteria.items.concat(filters);
                criteria.items = criteria.items.concat(otherFilters);//其他条件
                if(criteria.items.length==0)criteria=null;
                //sort
                let sort = {orders:[]};
                sort.orders = sort.orders.concat(props.fiexedOrders);
                let orders = util.deepClone(props.orders);
                columnOrders.forEach((co:any,idx:number,arr:[])=>{
                    let item = orders.find(obj=>obj.field===co.field);
                    if(item) item.direction = co.direction;
                    else orders.push(co);
                });
                sort.orders = sort.orders.concat(orders);
                let params = {
                  criteria: criteria,
                  sort: sort,
                  includeFields: props.includeFields,
                  excludeFields: props.excludeFields,
                  fields: props.fields,
                  limit: props.limit,
                  pageSize: tableData.pageSize,
                  pageNo: tableData.pageNo,
                  options: props.options
                }
                return params;
            }
            const loadMetaPage = () =>{
                typeof(props.queryMetaPageFun)==="function"&&props.queryMetaPageFun().then((res:any) => {
                  if (res&&res.gridColumnList) {
                        tableData.gridColumnList = res.gridColumnList;
                        loadData();
                    }
                });
            }
            const loadData = () =>{
                const params = getParams();
                tableData.loading = true;
                typeof(props.queryPageInfoFun)==="function"&&props.queryPageInfoFun(params).then((res:any) => {
                    if (res) {
                        tableData.entityList = res.entityList;
                        tableData.pageCount = res.pageCount;
                        tableData.pageNo = res.pageNo;
                        tableData.pageSize = res.pageSize;
                        tableData.rowCount = res.rowCount;
                        tableData.loading = false;
                    }
                });
            }
            const reloadData = (filters:any,fixedFilters:Array<any>=[]) => {
                filters && (otherFilters = filters);
                fixedFilters.forEach((f, idx, arr) => {
                    let item = props.fixedFilters.find(obj => obj.key === f.key);
                    if (item) item.data = f.data;
                    else props.fixedFilters.push(f);
                });
                loadData();
            }
            /**
             * 获取选中行
             */
            const getSelectionRows = ()=> {
                return tableRef.value.getSelectionRows();
            }
            const setGridColumnList = (gridColumnList:Array<any>=[])=>{
                tableData.gridColumnList = gridColumnList;
                tableRef.value.doLayout();
            }
            //endregion
            loadMetaPage();
            return { tableData,tableRef,handler,reloadData,getSelectionRows,setGridColumnList };
        },
    });
</script>

<style lang="scss" scoped>
.ds-table-panel {
  position: relative;
  z-index: 1;
  background-color: white;
  padding: 18px 20px;

  .el-pagination {
    margin-top: 15px;
  }
}
</style>
