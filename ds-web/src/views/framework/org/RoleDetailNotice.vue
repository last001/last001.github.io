<template>
    <el-tabs class="demo-tabs ml-15" label="通知模板权限">
        <el-tab-pane label="通知模板权限占位">
            <div class="mt-20  ml-15 mb-15  c-555">
                <el-tree :data="noticeData" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
                    :props="{ class: customNodeClass }" />
            </div>
        </el-tab-pane>
    </el-tabs>
</template>


<script lang="ts">
export default {
    name: "RoleDetailNotice",
};
</script>

<script lang="ts" setup>
import { ref, reactive, nextTick, onMounted } from "vue";
import type Node from 'element-plus/es/components/tree/src/model/node';
interface Tree {
    id: number
    label: string
    isPenultimate?: boolean
    children?: Tree[]
}
const customNodeClass = (data: Tree, node: Node) => {
    if (data.isPenultimate) {
        return 'is-penultimate'
    }
    return null
}
const noticeData: Tree[] = [
    {
        id: 1,
        label: 'Level one 1',
        isPenultimate: true,
        children: [
            {
                id: 9,
                label: 'Level three 1-1-1',
            },
            {
                id: 10,
                label: 'Level three 1-1-2',
                children: [
                    {
                        id: 9,
                        label: 'Level three 1-1-1',
                    },
                    {
                        id: 10,
                        label: 'Level three 1-1-2',
                        children: [
                            {
                                id: 9,
                                label: 'Level three 1-1-1-6',
                            },
                            {
                                id: 10,
                                label: 'Level three 1-1-2',
                            },

                        ],
                    },

                ],
            },


        ],
    },
    {
        id: 2,
        label: 'Level one 1',
        isPenultimate: true,
        children: [
            {
                id: 9,
                label: 'Level three 1-1-1',
            },
            {
                id: 10,
                label: 'Level three 1-1-2',
            },

        ],
    },
]
onMounted(() => {
    console.log("通知权限加载");
})
</script>