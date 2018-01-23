<template>
  <div class="cont  ainer-fluid">
    <div class="body teacher-list">
      <ol class="breadcrumb">
        <li >系统管理</li>
        <li class="active">人员管理</li>
      </ol>
       <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" v-on:click='personlist'>
          <router-link to='/centeryData/personlist'>人员</router-link>
        </el-menu-item >
        <el-menu-item index="2" v-on:click='jobList'>
          <router-link to='/centeryData/jobList'>职务</router-link>
        </el-menu-item>
        <el-menu-item index="3" v-on:click='post'>
          <router-link to='/centeryData/post'>职位</router-link>
        </el-menu-item>
       </el-menu>
       <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex : '1',
        passindex : '',
      }
    },
    watch:{
      $route (a,b){
        if(a.path == "/centeryData/personlist"){
          this.activeIndex  = '1'
        }else if( a.path == "/centeryData/jobList" ){
          this.activeIndex  = '2'
        }else{
          this.activeIndex  = '3'
        }
      }
    },
    created(){
      this.activeIndex = this.$store.state.index = window.localStorage.index
    },
    methods: {
      personlist(){
        this.$router.push('/centeryData/personlist')
      },
      jobList(){
        this.$router.push('/centeryData/jobList')
      },
      post(){
        this.$router.push('/centeryData/post')
      },
      handleSelect(vlue){
        this.activeIndex = this.$store.state.index = window.localStorage.index = vlue
      },
    },
  }
</script>
<style >
    .otherInfor_left{
      position: absolute;
      left: 30px;
      top: 227px;
      width: 400px;
      height: 123px;
    }
    .otherInfor_right{
      position: absolute;
      left: 550px;
      top: 227px;
      width : 300px;
      height: 123px;
    }
    .bassMessage_info1{
      color : black;
      margin-top : 2px;
      width: 284px;
      backgroung-color: red;
      float: right;
      color: black;
      text-align: left;
      height: 30px;
      line-height: 30px;
    }
    .bassMessage_info2{
      color : black;
      width: 195px;
      margin-top : 2px;
      backgroung-color: red;
      float: right;
      color: black;
      text-align: left;
      height: 30px;
      line-height: 30px;
      border : 1px solid #ccc;
    }
    .bassMessage_info3{
      color : black;
      margin-top : 2px;
      width: 284px;
      backgroung-color: red;
      float: right;
      color: black;
      text-align: left;
      height: 30px;
      line-height: 30px;
      border : 1px solid #ccc;
    }
    .bessClass{
      margin-top : 2px;
      width : 104px;
      margin-left : 0;
      color : black;
      height : 30px;
      line-height: 30px;
      text-align : right;
    }
    .nonnectWith{
      width: 300px;
      height: 140px;
      position: absolute;
      left: 550px;
      top: 38px;
    }
    .person_down{
      position: absolute;
      top : 200px;
      left: 8px;
    }
    .bassMessage_info{
      color : black;
      width: 195px;
      margin-top : 2px;
      backgroung-color: red;
      float: right;
      color: black;
      text-align: left;
      height: 30px;
      line-height: 30px;
    }
    .el-dialog--large {
      width: 70%;
      height : 440px;
    }
    .pic{
      width: 140px;
      background-color: red;
      height: 140px;
      position: absolute;
      left: 30px;
      top: 38px;
    }
    .bassMessage{
      width: 300px;
      height: 140px;
      position: absolute;
      left: 200px;
      top: 38px;
    }
    .person_title{
      position: absolute;
      left: 8px;
      top: 8px;
    }

    .breadcrumb {
      margin-bottom: 0;
    }
    .el-menu {
      margin: 10px 0;
    }
    .el-input{
      margin-bottom: 10px;
    }
    .localchose{
      width : 126px;
      height: 31px;
    }
    .panel-body {
      padding: 15px;
      width: 400px;
      display: inline-block;
    }
    .choose_l{
      folate : left;
    }
    .choose_all{
      width : 400px;
      margin-left : 30px;
      height : 31px;
    }
    .tsxt_info {
      width: 100%;
    }
    .fl{
      float : left;
      height : 30px;
    }
    .func{
      margin-bottom : 20px;
      margin-left : 100px;
      margin-top: 17px;
    }
    .genre{
      margin-left : -100px;
    }
    .info_massage {
      display: block;
      width: 300px;
      text-align: center;
      color: red;
      margin-left: 126px;
     }
     #choose{
      border : 1px solid rgb(169, 169, 169);
     }
    .personAdd{
      olor : white;
    }
    .personAdd:hover{
      color : white;
    }


</style>
