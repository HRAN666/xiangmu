const keepLive={
        namespaced: true,
    state: {
        keepAliveComponents:[],//存放缓存的数组name
    },
    mutations: {
        keepAlive:(state,components)=>{//插入
            !state.keepAliveComponents.includes(components)&&
            state.keepAliveComponents.push(components);
        },
    },
    }
    export default keepLive