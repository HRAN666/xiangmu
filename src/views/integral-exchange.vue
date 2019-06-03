<template>
    <div>
    <header-general  headTitle="兑换记录" headClass="style6" routerTo='/myself'></header-general>
        <div v-if="IntegralOrder==''" class="exchange_empty">
            <img src="../assets/empty_exchange.png" alt="">
            <p>暂无兑换记录</p>
        </div>
    <div class="integralbox">
        <div class="integralmain" v-for="(item,index) in IntegralOrder" :key="index">
            <div class="integralmessage" @click="goDetail(item.scoreProductId)">
                <div class="integralmessage-left">
                    <div class="integralmessage-left-title">{{item.name}}</div>
                    <div class="integralmessage-left-time">{{new Date(item.createTime).getFullYear()+'-'+(new Date(item.createTime).getMonth()+1)+'-'+new Date(item.createTime).getDate()}}</div>
                </div>
                <div class="integralmessage-right">
                    -{{item.scoreUse/100}}<img src="../assets/integralicon.png" alt="">
                </div>
            </div>
        </div>
        <div class="page">
            <div class="previous-page">上一页</div>
            <div class="next-page">下一页</div>
        </div>
    </div>
    </div>
</template>
<script>
import header from '../components/header.vue'
import {integral,selectIntegral} from '../api/api.js'
import { getSecond } from '../common/common.js'
export default {
    components:{
        'header-general':header,
    },
    data() {
        return {
            IntegralOrder:''
        }
    },
    methods: {
        Integral(){        
            let params={
                "userOpenId":localStorage.getItem('userOpenId')
            }
            selectIntegral(params).then((result) => {
               this.IntegralOrder=result.data.list
            }).catch((err) => {
                
            });
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

