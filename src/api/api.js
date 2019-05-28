import axios from 'axios'
/**************微信授权 */
export const getUserOpenIdFromCodeWithoutToken = params => {
    return axios.post("/api/wx/v01/getUserOpenIdFromCodeWithoutToken.do",params); 
};
export const selectSystemDictionaryTypeItem = params => {
    return axios.post("/api/console/v01/selectSystemDictionaryTypeItem.do",params); 
};
export const getUserInfoByUserOpenIdWithoutToken = params => {
    return axios.post("/api/wx/v01/getUserInfoByUserOpenIdWithoutToken.do",params); 
};

/************** 首页一级分类*/
export const selectCatalogParentWithoutToken= params => {
    return axios.post("/api/biz/v01/selectTopCatalogWithoutToken.do",params); 
};
/**********搜索商品 */
export const seachShop =params =>{
    return axios.post('/api/biz/v01/listBizDrug.do',params);
}
/*********添加到购物车 */
export const addShop =params =>{
    return axios.post('/api/biz/v01/saveBizUserTrolleyWithoutToken.do',params);
}
/**********搜索所有商品 */
export const loadingShop =params =>{
    return axios.post('/api/biz/v01/listBizProduct.do',params);
}
/***********商品模块 */
export const shopmodel =params =>{
    return axios.post('/api/biz/v01/selectProductByCatalogId.do',params);
}
/************积分商城 */
export const integral =params =>{
    return axios.post('/api/biz/v01/listBizIntegralProductByStoreId.do',params);
}
/************兑换记录 */
export const selectIntegral =params =>{
    return axios.post('/api/biz/v01/selectIntegralOrder.do',params);
}
/************兑换积分 */
export const  conversionIntegral =params =>{
    return axios.post('/api/biz/v01/insertBizIntegralOrder.do',params);
}
/************积分详情 */
export const  integralDeatil =params =>{
    return axios.post('/api/biz/v01/listBizIntegralProductByStoreId.do',params);
}
/************首页banner */
export const homeBanner =params =>{
    return axios.post('/api/portal/v01/listPortalBanner.do',params);
}
/************查询购物车商品 */
export const loadingshopCar =params =>{
    return  axios.post('/api/biz/v01/listBizUserTrolleyAndProductWithoutToken.do',params);
}
/***********删除购物车 */
export const removeShopCar =params =>{
    return axios.post('/api/biz/v01/forceRemoveBizUserTrolleyBatchWithoutToken.do',params);
}
/**********微信支付 */
export const payNow =params =>{
    return axios.post('/api/biz/v01/payNowBizOrderWithoutToken.do',params);
}
/**********货到付款 */
export const payNext =params =>{
    return axios.post('/api/biz/v01/payNextBizOrderAndClearTrollyWithoutToken.do',params);
}
/**********添加收货地址 */
export const addAddress =params =>{
    return axios.post('/api/portal/v01/insertPortalUserAddress.do',params);
}
/**********删除收货地址 */
export const removeAddress =params =>{
    return axios.post('/api/portal/v01/deleteAdressPortalUserAddress.do',params);
}
/**********默认收货地址 */
export const defaults =params =>{
    return axios.post('/api/portal/v01/freezePortalUserAddress.do',params);
}
/**********查询收货地址 */
export const lookaddAddress =params =>{
    return axios.post('/api/portal/v01/listPortalUserAddress.do',params);
}
/***********商品详情 */
export const productDetails =params =>{
    return axios.post('/api/biz/v01/getBizProductByStoreIdWithoutToken.do',params);
}   
/************获取历史订单 */
export const historyOrder =params =>{
    return axios.post('/api/biz/v01/listBizOrderWithoutToken.do',params);
}
/************订单调起支付 */
export const Orderpay =params =>{
    return axios.post('/api/biz/v01/payExistBizOrderWithoutToken.do',params);
}
/************申请取消订单 */
export const applyCancel =params =>{
    return axios.post('/api/biz/v01/applyCancelBizOrderWithoutToken.do',params);
}
/************用户删除订单 */
export const deleteorder =params =>{
    return axios.post('/api/biz/v01/deleteBizOrderWithoutToken.do',params);
}
/************用户申请退货 */
export const applyDrawback =params =>{
    return axios.post('/api/biz/v01/applyDrawbackBizOrderWithoutToken.do',params);
}
/************用户确认收货 */
export const Confirmreceipt =params =>{
    return axios.post('/api/biz/v01/confirmDeliveredBizOrderWithoutToken.do',params);
}
/************收藏商品 */
export const collectShop =params =>{
    return axios.post('/api/biz/v01/insertBizUserCollectWithoutToken.do',params);
}
/************取消收藏商品 */
export const delcollectShop =params =>{
    return axios.post('/api/biz/v01/deleteBizUserCollectWithoutToken.do',params);
}
/********查询是否会员 */
export const checkVip =params =>{
    return axios.post('/api/portal/v01/checkPortalUserMember.do',params);
}
/********查询是否商家 */
export const Account =params =>{
    return axios.post('/api/biz/v01/listBizStoreAccount.do',params);
}
/**********用户积分明细 */
export const IntegralDetail =params =>{
    return axios.post('/api/biz/v01/selectUserIntegralDetail.do',params);
}
/********申请会员 */
export const regVip =params =>{
    return axios.post('/api/portal/v01/insertPortalUserMember.do',params);
}
/********查询收藏 */
export const collect =params =>{
    return axios.post('/api/biz/v01/listBizUserCollectAndProductWithoutToken.do',params);
}
/********查询预览记录 */
export const browse =params =>{
    return axios.post('/api/portal/v01/listPortalUserHistorical.do',params);
}
/*************修改默认地址 */
export const checkAddress =params =>{
    return axios.post('/api/portal/v01/freezePortalUserAddress.do',params);
}
/*************修改地址 */
export const compileaddress =params =>{
    return axios.post('/api/portal/v01/updateAddressPortalUserAddress.do',params);
}
/*************获取地址 */
export const StoreIdaddress =params =>{
    return axios.post('/api/portal/v01/selectByStoreId.do',params);
}
/*************商品推荐 */
export const productReCommend =params =>{
    return axios.post('/api/biz/v01/BizProductReCommendById',params);
}
/*************根据浏览记录推荐 */
export const HisproductReCommend =params =>{
    return axios.post('/api/biz/v01/BizProductReCommendByHis',params);
}
/************* 查询店铺 */
export const checkStore =params =>{
    return axios.post('/api/biz/v01/listBizStoreWithoutToken.do',params);
}
/**********修改会员信息 */
export const modify =params =>{
    return axios.post('/api/portal/v01/changePortalUserMember.do',params);
}
/**********删除收藏商品 */
export const deleteColl =params =>{
    return axios.post('/api/biz/v01/deleteBizUserCollectWithoutToken.do',params);
}
/**********删除预览商品 */
export const deleteBrowser =params =>{
    return axios.post('/api/portal/v01/deletePortalUserHistorical.do',params);
}