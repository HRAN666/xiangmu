<template>
    <div>
    <header-general  headTitle="兑换记录" headClass="style6" routerTo='/myself'></header-general>
    <div class="integralbox">
        <div class="integralmain">
            <div class="integralmessage">
                <div class="integralmessage-left">
                    <div class="integralmessage-left-title">老坛酸菜牛肉面/桶</div>
                    <div class="integralmessage-left-time">2018-12-13 13:01</div>
                </div>
                <div class="integralmessage-right">
                    -100<img src="../assets/integralicon.png" alt="">
                </div>
            </div>
        </div>
        <!-- <div class="integralmain">
            <div class="integralmessage">
                <div class="integralmessage-left">
                    <div class="integralmessage-left-title">老坛酸菜牛肉面/桶</div>
                    <div class="integralmessage-left-time">2018-12-13 13:01</div>
                </div>
                <div class="integralmessage-right">
                    -100<img src="../assets/integralicon.png" alt="">
                </div>
            </div>
        </div>
        <div class="integralmain">
            <div class="integralmessage">
                <div class="integralmessage-left">
                    <div class="integralmessage-left-title">老坛酸菜牛肉面/桶</div>
                    <div class="integralmessage-left-time">2018-12-13 13:01</div>
                </div>
                <div class="integralmessage-right">
                    -100<img src="../assets/integralicon.png" alt="">
                </div>
            </div>
        </div>
        <div class="integralmain">
            <div class="integralmessage">
                <div class="integralmessage-left">
                    <div class="integralmessage-left-title">老坛酸菜牛肉面/桶</div>
                    <div class="integralmessage-left-time">2018-12-13 13:01</div>
                </div>
                <div class="integralmessage-right">
                    -100<img src="../assets/integralicon.png" alt="">
                </div>
            </div>
        </div>
        <div class="integralmain">
            <div class="integralmessage">
                <div class="integralmessage-left">
                    <div class="integralmessage-left-title">老坛酸菜牛肉面/桶</div>
                    <div class="integralmessage-left-time">2018-12-13 13:01</div>
                </div>
                <div class="integralmessage-right">
                    -100<img src="../assets/integralicon.png" alt="">
                </div>
            </div>
        </div>
        <div class="integralmain">
            <div class="integralmessage">
                <div class="integralmessage-left">
                    <div class="integralmessage-left-title">老坛酸菜牛肉面/桶</div>
                    <div class="integralmessage-left-time">2018-12-13 13:01</div>
                </div>
                <div class="integralmessage-right">
                    -100<img src="../assets/integralicon.png" alt="">
                </div>
            </div>
        </div>
        <div class="integralmain">
            <div class="integralmessage">
                <div class="integralmessage-left">
                    <div class="integralmessage-left-title">老坛酸菜牛肉面/桶</div>
                    <div class="integralmessage-left-time">2018-12-13 13:01</div>
                </div>
                <div class="integralmessage-right">
                    -100<img src="../assets/integralicon.png" alt="">
                </div>
            </div>
        </div>
        <div class="integralmain">
            <div class="integralmessage">
                <div class="integralmessage-left">
                    <div class="integralmessage-left-title">老坛酸菜牛肉面/桶</div>
                    <div class="integralmessage-left-time">2018-12-13 13:01</div>
                </div>
                <div class="integralmessage-right">
                    -100<img src="../assets/integralicon.png" alt="">
                </div>
            </div>
        </div>
        <div class="integralmain">
            <div class="integralmessage">
                <div class="integralmessage-left">
                    <div class="integralmessage-left-title">老坛酸菜牛肉面/桶</div>
                    <div class="integralmessage-left-time">2018-12-13 13:01</div>
                </div>
                <div class="integralmessage-right">
                    -100<img src="../assets/integralicon.png" alt="">
                </div>
            </div>
        </div> -->
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
export default {
    components:{
        'header-general':header,
    },
    data() {
        return {
            IntegralOrder:[]
        }
    },
    methods: {
        Integral(){        
            let params={
                "userOpenId":localStorage.getItem('userOpenId')
            }
            selectIntegral(params).then((result) => {
                // let IntegralDetail = []
                // this.integral = result.data.list
                for (let index = 0; index < result.data.list.length; index++) {//循环每一个时间转换格式
                    // var time = getDay(result.data.list[index].createTime)
                    this.IntegralOrder.push(result.data.list[index])
                    console.log(this.IntegralOrder)
                }  
            }).catch((err) => {
                
            });
        }
    },
    mounted() {
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
    width: 100%;
    position: relative;
    bottom: 0;
    font-size: .18rem;
    height: .58rem;
    color: #909399;
    line-height: .58rem;
}
.previous-page{
    width: 50%;
    float: left;
}
</style>

