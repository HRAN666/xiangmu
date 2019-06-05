<template>
<div>
    <div class="header">
    <mt-header title="">
        <router-link to="/myself" slot="left">
            <mt-button icon="back">我的收藏</mt-button>
        </router-link>
        <mt-button slot="right" @click="delet=true" v-if="!delet">编辑</mt-button>
        <mt-button slot="right" @click="delet=false" v-if="delet">完成</mt-button>
    </mt-header>
    </div>
    <div class="collect_null" v-bind:style="{display: retract}">
        <img src="../assets/collect_null.png" alt="" >
        <p>没有更多收藏数据了~</p>
    </div>
    <div class="item_ui">
        <div class="item" v-for="(item,index) in collectList" :key="index">
            <input type="checkbox" class="collect_checkedbox" v-if="delet" @click="check(item.id)" :checked="selectCollect.indexOf(item.id)>=0">
            <label class="" v-if="delet"></label>
            <img :src="'http://img.cmhg.shop/'+(item.bizProductVo==undefined?item.bizIntegralProductVo:item.bizProductVo).icon" alt="" @click="goDetail(item)">
            <dd>{{(item.bizProductVo==undefined?item.bizIntegralProductVo:item.bizProductVo).name}}<span>{{item.bizProductVo==undefined?item.bizIntegralProductVo.saleVolume:item.bizProductVo.salesVolume}}人购买</span></dd>
            <dt v-if="item.bizProductVo==undefined">{{item.bizIntegralProductVo.integral/100}}积分</dt>
            <dt v-if="item.bizProductVo!=undefined">{{item.bizProductVo.price|filtertoMoney}}</dt> 
        </div>
    </div>
    <div class="collect_bottom" v-if="delet">
        <span>全选</span>
        <input type="checkbox" class="collect_checkedbox" v-if="delet" @change="toCheckAll" v-model="checkAll">
        <label class="" v-if="delet"></label>
        <el-button type="primary" round @click.native="deleteCollect">删除</el-button>
    </div>
</div>

</template>
<script>
import { collect,deleteColl } from '../api/api.js'
import { filtertoMoney } from '../filter/filter.js'
import { Toast } from 'mint-ui';
export default {
    inject:['reload'],    
    data() {
        return {
            collectList:'',
            delet:false,
            selectCollect:[],//选中的收藏list
            collect:[],//收藏id
            checkAll:false,
            retract:'none',//默认不显示
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
                    for (let i = 0; i < result.data.list.length; i++) {
                        this.collect.push(result.data.list[i].id)    
                    }
                }
                if(result.data.list.length==0){
                    this.retract='block';
                }else{
                    this.retract='none';
                }
            }).catch((err) => {
                console.log(err)
            });
        },
        check(id){
            let index=this.selectCollect.indexOf(id)
            if (index>=0) {
                this.selectCollect.splice(index,1)
            }else{
                this.selectCollect.push(id)
                if (this.collect.length==this.selectCollect.length) {
                    this.checkAll=true
                }
            }
        },
        toCheckAll(){
            if (this.checkAll) {
                this.selectCollect=this.collect
            }else{
                this.selectCollect=[]
            }
        },
        deleteCollect(){
            let params={
                "userOpenId":localStorage.getItem('userOpenId'),
                'id':this.selectCollect.join(',')
            }
            deleteColl(params).then((result) => {
                if (result.data.resultCode==200) {
                     Toast({
                        message: '已删除',
                        duration: 1000
                    });
                    this.reload()
                }
            }).catch((err) => {
                
            });
        },
        goDetail(val){
            if (val.bizIntegralProductVo) {//积分商品
                this.$router.push({path:'/commodityDetails',query:{'integral':val.productId}})
            }else{
                this.$router.push({path:'/commodityDetails',query:{'id':val.productId}})                
            }
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
.collect_bottom .el-button{
    position: absolute;
    top: .1rem;
    right: .15rem;
    width: 1rem;
    height: .36rem;
    line-height: .01rem
}
</style>

<style scoped>
.item{
    position: relative;
    width: 100%;
    height: 1.2rem;
    background-color: #ffffff;
    border-bottom: #efefef .01rem solid;
}
.item img{
    position: relative;
    height: 1rem;
    left: -1.1rem;
    top: .1rem;
    width: 1rem;
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
    font-size: .18rem;
    color: #BC2D2A;
    left: 1.47rem;
    top: 0.8rem;
}
.collect_bottom{
    height: .53rem;
    background: #EEEEEE;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 11;
    font-size: .16rem;
    font-weight: bold;
}
.collect_checkedbox+label{
    margin-left:.08rem;
    margin-top: .58rem;
    left: 0;
    position:absolute;
    width: 16px;
    height: 16px;
    border: 1px solid #A6A6A6;
    border-radius: 50%;
    z-index: 10;
}
.collect_checkedbox:checked+label:after {
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
.collect_checkedbox{
    position: absolute;
    top: .69rem;
    z-index: 12;
    left: .16rem;
    opacity: 0;
}

.collect_bottom .collect_checkedbox{
    top: .15rem;
}
.collect_bottom .collect_checkedbox+label{
    margin: 0;
    top: .18rem;
    left: .14rem;
}
.collect_bottom span{
    position: absolute;
    top: .18rem;
    left: .45rem;
}
.collect_null img{
    width: .5rem;
    margin-top: .55rem
}
.collect_null p{
    margin-top: -.1rem;
    font-size: .14rem;
    color: #797878;
}
</style>
