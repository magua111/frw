<template>
  <!-- 头部 -->
  <div class="header">
    <div class='uumsAll' v-on:click='headerPage'>
      <div class='uu'>UC</div>
      <div class='center'>用户中心</div>
    </div>
    <ul class='hearder_ul'>
      <li v-on:click='backLoging' class='herder_back'>
        <div class='glyphicon glyphicon-off ic_class'></div>
        <div class='hearder_back'>退出</div>
      </li>
      <li class='centerPerson'>
        <div class="pic_left"></div>
        <div class='infoMessageUser'>
          <div class="welcome">welcome</div>
          <div class="pic_name">{{name}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        back : false,
      }
    },
    created(){
      this.name = this.$store.state.userName = window.localStorage.userName
    },
    methods:{
      backLoging(){
        var url = '/uums_mgr/logout'
        this.$http.get(url).then(res=>{
        var control= JSON.parse(res.bodyText)
          if(control.results == 'true'){
            window.localStorage.clear()
            this.$router.push('/')
          }else{
            this.openFail()
          }
        },res=>{
          this.openFail()
        })
      },
      headerPage(){
        this.$router.push('/uums_mgr')
      },
      openFail(){
        this.$message.error('退出失败')
      },
    }
  }
</script>

<style>
  .pic_name{
    height: 28px;
    line-height: 28px;
    font-style: oblique;
    text-indent: 7px;
    color: #18c0f5;;
    cursor: pointer;
  }
  .welcome{
    height: 28px;
    line-height: 28px;
    font-size: 22px;
    color: #fb0630;;
    cursor: pointer;
    text-align: center;
  }

  .uumsAll{
    width: 148px;
    height: 60px;
    position: absolute;
    left: 15px;
  }
  .hearder_ul{
    position: absolute;
    right: 15px;
    font-size: 18px;
    top:0;
    width: 600px;
    height: 60px;
  }
  .hearder_ul li {
    float: right;
    position: relative;
    line-height:60px;
    height: 100%;
    border-left:2px solid rgba(204, 204, 204, 0.46);
  }
  .ic_class{
    height: 100%;
    text-align: right;
    position: absolute;
    left: 22px;
    color: #d6d6da;
    line-height:60px;
  }
  .hearder_back{
    position: absolute;
    left: 45px;
    width: 100px;
    color: red;
    line-height:60px;
    height: 100%;
    cursor: pointer;
  }
  ul li{
    list-style: none;
  }
  .herder_back{
    width: 100px;
  }
  .uu{
    color: red;
    width: 40px;
    height: 60px;
    line-height: 60px;
    float: left;
    font-size: 44px;
    font-style: oblique;
    cursor: pointer;
  }
  .centerPerson{
    height: 60px;
    line-height: 60px;
    padding:0 15px;
  }
  .pic_left{
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background: url("../../assets/img/default.jpg") no-repeat;
    background-position: -18px -12px;
    background-size: 86px 77px;
    cursor: pointer;
    margin-top: 5px;
    float:left
  }
  #back{
    border-radios : 10px;
    color: #242729;
    font-size: 16px;
    text-decoration: none;
    font-weight: 700;
    font-family:"Hiragino Sans GB";
    margin-right : 25px;
    margin-top: 8px;
    padding:0;
  }
  .nav > li > a:hover, .nav > li > a:focus {
    background-color: #50866a;
  }
  .header .nav .back_style{
    border-radius : 10px;
  }
  navbar-nav > li > a {
    border-radius: 10px;
  }
  .center{
    color: white;
    font-size: 16px;
    position: absolute;
    font-family: cursive;
    left: 69px;
    top: 28px;
    cursor: pointer;
  }
  .infoMessageUser{
    margin-left :50px;
  }
</style>
