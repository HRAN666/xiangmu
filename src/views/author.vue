<template>
    <div>
        <h4>授权中....</h4>
    </div>
</template>
<script>
import { getUserOpenIdFromCodeWithoutToken,selectSystemDictionaryTypeItem,getUserInfoByUserOpenIdWithoutToken } from '../api/api.js'
import {isCanNotAccess,getParaValueFromUrl,system_config} from '../common/common.js'
export default {
    data() {
        return {
            userOpenId:'',//用户id
            accessToken:'',//用户token
            state:'',
        }
    },
    methods: {
        login(){
            let pageName=localStorage.getItem('beforeUrl')
            let ua = navigator.userAgent.toLowerCase();
           if (ua.match(/MicroMessenger/i) != "micromessenger") {
                alert("请使用微信游览器打开");
            }else{
                this.userOpenId=localStorage.getItem('userOpenId')
                if (isCanNotAccess(this.userOpenId)) {
                    this.dowechatLogin(pageName)//引导授权
                }else{
                     if (isCanNotAccess(localStorage.getItem('nickname'))) {
                            this.togetUserInfo(pageName)
                     }else{
                        let theUserSelectedStore=localStorage.getItem(system_config.user_selected_store)
                        //TODO判断用户是否有选择对应的店铺，未选择则跳店铺选择页，当前辣椒默认为单店模式
                        if(isCanNotAccess(theUserSelectedStore)){
                            localStorage.setItem(system_config.user_selected_store,"0")
                        }
                     }
                }
            }
        },
        dowechatLogin(pageName){
            if (isCanNotAccess(getParaValueFromUrl('code'))) {//判断是否第一次授权
                this.toWechatLogin(pageName,"snsapi_base","base")//去获取code,arguments[1]:静默授权
            }else{
                let code=getParaValueFromUrl('code');
                let theState=getParaValueFromUrl('state');
                let params={
                    'code':code,
                    'state':theState
                }
                getUserOpenIdFromCodeWithoutToken(params).then((result) => {//code换取token
                    if (result.data.resultCode==200) {
                        this.userOpenId=result.data.userOpenId;
                        this.accessToken=result.data.accessToken;
                        this.state=result.data.state;
                        this.togetUserInfo(pageName)
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        toWechatLogin(pageName,infoScope,state){
            let params = {
                "type":"WX_CONFIG",
                "itemName":"WX_MP_OPEN_ID"
            };
            selectSystemDictionaryTypeItem(params).then((jsonData) => {
                if (jsonData.data.resultCode==200) {
                let wechatUrl='https://open.weixin.qq.com/connect/oauth2/authorize?appid=';
                    wechatUrl+=jsonData.data.itemValue;
                    wechatUrl+='&redirect_uri='
                    if(isCanNotAccess(system_config.wxcenter_url)){
                        wechatUrl += encodeURI(pageName);
                    }else{
                        wechatUrl += encodeURI(system_config.wxcenter_url+"?tourl="+pageName);
                    }
                    wechatUrl+='&response_type=code&scope='+infoScope+'&state='+state+'#wechat_redirect';
                    localStorage.setItem('code','true')
                    window.location.href=wechatUrl;                             
                }
            }).catch((err) => {
                console.log(err)
            });

        },
        togetUserInfo(pageName){
            let params={
                "userOpenId":this.userOpenId,"accessToken":this.accessToken,"state":this.state
            }
            getUserInfoByUserOpenIdWithoutToken(params).then((res) => {
                if (res.data.resultCode==200) {
                    localStorage.setItem('userOpenId',res.data.userOpenId);
                    localStorage.setItem('accessToken',res.data.accessToken);
                    localStorage.setItem('nickname',res.data.nickname);
                    localStorage.setItem('sex',res.data.sex);
                    localStorage.setItem('headimgurl',res.data.headimgurl);
                    localStorage.setItem('province',res.data.province);
                    localStorage.setItem('country',res.data.country);
                    window.location.href=this.getCorrectPage(pageName);
                }else{
                    if (res.data.resultCode==404) {//未关注
                        this.toWechatLogin(pageName,"snsapi_userinfo","userinfo")//网页授权
                    }else{
                        console.log('系统错误')
                    }
                }
            }).catch((err) => {
                console.log(err)
            });
        },
        getCorrectPage(pageName){
            let theIndexCode=pageName.indexOf("code");
            let theIndexQ=pageName.indexOf("?");
            if(theIndexCode-theIndexQ==1){
                return pageName.substring(0,theIndexQ);
            }else{
                return pageName.substring(0,theIndexCode-1);
            }
        }
    },
    created () {
        this.login()
    }
}
</script>
<style scoped>
h4{
    font-size: .16rem;
}
</style>
