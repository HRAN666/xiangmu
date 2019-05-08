<template>
    <div>
        <div class="address">
        <div class="address_header">
        <mt-header title="收货地址">
        <router-link to="/my" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
        </mt-header>
        </div>
        <div class="address_content" v-for="(item,index) in addressList" :key="index">
            <div class="address_content_Name">{{item.consignee}}</div>
            <div>{{item.phone}}</div>
            <div>{{item.province+item.city+item.county+item.detailedAddress}}</div>
            <div class="address_content_bottom">
                <mt-checklist :options="['默认地址']" v-model="value1"></mt-checklist>
                <span>编辑</span>
                <span @click="deleteAddress">删除</span>
            </div>
        </div>
        <el-button type="danger" @click.native="eventinsertAdress">确认</el-button>
        <el-button type="danger" @click.native="deleteAddress">新建收货地址</el-button>
        </div>
    </div>
</template>
<script>
import { Checklist  } from 'mint-ui';
import header from '../components/header.vue'
import {seachAdress,insertAdress,lookaddAddress} from '../api/api.js'
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
        }
    },
    methods: {
        deleteAddress(){
            this.$router.push('/addAddress')
        },

        eventinsertAdress(){        

            let params={
                "userOpenId":localStorage.getItem('userOpenId')
            }
            lookaddAddress(params).then((result) => {
                console.log(result.data.list)
                this.addressList = result.data.list
            }).catch((err) => {
                
            });

        },
    },
    mounted () {
        this.eventinsertAdress();
    }
}
</script>
<style>
.address_header .mint-header-title{
    font-size: .18rem;
    font-weight: normal;
    margin-left: -2.3rem;
}
.address_header .mint-header{
    height: .5rem;
    background: #fff;
    color:#000;
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
    background: #BC2D2A;
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

