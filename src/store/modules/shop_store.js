import {addShop,loadingshopCar} from '../../api/api'
const shop = {
  state: {
      shopLength:0,//加入购物车的数量
  },
  mutations: {
      SHOP_LENGTH_ADD:(state)=>{//购物车length++        
          state.shopLength++;
      }
  },
  actions: {
      addtoShop({commit},params){
        return new Promise((resolve, reject)=>{
          addShop(params).then((result) => {
                commit('SHOP_LENGTH_ADD')
                resolve()
          }).catch((err) => {
              console.log(err)
              reject()
          });
        })
      },
      loadingShop({commit},params){
        return new Promise((resolve,reject)=>{
          loadingshopCar(params).then((result) => {
              if (result.data.resultCode==200) {
                resolve(result.data.list)//返回list
              }
          }).catch((err) => {
              reject()
          });
        })
      }
  }
}
export default shop;
