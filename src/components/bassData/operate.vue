<template>
  <div class='panel panel-default operAll'>
    <div class="search_body">
      <div v-on:click='add' class="btn btn-success btn-sm adddefinition" >添加</div>
    </div>
    <!--表格-->
    <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
      <el-table-column
        prop='name'
        label="操作名称"
        width="">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作代码"
        prop='code'
        width="">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <button size="large" type="text" @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true" class='btn btn-success btn-xs'>编辑</button>
          <button type='text' @click='deleteRow(scope.$index,scope.row)' class="btn btn-warning btn-xs">
            删除
          </button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑模态框 -->
    <el-dialog title="操作类型编辑" :visible.sync="dialogFormVisible" :show-close='false' :visible="controlDialog" size='messageModel1' >
      <el-form :model="form">
        <el-form-item label="操作名称" :label-width="formLabelWidth" class='definName'>
          <el-input v-model="form.name" auto-complete="off" class='definInput'></el-input>
          <span class='star'>*</span>
        </el-form-item>
        <el-form-item label="操作代码" :label-width="formLabelWidth" class='definName'>
          <el-input v-model="code" auto-complete="off" class='definInput' v-on:blur='opercodeedit'></el-input>
          <span class='star'>*</span>
          <div class='definCodeadd'><div  v-if='operateCodeEdit'><span class='glyphicon glyphicon-remove'>{{edMes}}</span></div></div>
        </el-form-item>
        <div v-if='controlAdd' class='tsxt_info'>
          <span>{{messageAdd}}</span>
        </div>
      </el-form>
      <div slot="footer" class="messageModel1Foot">
        <el-button @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false ; editor()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加模态框 -->
    <el-dialog title="操作类型添加" :visible.sync="dialogFormVisible2" :show-close='false' :visible="controlDialog2" size='messageModel1'>
      <el-form :model="list">
        <el-form-item label="操作名称" :label-width="formLabelWidth" class='definName'>
          <el-input v-model="list.name" auto-complete="off" class='definInput'></el-input>
          <span class='star'>*</span>
        </el-form-item>
        <el-form-item label="操作代码" :label-width="formLabelWidth" class='definName'>
          <el-input v-model="code" auto-complete="off" class='definInput' v-on:blur='operatecodeAdd'></el-input>
          <span class='star'>*</span>
          <div class='definCodeadd'><div  v-if='operateCodeadd'><span class='glyphicon glyphicon-remove'>{{addMes}}</span></div></div>
        </el-form-item>
        <div v-if='controlAdd' class='tsxt_info'>
          <span>{{messageAdd}}</span>
        </div>
      </el-form>
      <div slot="footer" class="messageModel1Foot">
        <el-button @click="dialogFormVisible = false" v-on:click='cancle2'>取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false ; addControl && refer()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        addControl : true,
        emptyText : '数据正在加载中...',
        addMes : '',
        edMes : '',
        controlAdd : false,
        operateCodeadd : false,
        operateCodeEdit : false,
        messageAdd : '',
        dialogFormVisible2 : false,
        controlDialog2 : false,
        data1 : [],
        code : '',
        tableData: [],
        dataPass: [],
        form : {},
        list : {
          name : '',
          code : '',
        },
        tid : '',
        controlDialog : false ,
        control : false,
        message :'',
        dialogFormVisible : false,
        formLabelWidth : '220px',
      }
    },
    created(){
      this.getlist();
    },
    watch:{
      code(newCode , oldCode){
        if( this.data1.indexOf(newCode) !== -1 ){
          this.operateCodeadd = true
          this.addMes = '操作代码已被注册'
          this.operateCodeEdit = true
          this.edMes = '操作代码已被注册'
        }else{
          this.operateCodeadd = false
          this.addMes = ''
          this.operateCodeEdit = false
          this.edMes = ''
        }
      }
    },
    methods:{
      operatecodeAdd(){
        if(this.operateCodeadd == true){
          return false;
        }else{
          if(this.code == '' || this.code == null){
            return false
          }else{
            var s = /^[A-Za-z0-9_-]*$/g;
            if(s.test(this.code)){
              this.operateCodeadd = false
              this.addMes = ''
            }else{
              this.operateCodeadd = true
              this.addMes = '字母下划线连接符组成'
            }
          }
        }
      },
      opercodeedit(){
        if( this.operateCodeEdit == true){
          return false
        }else{
          if(this.code == '' || this.code == null){
            return false
          }else{
            var s = /^[A-Za-z0-9_-]*$/g;
            if(s.test(this.code)){
              this.operateCodeEdit = false
              this.edMes = ''
            }else{
              this.operateCodeEdit = true
              this.edMes = '字母下划线连接符组成'
            }
          }
        }
      },
//    刚进页面渲染
      getlist(){
        this.dataPass = []  
        this.data1 = []
        var url = '/uums_mgr/operation/findAll'
        this.$http.get(url).then(res=>{
          if(res.body.length == 0){
            this.emptyText = '暂无数据'
          }else{
            this.emptyText = ''
          }
          this.tableData = res.body;
          for(var i = 0 ;i<res.body.length;i++){  
            this.data1.push(res.body[i].code)
            this.dataPass.push(res.body[i].code)  
          }
          this.addControl = true;
        },res=>{
          this.emptyText = '数据获取失败！！！'
          this.addControl = true;
        })
      },

  //      打开编辑
      handleEdit(index,row){
        for(var i= 0 ; i<this.data1.length;i++){
          if(this.data1[i] == row.code){
            this.data1.splice(i,1)
          }
        }
        this.controlDialog = true
        this.form = row
        this.code = row.code
        this.controlAdd = false;
        this.operateCodeEdit = false;
      },

      add(index,row){
        this.list.name = '';
        this.code = '';
        this.controlDialog2 = true
        this.operateCodeadd = false;
        this.controlAdd = false
      },

      refer(){
        this.addControl = false;
        if(this.list.name == null){
         this.list.name = ''
        }
        if(this.code == null){
           this.code = ''
        }
        
        if(this.list.name.trim() == ''){
          this.controlAdd = true
          this.messageAdd = '操作名称不能为空'
          this.addControl = true;
        }
        else if(this.code.trim() == ''){
          this.controlAdd = true
          this.messageAdd = '操作代码不能为空'
          this.addControl = true;
        }
        else if(this.operateCodeadd == true){
          this.controlAdd = true
          this.messageAdd = '请注意输入代码的格式'
          this.addControl = true;
        }
        else{
          var data = this.list;
          data.code = this.code.trim();
          data.name = data.name.trim();
          var edData = JSON.stringify(data)
          var url  = '/uums_mgr/operation/add';
          this.$http.post(url,edData,{emulateJSON:true}).then(res=>{
            var passData = JSON.parse(res.bodyText)
            if(passData.result == 'success'){
              this.$message({
                message : '添加成功',
                type : 'success'
              });
            }else{
              this.$message.error('添加失败')
            }
            this.controlAdd = false
            this.messageAdd = ''
            this.controlDialog2 = false
            this.getlist()
          },res=>{
            this.$message.error('添加失败')
            this.getlist()
          })
        }
      },

//      打开删除
      deleteRow(index,row){
        this.open2()
        this.tid = row.opid
      },
      open2() {
        this.$confirm('此操作将永久删除该操作类型, 是否继续?', '提示', {
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
        var url = '/uums_mgr/operation/delete?opid=' + this.tid;
        this.$http.get(url).then(res=>{
          var passData = JSON.parse(res.bodyText)
          if(passData.result == 'success'){
            this.$message({
              message : '删除成功',
              type : 'success'
            });
          }else{
            this.$message.error('删除失败')
          }
          this.getlist();
        },res=>{
          this.$message.error('删除失败')
        })
      },
//      编辑取消
      cancle(){
        this.controlDialog = false
        this.getlist()
      },
//      编辑确定
      editor(){
        if(this.form.name == null){
          this.list.name = ''
        }
        if(this.code == null){
          this.code = ''
        }
        if(this.form.name.trim() == ''){
          this.controlAdd = true
          this.messageAdd = '操作名称不能为空'
        }
        else if(this.code.trim() == ''){
          this.controlAdd = true
          this.messageAdd = '操作代码不能为空'
        }
        else if(this.operateCodeEdit == true){
          this.controlAdd = true
          this.messageAdd = '请注意输入代码的格式'
        }
        else{
          var edDataa = this.form;
          edDataa.code = this.code.trim();
          edDataa.name = edDataa.name.trim();
          var edData = JSON.stringify(edDataa)
          var url  = '/uums_mgr/operation/update';
          this.$http.post(url,edData,{emulateJSON:true}).then(res=>{
            var passData = JSON.parse(res.bodyText)
            if(passData.result == 'success'){
              this.$message({
                message : '编辑成功',
                type : 'success'
              });
            }else{
              this.$message.error('编辑失败')
            }
            this.controlDialog = false;
            this.data1 = [];
            this.dataPass = [];
            this.getlist();
            this.controlAdd = false
            this.messageAdd = ''
          },res=>{
            this.$message.error('编辑失败')
          })
        }
      },
      cancle2(){
        this.controlDialog2 = false
        this.getlist()
      },
    }
  }

</script>
<style>
  .el-input__inner{
    height : 30px;
  }
  .definCodeadd{
    height: 30px;
    line-height:30px;
    font-size: 12px;
    color: red;
    text-align: left;
  }
  .definName .el-form-item__label {
    width: 212px!important;
  }
  .definName .definInput{
    width: 88%;
    float: left;
  }
  .el-dialog--messageModel1{
    font-family : inherit;
    color : inherit;
    border-radius: 8px;
    background-color: rgb(255,255,255);
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    width:50%;
  }
  .el-dialog--messageModel1 .el-dialog__body{
    padding: 48px 32px;
    padding-right: 106px;
    color: #48576a;
    font-size: 14px;
  }
  .el-dialog--messageModel1 .el-form-item__content{
    margin-left: 200px;
  }
  .messageModel1Foot{
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
 .search_body{
    border : 0;
    height: 30px;
    margin: 15px 10px;
    padding-right: 3px;
  }
  .adddefinition{
    float: right;
  }
  .operAll .tsxt_info{
    color : red;
    padding-left: 70px;
  }
  .el-table td, .el-table th {
    height: 40px!important;
    min-width: 0;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
</style>