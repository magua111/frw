// 获取应用系统
import Vue from 'vue'
import vueResouce from 'vue-resource'
Vue.use(vueResouce)
const getorgOptionurl  = '/uums_mgr/app/findAllBizApps';
const getPersonNameurl = '/uums_mgr/person/findByFullName?fullName='
const pcodeOnlyurl = '/uums_mgr/person/pCode'

export default {
    // 应用系统列表option获取
    getOrgOption : function(instance){
        return Vue.http.get(getorgOptionurl)
    },
    // 人员姓名option获取
    choose1(query,instance){
        if(query == '' || query == []|| query == null){
            query = ''
        }
        if(query.trim()=='' ){
            return  instance.options1 = [];
        }else{
            Vue.http.get(getPersonNameurl + query).then(res=>{
                return  instance.options1 = res.body;
            },res=>{
            })
        }
    },
    pcodeOnlyget : (a,message)=>{
        console.log(a)
        return Vue.http.post(pcodeOnlyurl,a,{emulateJSON:true}).then(
            res=>{
                if(res.body == true){
                    return message = {
                        b : false,
                        c : ''
                    }
                }else{
                    return message = {
                        b : true,
                        c : '该工号已存在'
                    }
                }
            },res=>{
                return message = {
                    b : true,
                    c : '该工号已存在'
                }
            }
        )
    }
}
