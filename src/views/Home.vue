<template>
  <div class="home">
    <div class="home-seach">
          <div class="home-seach-gps" @click="selectSchool">
            <img src="../assets/gps.png" alt="">
            <p>深圳技师学院</p>
          </div>
          <div class="home-seach-shop">
            <img src="../assets/seach.png" alt="">
            <el-input  placeholder="请输入内容" v-model="seachContent"></el-input>
          </div>
    </div>
    <div class="home-banner">
      <el-carousel :interval="5000" arrow="never">
        <el-carousel-item v-for="(item,index) in bannerImg" :key="index">
        <img src="../assets/Bannner.jpg" alt="">
      </el-carousel-item>
      </el-carousel>
        <!-- <img src="../assets/Bannner.jpg" alt=""> -->
    </div>
    <div class="home-shop"  @click="handleClick($event)">
      <div class="home-shop-list">
        <el-row :gutter="10">
            <el-col :span="6">
              <img src="../assets/shopCar.png" alt="">
              <p>休闲食品</p>
            </el-col>
            <el-col :span="6">
              <img src="../assets/shopCar.png" alt="">
              <p>休闲食品</p>
            </el-col>
            <el-col :span="6">
              <img src="../assets/shopCar.png" alt="">
              <p>休闲食品</p>
            </el-col>
            <el-col :span="6">
              <img src="../assets/shopCar.png" alt="">
              <p>休闲食品</p>
          </el-col>
        </el-row>
      </div>
       <div class="home-shop-list">
        <el-row :gutter="10">
            <el-col :span="6">
              <img src="../assets/shopCar.png" alt="">
              <p>休闲食品</p>
            </el-col>
            <el-col :span="6">
              <img src="../assets/shopCar.png" alt="">
              <p>休闲食品</p>
            </el-col>
            <el-col :span="6">
              <img src="../assets/shopCar.png" alt="">
              <p>休闲食品</p>
            </el-col>
            <el-col :span="6">
              <img src="../assets/shopCar.png" alt="">
              <p>休闲食品</p>
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
      <div class="home-title">
          <img src="../assets/comm.png" alt="" class="home-sub">
          <span>优惠到底</span>
      </div>
          <img src="../assets/go.png" alt="" class="home-to">
      <div class="home-discount">
          <div>
          <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
           <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
            <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
           <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
          </div>
      </div>
      <div class="home-title">
          <img src="../assets/comm.png" alt="" class="home-sub">
          <span>优惠到底</span>
      </div>
          <img src="../assets/go.png" alt="" class="home-to">
      <div class="home-discount">
          <div>
          <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
           <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
          <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
           <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
          </div>
      </div>
            <div class="home-title">
          <img src="../assets/comm.png" alt="" class="home-sub">
          <span>优惠到底</span>
      </div>
          <img src="../assets/go.png" alt="" class="home-to">
      <div class="home-discount">
          <div>
          <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
           <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
          <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
           <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
          </div>
      </div>
            <div class="home-title">
          <img src="../assets/comm.png" alt="" class="home-sub">
          <span>优惠到底</span>
      </div>
          <img src="../assets/go.png" alt="" class="home-to">
      <div class="home-discount">
          <div>
          <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
           <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
          <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
           <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
          </div>
      </div>
        <div class="home-title">
          <img src="../assets/comm.png" alt="" class="home-sub">
          <span>优惠到底</span>
      </div>
          <img src="../assets/go.png" alt="" class="home-to">
      <div class="home-discount">
          <div>
          <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
           <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
          <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
           <div class="home-discount-shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="home-discount-shoplist-price">￥22.50</span>
                <span>999人付款</span>
                <img src="../assets/shopCar.png" alt="" class="home-discount-shopCar">
              </div>
          </div>
          </div>
      </div>
      <img src="../assets/bottom.png" alt="" class="home-bottom">      
      <footer-currency></footer-currency>
  </div>
</template>

<script>
import footer from '../components/footer'
export default {
  components: {
    'footer-currency':footer
  },
  data () {
    return {
      seachContent:'',//seach的值
      bannerImg:[],//bannerImg
    }
  },
  methods: {
      handleClick(){
        if (event.target.nodeName.toLowerCase()==='img' ||event.target.nodeName.toLowerCase()==='p') {//事件代理
              console.log('事件代理')
        }
      },
      selectSchool(){
        this.$router.push('/location')
      }
  },
  mounted () {
    
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
</style>

<style scoped>
.home{
      overflow-x: hidden;
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
  height:2rem ;
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
  height: 2.4rem;
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
  margin-right:.15rem;
  font-size:.12rem;
  color:#888888;
}
.home-title{
    height: 0;
    margin-top: -25px;
    position: relative;
}
.home-to{
    position: relative;
    width: .2rem;
    right: -40%;
    top: -.45rem;
}
.home-discount-shoplist .home-discount-shopCar{
  width:.21rem;
  position: relative;
  top: .05rem;
  left: -.05rem;
  padding:0;
}
.home-bottom{
  width:50%;
  position: relative;
  top:-.45rem;
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
