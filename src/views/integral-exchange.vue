<template>
    <div>
    <header-general  headTitle="兑换记录" headClass="style6" routerTo='/myself'></header-general>
        <div class="exchange_empty" v-bind:style="{display: retract}">
            <img src="../assets/empty_exchange.png" alt="">
            <p>暂无兑换记录</p>
        </div>
    <div class="integralbox">
        <div class="integralmain" v-for="(item,index) in IntegralOrder" :key="index">
            <div class="integralmessage" @click="goDetail(item.scoreProductId)">
                <div class="integralmessage-left">
                    <div class="integralmessage-left-title">{{item.name}}</div>
                    <div class="integralmessage-left-time">{{item.createTime}}</div>
                </div>
                <div class="integralmessage-right">
                    -{{item.scoreUse/100}}<img src="../assets/integralicon.png" alt="">
                </div>
            </div>
        </div>
        <div class="page">
            <div @click="pageup" class="previous-page">上一页</div>
            <div @click="pagenext" class="next-page">下一页</div>
        </div>
    </div>
    </div>
</template>
<script>
import header from '../components/header.vue'
import {integral,selectIntegral} from '../api/api.js'
import { getSecond } from '../common/common.js'
import { Toast } from 'mint-ui'
export default {
    components:{
        'header-general':header,
    },
    data() {
        return {
            IntegralOrder:[],
            pageNo:'1',//默认第一页
            pageMax:'',//最大页
            pageSize:'',//显示数量
            phoneHeight: '',//屏幕的高
            retract:'none',//默认不显示
        }
    },
    methods: {
        Integral(){
            this.phoneHeight = document.documentElement.clientHeight//获取屏幕的高
            this.pageSize = Math.floor((this.phoneHeight-45-58)/69);
            this.IntegralOrder=[]
            let params={
                "userOpenId":localStorage.getItem('userOpenId'),
                "pageNo":this.pageNo,
                "pageSize":this.pageSize,//根据屏幕高度显示数量
            }
            selectIntegral(params).then((result) => {
                for (let index = 0; index < result.data.list.length; index++) {//循环每一个时间转换格式
                    var time = getSecond(result.data.list[index].createTime)
                    this.IntegralOrder.push(result.data.list[index])
                    this.IntegralOrder[index].createTime = time;
                }
                this.pageMax=Math.ceil(result.data.totalCount/this.pageSize);
                if(result.data.list.length==0){
                    this.retract='block';
                }else{
                    this.retract='none';
                }
            }).catch((err) => {
                
            });
        },
        pageup(){
            if(this.pageNo==1){
                Toast({
                    message: '已经是第一页',
                    duration: 1000
                });
            }else{
                this.pageNo--
                this.Integral()
            }
        },
        pagenext(){
            if(this.pageNo==this.pageMax){
                Toast({
                    message: '已经是最后一页',
                    duration: 1000
                });
            }else{
                this.pageNo++
                this.Integral()
            }
        },
        goDetail(id){
            this.$router.push({path:'/commodityDetails',query:{integral:id}})
        }
    },
    created() {
        this.Integral()
    },
}
</script>
<style scoped>
.integralbox{
    background-color: #fff;
    margin: 0;
    padding: 0;
    height: 100%;
}
.integralmain{
    background-color: #fff;
    height: .69rem;
    width: 100%;
}
.integralmessage{
    width: 90%;
    height: .67rem;
    margin: 0 auto;
    border-bottom: .02rem solid #f0f2f5;
}
.integralmessage-left{
    color: #000;
    float: left;
}
.integralmessage-left-title{
    font-size: .16rem;
    margin-top: .1rem;
    text-align: left;
}
.integralmessage-left-time{
    font-size: .13rem;
    color: #909399;
    margin-top: .05rem;
    text-align: left;
}
.integralmessage-right{
    float: right;
    font-size: .18rem;
    line-height: .68rem;
    color: #ff4400;
}
.integralmessage-right img{
   width: .2rem;
   position: relative;
   top:.04rem;
}
.page{
    position: fixed;
    width: 100%;
    z-index: 999;
    bottom: 0;
    background: #fff;
    font-size: .18rem;
    height: .58rem;
    color: #909399;
    line-height: .58rem;
}
.previous-page{
    width: 50%;
    float: left;
}
.exchange_empty img{
    width: .5rem;
    margin-top: .55rem
}
.exchange_empty p{
    margin-top: -.1rem;
    font-size: .14rem;
    color: #797878;
}
</style>

