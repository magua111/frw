<template>
  <div class="panel panel-default tree"  v-loading = 'loadingControl' element-loading-text = '拼命加载中'>
    <el-tree
      empty-text = ''
      :data="data2"
      :props="defaultProps"
      node-key="id"
      class='treeClass'
      :expand-on-click-node="false"
      :default-expand-all = 'true'
      :render-content="renderContent">
    </el-tree>
    <!-- 编辑模态框 -->
    <el-dialog title="机构信息编辑" :visible.sync="dialogFormVisible" :show-close='false' :visible="controlDialog" size='treemodel'>
      <el-form :model="form" class='tree_form'>
        <el-form-item label="机构名称" :label-width="formLabelWidth">
          <el-input v-model="form.deptName" auto-complete="off" ></el-input>
          <span class='star'>*</span>
        </el-form-item>
        <el-form-item label="机构代码" :label-width="formLabelWidth" >
          <el-input v-model="form.deptCode" auto-complete="off"></el-input>
          <span class='star'>*</span>
        </el-form-item>
        <el-form-item label="机构类型" :label-width="formLabelWidth" >
          <el-select v-model="form.deptType"  placeholder="请选择部门类型" class='usertype1 '>
           <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
          </el-select>
          <span class='star'>*</span>
        </el-form-item>
        <el-form-item label="内序" :label-width="formLabelWidth">
          <el-input v-model="form.deptOrder" auto-complete="off" v-on:blur='deptOrderTreefun()'></el-input>
          <span class='star'>*</span>
          <div ><div  v-if='deptOrderTreeControl' class='deptOrderTree'><span class='glyphicon glyphicon-remove'></span>请输入四位以内数字</div></div>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth" >
          <el-input v-model="form.corpName" auto-complete="off"></el-input>
          <span class='starTreeEd'></span>
        </el-form-item>
        <el-form-item label="机构简称" :label-width="formLabelWidth">
          <el-input v-model="form.deptAbbr" auto-complete="off" ></el-input>
          <span class='starTreeEd'></span>
        </el-form-item>
        <el-form-item label="成立日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.createdate"
            type="date"
            class='treeLookdata'
            id='dataChose'
            :multiple='false'
            format='yyyy-MM-dd'
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </el-form-item>
        <div v-if='control' class='tsxt_info'>
          <span class='info_massage'>{{message}}</span>
        </div>
      </el-form>
      <div slot="footer" class="treefooter">
        <el-button @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false ; editor()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看模态框 -->
    <el-dialog title="机构信息查看" :visible.sync="dialogFormVisible" :show-close='false' :visible="controlDialog3" size='treemodel'>
      <el-form :model="form">
      <el-form-item label="上级机构" :label-width="formLabelWidth">
      <el-input v-model="parentname" auto-complete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="机构名称" :label-width="formLabelWidth">
      <el-input v-model="form.deptName" auto-complete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="机构简称" :label-width="formLabelWidth">
      <el-input v-model="form.deptAbbr" auto-complete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="机构代码" :label-width="formLabelWidth">
      <el-input v-model="form.deptCode" auto-complete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="公司名称" :label-width="formLabelWidth">
      <el-input v-model="form.corpName" auto-complete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="机构类型" :label-width="formLabelWidth">
      <el-input v-model="form.deptType" auto-complete="off" readonly>
        <select v-model='form.deptType' class='usertype1'>
          <option value= '1'>公司</option>
          <option value= '2'>部门</option>
          <option value= '3'>社团</option>
          <option value= '4'>待定</option>
        </select>
      </el-input>
      </el-form-item>
      <el-form-item label="内序" :label-width="formLabelWidth">
        <el-input v-model="form.deptOrder" auto-complete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="成立日期" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.createdate"
          class = 'treeLookdata'
          readonly
          type="date"
          id='dataChose'
          format='yyyy-MM-dd'
          placeholder="选择日期"
          :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>
      <div v-if='control' class='tsxt_info'>
        <span class='info_massage'>{{message}}</span>
      </div>
      </el-form>
      <div slot="footer" class="treefooter">
        <el-button type="success" size='samll' @click="dialogFormVisible = false ; editor5()" class='closeBut'>关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  let id = 1000;
  export default {
    data() {
      return {
         options: [{
          value: 1,
          label: '公司'
        }, {
          value: 2,
          label: '部门'
        }, {
          value: 3,
          label: '社团'
        }, {
          value: 4,
          label: '待定'
        }],
        pickerOptions0: {
          disabledDate(time) {
          }
        },
        value2: '',
        data2: [],
        defaultProps: {
          id : 'oid',
          children: 'children',
          label: 'deptName'
        },
        activeIndex: '1',
        activeIndex2: '1',
        tab : true,
        tabzu : false,
        tableData: [],
        dialogFormVisible : false,
        form :{},
        roleNames : '机构/人',
        formLabelWidth : '220px',
        control : false,
        message : '',
        searchData : '',
        controlDialog : false,
        controlDialog3 : false,
        deptOrderTreeControl : false,
        info : '',
        parentname : '',
        oid : '',
        orgName : '',
        deleteTittle : '',
        loadingControl : true,
      }
    },
    created(){
      this.userList();
    },
    computed:{
      deptName2(){
      },
      org(){
      }
    },
    methods: {
      deptOrderTreefun(){
        this.deptOrderTreeControl = this.validate.deptOrder(this.deptOrderTreeControl,this.form.deptOrder)
      },
      userList(){
        var url  = '/uums_mgr/org/findOrgsTree';
        this.$http.get(url).then(res=>{
          if(res.ok == true){
            this.loadingControl = false;
          }
          this.data2 = res.body;
        },res=>{
        })
      },
      addfit(store,data){
        this.$router.push('/center/addInstitution/'+data.oid)
      },
      cancle(){
        this.controlDialog = false;
      },
      noNull(a){
        if(a == null){
            return ''
        }else{
           return a
        }
      },
     

      editor(){
        var url  = '/uums_mgr/org/update';
        var dataNew = this.form;
        var deptNamee = this.noNull(dataNew.deptName)
        var deptAbbre = this.noNull(dataNew.deptAbbr)
        var deptCodee = this.noNull(dataNew.deptCode)
        var deptOrdere = this.noNull(dataNew.deptOrder)
        var deptTypee = this.noNull(dataNew.deptType)
        var createdate = dataNew.createdate
        if(deptNamee.toString().trim() == ''){
          this.control = true;
          this.message = '机构名称不能为空'
          return false;
        }
        else if(deptCodee.toString().trim() == ''){
          this.control = true;
          this.message = '机构代码不能为空'
          return false;
        }
        else if(deptOrdere.toString().trim() == ''){
          this.control = true;
          this.message = '内序不能为空'
          return false;
        }
        else if(deptTypee.toString().trim() == ''){
          this.control = true;
          this.message = '机构类型不能为空'
          return false;
        }
        else if( this.deptOrderTreeControl == true){
          this.control = true;
          this.message = '请注意输入格式'
          return false;
        }
        else{
          var d = this.form.createdate
          var createdate = this.validate.turnDate(d);
          dataNew.createdate = createdate;
          var data = JSON.stringify(dataNew)
          this.$http.post(url,data,{emulateJSON:true}).then(res=>{
            if(res.bodyText == 'success'){
              this.$message({
                type: 'success',
                message: '编辑成功!'
              });
            }else{
                this.$message.error('编辑失败')
            }
            this.userList();
            this.control = false;
            this.message = ''
          },res=>{
          })
          this.userList();
          this.controlDialog = false;
        }
      },

      //查看信息
      look(store, data) {
        var oidNew = data.oid;
        var url  = '/uums_mgr/org/findInfoByOid?oid=' + oidNew;
        this.$http.get(url).then(res=>{
          this.form = res.body.organization;
          if(res.body.organization.deptType == 1){
            this.form.deptType = '公司'
          }else if(res.body.organization.deptType == 2){
            this.form.deptType = '部门'
          }else if(res.body.organization.deptType == 3){
            this.form.deptType = '社团'
          }else if(res.body.organization.deptType == 4){
            this.form.deptType = '待定'
          }
          this.parentname = res.body.parentName;
          this.controlDialog3 = true;
          this.createdate = res.body.createdate;
        },res=>{
        })
      },
      cancle5(){
        this.controlDialog3 = false;
        this.userList();
      },
      editor5(){
        this.controlDialog3 = false;
        this.userList();
      },
      person(store, data){
        this.orgName = data.deptName
        this.$store.state.deptName2 =  window.localStorage.deptName2 = data.deptName
        this.$store.state.org = this.orgName
        window.localStorage.orgName = this.orgName
        this.$router.push('/institution/peopleList/' + data.oid);
      },

      editor_Organ(store, data){
        this.deptOrderTreeControl = false;
        this.control = false;
        this.message = ''
        var oidNew = data.oid;
        var url  = '/uums_mgr/org/findInfoByOid?oid=' + oidNew
        this.$http.get(url).then(res=>{
          this.form = res.body.organization;
          this.parentname = res.body.parentName;
          this.controlDialog = true;
          this.value1 = res.body.createdate;
        },res=>{
        })
      },
      open2() {
         this.$confirm('是否删除该机构, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
            this.editor2()
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消删除'
           });
         });
      },
      remove(store, data) {
        console.log(data)
        this.oid = data.oid
        this.open2()
      },
      editor2(){
        var url = '/uums_mgr/org/delete?oid=' + this.oid
        this.$http.get(url).then(res=>{
            this.deleteTittle = res.bodyText;
          if(  this.deleteTittle == 'success'){
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.userList()
          } else if( this.deleteTittle == 'false'){
            this.$message.error('删除失败')
            this.userList()
          }else if( this.deleteTittle == '不存在这条记录'){
            this.$message.error('不存在这条记录')
            this.userList()
          }
        },res=>{
        })
      },
      job(index,row){
      },
      renderContent(h, { node, data, store }) {
        return (
         <span>
           <span>
             <span>{node.label}</span>
           </span>
           <span style="float: right; margin-right: 20px">
             <el-button size="mini" type='success' icon="edit" on-click={ () => this.look(store, data) }>查看</el-button>
             <el-button size="mini" type='success' icon="document" on-click={ () => this.editor_Organ(store, data) }>编辑</el-button>
             <el-button size="mini" type='success' icon="plus"  on-click={ () => this.addfit(store, data) }>添加子机构</el-button>
             <el-button size="mini" type='warning' icon="delete2"  on-click={ () => this.remove(store, data) }>删除</el-button>
             <el-button size="mini" type='info' on-click={ () => this.person(store, data) }>直属人员</el-button>
           </span>
        </span>);
      }
    }
  }
</script>
<style>
  .el-dialog--treemodel{
    font-family : inherit;
    color : inherit;
    width: 760px;
    border-radius: 8px;
    background-color: rgb(255,255,255);
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    padding-right : 50px;
   }
  .el-date-editor.el-input {
    width: 100%;
  }
  
</style>

<style scoped>
  .tree #dataChose{
    margin-right: 0px!important;
    float: left;
  }
  .usertype1{
    width : 97%;
  }
  .tree_form .el-input, .el-input__inner{
    width: 97%;
  }

  .el-dialog__title {
    line-height: 1;
    font-size: 16px;
    color: #1f2d3d;
    font-weight: inherit;
  }
  .el-badge__content, .el-message__group p, .el-steps.is-horizontal, .el-tabs__nav, .el-tag, .el-time-spinner, .el-tree-node, .el-upload-cover__title {
    white-space: normal!important;
  }
  .tree_form .treeLookdata{
    width : 97%!;
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
  .starTreeEd{
    color: red;
    display: inline-block;
    line-height: 30px;
    font-size: 15px;
    width: 7px;
  }
  .job{
    background-color : #EFF2F7;
  }
  .breadcrumb {
    margin-bottom: 0;
  }
  .el-menu {
    margin: 10px 0;
  }
  .el-input{
    margin-bottom: 10px;
  }
  .panel-body {
    padding: 15px;
    width: 400px;
    display: inline-block;
  }
  .choose_l{
    folate : left;
  }
  .choose_all1{
    width: 400px;
    height: 31px;
    position: absolute;
    left : 0;
  }
  .tsxt_info {
    width: 100%;
  }
  .fl{
    float : left;
    height : 30px;
  }
  .func1{
    margin-bottom : 20px;
    margin-top: 17px;
    height : 31px;
    position: relative;
  }
  .info_massage {
    display: block;
    width: 300px;
    text-align: center;
    color: red;
    margin-left:  169px;
  }
  .treefooter{
    position: absolute;
    bottom: 20px;
     right: 20px;
  }
  .datechooseup{
    margin-left : 30px;
  }
  .closeBut{
    margin-left: 75px;
  }
  .deptOrderTree{
    color: red;
    font-size: 12px;
    height: 30px;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 30px;
  }
  .tree_form .el-input__inner{
    height : 36px;
  }
  .treeClass{
    font-size : 12px;
  }
  .tree{
    height :682px;
  }
   
</style>
