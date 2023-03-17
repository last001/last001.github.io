<template>
    <el-tabs v-model="menuName" class="ml-15" type="card" @tab-click="showUpsPage">
        <el-tab-pane v-for="(item, index) in moduleList" :key="index" :label="item.name" :name="item.name" :id="item.id"
            width="170" :tree-props="{ children: 'children' }">
        </el-tab-pane>
    </el-tabs>
    <!-- 权限表格 -->
    <el-table :data="data" style="width: 100%; padding: 20px 20px" row-key="id" border ref="tableRef"
        @getSelectionRows="save()" @select="select" @select-all="selectAll" :row-class-name="rowClassNameFun">
        <!-- 选框 -->
        <el-table-column type="selection">
        </el-table-column>>
        <el-table-column prop="name" label="模块/菜单" width="300" type="">
        </el-table-column>
        <el-table-column label="菜单" width="250" prop="menuName">
        </el-table-column>
        <el-table-column prop="" label="权限节点配置" width="930" />
    </el-table>
    <div class="mt-20 ml-20 pb-15 c-555">
        <el-checkbox v-model="selectAll" label="全选" border @change="checkAll()" style="margin-right:10px" />
        <el-button type="primary" @click="save" class="save">保存</el-button>
    </div>
</template>

<script lang="ts">
export default {
    name: "RoleDetailFromMenu",
};
</script>

<script lang="ts" setup>
import { ref, onMounted, toRaw, nextTick, reactive } from "vue";
import dsorg from "@dscloud/api/dsorg";
let menuName = ref("机构")
const tableRef = ref();
const moduleList = ref()
const isIndeterminateMap = ref({});
const flag = ref(true)
const selectDataAll = ref(false)
// 用于菜单权限数据
const data = reactive([])
dsorg.getModuleData("0").then((res) => {
    moduleList.value = res
})
const showUpsPage = (event) => {
    // 切换tab制空数组
    data.length = 0
    // selectAll.value = false
    let eve = toRaw(event)
    let list = toRaw(eve.props)
    moduleList.value.forEach((item) => {
        item = toRaw(item)
        if (item.name === list.name) {
            dsorg.getMenuListByPid(item.id).then((res) => {
                dataConversion(res)
                Object.assign(data, res)
                dealWithData(data)
            })
        }
    })
    console.log(" data ===>", data);
}
const save = () => {
    console.log("保存");
    let rows = tableRef.value.getSelectionRows();
    console.log("rows===>", rows);
}
const checkAll = () => {
    if (flag.value === true) {
        data.forEach((item) => {
            item.isCheck = true
            flag.value = false
            selectDataAll.value = true
        })
    } else if (flag.value === false) {
        data.forEach((item) => {
            item.isCheck = false
            flag.value = true
            selectDataAll.value = false
        })
    }
}
function initStatusMap(data) {
    data.forEach(ele => {
        isIndeterminateMap.value[ele.id] = false
        if (ele.children && ele.children.length) {
            initStatusMap(ele.children)
        }
    })
}
initStatusMap(data)
console.log('isIndeterminateMap', isIndeterminateMap.value);
function lookForAllId(data, findId) {
    let result
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == findId) {
            return data[i]
        }
        if (data[i].children && data[i].children.length) {
            result = lookForAllId(data[i].children, findId)
        }
    }
    return result
}
const selectSonHandle = (ele, isSelect) => {
    ele.map(j => {
        tableRef.value.toggleRowSelection(j, isSelect)
        isIndeterminateMap.value[j.id] = isSelect
        if (j.children) {
            selectSonHandle(j.children, isSelect)
        }
    })
}
// 点击复选框事件
const select = (selection, row) => {
    let isSelect = isIndeterminateMap.value[row.id]
    if (isSelect == 'indeterminate') {
        isSelect = true
        isIndeterminateMap.value[row.id] = true;
    } else {
        isSelect = !isSelect
        isIndeterminateMap.value[row.id] = isSelect
    }
    if (row.children && row.children.length) {
        selectSonHandle(row.children, isSelect)
    }
    let parentId = row.parentId
    console.log('parentId', parentId);
    handlelook(row, parentId)
}
function handlelook(row, parentId) {
    console.log("row.parentId===>", row.parentId);
    console.log("parentId===>", parentId);

    if (row.parentId && row.parentId !== '0') {
        let ele = lookForAllId(data, parentId)
        console.log("ele===>", ele);

        if (ele) {
            console.log("ele2===>", ele);

            let isALLTrue = selectStatus(ele, true);
            let isALLFalse = selectStatus(ele, false);
            if (isALLTrue) {
                console.log('全选');
                isIndeterminateMap.value[ele.id] = true;
                tableRef.value.toggleRowSelection(ele, true)
            } else if (isALLFalse) {
                console.log('全不选');
                isIndeterminateMap.value[ele.id] = false;
                tableRef.value.toggleRowSelection(ele, false)
            } else {
                console.log('不明确');
                tableRef.value.toggleRowSelection(ele, false)
                isIndeterminateMap.value[ele.id] = "indeterminate";
            }
        }
        if (ele.parentId === '0') {
            handlelook(ele, ele.parentId)
        }
    }
}
// 点击全选框事件
const selectAll = (selection) => {
    const isSelect = selection.some(el => {
        const leverOneIds = data.map(j => j.id)
        return leverOneIds.includes(el.id)
    })

    const isCancel = !data.every(el => {
        const selectIds = selection.map(j => j.id)
        return selectIds.includes(el.id)
    })
    if (isSelect) {
        console.log('全选');
        const allSelectionHandle = (el) => {
            isIndeterminateMap.value[el.id] = true
            if (el.children && el.children.length) {

                el.children.map(j => {
                    tableRef.value.toggleRowSelection(j, true)
                    isIndeterminateMap.value[j.id] = true
                    allSelectionHandle(j)
                })
            }
        }
        selection.map(el => {
            allSelectionHandle(el)
        })
    }
    if (isCancel) {
        console.log('全不选');
        const CancelHandle = (el) => {
            isIndeterminateMap.value[el.id] = false
            if (el.children && el.children.length) {

                el.children.map(j => {
                    tableRef.value.toggleRowSelection(j, false)
                    isIndeterminateMap.value[j.id] = false
                    CancelHandle(j)
                })
            }
        }
        data.map(el => {
            CancelHandle(el)
        })
    }
}
const selectStatus = (item, status = true) => {
    let isAllSelect = [];
    item.children.forEach((childrenItem) => {
        isAllSelect.push(isIndeterminateMap.value[childrenItem.id]);
    });
    let isStauts = isAllSelect.every((selectItem) => {
        return status == selectItem;
    })
    return isStauts
}
const rowClassNameFun = ({ row }) => {
    let isSelect = isIndeterminateMap.value[row.id];
    if (isSelect == "indeterminate") {
        return "indeterminate";
    }
}
// 进行处理
const dataConversion = (data) => {
    data.forEach(item => {
        item.id = item.module.id
        item.name = item.module.name
        item.children = item.menuList
        item.parentId = item.module.parentId
    })
}
const dealWithData = (data) => {
    data.forEach((item) => {
        delete item.menuList,
            delete item.module
        item.children.forEach((item2) => {
            item2.menuName = item2.name
            delete item2.name
            item2.children.forEach((item3) => {
                item3.menuName = item3.name
                delete item3.name
            })
        })
    })
}
onMounted(() => {
    console.log("菜单权限加载");
    dsorg.getMenuListByPid("62f5cca5b5cab7179ff0fd25",).then((res) => {
        dataConversion(res)
        Object.assign(data, res)
        dealWithData(data)
    })
    console.log(" data===>", data);
})
</script>

<style lang="scss" scoped>
.save {
    position: relative;
    bottom: 3px;
    width: 130px;
}
</style>