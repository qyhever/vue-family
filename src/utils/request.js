import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import router from '@/router'
// import { getToken } from '@/utils/local'

const baseURL = {
  dev: 'http://localhost:3000',
  test: 'http://test.pluton.com',
  prod: 'http://pluton.com'
}[process.env.MODE]

const codeMessage = {
  400: '请求错误',
  401: '登录状态失效，请重新登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  500: '服务器错误，请稍后再试',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

const paramsSerializer = params => {
  const data = {}
  for (const k in params) {
    const value = params[k]
    if (value !== '' && value !== null && value !== undefined) {
      data[k] = value
    }
  }
  return qs.stringify(data, { arrayFormat: 'brackets' })
}

const instance = axios.create({
  baseURL,
  timeout: 15000,
  // 只作用于 params（手动拼接在 url 后的参数不走这里）
  paramsSerializer,
  headers: {
    Accept: 'application/json'
  }
})

/**
 * @param {Object} options 请求配置参数
 * @param {Boolean} [options.getResponseSchema=false] 是否直接返回 axios Response Schema
 * @param {Boolean} [options.showWarningMsg=true] 是否显示接口错误提示（请求成功，但接口状态码非成功状态）
 * @param {Boolean} [options.showErrorMsg=true] 是否显示请求错误提示（请求失败）
 * @param {Function} fn loading 状态回调
 * @return {Promise} Promise
 */
const _request = (
  {
    getResponseSchema = false,
    showWarningMsg = true,
    showErrorMsg = true,
    ...options
  } = {},
  fn = () => { } // eslint-disable-line
) => {
  instance.interceptors.request.use(config => {
    // const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  }, error => {
    return Promise.reject(error)
  })
  return instance(options)
    .then(response => {
      if (getResponseSchema) { // immediately return the axios Response Schema
        return response
      }
      const responseData = response.data || {}
      if (responseData.resultCode === 1) { // success code
        responseData.succeed = true
      } else { // not success code
        if (showWarningMsg) {
          Message.closeAll()
          Message.warning(responseData.resultMsg || '操作失败')
        }
      }
      return responseData || {}
    })
    .catch(error => {
      let msg = ''
      if (error.response) {
        const status = error.response.status
        msg = codeMessage[status] || '操作失败'
        if (status === 401) {
          // store.commit('user/CLEAR_USERINFO')
          router.replace('/login')
        }
      } else {
        if (error.message) {
          if (error.message.indexOf('timeout') >= 0) {
            msg = '请求超时！请检查网络是否正常'
          } else if (error.message.indexOf('aborted') >= 0) {
            // ...
          } else {
            msg = '网络错误，请检查网络是否已连接！'
          }
        }
      }
      if (showErrorMsg && msg && !axios.isCancel(error)) {
        Message.closeAll()
        Message.warning(msg)
      }
      throw error
    })
    .finally(() => {
      fn(false)
    })
}

export default param => {
  const typeRes = typeof param
  // the first param is a function, example: request(value => this.loading = value)(options)
  if (typeRes === 'function') {
    param(true)
    return options => _request(options, param)
  }
  // the first param is not a function, example: request(options)
  if (typeRes === 'object' && typeRes !== null) {
    return _request(param)
  }
  return _request(param)
}
