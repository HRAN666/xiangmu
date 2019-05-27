<template>
    <div class="amap-page-container">
        <div class="amap-all">
            <el-amap vid="amap" :zoom="zoom" :plugin="plugin" :center="center" touchZoom="true">
            <el-amap-marker vid="marker" :position="center"></el-amap-marker>
            </el-amap>
        </div>
        <div class="card">
            <div class="name">收件人姓名：<input type="text" class="inpBottom" placeholder="请输入真实名字" v-model="name"></div>
            <div class="phone">手机号码：<input type="text" class="inputBottom" placeholder="请输入11位手机号码" v-model="phone"></div>
            <div class="selectAddress">
                <div>{{province}}</div>
                <div>{{city}}</div>
                <div>{{district}}</div>
            </div>
            <div class="main">
                <div class="campus">{{campus}}</div>
                <el-input class="school-build-number" v-model="floorBuild" placeholder="宿舍楼"></el-input>
                <el-input class="school-build-number" v-model="floorNumber" placeholder="宿舍号"></el-input>
            </div>
            <div class="address-all"><el-input  v-model="fullAddress" placeholder="详细地址"></el-input></div>
        </div>
          <el-button type="primary" @click.native="address">确认</el-button>
    </div>
</template>

<script>
import {addAddress,StoreIdaddress} from '../api/api.js'
import header from '../components/header.vue'
import { Toast } from 'mint-ui';
import {filtertoMoney} from '../filter/filter.js'
export default {
    components: {
        'header-general':header
    },
    data() {
        let self = this;
        return {
            name:'',//收件人姓名
            phone:'',//手机号码
            province: '',//省份
            city: '',//城市
            district: '',//地区
            campus:'',//校区
            floorBuild:'',//宿舍楼
            floorNumber: '',//宿舍号
            fullAddress: '',//详细地址
            town:'',//街道
            center: [114.22839,22.74115],
            zoom: 15,
            lng: 0,
            lat: 0,
            loaded: false,
            plugin: [   //工具插件
            {
                enableHighAccuracy: true,
                timeout: 100,
                maximumAge: 0,
                convert: true,
                showButton: true,
                // buttonPosition: 'RB',
                showMarker: true,
                showCircle: true,
                panToLocation: true,
                // zoomToAccuracy:true,
                extensions:'all',
                pName: 'Geolocation',   //定位
                events: {
                    init(o) {
                    // o 是高德地图定位插件实例
                        o.getCurrentPosition((status, result) => {
                            console.log(result)
                            if (result && result.position) {
                            self.lng = result.position.lng;             //设置经度
                            self.lat = result.position.lat;             //设置维度
                            self.center = [self.lng, self.lat];         //设置坐标
                            self.loaded = true;                         //load
                            self.$nextTick();                           //页面渲染好后
                            }
                        })
                    }
                }
            },
            {
                pName: 'ToolBar',  //工具栏
                events: {
                    init(instance) {
                        // console.log(instance);
                    }
                }
            },
        ]
        }
    },
    methods: {
        Location(){
            if(this.lng==0 && this.lat==0){
                console.log('定位中...')
            }
        }, 
        autoInput(){
            
        },
        address(){
            if (this.name=='') {
                Toast({
                    message: '请输入收货人姓名',
                    duration: 1500
                });
                return
            }else if (this.phone==''||!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone)){          
                    Toast({
                        message: '请输入正确收货人联系电话',
                        duration: 1500
                    }); 
            }else{
                let params={
                    'consignee':this.name,
                    'phone':this.phone,
                    'province':this.province,//省份
                    'city':this.city,//城市
                    'county':this.district,//地区
                    'town':this.town,//街道
                    'campus':this.campus,//校区
                    'floorBuild':this.floorBuild,//宿舍区
                    'floorNumber':this.floorNumber,//宿舍号
                    'dormitory':this.campus+'-'+this.floorBuild+'-'+this.floorNumber,//校区+宿舍区+宿舍号
                    'detailedAddress':this.fullAddress,//详情地址
                    'userOpenId':localStorage.getItem('userOpenId')
                }
                addAddress(params).then((result) => {
                    Toast({
                        message: '添加地址成功',
                        duration: 1500
                    }); 
                    this.$router.push('/address')            
                }).catch((err) => {
                    
                });
            }    
        },
        StoreIdaddress(){
            let params={
                "userOpenId":localStorage.getItem('userOpenId'),
            }
            StoreIdaddress(params).then((result) => {
                this.province=result.data.list[0].province;
                this.city=result.data.list[0].city;
                this.district=result.data.list[0].district;
                this.campus=result.data.list[0].name;
                this.town=result.data.list[0].address;
            }).catch((err) => {
                console.log(err)
            });
        }
    },
    watch: {
        lng(newVal,oldVal){
           console.log(newVal,oldVal);
            console.log('定位成功');
        },
        lat(newVal,oldVal){
            //console.log(newVal,oldVal);
            console.log('定位成功');
            this.autoInput();
        }
    },
    mounted(){
        this.Location()
    },
    created() {
        this.StoreIdaddress()
    },
}
</script>
<style>
.amap-page-container .el-button--primary{
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 999;
}
.amap-maps{
    top: -.3rem
}
.amap-geolocation-con{
    top: 6.1rem;
}
.amap-zoomcontrol{
    left: .2rem;
}
.el-input__inner{
    width: 97%;
    margin-left: .06rem;
}
.main .el-input__inner{
    margin-left: .03rem;
}
</style>
<style scoped>
.amap-page-container .header_six{
    position: absolute;
    top: 0;
    width:100%
}
.amap-page-container .header_six .header_six_back span{
    display: none
}
.amap-page-container .amap-all{
    width: 100%;
    height: 6.8rem;
}
.card{
    position: absolute;
    width: 90%;
    height: 2.5rem;
    background: #ffffff;
    border: 1px solid #ffffff;
    border-radius: .1rem;
    box-shadow: darkgrey 1px 10px 30px 0px;
    left: .1rem;
    bottom: 1.2rem;
    color: black;
    font-size: .12rem;
    text-align: left;
}
.amap-page-container .card .name{
    margin-top: .12rem;
    padding: .1rem;
}
.amap-page-container .card .name input,.amap-page-container .card .phone input{
    width: 1.6rem;
    height: .18rem;
    border:none;
    outline: none;
}
.amap-page-container .card .phone{
    padding: .1rem;
}
.amap-page-container .card .inputBottom{
    float: right;
    margin-right: .85rem;
    border:none;
    border-bottom: 1px solid #e8e8e8;
    outline: none;
}
.amap-page-container .card .selectAddress .el-select{
    padding: .04rem;
    width:30%;
}
.amap-page-container .card .selectAddress .el-select .el-input{
    width: 1rem;
}
.amap-page-container .card .main .el-select {
    width: 43%;
}
.amap-page-container .card .main .school-name .el-input {
    width: 1.5rem;
    padding: .04rem;
}
.amap-page-container .card .main .school-build .el-input {
    width: .7rem;
    padding: .04rem;
}
.amap-page-container .card .main .school-build-number {
    width: .8rem;
    padding: .04rem;
}
.address-all {
    width: 3.15rem;
    padding: .04rem;
}
.selectAddress{
    margin-top: .1rem;
}
.selectAddress div{
    float: left;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    width: 95px;
    margin-left: .1rem;
    text-indent: .15rem;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: .13rem;
}
.selectAddress div:nth-child(1){
    margin-left: .1rem;
}
.campus{
    float: left;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    width: 132px;
    margin-left: .1rem;
    margin-top: .04rem;
    text-indent: .15rem;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: .13rem;
}
</style>