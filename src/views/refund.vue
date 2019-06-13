<template>
    <div>
        <div class="bigbox">
            <div class="orderdetails_box">
                <img class="orderdetails_names" src="../assets/商家.png"/>
                <span class="orderleft">聪明惠购{{storeName}}</span>
            </div>
            <div class="orderdetails_box">
                <img class="express" src="http://img.cmhg.shop/cmhg/BizCommodity/20180110_173859_313153.jpg">
                <div class="express_right">
                    <div class="express_righttop">
                        <span>111</span>
                        <span>x1</span>
                    </div>        
                </div>
            </div>
            <div class="refund">退款成功</div>
            <div class="orderdetails_box" style="border-top: 0.01rem solid rgb(239, 239, 239); padding: .01rem .11rem;"> 
                    <div class="express_rightbottom">
                        <span>查看详情</span>
                    </div>         
            </div>             
        </div>
        <div class="bigbox">
            <div class="orderdetails_box">
                <img class="orderdetails_names" src="../assets/商家.png"/>
                <span class="orderleft">聪明惠购{{storeName}}</span>
            </div>
            <div class="orderdetails_box">
                <img class="express" src="http://img.cmhg.shop/cmhg/BizCommodity/20180110_173859_313153.jpg">
                <div class="express_right">
                    <div class="express_righttop">
                        <span>士大夫但是都是非法</span>
                        <span>x1</span>
                    </div>        
                </div>
            </div>
            <div class="refund">退款成功</div>
            <div class="orderdetails_box" style="border-top: 0.01rem solid rgb(239, 239, 239); padding: .01rem .11rem;"> 
                    <div class="express_rightbottom">
                        <span>查看详情</span>
                    </div>         
            </div>             
        </div>
        <div class="bigbox">
            <div class="orderdetails_box">
                <img class="orderdetails_names" src="../assets/商家.png"/>
                <span class="orderleft">聪明惠购{{storeName}}</span>
            </div>
            <div class="orderdetails_box">
                <img class="express" src="http://img.cmhg.shop/cmhg/BizCommodity/20180110_173859_313153.jpg">
                <div class="express_right">
                    <div class="express_righttop">
                        <span>111</span>
                        <span>x1</span>
                    </div>        
                </div>
            </div>
            <div class="refund">退款成功</div>
            <div class="orderdetails_box" style="border-top: 0.01rem solid rgb(239, 239, 239); padding: .01rem .11rem;"> 
                    <div class="express_rightbottom">
                        <span>查看详情</span>
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
    }
</script>
<style scoped>
.refund{
    font-size:.12rem;
    float: left;
    width: 95%;
    margin: 0 .11rem;
    line-height: .24rem;
    text-align: left;
}
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
    padding: .1rem .11rem;
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
    margin-bottom: .085rem;
    float:right;
}

.express_rightbottom>span{
    float: right;
	width: .79rem;
	height: .23rem;
    border-radius: 0.03rem;
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
.orderdetails_box:last-child{
    border-bottom: .1rem solid #efefef;
}
</style>