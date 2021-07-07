import axios from '@/http/axios'

/*                 
    var param = ;
    this.$api.getPage_ActivityTemplate(param)
*/
export default {
    // 获取wx js config
    getData_Wx_JsSdkConfig(params) { return axios.post("/wx/getjsSdk", params); },
    // 获取微信授权登录回调地址
    getData_Wx_RedirectUri(params) { return axios.post("/wx/getUrl", params); },
    // 发送微信授权码，获取登录信息
    getData_Wx_WechatAuth(params) { return axios.post("/wx/wechatAuth", params); },













}