<template>
  <div class="cont  ainer-fluid ListAll">
    <div class="body teacher-list">
      <ol class="breadcrumb">
        <li >系统管理</li>
        <li class="active">应用系统</li>
      </ol>
      <div class="panel panel-default"> 
        <div class="search_body">
          <div class="input-group list_search">
            <input type='text' class='form-control input-sm' placeholder='应用全称' v-model='search_name'>
            <span class='input-group-btn'>
              <button class='btn btn-success btn-sm btnList' v-on:click='searchByname'>搜索</button>
            </span>
          </div>
          <router-link to='/center/add' class="btn btn-success btn-sm list_add">添加</router-link>
        </div>
             <!--列表-->
        <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
          <el-table-column
            label="应用全称"
            prop='name'
            fixed
            width="170">
            <template scope="scope">
              <el-popover
                ref="popover1"
                placement="top-start"
                title="应用全称"
                width="170"
                trigger="hover"
                :content="scope.row.name ">
              </el-popover>
              <span style="margin-left: 10px"  v-popover:popover1  class='demojjj'>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="系统标示"
            prop='guid'
            width="170">
            <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.guid }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="内部重定向地址"
            prop='bizUrl1'
            width="225">
            <template scope="scope">
              <el-popover
                ref="popover1"
                placement="top-start"
                title="内部重定向地址"
                width=""
                trigger="hover"
                :content=" scope.row.bizUrl1 ">
              </el-popover>
              <span style="margin-left: 10px" v-popover:popover1 class='demojjj'>{{ scope.row.bizUrl1}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="外部重定向地址"
            prop='bizUrl2'
            width="225">
            <template scope="scope">
              <el-popover
                ref="popover1"
                placement="top-start"
                title="nginx重定向URL"
                width=""
                trigger="hover"
                :content="scope.row.bizUrl2">
              </el-popover>
              <span  v-popover:popover1 style="margin-left: 10px"   class='demojjj'>{{ scope.row.bizUrl2 }}</span>
            </template>
          </el-table-column>


          <el-table-column
            label="应用简称"
            prop='nameAbbr'
            width="160">
            <template scope="scope">
              <span  style="margin-left: 10px">{{ scope.row.nameAbbr }}</span>
            </template>
          </el-table-column>
         
          <el-table-column
            label="接口权限认证密码"
            prop='appKey'
            width="350">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.appKey }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="ekey+密码"
            prop='ekeyOnlyList'
            width="160">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.ekeyOnlyList }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最后更新时间"
            prop='lastUpdTime'
            width="170">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.lastUpdTime }}</span>
            </template>
          </el-table-column>
          <el-table-column width="180" fixed='right' label="操作" >
            <template scope="scope">
            <button size="large" type="text" @click="handleEdit(scope.$index, scope.row);  dialogFormVisible = true;" class='btn btn-success btn-xs'>
                  编辑
            </button>
            <button type='text' @click='deleteRow(scope.$index,scope.row)' class="btn btn-warning btn-xs">
                  删除
            </button>
            </template>
          </el-table-column>
        </el-table>
              <!-- 分页 -->
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
              <!-- 模态框 -->
        <el-dialog title="信息编辑" :visible.sync="dialogFormVisible" :visible="controlDialog" :show-close='false' class='title_message' size='listsize'>
          <el-form :model="form">
            <el-form-item label="系统标识" :label-width="formLabelWidth" class='lableName'>
              <input v-model="form.guid" auto-complete="off" class='haahh form-control  input-sm' readonly>
              <div class='Listguid'><div><span></span></div></div>
            </el-form-item>
            <el-form-item label="应用全称" :label-width="formLabelWidth" class='lableName'>
              <el-input v-model="form.name" auto-complete="off" class='haahh'></el-input>
               <div class='Listguid' ><div></div>
                <span class='star' >*</span>
              </div>
            </el-form-item>
            <el-form-item label="接口权限认证密码" :label-width="formLabelWidth" class='lableName'>
              <el-input v-model="form.appKey" auto-complete="off" class='haahh'  v-on:blur='appKey'  ></el-input>
              <div class='Listguid'><div v-if='appKeyControl' class='listEdTIT'><span class='glyphicon glyphicon-remove'></span>长度在50以内</div>
                <span class='star' v-else>*</span>  
              </div>
            </el-form-item>            
            <el-form-item label="内部重定向地址" :label-width="formLabelWidth" class='lableName'>
              <el-popover
                ref="popoverIn"
                placement="top-start"
                title="提示"
                width="370"
                trigger="hover"
                :content="popoverIn_content"> 
              </el-popover>
              <el-input v-popover:popoverIn v-model="form.bizUrl1" auto-complete="off" class='haahh'  v-on:blur='url'></el-input>
              <div class='Listguid' ><div v-if='urlC' class='listEdTIT'><span class='glyphicon glyphicon-remove'></span>长度在100以内</div>
                <span class='star' v-else>*</span>
              </div>
            </el-form-item>
            <el-form-item label="外部重定向地址" :label-width="formLabelWidth" class='lableName'>
              <el-popover
                ref="popoverOut"
                placement="top-start"
                title="提示"
                width="370"
                trigger="hover"
                :content="popoverOut_content">
              </el-popover>
              <el-input v-model="form.bizUrl2" v-popover:popoverOut auto-complete="off" class='haahh'></el-input>
              <div class='Listguid' ><div><span></span></div>
              </div>
            </el-form-item>
            <el-form-item label="应用简称" :label-width="formLabelWidth" class='lableName'>
              <el-input v-model="form.nameAbbr" auto-complete="off" class='haahh'></el-input>
            </el-form-item>
            <el-form-item label="ekey+密码" :label-width="formLabelWidth" class='lableName'>
              <el-select v-model="form.ekeyOnly"  placeholder="请选择部门类型" class='haahh '>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <div class='edit_message' v-if='control'>{{edit_message}}</div>  
          </el-form>
          <div slot="footer" class="listfooter">
            <el-button @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false ; editor()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        emptyText : '数据正在加载中...',
        popoverOut_content : '若使用绝对跳转url请以http或https开头，其他url仅做相对跳转。',  
        popoverIn_content : '若使用绝对跳转url请以http或https开头，其他url仅做相对跳转。',
        options: [{
          value: 0,
          label: '否'
        }, {
          value: 1,
          label: '是'
        }],
        urlC : false,
        appKeyControl : false,
        passName : '',
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
        num : 0,
        pagenum : 10,
        pageallnum : 0,
        currentPage1: 1,
        search_name : '',
        guidPass : '',
      }
    },
    created(){
      this.userList();
    },
    methods: {
   
    appKey(){
      if(this.form.appKey== '' || this.form.appKey == null){
        return false
        this.appKeyControl = false
      }else{
        var data = this.form.appKey.split('')
        if(data.length > 50){
          this.appKeyControl = true;
        }else{
          this.appKeyControl = false   
        }
      }
    },
    url(){
      if(this.form.bizUrl1 == '' || this.form.bizUrl1 == null){
        return false
        this.urlC = false
      }else{
        var data = this.form.bizUrl1.split('')
        if(data.length > 100){
          this.urlC = true;
        }else{
          this.urlC = false
        }
      }
    },

    deleteRow(index,row){
      this.delete_aid = row.aid;
      this.delete_name = row.name;
      this.open2()
    },

    handleClose(done){
      this.$confirm('确认关闭吗')
        .then(_=>{
           this.$route.push('/course_topic')
        })
        .catch(_=>{});
    },

    //删除
    editor2(){
      var url_delete = '/uums_mgr/app/delete?aid=' + this.delete_aid;
      var url  = url_delete;
      this.$http.get(url).then(res=>{
        if(res.bodyText == 'success'){
          this.$message({
             message : '删除成功',
             type : 'success'
          });
        }else{
          this.$message.error("删除失败")
        }
         this.userList();
      },res=>{
        this.$message.error("删除失败")
      })
    },

    open2() {
       this.$confirm('是否删除该应用系统?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
          this.editor2();
       }).catch(() => {
         this.$message({
         type: 'info',
         message: '已取消删除'
       });
     });
    },
    cancle2(){
      this.controlDialog2 = false;
    },
    handleSizeChange(val) {
      this.pagenum = val
      this.user_list_get()
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
      this.user_list_get()
    },
    userList(){
      this.user_list_get();
    },
    //基础数据渲染
    user_list_get(){
      var url = '/uums_mgr/app/findByName?pageNumber=' + this.currentPage1 + '&pageSize=' + this.pagenum +'&name=' + this.passName;
        this.$http.get(url).then(res=>{
          if( res.body.content.length == 0){
            this.emptyText = '暂无数据'
          }else{
            this.emptyText = ''
          }
          res.body.content.forEach(function(k,v){
            if(k.ekeyOnly == 1){
              k.ekeyOnlyList = '是'
            }else{
              k.ekeyOnlyList = '否'
            }
          })
          this.tableData = res.body.content;
          this.num = res.body.totalElements;
        },res=>{
          this.emptyText = '获取数据失败！！！'
        })
    },
    searchByname(){
      this.passName = this.search_name
      this.user_list_get()
    },
    handleEdit(index, row) {

      this.urlC = false; 
      this.appKeyControl = false;
      this.control = false;
      this.controlDialog = true;
      this.form = row;
      this.guidPass = row.guid
    },
    cancle(){
      this.controlDialog = false;
      this.userList();
    },
    editor(){
      var data = this.form;
      if(data.bizUrl1 == '' || data.bizUrl1 == null){
        data.bizUrl1 = '';
      }
      if(data.appKey == '' || data.appKey == null){
        data.appKey = '';
      }
      if(data.name == '' || data.name == null){
        data.name = '';
      }
      data.bizUrl1 = data.bizUrl1.trim();
      data.appKey = data.appKey.trim();
      data.name = data.name.trim();
      if(data.name == null ||data.name == '' ){
        this.control = true;
        this.edit_message = '应用全称不能为空'
        return false;
      }
      else if(data.bizUrl1 == null ||data.bizUrl1 == '' ){
        this.control = true;
        this.edit_message = '内部重定向地址不能为空'
        return false;
      }
      else if(data.appKey == null ||data.appKey == '' ){
        this.control = true;
        this.edit_message = '接口权限认证密码不能为空'
        return false;
      }
      else if(this.appKeyControl == true || this.urlC==true){
        this.control = true  
        this.edit_message = '请注意输入格式'
      }
      else{
        var newdata = JSON.stringify(data)
        var url  = '/uums_mgr/app/update';
        this.$http.post(url,newdata,{emulateJSON:true}).then(res=>{
         if(res.bodyText == 'success'){
          this.$message({
             message : '编辑成功',
             type : 'success'
           });
         }else{
           this.$message.error('编辑失败')
         }
          this.controlDialog = false;
          this.control = false;
          this.userList();
        },res=>{
          this.$message.error('编辑失败')
        })
      }
    },
  },
}
</script>

<style>
  .el-input__inner{
    height : 30px;
    linre-height : 30px;
  }
  .ListAll .el-table__empty-text{
    left: 33%;
  }
  .ListAll .panel{
    height : 740px;
  }
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
  .search_body{
    height : 30px;
    margin : 15px 10px;
  }
  .input-sm{
    border-radius : 3px;
  }
  .search_body{
    border : 0;
    height: 30px;
    margin: 15px 10px;
    padding-right: 3px;
  }
  .input-group-btn{
    height : 30px !important;;
  }
  .title_message{
    color : red;
  }
  .el-dialog--listsize{
    font-family : inherit;
    color : inherit;
    border-radius: 8px;
    background-color: rgb(255,255,255);
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    padding-right : 50px;
    width: 800px;
  }
  .listfooter{
    position: absolute;
    bottom : 20px;
    right : 20px;
  }
  .haahh{
    width: 80%;
    float: left;
  }
  .lableName .el-form-item__label{
    width:270px!important;
  }
  .Listguid{
    color: red;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: left;
    text-indent: 5px;
  }
  .demojjj{
    width : 90%;
    hieght : 100%;
    display: inline-block;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .listEdTIT{
    position: absolute;
    top: 32px;
    left: 40px;
  }


</style>
