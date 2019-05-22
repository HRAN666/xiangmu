<template>
    <div>
        <div class="address">
        <div class="address_header">
            <mt-header title="">
            <router-link to="/myself" slot="left">
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
                    <!-- <div contenteditable="true" v-model="name">

                        {{item.consignee}}
                    </div> -->
            </div>
            <div class="compile_box">
                <div>
                    手机号码  
                </div>
                <input type="text" v-model="phone">
                <!-- <div contenteditable="true" v-model="phone">
                    {{item.phone}}
                </div>                 -->
            </div>
            <div class="compile_box">
                <div>
                    省市地区  
                </div>
                <input type="text" v-model="provincess">
                <!-- <div contenteditable="true" v-model="province">
                    {{item.province+item.city+item.county}}
                </div>                 -->
            </div>
            <div class="compile_box">
                <div>
                    详细地址  
                </div>        
                <input type="text" v-model="detailedAddress">
                <!-- <div contenteditable="true" v-model="detailedAddress">
                    {{item.detailedAddress}}
                </div>         -->
            </div>     
            <div class="compile_bigbox">
                <div>
                    设为默认地址  
                </div>
                <mt-switch :value.sync="value"></mt-switch>                   
            </div>
            <div class="compile_bigbox compile_bigbox_color">
                <div>
                    删除收货地址  
                </div>             
            </div>
        </div>
        <!-- <el-button type="danger" @click.native="eventinsertAdress">确认</el-button> -->
        <el-button type="danger" @click.native="insertAddress">保存收货地址</el-button>
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
            value1:[],
            value2:[],
            addressList:[],
            name:'',
            phone:'',
            provincess:'',
            province:'',
            city:'',
            county:'',
            town:'111',
            detailedAddress:'',
            address:'',
            commit:false,//确认按钮
            status:[],//设置默认地址key
            addressList:[],

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
                this.name = this.addressList[0].consignee;
                this.phone = this.addressList[0].phone;
                this.provincess = this.addressList[0].province+this.addressList[0].city+this.addressList[0].county;
                this.province = this.addressList[0].province;   
                this.city = this.addressList[0].city;      
                this.county = this.addressList[0].county;      
                this.detailedAddress = this.addressList[0].detailedAddress;      
            }).catch((err) => {
                
            });
        },
        update(){
            let proone = this.provincess.split("省")[0]+"省"
            let protwo = this.provincess.split("省")[1]
            let protree = protwo.split("市")[0]+"市"
            let prosfour = this.provincess.split("市")[1]

            let params={
                "id":this.$route.query.id,
                "consignee":this.name,
                "province":proone,
                "city":protree,
                "county":prosfour,
                "town":this.town,
                "detailedAddress":this.detailedAddress,
                "phone":this.phone,
                "dormitory":"h1",
                "campus":"6"
            }
            compileaddress(params).then((result) => {
                // this.addressList = result.data.list;
                // console.log(this.status)
                alert("6666")
            }).catch((err) => {
                
            });
        },
    },
    mounted () {
        this.findadress();
        // this.ababa();
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

