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
    return axios.post('/api/biz/v01/listBizIntegralProduct.do',params);
}
/************首页banner */
export const homeBanner =params =>{
    return axios.post('/api/portal/v01/listPortalBanner.do',params);
}
/************查询购物车商品 */
export const loadingshopCar =params =>{
    return axios.post('/api/biz/v01/listBizUserTrolleyAndProductWithoutToken.do',params);
}
/***********删除购物车 */
export const removeShopCar =params =>{
    return axios.post('/api/biz/v01/forceRemoveBizUserTrolleyBatchWithoutToken.do',params);
}
/**********货到付款 */
export const payNext =params =>{
    return axios.post('/api/biz/v01/payNextBizOrderAndClearTrollyWithoutToken.do',params);
}
/**********添加收货地址 */
export const addAddress =params =>{
    return axios.post('api/portal/v01/insertPortalUserAddress.do ',params);
}
/***********商品详情 */
export const productDetails =params =>{
    return axios.post('/api/biz/v01/getBizProductWithoutToken.do ',params);
}

axios.interceptors.request.use(//拦截器
    config=>{
        if (localStorage.getItem('accessToken')) {
            config.headers.userToken=localStorage.getItem('accessToken')//请求头加上token
        }
        return config
    },
    err=>{
        return Promise.reject(err);
    }
)

