<template>
    <div>
        <h4>授权中....</h4>
    </div>
</template>
<script>
import {getUserOpenIdFromCodeWithoutToken,getUserInfo} from '../api/api.js'
import {isCanNotAccess,getParaValueFromUrl,system_config} from '../common/common.js'
export default {
    data(){
        return{
            userOpenId:'',//用户openId
        }
    },
    methods: {
        login(){
            let pageName=localStorage.getItem('LoginUrl');
            let ua = navigator.userAgent.toLowerCase();
           if (ua.match(/MicroMessenger/i) != "micromessenger") {
                alert("请使用微信游览器打开");
            }else{
                if (isCanNotAccess(this.userOpenId)) {
                    this.dowechatLogin(pageName)
                }
            }
        },
        dowechatLogin(pageName){
            if (isCanNotAccess(getParaValueFromUrl("code"))) {
                this.redirectLogin(pageName,"snsapi_base","base")
            }else{
                let code=getParaValueFromUrl('code');
                let state=getParaValueFromUrl("state");
                let params={
                    'code':code
                }
                getUserInfo(params).then((result) => {
                    localStorage.setItem('userOpenId',result.data.dataResultObj.openId);
                    localStorage.setItem('headimgurl',result.data.dataResultObj.headimgurl);
                    localStorage.setItem('province',result.data.dataResultObj.province);
                    localStorage.setItem('sex',result.data.dataResultObj.sex);
                    localStorage.setItem('nickName',result.data.dataResultObj.nickName);
                    localStorage.setItem('userToken',result.data.userToken);
                    window.location.href=this.getCorrectPage(pageName);
                }).catch((err) => {
                    console.log(err)
                });

            }
        },
        redirectLogin(pageName,infoScope,state){
            let params={}
            getUserOpenIdFromCodeWithoutToken(params).then((result) => {
                   let wechatUrl='https://open.weixin.qq.com/connect/oauth2/authorize?appid=';
                    wechatUrl+=result.data.dataResultObj.AppId;
                    wechatUrl+='&redirect_uri='
                    if(isCanNotAccess(system_config.wxcenter_url)){
                        wechatUrl += encodeURI(pageName);
                    }else{
                        wechatUrl += encodeURI(system_config.wxcenter_url+"?tourl="+pageName);
                    }
                    wechatUrl+='&response_type=code&scope='+infoScope+'&state='+state+'#wechat_redirect';
                    localStorage.setItem('code','true')
                    window.location.href=wechatUrl;  
            }).catch((err) => {
                    console.log(err)
            });
        },
        getCorrectPage(pageName){
            var theIndexCode=pageName.indexOf("code");
            var theIndexQ=pageName.indexOf("?");
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
