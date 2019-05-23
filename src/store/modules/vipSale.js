
import {checkVip} from '../../api/api'
const vip ={
    state: {
        isVip:localStorage.getItem('vip'),
        ponit:0,
    },
    mutations: {
        GET_PONIT:(state,value)=>{
            state.ponit=value/100
        },
        VIP_TRUE:(state)=>{
            localStorage.setItem('vip',true)
            state.isVip=true
        },
        VIP_FALSE:(state)=>{
            localStorage.setItem('vip',false)
            state.isVip=false
        }
    },
    actions: {
      check({commit},params){
        return new Promise((resolve,reject)=>{
            checkVip(params).then((result) => {
                if (result.data.resultCode==200) {
                    commit('VIP_TRUE')
                    commit('GET_PONIT',result.data.list[0].point)
                    resolve(result.data)
                }else{
                    commit('VIP_FALSE')
                    commit('GET_PONIT',result.data.list[0].point)
                    resolve(result.data)
                }
            }).catch((err) => {
                reject(err)
            });
        })
      }
    }
}
export default  vip