<template>
    <el-tabs type="border-card">
        <el-tab-pane label="工作台">
            <div class="mt-20  c-555">
                <el-row>
                    <el-col v-for="item in workLIst" :span="4" style="padding-right:30px">
                        <el-card :body-style="{ padding: '0px' }">
                            <el-checkbox-group v-model="checkAllWorkLIst" @change="handleCheckWorkChange">
                                <el-checkbox :key="item" :label="item">{{}}</el-checkbox>
                            </el-checkbox-group>
                            {{ }}
                            <div style="padding: 14px">
                                <span>{{  item  }}</span>
                                <div class="bottom">
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <div class="mt-20  c-555">
                    <el-checkbox @change="handleCheckWorkAllChange" v-model="checkAllWork" label="全选" border
                        style="margin-right:10px">
                    </el-checkbox>
                    <el-button type="primary" @click="" class="save">保存</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="工作台组件">
            <div class="mt-20  c-555">
                <el-row>
                    <el-col v-for="item in componentList" :key="item" :span="4" style="padding-right:30px">
                        <el-card :body-style="{ padding: '0px' }">
                            <el-checkbox-group v-model="checkAllComponentList" @change="handleCheckCopmonentChange">
                                <el-checkbox :key="item" :label="item">{{}}</el-checkbox>
                            </el-checkbox-group>
                            {{ }}
                            <div style="padding: 14px">
                                <span>{{  item  }}</span>
                                <!-- <div class="bottom">
                                </div> -->
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <div class="mt-20  c-555">
                    <el-checkbox @change="handleCheckCopmonentAllChange" v-model="checkAllComponen" label="全选" border
                        style="margin-right:10px">
                    </el-checkbox>
                    <el-button type="primary" @click="" class="save">保存</el-button>
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
export default {
    name: "RoleDetailWork",
};
</script>

<script lang="ts" setup>
import { ref, reactive, nextTick, onMounted, toRaw } from "vue";
// 以下属性用于工作台 
const checkAllWork = ref(false)
const checkAllComponen = ref(false)
const checkAllWorkLIst = ref([])
const checkAllComponentList = ref()
const workLIst = ['工作台1', '工作台2', '工作台3', '工作台4']
const componentList = ["id1", "id2", "id3", "id4"]
// 工作台全选 
const handleCheckWorkAllChange = (val: boolean) => {
    checkAllWorkLIst.value = val ? workLIst : []
}
const handleCheckWorkChange = (value: string[]) => {
    const checkedCount = value.length
    checkAllWork.value = checkedCount === workLIst.length
    console.log("checkedCount===>", checkedCount);
    console.log("workLIst.length===>", workLIst.length);
    console.log("checkAllWork.value===>", checkAllWork.value);


}
// 工作台组件全选
const handleCheckCopmonentAllChange = (val: boolean) => {
    checkAllComponentList.value = val ? componentList : []
}
const handleCheckCopmonentChange = (value) => {
    value = toRaw(value)
    console.log("value===>", value);
    const checkedCount = value.length
    checkAllComponen.value = checkedCount === componentList.length
    console.log("checkedCount===>", checkedCount);
    console.log("componentList.length===>", componentList.length);
    console.log("checkAllComponen.value ===>", checkAllComponen.value);


}
onMounted(() => {
    console.log("工作台权限加载");
})
</script>

<style lang="scss" scoped>
.save {
    position: relative;
    bottom: 3px;
    width: 130px;
}
</style>