import axios from 'axios'
import baseurl from './baseurl'
import Qs from 'Qs'
// import router from '@/router'

axios.defaults.timeout = 60000 //超时时间
axios.defaults.baseURL = baseurl.server //默认请求地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' //设置内容格式

//设置默认请求转换器
axios.defaults.transformRequest = function (data) {
  data = Qs.stringify(data);
  //data = JSON.stringify(data);
  return data;
};

//请求拦截
axios.interceptors.request.use(
  config => {
    //如果存在token则加上token
    if (localStorage.getItem('xxxx_admin_token')) {
      config.headers['token'] = localStorage.getItem('xxxx_admin_token');
    }
    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// 响应拦截
axios.interceptors.response.use(
  response => {
    // console.log(response);
    if (response.data.code === 401) {
      // 401 说明 token 验证失败 跳转到失效提示页面
      var time = new Date().getTime();
      location.href = baseurl.admin + '#/?logout=logout&time=' + time;
    }

    if (response.data.code === 403) { location.href = baseurl.admin + '#/403'; }

    return response;
  },
  error => {
    console.log(error)
    console.log('axios 响应拦截发生一个错误！')
  });

export default axios;
