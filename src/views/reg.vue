<template>
    <div>
        <header-general routerTo="/myself" headClass='style1' headTitle='会员注册' titleSecod="只需几步即可成为会员，尽享所有专属福利！"></header-general>
        <div class="reg" :model="formLabelAlign">
                <div class="reg_content">
                    <div >*姓名
                    <br>
                    <input type="text"  v-model="formLabelAlign.name">
                    <span>姓名填写后不能修改</span>
                    </div>
                </div>
                <div class="reg_content">
                    <div >*性别
                    <br>
                    <el-radio v-model="formLabelAlign.radio" label="1">男</el-radio>
                    <el-radio v-model="formLabelAlign.radio" label="2">女</el-radio>
                    </div>
                </div>
                 <div class="reg_content">
                    <div>*出生日期
                    <br>
                    <div class="block">
                    <el-date-picker type="date" v-model="formLabelAlign.birthday" format="yyyy 年 MM 月 dd 日" placeholder="选择你的生日"></el-date-picker>
                    </div>
                    <span>出生日期填写后不能修改</span>
                    </div>
                </div>
                <div class="reg_content">
                    <div>*所在校区
                    <br>
                    <el-select v-model="formLabelAlign.school" placeholder="请选择">
                        <el-option value="shanghai"></el-option>
                        <el-option value="shanghai"></el-option>
                    </el-select>
                    </div>
                </div>
                <div class="reg_content">
                    <div>*手机绑定
                    <br>
                    <input type="text"  v-model="formLabelAlign.phone">
                    </div>
                </div>
                <div class="reg_content">
                    <div>*电子邮箱
                    <br>
                    <input type="text"  v-model="formLabelAlign.email">       
                    </div>
                </div>
        </div>
        <div class="add">
          <el-button type="primary" @click="joinVip">加入会员</el-button>
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
                email:'',
                school:'',
                radio: '1',
            }
        }
    },
    methods: {
        joinVip(){
           
        }
    },
    mounted() {

    },
}
</script>
<style>
.reg .el-radio{
    margin-top: .28rem;
}
.reg .el-input--prefix .el-input__inner{
    border:none;
    border-bottom: .01rem solid #0288D1;
    width: 107%;
    padding-left: 40px;
    border-radius: 0;
}
.reg .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 95%;
    margin-left: -.15rem;
}
.reg .el-input--suffix .el-input__inner{
    border:none;
    border-bottom: .01rem solid #0288D1;
    border-radius: 0;
}
.reg .el-input{
    width: 171%;
    margin-left: -18px;
}
.add .el-button--primary{
    width: 3.59rem;
    position: relative;
    top: -.6rem;
}
</style>

<style scoped>

.reg{
    height: 5.6rem;
    width: 3.59rem;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    background: #fff;
    border-radius: .07rem;
    top: -.23rem;
}
.reg div{
    font-size: .14rem;
    text-align: left;
    margin-left: .1rem;
    font-size:.15rem
}
.reg input{
    border:none;
    border-bottom: .01rem solid #0288D1;
    width: 97%;
    margin-top: .2rem;
    outline: none;
    font-size:.14rem
}
.reg_content{
    height: .88rem;
    padding-top: .08rem;
}
.reg_content span{
    font-size: .12rem;
    color: #E51C23;
    display: inline-block;
}
</style>

