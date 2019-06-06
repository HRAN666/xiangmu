<template>
    <div>
    <div class="header">
    <mt-header title="">
    <router-link to="/myself" slot="left">
        <mt-button icon="back">我的卡券</mt-button>
    </router-link>
    </mt-header>
    </div>
        <el-row class="usestate">
            <nav>
                <li v-for="item in usestate" :key="item.name" :class="{active : active == item.name}" @click="selected(item.name);onshow(item.tabId);" >{{item.name}}(3)</li>
            </nav>
        </el-row>
        <div class="unused" v-show="tab==0">
            <div class="coupon">
                <div class="coupon-message">
                    <div class="coupon-price"><span>￥</span>95<span>线下通用</span></div>
                    <div class="coupon-right">
                        <div class="coupon-right-title"><span>代金券</span>仅限购买休闲食品</div>
                        <div class="coupon-right-content">本券仅供买满95元以上使用（实买金额大于95元）</div>
                    </div>
                </div>
                <div class="coupon-open">
                    <div class="coupon-open-retract" v-bind:style="{display: retract}">展开优惠码<span @click="onopen()">2018.11.22-2018.11.30<img src="../assets/coupon-retract.png" alt=""></span></div>
                    <div class="coupon-open-open" v-bind:style="{display: open}">
                        <span @click="onretract()">2018.11.22-2018.11.30<img src="../assets/coupon-open.png" alt=""></span>
                        <div class="bar-code"><img src="../assets/bar-code.png" alt=""></div>
                    </div>
                </div>
            </div>
            <div class="coupon">
                <div class="coupon-message">
                    <div class="coupon-price"><span>￥</span>999<span>线下通用</span></div>
                    <div class="coupon-right">
                        <div class="coupon-right-title"><span>代金券</span>仅限购买休闲食品</div>
                        <div class="coupon-right-content">本券仅供买满50元以上使用（实买金额大于50元）</div>
                    </div>
                </div>
                <div class="coupon-open">
                    <div class="coupon-open-retract" v-bind:style="{display: retract}">展开优惠码<span @click="onopen()">2018.11.22-2018.11.30<img src="../assets/coupon-retract.png" alt=""></span></div>
                    <div class="coupon-open-open" v-bind:style="{display: open}">
                        <span @click="onretract()">2018.11.22-2018.11.30<img src="../assets/coupon-open.png" alt=""></span>
                        <div class="bar-code"><img src="../assets/bar-code.png" alt=""></div>
                    </div>
                </div>
            </div>
            <div class="coupon">
                <div class="coupon-message">
                    <div class="coupon-price on"><span>￥</span>999<span>线上通用</span></div>
                    <div class="coupon-right">
                        <div class="coupon-right-title"><span class="coupon-on">代金券</span>仅限购买休闲食品</div>
                        <div class="coupon-right-content">本券仅供买满50元以上使用（实买金额大于50元）</div>
                    </div>
                </div>
                <div class="coupon-open">
                    <div class="coupon-open-retract" v-bind:style="{display: retract}">展开优惠码<span @click="onopen()">2018.11.22-2018.11.30<img src="../assets/coupon-retract.png" alt=""></span></div>
                    <div class="coupon-open-open" v-bind:style="{display: open}">
                        <span @click="onretract()">2018.11.22-2018.11.30<img src="../assets/coupon-open.png" alt=""></span>
                        <div class="bar-code"><img src="../assets/bar-code.png" alt=""></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="used" v-show="tab==1">
            <div class="coupon">
                <div class="coupon-message">
                    <div class="coupon-price-used"><span>￥</span>95<span>线上通用</span></div>
                    <div class="coupon-right">
                        <div class="coupon-right-title-used"><span class="used">代金券</span>仅限购买休闲食品<img src="../assets/used.png" alt=""></div>
                        <div class="coupon-right-content">本券仅供买满95元以上使用（实买金额大于95元）</div>
                    </div>
                </div>
                <div class="coupon-open">
                    <div class="coupon-open-retract" v-bind:style="{display: retract}">展开优惠码<span @click="onopen()">2018.11.22-2018.11.30<img src="../assets/coupon-retract.png" alt=""></span></div>
                    <div class="coupon-open-open" v-bind:style="{display: open}">
                        <span @click="onretract()">2018.11.22-2018.11.30<img src="../assets/coupon-open.png" alt=""></span>
                        <div class="bar-code"><img src="../assets/bar-code.png" alt=""></div>
                    </div>
                </div>
            </div>
            <div class="coupon">
                <div class="coupon-message">
                    <div class="coupon-price-used"><span>￥</span>999<span>线上通用</span></div>
                    <div class="coupon-right">
                        <div class="coupon-right-title-used"><span class="used">代金券</span>仅限购买休闲食品<img src="../assets/used.png" alt=""></div>
                        <div class="coupon-right-content">本券仅供买满50元以上使用（实买金额大于50元）</div>
                    </div>
                </div>
                <div class="coupon-open">
                    <div class="coupon-open-retract" v-bind:style="{display: retract}">展开优惠码<span @click="onopen()">2018.11.22-2018.11.30<img src="../assets/coupon-retract.png" alt=""></span></div>
                    <div class="coupon-open-open" v-bind:style="{display: open}">
                        <span @click="onretract()">2018.11.22-2018.11.30<img src="../assets/coupon-open.png" alt=""></span>
                        <div class="bar-code"><img src="../assets/bar-code.png" alt=""></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="expiration" v-show="tab==2">
            <div class="coupon">
                <div class="coupon-message">
                    <div class="coupon-price-used"><span>￥</span>95<span>线上通用</span></div>
                    <div class="coupon-right">
                        <div class="coupon-right-title-used"><span class="used">代金券</span>仅限购买休闲食品<span class="expiration">已过期</span></div>
                        <div class="coupon-right-content">本券仅供买满95元以上使用（实买金额大于95元）</div>
                    </div>
                </div>
                <div class="coupon-open">
                    <div class="coupon-open-retract" v-bind:style="{display: retract}">展开优惠码<span @click="onopen()">2018.11.22-2018.11.30<img src="../assets/coupon-retract.png" alt=""></span></div>
                    <div class="coupon-open-open" v-bind:style="{display: open}">
                        <span @click="onretract()">2018.11.22-2018.11.30<img src="../assets/coupon-open.png" alt=""></span>
                        <div class="bar-code"><img src="../assets/bar-code.png" alt=""></div>
                    </div>
                </div>
            </div>
            
            <div class="coupon">
                <div class="coupon-message">
                    <div class="coupon-price-used"><span>￥</span>999<span>线上通用</span></div>
                    <div class="coupon-right">
                        <div class="coupon-right-title-used"><span class="used">代金券</span>仅限购买休闲食品<span class="expiration">已过期</span></div>
                        <div class="coupon-right-content">本券仅供买满50元以上使用（实买金额大于50元）</div>
                    </div>
                </div>
                <div class="coupon-open">
                    <div class="coupon-open-retract" v-bind:style="{display: retract}">展开优惠码<span @click="onopen()">2018.11.22-2018.11.30<img src="../assets/coupon-retract.png" alt=""></span></div>
                    <div class="coupon-open-open" v-bind:style="{display: open}">
                        <span @click="onretract()">2018.11.22-2018.11.30<img src="../assets/coupon-open.png" alt=""></span>
                        <div class="bar-code"><img src="../assets/bar-code.png" alt=""></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        // 'header-general':header
    },
    data () {
        return {
            tab:'',
            usestate: [
                {name: '待使用',tabId: '0'},
                {name: '已使用',tabId: '1'},
                {name: '已过期',tabId: '2'},
            ],
            active:'待使用',
            retract: 'block',
            open: 'none',
		}
    },
    mounted(){
       
    },
    methods:{
        onopen:function(){
            if(this.retract=='block'){
                this.retract="none";
                this.open='block';
            }
        },
        onretract:function(){
            if(this.open=='block'){
                this.open="none";
                this.retract='block';
            }
        },
        selected(name){
            this.active = name;
        },
        onshow(tabId){
            this.tabId=tabId;
            this.tab=this.tabId;
        }
    }
}
</script>
<style>
.header .mint-header{
    height: .5rem;
    background: #0288D1;
}
.header .mint-button-text{
    font-size: .16rem;
}
</style>
<style scoped>
.usestate{
    background-color: #ffffff;
    height: .55rem;
    position: relative;
}
.usestate nav{
    margin: 0 auto;
    width: 90%;
}
.usestate nav li{
    text-indent: .03rem;
    line-height: .5rem;
    list-style: none;
    text-decoration: none;
    width: .8rem;
    margin-left: .48rem;
    font-size: .15rem;
    float: left;
}
.usestate nav li:nth-child(1){
    margin-left: .0;
}
.usestate nav li span{
    margin-left: .08rem; 
}
.usestate nav .active{
    text-indent: .03rem;
    line-height: .5rem;
    list-style: none;
    text-decoration: none;
    width: .8rem;
    margin-left: .48rem;
    font-size: .15rem;
    float: left;
    color: #0288d1;
    border-bottom: .05rem solid #0288d1; 
}
.coupon{
    margin: .2rem auto;
    width: 93%;
}
.coupon-message{
    background-color: #ffffff;
    border-radius: .08rem;
}
.coupon .coupon-price{
    position: relative;
    background-color: #e9eff1;
    color:#0288d1;
    font-size: .4rem;
    height: 1rem;
    padding-top: .32rem;
    width: 1.2rem;
    border-radius: .08rem 0 0 .08rem;
}
.coupon .coupon-message .on{
    background-color: #0288d1;
    color:#ffffff;
}
.coupon .coupon-price span:nth-child(1){
    margin-left: -.15rem;
    font-size: .2rem;
}
.coupon .coupon-price span:nth-child(2){
    position:absolute;
    top: .8rem;
    left: .15rem;
    width: .8rem;
    font-size: .15rem;
}
.coupon .coupon-price-used{
    position: relative;
    background-color: #ffffff;
    color:#868686;
    font-size: .4rem;
    height: 1rem;
    padding-top: .32rem;
    width: 1.2rem;
    border-radius: .08rem 0 0 .08rem;
}
.coupon .coupon-price-used span:nth-child(1){
    margin-left: -.15rem;
    font-size: .2rem;
}
.coupon .coupon-price-used span:nth-child(2){
    position:absolute;
    top: .8rem;
    left: .15rem;
    width: .8rem;
    font-size: .15rem;
}
.coupon .coupon-right{
    float: left;
    margin-top: -1.1rem;
    margin-left: 1rem;
}
.coupon .coupon-right .coupon-right-title{
    font-size: .15rem;
}
.coupon .coupon-right .coupon-right-title-used{
    color: #868686;
    font-size: .15rem;
    position: relative;
}
.coupon .coupon-right .coupon-right-title span{
    margin-right: .06rem;
    font-family: "等线";
    background-color: #e9f0f4;
    padding: .03rem .08rem .03rem .08rem;
    border-radius: .08rem;
    color: #0288d1;
    font-weight: bold;
    width: .2rem;
    font-size: .13rem;
}
.coupon .coupon-right .coupon-right-title-used .used{
    margin-right: .06rem;
    font-family: "等线";
    background-color: #ffffff;
    padding: .02rem .07rem .02rem .07rem;
    border-radius: .08rem;
    border: .01rem solid #868686;
    color: #868686;
    font-weight: bold;
    width: .2rem;
    font-size: .13rem;
}
.coupon .coupon-right .coupon-right-title-used img{
    position: absolute;
    height: 0.8rem;
    top: -.33rem;
    left: 1.82rem;
}
.coupon .coupon-right .coupon-right-title-used .expiration{
    position: absolute;
    top: -.2rem;
    right: .05rem;
    font-size: .15rem;
    width: .5rem;
    color: #0288d1;
}
.coupon .coupon-right .coupon-on{
    color: #ffffff;
    background-color: #0288d1;
}
.coupon .coupon-right .coupon-right-content{
    font-size: .12rem;
    margin-top: .1rem;
    color: #9c9c9c;
    text-align: left;
    margin-left: 0.35rem;
}
.coupon-open{
    background-color: #ffffff;
    border-radius: .08rem;
    font-size: .14rem;
    line-height: .4rem;
    text-indent: .1rem;
    color: #b6b6b6;
    text-align: left;
}
.coupon-open .coupon-open-retract span{
    float:right;
    margin-right: .15rem;
}
.coupon-open .coupon-open-retract span img{
    width: .15rem;
    position: relative;
    top: .03rem;
    left: .05rem;
}
.coupon-open .coupon-open-open{
    margin-top: -.02rem;
    border-top:0.02rem dashed #e9f0f4;
}
.coupon-open .coupon-open-open span{
    float:right;
    margin-right: .15rem;
}
.coupon-open .coupon-open-open span img{
    width: .15rem;
    position: relative;
    top: .03rem;
    left: .05rem;
}
.coupon-open .coupon-open-open .bar-code{
    height: 1.5rem;
    width: 3rem;
    text-align: center;
    margin: 0 auto;
}
.coupon-open .coupon-open-open .bar-code img{
    height: 1rem;
}
</style>