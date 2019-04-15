
var project_name='cmhg'
var system_config={
    "host_url":"/",
    "mp_url":"/mp/",
    "h5_url":"/h5/",
    "interface_console_host_url":"/api/console/v01",
    "interface_wx_host_url":"/api/wx/v01",
    "interface_biz_host_url":"/api/biz/v01",
    "interface_oauth_host_url":"/api/biz/v01",
    "interface_oauth_host_url_checktoken":"/api/oauth/v01/checkAccessToken.do",
    "wxcenter_url": "http://wxcenter.vrdete.com/forward.html",
    "public_file_host_url":"http://public_file.vrdete.com/",
    "private_file_host_url":"http://private_file.vrdete.com/",
    "interface_timeout":60000,
    "jsonp_callback":"callback",
    "portal_access_token":project_name+"_portal_access_token",
    "console_access_token":project_name+"_console_access_token",
    "console_logon_user":project_name+"_console_logon_user",
    "user_selected_store":project_name+"_user_selected_store",
    
    "wx_user_openid":project_name+"_wx_user_openid",
    "wx_user_nickname":project_name+"_wx_user_nickname",
    "wx_user_headimgurl":project_name+"_wx_user_headimgurl",
    "wx_user_country":project_name+"_wx_user_country",
    "wx_user_province":project_name+"_wx_user_province",
    "wx_user_sex":project_name+"_wx_user_sex",
    "wx_user_deliver_name":project_name+"_wx_user_deliver_name",
    "wx_user_deliver_phone":project_name+"_wx_user_deliver_phone",
    "wx_user_deliver_store":project_name+"_wx_user_deliver_store",
    "wx_user_deliver_address":project_name+"_wx_user_deliver_address",
    "wx_user_latest_order_number":project_name+"_wx_user_latest_order_number",
    "wx_store_latest_query_day":project_name+"wx_store_latest_query_day",
    
    "h5_no_need_login_pages":"index.html,login.html,reg.html,forgetPwd.html",
    "h5_login_url":"/h5/login.html",
    "h5_back_url":project_name+"_h5_back_url",
    
    "dictionary_cannot_delete_or_edit":9,
    "dictionary_cannot_delete_but_edit":6,
    "empty_config":"",
    };
export const getParaValueFromUrl=(theName)=> {
    var reg = new RegExp("(^|&)" + theName + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}

export const isUndefined=(tmp)=> {
    if (typeof (tmp) == "undefined") {
        return true;
    } else {
        return false;
    }
}

export const isEmpty=(tmp)=> {
    if ($.trim(tmp) == "") {
        return true;
    } else {
        return false;
    }
}

export const isNull=(arg1)=> {
    return !arg1 && arg1 !== 0 && typeof arg1 !== "boolean" ? true : false;
}

export const isCanNotAccess=(tmp)=> {
    if (isUndefined(tmp) || isNull(tmp)) {
        return true;
    } else {
        return false;
    }
}
export const throttling = (fn,value) =>{//节流函数  argument[0]:毫秒数 arguments[1]:fn
    let timer1='';
    let timer2='';//timer1:定时器名字  timer2： timer3:执行间隔ms
    let timer3=value||300;
    return function(){
        let that=this
        let args=arguments;
        let timeNow= +new Date();// + == valueOf()
        if (timer2&&timeNow-timer2<timer3) {
            clearTimeout(timer1)
            timer1 = setTimeout(() => {
                timer2=timeNow;
                fn.apply(that,args);
            }, timer3);
        }else{ 
            timer2=timeNow;
            fn.apply(this,args);
        }
    }
}
export{
    project_name,
    system_config,
}