<template>
  <div class="home">
    <div class="home-seach">
          <div class="home-seach-gps">
            <img src="../assets/gps.png" alt="">
            <p>深圳技师学院</p>
          </div>
          <div class="home-seach-shop">
            <img src="../assets/seach.png" alt="">
            <el-input  placeholder="请输入内容" v-model="text"></el-input>
          </div>
    </div>
    <div class="home-banner">
        <img src="../assets/Bannner.jpg" alt="">
    </div>
    <div class="home-shop">
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
        <img src="../assets/wati_express.png" alt="" class="home-watiexpress">
        <img src="../assets/wait_serve.png" alt="" class="home-waitserve">
        <img src="../assets/wait_canteen.png" alt="" class="home-waitcanteen">      
      </div>
      <div class="home-title">
          <img src="../assets/discount.png" alt="" class="home-sub">
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
          <img src="../assets/Spike.png" alt="" class="home-sub">
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
          <img src="../assets/gobuy.png" alt="" class="home-sub">
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
          <img src="../assets/nproduct.png" alt="" class="home-sub">
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
          <img src="../assets/hotShop.png" alt="" class="home-sub">
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
      text:'',
    }
  },
  methods: {
    
  },
  mounted () {
    
  }
}
</script>
<style>
.el-input__inner{
  border-radius: .5rem;
  padding: 0 .4rem;
}
</style>

<style scoped>
.home{
      overflow-x: hidden;
}
.home-seach{
  background:#f8f8f8;
  height: .7rem;
}
.home-seach .home-seach-gps img{
  width: .32rem;
  height:.32rem;
  float: left;
  margin-top: .10rem;
  margin-left:.05rem;
}
.home-seach .home-seach-gps{
  font-size: .16rem;
  color: #0288d1;
  width: 37%;
  float: left;
  margin-top: .1rem;
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
    top: .24rem;
    left: 40%;
}
.home-banner {
  height: 1.57rem;
}
.home-banner img{
  width:100%;
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
}
.home-shop-list img{
  width:.42rem;
  height: .42rem;
}
.home-sub{
  width:1.5rem;
  margin-bottom:.5rem;
}
.home-substitute{
  text-align: left;
  margin-top:-.5rem;
}
.home-substitute img{
  background:#fff;
  height: 1.4rem;
  margin-left:.1rem;
}
.home-watiexpress{
    width:37%;
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
  height: 2.28rem;
  width: 47%;
  background: #fff;
  float: left;
  text-align:left;
  margin-left:.08rem;
  padding-left: .15rem;
  box-sizing: border-box;
  margin-top:.1rem;
}
.home-discount-shoplist img{
  width:85%;
}
.home-discount-shoplist {
  font-size:.14rem;
}
.home-discount-shoplist  span{
  margin-right:.1rem;
}
.home-title{
    height: 0;
    margin-top: -25px;
}
.home-to{
    position: relative;
    width: .2rem;
    right: -40%;
    top: -.45rem;
}
.home-discount-shoplist .home-discount-shopCar{
  width:20px;
  margin-left:.15rem;
}
.home-discount-shoplist-price{
  color:#0489D1;
}
.home-bottom{
  width:50%;
  position: relative;
  top:-.45rem;
}
</style>
