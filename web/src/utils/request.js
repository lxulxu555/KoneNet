import axios from 'axios'
import { Message } from 'ant-design-vue'
import store from '../store/getters'
import { getToken ,setToken} from '../utils/auth'
import router from '../router/index';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // console.log('123config')
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
      config.headers.Authorization = 'Bearer '+ window.sessionStorage.getItem('token')
      window.sessionStorage.setItem('userAccount',JSON.stringify(config.data))
      // console.log(JSON.stringify(config.data))
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log(12348900)
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 2 * 1000
      })

      router.push('/login')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if(res.error == 'JWT校验失败'){
        Message({
          message: '用户名或密码错误',
          type: 'error',
          duration: 2 * 1000
        })
        router.push('/login')
      }else if(response.headers.authorization){
        setToken(response.headers.authorization)
      }
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
