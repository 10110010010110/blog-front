// 添加请求拦截器
import axios from 'axios';
import { ElMessage } from 'element-plus';
import config from '../config';
const service = axios.create(
  {
    baseURL: config.baseApi,
  }
);
service.interceptors.request.use(function (config) {
     const url = config.url;
     // 排除登录和注册接口
     if (url !== '/user/login' && url !== '/user/register') {
          const token = localStorage.getItem('token');
          if (token) {
              // 在请求头中添加 token
              config.headers['Authorization'] = `Bearer ${token}`;
          }
      }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
        const{code,data,message} = response.data;
        if(code === 200){
            return data;
        }else{
            ElMessage.error(message || 'Error');
            return Promise.reject(message || 'Error');
        }
    }, function (error) {
        // 对响应错误做点什么
        ElMessage.error(error.message || '网络错误');
        return Promise.reject(error);
    })


function request (options){
    options.method = options.method || 'get'
    if(options.method.toLowerCase() === 'get'){
        options.params = options.data || {}
        // 删除 data 属性，避免 axios 尝试将其作为请求体发送
        delete options.data
    }
    service.defaults.baseURL =  config.baseApi

    return service(options)
}
export default request