
import axios from '@/http/axios'

/*                 
    var param = ;
    this.$api.saveData_User(param)
*/
export default {
    //---------------------------------------------  自定义聚合页    ---------------------------------------------
    //add Or update
    saveData_Quartz(params) {
        var url = !params.id ? "/quartz/createJob" : "/quartz/update";
        return axios.post(url, params);
    },
    // 暂停任务
    UpdateData_Quartz_PauseJob(params) { return axios.post("/quartz/pauseJob", params); },
    // 启动任务
    UpdateData_Quartz_ResumeJo(params) { return axios.post("/quartz/resume", params); },
    // get by id
    getData_Quartz(params) { return axios.post("/quartz/getQuartzOne", params); },
    // get list
    getPage_Quartz(params) { return axios.post("/quartz/getQuartzList", params); },

    // 获取定时任务类列表
    getList_Quartz_Class(params) { return axios.post("/quartz/getQuartzClassS", params); },
}