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
}
export default getters