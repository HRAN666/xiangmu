const getters = {
    shopLength: state =>{ 
        state.shop.shopLength
    },
    keepAliveComponents:(state)=>{
        state.global.keepAliveComponents
    }
}
export default getters