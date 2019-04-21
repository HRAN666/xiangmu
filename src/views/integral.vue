<template>
    <div>
    <header-general  headTitle="积分商城" headClass="style4" routerTo='/'></header-general>
        <div class="integral_content">
            <div class="product" v-for="(item,index) in integralList" :key="index">
            <div class="productBlock">
                <img :src="'http://img.cmhg.shop/'+item.icon" class="">
                <p>{{item.name}}</p>
                <div class="productBlock_bottom"> 
                    <div class="productBlock_price">{{item.integral+'积分'}}</div>
                    <div class="productBlock_specification">{{item.saleVolume}}人已兑</div>
                    <span>兑换</span>
                </div>
            </div>
            </div>
         </div>
        <div class="integral-bottom"> 
            <div class="integral-to-the-end">
                <div class="integral-to-the-end-line"></div>
                <div class="integral-to-the-end-text">已经到底了</div>
                <div class="integral-to-the-end-line"></div>
            </div>
        </div>  
        <footer-currency></footer-currency>
    </div>
</template>
<script>
import header from '../components/header.vue'
import footer from '../components/footer.vue'
import {integral} from '../api/api.js'
export default {
    components:{
        'header-general':header,
        'footer-currency':footer
    },
    data() {
        return {
            integralList:''
        }
    },
    methods: {
        loadingIntegral(){
            let params={}
            integral(params).then((result) => {
                this.integralList=result.data.list
            }).catch((err) => {
                
            });
        }
    },
    mounted() {
        this.loadingIntegral()
    },
}
</script>
<style scoped>
.product{
    margin-top: .12rem;
}
.productBlock{
    width: 1.71rem;
    height: 1.9rem;
    float: left;
    margin-left: .13rem;
    background: #fff;
    border-radius:.1rem;
    margin-bottom: .2rem;
}
.productBlock span{
    font-size: .12rem;
    background: #0288d1;
    border-radius: .1rem;
    display: inline-block;
    width: .3rem;
    margin-left: .35rem;
    color: #fff;
    float: left;
    line-height: .2rem;
}
.productBlock>img{
    width: 1.44rem;
    height: 1.38rem;
}
.productBlock p{
    font-size: .14rem;
    margin-top: -.24rem;
    margin-left:.13rem;
    width: 1.4rem;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.productBlock div{
    font-size: .12rem;
    float: left;
    margin-left: .07rem;
    color: #0288d1;
}
.productBlock .productBlock_price{
    font-size: .14rem;
}
.productBlock .productBlock_specification{
    color: #888888;
    margin-top: .04rem;
    font-size: .11rem;
}
.productBlock_bottom{
    margin-top: -.08rem;
}
.integral-bottom{
    font-size: .12rem;
    width: 100%;
    position: relative;
    margin-bottom: .65rem;
    color:#a2a0a0;
}
.integral-to-the-end{
  position: relative;
  color: #a8a8a8;
  font-size: .16rem;
}
.integral-to-the-end .integral-to-the-end-line{
  border-top: #d8d8d8 solid .01rem;
  width: 1rem;
  position: relative;
  top:.23rem;
  height: .1rem;
}
.integral-to-the-end .integral-to-the-end-line:nth-child(1){
  float: left;
  margin-left: .3rem;
}
.integral-to-the-end .integral-to-the-end-line:nth-child(3){
  float: right;
  margin-right: .3rem;
}
.integral-to-the-end .integral-to-the-end-text{
  line-height: .45rem;
  width: .8rem;
  float: left;
  margin-left: .2rem;
  height: 1rem;
  top: .02rem;
}
</style>

