<template>  
  <div class='personAllList'>
   <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
    <el-table-column
      label="fullName"
      prop='fullName'
      fixed
      width="150px">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.fullName }}</span>
      </template>
    </el-table-column> 

    <el-table-column
      prop='personId'
      label="personId"
      width="100">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.personId}}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="polity"
      prop='polity'
      width="120">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.polity }}</span>
      </template>
    </el-table-column>    

    <el-table-column
      label="cdma"
      prop='cdma'
      width="160">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.cdma }}</span>
      </template>
    </el-table-column>  

    <el-table-column
      label="mobile"
      prop='mobile'
      width="160">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.mobile }}</span>
      </template>
    </el-table-column>  

    <el-table-column
      label="brithDate"
      prop='brithDate'
      width="120">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.brithDate }}</span>
      </template>
    </el-table-column>  
    
    <el-table-column
      label="address"
      prop='address'
      width="220">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.address }}</span>
      </template>
    </el-table-column>  

    <el-table-column
      label="postalCode"
      prop='postalCode'
      width="120">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.postalCode }}</span>
      </template>
    </el-table-column>  

    <el-table-column
      label="permanreSide"
      prop='permanreSide'
      width="120">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.permanreSide }}</span>
      </template>
    </el-table-column>  

    <el-table-column
      label="joinsysDate"
      prop='joinsysDate'
      width="120">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.joinsysDate }}</span>
      </template>
    </el-table-column> 

    <el-table-column
      label="joinworkDate"
      prop='joinworkDate'
      width="120">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.joinworkDate }}</span>
      </template>
    </el-table-column> 

    <el-table-column
      label="act"
      prop='act'
      width="120">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.act }}</span>
      </template>
    </el-table-column> 
   </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        emptyText : '数据正在加载中...',
        activeIndex : '1',
        tableData : [],
        personControl : true,
        organizationControl : false,
        num : 0,
        pagenum : 10,
        pageallnum : 0,
        currentPage1: 1,
        passI : 0,
        tablePass : [],
        lastUpdateTime : '',
        queryTime : '',
        joinsysdatet : '',
      }
    },
    created(){  
      this.getlist()
    },
    props:['dataControl'],
    methods: {
      getlist(){
        var url = '/uums_mgr/sync/showdata'
        this.$http.get(url).then(res=>{    
          this.lastUpdateTime = res.body.lastUpdateTime;
          this.queryTime = res.body.queryTime;
          this.tablePass = JSON.parse(res.body.personList);
          this.tableorg = JSON.parse(res.body.organizationList);
          if(this.dataControl == true){
              this.tableData = [];
              this.emptyText = '暂无数据'
          }else{
              this.tableData = this.tablePass
              this.emptyText = ''
          }
        },res=>{
          this.emptyText = '数据获取失败!!!'
        })
      },
    }
  }
</script>
<style>
  .personAllList .el-table__empty-text{
    left: 33%;
  }

</style>