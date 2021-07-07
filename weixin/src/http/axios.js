import axios from 'axios'
import baseurl from './baseurl'
import Qs from 'Qs'
import md5 from 'js-md5';
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
    if (localStorage.getItem('xxxx_weixin_token')) {
      let token = localStorage.getItem('xxxx_weixin_token');
      let rand = Math.floor(Math.random() * 900) + 100; //三位数的随机字符串
      let timestamp = new Date().getTime() + "" + rand;
      let nonce = md5(timestamp + token);

      config.headers['token'] = token;
      config.headers['timestamp'] = timestamp;
      config.headers['nonce'] = nonce;
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

    // 401 说明 token 验证失败,登录失效,重新授权
    if (response.data.code === 401) {
      localStorage.removeItem("xxxx_weixin_token");
      location.href = baseurl.weixin + '#/wechatoauth';
    }
    else if (response.data.code == 403) {
      location.replace(baseurl.weixin + '#/404');
    }

    return response;
  },
  error => {
    console.log(error)
    console.log('axios 响应拦截发生一个错误！')
    return Promise.reject(error);
  });

export default axios;
