<template>
    <div>
        <!--购物车模块&&搜索商品列表弹窗-->
        <div :class="{'popup':displayPopup,'ispopup':isPoup}" v-if="popup=='style1'">
            <div class="popup_list">
                <span>收货地址</span>
                <div class="popup_list_color" @click="router">
                    {{addressDetail==''?'请选择收货地址':addressDetail}}
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
                <span>支付方式</span>
                <div>
                <el-dropdown  @command="handleCommand" trigger="click" >
                <span class="el-dropdown-link">
                  <img src="../assets/wechatPay.png" alt="" v-if="selectCommand=='wechat'" class="popup_list_wechat">{{selectpay}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='wechat'>微信支付</el-dropdown-item>
                    <el-dropdown-item command='wait'>货到付款</el-dropdown-item>
                </el-dropdown-menu>
                <img src="../assets/down.png" alt=""> 
                </el-dropdown>
                </div>
            </div>
            <div class="popup_list">
                <span>应付总额</span>
                <div class="popup_list_color">
                   ￥{{total}}(x{{quantity}})
                    <img src="../assets/down.png" alt="">
                </div>
            </div>
            <div class="popup_bottom">
                <span class="popup_bottom_first">积分</span>
                <span class="popup_bottom_second">购买可得{{integral}}积分</span>
            </div>
            <el-button type="primary" @click="toPay">提交订单</el-button>
        </div>

        <!--商品详情和其他模块-->
        <div :class="{'popup':displayPopup,'ispopup2':isPoup}" v-if="popup=='style5'">
            <div class="details-message-img">
                <img :src="'http://img.cmhg.shop/'+img" alt="">
            </div>
            <div class="details-message-right">
                <div class="details-message-right-title">{{title}}</div>
                <div class="details-message-right-price">{{integral!=0?'￥'+price.toFixed(2):price/100+'积分'}}</div>
                <div class="details-message-right-number">数量：<el-input-number @change="handleChange" size="mini" v-model="num" :min="1" :max="99"></el-input-number></div>
            </div>
            <div class="popup_list">
                <span>收货地址</span>
                <div class="popup_list_color" @click="router">
                {{addressDetail==''?'请选择收货地址':addressDetail}}
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
            <div class="popup_list"  v-if="integral==0">
                <span>支付方式</span>
                <div >
                    积分消费
                    <img src="../assets/down.png" alt="">
                </div>
            </div>
            <div class="popup_list" v-if="integral!=0">
                <span>支付方式</span>
                <div>
                <el-dropdown  @command="handleCommand" trigger="click" >
                <span class="el-dropdown-link">
                  <img src="../assets/wechatPay.png" alt="" v-if="selectCommand=='wechat'" class="popup_list_wechat">{{selectpay}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='wechat'>微信支付</el-dropdown-item>
                    <el-dropdown-item command='wait'>货到付款</el-dropdown-item>
                </el-dropdown-menu>
                <img src="../assets/down.png" alt="" @click="handleCommand"> 
                </el-dropdown>
                </div>
            </div>
            <div class="popup_list">
                <span>应付总额</span>
                <div class="popup_list_color">
                    {{integral!=0?'￥'+total.toFixed(2):total+'积分'}}<span>(x{{quantity}})</span>
                </div>
            </div>
            <div class="popup_bottom">
                <span class="popup_bottom_first">积分</span>
                <span class="popup_bottom_second">购买可得{{integral}}积分</span>
            </div>
            <el-button type="primary" @click="toPay" v-if="integral!=0">提交订单</el-button>
            <el-button type="primary" @click="toExchange">立即兑换</el-button>
        </div>

        <div class="express-message" :class="{'express-message':displayPopup,'express-message_second':isPoup}" v-if="popup!='style1'">
            <div class="express-message-img">
                <img src="../assets/details_wati_express.png" v-if="popup=='style2'">
                <img src="../assets/details_wati_expressfood.png" v-if="popup=='style3'"><!--代取食堂-->
                <img src="../assets/details_wati_expressmedicines.png" v-if="popup=='style4'"><!--代取药-->
            </div>
            <div class="express-message-right">
                <div class="express-message-right-title">{{title}}</div>
                <div class="express-message-right-price">￥1.00</div>
                <div class="express-message-right-number">数量：1件</div>
            </div>
            <form v-if="popup=='style2'">
                <p>收件人姓名：<input type="text" name="name" placeholder="填写收件人名"></p>
                <p>收件人电话：<input type="text" name="phone" placeholder="填写收件人手机号码"></p>
                <p>快递名称：<span class="choose-express" @click="express">选择快递公司<span>></span></span></p>
                <p>快递单号：<input type="text" name="express-number" placeholder="填写快递单号"></p>
                <p>备注：</p><textarea name="message" rows="4" cols="30" placeholder="选填"></textarea>
            </form>
            <form v-if="popup=='style3'">
                <p>饭堂名称：<input type="text" name="name" placeholder="填写饭堂名称"></p>
                <p>菜名：<input type="text" name="phone" placeholder="填写要下单的菜名"></p>
                <p>备注：</p><textarea name="message" rows="4" cols="30" placeholder="忌口、佐料、餐具要求"></textarea>
            </form>
             <form  v-if="popup=='style4'">
                <p>代取商品：<input type="text" name="name" placeholder="填写代取商品类别"></p>
                <p>代取数量：<input type="text" name="phone" placeholder="填写代取商品数量"></p>
                <p>备注：</p><textarea name="message" rows="4" cols="30" placeholder="选填"></textarea>
            </form>
            <div class="button">确 认</div>
        </div>

        <div class="choose-express-message" v-show="expressShow"><!--代取快递模块-->
           <div class="choose-express-title">
               <div class="choose-express-back"><img src="../assets/arrow.png" alt="">返回</div>
               <div class="no-find-express">找不到快递公司<img src="../assets/question_mark.png" alt=""></div>
           </div>
           <div class="all-express-list">
                <div>
                    <h1 class="all-express-letter">常用快递</h1>
                    <ul class="all-express-content"><li>顺丰快递</li></ul>
                    <ul class="all-express-content"><li>中通快递</li></ul>
                    <ul class="all-express-content"><li>申通快递</li></ul>
                    <ul class="all-express-content"><li>圆通快递</li></ul>
                    <ul class="all-express-content"><li>韵达快递</li></ul>
                </div>
                <h1 class="all-express-letter">A</h1>
                <ul class="all-express-content"><li>AAE快递</li></ul>
                <ul class="all-express-content"><li>安能快递</li></ul>
                <ul class="all-express-content"><li>安世通快递</li></ul>
           </div>
           <ul class="all-letter-list">
               <li><a href="#*">*</a></li>
               <li><a href="#A">A</a></li>
               <li><a href="#B">B</a></li>
               <li><a href="#C">C</a></li>
               <li><a href="#D">D</a></li>
               <li><a href="#E">E</a></li>
               <li><a href="#F">F</a></li>
               <li><a href="#G">G</a></li>
               <li><a href="#H">H</a></li>
               <li><a href="#I">I</a></li>
               <li><a href="#J">J</a></li>
               <li><a href="#K">K</a></li>
               <li><a href="#L">L</a></li>
               <li><a href="#M">M</a></li>
               <li><a href="#N">N</a></li>
               <li><a href="#O">O</a></li>
               <li><a href="#P">P</a></li>
               <li><a href="#Q">Q</a></li>
               <li><a href="#R">R</a></li>
               <li><a href="#S">S</a></li>
               <li><a href="#T">T</a></li>
               <li><a href="#U">U</a></li>
               <li><a href="#V">V</a></li>
               <li><a href="#W">W</a></li>
               <li><a href="#X">X</a></li>
               <li><a href="#Y">Y</a></li>
               <li><a href="#Z">Z</a></li>
           </ul>
        </div>
    </div>
</template>
<script>
import {payNow,payNext,lookaddAddress} from '../api/api.js'
import { Toast } from 'mint-ui';
export default {
    inject:['reload'],
    props:['popup','title',"price","img","integral","quantity","total","shopInf","fromProduct"],/*title:模块名字 popup 弹窗类型 price 商品单价 img 商品缩略图 integral购买后获得的积分 total总价格 shopInf 商品信息*/
    data () {
        return {
            displayPopup:true,//初始样式默认不弹窗
            isPoup:false,//弹窗
            expressShow:false,//选择快递的控件
            selectCommand:'wechat',//选择支付方式
            selectpay:'微信支付',
            num:this.$props.quantity,//数量
            addressDetail:'',//收货地址
            shopDetail:'',
            consignee:'',//收货人
            phone:'',//收货人电话
        }
    },
    methods: {
        router(){
            this.$router.push('/address')
        },
        express(){
            this.expressShow=true
        },
        handleCommand(command) {
           this.selectCommand=command
            switch (command) {
                case 'wechat':
                    this.selectpay='微信支付'
                    break;
                case 'wait':
                    this.selectpay='货到付款'                    
                    break;
                default:
                    break;
            }
        },
        toPay(){//微信支付||货到付款
            if (this.addressDetail=='') {
                Toast({
                    message: '请填写收货信息',
                    duration: 1000
                });
            }else{
                let params={
                    'userOpenId':localStorage.getItem('userOpenId'),
                    'deliverFee':'0',//暂时写0(运费)
                    'deliverName':this.consignee,//收货人
                    'deliverPhone':this.phone,//收货电话
                    'deliverAddress':this.addressDetail,//收货地址
                    'productDetailJson':JSON.stringify(this.$props.shopInf),//商品信息
                    'totalFee':this.$props.total*100,//总价格
                    'totalNum':this.$props.quantity,//商品购买总量
                    'ext1':'测试',
                    'payTime':this.selectCommand=='wait'?'PAY_NEXT':'PAY_NOW',//货到付款:PAY_NEXT,立即支付:PAY_NOW
                    'fromProduct':this.$props.fromProduct==1?1:0
                }
               switch (this.selectCommand) {
                    case 'wechat'://微信支付
                        payNow(params).then((result) => {
                            if (result.data.resultCode==200) {
                                this.wechatpay(result.data);
                            }
                        }).catch((err) => {
                            console.log(err)
                        });
                        break;
                    case 'wait'://货到付款
                        payNext(params).then((result) => {
                            if (result.data.resultCode==200) {
                                this.reload()
                                Toast({
                                    message: '提交订单成功，请尽快支付',
                                    duration: 1000
                                });
                            }else if(result.data.resultCode==406){
                                Toast({
                                    message: '你上次订单尚未支付',
                                    duration: 1000
                                });
                            }
                        }).catch((err) => {
                            console.log(err)
                        });
                        break;
                    default:
                        break;
                }               
            }
        },
        wechatpay(data){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId":data.wxId,     //公众号名称，由商户传入     
                    "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数     
                    "nonceStr":data.nonceStr, //随机串     
                    "package":"prepay_id="+data.prepayId,
                    "signType":"MD5",         //微信签名方式：     
                    "paySign":data.sign//微信签名 
                },
                function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    Toast({
                        message: '支付成功!',
                        duration: 1000
                    });
                    this.reload()
                }else if(res.err_msg == "get_brand_wcpay_request:cancel" ){
                    Toast({
                        message: '取消支付',
                        duration: 1000
                    });
                }else{
                    Toast({
                        message: '支付失败！',
                        duration: 1000
                    });
                }
            });
        },
        handleChange() {
            this.$emit('addquantity',this.num)
        },
        toExchange(){
            this.$emit('toExchange')
        },
        seachAddress(){
            let params={
                "userOpenId":localStorage.getItem('userOpenId')
            }
            lookaddAddress(params).then((result) => {
                if(result.data.resultCode==200){
                    for (let i = 0; i < result.data.list.length; i++) {
                        if (result.data.list[i].status==1) {
                            this.addressDetail=result.data.list[i].detailedAddress+result.data.list[i].campus+result.data.list[i].dormitory
                            this.consignee=result.data.list[i].consignee
                            this.phone=result.data.list[i].phone
                        }   
                    }
                }
            }).catch((err) => {
                console.log(err)
            });
        },
    },
    created () {
       this.seachAddress()
    },
    computed: {

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
    top:-.57rem;
}
.popup_list .el-dropdown{
    position: absolute;
    right: 0rem;
}
.ispopup2 .el-button--primary{
    position: relative;
    bottom: .63rem;
    width: 100%;
    left: 0;
    border-radius: 0;
    top:-.57rem;
}
.details-message-right-number .el-input-number--mini{
    width: .75rem;
    margin-right: .05rem;
}
.details-message-right-number .el-input-number--mini .el-input-number__decrease, .el-input-number--mini .el-input-number__increase{
    width: .2rem;
    top: .04rem;
    height: .18rem;
}
.details-message-right-number .el-input-number--mini .el-input__inner{
   padding: 0 .3rem;
}
.details-message-right-number .el-input--mini .el-input__inner{
    height: .2rem;
}
.details-message-right-number .el-icon-minus:before{
    font-size: .16rem;
    position: relative;
    top: -.03rem;
}
.details-message-right-number .el-icon-plus:before{
    font-size: .16rem;
    position: relative;
    top: -.03rem;
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
.ispopup2{
    height: 5.1rem;
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
.popup_list .popup_list_wechat{
    left: -.1rem;
    width:.2rem;
    height: .2rem;
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
.popup_list .popup_list_color span{
    float: none;
    margin-left: 0;
    color: #555555;
}
.popup_bottom {
    font-size: .12rem;
    position: relative;
    height: .2rem;
    line-height: .3rem;
    width: 100%;
    top: 0;
    text-align: right;
}
.popup_bottom span{
    padding-top:.11rem;
    margin-right:.1rem
}
.popup_bottom .popup_bottom_first{
    border:1px soild #d23d3d;
    color:#d23d3d;
}
.popup_bottom .popup_bottom_second{
    color:#949494;
}
.details-message-img{
    display: table-cell; 
    vertical-align: middle;
    text-align: center;
    position: relative;
    margin:0 auto;
    float: left;
    top: .2rem;
    left: .2rem;
    height: 1.1rem;
    width: 1.3rem;
    border: .01rem solid #ccc;
}
.details-message-img img{
    height: 70%;
}
.details-message-right{
    text-align: left;
    position: relative;
    top: .2rem;
    left: .3rem;
    height: 1.4rem;
}
.details-message-right .details-message-right-title{
    font-size: .17rem;
    width: 3.4rem;
    color: #242424;
}
.details-message-right .details-message-right-price{
    position: absolute;
    top: .6rem;
    left: 1.3rem;
    font-size: .18rem;
    color: #0288d1;
}
.details-message-right .details-message-right-number{
    position: absolute;
    top: .7rem;
    left: 1.35rem;
    margin-top: .2rem;
    font-size: .14rem;
    color: #888888;
}
/**********代取************/
.express-message{
    position: fixed;
    left: 0;
    bottom: -5.1rem;
    z-index: 11;
    background-color: #ffffff;
    font-size: .17rem;
    text-align: left;
    margin: 0 auto;
    height: 5.1rem;
    width: 100%;
    transition:.5s all;
}
.express-message_second{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 11;
    background-color: #ffffff;
    font-size: .17rem;
    text-align: left;
    margin: 0 auto;
    height: 5.1rem;
    width: 100%;
    transition:.5s all;
}
.express-message .express-message-img{
    float: left;
    position: relative;
    top: .2rem;
    left: .2rem;
    height: 1.1rem;
    width: 1.3rem;
    border: .01rem solid #ccc;
}
.express-message .express-message-img img{
    position: relative;
    top: .2rem;
    width: 100%;
}
.express-message .express-message-right{
    position: relative;
    top: .2rem;
    left: .3rem;
}
.express-message .express-message-right .express-message-right-title{
    margin-top: .12rem;
    font-size: .17rem;
    color: #242424;
}
.express-message .express-message-right .express-message-right-price{
    margin-top: .08rem;
    font-size: .18rem;
    color: #0288d1;
}
.express-message .express-message-right .express-message-right-number{
    margin-top: .2rem;
    font-size: .14rem;
    color: #888888;
}
.express-message form{
    position:relative;
    top: .25rem;
    left: .2rem;
    font-size: .15rem;
    color: #242424;
}
.express-message form p{
    width: 88%;
    border-bottom: .01rem #e8e8e8 solid;
    padding-bottom: .1rem;
    margin-top: .2rem;
}
.express-message form p:nth-last-child(2){
    border-bottom:none;
}
.express-message form p input{
    font-size: .15rem;
    border: none;
    position: relative;
    top: -0.02rem;
}
.express-message form .choose-express{
    line-height: .2rem;
    font-size: .15rem;
    margin-left: .2rem;
    float: right;
    margin-right: .2rem;
    color: #888;
}
.express-message form .choose-express span{
    position: relative;
    top: .01rem;
    font-size: .18rem;
    padding-left: .08rem;
    font-family: '黑体';
}
.express-message form textarea{
    font-size: .15rem;
    position: relative;
    top: -.5rem;
    left: .45rem;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border:none;
    resize : none;
}
.button{
    position: absolute;
    line-height: .5rem;
    font-size: .2rem;
    text-align: center;
    color: #fff;
    background: #0288d1;
    bottom: 0;
    width: 100%;
    height: .5rem;
}
.choose-express-message{
    position: fixed;
    bottom: 0rem;
    left: 0;
    z-index: 11;
    background-color: #ffffff;
    font-size: .17rem;
    text-align: left;
    margin: 0 auto;
    width: 100%;
}
.choose-express-title{
    height: .25rem;
}
.choose-express-back{
    margin-top: .11rem;
    margin-left: .3rem;
    font-size: .16rem;
    line-height: .3rem;
    color: #000000;
}
.choose-express-back img{
    position: absolute;
    left: .08rem;
    top: .16rem;
    width: .19rem;
    height: .19rem;
}
.choose-express-message .no-find-express{
    position: absolute;
    top: .07rem;
    right: .3rem;
    font-size: .14rem;
    color: #1d95d6;
    line-height: .35rem;
    float: right;
}
.choose-express-message .no-find-express img{
    position: absolute;
    top: .1rem;
    left: 1.02rem;
    width: .15rem;
    height: .15rem;
}
.choose-express-message div .all-express-letter{
    color: #777777;
    font-size: .15rem;
    background-color: #efefef;
    line-height: .35rem;
    padding-left: .08rem;
}
.choose-express-message .all-express-content{
    color: #666666;
    font-size: .15rem;
    line-height: .25rem;
    height: .34rem;
    padding-left: .08rem;
    border-bottom: #efefef solid 0.01rem;
}
.choose-express-message .all-express-content:nth-last-child(1){
    border-bottom:none;
    height: 0.2rem;
}
.choose-express-message .all-letter-list{
    width: .3rem;
    border-radius:.1rem 0 0 .1rem; 
    text-align: center;
    position: fixed;
    float: right;
    right: 0;
    bottom: -0.05rem;
    height: 4.65rem;
    background-color: rgba(102,102,102,0.24);
}
.choose-express-message .all-letter-list li{
    height: .17rem;
}
.choose-express-message .all-letter-list li a{
    font-size: .15rem;
    text-decoration: none;
    color: #333333;
    font-weight: bold;
}
.choose-express-message .all-letter-list li:nth-child(1) a{
    font-size: .25rem;
}
</style>

