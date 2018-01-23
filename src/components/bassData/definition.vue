<template>
  <div class='definAll'>
   <div class="panel panel-default">
    <div class="search_body">
      <div v-on:click='add' class="btn btn-success btn-sm adddefinition" >添加</div>
    </div>
    <!--表格-->
    <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
      <el-table-column
        prop='name'
        label="名称"
        width="">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="代码"
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
    <el-dialog title="资源类型信息编辑" :visible.sync="dialogFormVisible" :show-close='false' :visible="controlDialog" size='messageModel1'>
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth"  class='definName'>
          <el-input v-model="form.name" auto-complete="off" class='definInput'></el-input>
          <span class='star'>*</span>
        </el-form-item>
        <el-form-item label="代码" :label-width="formLabelWidth"  class='definName'>
          <el-input v-model="code" auto-complete="off" class='definInput' v-on:blur='definCodeditt'></el-input>
          <span class='star'>*</span>
          <div class='definCodeadd'><div  v-if='definCodeditControl'><span class='glyphicon glyphicon-remove'>{{edMes}}</span></div></div>
        </el-form-item>
        <div v-if='controlAdd' class='tsxt_info'>
          <span>{{messageAdd}}</span>
        </div>
      </el-form>
      <div slot="footer" class="dafinFooter">
        <el-button @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false ; editor()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加模态框 -->
    <el-dialog title="资源类型信息添加" :visible.sync="dialogFormVisible1" :show-close='false' :visible="controlDialog1" size='messageModel1'>
      <el-form :model="list">
        <el-form-item label="名称" :label-width="formLabelWidth" class='definName'>
          <el-input v-model="list.name" auto-complete="off" class='definInput'></el-input>
          <span class='star'>*</span>
        </el-form-item>
        <el-form-item label="代码" :label-width="formLabelWidth" class='definName'>
          <el-input v-model="code" auto-complete="off" class='definInput' v-on:blur='definCode'></el-input>
          <span class='star'>*</span>
          <div class='definCodeadd'><div  v-if='definCodeadd'><span class='glyphicon glyphicon-remove'>{{addMes}}</span></div></div>
        </el-form-item>
        <div v-if='controlAdd' class='tsxt_info'>
          <span>{{messageAdd}}</span>
        </div>
      </el-form>
      <div slot="footer" class="dafinFooter">
        <el-button @click="dialogFormVisible = false" v-on:click='cancle2'>取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false ; addControl && refer()">确 定</el-button>
      </div>
    </el-dialog>
   </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        addControl : true,
        emptyText : '数据正在加载中...',
        definCodeadd : false,
        definCodedit : false,
        addMes : '',
        edMes : '',
        definCodeditControl : false,
        controlAdd : false,
        messageAdd : '',
        tableData: [],
        form : '',
        tid : '',
        data : [],
        dataPass : [],
        code : '',
        controlDialog : false ,
        control : false,
        message :'',
        dialogFormVisible : false,
        dialogFormVisible1 : false,
        controlDialog1 : false ,
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
    watch:{
      code(newCode , oldCode){
        if( this.data.indexOf(newCode) !== -1 ){
          this.definCodeadd = true
          this.addMes = '操作代码已被注册';
          this.definCodeditControl = true
          this.edMes = '操作代码已被注册'
        }else{
          this.definCodeadd = false
          this.addMes = '';
          this.definCodeditControl = false
          this.edMes = ''
        }
      }
    },

    methods:{
      definCode(){
        if(this.definCodeadd == true){
          return false;
        }else{
          if(this.code == '' || this.code == null){
            return false
          }else{
            var s = /^[A-Za-z0-9_-]*$/g;
            if(s.test(this.code)){
              this.definCodeadd = false
              this.addMes = '';
            }else{
             
              this.definCodeadd = true
              this.addMes = '字母下划线连接符组成';
            }
          }
        }
      },

      definCodeditt(){
        if(this.definCodeditControl == true){
          return false;
        }else{
          if(this.code == '' || this.code == null){
            return false
            
          }else{
            var s = /^[A-Za-z0-9_-]*$/g;
            if(s.test(this.code)){
              this.definCodeditControl = false
              this.edMes = ''
            }else{
              this.definCodeditControl = true
              this.edMes = '字母下划线连接符组成';
            }
          }
        }
      },
      add(){
        this.controlDialog1 = true;
        this.code = ''
        this.list.name = ''
        this.controlAdd = false;
        this.definCodeadd = false;
      },

      refer(){
        this.addControl = false;
        if( this.list.name == null){
          this.list.name = ''
        }
        if(this.code == null ){
          this.code = ''
        }
        if( this.list.name.trim() == ''){  
          this.controlAdd = true
          this.messageAdd = '名称不能为空'
          this.addControl = true
        }
        else if( this.code.trim() == '' ){
          this.controlAdd = true
          this.messageAdd = '代码不能为空'
          this.addControl = true
        }
        else if( this.definCodeadd == true){
          this.controlAdd = true
          this.messageAdd = '请注意输入代码的格式'
          this.addControl = true
        }
        else{
          var data = this.list;
          data.code = this.code.trim();
          data.name = data.name.trim();
          var edData = JSON.stringify(data)
          var url  = '/uums_mgr/type/add';
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
            this.getlist()
            this.controlDialog1 = false
          },res=>{  
            this.$message.error('添加失败')
            this.getlist()
          })
        }
      },

//      刚进页面渲染
      getlist(){
        this.data = [];
        this.dataPass = [];
        var url = '/uums_mgr/type/findAll'
        this.$http.get(url).then(res=>{
          if(res.body.length == 0){
            this.emptyText = '暂无数据'
          }else{
            this.emptyText = ''
          }
          this.tableData = res.body;
          for(var i = 0 ;i<res.body.length;i++){
            this.data.push(res.body[i].code)
            this.dataPass.push(res.body[i].code)   
          }
          this.addControl = true
        },res=>{
          this.emptyText = '数据获取失败！！！'
          this.addControl = true
        })
      },

//      打开编辑
      handleEdit(index,row){
        for(var i= 0 ; i<this.data.length;i++){
          if(this.data[i] == row.code){
            this.data.splice(i,1)
          }
        }
        this.controlDialog = true
        this.form = row;
        this.code = row.code;
        this.definCodeditControl = false;
        this.controlAdd = false;
      },
//      打开删除
      deleteRow(index,row){
        this.open2();
        this.tid = row.tid
      },
      open2() {
        this.$confirm('此操作将永久删除该资源类型, 是否继续?', '提示', {
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
      var url = '/uums_mgr/type/delete?tid=' + this.tid;
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
        this.getlist()
      },res=>{
        this.$message.error('删除失败')
      })
    },

//      编辑取消
    cancle(){
      console.log('编辑取消')
      this.data = this.dataPass
      this.controlDialog = false;
      this.getlist();
    },
//      编辑确定
    editor(){
      if( this.form.name == null){
        this.form.name = ''
      }
      if(this.code == null ){
        this.code = ''
      }
      if(  this.form.name.trim() == ''){
        this.controlAdd = true
        this.messageAdd = '名称不能为空'
      }else if( this.code.trim() == '' ){
        this.controlAdd = true
          this.messageAdd = '代码不能为空'
      }else if( this.definCodeditControl == true){
        this.controlAdd = true
        this.messageAdd = '请注意输入代码的格式'
      }
      else{
        this.data = []  
        this.dataPass = []
        var edDataa = this.form;
        edDataa.code = this.code.trim();
        edDataa.name = edDataa.name.trim();
        var edData = JSON.stringify(edDataa)
        var url  = '/uums_mgr/type/update';
        this.$http.post(url,edData,{emulateJSON:true}).then(res=>{
          var passData = JSON.parse(res.bodyText)
          if(passData.result == 'appRepeat'){
            this.$message.error('编辑失败,用户名已存在该用户系统')
            this.getlist();
          }else if(passData.result == 'success'){
            this.$message({
              message : '编辑成功',
              type : 'success'
            });
            this.getlist();
          }else{
            this.$message.error('编辑失败')
            this.getlist();
          }
          this.controlDialog = false;
        },res=>{
          this.$message.error('编辑失败')
          this.getlist();
        })
      }
    },
    cancle2(){
      this.controlDialog1 = false
      this.getlist();
    },
  }
}

</script>
<style>
  .dafinFooter{
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
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
    width: 220px!important;
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
  .list_add{
    display : block;
    width : 50px;
    float : right;
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
  .definAll .tsxt_info{
    color: red;
    padding-left: 70px;
  }
</style>