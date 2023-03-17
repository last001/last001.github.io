         <template>
    <el-table ref="table" height="340" :data="auditData">
        <el-table-column prop="nameColumn" label="名称列"></el-table-column>
        <el-table-column prop="timeColumn" value-format="yyyy-MM-dd hh" :formatter="formatterDate" label="时间列"
            width="180"></el-table-column>
        <el-table-column label="审核状态列" width="90">
            <!--根据状态值 动态切换颜色  注意状态fkAuditstate，显示名称AuditStateName为数据库不同字段-->
            <template slot-scope="scope">
                <span v-if="scope.row.fkAuditstate == 1">{{ scope.row.AuditStateName }}</span>
                <span v-if="scope.row.fkAuditstate == 2" style="color: #1890FF">{{ scope.row.AuditStateName }}</span>
                <span v-if="scope.row.fkAuditstate == 3" style="color: #F48558">{{ scope.row.AuditStateName }}</span>
                <span v-if="scope.row.fkAuditstate == 4" style="color: #B37FEB">{{ scope.row.AuditStateName }}</span>
                <span v-if="scope.row.fkAuditstate == 5" style="color: #52C41A">{{ scope.row.AuditStateName }}</span>
            </template>
        </el-table-column>
        <!--注意从第三列开始  数据为动态表头列：利用循环加载表头数据  -->
        <template v-for="(item, index) in auditDataColumn">

            <el-table-column :key="item.tableHeadCode">
                <!-- 注意 将slot 属性设置为header 表示 内容为表头内容  -->
                <template slot-scope="scope" slot="header">
                    <!-- 注意 使用 indeterminate （不确定）属性 并设置data变量 indeterminate[true,false,true...] 数组对象 表示动态表头的第N列状态。（index 为上方循环时下标）  -->
                    <!-- 注意checkAll值 表示当前是否全选，需与indterminate值相反，同时增加change属性 绑定方法，在全选或者取消全选时对  该列 每一行内容选中值 进行同步修改  -->
                    <el-checkbox :indeterminate="isIndeterminate[index]" v-model="checkAll[index]"
                        @change="((val) => handleCheckAllChange(val, index))">
                    </el-checkbox>
                    {{ item.tableHeaderName }}
                </template>
                <!-- 注意 此处内容为 表格行内容  -->
                <template slot-scope="scope">
                    <!-- 给该列 每一行 增加checkbox选择框 同时绑定选择框值（二维数组）checkedOptions[列下标][行下标]  注意这里 scope.row.index  row 表示这一行，index 值是在后台返回数据时 增加，方便在这里使用 -->
                    <!-- 注意绑定 change 事件 该事件触发时 需要同时验证 该列表头 是否要 设置为选择 或者不确定状态   -->
                    <el-checkbox v-model="checkedOptions[index][scope.row.index]"
                        @change="checked => checkedChange(checked, scope.row, index)"></el-checkbox>
                    <!--注意 item.tableHeaderCode 为该列表头code码，在后台返回数据时  为了方便前端做数据绑定，规定 动态列，每一行值的字段名 必须为该列表头Code  -->
                    <!-- 如对此处 使用该方式绑定不太明白，请看下方内容  -->
                    <span>{{ scope.row[item.tableHeaderCode] }}</span>
                </template>
            </el-table-column>
        </template>
    </el-table>
</template>
<script lang="ts" setup>
import { ref, reactive, nextTick, onMounted } from "vue";
//先看data 定义

const auditData = [],//表格行内容数据
    auditDataColumnCode: []//表头动态列内容数据Code备份  业务需求 可忽略
const auditDataColumn: [],//表头动态列内容数据集合

const checkAllOptions: [], //全选备用赋值数组   二维  注意没写错 这里暂时先定义成一维数组 业务需求 需要动态验证是否选中
const noCheckAllOptions = ref(), //全选备用赋值数组 二维
const checkedOptions = [],//列选择项 选中控制 二维
const checkOptionCount: [], //实时D记录当前列 选中数量  
    checkAll: [],//表头全选按钮 选中控制
    isIndeterminate: [] //表头 不确定状态控制

//动态初始化 赋值方法  datas 为从后台获取的行数据 auditData
initAuditDataCheckState(datas){
    //循环 auditDataColumn  以及 auditData 行数据 初始化 选择框 ,同时赋值 
    for (var i = 0; i < this.auditDataColumn.length; i++) {
        //定义 所需 数组对象
        var checkAllOptionsArray = new Array();
        var noCheckAllOptions = new Array();
        var checkedOptions = new Array();

        var dataColumn = this.auditDataColumn[i];
        this.auditDataColumnCode = this.auditDataColumn[i].dataCode;//业务需求  可忽略
        var checkLength = 0; // 排除
        for (var j = 0; j < datas.length; j++) {
            checkAllOptionsArray[j] = true;// 初始化全选备用二维数组 变量  表头全选 直接赋值 给列选择项控制数组
            noCheckAllOptions[j] = false;//初始化 取消全选变量 

            var data = datas[j];
            //判断数据状态 是否设置选中。同时更新当前选中数量 
            //与上方 scope.row[item.tableHeaderCode] 写法一样，不理解可以参考下方 详解
            if (data[dataColumn.dataCode1 + 'fk_qc'].indexOf('I') == -1) {
                //赋值审核值
                if (data[dataColumn.dataCode] != null && data[dataColumn.dataCode] != '') {
                    data[dataColumn.dataCode + 'Audit'] = data[dataColumn.dataCode];
                    checkedOptions[j] = true;
                    checkLength++;
                } else {
                    checkedOptions[j] = false;
                }
            } else {
                checkedOptions[j] = false;
            }

        }

        this.$set(this.checkAll, i, checkLength == datas.length);  //使用set 改变数组 刷新组件  判断是否全选
        this.$set(this.isIndeterminate, i, checkLength != datas.length);  //使用set 改变数组 刷新组件 判断全选状态是否是不确定
        this.checkOptionCount[i] = checkLength; //设置 当前列选择数量,用于后续 判断全选
        this.checkAllOptions[i] = checkAllOptionsArray; // 全选值 赋值  true
        this.noCheckAllOptions[i] = noCheckAllOptions; // 全不选  赋值 false
        this.checkedOptions[i] = checkedOptions; // 选择项  赋值
    }
},
//表格 行内容 选择框选中事件 value 选中值true/false，row 该行内容{数据对象}，index列下标
checkedChange(value, row, index){
    if (value) {
        //当前列 选中数量+1
        this.checkOptionCount[index] += 1;
        //业务逻辑处理，选中时 要给另外一个字段 赋值  可忽略 
        row[this.auditDataColumnCode[index] + 'Audit'] = row[this.auditDataColumnCode[index]];
        //判断当前选中数量  是否达到全选数量
        if (this.checkOptionCount[index] == this.auditData.length) {
            this.$set(this.checkAll, index, true);
            this.$set(this.isIndeterminate, index, false);
        }
    } else {
        this.checkOptionCount[index] += -1;
        row[this.auditDataColumnCode[index] + 'Audit'] = null;
        if (this.checkOptionCount[index] < this.auditData.length) {
            this.$set(this.checkAll, index, false);
            this.$set(this.isIndeterminate, index, true);
        }
    }
    this.$set(this.checkedOptions, index, this.checkedOptions[index]);
},
//表头 选择框 change事件 val 选中值：true/false ，index 列下标
handleCheckAllChange(val, index){
    if (val) {
        //值为true，表示全选  使用 set 方式 从备用全选数组 拿值覆盖 该列所有行选择框v-model 绑定值 
        this.$set(this.checkedOptions, index, this.checkAllOptions[index]);
        //进行业务赋值操作  可忽略
        for (let data of this.auditData) {
            data[this.auditDataColumnCode[index] + 'Audit'] = data[this.auditDataColumnCode[index]];
        }
        this.$set(this.isIndeterminate, index, false);
    } else {
        this.$set(this.checkedOptions, index, this.noCheckAllOptions[index])
        for (let data of this.auditData) {
            data[this.auditDataColumnCode[index] + 'Audit'] = null;
        }
        this.$set(this.isIndeterminate, index, true);
    }
},


</script>
