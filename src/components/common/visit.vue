<template>
  <div>
    <p v-on:click='delet' class='login_back'>注销</p>
    <div class='login_title'>您可以访问的系统有</div>
    <ul class='login_ul'>
      <li v-for='list in datas'>
        <router-link :to='list.bizUrl'>{{list.name}}</router-link>
      </li>
    </ul>
    <router-link to='/0'>首页</router-link>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        datas : [],
      }
    },
    created(){
      var newUrl = '/uums/userinfo/status'
      var data1 = ''
      this.$http.post(newUrl,data1,{emulateJSON:true}).then(res=>{
        console.log(res)
        if(res.body.results == 'true'){
          console.log('开始调用')
          this.orgFin()
          console.log('true')
        }else{
          this.$router.push('/login')
          console.log('false')
        }
      },res=>{
       console.log('失败')
     })
    },
    methods:{
      delet(){
        this.$router.push('/login')
      },
      orgFin(){
        var url = '/uums/userinfo/apps'
        var data1 =  JSON.stringify([{"guid":"BM_UCMGR_WEB"},{"guid":"BM_OMS_WEB"},{"guid":"BM_DEMO_WEB"}]);
        this.$http.post(url,data1,{emulateJSON:true}).then(res=>{
          this.datas = res.body;
        },res=>{
        })
      }
    }
  }

</script>

<style>
  ul li {
    list-style: none;
  }
  .login_ul{
    width: 50%;
    padding-left: 40px;
    position: absolute;
    left:50%;
    top:110px;
    padding-left: 0px;
    transform: translateX(-50%);
  }
  .login_ul li{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 25px;
    font-family: cursive;
  }
  .login_title{
    font-size: 32px;
    cursor: pointer;
    color: #310e0e;
    width: 50%;
    height: 40px;
    line-height: 40px;
    position: absolute;
    font-family: cursive;
    left: 50%;
    top:30px;
    transform: translateX(-50%);
    text-align: center;
  }
  .login_back{
    width: 60px;
    height: 30px;
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: pink;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
    cursor: pointer;
  }
</style>