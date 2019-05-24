<template>
<div>
    <div class="header">
    <mt-header title="">
    <router-link to="/myself" slot="left">
        <mt-button icon="back">浏览记录</mt-button>
    </router-link>
    <mt-button slot="right" @click="delet=true" v-if="!delet">编辑</mt-button>
    <mt-button slot="right" @click="delet=false" v-if="delet">完成</mt-button>
    </mt-header>
    </div>
    <div class="browserecord_null" v-if="browseList==''">
        <img src="../assets/browser.png" alt="" >
        <p>没有更多浏览数据了~</p>
    </div>
    <div class="item_ui">
    <div class="item" v-for="(item,index) in browseList" :key="index">
        <input type="checkbox" class="collect_checkedbox" v-if="delet" :checked="selectBrowId.indexOf(item.id)>=0" @click="selectId(item.id)">
        <label class="" v-if="delet"></label>
        <img :src="'http://img.cmhg.shop/'+item.bizProductVo.icon" alt="" @click="goDetail(item.productId)">
        <dd>{{item.bizProductVo.name}}<span>12人收藏</span></dd>
        <dt>￥ 0.1</dt>
    </div>
    </div>
      <div class="browserecord_bottom" v-if="delet">
        <span>全选</span>
        <input type="checkbox" class="collect_checkedbox" v-if="delet" @change="check" v-model="checkAll">
        <label class="" v-if="delet"></label>
        <el-button type="primary" round @click.native="deleteBrowse">删除</el-button>
    </div>
</div>
</template>
<script>
import {browse,deleteBrowser} from '../api/api.js';
import { Toast } from 'mint-ui';
export default {
    inject:['reload'],
    data() {
        return {
            browseList:'',
            delet:false,
            selectBrowId:[],//预览记录商品id
            checkAll:false,
            browsere:[],
        }
    },
    methods: {
        Loaingbrowsere(){
            let params ={
                "userOpenId":localStorage.getItem("userOpenId"),
            };
            browse(params).then((jsonData) => {
              if (jsonData.data.resultCode==200) {
                    this.browseList=jsonData.data.list
                    for (let i = 0; i < jsonData.data.list.length; i++) {
                        this.browsere.push(jsonData.data.list[i].id)    
                    }
                }
            }).catch((err) => {
                console.log(err)
            });
        },
        selectId(id){
             let index=this.selectBrowId.indexOf(id)
            if (index>=0) {
                this.selectBrowId.splice(index,1)
            }else{
                this.selectBrowId.push(id)
                if (this.browsere.length==this.selectBrowId.length) {
                    this.checkAll=true
                }
            }
        },
        check(){
            if (this.checkAll) {
                this.selectBrowId=this.browsere
            }else{
                this.selectBrowId=[]
            }
        },
        deleteBrowse(){
            let params={
                "userOpenId":localStorage.getItem('userOpenId'),
                'id':this.selectBrowId.join(',')
            } 
            deleteBrowser(params).then((result) => {
                if (result.data.resultCode==200) {
                     Toast({
                        message: '已删除',
                        duration: 1000
                    });
                    this.reload()
                }
            }).catch((err) => {
                
            });
        },
        goDetail(id){
            this.$router.push({path:'/commodityDetails',query:{'id':id}})
        }
    },
    created() {
        this.Loaingbrowsere();
    },
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
.browserecord_bottom .el-button{
    position: absolute;
    top: .1rem;
    right: .15rem;
    width: 1rem;
    height: .36rem;
    line-height: .01rem
}
</style>

<style scoped>
.item{
    position: relative;
    width: 100%;
    height: 1.2rem;
    background-color: #ffffff;
    border-bottom: #efefef .01rem solid;
}
.item img{
    position: relative;
    height: 1rem;
    left: -1.1rem;
    top: .1rem;
    width: 1rem;
}
.item dd{
    position: absolute;
    text-align: left;
    width: 2.2rem;
    font-size: .14rem;
    left: 1.1rem;
    top: .1rem;
}
.item dd span{
    margin-top: .05rem;
    display: block;
    font-size: .12rem;
    color: #B0B0B0;
}
.item dt{
    position: absolute;
    width: .5rem;
    font-size: .18rem;
    color: #BC2D2A;
    left: 1.47rem;
    top: 0.8rem;
}
.browserecord_bottom{
    height: .53rem;
    background: #EEEEEE;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 11;
    font-size: .16rem;
    font-weight: bold;
}
.browserecord_bottom .collect_checkedbox{
    top: .15rem;
}
.browserecord_bottom .collect_checkedbox+label{
    margin: 0;
    top: .18rem;
    left: .14rem;
}
.browserecord_bottom span{
    position: absolute;
    top: .18rem;
    left: .45rem;
}
.collect_checkedbox+label{
    margin-left:.08rem;
    margin-top: .58rem;
    left: 0;
    position:absolute;
    width: 16px;
    height: 16px;
    border: 1px solid #0288D1;
    border-radius: 50%;
    background-color: #0288D1;
    z-index: 10;
}
.collect_checkedbox:checked+label:after {
    content: "";
    position: absolute;
    left: .04rem;
    top: .01rem;
    width: .05rem;
    height: .09rem;
    font-size: .14rem;
    color: #fff;
    border-style: solid;
    border-color: #fff;
    border-width: 0 .02rem .02rem 0;
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
    
}
.collect_checkedbox{
    position: absolute;
    top: .69rem;
    z-index: 12;
    left: .16rem;
    opacity: 0;
}
.item_ui .item:last-child{
    margin-bottom: .5rem;
}
.browserecord_null img{
    width: .5rem;
    margin-top: .55rem
}
.browserecord_null p{
    margin-top: -.1rem;
    font-size: .14rem;
    color: #797878;
}
</style>
