<template>
    <div>
        <header-general routerTo="/myself" headClass='style1' headTitle='修改信息' titleSecod="带*号的信息表示不可修改"></header-general>
        <div class="vip" :model="formLabelAlign">
                <div class="vip_content">
                    <div >*姓名
                    <br>
                    <input type="text"  v-model="formLabelAlign.name"  :disabled="true">
                    <span>姓名不能修改</span>
                    </div>
                </div>
                <div class="vip_content">
                    <div >性别
                    <br>
                    <el-radio v-model="formLabelAlign.radio" label="1">男</el-radio>
                    <el-radio v-model="formLabelAlign.radio" label="2">女</el-radio>
                    </div>
                </div>
                 <div class="vip_content">
                    <div>*出生日期
                    <br>
                    <div class="block">
                    <el-date-picker type="date" v-model="formLabelAlign.birthday" format="yyyy 年 MM 月 dd 日" placeholder="选择你的生日" :disabled="true"></el-date-picker>
                    </div>
                    <span>出生日期不能修改</span>
                    </div>
                </div>
                <div class="vip_content">
                    <div>所在校区
                    <br>
                    <el-select v-model="formLabelAlign.school" placeholder="请选择">
                        <el-option value="shanghai"></el-option>
                        <el-option value="shanghai"></el-option>
                    </el-select>
                    </div>
                </div>
                <div class="vip_content">
                    <div>手机绑定
                    <br>
                    <input type="text"  v-model="formLabelAlign.phone">
                    </div>
                </div>
                <div class="vip_content">
                    <div>电子邮箱
                    <br>
                    <input type="text"  v-model="formLabelAlign.email">       
                    </div>
                </div>
        </div>
        <div class="add">
          <el-button type="primary" @click="modifyVip">确认修改</el-button>
        </div>
    </div>
</template>
<script>
import header from '../components/header.vue'
import {regVip,modify} from '../api/api'
import { Toast } from 'mint-ui';

export default {
    inject:['reload'],
    components: {
        'header-general':header
    },
    data () {
        return {
            labelPosition: 'top',
            formLabelAlign: {
                name: 'asdd',//姓名
                birthday: '215212',//生日
                phone:'',
                email:'',
                school:'',
                radio: '1',
            },
            userid:''
        }
    },
    methods: {
        getVip(){
            let params={
                'userOpenId':localStorage.getItem('userOpenId')
            }
           regVip(params).then((result) => {
               this.formLabelAlign.name=result.data.list[0].name
               this.formLabelAlign.birthday=result.data.list[0].birthday
               this.formLabelAlign.radio=result.data.list[0].sex.toString()
               this.formLabelAlign.school=result.data.list[0].campus
               this.formLabelAlign.phone=result.data.list[0].phone
               this.formLabelAlign.email=result.data.list[0].email
               this.userid=result.data.list[0].id
           }).catch((err) => {
               
           });
        },
        modifyVip(){
             if (this.formLabelAlign.name=='') {
                Toast({
                    message: '姓名不能为空',
                    duration: 1000
                    });
            }else if(this.formLabelAlign.birthday==''){
                Toast({
                    message: '生日不能为空',
                    duration: 1000
                    })
            }else if(this.formLabelAlign.school==''){
                Toast({
                    message: '校区不能为空',
                    duration: 1000
                    })
            }else if(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.formLabelAlign.phone)){
                Toast({
                    message: '请输入正确的手机号码',
                    duration: 1000
                    })
            }else if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.formLabelAlign.email)) {
                
                Toast({
                    message: '请输入正确邮箱',
                    duration: 1000
                    })
            }else{
                let params={
                    'id': this.userid,
                    'sex':this.formLabelAlign.radio,
                    'campus':this.formLabelAlign.school,
                    'phone':this.formLabelAlign.phone,
                    'email':this.formLabelAlign.email
                    }
                modify(params).then((result) => {
                    if (result.data.resultCode==200) {
                        Toast({
                        message: '修改信息成功',
                        duration: 1000
                        })
                        this.reload()
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    },
    created() {
        this.getVip()
    },
}
</script>
<style>
.vip .el-radio{
    margin-top: .28rem;
}
.vip .el-input--prefix .el-input__inner{
    border:none;
    border-bottom: .01rem solid #0288D1;
    width: 107%;
    padding-left: 40px;
    border-radius: 0;
}
.vip .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 90%;
    margin-left: -.2rem;
}
.vip .el-input--suffix .el-input__inner{
    border:none;
    border-bottom: .01rem solid #0288D1;
    border-radius: 0;
}
.vip .el-input{
    width: 2.9rem;
    margin-left: -18px;
}
.add .el-button--primary{
    width: 3.59rem;
    position: relative;
    top: -.6rem;
}
.vip .el-input.is-disabled .el-input__inner{
    background: #fff;
}
</style>

<style scoped>
.vip{
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
.vip div{
    font-size: .15rem;
    text-align: left;
    margin-left: .2rem;
}
.vip input{
    border:none;
    border-bottom: .01rem solid #0288D1;
    width: 90%;
    margin-top: .2rem;
    outline: none;
    background: #fff;   
    font-size:.14rem; 
}
.vip_content{
    height: .88rem;
    padding-top: .08rem;
}
.vip_content span{
    font-size: .12rem;
    color: #E51C23;
    display: inline-block;
}
</style>

