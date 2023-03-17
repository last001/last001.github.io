<template>
    <div class="ds-wrapper module-wrapper">
        <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
            <el-breadcrumb-item :to="{ path: '/' }">系统服务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>模块管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="ds-card ds-fx">
            <div class="w-350 bg-white br-2">
                <el-scrollbar>
                    <el-tree ref="treeRef" :data="treeData" node-key="id" current-node-key="0" @current-change="handler('treeCurrentChange',$event)"
                             :allow-drop="allowDrop" :allow-drag="allowDrag" draggable @node-drag-end="treeDragEnd"
                             :default-expanded-keys="['0']" highlight-current class="p-20">
                        <template #default="{ node, data }">
                            <span class="ds-tree-node">
                              <el-icon class="mr-3" :color="data.iconColor"><component :is="data.iconCss=='IconMenu'?'IconMenu':ElIcons[data.iconCss]"></component></el-icon>
                              <span class="label">{{data.name }}</span>
                              <span class="tools">
                                  <el-link v-if="data.hierarchy<2" icon="CirclePlusFilled" type="info" :underline="false" title="增加" @click.stop="handler('addNode',data,node)"></el-link>
                                  <el-link v-if="data.hierarchy>0" icon="DeleteFilled" type="info" :underline="false" title="删除" @click.stop="handler('removeNode',data,node)"></el-link>
                              </span>
                            </span>
                        </template>
                    </el-tree>
                </el-scrollbar>
            </div>
            <div class="ml-20 bg-white fx-size-1 br-2 ps-r">
                <el-scrollbar style="height:calc(100% - 68px);">
                    <el-form ref="formRef" v-if="options.formVisible" :model="formData" :rules="formRules" label-width="auto" label-position="left" style="padding:30px;">
                        <el-form-item label="模块编码" prop="code" required>
                            <el-input class="w-300" v-model="formData.code"/>
                        </el-form-item>
                        <el-form-item label="模块名称" prop="name" required>
                            <el-input class="w-300" v-model="formData.name"/>
                        </el-form-item>
                        <el-form-item label="可见范围" prop="scope" required>
                            <el-checkbox-group v-model="formData.scope">
                                <el-checkbox label="pc">PC端</el-checkbox>
                                <el-checkbox label="mobile">移动端</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="链接地址" prop="url" required>
                          <el-input v-model="formData.url"/>
                        </el-form-item>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="模块图标" prop="iconCss" required>
                                    <ds-icon-select v-model="formData.iconCss"></ds-icon-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="模块颜色" prop="iconColor" required>
                                    <el-color-picker v-model="formData.iconColor"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="可用状态" prop="enableFlag" required>
                            <el-radio-group v-model="formData.enableFlag">
                                <el-radio-button label="1">启用</el-radio-button>
                                <el-radio-button label="0">禁用</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <div v-else style="height:calc(100vh - 260px);" class="ds-fx ai-c jc-c"><el-empty description="请选择模块后再进行编辑" /></div>
                </el-scrollbar>
                <div class="ds-toolbar" v-if="options.formVisible">
                    <el-button type="primary" @click="formSubmit(formRef)">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
  name:"Module",
  path: "/framework/org/module"
}
</script>

<script lang="ts" setup>
    import { ref,reactive,nextTick } from 'vue'
    import {ElMessage, ElMessageBox, FormInstance,FormRules} from 'element-plus'
    import * as ElIcons from '@element-plus/icons-vue'
    import {Menu as IconMenu} from '@element-plus/icons-vue'
    import {DsIconSelect} from '@dscloud/components';
    import dsmain from '@dscloud/api/dsmain';
    import util from '@dscloud/utils/util';
    const options = reactive({
        formVisible:false
    });
    const formRef = ref<FormInstance>();
    const formData = ref({
        code:"",
        name:"",
        iconCss:"IconMenu",
        iconColor : "",
        scope:["pc"],
        url:"",
        enableFlag:true,
    });
    const formRules = reactive<FormRules>({
      code: [
        {
          required: true,
          message: '请输入模块编码',
          trigger: ['blur', 'change'],
        },
      ],
      name: [
        {
          required: true,
          message: '请输入模块名称',
          trigger: ['blur', 'change'],
        },
      ],
      iconColor: [
        {
          required: true,
          message: '请选择模块颜色',
          trigger: 'change',
        },
      ],
      scope: [
        {
          required: true,
          message: '请选择可见范围',
          trigger: 'change',
        },
      ],
      url: [
        {
          required: true,
          message: '请输入链接地址',
          trigger: ['blur', 'change'],
        },
      ],
    });
    let treeData = ref();
    const treeRef = ref();
    //region 事件、方法
    const handler = (command,data,event)=> {
        switch (command) {
            case "addNode":
                var node = {
                    id:null,
                    parentId: data.id,
                    code: util.generateGuid(8),
                    hierarchy:data.hierarchy+1,
                    name:"新模块",
                    iconCss:"IconMenu",
                    iconColor : "",
                    scope:["pc"],
                    enableFlag:"1"
                };
                dsmain.insertModule(node).then(async (res) => {
                    if(res){
                        node.id = res.id;
                        if (!data.children) {data.children = []}
                        data.children.push(node);
                        treeData.value = [...treeData.value];
                        await nextTick();
                        treeRef.value.setCurrentKey(node.id);
                        formData.value = node;
                        options.formVisible=true;
                    }
                });
                break;
            case "removeNode":
                ElMessageBox.alert('确认删除？', '提示', {
                    confirmButtonText: 'OK',
                    callback: (action) => {
                        if(action=="confirm"){
                            dsmain.removeModule(data.id).then((res) => {
                                if(res&&res.deletedCount>0){
                                    const parent = event.parent
                                    const children: Tree[] = parent.data.children || parent.data
                                    const index = children.findIndex((d) => d.id === data.id)
                                    children.splice(index, 1)
                                    treeData.value = [...treeData.value]
                                }
                            });
                        }
                    },
                })
                break;
            case "treeCurrentChange":
                if(data.id==="0")options.formVisible=false
                else options.formVisible=true
                formData.value = util.deepClone(data);
                break;
        }
    }
    const formSubmit = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        await formEl.validate((valid, fields) => {
            if (valid) {
                dsmain.updateModule(formData.value).then((res) => {
                    if(res&&res.modifiedCount>0){
                        let node = treeRef.value.getCurrentNode();
                        Object.assign(node,formData.value);
                        ElMessage.success("提交成功");
                    }else{
                        ElMessage.error("提交失败");
                    }
                });
            }
        })
    }
    const loadTreeData = ()=>{
        let defaultNode = {id:"0",name:"全部模块",iconCss:"Menu",children:[],hierarchy:0};
        dsmain.getModuleTreeData().then((res) => {
            if(res){
                defaultNode.children = res;
                treeData.value = [defaultNode];
            }
        });
    }
    const allowDrop = (draggingNode: Node, dropNode: Node, type: DropType) => {
        if(type==="inner"){
            return dropNode.data.hierarchy<2&&draggingNode.childNodes.length===0;
        }else{
            return dropNode.data.id!=="0"&&dropNode.data.hierarchy<=2;
        }
    }
    const allowDrag = (draggingNode: Node) => {
        return true;
    }
    const treeDragEnd = (draggingNode: Node, dropNode: Node, dropType: DropType, ev: DragEvents) => {
        let data = {
            id: draggingNode.data.id,
            parentId: dropType === "inner" ? dropNode.data.id : dropNode.data.parentId,
            referenceId: dropType !== "inner" ? dropNode.data.id : "",
            direction: dropType === "before" ? "1" : "2"
        };
        dsmain.adjustModule(data).then((res) => {
            if(res.modifiedCount>0){
            }else{
                ElMessage.error("顺序调整失败");
            }
        });
    }
    //endregion
    loadTreeData();
</script>

<style lang="scss" scoped>
    .module-wrapper{
        .ds-card{height: calc(100vh - 55px - 76px);}
        .ds-tree-node{
            display: flex;flex:1;align-items: center;
            .label{flex:1}
            .tools{
                display: none;padding-right:5px;
                .el-link{font-size:16px;padding:0px 5px;}
            }
            &:hover .tools{display: block}
        }
        .el-tree{
            background-color: transparent;
            .el-tree-node__content:hover .ds-tree-node .tools{display: block}
            .el-tree-node.is-drop-inner>.el-tree-node__content>.ds-tree-node{
                color:white;
                background-color: var(--el-color-primary)
            }
        }
    }
</style>
