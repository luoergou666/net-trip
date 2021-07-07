
import axios from '@/http/axios'

export default {
    //---------------------------------------------  登录/登出    
    // 登录
    login(params) { return axios.post("/admin/login", params); },
    // 退出登录
    logout(params) { return axios.post("/admin/signOut", params); },

    // 获取图形验证码
    getData_ImgCode(params) { return axios.post("/admin/captcha", params, { responseType: "arraybuffer" }); },
    // 发送短信验证码
    sendData_SMSCode(params) { return axios.post("/sms/sendSMSCode", params); },
    // 重置密码
    updateData_ResetPassword(params) { return axios.post("/admin/reset", params); },

    //---------------------------------------------  后台用户    
    // 新增/保存 用户信息
    saveData_User(params) { return axios.post("/admin/save", params); },
    // 禁用启用 用户
    updateData_User_IsActive(params) { return axios.post("/admin/updateUserStatus", params); },
    // 获取 用户
    getData_User(params) { return axios.post("/admin/getUser", params); },
    // 用户列表
    getPage_User(params) { return axios.post("/admin/getUserPageList", params); },

    //---------------------------------------------  角色    
    // 新增/保存 角色信息
    saveData_Role(params) { return axios.post("/authority/saveRole", params); },
    // 分页列表 角色
    getPage_Role(params) { return axios.post("/authority/getRoleList", params); },

    //---------------------------------------------  资源    
    // 新增/保存 资源信息
    saveData_Page(params) { return axios.post("/authority/savePage", params); },
    // 分页列表 资源
    getPage_Page(params) { return axios.post("/authority/getPageListPage", params); },

    //---------------------------------------------  用户角色    
    //  批量增加更新
    addList_UserRole(params) { return axios.post("/authority/addUserRoleList", params); },
    getList_UserRole(params) { return axios.post("/authority/getUserRoleList", params); },

    //---------------------------------------------  角色资源    
    //  批量增加更新
    addList_RolePage(params) { return axios.post("/authority/addRolePageList", params); },
    getList_RolePage(params) { return axios.post("/authority/getRolePageList", params); },


}