<template>
  <div class="cont  ainer-fluid">
    <div class="body teacher-list">
      <ol class="breadcrumb">
        <li >系统管理</li>
        <li >角色管理</li>
        <li class="active">权限编辑</li>
      </ol>
      <div class="panel panel-default">
        <div class='search_body'>
          <button v-on:click='open2' class='addinfopeopow btn btn-success btn-sm'>提 交</button>
        </div>
        <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
          <el-table-column
            label="资源"
            prop='resourceName'
            width="220">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.resourceName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="类型"
            prop='typeName'
            width="220">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            prop='peid'
            width="">
            <template scope="scope">
              <el-checkbox-group v-model="checkList">
                <el-checkbox :label='scope.row.peid'>{{ scope.row.operationName }}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
        </el-table>
        <div class='bottomTable'>
          <button class="btn btn-primary btn-sm bottomTablebtn" v-on:click='back'><span class=' glyphicon glyphicon-backward'></span> 返 回</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        emptyText : '数据正在加载中...',
        checkList: [],
        tt : [],
        tableData: [],
        dialogFormVisible : false,
        form :{},
        formLabelWidth : '220px',
        edit_message:'我是提示信息',
        control : false,
        controlDialog : false,
        controlDialog2 : false,
        delete_aid : '',
        delete_name : '',
        search_name : '',
        rid : '',
      }
    },
    created(){
      this.rid = this.$route.params.id;
      this.user_list_get();
    },
    watch:{
      checkList (newd, p){
      }
    },
    methods: {
      back(){
         this.$router.go(-1)
      },
      //基础数据渲染
      user_list_get(){
        this.checkList = [];
        var url  = '/uums_mgr/resource/findPermission?rid=' + this.rid
        this.$http.get(url).then(res=>{
          if(res.body.length == 0){
            this.emptyText = '暂无数据'
          }else{
            this.emptyText = ''
          }
          for(var i = 0 ; i<res.body.length; i++){
            if(res.body[i].isAllow == 1){
              this.checkList.push(res.body[i].peid)
            }
          }
          this.tableData = res.body;
        },res=>{
          this.emptyText = '获取数据失败！！！'
        })
      },
      refer(){
        var url  = '/uums_mgr/resource/addPermission?rid=' + this.rid
        for(var i = 0; i< this.tableData.length; i++){
          if(this.checkList.indexOf(this.tableData[i].peid) == -1){
            this.tableData[i].isAllow = 0
          }else{
            this.tableData[i].isAllow = 1
          }
        }
        var data = JSON.stringify(this.tableData)
        console.log(this.tableData)
        this.$http.post(url,data,{emulateJSON:true}).then(res=>{
          console.log(res)
          if(res.bodyText == 'true'){
            this.$message({
              message : '提交成功',
              type : 'success'
            });
            this.user_list_get();
          }else{
            this.$message.error('提交失败')
            this.user_list_get();
          }
        },res=>{
          this.$message.error('提交失败')
          this.user_list_get();
        })
        
      },
      open2() {
        this.$confirm('操作将修改用户权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.refer();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });
          this.user_list_get();
        });
      },
    },
  }
</script>

<style>
  .tableSize{
    font-size : 12px;
  }
  .el-table{
    font-size: 12px;
  }
  .edit_message{
    color: red ;
    text-align : center;
  }
  table{
    table-layout : fixed !important;
    word-break : break-all;
  }
  select{
    width : 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .list_search{
    width : 200px;
    height : 30px;
    float :left;
    background-color : #ccc;
    border-radius : 3px;
  }
  .list_add{
    display : block;
    width : 50px;
    float : right;
  }
  .input-sm{
    border-radius : 3px;
  }
  .search_body{
    border : 0;
  }
  .input-group-btn{
    height : 30px !important;;
  }
  .btn-success{
    margin : 0 !important;;
  }
  .title_message{
    color : red;
  }
  .el-dialog--listsizePower{
    width : 58%;
    padding-right: 40px;
    height : 500px;
  }
  .listfooter{
    position: absolute;
    bottom : 20px;
    right : 20px;
  }
  .funcpow{
    margin-bottom : 20px;
    margin-top: 17px;
    height : 31px;
    position: relative;
  }
   .addinfopeopow{
    float : right;
  }
  .bottomTable{
    width : 100%;
    text-align : center;
    margin-top : 60px;
  }
   .search_body{
    border : 0;
    height: 30px;
    margin: 15px 10px;
    padding-right: 3px;
  }
</style>
