const getters = {
    shopLength: state =>{ 
        state.shop.shopLength
    },
    keepAliveComponents:(state)=>{
        state.global.keepAliveComponents
    },
    storeId:(state)=>{
        state.selectStore.storeId
    },
    isVip:(state)=>{
        state.vipSale.isVip
    }
}
export default getters