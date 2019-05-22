
import {checkVip} from '../../api/api'
const vip ={
    state: {
        isVip:localStorage.getItem('vip'),
        ponit:0,
    },
    mutations: {
        GET_PONIT:(state,value)=>{
            state.ponit=value/100
        }
    },
    actions: {
      check({commit},params){
        return new Promise((resolve,reject)=>{
            checkVip(params).then((result) => {
                if (result.data.resultCode==200) {
                    resolve(result.data)
                    localStorage.setItem('vip',true)
                }else{
                    resolve(result.data)
                    localStorage.setItem('vip',false)
                }
            }).catch((err) => {
                reject(err)
            });
        })
      }
    }
}
export default  vip