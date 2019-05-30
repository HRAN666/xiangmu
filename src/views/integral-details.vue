<template>
    <div>
    <header-general  headTitle="积分明细" headClass="style6" routerTo='/myself'></header-general>
    <div class="integral_empty" v-if="integral==''">
        <img src="../assets/integral_empty.png" alt="">
        <p>暂无积分记录</p>
    </div>
    <div class="integralbox">
        <div class="integralmain"  v-for="(item,index) in integral" :key="index">
            <div class="integralmessage">
                <div class="integralmessage-left">
                    <div class="integralmessage-left-title" v-if="item.regulation == '1' ">支付积分回馈</div>
                    <div class="integralmessage-left-title" v-if="item.regulation == '2' ">兑换商品</div>
                    <div class="integralmessage-left-time">{{item.createTime}}</div>
                </div>
                <div class="integralmessage-right" v-if="item.regulation == '1' ">
                    +{{item.integral/100}}<img src="../assets/integralicon.png" alt="">
                </div>
                <div class="integralmessage-right" v-if="item.regulation == '2' ">
                    -{{item.integral/100}}<img src="../assets/integralicon.png" alt="">
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
import { integral,IntegralDetail } from '../api/api.js'
import { getSecond } from '../common/common.js'
export default {
    components:{
        'header-general':header,
    },  
    data() {
        return {
            integral:[]
        }
    },
    methods: {
        selectIntegralDetail(){        
            let params={
                "userOpenId":localStorage.getItem('userOpenId'),
            }
            IntegralDetail(params).then((result) => {
                for (let index = 0; index < result.data.list.length; index++) {//循环每一个时间转换格式
                    var time = getSecond(result.data.list[index].createTime)
                    this.integral.push(result.data.list[index])
                    this.integral[index].createTime = time;
                }  
            }).catch((err) => {
                
            });
        }
    },
    mounted () {
        this.selectIntegralDetail()
    }
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
.integral_empty img{
    width: .5rem;
    margin-top: .55rem
}
.integral_empty p{
    margin-top: -.1rem;
    font-size: .14rem;
    color: #797878;
}
</style>

