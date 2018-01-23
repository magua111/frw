<template>
  <div class="cont  ainer-fluid Group_side">
    <div class="body teacher-list">
      <ol class="breadcrumb">
        <li >数据管理</li>
        <li class="active">用户组管理</li>
      </ol>
    </div>
    <el-menu :default-active="activeIndex2" class="demoGroup" mode="horizontal" @select="handleSelect">
      <el-select v-model="genre" clearable placeholder="请选择应用系统" class='userGrouptop'>
        <el-option
          v-for="item in options"
          :key="item.aid"
          :label="item.name"
          :value="item.aid">
        </el-option>
      </el-select>
      <button class="btn btn-success btn-sm userGrouptopSearch" v-on:click='searchGroup'>
           搜索
      </button>
      <button class="btn btn-success btn-sm addrolerroup" v-on:click='addGroup'>添 加</button>
    </el-menu>
    <!--表格-->
    <div class="panel panel-default">
      <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
        <el-table-column
          prop='name'
          label="系统名称"
          width="200">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="组标识"
          prop='uGroup'
          width="">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.uGroup.groupId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="组名称"
          prop='uGroup'
          width="170">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.uGroup.groupName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="角色"
          prop='roleStr'
          width="280">
          <template scope="scope">
            <el-popover
              ref="popover1"
              placement="top-start"
              title="nginx重定向URL"
              width=""
              trigger="hover"
              :content="scope.row.uGroup.roleStr.roleNames">
            </el-popover>
            <span v-popover:popover1 style="margin-left: 10px">{{ scope.row.uGroup.roleStr.roleNames }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230" >
          <template scope="scope">
            <button size="large" type="text" @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true" class='btn btn-success btn-xs'>编辑</button>
            <button type='text' @click='deleteRow(scope.$index,scope.row)' class="btn btn-warning btn-xs">
                  删除
            </button>
            <button size="large" type="text" @click="lookEdit(scope.$index, scope.row);dialogFormVisible = true" class='btn btn-info btn-xs'>组用户名单</button>
          </template>
        </el-table-column>
      </el-table>
            <!-- 编辑模态框 -->
      <el-dialog title="用户组信息" :visible.sync="dialogFormVisible" :show-close='false' :visible="controlDialog" size='userGroupsideModel'>
          <el-form :model="form">
            <el-form-item label="系统名称" :label-width="formLabelWidth"  class='groupLable'>
              <el-select v-model="value10" clearable placeholder="请选择专区" class='groupfouned'>
                <el-option
                v-for="item in options5"
                :key="item.aid"
                :label="item.name"
                :value="item.aid">
                </el-option>
              </el-select>
              <span class='star'>*</span>
            </el-form-item>
            <el-form-item label="组标识" :label-width="formLabelWidth" class='groupLable'>
              <el-input v-model="groupId" auto-complete="off" class='groupfouned' ></el-input>
              <div class='userGroupsideTitle' v-if='userGroupsideTitleControl==true'><div><span class='glyphicon glyphicon-remove'>{{grouponly}}</span></div></div>
              <span class='star' v-else>*</span>
            </el-form-item>
            <el-form-item label="组名称" :label-width="formLabelWidth" class='groupLable'>
              <el-input v-model="form.groupName" auto-complete="off" class='groupfouned'></el-input>
              <span class='star'>*</span>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth"  class='groupLable'>
              <v-select multiple :options="optionSelectrole"  v-model="selectedrole" label="roleName" value='rid' class='groupfouned'></v-select>
              <span class='star'>*</span>
            </el-form-item>
            <div v-if='control' class='tsxt_infoErr'>
              <span class='info_massageErr'>{{message}}</span>
            </div>
          </el-form>
          <div slot="footer" class="userGroup-footer">
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
        optionSelectrole : [],
        selectedrole : [],
        userGroupsideTitleControl : false,
        value10 : '',
        options5 : [],
        value9 : [],
        options4 : [],
        loading : false,
        list : [],
        states: [],
        options6: [],
        value6 : [],
        orgControl : false,
        groMessage : '',
        optionsROL : [],
        valueROL : [],
        activeIndex: '1',
        activeIndex2: '1',
        tab : true,
        tabzu : false,
        tableData: [],
        options: [],
        dialogFormVisible : false,
        dialogFormVisible_group : false,
        form :{
          groupId : '',
          groupName : ''
        },
        form_group : {},
        full_name : '机构/人',
        genre : '',
        formLabelWidth : '220px',
        control : false,
        message : '',
        searchData : '',
        controlDialog : false,
        controlDialog2 : false,
        delete_userName : '',
        num : 0,
        pagenum : 10,
        pageallnum : 0,
        currentPage1: 1,
        controlDialog_group : false,
        ledetegroup_Info : '',
        delete_gid : '',
        aid : '',
        asideLists : [],
        name : '',
        guid : '',
        fullName : '',
        groupName : '',
        roleName : '',
        grouponly : '',
        passGroupId : '',
        groupId : '',
      }
    },
    created(){
      this.userList();
      this.asideGet();
      this.asideeditorGet();
    },
    computed: {
      aidNumber(){
        return this.$store.state.aidNumber
      }
    },
    watch:{
      value10(newAid,oldAid){
        this.roleGet();
        this.getnewRole();
        this.constrol = false;
        this.message = ''
      },
      groupId(a,b){
        this.groupOnly(a)
      }
    },
    methods:{
      userList(){
        var url_data = 'pageNum=' + this.currentPage1 +'&pageSize=' + this.pagenum
        var url  = '/uums_mgr/uGroup/pageUGroupsByAid?aid='+ this.aid +'&pageNumber=' + this.currentPage1 +'&pageSize=' + this.pagenum
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
      asideeditorGet(){
        this.getOrg.getOrgOption().then(res=>{
          this.options5 = res.body
        },res=>{
        })
      },
      asideGet(){
        this.getOrg.getOrgOption().then(res=>{
          this.options = res.body
          this.genre = res.body[0].aid
        },res=>{
        })
      },

      searchGroup(){
        this.aid = this.genre;
        this.userList();
      },


      userGroupsideTitle(a){
        if(a == '' || a == null){
          return false
          this.userGroupsideTitleControl = false
        }else{
          var s = /^[A-Za-z0-9_-]*$/g;
          if(s.test(a)){
            this.userGroupsideTitleControl = false
            this.grouponly = ''
          }else{
            this.userGroupsideTitleControl = true
            this.grouponly = '数字，字母下划线连接符组成'
          }
        }
      },
      groupOnly(a){
        if(this.passGroupId == a){
          this.userGroupsideTitle(a)
        }else{
          var url = '/uums_mgr/uGroup/groupId'
          var data = {};
          data.groupId = a
          this.$http.post(url,data,{emulateJSON:true}).then(res=>{
            if(res.body == true){
              this.userGroupsideTitleControl = false
              this.grouponly = ''
              this.userGroupsideTitle(a);
            }else{
              this.userGroupsideTitleControl = true
              this.grouponly = '组标识已存在'
            }
          },res=>{
            this.userGroupsideTitleControladd = true
            this.grouponly = '组标识已存在'
          })
        }
      },

      lookEdit(index,row){
        this.$store.state.aidNumber = window.localStorage.aidNumber = row.name
        this.$store.state.userIndex = window.localStorage.userIndex = '1'
        this.$store.state.gidNumber = window.localStorage.gidumber = row.uGroup.groupName
        this.$store.state.asiderNum = window.localStorage.asiderNum = '/userGroupside'
        this.$router.push('/userGroupside/foundationGroup/' + row.uGroup.gid)
      },
      getnewRole(){
        var url  = '/uums_mgr/role/findRolesByAidsAndRids';
        var data = {};
        var dataaid = [];
        var datarid = [];
        if(this.value10.length == 0){
          this.selectedrole = [];
        }else{
          dataaid.push(this.value10)
          for(var i = 0; i<this.selectedrole.length ; i++){
            datarid.push(this.selectedrole[i].rid)
          }
          data.aids = dataaid;
          data.rids = datarid;
          var newData = JSON.stringify(data)
          this.$http.post(url,newData,{emulateJSON:true}).then(res=>{
            this.selectedrole = res.body
          },res=>{
          })
        }
      },

      roleGet(){
        if( this.value10.length == 0 ){
          this.optionSelectrole  = []
        }else{
          var dataArr = [];
          dataArr.push(this.value10)
          var newArr = JSON.stringify(dataArr)
          var url  = '/uums_mgr/role/findRolesByAids';
          this.$http.post(url,newArr,{emulateJSON:true}).then(res=>{
            this.optionSelectrole = res.body
          },res=>{
          })
        }
      },

      editor(){
        var data = {};
        data.gid = this.form.uGroup.gid;
        data.groupName = this.form.groupName;
        data.groupId = this.groupId;
        data.aid = this.value10;
        var obj = []
        for( var i = 0; i<this.selectedrole.length; i++){
          var obj1 = {}
          obj1.rid = this.selectedrole[i].rid
          obj.push(obj1)
        }
        data.roles = obj;
        var edData = JSON.stringify(data)
        if(data.aid == ''){
          this.control = true
          this.message = '应用系统不能为空'
        }
        else if(data.groupId.trim() == ''){
          this.control = true
          this.message = '组标识不能为空'
        }
        else if(data.groupName.trim() == ''){
          this.control = true
          this.message = '组名称不能为空'
        }
        else if(this.selectedrole.length == '0'){
          this.control = true
          this.message = '角色不能为空'
        }
        else if(this.userGroupsideTitleControl == true){
          this.control = true
          this.message = '请注意输入格式'
        }
        else{
          var url  = '/uums_mgr/uGroup/update';
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
            this.control = false
            this.message = ''
            this.orgControl = false;
          },res=>{
            this.$message.error('编辑失败')
          })
        }
      },

      handleEdit(index, row) {
        this.userGroupsideTitleControl = false;
        this.control = false;
        this.selectedrole = []
        this.controlDialog = true;
        this.passGroupId = row.uGroup.groupId
        var gids = row.uGroup.roleStr.rids;
        var name = row.uGroup.roleStr.roleNames;
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
          objSele.rid = groupArr[i];
          objSele.roleName = groupnameArr[i];
          var objSelenew = JSON.stringify(objSele)
          var objSelenew = JSON.parse(objSelenew)
          this.selectedrole.push(objSelenew)
        }
        this.roleGet()
        this.groMessage = row.uGroup.roleStr.roleNames
        this.value10 = [];
        this.value6 = [],
        this.form = row;
        this.value10 = row.uGroup.aid ;
        this.form.groupName = row.uGroup.groupName
        this.groupId = row.uGroup.groupId
      },
      
      choose(query){
        var url = '/uums_mgr/role/findRolesByRoleName?roleName='+ query
        this.$http.get(url).then(res=>{
        this.options4 = res.body;
        },res=>{
        })
      },
      remoteMethod0(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
          this.loading = false;
          this.choose(query);
          this.roleName = query;
          this.options4 = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.choose(query)
          this.options4 = [];
        }
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
         this.delete_gid = row.uGroup.gid;
         this.delete_userName = row.userName;
         this.open2();
      },
      open2() {
        this.$confirm('操作将永久删除该用户组, 是否继续?', '提示', {
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
      editor2(){
        var url_delete = '/uums_mgr/uGroup/delete?gid=' + this.delete_gid;
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
        this.orgControl = false;
        this.userList();
      },
      search(){
        this.userList()
      },
      add(){
        this.$router.push("/center/addGroup/" + this.aid + "/" + this.form.name + "/" + this.form.guid);
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
  .Group_side .el-input__inner{
    height : 30px;
  }
  .Group_side .groupLable .groupfouned{
     float: left;
     width: 95%;
  }
  .Group_side .userGroupsideTitle{
     height: 30px;
     line-height:15px;
     font-size: 12px;
     color: red;
     text-indent: 0px;
     text-align: left;
  }
  .Group_side .el-dialog--userGroupsideModel{
     font-family : inherit;
     color : inherit;
     border-radius: 8px;
     background-color: rgb(255,255,255);
     box-shadow: 0 5px 15px rgba(0,0,0,.5);
     padding-right : 50px;
     width: 800px;
   }
   .Group_side .userGrouptop{
      margin-top:13px;
   }
   .Group_side .userGrouptopSearch{
     margin-left: 10px !important;
   }
   .breadcrumb {
     margin-bottom: 0;
   }
   .Group_side .el-menu {
      margin: 10px 0;
   }
   .Group_side .el-input{
      margin-bottom: 10px;
   }
  .Group_side .panel-body {
    padding: 15px;
    width: 400px;
    display: inline-block;
  }
  .fl{
    float : left;
    height : 30px;
  }
 
  .demoGroup{
    position : relative;
    height : 60px;
    background-color : #dcdcdc;
    padding-left:10px;
  }
 .addrolerroup{
    position: absolute;
    right: 15px;
    top: 15px;
    width: 50px;
 }
 .userGroup-footer{
    position : absolute;
    bottom : 20px;
    right : 20px;
 }
</style>

