<template>
  <div class="cont  ainer-fluid roleAll">
   <div class="body teacher-list">
    <ol class="breadcrumb">
      <li >数据管理</li>
      <li class="active">角色管理</li>
    </ol>
   </div>
   <el-menu :default-active="activeIndex2" class="demoRol" mode="horizontal" @select="handleSelect">
      <el-select v-model="genre" clearable placeholder="请选择应用系统" class='chooseorgRol'>
       <el-option
         v-for="item in options"
         :key="item.aid"
         :label="item.name"
         :value="item.aid">
       </el-option>
      </el-select>
      <button class="btn btn-success btn-sm chooseorgRolsear" v-on:click='search'>搜索</button>
      <button class="btn btn-success btn-sm " v-on:click='addRolenew' id='addroleadd'>添 加</button>
    </el-menu>
    <div class="panel panel-default">
      <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
        <el-table-column
          prop=''
          label="系统名称"
          width="">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.appName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="角色标识"
          prop='role'
          width="">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.role.roleId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="角色名称"
          prop='role'
          width="">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.role.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户组名称"
          prop='uGroupStr'  
          width="">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.role.uGroupStr.groupNames }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <button size="large" type="text" @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true" class='btn btn-success btn-xs'>编辑</button>
            <button type='text' @click='deleteRow(scope.$index,scope.row)' class="btn btn-warning btn-xs">删除
            </button>
            <button size="large" type="text" @click="powerEdit(scope.$index, scope.row);dialogFormVisible = true" class='btn btn-info btn-xs'>权限编辑</button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑模态框 -->
      <el-dialog title="角色编辑" :visible.sync="dialogFormVisible" :show-close='false' :visible="controlDialog" size='roleInfo'>
        <el-form :model="editForm">
          <el-form-item label="系统名称" :label-width="formLabelWidth" class='roleLable'>
            <el-select v-model="value10" clearable placeholder="请选择专区"  class='rolefouned'>
              <el-option
                v-for="item in options5"
                :key="item.aid"
                :label="item.name"
                :value="item.aid">
              </el-option>
            </el-select>
            <span class='star'>*</span>
          </el-form-item>
          <el-form-item label="角色标识" :label-width="formLabelWidth" class='roleLable'>
            <el-input v-model="roleIdOnly" auto-complete="off" class='rolefouned'></el-input>
            <div class='roleTitle'  v-if='roleTitleControl==true'><div><span class='glyphicon glyphicon-remove'>{{roleonly}}</span></div></div>
            <span class='star' v-else>*</span>
          </el-form-item>
          <el-form-item label="角色名称" :label-width="formLabelWidth" class='roleLable'>
            <el-input v-model="editForm.roleName" auto-complete="off" class='rolefouned'></el-input>
            <span class='star'>*</span>
          </el-form-item>
          <el-form-item label="相关用户组" :label-width="formLabelWidth" class='roleLable'>
            <v-select multiple :options="optionSelectgroup"  v-model="selectedgroup" label="groupName" value='gid' class='rolefouned'></v-select>
          </el-form-item>
          <div v-if='control' class='tsxt_infoErr'>
            <span class='info_massageErr'>{{message}}</span>
          </div>
        </el-form>
        <div slot="footer" class="role-footer">
          <el-button @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false ; editor()">确 定</el-button>
        </div>
      </el-dialog>
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
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        emptyText : '数据正在加载中...',
        roleTitleControl : false,
        optionSelectgroup: [],
        selectedgroup: [],
        options5 : [],
        value10 : '',
        activeIndex: '1',
        activeIndex2: '1',
        options : [],
        editForm : {
            roleId : '',
            roleName : '',
        },
        tab : true,
        tabzu : false,
        tableData: [],
        tableData2: [],
        dialogFormVisible : false,
        dialogFormVisible_group : false,
        form :{},
        form_group : {},
        full_name : '机构/人',
        genre : '',
        formLabelWidth : '220px',
        control : false,
        message : '',
        searchData : '',
        controlDialog : false,
        delete_uid : '',
        delete_userName : '',
        roleonly : '',
        num : 0,
        pagenum : 10,
        pageallnum : 0,
        currentPage1: 1,
        controlDialog_group : false,
        ledetegroup_Info : '',
        delete_gid : '',
        aid : '',
        options2: [],
        roleid: [],
        list: [],
        loading: false,
        states: [],
        fullName : '',
        groupName : '',
        roleName : '',
        groMessage : '',
        passRoleId : '',
        roleIdOnly : '',
      }
    },
    created(){
      if( window.localStorage.poweraAid == NaN  || window.localStorage.poweraAid == null){
       window.localStorage.poweraAid = ''
      }
      this.gener = this.aid = this.$store.state.poweraAid =   window.localStorage.poweraAid 
      this.userList();
      this.asideGet();
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    watch:{
      value10(newAid,oldAid){
        this.groupeditGet();
        this.getnewGroup(newAid);
        this.orgControl = true;
        this.constrol = false;
        this.message = ''
      },
      roleIdOnly(a,b){
        this.roleOnly(a)
      }
    },
    methods:{
      powerEdit(index,row){
        if(this.aid == ''){
          this.genre = this.$store.state.poweraAid = window.localStorage.poweraAid = ''
        }else{
          this.genre = this.aid = this.$store.state.poweraAid = window.localStorage.poweraAid = row.role.aid
        }
        this.$router.push('/role/power/'+ row.role.rid)
      },
      search(){
        this.aid = this.$store.state.poweraAid = window.localStorage.poweraAid = this.genre  
        this.userList()
      },
      roleTitle(a){
        var s = /^[A-Za-z0-9_-]*$/g;
        if(a == '' || a == null){
          return false
          this.roleTitleControl = false
        }else{
          if(s.test(a)){
            this.roleTitleControl = false
            this.roleonly = ''
          }else{
            this.roleTitleControl = true
            this.roleonly = '数字，字母下划线连接符组成'
          }
        }
      },
      roleOnly(a){
        if(this.passRoleId == a){
          this.roleTitle(a)
        }else{
          var url = '/uums_mgr/role/roleId'
          var data = {};
          data.roleId = a
          this.$http.post(url,data,{emulateJSON:true}).then(res=>{
            if(res.body == true){
              this.roleTitleControl = false
              this.roleonly = ''
              this.roleTitle(a)
            }else{
              this.roleTitleControl = true
              this.roleonly = '角色标识已存在'
            }
          },res=>{
              this.roleTitleControl = true
              this.roleonly = '角色标识已存在'
          })
        }
      },
      userList(){
        var url_data = 'pageNum=' + this.currentPage1 +'&pageSize=' + this.pagenum
        var url  = '/uums_mgr/role/pageRolesByAid?aid='+ this.aid +'&' + 'pageNumber=' + this.currentPage1 +'&pageSize=' + this.pagenum
        this.$http.get(url).then(res=>{
          if(res.body == null){
            this.emptyText = '暂无数据'
          }else{
            this.emptyText = ''
          }
          this.num = res.body.totalElements
          this.tableData = res.body.content;
        },res=>{
          this.emptyText = '获取数据失败！！！'
        })
      },
      asideGet(){
        this.getOrg.getOrgOption().then(res=>{
          this.options = res.body
          if(this.aid == ''){ 
            this.genre = res.body[0].aid
          }else{
            this.genre = this.$store.state.poweraAid =   window.localStorage.poweraAid - 0
          }
        },res=>{
        })
      },
      asideeditorGet(){
        this.getOrg.getOrgOption().then(res=>{
          this.options5 = res.body
        },res=>{
        })
      },
      editor(){
        var data = {};
        data.rid = this.editForm.rid
        data.aid = this.value10
        data.roleId = this.roleIdOnly
        data.roleName = this.editForm.roleName
        var obj = []
        for( var i = 0; i<this.selectedgroup.length; i++){
          var obj1 = {}
          obj1.gid = this.selectedgroup[i].gid
          obj.push(obj1)
        }
        data.uGroups = obj
        if( this.value10 == '' ){
          this.control = true
          this.message = '应用系统不能为空'
        }
        else if( data.roleId.trim() == '' || data.roleId.trim == null){
          this.control = true
          this.message = '角色标识不能为空'
        }
        else if( data.roleName.trim() == '' || data.roleName.trim == null){
          this.control = true
          this.message = '角色名称不能为空'
        }
        else if( this.roleTitleControl == true){
          this.control = true
          this.message = '请注意输入格式'
        }
        else{
          var edData = JSON.stringify(data)
          var url  = '/uums_mgr/role/update';
          this.$http.post(url,edData,{emulateJSON:true}).then(res=>{
            if(res.bodyText == 'success'){
              this.$message({
                message : '编辑成功',
                type : 'success'
              });
            }else{
              this.$message.error('编辑失败')
            } 
            this.controlDialog = false;
            this.userList();
            this.constrol = true
            this.control = false
            this.message = ''
            this.roleid = [];
          },res=>{
            this.$message.error('编辑失败')
          })
        }
      },
      getnewGroup(a){
        var url  = '/uums_mgr/uGroup/findUGroupsListByAidsAndGids';
        var data = {};
        var dataaid = [];
        var datagid = [];
        if(a.length == 0){
          this.selectedgroup = [];
        }else{
          dataaid.push(a)
          for(var i = 0; i<this.selectedgroup.length ; i++){
            datagid.push(this.selectedgroup[i].gid)
          }
          data.aids = dataaid;
          data.gids = datagid;
          var newData = JSON.stringify(data)
          this.$http.post(url,newData,{emulateJSON:true}).then(res=>{
            this.selectedgroup = res.body
          },res=>{
          })
        }
      },
      groupeditGet(){
        this.optionSelectgroup = [];
        if( this.value10.length == 0 ){
          this.optionSelectgroup = []
        }else{
          var dataArr2 = [];
          dataArr2.push(this.value10)
          var newArr2 = JSON.stringify(dataArr2)
          var url  = '/uums_mgr/uGroup/findUGroupsListByAids';
          this.$http.post(url,newArr2,{emulateJSON:true}).then(res=>{
          for( var i = 0;i < res.body.length;i++ ){
            this.optionSelectgroup.push(res.body[i])
          }
         },res=>{
         })
       }
      },
      handleEdit(index, row) {
        this.roleTitleControl = false;
        this.control = false;
        this.selectedgroup = [];
        this.controlDialog = true;
        this.passRoleId = row.role.roleId
        var gids = row.role.uGroupStr.gids;
        var name = row.role.uGroupStr.groupNames;
        if(gids == null || gids == '' ){
          var groupArr = [];
        }else{
          var groupArr = gids.split(',')
        }
        if(name == null || name == '' ){
          var groupnameArr = [];
        }else{
          var groupnameArr = name.split(',')
        }
        for(var i = 0 ;i<groupArr.length;i++){
         var objSele = {};
         objSele.gid = groupArr[i];
         objSele.groupName = groupnameArr[i];
         var objSelenew = JSON.stringify(objSele)
         var objSelenew = JSON.parse(objSelenew)
         this.selectedgroup.push(objSelenew)
        }
        this.groupeditGet();
        this.groMessage = row.role.uGroupStr.groupNames
        this.asideeditorGet();
        this.value10 = row.role.aid
        this.editForm = row.role;
        this.roleIdOnly = row.role.roleId
      },
    

      searchGroup(){
        this.aid = this.genre;
        this.userList();
      },
      handleSizeChange(val) {
        this.pagenum = val
        this.userList()
      },
      handleCurrentChange(val) {
        this.currentPage1 = val;
        this.userList()
      },
      deleteRow(index,row){
        this.delete_uid = row.role.rid;
        this.delete_userName = row.userName;
        this.open2()
      },
      open2() {
        this.$confirm('操作将永久删除该角色, 是否继续?', '提示', {
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
      handleClose(done){
        this.$confirm('确认关闭吗')
        .then(_=>{
            done()
        })
        .catch(_=>{});
      },
      editor2(){
        var url_delete = '/uums_mgr/role/delete?rid=' + this.delete_uid;
        this.$http.get(url_delete).then(res=>{
          if(res.bodyText == 'success'){
            this.$message({
              message : '删除成功',
              type : 'success'
            });
          }else{
            this.$message.error('删除失败')
          } 
          this.userList();
        },res=>{
          this.$message.error('删除失败')
        })
        this.controlDialog2 = false;
      },
      cancle2(){
        this.controlDialog2 = false;
      },
      usergroup(){
        this.tab = false;
        this.groupList();
        this.tabzu = true;
      },
      user(){
        this.tabzu = false;
        this.userList();
        this.tab = true;
      },
     
      handleLook(index, row){
        this.form = row;
      },
      cancle(){
        this.controlDialog = false;
        this.roleid = [];
        this.userList();
      },
      addRolenew(index,row){
        this.$router.push('/roleAdd');
      },
      addGroup(){
        this.$router.push('/center/addGroup');
      },
      handleSelect(key, keyPath) {
      }
    }
  };
</script>

<style>
  .el-input__inner{
    height : 30px;
  }
  .roleTitle{
    height: 30px;
    line-height:15px;
    font-size: 12px;
    color: red;
    text-indent: 0px;
    text-align: left;
  }
  .roleLable .rolefouned{
    float: left;
    width: 95%;
  }
  .chooseorgRol{
    margin-top:13px!important;
  }
  .roleAll .chooseorgRolsear{
    margin-left: 10px!important;
  }
  .roleSearch{
    position: absolute;
    top: 15px;
    height: 34px!important;
    line-height: 32px;
    text-align: center;
    left: 224px;
    padding-right: 15px;
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
  .fl{
    float : left;
    height : 30px;
  }
  .demoRol{
    position : relative;
    height : 60px;
    background-color : #dcdcdc;
    padding-left:10px;
  }
  .el-dialog--roleInfo{
    font-family : inherit;
    color : inherit;
    border-radius: 8px;
    background-color: rgb(255,255,255);
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    padding-right : 50px;
    width: 800px;
  }
  .rolefooter{
    position : absolute;
    bottom : 20px;
    right : 20px;
  }
  .btn-sm, .btn-group-sm > .btn{
    margin-top:0!important;
  }
  #addroleadd{
    position: absolute;
    right: 15px;
    top: 15px;
    width: 50px;
  }
  .role-footer{
    position : absolute;
    bottom : 20px;
    right : 20px;
  }
</style>

