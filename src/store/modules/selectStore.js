const storeId={
    namespaced: true,
    state: {
        storeId:localStorage.getItem('storeId')||0,//店铺id 暂时0
        storeIndex:localStorage.getItem('storeIndex')||0,//校区的索引位置默认第一个
        storeName:localStorage.getItem('name')||'测试',//校区名字
    },
    mutations: {
        CHANGE_STORE:(state,value)=>{
            localStorage.setItem('storeId',value.id)
            localStorage.setItem('storeIndex',value.index)
            localStorage.setItem('name',value.name)
            state.storeId=value.id;
            state.storeIndex=value.index;
            state.storeName=value.name;
        },
    },
    actions: {
        
    }
}
export default storeId