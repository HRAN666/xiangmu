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
              <img :src="'http://'+item.icon" alt="" @click="modelSeach(item.catalogId)">
              <p>{{item.nodeName}}</p>
            </el-col>
        </el-row>
      </div>
    </div>
    <div class="home-subfor express" v-for="(item,indexes) in shopget" :key="indexes">  
      <div class="home-title" style="top:0rem">
          <img src="../assets/get.png" alt="" class="home-sub">
          <span>{{item.nodeName}}</span>
          <img src="../assets/go.png" alt="" class="home-to">
      </div>
      <div class="home-substitute">
        <img src="../assets/wati_express.png" alt="" class="home-watiexpress" @click="toexpress">
        <img src="../assets/wait_canteen.png" alt="" class="home-waitcanteen" @click="toexpressfood"> 
        <img src="../assets/wait_serve.png" alt="" class="home-waitserve" @click="toexpressmedicines">
      </div>
    </div>

    <div class="home-subfor" v-for="(item,index) in shopModels" :key="index">  
        <div class="home-title">
            <img :src="'http://igo.vrdete.com/mp2/img/'+ item.bizProduct[0].nodeType+'.png'" alt="" class="home-sub">
            <span>{{item.nodeName}}</span>
            <img src="../assets/go.png" alt="" class="home-to" @click="modelSeach(item.catalogId)">
        </div>
          <div class="home-discount">          
            <div class="home-discount-shoplist" @click="gotoDetails(value.id)" v-for="(value,indexes) in item.bizProduct" :key="indexes" v-if="indexes<4"><!--限制渲染条数-->
                <div class="home-discount-img"><img :src= "'http://img.cmhg.shop/'+ value.icon" alt=""></div>
                <p>{{value.name}}</p>
                <div>
                  <span class="home-discount-shoplist-price">{{value.price|filtertoMoney}}</span>
                  <span>{{value.salesVolume}}人付款</span>
                  <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar" @click="addShop(value.storeId,value.id,value.price)">
                </div>
            </div>
          </div>
      </div>
      <div class="to-the-end">
        <div class="to-the-end-text">已经到底了</div>
      </div>  
      <footer-currency></footer-currency>
  </div>
</template>

<script>
import footer from '../components/footer'
import { Toast } from 'mint-ui';
import {selectCatalogParentWithoutToken,shopmodel,homeBanner,addShop} from '../api/api.js'
import {filtertoMoney} from '../filter/filter.js'
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
    }
  },
  methods: {
    toexpress(){
      this.$router.push('/express')
    },
    toexpressfood(){
      this.$router.push('/expressfood')
    },
    toexpressmedicines(){
      this.$router.push('/expressmedicines')
    },
    selectSchool(){
      this.$router.push('/location')
    },
    goSeach(){
      this.$router.push('/commoditiesList')
    },
    modelSeach(catalogId){
      this.$router.push({path:'/commoditiesList',query:{'catalogId':catalogId}})
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
      addShop(storeId,id){
          let params={
              "productId":id,
              "userOpenId":localStorage.getItem('userOpenId'),
              "storeId":storeId
          }
          event.stopPropagation(); 
          this.$store.dispatch('addtoShop',params).then((result) => {
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
            let get = [];
            for (let index = 0; index < result.data.list.length; index++) {
              if(result.data.list[index].nodeName !== '代取服务'){
                day.push(result.data.list[index]);//带每日折扣数组
              }else{
                get.push(result.data.list[index]);//带代取数组
              }
            }  
            this.shopget=get;
            this.shopModels=day;
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
                console.log(err)
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
.home-seach .home-seach-gps p{
  position: absolute;
  top: .05rem;
  left: .4rem;
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
  font-size:.13rem;
  padding-top:.15rem;
  color:#bbb7b7;
  font-weight: bold;
}
.home-shop-list img{
  width:.6rem;
  height: .6rem;
}
.home-sub{
  width:1.55rem;
  margin-bottom:.5rem;
}
.home-substitute{
  text-align: left;
  margin-top:-.5rem;
  margin-bottom:.5rem
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
  margin-top:-.5rem;
}
.home-discount-shoplist{
  height: 2.5rem;
  width: 47%;
  background: #fff;
  float: left;
  text-align:center;
  margin-left:.08rem;
  padding-left: .1rem;
  box-sizing: border-box;
  margin-bottom:.1rem;
  border-radius: .05rem;
  position: relative;
  top: -.8rem;
}
.home-discount-shoplist {
  font-size:.15rem;
}
.home-discount-shoplist div:nth-child(3){
  position: relative;
  text-align: left;
  margin-left: -.02rem;
  margin-top: -.06rem;
}
.home-discount-shoplist .home-discount-shoplist-price{
  color:#0489D1;
  font-size:.16rem;
}
.home-discount-shoplist p{
  text-align: left;
  display: inline-block;
  width: 1.65rem;
  margin-left: -.02rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.home-discount-shoplist span:nth-child(2){
  display: inline-block;
  text-indent: 0.05rem;
  font-size:.13rem;
  color:#888888;
}
.home-discount-img{
  display: table-cell; 
  vertical-align: middle;
  text-align: center;
  width: 1.6rem;
  height: 1.7rem;
  position: relative;
  margin:0 auto
}
.home-discount-img img{
  width: 100%;
}
.home-title{
  position: relative;
  top:-.72rem;
  width: 100%;
  display: inline-block;
}
.home-to{
    position: absolute;
    width: .2rem;
    right: -.78rem;
    top: .23rem;
}
.home-discount-shoplist .home-discount-shopCar{
    width: 0.24rem;
    position: absolute;
    top: 0.05rem;
    right: 0.07rem;
    padding: 0;
}
.to-the-end{
  position: relative;
  color: #a8a8a8;
  font-size: .16rem;
  height: 1rem;
  top: 4.32rem;
}

.to-the-end .to-the-end-text{
  margin: 0 auto;
  line-height: .45rem;
  width: 100%;
  position:absolute;
  top: .02rem;
}
.to-the-end .to-the-end-text:after{
  content: '';
  position: absolute;
  top: .21rem;
  left: .26rem;
  width: 30%;
  background: #cec9c9;
  height: .01rem;

}
.to-the-end .to-the-end-text:before{
  content: '';
  position: absolute;
  top: .21rem;
  right: .26rem;
  width: 30%;
  background: #cec9c9;
  height: .01rem;
}
.home-title span{
  font-size: 0.18rem;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  color: #0288D1;
  font-weight: bold;
  margin-top:.2rem;
}
.express .home-title span{
  color: #943c1e;
}
</style>
