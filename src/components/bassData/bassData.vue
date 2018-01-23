<template>
  <div class="cont  ainer-fluid">
    <div class="body teacher-list">
      <ol class="breadcrumb">
        <li >系统管理</li>
        <li class="active">基础数据管理</li>
      </ol>
      <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo fatherbot" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" v-on:click='definition'>
          <router-link to='/bassData/dvdRip'>资源类型定义</router-link>
        </el-menu-item >
        <el-menu-item index="2" v-on:click='operate'>
          <router-link to='/bassData/operate'>操作定义</router-link>
        </el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  let id = 1000;
  export default {
    data() {
      return {
        activeIndex : '1',
        full_name : '',
        name : '',
        info : '',
        options4: [],
        deptType : '0',
        message : {},
        value9: [],
        list: [],
        loading: false,
        states: [],
      }
    },
     watch:{
      $route (a,b){
        if(a.path == "/bassData/dvdRip"){
          this.activeIndex  = '1'
        }else{
          this.activeIndex  = '2'
        }
      }
    },
    created(){
      this.activeIndex = this.$store.state.bassDataIndex  = window.localStorage.bassDataIndex 
    },
    methods: {
      definition(){
        this.$router.push('/bassData/dvdRip')
      },
      operate(){
        this.$router.push('/bassData/operate')
      },
      choose(query){
        var url = '/uums_mgr/org/findOrgsByDeptName?deptName='+ query
        this.$http.get(url).then(res=>{
        this.options4 = res.body;
        },res=>{
        })
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          this.choose(query);
          this.deptName = this.value9
          this.options4 = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.choose(query)
          this.options4 = [];
        }
      },
      search(){
        this.message.deptName = this.deptName;
        this.message.deptType = this.deptType;
        this.message.name = this.name;
        this.$router.push('/centeryData/searchOurfit')
      },
      handleSelect(a){
        this.$store.state.bassDataIndex  = window.localStorage.bassDataIndex =  this.activeIndex = a 
      },

    }
  }
</script>



<style>
  .fatherbot{
    margin-bottom : 10px;
  }
</style>
