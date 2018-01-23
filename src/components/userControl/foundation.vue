<template>
  <div class="cont  ainer-fluid usermodel" >
    <div class="body teacher-list">
      <ol class="breadcrumb">
        <li >数据管理</li>
        <li class="active">用户管理</li>
      </ol>
    </div>
    <el-menu :default-active="activeIndex2" class="demoFun" mode="horizontal" @select="handleSelect">
      <el-select v-model="genre" clearable :placeholder="aidNamepass" class='funtopSearch'>
        <el-option
          v-for="item in options"
          :key="item.aid"
          :label="item.name"
          :value="item.aid">
         </el-option>
       </el-select>
      <el-select
        class='funtopSearch'
        v-model="value1"
        :multiple='false'
        filterable
        :remote='true'
        :clearable = 'true'
        placeholder="请输入姓名关键词"
        :remote-method="remoteMethod1"
        :loading="loading">
        <el-option
          v-for="item in options1"
          :key="item.pid"
          :label="item.fullName"
          :value="item.pid">
        </el-option>
      </el-select>
      <el-select
        class='funtopSearch'
        v-model="valuegroup2"
        :multiple='false'
        filterable
        :remote='true'
        :clearable = 'true'
        :placeholder="valuegroupname"
        :remote-method="remoteMethod6"
        :loading="loading">
        <el-option
          v-for="item in optionsGroup2"
          :key="item.gid"
          :label="item.groupName"
          :value="item.gid">
        </el-option>
      </el-select>
      <el-select
        class='funtopSearch'
        v-model="valueRol"
        :multiple='false'
        filterable
        :remote='true'
        :clearable = 'true'
        placeholder="请输入角色关键词"
        :remote-method="remoteMethod0"
        :loading="loading">
        <el-option
          v-for="item in optionsRol"
          :key="item.rid"
          :label="item.roleName"
          :value="item.rid">
        </el-option>
      </el-select>
      <button class="btn btn-success btn-sm funtopSearchBut" v-on:click='search'>
          搜索
      </button>
      <button class="btn btn-success btn-sm addrolenew" v-on:click='add'>添 加</button>
    </el-menu>
    <div class="panel panel-default">
      <!--表格-->
      <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
        <el-table-column
          prop='full_name'
          label="所属人员姓名"
          width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.pfullName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          prop='userName'
          width="160">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="ekey"
          prop='sslCert'
          width="160">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sslCert }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="角色"
          prop='roleNames'
          width="370">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.roleNames }}</span>
          </template>
        </el-table-column>
        <el-table-column width="" label="操作">
          <template scope="scope">
            <button size="large" type="text" @click="handleread(scope.$index, scope.row);dialogFormVisibleLook = true" class='btn btn-success btn-xs'>查看</button>
            <button size="large" type="text" @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true" class='btn btn-success btn-xs'>编辑</button>
            <button type='text' @click='deleteRow(scope.$index,scope.row)' class="btn btn-warning btn-xs">
                  删除
            </button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑模态框 -->
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible" :show-close='false' :visible="controlDialog" size='foundation'>
        <el-form :model="form">
          <el-form-item label=所属人员 :label-width="formLabelWidth" class='founLable'>
            <el-select
              class='founed'
              v-model="valuePer"
              :multiple='false'
              filterable
              :remote='true'
              :clearable = 'true'
              :placeholder="buloneName"
              :remote-method="remoteMethodPer"
              :loading="loading">
              <el-option
                v-for="item in options1"
                :key="item.pid"
                :label="item.fullName"
                :value="item.pid">
              </el-option>
            </el-select>
          </el-form-item>
                  
          <el-form-item label="用户名" :label-width="formLabelWidth" class='founLable'>
            <el-input v-model="form.userName" auto-complete="off"  class='founed' v-on:blur='fundationeditUser' ref='userNameCont'></el-input>
            <div class='fundationeditUser' v-if='fundationeditUserControl==true'><div><span class='glyphicon glyphicon-remove'></span><span>数字，字母下划线连接符组成</span></div></div>
            <span class='starList' v-else>*</span>
          </el-form-item>

          <el-form-item label="昵称" :label-width="formLabelWidth" class='founLable'>
            <el-input v-model="form.full_name" auto-complete="off"  class='founed'></el-input>
            <span class='starList'>*</span>
          </el-form-item>

          <el-form-item label="用户类型" :label-width="formLabelWidth" class='founLable'>
            <el-select v-model="userType" placeholder="请选择用户类型" class='userControle'>
              <el-option
                v-for="item in optionUser"
                :key="item.value"
                :label="item.lable"
                :value="item.value">
              </el-option>
            </el-select>
            <span class='starList'>*</span>
          </el-form-item>

          <el-form-item label="ekey" :label-width="formLabelWidth" v-if='ekContal' class='founLable'>
            <div class='ekeyIn'>
              <el-tag
                class='ekeyClass'
                :key="tag"
                type='danger'
                v-for="tag in dynamicTags"
                :closable="true"
                :close-transition="false"
                @close="handleClose1(tag)"
                >
                {{tag}}
              </el-tag>
              <el-input
                class="ekeyClass input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="handleInputConfirm1"
                @blur="handleInputConfirm1"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ ekey</el-button>
            </div>
          </el-form-item>

          <el-form-item label="系统专区" :label-width="formLabelWidth" class='founLable'>
            <v-select multiple :options="optionSelect"  v-model="selected" label="name" value='aid' class='founed'></v-select>
            <span class='starList'>*</span>
          </el-form-item>

          <el-form-item label="角色" :label-width="formLabelWidth" class='founLable'>
            <v-select multiple :options="optionSelectrole"  v-model="selectedrole" label="roleName" value='rid' class='founed'></v-select>
          </el-form-item>
          <el-form-item label="用户组" :label-width="formLabelWidth" class='founLable'>
            <v-select multiple :options="optionSelectgroup"  v-model="selectedgroup" label="groupName" value='gid' class='founed'></v-select>
          </el-form-item>
          
          <div v-show='constrol' class='info'>
            <span>{{message}}</span>
          </div>

        </el-form>
        <div slot="footer" class="foundation-footer">
          <el-button @click="dialogFormVisible = false;" v-on:click='cancle'>取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false ; editor()">确 定</el-button>
        </div>
      </el-dialog>

  
      <!-- 查看模态框 -->  
      <el-dialog title="用户信息" :visible.sync="dialogFormVisibleLook" :show-close='false' :visible="controlDialogLook" size='foundation'>
        <el-form :model="form">
          <el-form-item label=所属人员 :label-width="formLabelWidth" class='founLable'>
            <el-input v-model="lookForm.person" auto-complete="off" readonly class='founed'></el-input>
          </el-form-item>

          <el-form-item label="用户名" :label-width="formLabelWidth" class='founLable'>
            <el-input v-model="lookForm.userName" auto-complete="off"  class='founed'  readonly></el-input>
            <div class='fundationeditUser'><div  v-if='fundationeditUserControl'><span class='glyphicon glyphicon-remove'></span><span>数字，字母下划线连接符组成</span></div></div>
          </el-form-item>

          <el-form-item label="昵称" :label-width="formLabelWidth" class='founLable'>
            <el-input v-model="lookForm.full_name" auto-complete="off"  class='founed' readonly></el-input>
          </el-form-item>

          <el-form-item label="用户类型" :label-width="formLabelWidth" class='founLable'>
            <el-select v-model="userType" clearable placeholder="请选择用户类型" class='userControle' :disabled='true'>
              <el-option
                v-for="item in optionUser"
                :key="item.value"
                :label="item.lable"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="ekey" :label-width="formLabelWidth" v-if='ekContal' class='founLable' >
            <el-input v-model="lookForm.sslCert" auto-complete="off"  class='founed'  readonly></el-input>
          </el-form-item>

          <el-form-item label="系统专区" :label-width="formLabelWidth" class='founLable'>
            <el-popover
              ref="popover1"
              placement="top-start"
              title="系统专区"
              width=""
              trigger="hover"
              :content="lookForm.appNames">
            </el-popover>
            <el-input v-model="lookForm.appNames" auto-complete="off"  class='founed' v-popover:popover1  readonly></el-input>
          </el-form-item>

          <el-form-item label="角色" :label-width="formLabelWidth" class='founLable'>
            <el-popover
              ref="popover2"
              placement="top-start"
              title="角色"
              width=""
              trigger="hover"
              :content="lookForm.roleNames">
            </el-popover>
            <el-input v-model="lookForm.roleNames" auto-complete="off"  class='founed' v-popover:popover2  readonly></el-input>
          </el-form-item>

          <el-form-item label="用户组" :label-width="formLabelWidth" class='founLable'>
            <el-popover
              ref="popover3"
              placement="top-start"
              title="用户组"
              width=""
              trigger="hover"
              :content="lookForm.groupNames">
            </el-popover>
            <el-input v-model="lookForm.groupNames" auto-complete="off"  class='founed' v-popover:popover3 readonly></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="foundation-footer">
          <el-button type="success" @click="dialogFormVisibleLook = false ; look()">关 闭</el-button>
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
        fundationeditUserControl : false,
        optionUser:[
          {value : 0,lable : '内部用户'},
          {value : 1,lable : '外部用户'},
          {value : -1,lable : '管理员'},
        ],
        ekContal : false,
        optionsPer : [],
        valuePer : '',
        buloneName : '请输入姓名关键字',
        lookForm : {
        },
        valueRol : '',
        optionsRol : [],
        optionSelectgroup : [],
        selectedgroup : [],
        selected: [],
        optionSelect: [],
        optionSelectrole : [],
        selectedrole : [],
        value10 : [],
        options5 : [],
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        passPid : '',
        value9 : [],
        options4 : [],
        options: [],
        options1: [],
        value6 : '',
        options6 : [],
        valuegroup2 : '',
        optionsGroup2 : [],
        activeIndex: '1',
        activeIndex2: '1',
        tab : true,
        tabzu : false,
        tableData: [],
        tableData2: [],
        dialogFormVisible : false,
        dialogFormVisibleLook : false,
        dialogFormVisible_group : false,
        form :{
          userName : '',
          password : '',
          full_name : '',
        },
        form_group : {},
        full_name : '机构/人',
        genre : '',
        formLabelWidth : '220px',
        constrol : false,
        message : '',
        searchData : '',
        controlDialog : false,
        controlDialog2 : false,
        delete_uid : '',
        delete_userName : '',
        num : 0,
        num_group : 0,
        pagenum : 10,
        pagenum_group : 10,
        pageallnum : 0,
        pageallnum_group : 0,
        currentPage1: 1,
        currentPage2: 1,
        controlDialog_group : false,
        ledetegroup_Info : '',
        delete_gid : '',
        orgControl : true,
        orgMessage : '',
        asideLists : [],
        fullName : '',
        groupName : '',
        roleName : [],
        options4: [],
        value9: [],
        list: [],
        loading: false,
        states: [],
        value1 : '',
        valuegroupname : '请输入用户组关键字',
        leader : '',
        pidPass : '',
        valuePerson : [],
        optionsPerson : [],
        product : {},
        number : [],
        saveGroupname : '',
        op : [],
        userType : '',
        aidNamepass : '请选择应用系统',
        generPass : '',
        controlDialogLook : false,
        gidPass : '',
      }
    },
    watch:{
      selected(newAid,oldAid){
        this.getnewRole()
        this.getnewGroup(newAid)
        this.groupeditGet();
        this.roleGet();
        this.constrol = false;
        this.message = ''
      },
      userType(newinput,oldinput){
        if(newinput == 1 ){
          this.ekContal = true;
        }else{
          this.ekContal = false;
        }
      }
    },
    computed: {
      aidNumber(){
        this.$store.state.aidNumber
      }
    },
    created(){
      this.userList();
      this.asideGet();
    },
    methods:{
      asideeGet(){
        this.getOrg.getOrgOption().then(res=>{
            this.optionSelect = res.body
        },res=>{
        })
      },  
      handleread(index, row){
        this.fundationeditUserControl = false;
        this.lookForm = {};
        this.controlDialogLook = true;
        if(row.pfullName == null){
          this.lookForm.person = ''
        }else{
          this.lookForm.person = row.pfullName    
        }
        if(row.full_name == null){
          this.lookForm.full_name = ''
        }else{
          this.lookForm.full_name = row.full_name    
        }
        if(row.userName == null){
          this.lookForm.userName = ''
        }else{
          this.lookForm.userName = row.userName    
        }
        this.userType = row.userType;
        this.lookForm.sslCert = row.sslCert;  
        if(row.appNames == null){
          this.lookForm.appNames = ''
        }else{
          this.lookForm.appNames = row.appNames     
        }
        if(row.roleNames == null){
          this.lookForm.roleNames = ''
        }else{
          this.lookForm.roleNames = row.roleNames     
        }
        if(row.roleNames == null){
          this.lookForm.groupNames = ''
        }else{
          this.lookForm.groupNames = row.groupNames     
        }
      },
      look(){
        this.controlDialogLook = false; 
        this.orgControl = false;
        this.selected = [];
        this.selectedgroup = [];
        this.selectedrole = [];
      },
      handleEdit(index, row) {
        this.controlDialog = true;
        this.messageFun(index, row)
        this.fundationeditUserControl = false;
      },
      messageFun(index, row){
        this.buloneName = row.pfullName
        this.pidPass =  row.pid
        this.asideeGet();
        if(row.userType == 1){
          this.ekContal = true;
          if(row.sslCert == '' || row.sslCert == null){
            this.dynamicTags = []
          }else{
            var old =  row.sslCert.split(',');
            var secOld = old.pop()
            var oo = old.shift();
            this.dynamicTags = old
          }
        }else{
          this.ekContal = false;
          this.dynamicTags = []
        }
        this.userType = row.userType
        if(row.aids == null || row.aids == ''){
          var aidArr = []
        }else{
          var aidArr = row.aids.split(',')
        }
        if(row.appNames == null || row.appNames == ''){
          var appnameArr = [];
        }else{
          var appnameArr = row.appNames.split(',')
        }
        for(var i = 0 ;i<aidArr.length;i++){
          var objSele = {};
          objSele.aid = aidArr[i];
          objSele.name = appnameArr[i];
          var objSelenew = JSON.stringify(objSele)
          var objSelenew = JSON.parse(objSelenew)
          this.selected.push(objSelenew)
        }
        if(row.rids == null || row.rids == ''){
          var roleArr = []
        }else{
          var roleArr = row.rids.split(',')
        }
        if( row.roleNames == null ||  row.roleNames == ''){
          var rolenameArr = [];
        }else{
          var rolenameArr = row.roleNames.split(',')
        }
        for(var i = 0 ;i<roleArr.length;i++){
          var objSele = {};
          objSele.rid = roleArr[i];
          objSele.roleName = rolenameArr[i];
          var objSelenew = JSON.stringify(objSele)
          var objSelenew = JSON.parse(objSelenew)
          this.selectedrole.push(objSelenew)
        }
        if( row.gids == null || row.gids == '' ){
          var groupArr = [];
        }else{
          var groupArr = row.gids.split(',')
        }
        if(  row.groupNames == null ||  row.groupNames == '' ){
          var groupnameArr = [];
        }else{
          var groupnameArr = row.groupNames.split(',')
        }
        for(var i = 0 ;i<groupArr.length;i++){
          var objSele = {};
          objSele.gid = groupArr[i];
          objSele.groupName = groupnameArr[i];
          var objSelenew = JSON.stringify(objSele)
          var objSelenew = JSON.parse(objSelenew)
          this.selectedgroup.push(objSelenew)
        }
        if(row.aids == null ){
          row.aids = ''
        }
        this.number = row.aids.split(',');
        this.product = row;
        this.form = row;
        if(row.roleNames == null){
          row.roleNames = []
          this.value11 = row.roleNames
        }else{
          this.value11 = row.roleNames.split(',');
        }
        if(row.groupNames == null){
          row.groupNames = [];
          this.value18 = row.groupNames;
        }else{
          this.value18 = row.groupNames.split(',');
        }
        this.value11 = row.roleNames;
        this.value18 = row.groupNames;
        if(row.userType == 0){
          this.form.userType  = 0
        }else if( row.userType == 1 ){
          this.form.userType  = 1
        }else if( row.userType == -1 ){
          this.form.userType  = -1
        }
        if(row.uumsRoleType == 0){
          this.form.uumsRoleType  = 0
        }else if( row.uumsRoleType == 1 ){
          this.form.uumsRoleType  = 1
        }else if( row.uumsRoleType == -1 ){
          this.form.uumsRoleType  = -1
        }
      },
      editor(){
        this.form.groupNames = ''
        this.form.appNames = ''
        this.form.roleNames = ''
        var data = {};
        data = this.form
        data.userName = this.form.userName
        data.password = this.form.password
        data.userType = this.userType-0;
        var res = ''
        if(this.userType != 1){
          var res = ''
        }else if(this.dynamicTags == null || this.dynamicTags == '' || this.dynamicTags == []){
          res = '';
        }else{
          res =',' +  this.dynamicTags.join(',') + ','
        }
        data.sslCert = res;
        data.uumsRoleType = this.product.uumsRoleType;
        if(this.selected == null || this.selected == []){
          data.aids = ''
        }else{
          var aidsData = [];
          for(var i = 0 ; i<this.selected.length; i++){
            aidsData.push(this.selected[i].aid)
          }
          data.aids = aidsData.join(',');
        }
        if( this.selectedrole == null || this.selectedrole == []){
          data.rids = ''
        }else{
          var ridData = [];
          for(var i = 0 ; i<this.selectedrole.length; i++){
            ridData.push(this.selectedrole[i].rid)
          }
          data.rids =  ridData.join(',');
        }
        if(this.selectedgroup == null || this.selectedgroup == []){
          data.gids = ''
        }else{
          var gidData = [];
          for(var i = 0 ; i<this.selectedgroup.length; i++){
            gidData.push(this.selectedgroup[i].gid)
          }
          data.gids =  gidData.join(',');
        }
        data.pid = this.valuePer;
        if(this.valuePer == ''){
          data.pid = this.pidPass
        }else{
          data.pid = this.valuePer
        }
        var dd = JSON.stringify(data)
        if(data.full_name == null){
          data.full_name = ''
        }
        if(data.userName == null){
          data.userName = ''
        }
        if( this.selected.length == 0 ){
          this.constrol  = true
          this.message  = '应用系统不能为空'
        }else if(data.full_name.trim() == '' || data.full_name == null){
          this.constrol  = true
          this.message  = '昵称不能为空'
        }else if(data.userName.trim() == '' || data.userName == null){
          this.constrol  = true
          this.message  = '用户名不能为空'
        }else if(data.userType == 1 && this.dynamicTags.length == 0){
          this.constrol  = true
          this.message  = 'ekey不能为空'
        }else if(this.fundationeditUserControl == true){
          this.constrol  = true
          this.message  = '请注意格式'
        }
        else{
          var url  = '/uums_mgr/user/update';
          this.$http.post(url,dd,{emulateJSON:true}).then(res=>{
            var passData = JSON.parse(res.bodyText)
            if(passData.result == 'success'){
              this.$message({
                message : '编辑成功',
                type : 'success'
              });
            }else{
              this.$message.error('编辑失败')
            }
            this.valuePer = ''
            this.controlDialog = false;
            this.userList();
            this.selected = [];
            this.constrol  = false
            this.message  = ''
            this.selectedgroup = [];
            this.selectedrole = [];
            this.value10 = [];
          },res=>{
            this.$message.error('编辑失败')
          })
        }
      },
      fundationeditUser(){
        if(this.form.userName == '' || this.form.userName == null){
          return false
        }else{
          var s = /^[A-Za-z0-9_-]*$/g;
          if(s.test(this.form.userName)){
            this.fundationeditUserControl = false
          }else{
            this.fundationeditUserControl = true
            this.$refs.userNameCont.$attrs.style = 'color=red'
            console.log(this.$refs.userNameCont)
          }
        }
      },
      handleClose1(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput1() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm1() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      
      remoteMethod1(query) {
        var childThis = this;
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          this.getOrg.choose1(query,childThis)
          this.options1 = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.getOrg.choose1(query,childThis)
          this.options1 = [];
        }
      },

      remoteMethodPer(query) {
        var childThis = this 
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          this.getOrg.choose1(query,childThis)
          this.options1 = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.getOrg.choose1(query,childThis)
          this.options1 = [];
        }
      },

      getpassGroup(){
        var url  = '/uums_mgr/uGroup/findUGroupByAndGid?gid=' + this.$route.params.id;
        this.$http.get(url).then(res=>{
        if(res.body == null){
            this.leader = ''
            this.valuegroupname = ''
          }else{
            this.valuegroupname = res.body.groupName
            this.leader = res.body.groupName
          }
        },res=>{
        })
      },

      userList(){
        var url = '/uums_mgr/user/findUsersByConditions?aid='+this.generPass+'&pid='+this.passPid+'&gid='+this.gidPass+'&rid='+this.value9+'&pageNum=' + this.currentPage1 +'&pageSize=' + this.pagenum
        this.$http.get(url).then(res=>{
          if(res.body.list.length == 0){
            this.emptyText = '暂无数据'
          }else{
            this.emptyText = ''
          }
          this.tableData = res.body.list;
          this.num = res.body.total
         
        },res=>{
          this.emptyText = '数据获取失败！！！'
        })
      },
          
      search(){
        this.passPid = this.value1
        this.gidPass = this.valuegroup2
        this.generPass = this.genre
        this.value9 = this.valueRol
        this.userList();
        this.$store.state.index = window.localStorage.index = '1'
      },
      handleSizeChange(val) {
        this.pagenum = val
        this.userList()
      },
      handleCurrentChange(val) {
        this.currentPage1 = val;
        this.userList()
      },
      getnewRole(){
        var url  = '/uums_mgr/role/findRolesByAidsAndRids';
        var data = {};
        var dataaid = [];
        var datarid = [];
        if(this.selected.length == 0){
          this.selectedrole = [];
        }else{
          for(var i = 0; i<this.selected.length ; i++){
            dataaid.push(this.selected[i].aid)
          }
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
      getnewGroup(a){
        var url  = '/uums_mgr/uGroup/findUGroupsListByAidsAndGids';
        var data = {};
        var dataaid = [];
        var datagid = [];
        if(a.length == 0){
          this.selectedgroup = [];
        }else{
          for(var i = 0; i<a.length ; i++){
            dataaid.push(a[i].aid)
          }
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

      roleGet(){
        this.optionSelectrole  = []
        if( this.selected.length == 0 ){
          this.optionSelectrole  = []
        }else{
          var dataArr = [];
          for(var i = 0;i<this.selected.length;i++){
            dataArr.push(this.selected[i].aid-0)
          }
          var newArr = JSON.stringify(dataArr)
          var url  = '/uums_mgr/role/findRolesByAids';
          this.$http.post(url,newArr,{emulateJSON:true}).then(res=>{
            this.optionSelectrole = res.body
          },res=>{
          })
        }
      },

      groupeditGet(){
        this.optionSelectgroup = []
        if( this.selected.length == 0 ){
          this.optionSelectgroup = []
        }else{
          var dataArr2 = [];
          for(var i = 0;i<this.selected.length;i++){
            dataArr2.push(this.selected[i].aid-0)
          }
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

      choosePerson(query){
        var url = '/uums_mgr/person/findByFullName?fullName='+ query
        this.$http.get(url).then(res=>{
          this.optionsPerson = res.body;
        },res=>{
        })
      },

      remoteMethodPerson(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          this.choosePerson(query);
          this.optionsPerson = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.choosePerson(query)
          this.optionsPerson = [];
        }
       },

       showInput() {
         this.inputVisible = true;
         this.$nextTick(_ => {
           this.$refs.saveTagInput.$refs.input.focus();
         });
       },

      choose(query){
        var url = '/uums_mgr/role/findRolesByRoleName?roleName='+ query
        this.$http.get(url).then(res=>{
           this.optionsRol = res.body;
        },res=>{
       })
      },

      remoteMethod0(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.roleName = query;
            this.optionsRol = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.choose(query)
          this.optionsRol = [];
        }
      },

      remoteMethod6(query){
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          this.searchuserGroup(query);
          this.optionsGroup2 = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.choose(query)
          this.optionsGroup2 = [];
        }
      },

      searchuserGroup(query){
        var url = '/uums_mgr/uGroup/findUGroupsBygroupName?groupName=' + query
        this.$http.get(url).then(res=>{
          this.optionsGroup2 = res.body;
        },res=>{
        })
      },

      asideGet(){
        this.getOrg.getOrgOption().then(res=>{
            this.options = res.body
        },res=>{
        })
      },

      deleteRow(index,row){
        this.delete_uid = row.uid;
        this.delete_userName = row.userName;
        this.open2()
      },
      
      open2() {
        this.$confirm('操作将永久删除该用户, 是否继续?', '提示', {
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
      },
      editor2(){
        var url_delete = '/uums_mgr/user/delete';
        var data =   {"uid" : this.delete_uid}
        this.$http.post(url_delete,data,{emulateJSON:true}).then(res=>{
          var passData = JSON.parse(res.bodyText)
          if(passData.result == 'success'){
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
        this.valuePer = '';
        this.controlDialog = false;
        this.orgControl = false;
        this.selected = [];
        this.selectedgroup = [];
        this.selectedrole = [];
        this.userList();
      },
      add(){
         this.$router.push('/center/userAdd');
      },
      addGroup(){
         this.$router.push('/center/addGroup');
      },
      handleSelect(key, keyPath) {
      }
    }
  }
</script>

<style>
  .usermodel .starList{
    color: red;
    display: inline-block;
    height: 30px;
    line-height: 35px;
    font-size: 15px;
    width: 7px;
    margin-left: 10px;
  }
  .usermodel .el-tag--danger {
    background-color: rgba(255,73,73,.1);
    border-color: rgba(255,73,73,.2);
    color: #ff4949;
    height: 28px;
    margin-top: 4px;
    padding-top: 3px;
  }
  .usermodel .el-form-item__content{
    height :30px;
    text-align : left;
  }
  .usermodel .el-input__inner{
    height :30px;
  }
  .usermodel .el-dialog--foundation{
    font-family : inherit;
    color : inherit;
    border-radius: 8px;
    background-color: rgb(255,255,255);
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    padding-right : 50px;
    width: 800px;
  }
  .usermodel .el-popover{
    background-color : #ccc;
  }
  .usermodel .el-input--mini  {
    height : 30px!important;
    width : 100%;
  }
  .usermodel .el-menu {
    margin: 10px 0;
  }
</style>
<style scoped>
  .ekeyIn{
    float : left;
    width: 95%;
  }
  .fundationeditUser{
    height: 30px;
    line-height:15px;
    font-size: 12px;
    color: red;
    text-indent: 5px;
    text-align: left;
    position: absolute;
    margin-top: 40px;
    left: 0;
  }
  .usermodel .founLable .founed{
    float: left;
    width: 95%;
  }
  .funtopSearch{
    margin-right: 10px;
    margin-top:13px;
    width: 18%;
  }
  .funtopSearchBut{
    margin-right: 10px;
    margin-top:0px;
  }
  
  .breadcrumb {
    margin-bottom: 0;
  }
  

  .demoFun{
    position : relative;
    height : 60px;
    background-color : #dcdcdc;
    padding-left:10px;
  }
  .addrolenew{
    position: absolute;
    right: 15px;
    top: 15px;
    width: 50px;
  }
  .ekeyClass{
    float: left;
  }
  .funSelect{
    float: left;
    width: 410px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    color: #1f2d3d;
    font-size: inherit;
    height: 30px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .funSelectChoose{
    float: left;
    width: 410px;
    background-color: #fff;
    background-image: none;
    width : 100%;
    color: #1f2d3d;
    font-size: inherit;
    height: 30px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .info{
    text-align : center;
    color : red;
  }
  
  .foundation-footer{
    position : absolute;
    bottom : 20px;
    right : 20px;
  }
  .userControle{
    width: 95%;
    float: left;
  }
  
</style>

