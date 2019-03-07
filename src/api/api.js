import axios from 'axios'
/**************微信授权 */
export const getUserOpenIdFromCodeWithoutToken = params => {
    return axios.post("/api/wechat/authorize",params); 
};
export const getUserInfo= params => {
    return axios.post("/api/wechat/postwcode",params); 
};