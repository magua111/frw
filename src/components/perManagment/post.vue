<template>
  <div>
    <div class="panel panel-default">
      <div class="search_body1">
        <button class="btn btn-success btn-sm list_add" v-on:click='addEdit()'>添 加</button>
      </div>
      <!--表格-->
      <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
        <el-table-column
            label="职务编号"
            prop='poCode'
            width="">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.poCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="职务名称"
            prop='poName'
            width="">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.poName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <button size="large" type="text" @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true" class='btn btn-success btn-xs'>
              编辑
            </button>
            <button type='text' @click='deleteRow(scope.$index,scope.row)' class="btn btn-warning btn-xs">
              删除
            </button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑模态框 -->
      <el-dialog title="人员信息" :visible.sync="dialogFormVisible" :show-close='false' :visible="controlDialog" size='postModel'>
        <el-form :model="form">
          <el-form-item label="职务编号" :label-width="formLabelWidth"  class='postName'>
            <el-input v-model="form.poCode" auto-complete="off"  class='postInput' v-on:blur='postPocodeedit'></el-input>
            <span class='star'>*</span> 
            <div class='postCodeadd'>
              <div  v-if='postCoderdit'><span class='glyphicon glyphicon-remove'>请输入数字</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="职务名称" :label-width="formLabelWidth"  class='postName'>
            <el-input v-model="form.poName" auto-complete="off"  class='postInput'></el-input>
            <span class='star'>*</span> 
          </el-form-item>
          <div v-if='control' class='Posttsxt_info'>
            <span class='info_massage'>{{message}}</span> 
          </div>
        </el-form>
        <div slot="footer" class="post-footer">
          <el-button @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false ; editor()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加模态框 -->
      <el-dialog title="人员信息" :visible.sync="dialogFormVisible1" :show-close='false' :visible="controlDialog1" size='postModel'>
        <el-form :model="list">
          <el-form-item label="职务编号" :label-width="formLabelWidth" class='postName'>
            <el-input v-model="list.poCode" auto-complete="off" class='postInput' v-on:blur='postPocode'></el-input>
            <span class='star'>*</span> 
            <div class='postCodeadd'><div  v-if='postCodeadd'><span class='glyphicon glyphicon-remove'>请输入数字</span></div></div>
          </el-form-item>
          <el-form-item label="职务名称" :label-width="formLabelWidth" class='postName'>
            <el-input v-model="list.poName" auto-complete="off" class='postInput'></el-input>  
            <span class='star'>*</span> 
          </el-form-item>
          <div v-if='control' class='Posttsxt_info'>
            <span class='info_massage'>{{message}}</span>
          </div>
        </el-form>
        <div slot="footer" class="post_fotter">
          <el-button @click="dialogFormVisible = false" v-on:click='cancle2'>取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false ; editor2()">确 定</el-button>
        </div>
      </el-dialog>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagenum"
          :page-count='pageallnum'
          layout="total, sizes, prev, pager, next, jumper"
          :total="num">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        addControl : true,
        emptyText : '数据正在加载中...',
        search_name : '',
        tableData: [],
        form : '',
        poid : '',
        controlDialog : false ,
        postCodeadd : false ,
        control : false,
        message :'',
        dialogFormVisible : false,
        dialogFormVisible1 : false,
        controlDialog1 : false ,
        postCoderdit : false ,
        num : 0,
        pagenum : 10,
        pageallnum : 0,
        currentPage1: 1,
        formLabelWidth : '220px',
        list : {
          name : '',
          code : '',
        },
      }
    },
    created(){
      this.getlist();
    },
    methods:{
      postPocode(){
        if(this.list.poCode == '' || this.list.poCode == null){
          return false
        }else{
          this.postCodeadd = this.validate.deptOrder(this.postCodeadd,this.list.poCode)
        }
      },
      postPocodeedit(){
        if(this.form.poCode == '' || this.form.poCode == null){
          return false
        }else{
          this.postCoderdit = this.validate.deptOrder(this.postCoderdit,this.form.poCode)
        }
      },

      handleSizeChange(val) {
        this.pagenum = val
        this.getlist()
      },
      handleCurrentChange(val) {
        this.currentPage1 = val;
        this.getlist()
      },
      searchByname(){
      },

//      刚进页面渲染
      getlist(){
        var url = '/uums_mgr/position/pagePositions?&pageSize=' + this.pagenum + '&pageNumber=' + this.currentPage1;
        this.$http.get(url).then(res=>{
          if(res.body.content.length == 0){
            this.emptyText = '暂无数据'
          }else{
            this.emptyText = ''
          }
          this.tableData = res.body.content;
          this.num = res.body.totalElements
        },res=>{
          this.emptyText = '获取数据失败！！！'
        })
      },

//      打开编辑
      handleEdit(index,row){
        this.controlDialog = true
        this.form = row;
        this.message = '';
        this.control = false;   
        this.postCoderdit = false;
      },
//      打开删除
      deleteRow(index,row){
        this.open2();
        this.poid = row.poid
      },

      open2() {
        this.$confirm('此操作将永久删除该职位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delete();
        }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消删除'
        });
       });
      },
//      删除函数
      delete(){
        var url = '/uums_mgr/position/delete?poid=' + this.poid;
        this.$http.get(url).then(res=>{
          if(res.bodyText == 'success'){
            this.$message({
              message : '删除成功',
              type : 'success'
            });
          }else{
            this.$message.error('删除失败')
          }
          this.getlist()
        },res=>{
          this.$message.error('删除失败')
        })
      },

      //      编辑取消
      cancle(){
        this.controlDialog = false;
        this.getlist();
      },
//      编辑确定
      editor(){
        var edDataa = this.form;
        if( edDataa.poCode == null){
          edDataa.poCode = ''
        }
        if( edDataa.poName == null){
          edDataa.poName = ''
        }
        var aa = edDataa.poCode.toString()
        var bb = edDataa.poName.toString()
        if( aa.trim() == '' ||  edDataa.poCode == null){
          this.control = true
          this.message = '职务编号不能为空'
        }
        else if( this.postCoderdit == true ){
           this.control = true
           this.message = '请注意输入格式'
        }
        else if( bb.trim() == '' ||  edDataa.poName == null){
          this.control = true
          this.message = '职务名称不能为空'
        }else{
          var edData = JSON.stringify(edDataa)
          var url  = '/uums_mgr/position/update';
          this.$http.post(url,edData,{emulateJSON:true}).then(res=>{
            if(res.bodyText = 'success'){
              this.$message({
                message : '编辑成功',
                type : 'success'
              });
            }else{
              this.$message.error('编辑失败')
            }
            this.controlDialog = false;
            this.control = false
            this.message = ''
            this.getlist();
          },res=>{
            this.$message.error('编辑失败')
          })
        }
      },

      cancle2(){
        this.controlDialog1 = false
        this.getlist();
      },

      addEdit(){
        this.message = '';
        this.postCodeadd = false;
        this.control = false;
        this.list.poCode = '';
        this.list.poName = '';
        this.controlDialog1 = true
      },

      editor2(){
        if(this.addControl == true){
          this.addControl = false
          var edDataa = this.list;
          if( edDataa.poCode == null){
              edDataa.poCode = ''
          }
          if( edDataa.poName == null){
            edDataa.poName = ''
          }
          if( edDataa.poCode.split('').length== 0 ||  edDataa.poCode == null){
            this.control = true
            this.message = '职务编号不能为空'
            this.addControl = true
          }
          else if( this.postCodeadd == true ){
            this.control = true
            this.message = '请注意输入格式'
            this.addControl = true
          }
          else if( edDataa.poName.trim() == '' ||  edDataa.poName == null){
            this.control = true
            this.message = '职务名称不能为空'
            this.addControl = true
          }
          else{
            var edData = JSON.stringify(edDataa)
            var url  = '/uums_mgr/position/add';
            this.$http.post(url,edData,{emulateJSON:true}).then(res=>{
              if(res.bodyText == 'success'){
                this.$message({
                  message : '添加成功',
                  type : 'success'
                });
                this.addControl = true
              }else{
                this.$message.error('添加失败')
                this.addControl = true
              }
              this.controlDialog1 = false;
              this.list = {}
              this.getlist();
              this.control = false
              this.message = ''
            },res=>{
              this.$message.error('添加失败')
              this.addControl = true
            })
          }
        }else{
          return false
        }
      }
    }
  }

</script>


<style>
  .el-input__inner{
    height : 30px;
  }
  .Posttsxt_info{
    position : absolute ;
    bottom : 50px;
    height : 30px;
    line-height : 30px;
    color : red;
  }

  .postCodeadd{
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: red;
    position: absolute;
    top: 36px;
  }

  .postName .el-form-item__label {
    width: 212px!important;
  }
  .postName .postInput{
    width: 95%;
    float: left;
    display: inline-block;
  }
  .el-dialog--postModel{
    font-family : inherit;
    color : inherit;
    border-radius: 8px;
    background-color: rgb(255,255,255);
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    padding-right : 50px;
    width:50%;
    height: 300px;
  }
  .el-dialog--postModel .el-dialog__body {
    padding: 30px 20px;
    color: #48576a;
    font-size: 14px;
    margin-top: 10px;
    margin-right: 50px;
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
  .search_body1{
    margin-bottom: 20px;
    margin-top: 17px;
    height: 31px;
    position: relative;
    padding-right : 15px;
  }
  .post_fotter{
    position: absolute;
    bottom: 20px;
    right:20px;
  }
  .el-table td, .el-table th {
    height: 40px!important;
    min-width: 0;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  .post-footer{
    position : absolute;
    right : 20px;
    bottom : 20px;
  }
</style>