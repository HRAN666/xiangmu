<template>
    <div>
        <div  :class="{'popup':displayPopup,'ispopup':isPoup}">
            <div class="popup_list">
                <span>收货地址</span>
                <div class="popup_list_color" @click="router">
                    请添加收货地址
                    <img src="../assets/down2.png" alt="">
                </div>
            </div>
             <div class="popup_list">
                <span>配送</span>
                <div>
                    平台推广期包邮
                    <img src="../assets/down.png" alt="">
                </div>
            </div>
            <div class="popup_list">
                <span>优惠券</span>
                <div>
                    暂无可用
                    <img src="../assets/down.png" alt="">
                </div>
            </div>
             <div class="popup_list">
                <span>发票</span>
                <div >
                    不支持开发票
                    <img src="../assets/down.png" alt="">
                </div>
            </div>
             <div class="popup_list">
                <span>应付总额</span>
                <div class="popup_list_color">
                    ¥30.00(x1)
                    <img src="../assets/down.png" alt="">
                </div>
            </div>
            <div class="popup_list">
                <span>支付方式</span>
                <div>
                    微信支付
                    <img src="../assets/down.png" alt="">
                </div>
            </div>
            <div class="popup_bottom">
                <span class="popup_bottom_first">购买可得14.8积分</span>
                <span class="popup_bottom_second">积分</span>
            </div>
             <el-button type="primary" >提交订单</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            displayPopup:true,//初始样式
            isPoup:false,
        }
    },
    methods: {
        router(){
            this.$router.push('/addAddress')
        }
    },
    mounted () {
        
    }
}
</script>
<style>
 .ispopup .el-button--primary{
    position: relative;
    bottom: .63rem;
    width: 100%;
    left: 0;
    border-radius: 0;
    }
</style>
<style scoped>
.popup{
    height: 3.7rem;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: -3.7rem;
    z-index: 1000;
    transition: .5s all;
}
.ispopup{
    height: 3.7rem;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    transition: .5s all;
}
.popup_list{
    font-size:.14rem;
    height: .5rem;
    line-height: 3.5; 
    position: relative;  
}
.popup_list::before{
    content:'';
    position: absolute;
    border-bottom: 1px solid #f9f9f9;
    width: 100%;
    left: 0;
    top: .5rem;
}
.popup_list img{
    width: .15rem;
    height: .15rem;
    position: relative;
    top: .03rem;
    left: .13rem;
}
.popup_list span{
    float: left;
    margin-left: .16rem
}
.popup_list div{
    float: right;
    margin-right:.2rem;
    color: #555555;
}
.popup_list .popup_list_color{
    color: #0288d1;
}
.popup_bottom {
    font-size:.12rem;
}
.popup_bottom span{
    float: right;
    padding-top:.11rem;
    margin-right:.1rem
}
.popup_bottom .popup_bottom_second{
    border:1px soild #d23d3d;
    color:#d23d3d;
}
.popup_bottom .popup_bottom_first{
    color:#949494;
}
</style>

