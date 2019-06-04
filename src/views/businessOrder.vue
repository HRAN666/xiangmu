<template>
    <div>
        <header-general routerTo="/Home" headTitle="商家订单" headClass="style6"></header-general>
        <div class="date">
            <img src="../assets/before_day.png" alt="" @click="reductDate">
            <el-date-picker v-model="createTime" @change='getDate' type="date" placeholder="选择日期"></el-date-picker>
            <img src="../assets/next_day.png" alt="" @click="addDate">
        </div>    
        <div class="type">
            <div class="goodstype">
               <el-dropdown trigger="click"  @command="handledeliveryCommand">
                <span class="el-dropdown-link">
                    {{delivery==''?'全部货态':delivery}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='全部货态'>全部货态</el-dropdown-item>
                <el-dropdown-item command='待发货'>待发货</el-dropdown-item>
                <el-dropdown-item command='送货中'>送货中</el-dropdown-item>
                <el-dropdown-item command='已送达'>已送达</el-dropdown-item>
            </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="line"></div>
            <div class="moneytype">
                <el-dropdown trigger="click"  @command="handlepayCommand">
                <span class="el-dropdown-link">
                    {{payState==''?'全部款态':payState}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='全部款态'>全部款态</el-dropdown-item>
                <el-dropdown-item command='已支付'>已支付</el-dropdown-item>
                <el-dropdown-item command='未支付'>未支付</el-dropdown-item>
            </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="information_content">
        <div class="information_content_null" v-bind:style="{display: retract}">
            <img src="../assets/businessOrder_null.png" alt="" >
            <p>没有更多订单数据了~</p>
        </div>
        <div class="information" v-for="(item,index) in orderList" :key="index">
            <div class="information-day"><span><img src="../assets/no_choice.png">{{item.createTime}}</span><span>订单号：</span><span>{{item.id}}</span></div>
            <div class="information-name">
                <div class="information-name-left">
                    <div>收件人：<span>{{item.deliverName+' '+item.deliverPhone}}</span></div>
                    <div>收货地址：<span>{{item.deliverAddress}}</span></div>
                    <div>付款方式：<span v-if="item.payTime === 'PAY_NOW' ">微信支付</span>
                        <span v-if="item.payTime === 'PAY_NEXT' ">货到付款</span>
                        <span v-if="item.payway === 'score' ">积分兑换</span>
                    </div>
                    <div>付款状态：<span v-if="item.payStatus === 'PAID' ">已支付</span>
                        <span v-if="item.payStatus === 'NOT_PAY' ">未支付</span>
                        <span v-if="item.payway === 'score' ">已支付</span>
                    </div>
                </div>
                <div class="information-name-right">
                    <div v-if="item.orderStatus === 'ON_GOING' && item.deliverStatus === 'ON_THE_WAY' ">
                        待发货
                    </div>
                    <div v-if="item.orderStatus === 'ON_GOING' && item.deliverStatus === 'DELIVERED' ">
                        送货中
                    </div>
                    <div v-if="item.orderStatus === 'NOT_EVALUATED' && item.deliverStatus === 'CONFIRMED' ">
                        已送达
                    </div>
                    <div>订单进行中</div>
                </div>
            </div>
            <div class="information-total">
                <div class="information-goodstotal">共<span>{{JSON.parse(item.productDetailJson).length}}</span>件商品<span>合计：</span><span>{{item.totalFee==undefined?(item.scorePrice/100)+'积分':'￥'+(item.totalFee/100).toFixed(2)}}</span></div>
            </div>
        </div>
        </div>
        <div class="footer" v-bind:style="{position: position,display: footerretract}">
            <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import header from '../components/header.vue'
import {timestampToTime,DayTimes,getDay,getSecond} from '../common/common.js'
import {historyOrder} from '../api/api.js'
import { Toast } from 'mint-ui';
export default {
    components: {
        'header-general':header
    },
    data () {
        return {
            orderList:[],
            pageNo:1,//默认第一页
            currentPage: 1,
            totalCount:0,//返回数量
            delivery:'',//货态
            payState:'',//款态
            pageSize:5,//默认显示5条
            position: 'fixed',
            retract: 'none',
            footerretract:'block',
            phoneHeight: '',//屏幕的高
            addHeight: '',//页面的高
            recordDelivery:'',//收货状态
            recordPayState:'',//支付状态
            createTime: new Date().getTime(),//获取当前时间
        }
    },
    methods: {
        loadingOrder(){//加载数据
            this.phoneHeight = document.documentElement.clientHeight//获取屏幕的高
            let params={
                "createTime":this.createTime,
                'payStatus':arguments[3],
                'deliverStatus':arguments[2],
                'pageNo':arguments[1]==undefined||arguments[1]==''?this.pageNo:arguments[1],//分页
                'pageSize':this.pageSize
            }
            historyOrder(params).then((result) => {
                this.orderList=[]
                this.totalCount=result.data.totalCount;
                for (let index = 0; index < result.data.list.length; index++) {//循环每一个时间转换格式
                    this.orderList.push(result.data.list[index])
                    var time = getSecond(result.data.list[index].createTime)
                    this.orderList[index].createTime = time;
                    var new_vid = (result.data.list[index].id)
                    if (new_vid.length > 10){
                        new_vid = new_vid.substring(0,6)+'......'+new_vid.substring(new_vid.length-10,new_vid.length);
                        this.orderList[index].id = new_vid;
                    }
                }
                if(result.data.list.length==0){
                    this.retract='block';
                    this.footerretract='none';
                }else{
                    this.retract='none';
                    this.footerretract='block';
                }
                this.addHeight=132+90+217*result.data.list.length;//获取页面的高3
                // console.log('页面高：'+this.addHeight)
                // console.log('屏幕高：'+this.phoneHeight)
                if(this.addHeight-this.phoneHeight>0){//当页面高度超过手机高度时候，分页置下
                    this.position='relative'
                }else{//当页面高度小于手机高度时候，分页固定
                    this.position='fixed'
                }
            }).catch((err) => {
                console.log(err)
            });
        },
        handledeliveryCommand(params){//货态
            this.delivery=params
            this.pageNo=1//每次搜索默认1
            switch (params) {
                case '全部货态':
                    this.loadingOrder('','','',this.recordPayState)
                    this.recordDelivery=''
                    break;
                case '待发货':
                    this.loadingOrder('','','ON_THE_WAY',this.recordPayState) 
                    this.recordDelivery='ON_THE_WAY'
                    break;
                case '送货中':
                    this.loadingOrder('','','DELIVERED',this.recordPayState)
                    this.recordDelivery='DELIVERED'
                    break;
                case '已送达':
                    this.loadingOrder('','','CONFIRMED',this.recordPayState) 
                    this.recordDelivery='CONFIRMED'
                    break;
                default:
                    break;
            }
        },
        handlepayCommand(params){//款态
            this.payState=params
            this.pageNo=1//每次搜索默认1
            switch (params) {
                case '全部款态':
                    this.loadingOrder('','',this.recordDelivery,'')
                    this.recordPayState=''
                    break;
                case '已支付':
                    this.loadingOrder('','',this.recordDelivery,'PAID')
                    this.recordPayState='PAID'
                    break;
                case '未支付':
                    this.loadingOrder('','',this.recordDelivery,'NOT_PAY')
                    this.recordPayState='NOT_PAY'
                    break;
                default:
                    break;
            }
        },
        handleSizeChange(val) {//显示数量
            this.pageNo=1//每次选择默认1
            this.pageSize= val;
            this.loadingOrder('',this.pageNo,this.recordDelivery,this.recordPayState)
        },
        handleCurrentChange(val) {//页码
            this.pageNo= val;
            this.loadingOrder('',this.pageNo,this.recordDelivery,this.recordPayState)
        },
        reductDate(){//前一天
            this.pageNo=1//每次选择默认1
            this.createTime = (this.createTime) - 24*60*60*1000
            this.loadingOrder('','',this.recordDelivery,this.recordPayState)
        },
        addDate(){//后一天
            this.pageNo=1//每次选择默认1
            this.createTime = (this.createTime) + 24*60*60*1000 
            this.loadingOrder('','',this.recordDelivery,this.recordPayState)
        },
        getDate(){
            this.createTime=(this.createTime).getTime()
            this.loadingOrder('','',this.recordDelivery,this.recordPayState)
        },
    },
    created () {
       this.loadingOrder()
    }
}
</script>
<style>
.date .el-input{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
}
.date .el-input__inner{
    height: .36rem;
}
.date .el-input--prefix .el-input__inner{
    text-align: center;
    border: none;
}
.date .el-icon-date:before{
    display: none;
}
.date .el-date-editor .el-icon-circle-close{
    display: none;
}
.block{
    position: relative;
    top: .1rem;
}
.btn-prev{
    position: absolute;
    top: .4rem;
    left: 0;
}
.el-pager{
    position: absolute;
    top: .4rem;
    left: .3rem;
}
.btn-next{
    position: absolute;
    top: .4rem;
    right: 0;
}
.el-pager li{
    min-width: 34px;
}
</style>

<style scoped>
.date{
    height: .36rem;
    background: #fff;
    position: relative;
}
.date img{
    width:.14rem;
    height:.14rem;
}
.date img:nth-of-type(1){
    float: left;
    position: absolute;
    top: .1rem;
    left: 10%;
    z-index: 99;
}
.date img:nth-of-type(2){
    float: right;
    position: absolute;
    top: .1rem;
    right: 10%;
    z-index: 99;
}
.type{
    position: relative;
    background-color: #ffffff;
    font-size: .17rem;
    height: .5rem;
    margin-top: .01rem;
    width: 100%;
}
.type .goodstype{
    width: 50%;
    float: left;
    line-height: .5rem;
}
.type .type_img{
    width: .17rem;
    height: .17rem;
    position: relative;
    top: .02rem;
    padding-left: .2rem;
}
.type .moneytype{
    width: 50%;
    float: left;
    line-height: .5rem;
}
.type .line{
    position:absolute;
    height: .4rem;
    width: .01rem;
    background-color: #efefef;
    left: 50%;
    top: .05rem;
}
.information_content{
    margin-bottom: .6rem;
}
.information{
    text-align: left;
    margin-top: .1rem;
    background-color: #ffffff;
}
.information_content_null img{
    width: .5rem;
    margin-top: .55rem
}
.information_content_null p{
    margin-top: -.1rem;
    font-size: .14rem;
    color: #797878;
}
.information-day{
    color: #868686;
    line-height: .35rem;
    font-size: .13rem;
    border-bottom: .01rem solid #efefef;
    padding-left: .1rem;
}
.information-day span:nth-child(2){
    padding-left: .1rem;
} 
.information-day span:nth-child(3){
    max-width: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.information-day img{
    position: relative;
    width: .1rem;
    height: .1rem;
    padding-right: .05rem;
}
.information-name{
    height: 1.2rem;
    border-bottom: .01rem solid #efefef;
}
.information-name-left{
    color: #000;
    font-size: .14rem;
    height: 1.2rem;
    width: 2.8rem;
    float: left;
    margin-top: .2rem;
    margin-left: .1rem;
}
.information-name-left div{
    line-height: .2rem;
}
.information-name-right{
    font-size: .14rem;
    height: 1.2rem;
    width: 0.8rem;
    float: left;
    margin-top: .2rem;
}
.information-name-right div:nth-child(1){
    color: #dc2d2d;
}
.information-name-right div:nth-child(2){
    color: #e18601;
}
.information-total{
    height: .5rem;
    font-size: .15rem;
    color: #000;
}
.information-total .information-goodstotal{
    width: 2rem;
    float:right;
}
.information-total .information-goodstotal span:nth-child(2){
    margin-left: .2rem;
}
.footer{
    position: fixed;
    bottom: 0;
    overflow:hidden;
    width: 100%;
    height: .9rem;
    background-color: #ffffff;
}
</style>