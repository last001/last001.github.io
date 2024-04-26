<template>
    <div class="login">
        <div class="w-500 mt-50">
            <el-form ref="formRef" :model="formData" label-width="100" :rules="formRules">
                <el-form-item label="账号" prop="name">
                    <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="formData.passwold" />
                </el-form-item>
                <el-form-item label="方式">
                    <el-radio-group v-model="labelPosition" label="label position">
                        <el-radio-button value="vuex">vuex</el-radio-button>
                        <el-radio-button value="network">network</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { FormRules, FormInstance } from 'element-plus';
const store = useStore();
const formRef = ref<FormInstance>()
const labelPosition = ref<string>("vuex");
const formData = reactive({
    name: "",
    passwold: ""
})
const formRules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: '此选项不能为空',
            trigger: ['blur', 'change'],
        },
    ],
    password: [
        {
            required: true,
            message: '此选项不能为空',
            trigger: ['blur', 'change'],
        },
    ]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

</script>