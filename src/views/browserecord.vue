<template>
<div>
    <div class="header">
    <mt-header title="">
    <router-link to="/myself" slot="left">
        <mt-button icon="back">浏览记录</mt-button>
    </router-link>
    <mt-button slot="right">编辑</mt-button>
    </mt-header>
    </div>
    <div class="item" v-for="(item,index) in browseList" :key="index">
        <img :src="'http://img.cmhg.shop/'+item.bizProductVo.icon" alt="">
        <dd>{{item.bizProductVo.name}}<span>12人收藏</span></dd>
        <dt>￥ 0.1</dt>
    </div>
</div>
    
    
</template>
<script>
import {browse} from '../api/api.js';
export default {
    data() {
        return {
            browseList:''
        }
    },
    methods: {
        Loaingbrowsere(){
            let params ={
                "userOpenId":localStorage.getItem("userOpenId"),
            };
            browse(params).then((jsonData) => {
              if (jsonData.data.resultCode==200) {
                    this.browseList=jsonData.data.list
                }
            }).catch((err) => {
                console.log(err)
            });
        },
    },
    created() {
        this.Loaingbrowsere();
    },
}
</script>
<style>
.header .mint-header{
    height: .5rem;
    background: #0288D1;
}
.header .mint-button-text{
    font-size: .16rem;
}
</style>

<style scoped>
.item{
    position: relative;
    width: 100%;
    height: 1.4rem;
    background-color: #ffffff;
    border-bottom: #efefef .01rem solid;
}
.item img{
    position: relative;
    width: 1.3rem;
    left: -1.13rem;
    top: .1rem;
}
.item dd{
    position: absolute;
    text-align: left;
    width: 2.2rem;
    font-size: .14rem;
    left: 1.1rem;
    top: .1rem;
}
.item dd span{
    margin-top: .05rem;
    display: block;
    font-size: .12rem;
    color: #B0B0B0;
}
.item dt{
    position: absolute;
    width: .5rem;
    font-size: .18rem;
    color: #BC2D2A;
    left: 1.47rem;
    top: 1.1rem;
}
</style>
