const API_TEST = 'http://hsmy.vrdete.com/'
const API = `${API_TEST}api/`
const BIZ = `${API}bizrelatives/`
const SYSTEM = `${API_TEST}system/`
/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @returns {Promise}
 */
const requestData = (url, data = {}, method = 'POST') => {
  console.log('requestData url: ', url)
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      header: {
        'Content-Type': 'application/json',
        'userToken': wx.getStorageSync('userToken', ''),
        'admintoken': wx.getStorageSync('admintoken', '')
      },
      method: method,
      success: function (res) {
        console.log('response data: ', res)
        if (res.statusCode == 200) {
          if (res.data.hasOwnProperty('Error')) {
            reject(res.data.Error.message)
          }
          resolve(res.data);
        } else {
          reject();
        }
      },
      fail: function () {
        reject();
      }
    });
  });
}

export const homepagebanner = ( data) => {
  return requestData(`${API}homepagebanner/selectall`, data)
}

export const selecthot = (data) => {
  return requestData(`${API}bizrelatives/selecthot`, data)
}

export const selectCatalogByParents = (data) => {
  return requestData(`${SYSTEM}catalog/selectByParents`)
}

export const selectCatalog = (data) => {
  return requestData(`${SYSTEM}catalog/selectcatalog`, data)
}

export const selectProductByCatalogId = (data) => {
  return requestData(`${BIZ}selectProductByCatalogId?page=1&pagesize=100`, data)
}