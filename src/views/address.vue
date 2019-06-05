<template>
    <div>
        <div class="address">
        <div class="address_header">
        <mt-header title="收货地址">
        <router-link to="/myself"  slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
        </mt-header>
        </div>
        <div class="address_content"  v-for="(item,index) in addressList" :key="index" >
            <div class="address_content_Name">{{item.consignee}}</div>
            <div>{{item.phone}}</div>
            <div @click="compile(item.id)">{{item.province+item.city+item.county+item.dormitory+' '+item.detailedAddress}}</div>
            <!-- @click="changeAddress(item.id)" -->
            <div class="address_content_bottom">
                <input type="checkbox"  :checked="status[index]==1"  class="address_header_checkbox" @change="switchover(item.id,index)" :disabled="status[index]==1">
                <label class=""></label>
                <div @click="switchover(item.id,index)">
                    默认地址
                </div>
                <span @click="compile(item.id)">编辑</span>
                <span @click="deleteAddress(index,item.id)">删除</span>
            </div>
        </div>
        <el-button type="danger" @click.native="insertAddress">新建收货地址</el-button>
        </div>
    </div>
</template>
<script>
import { Checklist  } from 'mint-ui';
import header from '../components/header.vue'
import { Toast } from 'mint-ui';
import {seachAdress,insertAdress,lookaddAddress,checkAddress,removeAddress} from '../api/api.js'
export default {  
    data () {
        return {
            value1:[],
            value2:[],
            addressList:[],
            name:'',
            phone:'',
            address:'',
            commit:false,//确认按钮
            status:[],//设置默认地址key
        }
    },
    methods: {
        compile(id){
            this.$router.push({path:'/compile',query:{'id':id}})
        },
        insertAddress(){
            this.$router.push('/addAddress')
        },
        deleteAddress(i,id){
            this.addressList.splice(i,1)
            let params={
                "id":id
            }
            removeAddress(params).then((result) => {
                Toast({
                    message: '已删除地址',
                    duration: 1000
                });
            }).catch((err) => {
                
            });
        },
        findadress(){//查询地址
            let params={
                "userOpenId":localStorage.getItem('userOpenId')
            }
            lookaddAddress(params).then((result) => {
                this.addressList = result.data.list;
                for (let i = 0; i < result.data.list.length; i++) {
                    this.status.push(result.data.list[i].status)
                }
            }).catch((err) => {
                
            });
        },
        switchover(id,index){//arg[0] 地址id arg[1] 获取索引 切换按钮 arg[2] 
            let statusLength=this.status.length;
            this.status=[]
            for (let i = 0; i < statusLength; i++) {
                this.status.push(0)
            }
            this.status[index]=1;

                let params={
                    "id":id,
                    "userOpenId":localStorage.getItem('userOpenId')
                }
                checkAddress(params).then((result) => {
                    if (result.data.resultCode==200) {
                        Toast({
                        message: '成功修改默认地址',
                        duration: 1000
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                });
        },
        changeAddress(id){
            debugger
            if (this.$route.query.id==undefined) {
                this.$router.push({path:`/${this.$route.query.route}`,query:{address:id,integral:this.$route.query.integral}})
            }else{
                this.$router.push({path:`/${this.$route.query.route}`,query:{address:id,id:this.$route.query.id}})
            }
        }
    },
    mounted () {
        this.findadress();
    }
}
</script>
<style>
.address_header_checkbox {
    margin-left:.16rem;
    margin-top: .22rem;
    float: left;
    position: relative;
    z-index: 2;
    opacity: 0;
}
.address_header_checkbox+label{
    margin-left:.16rem;
    margin-top: .22rem;
    left: 0;
    position:absolute;
    width: 16px;
    height: 16px;
    border: 1px solid #A6A6A6;
    border-radius: 50%;
}
.address_header_checkbox:checked+label:after {
    content: "√";
    font-size: .14rem;
    font-family: '微软雅黑';
    color: #fff;
    left: 0;
    position:absolute;
    top: -.01rem;
    left: -.01rem;
    width: 16px;
    height: 16px;
    line-height: 20px;
    font-weight: bold;
    border-radius: 50%;
    background-color: #0288D1;
    border: 1px solid #0288D1;
}
.address_header .mint-header-title{
    font-size: .18rem;
    font-weight: normal;
    margin-left: -2.3rem;
}
.address_header .mint-header{
    height: .5rem;
    background: #0288D1;
    color:#fff;
}
.address_content .mint-cell::after{
    display: none;
}
.address_content  .mint-checkbox-label{
    font-size: .14rem;
}
.address_content .mint-cell-wrapper{
    left:-.2rem;
}
.address_content .mint-checkbox-input:checked + .mint-checkbox-core{
    background-color: #BC2D2A;
    border-color:#BC2D2A;
}
.address_content .mint-cell:last-child::before{
    display: none;
}
.address_content .mint-checklist{
    float: left;
    margin-left: .12rem;
}
.address_content .mint-cell{
    background: none;
}
.address_content .mint-checklist-label{
    padding: 0 .12rem;
}
.address .el-button--danger{
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    border-radius: 0;
    background: #0288D1;
    border-color:#0288D1;
}
</style>

<style scoped>
.address_content input{
    border:none;
    outline:none;
}
.address_content .address_content_second{
    width:100%;
}
.address{
    overflow-x: hidden;
}
.address_content{
    height: 1.25rem;
    background:#fff;
    margin-top:.01rem;
    font-size:.14rem;
    position: relative;
    margin-bottom:.05rem;
}
.address_content .address_content_Name{
    float: left;
    width:50%;
    text-align:left;
    padding-left: .16rem;
    box-sizing: border-box;
    margin-top:.13rem;
}
.address_content div:nth-of-type(2){
    float: right;
    width:50%;
    text-align:right;
    padding-right: .16rem;
    box-sizing: border-box;
    margin-top:.13rem;
}
.address_content div:nth-of-type(3){
    float: left;
    padding-left: .16rem;
    margin-top:.11rem;
    font-size:.12rem;
    color:#666466;
    width: 100%;
    text-align: left;
}
.address_content span{
    float:right;
    position: relative;
    top: .22rem;
    margin-right: .24rem;
}
.address_content_bottom div{
    display: inline-block;
    margin-top: .21rem;
    float: left;
    margin-left: .1rem;
}
.address_content .address_content_bottom{
    padding-top:.69rem;
}
.address_content .address_content_bottom::after{
    content:'';
    position: absolute;
    background:#F4F4F4;
    height: .01rem;
    width: 100%;
    left: 0;
    top: .7rem;
}
</style>

