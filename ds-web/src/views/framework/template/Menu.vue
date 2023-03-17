<template>
<!--    <div class="menu-wrapper">
        <el-breadcrumb separator-icon="ArrowRight" class="mb-20">
            <el-breadcrumb-item :to="{ path: '/' }">运维中心</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="ds-card ds-fx">
            <div class="w-350 bg-white br-2">
                <el-scrollbar>
                    <el-tree :data="treeDataSource" node-key="id" default-expand-all :expand-on-click-node="false" class="p-20">
                        <template #default="{ node, data }">
                            <span class="ds-tree-node">
                              <el-icon class="mr-3"><component :is="ElIcons[data.iconName]"></component></el-icon>
                              <span class="label">{{node.label }}</span>
                              <span class="tools">
                                  <el-link icon="CirclePlusFilled" :underline="false"></el-link>
                                  <el-link icon="DeleteFilled" :underline="false"></el-link>
                              </span>
                            </span>
                        </template>
                    </el-tree>
                </el-scrollbar>
            </div>
            <div class="ml-20 bg-white fx-size-1 br-2">
                <el-scrollbar>
                    <el-form ref="form" label-width="auto" label-position="left" style="padding:30px;">
                        <el-form-item label="菜单编码" required>
                            <el-input class="w-300"/>
                        </el-form-item>
                        <el-form-item label="菜单名称" required>
                            <el-input class="w-300"/>
                        </el-form-item>
                        <el-form-item label="打开方式" required>
                            <el-radio-group v-model="radio1">
                                <el-radio-button label="当前窗口打开" />
                                <el-radio-button label="新窗口打开" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="可见范围" required>
                            <el-checkbox-group v-model="checkedCities">
                                <el-checkbox label="PC" />
                                <el-checkbox label="小程序" />
                                <el-checkbox label="H5" />
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="PC地址" required>
                            <el-input />
                        </el-form-item>
                        <el-form-item label="小程序地址" required>
                            <el-input />
                        </el-form-item>
                        <el-form-item label="H5地址" required>
                            <el-input />
                        </el-form-item>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="菜单图标" required>
                                    <ds-icon-select v-model="formData.iconName"></ds-icon-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="图标颜色" required>
                                    <el-color-picker />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
            </div>
        </div>
    </div>-->
</template>

<script lang="ts" setup>
    /*import { ref,reactive } from 'vue'
    import * as ElIcons from '@element-plus/icons-vue'
    import DsIconSelect from '../../../components/forms/DsIconSelect.vue';
    const formData = reactive({
        iconName : "Back"
    });
    interface Tree {
        id: number
        label: string
        iconName: string
        children?: Tree[]
    }
    const treeDataSource = ref<Tree[]>([
        {
            id: 0,
            label: '全部菜单',
            iconName: 'Menu',
            children: [
                {
                    id: 1,
                    label: '办公',
                    iconName:'Menu',
                    children: [
                        {
                            id: 9,
                            label: '信息发布',
                        },
                        {
                            id: 10,
                            label: '通知公告',
                        },{
                            id: 9,
                            label: '审批',
                        },
                        {
                            id: 10,
                            label: '会议',
                        }
                    ],
                },
                {
                    id: 2,
                    label: '教务'
                },
                {
                    id: 3,
                    label: '招生'
                },
                {
                    id: 4,
                    label: '收费'
                },
                {
                    id: 5,
                    label: '运维'
                }
            ],
        }
    ])*/
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
        }
    }
</style>
