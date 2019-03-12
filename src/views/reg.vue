<template>
    <div>
        <header-general routerTo="/myself" headClass='style1' headTitle='会员注册'></header-general>
        <div class="reg">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="*姓名">
                <el-input  v-model="formLabelAlign.name"></el-input>
                <span class="note_name">姓名填写后不能修改</span>
            </el-form-item>
            <el-form-item label="*性别">
                <el-radio v-model="formLabelAlign.radio" label="1">男</el-radio>
                <el-radio v-model="formLabelAlign.radio" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="*出生日期">
            <div class="block">
                <!-- <el-date-picker type="dates" v-model="formLabelAlign.birthday" placeholder="选择出生日期">
                </el-date-picker> -->
                <el-date-picker
                type="date"
                v-model="formLabelAlign.birthday"
                format="yyyy 年 MM 月 dd 日"
                placeholder="选择你的生日">
                </el-date-picker>
            </div>
                 <span class="note">出生日期填写后不能修改</span>
            </el-form-item>
            <el-form-item label="*所在校区">
                <el-select v-model="formLabelAlign.school" placeholder="请选择">
                    <el-option value="shanghai"></el-option>
                    <el-option value="shanghai"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="*手机绑定">
                <el-input  v-model="formLabelAlign.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱">
                <el-input  v-model="formLabelAlign.emali"></el-input>
            </el-form-item>
        </el-form>
        </div>
        <div class="add">
          <el-button type="primary">加入会员</el-button>
        </div>
    </div>
</template>
<script>
import header from '../components/header.vue'
export default {
    components: {
        'header-general':header
    },
    data () {
        return {
            labelPosition: 'top',
            formLabelAlign: {
                name: '',//姓名
                birthday: '',//生日
                phone:'',
                emali:'',
                school:'',
                radio: '1',
            }
        }
    },
    methods: {
        
    },
    mounted() {

    },
}
</script>
<style>
.reg .el-input__inner{
    border-radius: 0;
    border:none;
    border-bottom: 1px solid #0288D1;
    width: 88%;
    height: .2rem;
    line-height: .2rem;
}
.reg .el-input{
    display: block;
    top: -.23rem;
}
.reg .el-form--label-top .el-form-item__label{
    display: block;
    margin-left: .25rem;
}
.reg .el-form-item{
    margin-bottom: .05rem;
    height: .85rem;
}
.reg .el-radio{
    position: relative;
    right: 28%;
    margin-bottom: .25rem;
}
.reg .el-select{
    width: 100%;
}
.add .el-button--primary{
    position: relative;
    top: -.67rem;
    width: 87%;
    background: #0288D1;
}
.reg .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
    margin-left: .2rem;
}
</style>
<style scoped>
.reg{
    height: 5.3rem;
    width: 3.59rem;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    background: #fff;
    border-radius: .07rem;
    top: -.23rem;
}
.note{
    position: relative;
    left: -.85rem;
    top:-.45rem;
    display: block;
    color:red;
}
.note_name{
    position: relative;
    left: -.94rem;
    top:-.45rem;
    display: block;
    color:red;
}
</style>

