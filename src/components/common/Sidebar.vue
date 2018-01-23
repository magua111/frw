<template>
  <div class="aside">
    <div class="navs">
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select='handleSelect' :router='true'>
        <el-menu-item index="/uums_mgr">
           <i class="glyphicon glyphicon-user"></i>首页
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title"><i class="glyphicon glyphicon-th-large"></i>系统管理</template>
          <el-menu-item-group>
            <el-menu-item index="/institution/tree">机构管理</el-menu-item>
            <el-menu-item index="/centeryData/personlist" v-on:click='controlIndex'>人员管理</el-menu-item>
            <el-menu-item index="/appManagement">应用系统</el-menu-item>
            <el-menu-item index="/bassData/dvdRip" v-on:click='bassData'>基础数据管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="glyphicon glyphicon-th"></i>数据管理</template>
          <el-menu-item-group>
            <el-menu-item  index="/userControl/-1" >
                用户管理
            </el-menu-item>
            <el-menu-item  index="/userGroupside">
                用户组管理
            </el-menu-item>
            <el-menu-item  index="/role">
                角色管理
            </el-menu-item>
            <el-menu-item  index="/resControl">
                资源管理
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="glyphicon glyphicon-list"></i>HR数据同步</template>
          <el-menu-item-group>
            <el-menu-item index="/HR/person" v-on:click='datashow'>同步数据显示</el-menu-item>
            <el-menu-item index="/getdata">手动触发同步</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
       activeIndex : 'userControl/-1',
      }
    },
    created(){
      this.activeIndex = this.$store.state.asiderNum = window.localStorage.asiderNum
    },
    methods: {
      bassData(){
        this.$store.state.bassDataIndex  = window.localStorage.bassDataIndex  = '1' 
      },
      controlIndex(){
        this.$store.state.index = window.localStorage.index = '1';
      },
      datashow(){
        this.$store.state.hrpassindex = window.localStorage.hrpassindex = '1'
        this.$router.push('/HR/person')
      },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      handleSelect(vlue){
       this.$store.state.asiderNum = window.localStorage.asiderNum = vlue
      },
    },
  }
</script>
<style>
  .el-menu el-menu-vertical-demo ul li{
    width: 100%;
  }
  .el-menu-item-group__title{
    padding:0;
  }
  .el-menu{
    background-color: #2f4050;
  }
  .el-menu li{
    background-color: #2f4050;
  }
  .el-submenu .el-menu-item{
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    min-width:0;
  }
  .el-menu-item, .el-submenu__title{
    color : white;
  }
  .aside .navs .active{
    background-color: #2f4050;
  }
  .btn-sm, .btn-group-sm > .btn {
    padding: 0 10px;
    font-size: 12px;
    line-height: 30px;
    height : 30px;
    border-radius: 3px;
    margin-top: 0;
  }
</style>
