<template>
  <div class="cont  ainer-fluid">
    <div class="body teacher-list">
      <ol class="breadcrumb">
        <li >系统管理</li>
        <li >机构管理</li>
        <li >直属人员</li>
        <li class="active">人员职务</li>
      </ol>
      <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
            <router-link to='/person/fondbyPerson'>按人员查询</router-link>
        </el-menu-item>
        <el-menu-item index="2">
           <router-link to='/person/fondbyinstitution'>按机构查询</router-link>
        </el-menu-item >
      </el-menu>
     <router-view :id ='oidNum'></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tt : [],
        tableData: [],
        dialogFormVisible : false,
        form :{},
        formLabelWidth : '220px',
        controlDialog : false,
        delete_aid : '',
        delete_name : '',
        num : 0,
        full_name : '姓名',
        pagenum : 10,
        pageallnum : 0,
        currentPage1: 1,
        search_name : '',
        controlDialog1 : false,
        dialogFormVisible1 : false,
        oid : '',
        activeIndex : '1',
      }
    },
    created(){
      this.activeIndex = this.$store.state.joblistIndex =  window.localStorage.joblistIndex
      this.oidNum = this.$store.state.oid = window.localStorage.oid ;
    },
    methods: {
      handleSelect(key,keyPath){
        this.$store.state.joblistIndex =  window.localStorage.joblistIndex = key
        this.$router.push(keyPath)
      },
    }
  }
</script>
<style scoped>
  .bassMessage{
    width : 45%;
    height : 200px;
    position: absolute;
    left : 10px;
    top : 70px;
    color : black;
  }
  .nonnectWith{
    width : 50%;
    height : 200px;
    position: absolute;
    right : 10px;
    top : 70px;
    color : black;
  }
  .person_title {
    position: absolute;
    left: 20px;
    top: 10px;
    font-size: 16px;
    font-weight: 700;
  }
  .bessClass{
    width: 35%;
    height : 45px;
    line-height : 45px;
    text-align : right;
  }
  .bassMessage_info{
    text-align : left;
    height : 45px;
    line-height : 45px;
    width : 65%;
    float: right;
  }
  .bassMessage_info2{
    text-align : left;
    height : 45px;
    line-height : 45px;
    width : 65%;
    float: right;
  }
</style>
