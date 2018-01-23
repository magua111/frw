<template>
  <div class="cont  ainer-fluid">
    <div class="body teacher-list">
      <ol class="breadcrumb">
        <li >HR数据同步</li>
        <li class="active" v-if='personControl'>person表</li>  
        <li class="active" v-if='organizationControl'>organization表</li>  
      </ol>
      <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo fatherbot" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" v-on:click='personclick'> 
          <router-link to='/HR/person'>person表职位</router-link>
        </el-menu-item >
        <el-menu-item index="2" v-on:click='organizationclick'>  
          <router-link to='/HR/organization'>organization表</router-link>
        </el-menu-item>
        <div class='dataTimeclass'>
          <span>手动设置上次更新时间：</span>
          <el-date-picker
            v-model="joinsysdatet"
            class='joinsysdate'
            type="datetime"
            format='yyyy-MM-dd HH:mm:ss'
            :editable='false'
            placeholder="选择日期时间">
          </el-date-picker>
          <el-button class="btn btn-success btn-sm" type='success' v-on:click='setTime'>设置时间</el-button>
        </div>
      </el-menu>
      <div class="panel panel-default">
        <router-view :dataControl='btu'>
        </router-view>
      </div>
     <div class='timeAll'>
      <div class='lastUpdateTime'>上次更新的数据的最新创建时间：<span>{{lastUpdateTime}}</span></div>
      <div class='queryTime'>上次查询时间：<span>{{queryTime}}</span></div>
     </div>
    </div>
  </div>
</template>
<script>
  let id = 1000;
  export default {
    data() {
      return {
        activeIndex : '1',
        personControl : true,
        organizationControl : false,
        num : 0,
        pagenum : 10,
        pageallnum : 0,
        currentPage1: 1,
        passI : 0,
        tablePass : [],
        tabledatafa : [],
        tableorg : [],
        lastUpdateTime : '',
        queryTime : '',
        joinsysdatet : '',
        btu : false,
      }
    },
    created(){
      this.activeIndex = this.$store.state.hrpassindex = window.localStorage.hrpassindex;
      if(this.activeIndex == '1'){
        this.personControl  = true;
        this.organizationControl = false;
        this.tabledatafa = this.tableorg
      }else{
        this.personControl  = false;
        this.organizationControl = true;
        this.tabledatafa = this.tablePass;
      }
      this.getlist();     
    },
    watch:{
      $route (a,b){
        if(a.path == "/HR/person"){
          this.activeIndex  = '1'
          this.organizationControl = false;
          this.personControl  = true;
        }else{
          this.activeIndex  = '2'
          this.personControl  = false;
          this.organizationControl = true;
        }
      }
    },

    methods: {
      //   tab栏
      handleSelect(q){
        if(q == '1'){
          this.personControl  = true;
          this.organizationControl = false;
          this.tabledatafa = this.tableorg
        }else{
          this.personControl  = false;
          this.organizationControl = true;
          this.tabledatafa = this.tablePass
        }
        this.$store.state.hrpassindex = window.localStorage.hrpassindex = q;
      },
      getlist(){
        var url = '/uums_mgr/sync/showdata'
        this.$http.get(url).then(res=>{
          this.lastUpdateTime = res.body.lastUpdateTime;
          this.queryTime = res.body.queryTime;
          this.tablePass = JSON.parse(res.body.personList);
          this.tableorg = JSON.parse(res.body.organizationList);  
        },res=>{
        })
      },
     organizationclick(){
        this.$router.push('/HR/organization')   
     },  
     personclick(){
        this.$router.push('/HR/person')
     },   

     setTime(){
        if(this.joinsysdatet == '' || this.joinsysdatet == [] || this.joinsysdatet == null){
          return false;
        }else{
          var url = '/uums_mgr/sync/customSetting'
          var data = {};
          var tt = JSON.stringify(this.joinsysdatet)
          var ss = tt.split('T')
          var hms = ss[1].split('.')[0]
          data.customSetTime =this.validate.turnDate(this.joinsysdatet) + ' ' + hms
          var newdata = JSON.stringify(data) 
          this.$http.post(url,newdata,{emulateJSON:true}).then(res=>{
            this.personControl  = true;
            this.organizationControl = false;  
            this.activeIndex = this.$store.state.hrpassindex = window.localStorage.hrpassindex = '1'
            this.$message({
              message : '设置成功',
              type : 'success'
            });
            this.$router.replace('/empty')  
            this.getlist();
          },res=>{
            this.getlist();
          })
        }   
     }, 
      
    }
  }
</script>
<style>
  .fatherbot .el-date-editor.el-input{
    width : 46%;
  }
  .el-input__inner{
    height : 30px;
  }
  .dataTimeclass{
    float: right;
    width: 450px;
    height: 30px;
    line-height: 30px;
    margin-top: 14px;
    color: #fff;
    font-size: 14px;
    font-family: sans-serif;
  }
  .queryTime{
    float : right ;
  }
  .lastUpdateTime{
    float : left;
  }
  .fatherbot{
    margin-bottom : 10px;
  }
 .dafinFooter{
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  .definCodeadd{
    height: 30px;
    line-height:30px;
    font-size: 12px;
    color: red;
    text-align: left;
  }
  .timeAll{
    width : 100%;
    height : 30px;
    line-height : 30px;
    padding: 0 20px;
  }
</style>
