<template>
  <div>
    <div class="login-main">
      <div class="login-info clearfix">
        <div class="login-info-left">
          <div class="logo-img-uums">上交所统一认证平台</div>
          <form @submit.prevent="loginn">
            <div class="username-field">
              <label for="username"> <i class="glyphicon glyphicon-user sile" title="用户名"></i></label>
              <input type="text" v-model='user.username' id="username" placeholder="请输入用户名"/>
            </div>
            <div class="password-field">
              <label for="password"> <i class="glyphicon glyphicon-lock sile" title="密码"></i></label>
              <input type="password" v-model='user.userpass' id="password" placeholder="请输入密码"/>
            </div>
            <div class='message'>
              <div class="error-empty" id="errorEmpty" v-show="loading">
                <span>{{massage}}</span>
              </div>
            </div>
            <div class="btn-login">
              <button type='submit' id="btnSubmit" >登 录</button>
            </div>
          </form>
        </div>
        <div class="login-info-middle"></div>
        <div class="login-info-right"></div>
      </div>
    </div>
    <div class="login-footer">Copyright © 2017 上海证券交易所版权所有建议使用IE8+，Chrome，Firefox或者其他高级浏览器，1024*768分辨率</div>
    <input type="text" hidden="hidden" id="sectionIndex" value="/uums_mgr/admin/index" class="hiddenInput"/>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import router from '../../router/index.js'
  import jquery from '../../router/jquery-1.11.1.min.js'
  import CryptoJS from 'crypto-js'
  import tripledes from '../../router/tripledes.js'
  import util from '../../router/util.js'
  export default {
    data () {
      return {
        user: {
          username: '',
          userpass: ''
        },
        loading : false,
        massage:'',
      }
    },
    methods: {
      loginn () {
        var name = this.user.username.trim();
        var pass = this.user.userpass.trim();
          if( name == '' ){
              this.loading = true;
              this.massage = '!用户名不能为空';
          }else if(pass == ''){
              this.loading = true;
              this.massage = '!密码不能为空'
          }else{
          this.loading = false;
          function encryptByDES(message, key) {
            var keyHex = CryptoJS.enc.Utf8.parse(key);
            var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        }
        var kk = encryptByDES(this.user.userpass,"uums_unknow");
        var deata = {"username":this.user.username+"#"+kk,"password":kk}
        this.$axios({
          url:'/uums_mgr/login',
          method:'post',
          data:deata,
          transformRequest:[
              function(data,headers){
              var ret = ''
              for( var it in data ){
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          headers:{
          'Content-Type' : 'application/x-www-form-urlencoded',
          },
          withCredentials : true
        })
        .then(res => {
            if(res.data.results == 'true'){
              this.$store.state.userName = window.localStorage.userName = this.user.username.trim()
              this.$store.state.asiderNum = window.localStorage.asiderNum = '/uums_mgr'
              this.$router.push('/uums_mgr');
            }else{
              this.loading = true;
              this.massage = '!用户名或者密码错误';
              setTimeout(()=>{
                this.loading = false;
                this.massage = '';
              },2000)
            }
          })
         .catch(err => {
           window.alert(err)
         })
        }
      }
    }
  }
</script>
<style>
  .top-bar{
    background-color: #f5f5f5;
    height: 40px;
    border-bottom: 1px solid #dcdcdc;
    line-height: 40px;
  }
  .sj-cont-width{
    width: 1190px;
    margin: 0 auto;
  }
  .top-bar-bd-l{
    font-size: 16px;
    float: left;
  }
  .top-bar-bd-r{
    float: right;
  }
  .top-bar-bd-r input{
    border: 0;
    background-color: transparent;
    height: 40px;
    cursor: pointer;
    color: #337ab7;
  }
  .top-bar-bd-r input:hover{
    text-decoration: underline;
  }

  /*  �û��������½*/
  /* body{
    background-color: #f3f3f3;
  } */
  .login-main{
    background: url('../../../resouce/images/login-bg.png') no-repeat 50% 0;
    height: 100%;
    width: 100%;
    padding-top: 15%;
    padding-top: 10%\0;/*��������ie8-9 */
  }
  .message{
    height: 45px;
    /*background-color: red;*/
  }
  .login-info{
    width: 1200px;
    margin: 0 auto;
    border-radius: 12px;
    background: #fff;
    padding: 60px 100px 120px;
  }

  /*��������ר������*/
  .logo-img-innovation{
    text-indent: -2000px;
    height: 50px;
    width: 415px;
    background: url('../../../resouce/images/logo-innovation.png') no-repeat center;
  }

  .logo-img-sap{
    text-indent: -2000px;
    height: 50px;
    width: 415px;
    background: url('../../../resouce/images/logo-sap.png') no-repeat center;
  }

  .logo-img-uums{
    text-indent: -2000px;
    height: 50px;
    width: 415px;
    background: url('../../../resouce/images/logo-uums.png') no-repeat center;
  }

  .login-info-left,.login-info-middle{
    float: left;
  }
  .login-info-right{
    float: right;
  }
  .username-field,.password-field{
    height: 50px;
    width: 415px;
    border: 1px solid #cfcfcf;
    border-radius: 4px;
    background: #fafafa;
    margin-top: 20px;
    position: relative;
  }
  .username-field i,.password-field i{
    height: 24px;
    display: inline-block;
  }
  .login-info-left label{
    position: absolute;
    left: 18px;
    top: 12px;
  }
  .login-info-left input{
    -height: 20px;
    background: #fafafa;
    width: 357px;
    border: 0;
    padding-left: 58px;
    border-radius: 4px;
    padding-top: 15px;
    padding-bottom: 15px;
    -webkit-height:100%;
  }
  .username-field i{
    width: 27px;
  }
  .password-field i{
    width: 24px;
    background-position: 0 -82px;
  }

  .error-empty{
    padding: 20px 0 25px 0;
    color: red;
    height: 30px;
    float: left;
  }
  
  .btn-login a{
    display: block;
    width: 415px;
    height: 50px;
    background: #3676c5;
    color: #fff;
    font-size: 26px;
    line-height: 52px;
    text-align: center;
    text-decoration: none;
    border-radius: 4px;
  }
  .btn-login a:hover{
    background: #4493f5;
  }
  .login-info-middle{
    height: 300px;
    width: 2px;
    background: #c5c5c5;
    margin-left: 150px;
  }
  .login-info-right{
    width: 330px;
    height: 307px;
    background: url('../../../resouce/images/login-img1.png') no-repeat;
    margin-top: 12px;
  }
  .login-footer{
    position: fixed;
    padding: 10px 0;
    width: 100%;
    background: #fff;
    bottom: 0;
    left: 0;
    text-align: center;
    color: #7d7d7d;
  }
  .ekey-cont{
    text-align: center;
  }
  .sorry-again{
    padding-top: 150px;
  }
  .wait-img{
    padding-top: 100px;
  }
  .check-text{
    font-size: 36px;
    color: #45a6ba;
    padding: 20px 0;
  }
  .btn-refresh{
    padding-top: 80px;/* 112px; */
  }
  .btn-refresh a{
    color: #fff;
    font-size: 30px;
    height: 52px;
    width: 200px;
    background-color: #45a6ba;
    display: inline-block;
    text-decoration: none;
    line-height: 52px;
  }
  .btn-refresh a:hover{
    background-color: #4ebfd6;
  }

  .loading-bar{
    position: relative;
    margin: 116px 0 20px 0;
  }
  .default-bar{
    height: 8px;
    width: 530px;
    background: #bebebe;
    position: absolute;
    top: 2px;
    left: 50%;
    margin-left: -265px;
  }
  .fill-bar{
    height: 12px;
    width: 0;
    position: absolute;
    background-color: #45a6ba;
    top: 0;
    left: 50%;
    margin-left: -265px;
  }
  .login-info-left input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #fafafa inset;
  }
  .forget-password{
    padding-top: 20px;
    text-align: right;
    color: #7d7d7d;
  }
  html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  blockquote,body,button,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,input,legend,li,ol,p,pre,td,textarea,th,ul {
    margin: 0;
    padding: 0
  }
  body {
    font: 12px/1.6 Microsoft YaHei, Verdana, Arial, Helvetica, sans-serif, Simsun;
    color: #333333;
    background-color: #fff;
  }
  input, select, button{
    font: 12px/1.6 Microsoft YaHei, Verdana, Arial, Helvetica, sans-serif, Simsun;
    outline: none;
    border: 0;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }
  h1,h2,h3,h4,h5,h6 {
    font-size: 100%
  }
  html, body, fieldset, img, iframe, abbr {
    border: 0;
  }
  i,  cite, em, address, dfn {
    font-style: normal;
  }
  a,
  button {
    cursor: pointer;
  }
  a {
    color: #3498db;
    text-decoration: none;
  }
  a:hover {
    color: #3486bc;
  }
  a:active,
  input:focus,
  textarea:focus,
  a:focus {
    outline: 0;
  }
  ul, li {
    list-style: none;
  }
  input::-ms-clear {
    display: none;
  }
  input::-ms-reveal {
    display: none;
  }
  input::-webkit-input-placeholder {
    color: #cccccc !important;
    /* WebKit browsers */
  }
  input:-moz-placeholder {
    color: #cccccc !important;
    /* Mozilla Firefox 4 to 18 */
  }
  input::-moz-placeholder {
    color: #cccccc !important;
    /* Mozilla Firefox 19+ */
  }
  input:-ms-input-placeholder {
    color: #cccccc !important;
    /* Internet Explorer 10+ */
  }
  .clearfix:after {
    content: "";
    display: table;
    clear: both;
    height: 0;
  }
  .clearfix{
    zoom: 1;
  }

  .tab-content{
    padding: 20px;
  }

  .dialog-mask{
    display: none;
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: #000;
    left: 0;
    top: 0;
    opacity: 0.3;
    filter: alpha(opacity=30);
    background: rgba(0,0,0,0.3);
  }
  .dialog-uums{
    display: none;
    position: fixed;
    left: 50%;
    top: 50%;
    width: 600px;
    height: 300px;
    background: #fff;
    margin-left: -300px;
    margin-top: -150px;
    z-index: 1001;
    background: rgba(255,255,255,0.5);
    padding:5px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.5);
    text-align: center;
  }
  .dialog-uums-inner{
    background: #fff;
    width: 600px;
    height: 300px;
    position: relative;
  }
  .dialog-hd{
    font-size: 16px;
    padding: 10px;
  }
  .dialog-close{
    position: absolute;
    top: 15px;
    right: 10px;
    color: #999;
    font-size: 22px;
    line-height: 0;
    font-weight: bold;
  }
  .dialog-close:hover{
    color: #525252;
  }
  .dialog-ft{
    padding-top: 30px;
  }
  .dialog-ft a{
    display: inline-block;
    width: 80px;
    height: 34px;
    line-height: 34px;
    color: #fff;
    background: #108ee9;
    text-align: center;
    border-radius: 2px;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
  }
  .dialog-ft a:hover{
    background: #49a9ee;
  }
  .hiddenInput{
    opacity: 0;
    filter: alpha(opacity=0);
    background: rgba(0,0,0,0);
  }
  .sile{
    font-size: 18px;
  }
  #btnSubmit{
    font-size: 24px;
    background-color: #3676c5;
    width: 100%;
    height: 50px;
    line-height:50px;
    color:white;
    border-radius: 6px;
    margin-top: 20px;
  }
  .username-field, .password-field{
       height : 51px;
  }
</style>
