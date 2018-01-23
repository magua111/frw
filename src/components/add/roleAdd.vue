<template>
  <div class="body teacher userAddAll roleAll">
    <ol class="breadcrumb">
      <li>数据管理</li>
      <li>角色管理</li>
      <li class="active">角色添加</li>
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
          <div class='roleTitleadd'>
            <span class='star'>*</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">角色标识</label>
          <div class="col-md-5">
            <input type="text" class="form-control input-sm" v-model='roleId'>
          </div>
          <div class='roleTitleadd' >
            <div  v-if='roleTitleaddControladd==true'><span class='glyphicon glyphicon-remove'>{{roleonly}}</span>
            </div>
            <span class='star' v-else>*</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">角色名称</label>
          <div class="col-md-5">
            <input type="text" class="form-control input-sm" v-model='roleName'>
          </div>
          <div class='roleTitleadd' >
            <span class='star'>*</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">组名称</label>
          <div class="col-md-5">
            <v-select multiple :options="optionSelectgroup"  v-model="selectedgroup" label="groupName" value='gid'></v-select>
          </div>
        </div>
        <div v-if='constrol' class='infoRoleadd'>
          <span>{{message}}</span>
        </div>
        <div class="form-group role_addbot">
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
        roleId : '',
        roleName : '',
        optionSelectgroup : [],
        selectedgroup : [],
        value18 : [],
        message :'',
        genre : '',
        showControl : false,
        options : [],
        constrol : false,
        list : [],
        optionsGroup : [],
        loading : false,
        roleTitleaddControladd : false,
        roleonly : '',
      }
    },
    created(){
      this.asideGet()
    },
    watch:{
      genre(newAid,oldAid){
        this.groupeditGet()
        this.getnewGroup(newAid)
        this.showControl = true;
        this.constrol = false;
        this.message = ''
      },
      roleId(a,b){
        this.roleOnly(a)
      }

    },
    methods:{
      backAdd(){
        this.$router.go(-1)
      },
      roleTitleadd(a){
         if(a== '' || a== null){
           this.roleTitleaddControladd = false
           this.roleonly = ''
           return false
         }else{
           var s = /^[A-Za-z0-9_-]*$/g;
           if(s.test(a)){
             this.roleTitleaddControladd = false
             this.roleonly = ''
           }else{
             this.roleTitleaddControladd = true
             this.roleonly = '数字字母下划线连接符组成'
           }
         }
       },

      roleOnly(a){
          var url = '/uums_mgr/role/roleId'
          var data = {};
          data.roleId = a
          this.$http.post(url,data,{emulateJSON:true}).then(res=>{
            if(res.body == true){
              this.roleTitleaddControladd = false
              this.roleonly = ''
              this.roleTitleadd(a)
            }else{
              this.roleTitleaddControladd = true
              this.roleonly = '角色标识已存在'
            }
          },res=>{
            this.roleTitleaddControladd = true
            this.roleonly = '角色标识已存在'
          })
      },

      refer(){
        if(this.addControl == true){
          this.addControl = false;
          this.constrol = false;
          var data = {};
          data.aid = this.genre;
          data.roleId = this.roleId;
          data.roleName = this.roleName
          var obj = []
          for(var i = 0; i<this.selectedgroup.length;i++){
            var objRol = {};
            objRol.gid = this.selectedgroup[i].gid;
            obj.push(objRol)
          }
          data.uGroups = obj
          if( data.roleId.trim() == '' || data.roleId.trim == null){
            this.constrol = true
            this.message = '角色标识不能为空'
            this.addControl = true;
          }
          else if(this.genre == '' || this.genre == null){
            this.constrol = true
            this.message = '系统名称不能为空'
            this.addControl = true;
          }
          else if( data.roleName.trim() == '' || data.roleName.trim == null){
            this.constrol = true
            this.message = '角色名称不能为空'
            this.addControl = true;
          }
          else if( this.roleTitleaddControladd == true){
            this.constrol = true
            this.message = '请注意格式'
            this.addControl = true;
          }
          else{
            var newdata = JSON.stringify(data)
            var url  = '/uums_mgr/role/add';
            this.$http.post(url,newdata,{emulateJSON:true}).then(res=>{
              if(res.bodyText == 'success'){
                this.$message({
                  message : '添加成功',
                  type : 'success'
                });
                this.addControl = true;
              }else{
                this.$message.error('添加失败')
                this.addControl = true;
              }
              this.constrol = false
              this.message = ''
            this.$router.push('/role');
            },res=>{
              this.$message.error('添加失败')
              this.addControl = true;
            })
          }
        }else{
          return false
        }
      },
      asideGet(){
        this.getOrg.getOrgOption().then(res=>{
          this.options = res.body
        },res=>{
        })
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
        if( this.genre.length == 0 ){
          this.optionSelectgroup = []
        }else{
          var dataArr2 = [];
          dataArr2.push(this.genre)
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
    }
  }
</script>
<style>
  .el-input__inner{
    height : 30px;
  }
  .roleAll .el-input{
    margin-bottom: 0px; 
  }


</style>
<style scoped>
  .el-input__inner{
    height : 30px;
  }
  .roleTitleadd{
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
    height: 30px;
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
  .role_addbot{
    margin-bottom : 50px;
  }
  .infoRoleadd{
    color : red;
    padding-left : 36%;
  }
</style>
