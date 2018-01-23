<template>
  <div class="body teacher userAddAll ">
    <ol class="breadcrumb">
      <li>数据管理</li>
      <li>用户管理</li>
      <li class="active">用户添加</li>
    </ol>
    <div class="teacher-add">
      <form class="form-horizontal col-md-offset-2">
        <div class="form-group">
          <label for="" class="col-md-3 control-label">所属人员</label>
          <div class="col-md-5">
            <el-select
              class='peopleBone1'
              v-model="value1"
              :multiple='false'
              filterable
              :remote='true'
              :clearable = 'true'
              :placeholder="buloneName"
              :remote-method="remoteMethod1"
              :loading="loading">
              <el-option
                v-for="item in options1"
                :key="item.pid"
                :label="item.fullName"
                :value="item.pid">
              </el-option>
            </el-select>
          </div>
          <div class='fundationeditUseradd'>
            <span class='star' v-if = 'orgMast'>*</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label userAddLable">用户名</label>
          <div class="col-md-5">
            <input type="tsxt" class="form-control input-sm userAdded" v-model='product.userName' v-on:blur='userAddname'>
          </div>
          <div class='fundationeditUseradd'>
            <div v-if='fundationeditUserControladd ==true'><span class='glyphicon glyphicon-remove'>数字，字母下划线连接符组成</span></div>
            <span class='star'  v-else>*</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">密码</label>
          <div class="col-md-5">
            <input type="password" class="form-control input-sm" v-model='product.password' v-on:blur='fundationeditPassword'>
          </div>
          <div class='fundationediPassWordadd'>
            <div  v-if='fundationeditPasswordControladd == true'><span class='glyphicon glyphicon-remove' >长度在50以内</span></div>
            <span class='star' v-else>*</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">用户类型</label>
          <div class="col-md-5">
            <el-select v-model="userType" placeholder="请选择用户类型" class='addUserTypevue'>
              <el-option
                v-for="item in optionUser"
                :key="item.value"
                :label="item.lable"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
           <div class='fundationeditUseradd'>
            <span class='star' >*</span>
          </div>
        </div>
         <div class="form-group" v-if='ekeyControl'>
           <label for="" class="col-md-3 control-label">ekey</label>
           <div class="col-md-5">
             <el-tag
              :key="tag"
              type='danger'
              v-for="tag in dynamicTags"
              :closable="true"
              :close-transition="false"
              @close="handleClose(tag)"
             >
               {{tag}}
             </el-tag>
             <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
             >
             </el-input>
             <el-button v-else class="button-new-tag" size="small" @click="showInput">+ ekey</el-button>
           </div>
         </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">昵称</label>
          <div class="col-md-5">
            <input type="text" class="form-control input-sm" v-model='product.full_name'>
          </div>
          <div class='fundationeditUseradd'>
            <span class='star' >*</span>
          </div>
        </div>
        <div class="form-group" >
          <label for="" class="col-md-3 control-label">所属系统</label>
          <div class="col-md-5">
            <v-select multiple :options="optionSelect"  v-model="selected" label="name" value='aid'></v-select>
          </div>
          <div class='fundationeditUseradd'>
            <span class='star' >*</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">角色</label>
          <div class="col-md-5">
            <v-select multiple :options="optionSelectrole"  v-model="selectedrole" label="roleName" value='rid'></v-select>
          </div>
        </div>
        <div class="form-group" >
          <label for="" class="col-md-3 control-label">用户组</label>
          <div class="col-md-5">
            <v-select multiple :options="optionSelectgroup"  v-model="selectedgroup" label="groupName" value='gid'></v-select>
          </div>
        </div>
        <div v-show='constrol' class='infouseradd'>
          <span>{{message}}</span>
        </div>
        <div class="form-group">
          <div class="col-md-8">
            <button class="btn btn-success btn-sm addButAll"  v-on:click.prevent='referadd()'>添 加</button>
            <button class="btn btn-primary  btn-sm addBack"  v-on:click.prevent='backAdd()'>返 回</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        addControl : true,
        fundationeditUserControladd : false,
        fundationeditPasswordControladd : false,
        ekeyControl : false,
        optionSelect : [],
        selected : [],
        orgMast : false,
        optionSelectrole : [],
        selectedrole : [],
        optionSelectgroup : [],
        selectedgroup : [],
        userType : '',
        optionUser:[
            {value : '0',lable : '内部用户'},
            {value : '1',lable : '外部用户'},
            {value : '-1',lable : '管理员'},
        ],
        orgControl : false,
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        options : [],
        genre : '',
        value6 : [],
        options6 : [],
        value9 : [],
        options4 : [],
        options1 : [],
        options5: [],
        value10: [],
        buloneName : '请输入姓名关键字',
        value1 : '',
        list : [],
        loading : false,
        product:{
          userName : '',
          password : '',
          full_name : '',
        },
        message :'',
        constrol : false,
        aid : ''
      }
    },
    created(){
      this.asideGet()
    },
    watch:{
      selected(newAid,oldAid){
        this.getnewRole()
        this.getnewGroup(newAid)
        this.roleGet();
        this.groupeditGet();
        this.constrol = false;
        this.message = ''
      },
      userType(newid,oldid){
        if(newid == 1){
          this.ekeyControl = true
        }else{
          this.ekeyControl = false
        }
        if(newid == '0' || newid == '-1' ){
          this.orgMast = true;
        }else{
          this.orgMast = false;
        }
      },
    },
    methods:{
      backAdd(){
        this.$router.go(-1)
      },
      referadd(){
        if(this.addControl == true){
          this.addControl = false;
          var data = this.product;
          if(this.userType != 1){
            this.dynamicTags = [];
            data.sslCert = '' ;
          }else{
            var res = ''
            for(var i = 0; i<this.dynamicTags.length; i++){
              res = res + this.dynamicTags[i] + ','
            }
              data.sslCert = ',' + res;
          }
          data.userType = this.userType;
          if( this.value1 == ''){
            data.pid = 0
          }else{
            data.pid = this.value1;
          }
          var ridData = [];
          for(var i = 0 ; i<this.selectedrole.length; i++){
            ridData.push(this.selectedrole[i].rid)
          }
          data.rids =  ridData.join(',');
          var gidData = [];
          for(var i = 0 ; i<this.selectedgroup.length; i++){
            gidData.push(this.selectedgroup[i].gid)
          }
          data.gids =  gidData.join(',');
          if(data.userType == '' || data.userType == null ){
            this.constrol = true
            this.message = '用户类型不能为空'
            this.addControl = true;
            return false
          }
          if(data.userType == '0' || data.userType == '-1'){
            if(data.pid == '' || data.pid ==  null){
              this.constrol = true
              this.message = '所属人员不能为空'
              this.addControl = true;
               return false
            }
          }
          if(  this.selected == [] || this.selected == '' || this.selected == null ){
            this.constrol = true
            this.message = '应用系统不能为空'
            this.addControl = true;
          }
          else if(data.userName.trim() == '' || data.userName == null){
            this.constrol = true
            this.message = '用户名不能为空'
            this.addControl = true;
          }
          else if(data.userType == 1 && this.dynamicTags.length == 0){
            this.constrol = true
            this.message = 'ekey不能为空'
            this.addControl = true;
          }
          else if(data.password.trim() == '' || data.password == null){
            this.constrol = true
            this.message = '密码不能为空'
            this.addControl = true;
          }
          else if(data.full_name.trim() == '' || data.full_name == null){
            this.constrol = true
            this.message = '昵称不能为空'
            this.addControl = true;
          }
          else if(this.fundationeditUserControladd == true || this.fundationeditPasswordControladd == true){
            this.constrol = true
            this.message = '请注意输入格式'
            this.addControl = true;
          }
          else{
            var aidsData = [];
            for(var i = 0 ; i<this.selected.length; i++){
              aidsData.push(this.selected[i].aid)
            }
            data.aids = aidsData.join(',');
            var aa = JSON.stringify(data)
            var url  = '/uums_mgr/user/add';
            this.$http.post(url,aa,{emulateJSON:true}).then(res=>{
              var passData = JSON.parse(res.bodyText)
              if(passData.result == 'appRepeat'){
                this.$message.error('添加失败,用户名已存在该用户系统')
                this.addControl = true;
              
              }else if(passData.result == 'success'){
                this.$message({
                  message : '添加成功',
                  type : 'success'
                });
                this.addControl = true;
              }else{
                this.$message.error('添加失败,')
                this.addControl = true;
              }
              this.buloneName = '请输入姓名关键字'
              this.constrol = true
              this.$router.push('/userControl/-1');
            },res=>{
              this.$message.error('添加失败')
              this.addControl = true;
            })
          }
        }else{
          return false
        }
      },
     
        
  

      fundationeditPassword(){
        if(this.product.password== '' || this.product.password == null){
          return false
          this.fundationeditPasswordControladd = false
        }else{
          var data = this.product.password.split('')
          if(data.length > 50){
            this.fundationeditPasswordControladd = true;
          }else{
            this.fundationeditPasswordControladd = false
          }
        }
      },

      userAddname(){
        if(this.product.userName == '' || this.product.userName == null){
          return false
        }else{
        var s = /^[A-Za-z0-9_-]*$/g;
          if(s.test(this.product.userName)){
            this.fundationeditUserControladd = false
          }else{
            this.fundationeditUserControladd = true
          }
        }
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
        this.optionSelectrole = []
        if( this.selected.length == 0 ){
          this.optionSelectrole  = []
        }else{
          var dataArr = [];
          console.log(this.selected)
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
        this.optionSelectgroup = [];
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
      remoteMethod1(query) {
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
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      asideGet(){
        this.getOrg.getOrgOption().then(res=>{
          this.optionSelect = res.body
        },res=>{
        })
      },
    }
  }
</script>

<style>
  .userAddAll .el-input__inner{
    height : 30px
  }
  .userAddAll .el-input{
    margin-bottom: 0px; 
  }
</style>

<style scoped>
  .fundationeditUseradd{
    height: 30px;
    line-height:30px;
    font-size: 12px;
    color: red;
    text-indent: 5px;
    text-align: left;
  }
  .fundationediPassWordadd{
    height: 30px;
    line-height:30px;
    font-size: 12px;
    color: red;
    text-indent: 5px;
    text-align: left;
  }
  .addUserTypevue{
    width : 100%;
    height : 30px;
  }
  .userAddLable .userAdded{
    float: left;
    width: 410px;
  }
  .info{
    text-align : center;
    color : red;
  }
  .peopleBone1{
    width : 100%;
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
    height: 30px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .infouseradd{
    color : red;
    padding-left : 36%;
  }
</style>
