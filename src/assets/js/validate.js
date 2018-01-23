import getOrg from './common'
export default{
    // 内序正则

    //日期转换
    turnDate : (d)=>{
        if(d == undefined){
            return d = ''
        }else{
            var date = /[a-z]/i;
            var newDate = date.test(d);
            if(newDate == true){
                return  d.getFullYear() + '-' + (d.getMonth() + 1 ) + '-' + d.getDate()
            }else{
                return d;
            }
        }
    },
    // 内序
    deptOrder : ( a ,b )=>{
       var s = /^\+?[1-9]\d{0,3}(\.\d*)?$/
        if(s.test(b)){
            return a = false;
        }else{
            return a = true
        }
    },
    // 内序
    rank : (a,b)=>{
        var s = /^[0-9]*$/
        if(s.test(b) && b-0 < 127){
          return a = false
        }else{
          return a = true
        }
    },
    // 姓名
    peoName : (a)=>{
        var message = {};
        if(a == '' || a == null){
            return message = {
                b : true ,
                c : '姓名不能为空'
            }
        }else{
            var s = /^[\da-zA-Z\u4E00-\u9FA5]{1,10}$/;
            if(s.test(a) !== true){
                return message = {
                    b : true,
                    c : '请输入汉字英文数字且不超过10位'
                }
            }else{
                return message = {
                    b : false,
                    c : ''
                }
            }
        }
    },
    // 域账号
    domainUserFun : (a)=>{
        var b = false;
        if(a== '' || a == null){
            return false
          }else{
            var s = /^[A-Za-z0-9_-]*$/g;
            if(s.test(a)){
                return  b = false
            }else{
                return b = true
            }
          }

        //   if(this.form.domainUser == '' || this.form.domainUser == null){
        //     return false
        //   }else{
        //     var s = /^[A-Za-z0-9_-]*$/g;
        //     if(s.test(this.form.domainUser)){
        //       this.domainUserControl = false
        //     }else{
        //       this.domainUserControl = true
        //     }
        //   }
    },
    emailFun : (a)=>{
        var b = false;
        if(a == '' || a == null){
            return false
        }else{
            var ii = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            if(ii.test(a)){
                return b = false;
            }else{
                return b = true;
            }
        }
    }, 
    mobilPhone : (a)=>{
        var b = false;
        if(a == '' || a == null){
          return false
        }else{
          var yidongreg = /^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/;
          var dianxinreg = /^1[3578][01379]\d{8}$/;
          var liantongreg = /^1[34578][01256]\d{8}$/;
          if (yidongreg.test(a) || dianxinreg.test(a) || liantongreg.test(a)){
            return b = false;
          }
          else{
            return b = true;
          }
        }
    },
    // 工号
    postalcodeFun : (a)=>{
        var b = false;
        if(a == '' || a == null){
            return false
        }else{
            var code = /^[1-9][0-9]{5}$/;
            if(code.test(a)){
            return b = false;
            }else{
            return b = true;
            }
        }
    }, 
    // 座机
    homePhoneFun :(a)=>{
        var b = false;
        if(a == '' || a == null){
            return false
        }else{
            var s = /^0\d{2,3}-[1-9]\d{6,7}$/
            if(s.test(a)){
            return b = false
            }else{
            return b = true
            }
        }
    },

    // 工号限制
    pCodeFun : (a,d)=>{
        var message = {}
        if(a == '' || a == null){
            return message = {
                b : false,
                c : ''
            }
        }else{
            var s = /^[A-Za-z0-9_-]*$/g;
            if(s.test(a)){
                if(a == d){
                    return message = {
                        b : false,
                        c : ''
                    }
                }else{
                    return  getOrg.pcodeOnlyget(a,message);
                }
            }else{
                return message = {
                    b : true,
                    c : '字母数字下划线连接符组成'
                }
            }
        }
    },
}