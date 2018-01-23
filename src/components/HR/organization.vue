<template>
  <div>
    <el-table :data="tablePassorganizationList" border style="width: 100%"  :empty-text='emptyText'>
      <el-table-column
        label="deptId"
        prop='deptId'
        fixed
        width="150px">
        <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.deptId }}</span>
        </template>
      </el-table-column> 

      <el-table-column
        prop='parentid'
        label="parentid"
        width="100">
        <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.parentid}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="corpName"
        prop='corpName'
        width="150">
        <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.corpName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="deptCode"
        prop='deptCode'
        width="120">
        <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.deptCode }}</span>
        </template>
      </el-table-column>    

      <el-table-column
        label="deptName"
        prop='deptName'
        width="160">
        <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.deptName }}</span>
        </template>
      </el-table-column>  

      <el-table-column
        label="deptAbbr"
        prop='deptAbbr'
        width="160">
        <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.deptAbbr }}</span>
        </template>
      </el-table-column>  

      <el-table-column
        label="createDate"
        prop='createDate'
        width="120">
        <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>  

      <el-table-column
        label="act"
        prop='act'
        width="220">
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
      tablePassorganizationList : [],
      aa : [],
      lastUpdateTime : '',
      queryTime : '',
      joinsysdatet : '',
    }
  },
  props:['dataControl'],
  created(){
    this.getlist();
  },
  methods: {
    getlist(){
      var url = '/uums_mgr/sync/showdata'
      this.$http.get(url).then(res=>{
        this.lastUpdateTime = res.body.lastUpdateTime;
        this.queryTime = res.body.queryTime;
        this.tablePass = JSON.parse(res.body.personList);
        this.tableorg = JSON.parse(res.body.organizationList);
        if(this.dataControl == true){
             this.tablePassorganizationList = []
             this.emptyText = '暂无数据'
        }else{
             this.tablePassorganizationList = this.tableorg  
             this.emptyText = ''   
        }
      },res=>{
        this.emptyText = '数据获取失败！！！'
      })
    },
  }
}
</script>
<style>
</style>