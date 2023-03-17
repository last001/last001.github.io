<template>
    <div class="ds-wrapper menu-wrapper">
        <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
            <el-breadcrumb-item :to="{ path: '/' }">系统服务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="ds-card ds-fx">
            <div class="w-350 bg-white br-2">
                <el-scrollbar>
                    <el-tree ref="treeRef" :props="treeProps" node-key="id" current-node-key="0" @current-change="handler('treeCurrentChange',$event)"
                             :allow-drop="allowDrop" :allow-drag="allowDrag" draggable @node-drag-end="treeDragEnd" :lazy="true" :load="loadMenuTreeData"
                             highlight-current :expand-on-click-node="true" :default-expanded-keys="['0']" class="p-20">
                        <template #default="{ node, data }">
                            <span class="ds-tree-node">
                              <el-icon class="mr-3" :color="data.iconColor"><component :is="data.iconCss=='IconMenu'?'IconMenu':ElIcons[data.iconCss]"></component></el-icon>
                              <span class="label">{{data.name }}</span>
                              <span class="tools">
                                  <el-link v-if="node.level>2" icon="CirclePlusFilled" type="info" :underline="false" title="增加" @click.stop="handler('addNode',data,node)"></el-link>
                                  <el-link v-if="node.level>3" icon="DeleteFilled" type="info" :underline="false" title="删除" @click.stop="handler('removeNode',data,node)"></el-link>
                              </span>
                            </span>
                        </template>
                    </el-tree>
                </el-scrollbar>
            </div>
            <div class="ml-20 bg-white fx-size-1 br-2 ps-r">
                <el-scrollbar style="height:calc(100% - 68px);">
                    <el-form v-if="options.formVisible" ref="formRef" :model="formData" :rules="formRules" label-width="auto" label-position="left" style="padding:30px;">
                        <el-form-item prop="code" label="菜单编码" required>
                            <el-input class="w-300" v-model="formData.code"/>
                        </el-form-item>
                        <el-form-item label="菜单名称" prop="name" required>
                            <el-input class="w-300" v-model="formData.name"/>
                        </el-form-item>
                        <el-form-item label="打开方式" prop="openMode" required>
                            <el-radio-group v-model="formData.openMode">
                                <el-radio-button label="self">当前窗口打开</el-radio-button>
                                <el-radio-button label="blank">新窗口打开</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="可见范围" prop="scope" required>
                            <el-checkbox-group v-model="formData.scope">
                                <el-checkbox label="pc" >PC端</el-checkbox>
                                <el-checkbox label="mobile" >移动端</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item v-if="formData.scope.includes('pc')" label="PC端地址" prop="pcUrl">
                            <el-input v-model="formData.pcUrl"/>
                        </el-form-item>
                        <el-form-item v-if="formData.scope.includes('mobile')" label="移动端地址" prop="mobileUrl">
                            <el-input v-model="formData.mobileUrl"/>
                        </el-form-item>
                      <el-form-item label="地址参数" prop="urlParams">
                        <el-input v-model="formData.urlParams" placeholder="示例：a=1&b=2&c=3"/>
                      </el-form-item>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="菜单图标" prop="iconCss" required>
                                    <ds-icon-select v-model="formData.iconCss"></ds-icon-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="图标颜色" prop="iconColor" required>
                                    <el-color-picker v-model="formData.iconColor"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="状态" prop="enableFlag" required>
                            <el-radio-group v-model="formData.enableFlag">
                                <el-radio-button label="1" >启用</el-radio-button>
                                <el-radio-button label="0" >禁用</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <div v-else style="height:calc(100vh - 260px);" class="ds-fx ai-c jc-c"><el-empty description="请选择菜单后再进行编辑" /></div>
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
  name:"Menu",
  path: "/framework/org/menu"
}
</script>

<script lang="ts" setup>
    import { ref,reactive,nextTick } from 'vue'
    import {ElMessage,ElMessageBox,FormInstance,FormRules} from 'element-plus'
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
        iconCss:"Document",
        iconColor : "",
        scope:["pc"],
        openMode:"self",
        pcUrl:"",
        mobileUrl:"",
        enableFlag:"1",
        urlParams:""
    });
    const formRules = reactive<FormRules>({
        code: [
            {
                required: true,
                message: '请输入模块编码',
                trigger: ['blur','change'],
            },
        ],
        name: [
            {
                required: true,
                message: '请输入模块名称',
                trigger: ['blur','change'],
            },
        ],
        /*pcUrl: [
            {
                required: true,
                message: '请输入PC端地址',
                trigger: ['blur','change'],
            },
        ],
        mobileUrl: [
            {
                required: true,
                message: '请输入移动端地址',
                trigger: ['blur','change'],
            },
        ],*/
        openMode: [
            {
                required: true,
                message: '请选择打开方式',
                trigger: ['blur','change'],
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
    });
    let treeData = ref();
    const treeRef = ref();
    const treeProps = {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf',
    }
    //region 事件、方法
    const handler = (command:string,data:any,event:any)=> {
        switch (command) {
            case "addNode":
                var node = {
                    id:null,
                    moduleId:data.moduleId||data.id,
                    parentId: data.moduleId?data.id:"0",
                    code: util.generateGuid(8),
                    hierarchy:data.hierarchy+1,
                    name:"新菜单",
                    iconCss:"Document",
                    iconColor : "",
                    openMode:"self",
                    scope:["pc"],
                    enableFlag:"1",
                    leaf:true,
                    nodeType:"menu",
                };
                dsmain.insertMenu(node).then((res:any) => {
                    if(res){
                        let parentNode = event;
                        node.id = res.id;
                        if(parentNode.loaded) {
                            treeRef.value.append(node, parentNode);
                            treeRef.value.setCurrentKey(node.id,false);
                            formData.value = node;
                            options.formVisible=true;
                        }else{
                            parentNode.isleaf = false;
                            parentNode.expand();
                        }
                    }
                });
                break;
            case "removeNode":
                ElMessageBox.alert('确认删除？', '提示', {
                    confirmButtonText: 'OK',
                    callback: (action:string) => {
                        if(action=="confirm"){
                            dsmain.removeMenu(data.id).then((res:any) => {
                                if(res&&res.deletedCount>0){
                                    const parent = event.parent;
                                    const childNodes = parent.childNodes;
                                    const index = childNodes.findIndex((d:any) => d.data.id === data.id)
                                    if(index>0){
                                        treeRef.value.setCurrentKey(childNodes[index-1].data.id);
                                        handler("treeCurrentChange",childNodes[index-1].data,null);
                                    }else{
                                        treeRef.value.setCurrentKey(parent.data.id);
                                        handler("treeCurrentChange",parent.data,null);
                                    }
                                    treeRef.value.remove(data);
                                }
                            });
                        }
                    },
                })
                break;
            case "treeCurrentChange":
                if(data.nodeType==="menu"){
                    options.formVisible=true;
                    formData.value = util.deepClone(data);
                } else options.formVisible=false
                break;
        }
    }
    const formSubmit = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        await formEl.validate((valid, fields) => {
            if (valid) {
                dsmain.updateMenu(formData.value).then((res:any) => {
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
    const loadMenuTreeData = (node: any, resolve: (data:object[]) => void)=>{
        if (node.level === 0) {
            return resolve([{id:"0",name:"全部菜单",iconCss:"Menu",children:[],hierarchy:0}]);
        }
        if(node.level < 3){//展开模块树
            dsmain.getModuleListByPid(node.data.id).then((res:any) => {
                if(res){
                    res.forEach((item:any,idx:number)=>{
                        item["nodeType"] = "module";
                    });
                    resolve(res);
                }
            });
        }else{
            let moduleId = node.data.nodeType==="module"?node.data.id:node.data.moduleId;
            let menuPid = node.data.nodeType==="module"?"0":node.data.id;
            dsmain.getMenuListByPid(moduleId,menuPid).then((res:any) => {
                if(res){
                    res.forEach((item:any,idx:number)=>{
                        item["nodeType"] = "menu";
                        if(item.subNumber===0){
                            item["leaf"] = true;
                        }
                    });
                    resolve(res);
                }
            });
        }
    }
    const allowDrop = (draggingNode: any, dropNode: any, type: any) => {
        if(dropNode.level<3)return false;
        if(dropNode.level==3&&(type==="prev"||type==="next"))return false;
        return true;
    }
    const allowDrag = (draggingNode: any) => {
        if(draggingNode.level>3)return true;
        return false;
    }
    const treeDragEnd = (draggingNode: any, dropNode: any, dropType: any, ev: any) => {
        let data = {
            id: draggingNode.data.id,
            ownerId:dropNode.data.nodeType==="module"?dropNode.data.id:dropNode.data.moduleId,//模块Id
            parentId: dropType === "inner" ? dropNode.data.id : dropNode.data.parentId,
            referenceId: dropType !== "inner" ? dropNode.data.id : "",
            direction: dropType === "before" ? "1" : "2"
        };
        if(dropNode.data.nodeType==="module"&&dropType === "inner"){
            data.parentId = "0";
        }
        dsmain.adjustMenu(data).then((res:any) => {
            if(res.modifiedCount>0){
                dropNode.expand();
            }else{
                ElMessage.error("顺序调整失败");
            }
        });
    }
    //endregion
</script>

<style lang="scss" scoped>
    .menu-wrapper{
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
