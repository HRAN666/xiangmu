<template>
  <div class="home">
    <div class="home-seach">
          <div class="home-seach-gps" @click="selectSchool">
            <img src="../assets/gps.png" alt="">
            <p>深圳技师学院</p>
          </div>
          <div class="home-seach-shop"> 
            <img src="../assets/seach.png" alt="">
            <el-input  placeholder="请输入内容" v-model="seachContent" @click.native="goSeach"></el-input>
          </div>
    </div>
    <div class="home-banner">
      <el-carousel :interval="5000" arrow="never">   
        <el-carousel-item v-for="(item,index) in bannerImg" :key="index">
        <img :src="'http://'+item" alt="">
      </el-carousel-item>
      </el-carousel>
    </div>
    <div class="home-shop">
      <div class="home-shop-list">
        <el-row :gutter="10">
            <el-col :span="6" v-for="(item,index) in shopList" :key="index">
              <img :src="'http://'+item.icon" alt="">
              <p>{{item.nodeName}}</p>
            </el-col>
        </el-row>
      </div>
    </div>
          <img src="../assets/Substitute.png" alt="" class="home-sub">  
      <div class="home-substitute">
        <a href="express"><img src="../assets/wati_express.png" alt="" class="home-watiexpress"></a>
        <a href="expressmedicines"><img src="../assets/wait_serve.png" alt="" class="home-waitserve"></a>
        <a href="expressfood"><img src="../assets/wait_canteen.png" alt="" class="home-waitcanteen"></a>    
      </div>
    <div class="home-subfor" v-for="(item,index) in shopModels" :key="index">  

        <div class="home-title">
            <img src="../assets/comm.png" alt="" class="home-sub">
            <span>{{item.nodeName}}</span>
            <img src="../assets/go.png" alt="" class="home-to">
        </div>
          <div class="home-discount">          
            <div class="home-discount-shoplist" @click="gotoDetails(value.id)" v-for="(value,indexes) in item.bizProduct" :key="indexes">
                <img :src= "'http://img.cmhg.shop/'+ value.icon" alt="">
                <p>{{value.name}}</p>
                <div>
                  <span class="home-discount-shoplist-price">{{value.price|filtertoMoney}}</span>
                  <span>999人付款</span>
                  <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar" @click="addShop(value.storeId,value.id,value.price,indexes)">
                </div>
            </div>
          </div>
      </div>
      <div class="home-bottom">我是有底线的</div>      
      <footer-currency></footer-currency>
  </div>
</template>

<script>
import footer from '../components/footer'
import { Toast } from 'mint-ui';
import {selectCatalogParentWithoutToken,shopmodel,homeBanner,addShop} from '../api/api.js'
import {filtertoMoney} from '../../filter/filter.js'
export default {
  components: {
    'footer-currency':footer
  },
  data () {
    return {
      seachContent:'',//seach的值
      bannerImg:[],//bannerImg
      shopList:'',
      resultShopListLength:8,//配置list显示个数
      shopModels:'',// 存放商品模块
      shopget:'', //代取服务
      showShop:[{
          
      }],//控制显示的动画的数组
      indexes:0,//选中的img索引位置
    }
  },
  methods: {
    selectSchool(){
      this.$router.push('/location')
      },
      goSeach(){
        this.$router.push('/commoditiesList')
      },
      loadingShopList(){
        let params={};
          selectCatalogParentWithoutToken(params).then((result) => {
              this.shopList=result.data.list;
              this.shopList.splice(this.resultShopListLength, this.shopList.length-this.resultShopListLength)
          }).catch((err) => {
              console.log(err)
          });


      },
      addShop(storeId,id,price,indexes){
          let params={
              "productId":id,
              "userOpenId":localStorage.getItem('userOpenId'),
              "storeId":storeId
          }
          addShop(params).then((result) => {
              Toast({
                  message: '成功加入购物车',
                  duration: 1000
                  });
          }).catch((err) => {
              
          });
      },
      loadingShopModel(){
        let params={}
        shopmodel(params).then((result) => {
                let day = [];
            for (let index = 0; index < result.data.list.length; index++) {
              if(result.data.list[index].nodeName !== '代取服务'){
                day.push(result.data.list[index]);//带每日折扣数组
              }else{
                var get = [];
                get.push(result.data.list[index]);//带代取数组
              }
              this.shopModels=day;
            }  
        }).catch((err) => {
            console.log(err)
        });
      },
        loadingBanner(){
          let params={}
            homeBanner(params).then((result) => {
              for (let index = 0; index < result.data.list.length; index++) {
                  this.bannerImg.push(JSON.parse(result.data.list[index].banner)[index].url)
              }  
            }).catch((err) => {
              
            });
        },
        gotoDetails(id){//go商品详情
            this.$router.push({path:'/commodityDetails',query:{id:id}})//id:商品详情渲染的id
        }
  },
  mounted () {
    this.loadingBanner();
    this.loadingShopList();
    this.loadingShopModel();
  }
}
</script>
<style>
.home .el-input__inner{
  border-radius: .5rem;
  padding: 0 .4rem;
  width: 2.3rem;
  position: relative;
  bottom: .07rem
}
.home .el-carousel__container{
  height: 1.72rem;
}
.home .el-carousel{
  overflow-x: inherit
}
</style>

<style scoped>
.home{
      overflow: hidden;
}
.home-seach{
  background:#f8f8f8;
  height: .55rem;
}
.home-seach .home-seach-gps img{
  width: .16rem;
  height:.16rem;
  float: left;
  margin-top: .15rem;
  margin-left:.20rem;
}
.home-seach .home-seach-gps{
  font-size: .14rem;
  color: #0288d1;
  width: 37%;
  float: left;
  margin-top: .07rem;
}
.home-seach-shop{
  margin-top: -.5rem;
  float: left;
  width: 60%;
}
.home-seach-shop img{
    width: .2rem;
    height: .2rem;
    position: absolute;
    z-index: 888;
    top: .22rem;
    left: 40%;
}
.home-banner {
  height: 1.57rem;
}
.home-banner img{
  width:100%;
  height: 100%;;
}
.home-shop{
  background:#fff;
  margin-top:.15rem;
}
.home-shop-list{
    font-size:.12rem;
    padding-top:.15rem;
    color:#bbb7b7;
    font-weight: bold;
}
.home-shop-list img{
  width:.42rem;
  height: .42rem;
}
.home-sub{
  width:1.55rem;
  margin-bottom:.5rem;
}
.home-substitute{
  text-align: left;
  margin-top:-.5rem;
  margin-bottom:.1rem
}
.home-substitute img{
  background:#fff;
  margin-left:.09rem;
}
.home-watiexpress{
    width:37%;
    height: 1.15rem;
}
.home-waitserve{
  width:27%;
}
.home-waitcanteen{
  width:27%;
}
.home-discount{
  margin-top:-.85rem;
  height: 2.85rem;
}
.home-discount-shoplist{
  height: 2.3rem;
  width: 47%;
  background: #fff;
  float: left;
  text-align:left;
  margin-left:.08rem;
  padding-left: .15rem;
  box-sizing: border-box;
  margin-top:.1rem;
  border-radius: .05rem;
}
.home-discount-shoplist img{
  width:85%;
  padding:.05rem;
}
.home-discount-shoplist {
  font-size:.14rem;
}
.home-discount-shoplist .home-discount-shoplist-price{
  color:#0489D1;
  font-size:.14rem;
}
.home-discount-shoplist  span{
  margin-right:.12rem;
  font-size:.12rem;
  color:#888888;
}
.home-title{
    position: relative;
    top:-.25rem;
}
.home-to{
    position: absolute;
    width: .2rem;
    right: .28rem;
    top: .23rem;
}
.home-discount-shoplist .home-discount-shopCar{
  width:.21rem;
  position: relative;
  top: .05rem;
  padding:0;
}
.home-bottom{
    font-size: .12rem;
    width: 100%;
    position: relative;
    margin-bottom: .89rem;
    top: .2rem;
    color:#a2a0a0;
}
.home-bottom::before{
  content:'';
  position: absolute;
  border: .1px #e0dddd solid;
  width: 27%;
  left: .43rem;
  bottom: .06rem;
}
.home-bottom::after{
  content:'';
  position: absolute;
  border: .1px #e0dddd solid;
  width: 27%;
  right: .43rem;
  bottom: .06rem;
}
.home-title span{
    font-size: 17px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    color: #0288D1;
    font-weight: bold;
    margin-top:.2rem;
}
</style>
