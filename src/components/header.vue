<template>
    <div>
        <div class="header" v-if="headClassdisplay"><!--有标题，有返回按钮，副标题（注册会员页面&&我的会员信息）蓝色底  -->
            <router-link :to="routerTo">
                <img src="../assets/arrow_second.png" alt="" class="header_img">
            </router-link>
            <div class="title">{{headTitle}}</div>
            <div class="title_second">{{titleSecod}}</div>
        </div>
        <div class="header_second" v-if="headClassSecondDisplay"><!--有标题，有返回按钮  白色底-->
            <router-link :to="routerTo">
                <img src="../assets/arrow.png" alt="" class="header_img">
            </router-link>
            <div class="title_style2">{{headTitle}}</div>
        </div>
        <div class="header_third" v-if="headClassThirdDisplay"><!--有标题，有返回按钮，顶部右侧有按钮  白色底-->
            <router-link :to="routerTo">
                <img src="../assets/arrow.png" alt="" class="header_img">
            </router-link>
            <div class="title_style3">{{headTitle}}</div>
            <div class="header_third_right">
            <span  @click="toDelete">{{titleSecod}}</span>
            <img src="../assets/msg_shop.png" alt="">
            </div>
        </div>
        <div class="header_fourth" v-if="headClassfourthDisplay"><!--只有标题没有返回按钮 蓝色底 -->
            <div class="title_style4">{{headTitle}}</div>
        </div>
         <div class="header_five" v-if="headClassFiveDisplay"><!--有标题，有返回按钮，顶部右侧有按钮(2)  白色底-->
            <router-link :to="routerTo">
                <img src="../assets/arrow.png" alt="" class="header_img">
            </router-link>
            <div class="title_style5">{{headTitle}}</div>
            <div class="header_five_right">
            <img src="../assets/share.png" alt="">
            <img src="../assets/goodsmore.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['routerTo','headClass','headTitle','titleSecod'],
    data () {
        return {
            headClassdisplay:false,//第一种样式
            headClassSecondDisplay:true,//第二种样式
            headClassThirdDisplay:false,//第三种样式
            headClassfourthDisplay:false,
            headClassFiveDisplay:false
        }
    },
    methods: {
        getclass(){
            if (this.$props.headClass =='style1') {
                this.headClassdisplay=true
                this.headClassSecondDisplay=false;
            }
            if (this.$props.headClass =='style3') {
                 this.headClassSecondDisplay=false;
                 this.headClassThirdDisplay=true;
            } 
            if (this.$props.headClass =='style4') {
                 this.headClassSecondDisplay=false;
                 this.headClassfourthDisplay=true;
            } 
            if (this.$props.headClass =='style5') {
                 this.headClassSecondDisplay=false;
                 this.headClassFiveDisplay=true;
            }
        },
        toDelete(){
            
        }
    },
    mounted() {
       this.getclass()
    },
}
</script>
<style scoped>
    .header{
        height: 1.46rem;
        background: #0288D1;
    }
    .header_second{
        height: .45rem;
        background: #fff;
    }
    .header_third{
        height: .45rem;
        background: #fff;
        padding-top: .10rem;
        box-sizing: border-box;
    }
    .header_fourth{
        height: .45rem;
        background:#0288D1;
    }
    .header_five{
        height: .45rem;
        background: #fff;
        color: #000;
    }
    .header_img{
        position: absolute;
        left: .06rem;
        top: .11rem;
        width: .21rem;
        height: .21rem;
    }
    .title{
        font-size: .28rem;
        color: #fff;
        float: left;
        margin-top: .4rem;
        margin-left: .16rem;
    }
    .title_style2{
        font-size: .16rem;
        float: left;
        margin-left: .4rem;
        margin-top: .12rem;
    }
    .title_style3{
        font-size: .16rem;
    }
    .title_style4{
        color: #fff;
        font-size: .18rem;
        padding-top: .1rem;
    }
    .title_style5{
        font-size: .16rem;
        padding-top: .1rem;
    }
    .title_second{
        font-size: .14rem;
        position: absolute;
        color: #fff;
        top: .88rem;
        margin-left: 4%;
        left:.08rem;
    }
    .header_third .header_third_right{
        font-size: .16rem;
        margin-top: -.27rem;
        float: right;
        margin-right: .2rem;
    }
    .header_third .header_third_right img{
        width: .22rem;
        height: .22rem;
        position: relative;
        top:.03rem;
        left: .08rem;
    }
    .header_five .header_five_right img{
        width: .22rem;
        height: .22rem;
        margin-right: .1rem;
    }
    .header_five .header_five_right img:nth-child(2){
        position: relative;
        top: .014rem;
    }
   .header_five .header_five_right{
       float: right;
       margin-top: -.9rem
   }
</style>

