<template>
    <div class="location">
        <header-general routerTo='/' headTitle="位置" headClass="style4"></header-general>
        <div class="location_city">当前定位城市</div>
            <div class="location_current">
                <span>深圳</span>
                <img src="../assets/gps_second.png" alt="">
            </div>
            <div class="location_school">
                <span>当前城市商城校区:</span>
                <div>深圳技师学院</div>
                <div>深圳技师学院</div>
                <div>深圳技师学院</div>
                <div>深圳技师学院</div>
                <div class="location_school_more">
                    更多>>
                </div>
            </div>
            <div class="location_all">
                <span>全部城市</span>
            </div>
        <mt-index-list :height="indexListHeight">
            <mt-index-section v-for="(item,index) in city" :key="index" :index="item.title">
                <mt-cell v-for="(value,Indexes) in item.lists" :key="Indexes" :title="value" @click.native="thisCity(value)"></mt-cell>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>
<script>
import header from '../components/header.vue'
import {cityJson} from '../common/cityJson.js'
export default {
    components:{
        'header-general':header,
    },
    data () {
        return {
            city:'',
            selectCity:'',
            indexListHeight:378
        }
    },
    methods:{
        getCity(){
            this.city=cityJson.city//城市json数据包
        },
        thisCity(selectCity_value){
            this.selectCity=selectCity_value//重新选择城市的value
        }
    },
    mounted () {
       this.getCity()
    }
}
</script>
<style>
.location  .mint-indexsection-index{
    font-size: .14rem;
    text-align: left;
}
.location .mint-cell-wrapper{
    text-align: left;
}
.location .mint-cell-wrapper::after{
    content: '';
    position: absolute;
    height: .01rem;
    width: 100%;
    border-bottom: 1px solid #f2f0f0;
    top: .45rem;
    left: 0;
}
.location .mint-cell-wrapper:last-child::after{
    display: none;
}

.location .mint-indexlist-nav{
    border-radius: .05rem;
    background: #d8d8d8;
}
</style>

<style  scoped>
.location_current {
    background:#fff;
    font-size:.14rem;   
    height: .35rem;
}
.location_current span{
    float: left;
    margin: .07rem;

}
.location_current img{
    width:.21rem;
    height: .21rem;
    float:right;
    margin: .07rem;
}
.location_city{
    font-size:.15rem;
    text-align: left;
    margin: 5px;
}
.location_school{
    font-size:.14rem;
    height: 1rem;
    background:#fff;
    margin-top:.2rem;
    text-align:left;
    position: relative;
    padding-top:.1rem;
}
.location_school span{
    font-size:.16rem;
    margin-left:.21rem;
    display:block;
}
.location_school span::before{
    height: .2rem;
    content: '';
    width: .03rem;
    border: .01rem solid #0288d1;
    position: absolute;
    background: #0288d1;
    left: .1rem;
}
.location_school div:nth-of-type(1){
      border: .01rem solid #0288d1;
}
.location_school div{
    width:1.19rem;
    float: left;
    border-radius: .05rem;
    border: .01rem solid #dcd9d9;
    text-align:center;
    margin-top: .1rem;
    margin-left: .25rem;
}
.location_school .location_school_more{
     width: 47px;
}
.location_all{
    height: .35rem;
    background:#fff;
    font-size:.16rem;
    margin-top: .2rem;
    text-align: left;
    position: relative;
    padding-top:.08rem;
    box-sizing:border-box;
}
.location_all span {
    margin-left: .21rem;
}
.location_all span::before{
    height: .2rem;
    content: '';
    width: .03rem;
    border: .01rem solid #0288d1;
    position: absolute;
    background: #0288d1;
    left: .1rem;
}
</style>
