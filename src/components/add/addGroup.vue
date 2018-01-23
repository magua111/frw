<template>
  <div class="body teacher userAddAll">
    <ol class="breadcrumb">
      <li>应用管理</li>
      <li>用户组管理</li>
      <li class="active">用户组添加</li>
    </ol>
    <div class="teacher-add">
      <form class="form-horizontal col-md-offset-2">
        <div class="form-group">
          <label for="" class="col-md-3 control-label">系统名称</label>
          <div class="col-md-5">
            <el-select v-model="genre" clearable placeholder="请选择系统" class='fl roleClass'>
              <el-option
                v-for="item in options"
                :key="item.aid"
                :label="item.name"
                :value="item.aid">
              </el-option>
            </el-select>
          </div>
          <div class='userGroupsideTitleadd' >
            <span class='star'>*</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">组标识</label>
          <div class="col-md-5">
            <input type="text" class="form-control input-sm" v-model='groupId'>
          </div>
          <div class='userGroupsideTitleadd'>
            <div v-if='userGroupsideTitleControladd==true'>
              <span class='glyphicon glyphicon-remove' >{{grouponly}}</span>
            </div>
            <span class='star' v-else>*</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">组名称</label>
          <div class="col-md-5">
            <input type="text" class="form-control input-sm" v-model='product.groupName'>
          </div>
          <div class='userGroupsideTitleadd' >
            <span class='star'>*</span>
          </div>
        </div>
        <div class="form-group" >
          <label for="" class="col-md-3 control-label">角色</label>
          <div class="col-md-5">
            <v-select multiple :options="optionSelectrole"  v-model="selectedrole" label="roleName" value='rid'></v-select>
          </div>
        </div>
        <div v-show='constrol' class='infoaddGroup'>
          <span>{{message}}</span>
        </div>
        <div class="form-group">
          <div class="col-md-8">
            <button class="btn btn-success btn-sm addButAll"  v-on:click.prevent='refer()'>添 加</button>
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
        userGroupsideTitleControladd : false,
        optionSelectrole : [],
        selectedrole : [],
        product:{
          aid : '',
          groupId : '',
          groupName : '',
          name : '',
          guid : '',
          aid : '',
        },
        message :'',
        genre : '',
        options : [],
        constrol : false,
        value9 : [],
        options4 : [],
        list : [],
        loading : false,
        orgControl : false,
        grouponly : '',
        groupId : '',
      }
    },
    watch:{
      genre(newAid,oldAid){
        this.getnewRole()
        this.orgControl = true;
        this.roleGet();
        this.constrol = false;
        this.message = ''
      },
      groupId(a,b){
        this.groupOnly(a)
      }
    },
    created(){
      this.aid = this.$router.history.current.params.id
      this.asideGet()
    },
    methods:{
      backAdd(){
        this.$router.go(-1)
      },
       //  组标识限制
      userGroupsideTitleadd(a){
        if(a == '' || a == null){
          return false
          this.userGroupsideTitleControladd = false
        }else{
          var s = /^[A-Za-z0-9_-]*$/g;
          if(s.test(a)){
            this.userGroupsideTitleControladd = false
            this.grouponly  =  ''
          }else{
            this.userGroupsideTitleControladd = true
            this.grouponly  =  '数字字母下划线连接符组成'
          }
        }
      },
      //  组表示唯一性
      groupOnly(a){
        var url = '/uums_mgr/uGroup/groupId'
        var data = {};
        data.groupId = a
        this.$http.post(url,data,{emulateJSON:true}).then(res=>{
          if(res.body == true){
            this.userGroupsideTitleControladd = false
            this.grouponly = ''
            this.userGroupsideTitleadd(a)
          }else{
            this.userGroupsideTitleControladd = true
            this.grouponly = '组标识已存在'
          }
        },res=>{
          this.userGroupsideTitleControladd = true
          this.grouponly = '组标识已存在'
        })
      },
      // 添加确定
      refer(){
        this.addControl = false;
        var data = {};
        data.groupName = this.product.groupName
        data.groupId = this.groupId
        data.aid = this.genre
        var obj = []
        for(var i = 0; i<this.selectedrole.length;i++){
          var objRol = {};
          objRol.rid = this.selectedrole[i].rid;
          obj.push(objRol)
        }
        data.roles = obj
        if(this.genre == ''){
          this.constrol = true
          this.message = '应用系统不能为空'
          this.addControl = true
        }
        else if(data.groupId.trim() == ''){
          this.constrol = true
          this.message = '组标识不能为空'
          this.addControl = true
        }
        else if(data.groupName.trim() == ''){
          this.constrol = true
          this.message = '组名称不能为空'
          this.addControl = true
        }
        else if(this.userGroupsideTitleControladd == true){
          this.constrol = true
          this.message = '请注意格式'
          this.addControl = true
        }
        else if(this.addDo == false){
          return false;
        }
        else{
          var newdata = JSON.stringify(data)
          var url  = '/uums_mgr/uGroup/add';
          this.$http.post(url,newdata,{emulateJSON:true}).then(res=>{
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
            this.constrol = false
            this.message = ''
            this.$router.push('/userGroupside');
          },res=>{
            this.$message.error('添加失败')
            this.addControl = true
          })
        }
      },
      getnewRole(){
        var url  = '/uums_mgr/role/findRolesByAidsAndRids';
        var data = {};
        var dataaid = [];
        var datarid = [];
        if(this.genre.length == 0){
          this.selectedrole = [];
        }else{
          for(var i = 0; i<this.genre.length ; i++){
            dataaid.push(this.genre[i].aid)
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

      // 动态获取role的options
      roleGet(){
        this.optionSelectrole = [];
        if( this.genre.length == 0 ){
          this.optionSelectrole  = []
        }else{
          var dataArr = [];
          dataArr.push(this.genre)
          var newArr = JSON.stringify(dataArr)
          var url  = '/uums_mgr/role/findRolesByAids';
          this.$http.post(url,newArr,{emulateJSON:true}).then(res=>{
            this.optionSelectrole = res.body
          },res=>{
          })
        }
      },
      // 获取系统options
      asideGet(){
        this.getOrg.getOrgOption().then(res=>{
          this.options = res.body
        },res=>{
        })
      },
    }
  }
</script>


<style>
  .el-input__inner{
    height : 30px;
  }
</style>

<style scoped>
  .userGroupsideTitleadd{
    height: 30px;
    line-height:30px;
    font-size: 12px;
    color: red;
    text-indent: 5px;
    text-align: left;
  }
  
  .info{
    text-align: center;
    color: red;
    position: absolute;
    width: 275px;
    left: 590px;
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
  .btn-sm, .btn-group-sm > .btn {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
    margin-top: 23px;
  }
  .roleClass{
    width: 100% ;
  }
  .infoaddGroup{
    color : red;
    padding-left : 36%;
  }
</style>
