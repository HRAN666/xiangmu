<template>
    <div class="bigbox">
        <div class="orderdetails_box" style="border-bottom: .01rem solid #f7f7f7;">
            <img class="box_left" src="../assets/收货地址.png"/>
            <div class="orderdetails_boxname">
                <span>苟富贵</span>
                <span>13755867641</span>
                <div>地址：广东省深圳市龙岗区 龙城街道将军路1号深圳技师学院北校门</div>
            </div>
        </div>
        <div class="orderdetails_box" style="border-bottom: .1rem solid #f7f7f7;">
            <div class="orderdetails_circle"></div>
            <span class="orderleft">订单状态</span>
            <span class="orderright">已发货</span>
        </div>
        <div class="orderdetails_box" style="border-bottom: .01rem solid #f7f7f7;">
            <img class="orderdetails_names" src="../assets/商家.png"/>
            <span class="orderleft">聪明惠购XX分店</span>
        </div>
        <div class="orderdetails_box" style="border-bottom: .01rem solid #f7f7f7;padding: .07rem .11rem;">
            <img class="express" src="../assets/wati_express.png"/>
            <div class="express_right">
                <div class="express_righttop">
                    <span>代取快递</span>
                    <span>x1</span>
                </div>
                <div class="express_rightbottom">
                    <span>￥0.00</span>
                    <span>申请售后</span>
                </div>            
            </div>
        </div>
        <div class="orderdetails_box" style="border-bottom: .1rem solid #f7f7f7;">
            <div class="orderdetails_box_data"> 
                <span>收件人姓名：苟富贵</span>
                <span>收件人电话：13755867641</span>
            </div>
            <div class="orderdetails_box_data" style="margin-top:.07rem;">  
                <span>收件人姓名：苟富贵</span>
                <span>收件人电话：13755867641</span>
            </div>
            <div class="orderdetails_box_data"  style="margin-top:.07rem;"> 
                <span>备注：物品贵重，轻拿轻放，谢谢</span>
            </div>                        
        </div>
        <div class="orderdetails_box" style="border-bottom: .01rem solid #f7f7f7;padding: .07rem .11rem;">
            <img class="express" src="../assets/wati_express.png"/>
            <div class="express_right">
                <div class="express_righttop">
                    <span>代取快递</span>
                    <span>x1</span>
                </div>
                <div class="express_rightbottom">
                    <span>￥0.00</span>
                    <span>申请售后</span>
                </div>            
            </div>
        </div>
        <div class="orderdetails_box" style="border-bottom: .1rem solid #f7f7f7;">
            <div class="orderdetails_box_data"> 
                <span>收件人姓名：苟富贵</span>
                <span>收件人电话：13755867641</span>
            </div>
            <div class="orderdetails_box_data" style="margin-top:.07rem;">  
                <span>收件人姓名：苟富贵</span>
                <span>收件人电话：13755867641</span>
            </div>
            <div class="orderdetails_box_data"  style="margin-top:.07rem;"> 
                <span>备注：物品贵重，轻拿轻放，谢谢</span>
            </div>                        
        </div>
        <div class="orderdetails_box" style="border-bottom: .01rem solid #f7f7f7;padding: .07rem .11rem;">
            <img class="express" src="../assets/wati_express.png"/>
            <div class="express_right">
                <div class="express_righttop">
                    <span>msone日本漂白漂白水漂白剂白色衣物去黄去污渍专用洗白染色还原剂</span>
                    <span>x1</span>                    
                </div>
                <div class="orderdetails_productsize">净重：1500ml</div>
                <div class="express_rightbottom">
                    <span>￥0.00</span>
                    <span style="border: none;width:auto">该商品不支持售后</span>
                </div>            
            </div>
        </div>        
        <div class="orderdetails_box" style="border-bottom: .01rem solid #f7f7f7;padding: .16rem .11rem;">
            <span class="orderdetails_box_no">备注：</span>
            <span>无</span>
        </div>        
    </div>
</template> 
<script>
    import footer from '../components/footer'
    export default {
        components: {
        'footer-currency':footer
        },
        el:'.bigbox',
        data(){
        return{
            box_text:'可口可乐摩登罐 330*24 整箱装 可口可乐出品'
        }
        
        },
        methods: {
        },
        mounted () {
        
        }
    }
</script>
<style>
.bigbox{
    width: 100%;
    float: left;
    background-color: #ffffff;
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
.orderdetails_boxname>span:last-child{
    float: right;
}
.orderdetails_boxname>div{
    float: left;
    text-align: left;
    margin-top: .12rem;
}
.box_left{
    width: .2rem;
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
    /* margin-top: 0.05rem; */
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
    font-Size: .11rem;
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
/* .express_right span:nth-child(2){ 子极第二个
    font-size: 30px;
} */
/* .express_right span:nth-of-type(2){
    font-size: 30px;
} */
/* .orderdetails_box_no span:nth-child(2){ 
font-size: 30px;
} */
.orderdetails_box_no{
    font-size: .14rem;
}
.orderdetails_box_no+span{
    font-size: .14px;
    color:#a39e9e;
}
</style>


