<template>
    <div>
        <div class="header" v-if="headClassdisplay">
            <router-link :to="routerTo">
                <img src="../assets/arrow_second.png" alt="" class="header_img">
            </router-link>
            <div class="title">{{headTitle}}</div>
            <div class="title_second">只需几步即可成为会员，尽享所有专属福利！</div>
        </div>
        <div class="header_second" v-if="headClassSecondDisplay">
            <router-link :to="routerTo">
                <img src="../assets/arrow_second.png" alt="" class="header_img">
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    props:['routerTo','headClass','headTitle'],
    data () {
        return {
            headClassdisplay:false,//第一种样式
            headClassSecondDisplay:true,//第二种样式
        }
    },
    methods: {
        getclass(){
            if (this.$props.headClass =='style1') {
                this.headClassdisplay=true
                this.headClassSecondDisplay=false;
            }   
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
    .title_second{
        font-size: .14rem;
        float: left;
        color: #fff;
        margin-top: 5%;
        margin-left: 4%;

    }
</style>

