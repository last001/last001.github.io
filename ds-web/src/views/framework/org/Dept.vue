<template>
    <div class="ds-wrapper module-wrapper">
        <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
            <el-breadcrumb-item :to="{ path: '' }">用户/权限</el-breadcrumb-item>
            <el-breadcrumb-item>部门管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="ds-card ds-fx">
            <div class="w-350 bg-white br-2">
                <el-scrollbar>
                    <el-tree ref="treeRef" :data="treeData" node-key="id" current-node-key="0"
                        @current-change="handler('treeCurrentChange', $event)" :allow-drop="allowDrop" allow-drag
                        draggable @node-drag-end="treeDragEnd" :default-expanded-keys="['0']" highlight-current
                        class="p-20">
                        <template #default="{ node, data }">
                            <span class="ds-tree-node">
                                <el-icon class="mr-3" :color="data.iconColor">
                                    <component :is="
                                        data.iconCss == 'IconMenu'
                                            ? 'IconMenu'
                                            : ElIcons[data.iconCss]
                                    "></component>
                                </el-icon>
                                <span class="label">{{ data.name }}</span>
                                <span class="tools">
                                    <el-link v-if="data.hierarchy < 2" icon="CirclePlusFilled" type="info"
                                        :underline="false" title="增加" @click.stop="handler('addNode', data, node)">
                                    </el-link>
                                    <el-link v-if="data.hierarchy > 0" icon="DeleteFilled" type="info"
                                        :underline="false" title="删除" @click.stop="handler('removeNode', data, node)">
                                    </el-link>
                                </span>
                            </span>
                        </template>
                    </el-tree>
                </el-scrollbar>
            </div>
            <div class="ml-20 bg-white fx-size-1 br-2 ps-r">
                <el-scrollbar style="height: calc(100% - 68px)">
                    <el-form ref="formRef" v-if="options.formVisible" :model="formData" :rules="formRules"
                        label-width="auto" label-position="left" style="padding: 30px">

                        <el-form-item label="部门Id" prop="id">
                            <el-input class="w-300" v-model="formData.id" disabled />
                        </el-form-item>

                        <el-form-item label="所属组织" prop="organisationData">
                            <el-select class="w-300" v-model="organisation" clearable multiple>
                                <el-option v-for="item in organisationData" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="部门编码" prop="code">
                            <el-input class="w-300" v-model="formData.code" />
                        </el-form-item>

                        <el-form-item label="部门名称" prop="name">
                            <el-input class="w-300" v-model="formData.name" />
                        </el-form-item>

                        <el-form-item label="负责人" prop="headData">
                            <el-select class="w-300" v-model="head" clearable multiple>
                                <el-option v-for="item in headData" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="分管领导" prop="leadershipData">
                            <el-select class="w-300" v-model="leadership" clearable>
                                <el-option v-for="item in leadershipData" :key="item.id" :label="item.fullName"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="部门角色" prop="roleData">
                            <el-select class="w-300" v-model="role" clearable multiple>
                                <el-option v-for="item in roleData" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>

                    <div v-else style="height: calc(100vh - 260px)" class="ds-fx ai-c jc-c">
                        <el-empty description="请选择部门后再进行编辑" />
                    </div>
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
    name: "Module",
    path: "/framework/org/dept",
};
</script>

<script  lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import * as ElIcons from "@element-plus/icons-vue";
import { Menu as IconMenu } from "@element-plus/icons-vue";
import dsorg from "@dscloud/api/dsorg";
import util from "@dscloud/utils/util";
const options = reactive({
    formVisible: false,
});
const formRef = ref<FormInstance>();
// 数据
const formData = ref({
    id: "",
    code: "",
    name: "",
    headData: [],
    leadershipData: {},
    organisationData: [],
    roleData: [],
    children: []
});
// 验证规则
const formRules = reactive<FormRules>({
    id: [
        {
            required: true,
            message: "请输入部门Id",
            trigger: ["blur"],
        },
    ],
    // organisationData: [
    //     {
    //         required: true,
    //         message: "请选择所属组织",
    //         trigger: ["change"],
    //     },
    // ],
    code: [
        {
            required: true,
            message: "请输入部门编码",
            trigger: ["blur"],
        },
    ],
    name: [
        {
            required: true,
            message: "请输入部门名称",
            trigger: ["blur"],
        },
    ],
    // headData: [
    //     {
    //         // required: true,
    //         message: "请选择负责人",
    //         trigger: ["change"],
    //     },
    // ],
    // leadershipData: [
    //     {
    //         // required: true,
    //         message: "请选择分管领导",
    //         trigger: ["change"],
    //     },
    // ],
    // roleData: [
    //     {
    //         // required: true,
    //         message: "请选择部门角色",
    //         trigger: ["change"],
    //     },
    // ],
});
// 以下属性为model绑定的值
const head = ref([]);
const organisation = ref([]);
const leadership = ref([]);
const role = ref([]);
// 以下属性为下拉框数据
const headData = ref()
const organisationData = ref()
const roleData = ref()
const leadershipData = ref();
let treeData = ref();
const treeRef = ref();
//region 事件、方法
const handler = (command, data, event?) => {
    switch (command) {
        case "addNode":
            var node = {
                id: null,
                parentId: data.id === null ? "0" : data.id,
                code: util.generateGuid(8),
                hierarchy: data.hierarchy + 1,
                name: "新部门",
                headData: [],
                organisationData: [],
                leadershipData: null,
                roleData: [],
            };
            console.log("node===>", node);
            dsorg.insertDept(node).then(async (res) => {
                if (res) {
                    node.id = res.id;
                    if (!data.children) {
                        data.children = [];
                    }
                    data.children.push(node);
                    treeData.value = [...treeData.value];
                    await nextTick();
                    treeRef.value.setCurrentKey(node.id);
                    //  formData.value = node;
                    // options.formVisible = true;
                }
            });
            break;
        case "removeNode":
            ElMessageBox.confirm('确认删除？', '提示', {
                confirmButtonText: "确定",
                cancelButtonText: '取消',
            }).then(() => {
                console.log("=======");
                dsorg.removeDept(data.id).then((res) => {
                    if (res && res.deletedCount > 0) {
                        const parent = event.parent;
                        const children: Tree[] = parent.data.children || parent.data;
                        const index = children.findIndex((d) => d.id === data.id);
                        children.splice(index, 1);
                        treeData.value = [...treeData.value];
                        ElMessage.success('删除成功')
                    }
                });
            }).catch(() => {
                ElMessage.error("取消删除");
            })
            // break
            // ElMessageBox.alert("确认删除？", "提示", {
            //     confirmButtonText: "OK",
            //     callback: (action) => {
            //         if (action == "confirm") {
            //             dsmain.removeDept(data.id).then((res) => {
            //                 if (res && res.deletedCount > 0) {
            //                     const parent = event.parent;
            //                     const children: Tree[] = parent.data.children || parent.data;
            //                     const index = children.findIndex((d) => d.id === data.id);
            //                     children.splice(index, 1);
            //                     treeData.value = [...treeData.value];
            //                 }
            //             });
            //         }
            //     },
            // });
            break;
        // 点击节点时触发事件
        case "treeCurrentChange":
            if (data.id === "0") options.formVisible = false;
            else options.formVisible = true;
            formData.value = util.deepClone(data);
            // delete formData.value.children
            console.log("formDatavalue.===>", formData.value);
            break;
    }
};
const formSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    // 编辑时删除children

    delete formData.value.children
    // 暂无所属组织数据
    formData.value.organisationData = null
    // formData.value.parentId : formData.value.id ? formData.value.id : "0",
    // 暂无分管领导数据
    formData.value.leadershipData = null
    // 暂无负责人数据
    formData.value.headData = null
    // 暂无部门角色数据

    formData.value.roleData = null


    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log("formData.value===>", formData.value);
            dsorg.updateDept(formData.value).then((res) => {
                if (res) {
                    let node = treeRef.value.getCurrentNode();
                    Object.assign(node, formData.value);
                    ElMessage.success("提交成功");
                } else if (res == null) {
                    ElMessage.success("提交成功");
                } else {
                    ElMessage.error("提交失败");

                }
            });
        }
    });
};
const loadTreeData = () => {
    let defaultNode = {
        id: "0",
        name: "全部部门",
        iconCss: "Menu",
        children: [],
        // 层级
        hierarchy: 0,
    };
    dsorg.getDeptList().then((res) => {
        if (res) {
            console.log("res===>", res);
            defaultNode.children = res;
            treeData.value = [defaultNode];
        }
    });
};
const allowDrop = (draggingNode: any, dropNode: any, type: any) => {
    if (type === "inner") {
        return dropNode.data.hierarchy < 2 && draggingNode.childNodes.length === 0;
    } else {
        return dropNode.data.id !== "0" && dropNode.data.hierarchy <= 2;
    }
};
const treeDragEnd = (
    draggingNode: any,
    dropNode: any,
    dropType: any
) => {
    let data = {
        id: draggingNode.data.id,
        parentId: dropType === "inner" ? dropNode.data.id : dropNode.data.parentId,
        referenceId: dropType !== "inner" ? dropNode.data.id : "",
        direction: dropType === "before" ? "1" : "2",
    };
    console.log("data=>", data);

    dsorg.adjustDept(data).then((res) => {
        if (res.modifiedCount > 0) {
        }
    });
};
loadTreeData();
</script>

<style lang="scss" scoped>
.module-wrapper {
    .ds-card {
        height: calc(100vh - 55px - 76px);
    }

    .ds-tree-node {
        display: flex;
        flex: 1;
        align-items: center;

        .label {
            flex: 1;
            display: block;
            max-width: 10em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            /*超出部分用...代替*/
        }

        .tools {
            display: none;
            padding-right: 5px;

            .el-link {
                font-size: 16px;
                padding: 0px 5px;
            }
        }

        &:hover .tools {
            display: block;
        }
    }

    .el-tree {
        background-color: transparent;

        .el-tree-node__content:hover .ds-tree-node .tools {
            display: block;
        }

        .el-tree-node.is-drop-inner>.el-tree-node__content>.ds-tree-node {
            color: white;
            background-color: var(--el-color-primary);
        }
    }
}
</style>
