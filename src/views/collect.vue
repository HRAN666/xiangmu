<template>
<div>
    <div class="header">
    <mt-header title="">
    <router-link to="/myself" slot="left">
        <mt-button icon="back">我的收藏</mt-button>
    </router-link>
    <mt-button slot="right">编辑</mt-button>
    </mt-header>
    </div>
    <div class="item" v-for="(item,index) in collectList" :key="index">
        <img :src="'http://img.cmhg.shop/'+(item.bizProductVo==undefined?item.bizIntegralProductVo:item.bizProductVo).icon" alt="">
        <dd>{{(item.bizProductVo==undefined?item.bizIntegralProductVo:item.bizProductVo).name}}</dd>
        <dt>12人收藏</dt>
        <span v-if="item.bizProductVo==undefined">{{item.bizIntegralProductVo.integral}}积分</span>
        <span v-if="item.bizProductVo!=undefined">{{item.bizProductVo.price|filtertoMoney}}</span> 
    </div>
</div>
    
    
</template>
<script>
import {collect} from '../api/api.js'
import {filtertoMoney} from '../filter/filter.js'
export default {
    data() {
        return {
            collectList:'',
        }
    },
    methods: {
        loadingCollectShop(){
            let params={
                "userOpenId":localStorage.getItem('userOpenId')
            }
            collect(params).then((result) => {
                if (result.data.resultCode==200) {
                    this.collectList=result.data.list;
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    },
    created() {
       this.loadingCollectShop();
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
    padding-bottom: .05rem;
}
.item img{
    position: relative;
    width: 1.3rem;
    left: -1.13rem;
    top: .1rem;
}
.item dd{
    position: absolute;
    width: 2.27rem;
    font-size: .14rem;
    left: 1.03rem;
    top: .1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
}
.item dt{
    position: absolute;
    width: .5rem;
    font-size: .12rem;
    color: #B0B0B0;
    left: 1.49rem;
    top: .33rem;
}
.item span{
    position: absolute;
    font-size: .18rem;
    color: #BC2D2A;
    left: 1.47rem;
    top: 1.1rem;
}
</style>
