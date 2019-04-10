<template>
    <div>
        <div class="header">
            <img src="../assets/msg.png" alt="" class="header_msg"> 
            <div class="header_float">
                <img :src="headimgurl" alt="" class="header_float_headimgurl">
                <div class="header_float_reg">
                <img src="../assets/reg.png"  alt="" v-if="vip==false">
                <img src="../assets/imvip.png"  alt="" v-if="vip">
                <span v-if="vip==false" @click="toreg">会员注册</span>
                <span v-if="vip" :class="color" @click="myvip">我的会员</span>
                </div>
                <div class="header_float_nickname">
                <span>{{nickName}}</span>
                <img src="../assets/vip.png" alt="" class="header_float_nickname_vip" v-if="vip">
                <div>
                    <img src="../assets/integral.png" alt="">
                    <span>积分：263</span>
                </div>
                </div>
            </div>
            <div class="header_sencond_float">
                <div class="header_sencond_float_Details">
                    <img src="../assets/integral_details.png" alt="">
                    <span>积分明细</span>
                </div>
                <div class="header_sencond_float_exchange">
                    <img src="../assets//exchange.png" alt="">                    
                    <span>兑换记录</span>
                </div>
            </div>     
        </div>
        <div class="myorder">
            <div class="myorder_top">
                <span>我的订单</span>
                <div class="myorder_go">
                    <a href="/order" style="text-decoration: none;color: #B3B3B3;">
                        查看全部
                        <img src="../assets/more.png" alt="">
                    </a>
                </div>
            </div>
            <div class="myorder_list">
                <div class="myorder_list_waitpay">
                    <img src="../assets/wait_pay.png" alt="">
                    <span>待付款</span>
                </div>
                <div class="myorder_list_wait_receipt">
                    <img src="../assets/wait_receipt.png" alt="">
                    <span>待收货</span>
                </div>
                <div class="myorder_list_msg">
                    <img src="../assets/wait_msg.png" alt="">
                    <span>评价</span>
                </div>
                <div class="myorder_list_refund">
                    <img src="../assets/wait_refund.png" alt="">
                    <span>退款退货</span>
                </div>
            </div>
        </div>
        <div class="my">
            <div class="my_list">
                 <img src="../assets/collect.png" alt="">
                <span>我的收藏</span>
                <img src="../assets/more.png" alt="" class="my_list_go">
            </div>
            <div class="my_list" @click="toCoupon">
                <img src="../assets/Offer.png" alt="">
                <span>优惠卡券</span>
                <img src="../assets/more.png" alt="" class="my_list_go">
            </div>
            <div class="my_list" @click="address">
                <img src="../assets/address.png" alt="">
                <span>收货地址</span>
                <img src="../assets/more.png" alt="" class="my_list_go">
            </div>
             <div class="my_list">
                <img src="../assets/before.png" alt="">
                <span>浏览记录</span>
                <img src="../assets/more.png" alt="" class="my_list_go">
            </div>
        </div>
    <footer-currency></footer-currency>
    </div>
</template>
<script>
import footer from '../components/footer.vue'
export default {
    components: {
      'footer-currency':footer
    },
    data () {
        return {
            headimgurl:localStorage.getItem('headimgurl'),//头像
            nickName:localStorage.getItem('nickname'),//名字
            vip:false,//判断是否是会员
            color:'header_float_reg_vip',//会员样式
        }
    },
    methods: {
        toreg(){
            this.$router.push('/reg')
        },
        myvip(){
            this.$router.push('/myvipInf')            
        },
        toCoupon(){
            this.$router.push('/coupon')
        },
        address(){
            this.$router.push('/addAddress')
        }
    },
    mounted () {
        
    }
}
</script>
<style scoped>
.header{
    height: 1.46rem;
    background: #0288d1;
    width: 100%;
}
.header .header_msg{
    width: .23rem;
    height: .23rem;
    position: absolute;
    right: .11rem;
    top: .11rem;
}
.header_float{
    height: .9rem;
    width: 3.59rem;
    background: #fff;
    border-radius: .08rem;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    top: .82rem;
}
.header_float .header_float_headimgurl{
    width: .74rem;
    height: .74rem;
    border-radius: .58rem;
    left: 0;
    right: 0;
    margin: auto;
    top: -.42rem;
    position: absolute;
}
.header_float .header_float_reg{
    font-size: .14rem;
    color: #DB2828;
    float:right;
    margin-top: .05rem;
    margin-right: .05rem;
    font-weight: bold;
}
.header_float .header_float_reg img{
    width: .2rem;
    height: .2rem;
    margin-right: .05rem;
}
.header_float_nickname{
    font-size: .16rem;
    color: #444444;
    font-weight: bolder;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 35px;
}
.header_float_nickname img{
    width: .16rem;
    height: .16rem;
    margin-right: .1rem;
    margin-left: -.27rem;
    position: relative;
    top: .03rem;
}
.header_float_nickname div{
    font-size: .12rem;
    color: #8A8A8A;
}
.header_sencond_float{
    height: .4rem;
    width: 3.59rem;
    background: #fff;
    border-radius: .08rem;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 4px 5px 8px 7px;
    top: .82rem;
    border-top: 1px dashed;
}
.header_sencond_float div{
    width: 50%;
    float: left;
    font-size: .14rem;
}
.header_sencond_float img{
    width: .2rem;
    height: .2rem;
    margin-right: .05rem;
    margin-top: .08rem;
    position: relative;
    top: .04rem;
}
.header_sencond_float_Details ::before{
    content: '';
    position: absolute;
    height: .28rem;
    background: #dad9d9;
    top: .05rem;
    width: .01rem;
    left: 50%;
}
.myorder{
    width: 3.59rem;
    height: 1.1rem;
    background: #fff;
    border-radius: .08rem;
    position: relative;
    top: .8rem;
    left: 0;
    right: 0;
    margin: auto;
    font-size: .14rem;
}
.myorder_top img{
    width: .15rem;
    height: .15rem;
    position: relative;
    top: .03rem;
}
.myorder_top{
    padding-top: .08rem;
    height: .3rem;
}
.myorder_top ::before{
    content: '';
    height: .01rem;
    width: 94%;
    position: absolute;
    background: #dad9d9;
    left: .09rem;
    top: .37rem;
}
.myorder_top span{
    float: left;
    color: #000;
    font-weight: bolder;
    margin-left: .15rem;
}
.myorder_go{
    display: inline-block;
    float: right;
    color: #B3B3B3;
    margin-right: .08rem;
    margin-top: -.03rem;
}
.myorder_list{
    margin-top: .1rem;
}
.myorder_list div{
    width: 25%;
    float: left;
}
.myorder_list div img{
    width: .26rem;
    height: .26rem;
}
.myorder_list span{
    display: block;
    color: #5C5C5C;
    font-size: .12rem;
}
.myorder_list_waitpay::before{
    content: '';
    width: .01rem;
    background: #dad9d9;
    height: .36rem;
    position: absolute;
    left: 25%;
    top: .52rem;
}
.myorder_list_wait_receipt::before{
    content: '';
    width: .01rem;
    background: #dad9d9;
    height: .36rem;
    position: absolute;
    left: 50%;
    top: .52rem;
}
.myorder_list_msg::before{
    content: '';
    width: .01rem;
    background: #dad9d9;
    height: .36rem;
    position: absolute;
    left: 75%;
    top: .52rem;
}
.header_float_reg_vip{
    color: #0288D1 ;
}
.header_float_nickname_vip{
    position: relative;
    left: .35rem;
    top: .03rem;
}

.my{
    position: relative;
    top: .9rem;
    width: 3.59rem;
    left: 0;
    right: 0;
    margin: auto;
}
.my .my_list{
    background: #fff;
    font-size:.14rem;
    text-align: left;
    height: .35rem;
    padding-top: .05rem;
    box-sizing: border-box;
    padding-left: .1rem;
    position: relative;
}
.my .my_list::before{
    content: '';
    position: absolute;
    background: #dad9d9;
    height: .01rem;
    width: 96%;
    left: 2%;
    top: .34rem;
    z-index: 999;
}
.my .my_list:last-of-type{
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

}
.my .my_list:first-of-type{
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}
.my .my_list:last-of-type::before{
    display: none;

}
.my .my_list img{
    width: .18rem;
    height: .18rem;
    position: relative;
    top: .04rem;
    margin-right: .1rem;
}
.my .my_list .my_list_go{
    float: right;
    width: .14rem;
    height: .14rem;
}
</style>

