<template>
    <div>
        <div class="address">
        <div class="address_header">
            <mt-header title="">
            <router-link to="/address" slot="left">
                <mt-button icon="back">编辑收货地址</mt-button>
            </router-link>
            <mt-button slot="right" @click="update()">保存</mt-button>
            </mt-header>
        </div>
        <div class="address_content" v-for="(item,index) in addressList" :key="index">
            <div class="compile_box">
                <div>
                    收货人  
                </div>
                <input type="text" v-model="name">
            </div>
            <div class="compile_box">
                <div>
                    手机号码  
                </div>
                <input type="text" v-model="phone">
            </div>
            <div class="compile_box">
                <div>
                    省市地区  
                </div>
                <div>{{provincess}}</div>
            </div>
            <div class="compile_box">
                <div>
                    校区
                </div>
                <input type="text" v-model="campus">
            </div>
             <div class="compile_box">
                <div>
                    宿舍楼
                </div>
                <input type="text" v-model="floorBuild">
            </div>
            <div class="compile_box">
                <div>
                    宿舍号
                </div>
                <input type="text" v-model="floorNumber">
            </div>
            <div class="compile_box">
                <div>
                    详细地址  
                </div>        
                <input type="text" v-model="detailedAddress">
            </div>     
            <div class="compile_bigbox">
                <div>
                    设为默认地址  
                </div>
                <mt-switch  v-model="value"></mt-switch>                   
            </div>
            <div class="compile_bigbox compile_bigbox_color">
                <div>
                    删除收货地址  
                </div>             
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import { Checklist  } from 'mint-ui';
import header from '../components/header.vue'
import { Toast } from 'mint-ui';
import {seachAdress,insertAdress,lookaddAddress,checkAddress,removeAddress,compileaddress} from '../api/api.js'
export default {  
    data () {
        return {
            addressList:[],
            name:'',//收件人姓名
            phone:'',//手机号码
            province: '',//省份
            city: '',//城市
            district: '',//地区
            campus:'',//校区
            floorBuild:'',//宿舍楼
            floorNumber: '',//宿舍号
            detailedAddress: '',//详细地址
            town:'',//街道
            commit:false,//确认按钮
            status:[],//设置默认地址key
            value:false
        }
    },
    methods: {
        insertAddress(){
            this.$router.push('/addAddress')
        },
        findadress(){//查询地址
            let params={
                "id":this.$route.query.id,
                "userOpenId":localStorage.getItem('userOpenId')
            }
            lookaddAddress(params).then((result) => {
                this.addressList = result.data.list;
                this.name = this.addressList[0].consignee;//收货人
                this.phone = this.addressList[0].phone;//手机号码
                this.province = this.addressList[0].province//省份
                this.city = this.addressList[0].city;//城市  
                this.county = this.addressList[0].county;//地区 
                this.provincess = this.addressList[0].province+this.addressList[0].city+this.addressList[0].county;//省市地区
                this.campus = this.addressList[0].campus;//校区
                this.floorBuild = this.addressList[0].floorBuild;//宿舍楼
                this.floorNumber = this.addressList[0].floorNumber;//宿舍号
                this.dormitory = this.campus+'-'+this.floorBuild+'-'+this.floorNumber;
                this.detailedAddress = this.addressList[0].detailedAddress;//详细地址    
            }).catch((err) => {
                
            });
        },
        update(){
            // let proone = this.provincess.split("省")[0]+"省"
            // let protwo = this.provincess.split("省")[1]
            // let protree = protwo.split("市")[0]+"市"
            // let prosfour = this.provincess.split("市")[1]

            let params={
                "id":this.$route.query.id,
                'userOpenId':localStorage.getItem('userOpenId'),
                'consignee':this.name,//收货人
                'phone':this.phone,//手机号码
                'campus':this.campus,//校区
                'floorBuild':this.floorBuild,//宿舍区
                'floorNumber':this.floorNumber,//宿舍号
                'dormitory':this.campus+'-'+this.floorBuild+'-'+this.floorNumber,//校区+宿舍区+宿舍号
                'detailedAddress':this.detailedAddress,//详情地址
            }
            compileaddress(params).then((result) => {
                if (result.data.resultCode==200) {
                    Toast({
                        message: result.data.resultMessage,
                        duration: 1000
                    });
                    this.$router.go(-1)//返回上一页
                }else{
                    Toast({
                        message: result.data.resultMessage,
                        duration: 1000
                    });
                }
            }).catch((err) => {
                
            });
        },
    },
    mounted () {
        this.findadress();
    }
}
</script>
<style>
.mint-switch{
    float: right;
    margin-top: .08rem;
    padding-right: .15rem;
}
.mint-switch-core::after{
    width: .20rem;
    height: .20rem;
}
.mint-switch-core::before{
    width: .44rem;
    height: .20rem;
}
.mint-switch-core{
    width: .44rem;
    height: .20rem;    
}
</style>

<style scoped>


.address_content{
    background:#fff;
    margin-top:.01rem;
    font-size:.14rem;
    width: 100%;
    float: left;
    margin-bottom:.05rem;
}
.compile_bigbox{
    float: left;
    width: 100%;
    background: #ffffff;
    line-height: .38rem;
    border-top: .02rem solid #F4F4F4;
    border-bottom: .02rem solid #F4F4F4;
}
.compile_bigbox div:first-child{
    float: left;
    width: 1rem;
    padding-left: .1rem;
    text-align: left;
}
.compile_bigbox_color{
     color:#FA788F;
}
.compile_box{
    float: left;
    width: 100%;
    background: #ffffff;
    line-height: .38rem;
    border-bottom: .02rem solid #F4F4F4;
}
.compile_box div:first-child{
    float: left;
    width: 1rem;
    padding-left: .1rem;
    text-align: left;
}
.compile_box div:nth-child(2){
    float: left;
    text-align: left;
    color: #888888;
    border: none;
    outline: none;
    line-height: .38rem;
}
.compile_box input{
    float: left;
    width: 2.6rem;
    text-align: left;
    color: #888888;
    border: none;
    outline:none;
    line-height: .38rem;
}
/* .compile_box::after{
    content: '';
    float: left;
    background: #F4F4F4;
    height: .03rem;
    width: 100%;
} */
</style>

