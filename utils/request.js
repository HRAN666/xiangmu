const API_TEST = 'http://hsmy.vrdete.com/'
const API = `${API_TEST}api/`
/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @returns {Promise}
 */
const requestData = (url, data, method = 'POST') => {
  console.log('requestData url: ', url)
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data || {},
      header: {
        'Content-Type': 'application/json',
        'token': wx.getStorageSync('userToken', '')
      },
      method: method,
      success: function (res) {
        console.log('response data: ', res)
        if (res.statusCode == 200) {
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