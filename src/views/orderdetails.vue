<template>
    <div>
    <div class="bigbox"  v-for="(item,index) in orderdetails" :key="index">
        <div class="orderdetails_box">
            <img class="box_left" src="../assets/gps.png"/>
            <div class="orderdetails_boxname">
                <span>{{item.deliverName}}</span>
                <span>{{item.deliverPhone}}</span>
                <div>地址：广东省深圳市龙岗区 龙城街道将军路1号深圳技师学院北校门</div>
            </div>
        </div>
        <div class="orderdetails_box">
            <div class="orderdetails_circle"></div>
            <span class="orderleft">订单状态</span>
            <span class="orderright" v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' "> <!-- 微信支付，未付款 -->
                待付款
            </span>
            <span class="orderright" v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'ON_GOING' && item.payStatus === 'PAID' && item.deliverStatus === 'ON_THE_WAY' "> <!-- 微信支付，已付款，未发货 -->
                待发货
            </span>
            <span class="orderright" v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'ON_GOING' && item.payStatus === 'PAID' && item.deliverStatus === 'DELIVERED' "> <!-- 微信支付，已付款，已发货 -->
                待收货
            </span>
            <span class="orderright" v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'NOT_EVALUATED' && item.payStatus === 'PAID' && item.deliverStatus === 'CONFIRMED' "> <!-- 微信支付，已完成，未评价 -->
                待评价
            </span>

            <span class="orderright" v-if="item.payway === 'score' && item.orderStatus === 'ON_GOING' && item.deliverStatus === 'ON_THE_WAY' "> <!-- 积分兑换，未发货 -->
                待发货
            </span>
            <span class="orderright" v-if="item.payway === 'score' && item.orderStatus === 'ON_GOING' && item.deliverStatus === 'DELIVERED' "> <!-- 积分兑换，已发货 -->
                待收货
            </span>
            <span class="orderright" v-if="item.payway === 'score' && item.orderStatus === 'NOT_EVALUATED' && item.deliverStatus === 'CONFIRMED' "> <!-- 积分兑换，未评价 -->
                待评价
            </span>

            <span class="orderright" v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'ON_THE_WAY' "> <!-- 货到付款，未发货 -->
                待发货
            </span>
            <span class="orderright" v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'DELIVERED' "> <!-- 货到付款，已发货 -->
                待收货
            </span>
            <span class="orderright" v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'NOT_EVALUATED' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'CONFIRMED' "> <!-- 微信支付，已完成，未评价 -->
                待评价
            </span>
            <span class="orderright" v-if="item.orderStatus === 'APPLY_CANCEL' "> <!-- 订单取消中 -->
                订单取消中...
            </span>
            <span class="orderright" v-if="item.orderStatus === 'APPLY_DRAWBACK' "> <!-- 订单取消中 -->
                退款申请中...
            </span>
            <span class="orderright" style="color:#1591d4" v-if="item.orderStatus === 'CANCELED' "> <!-- 订单取消中 -->
                交易失败
            </span>
            <span class="orderright" v-if="item.drawbackStatus === 'SUCCESS' "> <!-- 退款成功 -->
                退款成功
            </span>
        </div>
        <div class="orderdetails_box">
            <img class="orderdetails_names" src="../assets/商家.png"/>
            <span class="orderleft">聪明惠购{{storeName}}</span>
        </div>
        <div class="orderdetails_box" v-for="(value,indexes) in JSON.parse(item.productDetailJson)" :key="indexes">
            <img class="express" :src="'http://img.cmhg.shop/'+ value.bizProductVo.icon" v-if="value.bizProductVo != null ">
            <img class="express" :src="'http://img.cmhg.shop/'+ value.icon" v-if="value.bizProductVo == null ">
            <img class="express" :src="'http://img.cmhg.shop/'+ value.icon" v-if="value.payway=='score' && value.bizProductVo == null">
            <!-- <div class="express_right" >
                <div class="express_righttop">
                    <span>{{value.bizProductVo == null?value.name:value.bizProductVo.name}}</span>
                    <span>x{{value.quantity}}</span>
                </div>
                <div class="express_rightbottom">
                    <span>￥{{value.price/100*value.quantity}}</span>
                    <span>申请售后</span>
                </div>              
            </div> -->
            <div class="express_right" v-if="item.payway!='score' && value.bizProductVo == null ">
                <div class="express_righttop">
                    <span>{{value.name}}</span>
                    <span>x{{value.quantity}}</span>
                </div>
                <div class="express_rightbottom">
                    <span>￥{{value.price/100*value.quantity}}</span>
                    <span>申请售后</span>
                </div>            
            </div>
            <div class="express_right" v-if="value.bizProductVo != null ">
                <div class="express_righttop">
                    <span>{{value.bizProductVo.name}}</span>
                    <span>x{{value.theNum}}</span>
                </div>
                <div class="express_rightbottom">
                    <span>￥{{value.bizProductVo.price/100*value.theNum}}</span>
                    <span>申请售后</span>
                </div>          
            </div>
            <div class="express_right" v-if="item.payway=='score' && value.bizProductVo == null">
                <div class="express_righttop">
                    <span>{{value.name}}</span>
                    <span>x{{value.quantity}}</span>
                </div>
                <div class="express_rightbottom">
                    <span>{{value.integral/100*value.quantity}}积分</span>
                    <span>申请售后</span>
                </div>            
            </div>
        </div>
        <div class="orderdetails_box" style="border-top: .01rem solid #efefef;">
            <div class="orderdetails_box_data"> 
                <span>收件人姓名：{{item.deliverName}}</span>
                <span>收件人电话：{{item.deliverPhone}}</span>
            </div>                       
        </div>
        <div class="orderdetails_box" style="border-top: .1rem solid #efefef;">
            <span class="orderdetails_box_no">备注：</span>
             <span class="orderdetails_delivery">{{item.comment==''?item.comment:'暂无备注'}}</span>
        </div>     
        <div class="orderdetails_box">
            <span>配送</span>
            <span class="orderdetails_delivery">送货上门</span>
        </div>   
        <div class="orderdetails_box">
            <div class="orderdetails_moneybottom">
                <span>实付款（含运费）</span>
                <span>{{item.payway=='score'?item.scoreUse/100+'积分':'￥'+item.totalFee/100}}</span>
            </div>
            <div class="orderdetails_money">
                <span>运费</span>
                <span>￥{{item.payway=='score'?0:item.deliverFee/100}}</span>
            </div>
        </div>     
        <div class="orderdetails_box" style="border-top: .01rem solid #efefef;">
            <div class="orderdetails_integration">
                <span>确认收货后可获得：</span>
                <span>{{item.payway=='score'?0:item.totalFee/100}}积分</span>
            </div>
        </div>
        <div class="orderdetails_box" style="border-top: .1rem solid #efefef;">
            <div class="orderdetails_number">
                <div>订单编号：{{item.serNum}}</div>
                <div v-if="item.payTime=='PAY_NOW'">支付方式：微信支付</div>
                <div v-if="item.payTime=='PAY_NEXT'">支付方式：货到付款</div>
                <div v-if="item.payway=='score'">支付方式：积分兑换</div>
                <div>下单时间：{{item.createTime}}</div>
                <div>成交时间：{{item.lastUpdateTime}}</div>
            </div>
        </div>
        <div class="orderdetails_box" style="padding: .105rem .11rem;" v-if="item.userOpenId==visitorOpenId">
            <div class="orderdetails_button">
                <span v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'NOT_PAY' && item.orderStatus === 'ON_GOING' " @click="todoWechatPay(item)"> <!-- 微信支付，未付款 -->
                    立即支付
                </span>
                <span v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'NOT_PAY' && item.orderStatus === 'ON_GOING' " @click="applyCancel(item)"> <!-- 微信支付，未付款 -->
                    取消订单
                </span>
                <span v-if="item.orderStatus === 'APPLY_CANCEL' ">
                    订单取消中...
                </span>
                <span v-if="item.drawbackStatus === 'SUCCESS' "> <!-- 退款成功 -->
                    退款成功
                </span>
                <span v-if="item.orderStatus === 'CANCELED' " @click="deleteorder(item)"> 
                    删除订单
                </span>
                <span v-if="item.orderStatus === 'APPLY_DRAWBACK' ">
                    退款申请中...
                </span>
                <span v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'ON_GOING' && item.payStatus === 'PAID' && item.deliverStatus === 'ON_THE_WAY' "> <!-- 微信支付，已付款，未发货 -->
                    等待发货
                </span>
                <span v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'ON_GOING' && item.payStatus === 'PAID' && item.deliverStatus === 'ON_THE_WAY' " @click="applyDrawback(item)"> <!-- 微信支付，已付款，未发货 -->
                    申请退款
                </span>
                <span style="color:#db2828;border-color:#db2828;" v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'PAID' && item.deliverStatus === 'DELIVERED' " @click="Confirmreceipt(item)"> <!-- 微信支付，已付款，已发货 -->
                    确认收货
                </span>
                <span style="color:#db2828;border-color:#db2828;" v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'PAID' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'NOT_EVALUATED'"> <!-- 微信支付，已完成，未评价 -->
                    立即评价
                </span>
                <span v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'PAID' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'NOT_EVALUATED'" @click="applyDrawback(item)"> <!-- 微信支付，已完成，未评价 -->
                    申请退款
                </span>
                <span v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'PAID' && item.deliverStatus === 'DELIVERED' "> <!-- 微信支付，已付款，已发货 -->
                    查看物流
                </span>

                <span v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'ON_THE_WAY' "> <!-- 货到付款，未发货 -->
                    等待发货
                </span>
                <span v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'ON_THE_WAY' " @click="applyCancel(item)"> <!-- 货到付款，未发货 -->
                    取消订单
                </span>
                <span style="color:#db2828;border-color:#db2828;" v-if="item.payTime === 'PAY_NEXT' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'DELIVERED' " @click="Confirmreceipt(item)"> <!-- 货到付款，已发货 -->
                    确认收货
                </span>
                <span v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'DELIVERED' "> <!-- 货到付款，已发货 -->
                    查看物流
                </span>
                <span style="color:#db2828;border-color:#db2828;" v-if="item.payTime === 'PAY_NEXT' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'NOT_EVALUATED'"> <!-- 货到付款，已完成，未评价 -->
                    立即评价
                </span>
                <span v-if="item.payTime === 'PAY_NEXT' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'NOT_EVALUATED'" @click="applyDrawback(item)"> <!-- 货到付款，已完成，未评价 -->
                    申请退款
                </span>

                <span v-if="item.payway === 'score' && item.orderStatus === 'ON_GOING' && item.deliverStatus === 'ON_THE_WAY' "> <!-- 积分兑换，未发货 -->
                    等待发货
                </span>
                <span style="color:#db2828;border-color:#db2828;" v-if="item.payway === 'score' && item.deliverStatus === 'DELIVERED' " @click="Confirmreceipt(item)"> <!-- 货到付款，已发货 -->
                    确认收货
                </span>
                <span v-if="item.payway === 'score' && item.orderStatus === 'ON_GOING' && item.deliverStatus === 'DELIVERED' "> <!-- 积分兑换，已发货 -->
                    查看物流
                </span>
                <span style="color:#db2828;border-color:#db2828;" v-if="item.payway === 'score' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'NOT_EVALUATED'"> <!-- 货到付款，已完成，未评价 -->
                    立即评价
                </span>
            </div>
        </div>
        <div class="orderdetails_box" style="padding: .105rem .11rem;" v-if="item.userOpenId!=visitorOpenId && business==true">
            <div class="orderdetails_button">
                <span v-if="item.drawbackStatus === 'SUCCESS' "> <!-- 退款成功 -->
                    退款成功
                </span>
                <span style="color:#db2828;border-color:#db2828;padding:0 .1rem;" v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'NOT_PAY' && item.orderStatus === 'ON_GOING' "> <!-- 微信支付，未付款 -->
                    等待用户支付
                </span>
                <span v-if="item.orderStatus === 'APPLY_CANCEL'" @click="confirmCancel(item)">
                   确认取消
                </span>
                <span v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'ON_GOING' && item.payStatus === 'PAID' && item.deliverStatus === 'ON_THE_WAY' " @click="deliveredBizOrder(item)"><!-- 微信支付，已付款，未发货 -->
                    配送货物
                </span>
                <span style="color:#db2828;border-color:#db2828;padding:0 .1rem;" v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'PAID' && item.deliverStatus === 'DELIVERED' "> <!-- 微信支付，已付款，已发货 -->
                    等待用户收货
                </span>
                <span style="color:#db2828;border-color:#db2828;" v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'PAID' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'NOT_EVALUATED'"> <!-- 微信支付，已完成，未评价 -->
                    查看评价
                </span>
                <span v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'PAID' && item.orderStatus === 'APPLY_DRAWBACK'" @click="confirmDrawback(item)"> <!-- 微信支付，已完成，未评价 -->
                    确认退款
                </span>
                <span v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'PAID' && item.deliverStatus === 'DELIVERED' "> <!-- 微信支付，已付款，已发货 -->
                    查看物流
                </span>

                <span v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'ON_THE_WAY' " @click="deliveredBizOrder(item)"> <!-- 货到付款，未发货 -->
                    配送货物
                </span>
                <span style="color:#db2828;border-color:#db2828;padding:0 .1rem;" v-if="item.payTime === 'PAY_NEXT' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'DELIVERED' "> <!-- 货到付款，已发货 -->
                    等待用户收货
                </span>
                <span v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'DELIVERED' "> <!-- 货到付款，已发货 -->
                    查看物流
                </span>
                <span style="color:#db2828;border-color:#db2828;" v-if="item.payTime === 'PAY_NEXT' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'NOT_EVALUATED'"> <!-- 货到付款，已完成，未评价 -->
                    查看评价
                </span>
                <span v-if="item.payTime === 'PAY_NEXT' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'APPLY_DRAWBACK'" @click="confirmDrawback(item)"> <!-- 货到付款，已完成，未评价 -->
                    确认退款
                </span>

                <span v-if="item.payway === 'score' && item.orderStatus === 'ON_GOING' && item.deliverStatus === 'ON_THE_WAY' " @click="deliveredBizOrder(item)"> <!-- 积分兑换，未发货 -->
                    配送货物
                </span>
                <span style="color:#db2828;border-color:#db2828;padding:0 .1rem;" v-if="item.payway === 'score' && item.deliverStatus === 'DELIVERED' "> <!-- 货到付款，已发货 -->
                    等待用户收货
                </span>
                <span v-if="item.payway === 'score' && item.orderStatus === 'ON_GOING' && item.deliverStatus === 'DELIVERED' "> <!-- 积分兑换，已发货 -->
                    查看物流
                </span>
                <span style="color:#db2828;border-color:#db2828;" v-if="item.payway === 'score' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'NOT_EVALUATED'"> <!-- 货到付款，已完成，未评价 -->
                    查看评价
                </span>
            </div>
        </div>
        <div class="orderdetails_box" style="border-top: .01rem solid #efefef;">
            <div class="orderdetails_phone">
                <span>如有疑问，请致电聪明惠购客服18038054405</span>
                <img src="../assets/电话.png">
            </div>
        </div>
        <div class="orderdetails_box" style="padding: .105rem .11rem;">
            <div class="orderdetails_button">
                <span>确认收货</span>
                <span>查看物流</span>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    import footer from '../components/footer'
    import {allOrder} from '../api/api.js';
    import { Toast } from 'mint-ui';    
    import { getSecond } from '../common/common.js'
    export default {
        components: {
        'footer-currency':footer
        },
        data(){
            return{
                orderdetails:[],
                storeName:'',//商店名字
            }
        },
        methods: {
            allOrderclick(){
                let params={
                    "id":this.$route.query.id                          
                }
                allOrder(params).then((result) => {
                    this.storeName=result.data.storeName;
                    if(result.data.bizOrder){
                        this.orderdetails.push(result.data.bizOrder);
                    }else if(result.data.bizIntegralOrder){
                        this.orderdetails.push(result.data.bizIntegralOrder);
                    }
                    for (let index = 0; index < 1; index++) {//循环每一个时间转换格式
                        if(result.data.bizOrder){
                            var time = getSecond(result.data.bizOrder.createTime)
                            this.orderdetails[index].createTime = time;
                            var lastUpdateTime = getSecond(result.data.bizOrder.lastUpdateTime)
                            this.orderdetails[index].lastUpdateTime = lastUpdateTime;
                        }else if(result.data.bizIntegralOrder){
                            var time = getSecond(result.data.bizIntegralOrder.createTime)
                            this.orderdetails[index].createTime = time;
                            var lastUpdateTime = getSecond(result.data.bizIntegralOrder.lastUpdateTime)
                            this.orderdetails[index].lastUpdateTime = lastUpdateTime;
                        }
                    }  
                    }).catch((err) => {
                        console.log(err)
                });
            },

        },
        created() {
            this.allOrderclick()
        }
    }
</script>
<style scoped>
.bigbox{
    width: 100%;
    float: left;
    background-color: #ffffff;
    overflow-x: hidden;
}
.orderdetails_box{
    font-size: .13rem;
    float: left;
    width: 95%;
    padding: .17rem .11rem;
    text-align: left;
}
.orderdetails_boxname{
    width: 3.2rem;
    float: right;
    font-size: .14rem;
}
.orderdetails_boxname>span:first-child{
    float: left;
}
.orderdetails_boxname>span:nth-child(2){
    float: right;
}
.orderdetails_boxname>div{
    float: left;
    text-align: left;
    margin-top: .12rem;
}
.box_left{
    width: .25rem;
    height:.25rem;
    float: left;
    margin-top: .15rem;
}
.orderleft{
    float: left;
    font-size: .13rem;
}
.orderright{
    float: right;
    font-size: .13rem;
}
.orderdetails_circle{
    width:.06rem;
    height: .06rem;
    background-color: #0288d1;
    border-radius: 50%;
    float: left;
    margin-top: .07rem;
    margin-right: .07rem;
}
.orderdetails_names{
    width: .17rem;
    height: .16rem;
    float: left ;
    margin-right: .07rem;
}
.express{
    width: .83rem;
    height: .83rem;
    float: left;
}
.express_right{
    width: 2.5rem;
    float: right;
}
.express_righttop{
    width: 100%;
    height: .5rem;
    float:left;
}
.express_righttop>span:first-child{
    float: left;
    width: 2.2rem;
}
.express_righttop>span:last-child{
    float: right;
}
.express_rightbottom{
    width: 100%;
    margin-top: .085rem;
    float:left;
}
.express_rightbottom>span:first-child{
    float: left;
    color: #ff0000;
    line-height: .25rem;
}
.express_rightbottom>span:last-child{
    float: right;
	width: .79rem;
	height: .23rem;
    border-Radius: .12rem;
    border-Width: .01rem;
    border-Color: #868686;
    border-style: solid;
    line-height: .23rem;
    color: #868686;
    font-size: .12rem;
    text-align: center;
}
.orderdetails_box_data{
    float: left;
    font-Size: .12rem;
    color: #868686;
}
.orderdetails_box_data>span{
    width: 1.7rem;
    float: left;
    text-align: left;
    overflow: hidden;
}
.orderdetails_productsize{
    width: 100%;
    float: left;
    margin-top: .15rem;
    font-Size:.1rem;
    color: #a39e9e;
}
.orderdetails_delivery{
    float: right;
    font-size: .13rem;
}
.orderdetails_money{
    float: left;
    width: 100%;
    font-Size: .12rem;
    color: #606060;
}
.orderdetails_money>span:last-child{
    float: right;
}
.orderdetails_moneybottom{
    float: left;
    width: 100%;
    font-Size: .14rem;
    color: #606060;
}
.orderdetails_moneybottom>span:last-child{
    color: #0288d1;
    float: right;
}
.orderdetails_integration{
    font-Size: .12rem;
    color: #6f6f6f;
}
.orderdetails_integration>span:last-child{
    color: #0288d1;
}
.orderdetails_number{
    font-Size: .12;
    color: #6f6f6f;
}
.orderdetails_number>div{
    margin-top: .11rem;
}
.orderdetails_number>div:first-child{
    margin-top: auto;
}
.orderdetails_phone{
    font-Size: .12rem;
    color: #6f6f6f;
}
.orderdetails_phone>img{
    width: .14rem;
    height: .14rem;
    margin-left: .06rem;
    vertical-align: bottom;
}
.orderdetails_button span{
    float: right;
	width: .81rem;
	height: .28rem;
    line-height: .28rem;
    text-align: center;
    border-radius: .14rem;
    border: .01rem solid #6f6f6f;
    color: #6f6f6f;
    cursor: pointer;
}
.orderdetails_button span:first-child{
    color: #ff0000;
    border: .01rem solid #ff0000;
    margin-left: .125rem;
}
.orderdetails_box:nth-child(2){
    border-bottom: .1rem solid #efefef;
}
</style>