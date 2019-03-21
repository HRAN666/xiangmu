<template>
    <div class="amap-page-container">
        <div class="amap-all">
            <el-amap vid="amap" :zoom="zoom" :plugin="plugin" :center="center" touchZoom="true">
            <el-amap-marker vid="marker" :position="center"></el-amap-marker>
            </el-amap>
        </div>
        <!-- <div class="toolbar">
            <span v-if="loaded">
            location: lng = {{ lng }} lat = {{ lat }}
            </span>
            <span v-else>正在定位</span>
        </div> -->
        <div class="card">
            <div class="name">收件人姓名：<input type="text" class="inputBottom" placeholder="请输入真实名字"></div>
            <div class="phone">手机号码：<input type="text" class="inputBottom" placeholder="请输入11位手机号码"></div>
            <div class="selectAddress">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value2" placeholder="请选择">
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value3" placeholder="请选择">
                    <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="main">
                    <el-select class="school-name" v-model="value4" placeholder="请选择">
                        <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select class="school-build" v-model="value5" placeholder="请选择">
                        <el-option
                        v-for="item in options5"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input class="school-build-number" v-model="floorNumber" placeholder="宿舍号"></el-input>
            </div>
            <div class="address-all"><el-input  v-model="fullAddress" placeholder="详细地址"></el-input></div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    let self = this;
    return {
        options: [{
          value: '选项1',
          label: '广东省'
        }],
        value: '广东省',
        options2: [{
          value: '选项1',
          label: '深圳市'
        }],
        value2: '深圳市',
        options3: [{
          value: '选项1',
          label: '龙岗区'
        }],
        value3: '龙岗区',
        options4: [{
          value: '选项1',
          label: '深圳技师学院'
        }],
        value4: '深圳技师学院',
        options5: [
        {
            value: '选项1',
            label: 'K5'
        },{
            value: '选项2',
            label: 'h1'
        },{
            value: '选项3',
            label: 'h2'
        },{
            value: '选项4',
            label: 'h3'
        }
        ],
        value5: 'K5',
        floorNumber: '',
        fullAddress: '',
        province: '',
        city: '',
        district: '',
        lastName: '',
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
                        self.province = result.addressComponent.province;
                        self.city = result.addressComponent.city;
                        self.district = result.addressComponent.district;
                        self.lastName = result.aois[0].name;
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
        // {
        //     pName: 'MapType',  //地图类型
        //     defaultType: 0,
        //     events: {
        //         init(instance) {
        //             // console.log(instance);
        //         }
        //     }
        // }
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
            this.options[0].label = this.province;
            this.value = this.province;
            this.options2[0].label = this.city;
            this.value2 = this.city;
            this.options3[0].label = this.district;
            this.value3 = this.district;
            this.options4[0].label = this.lastName;
            this.value4 = this.lastName;
            this.fullAddress = this.value + this.value2 + this.value3 + this.value4;
        }
  },watch: {
        lng(newVal,oldVal){
            console.log(newVal,oldVal);
            console.log('定位成功');
        },
        lat(newVal,oldVal){
            console.log(newVal,oldVal);
            console.log('定位成功');
            this.autoInput();
        }
    },
    mounted(){
        this.Location()
    }
}
</script>

<style>
.amap-page-container .amap-all{
    width: 100%;
    height: 6.05rem;
}
.card{
    position: absolute;
    width: 90%;
    height: 2.5rem;
    background: #ffffff;
    border: 1px solid #ffffff;
    border-radius: .1rem;
    box-shadow: darkgrey 1px 10px 30px 0px;
    left: .2rem;
    bottom: 20%;
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
}
.amap-page-container .card .phone{
    padding: .1rem;
}
.amap-page-container .card .inputBottom{
    float: right;
    margin-right: .55rem;
    border:none;
    border-bottom: 1px solid #e8e8e8;
}
.amap-page-container .card .selectAddress .el-select{
    padding: .04rem;
}
.amap-page-container .card .selectAddress .el-select .el-input{
    width: 1rem;
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
</style>