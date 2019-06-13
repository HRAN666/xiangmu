
<template>
  <div>
    <div class="allcomments-head">
      <img src="../assets/api.js.png" alt="">
      <span>按分类看评论</span>
    </div>
    <div class="allcomments-btn">
        <button class="allcomments-btn-Light">全部</button>
        <button class="allcomments-btn-dark">最新</button>
        <button class="allcomments-btn-dark">有图</button>
        <button class="allcomments-btn-dark">追加</button>
      </div>
    <div class="allcomments-main">
      <div class="allcomments-main-shop"> 
        <div class="allcomments-main-Avatar">
          <span class="allcomments-main-Avatar-img">
            <img src="../assets/shopList.jpg" alt="">
          </span>
          <div class="allcomments-main-Avatar-information">
            <div class="allcomments-main-Avatar-name">菜根花</div>
            <div class="allcomments-main-Avatar-shoptime">
              <span class="allcomments-main-Avatar-shoptime-time">2019-05-01</span>
              <span class="allcomments-main-Avatar-shoptime-shopname">卫龙亲嘴烧（约50包）</span>
            </div>
          </div>
        </div>
        <span class="allcomments-main-Propaganda">包装严实，日期新鲜，质量很好，很喜欢！</span>
        <div class="allcomments-main-shopimg">
          <img src="../assets/图1.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="allcomments-main">
      <div class="allcomments-main-Avatar">
        <span class="allcomments-main-Avatar-img">
          <img src="../assets/shopList.jpg" alt="">
        </span>
        <div class="allcomments-main-Avatar-information">
          <div class="allcomments-main-Avatar-name">菜根花</div>
          <div class="allcomments-main-Avatar-shoptime">
            <span class="allcomments-main-Avatar-shoptime-time">2019-05-01</span>
            <span class="allcomments-main-Avatar-shoptime-shopname">卫龙亲嘴烧（约50包）</span>
          </div>
        </div>
      </div>
      <span class="allcomments-main-Propaganda">包装严实，日期新鲜，质量很好，很喜欢！</span>
      <div class="allcomments-main-shopimg">
        <img src="../assets/图1.jpg" alt="">
      </div>
      <div>
        <span></span>
      </div>
    </div>
    <div class="allcomments-bottom">
      <span>已经到底了</span>
    </div>
  </div>

</template>

<script>
export default {};
</script>

<style>
.allcomments-head {
  display: flex;
  align-items: center;
  height: 0.38rem;
  background-color: #efefef;
  padding-left: 0.23rem;
  padding-right: 0.23rem;
}
.allcomments-head > img {
  width: 0.24rem;
  height: 0.24rem;
}
.allcomments-head > span {
  font-size: 14px;
  color: rgba(2, 136, 209, 1);
  margin-left: 0.11rem;
}
.allcomments-btn {
  height: 0.42rem;
  background-color: #ffffff;
  padding-left: 0.23rem;
  padding-right: 0.23rem;
  padding-top: .05rem;
  display: flex;
  align-items: center;
}
.allcomments-btn-Light {
  height: 0.3rem;
  width: 0.68rem;
  border: 0;
  border-radius: 20px;
  background-color: #0288d1;
  color: #ffffff;
}
.allcomments-btn-dark {
  height: 0.3rem;
  width: 0.68rem;
  border: 0;
  border: 1px solid #d8d9db;
  border-radius: 20px;
  background-color: #ffffff;
  color: #2e2e30;
  margin-left: 0.19rem;
}
.allcomments-main {
  height: 2.96rem;
  background-color: #ffffff;
  padding-left: 0.23rem;
  padding-right: 0.23rem;
  border-bottom: 1px solid #EAEAEC ;
}
.allcomments-main-Avatar {
  height: 0.47rem;
  display: flex;
  align-items: center;
}
.allcomments-main-Avatar-img {
  height: 0.28rem;
  width: 0.28rem;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
}
.allcomments-main-Avatar-img>img {
  height: 0.28rem;
  width: 0.28rem;
  border-radius: 50%;
 
}
.allcomments-main-Avatar-information {
  height: 0.28rem;
  width: 2.89rem;
  margin-left: 0.06rem;
}
.allcomments-main-Avatar-name {
  font-size: 14px;
  text-align: left;
  color: #101010;
}
.allcomments-main-Avatar-shoptime {
  font-size: 12px;
  color: #989898;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.allcomments-main-Avatar-shoptime-time {
  float: left;
}
.allcomments-main-Avatar-shoptime-shopname {
  float: left;
  margin-left: 0.14rem;
  margin-top: -0.015rem;
}
.allcomments-main-Propaganda {
  font-size: 14px;
  color: #101010 100%;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 0.36rem;
}
.allcomments-main-shopimg {
  height: 1.76rem;
  float: left;
  padding-left: 0.36rem;
  margin-top: 0.11rem;
}
.allcomments-main-shopimg > img {
  width: 1.76rem;
  height: 1.73rem;
}
.allcomments-bottom{
  height: .47rem;
  font-size: 13px;
  color: #9F9797 ;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
