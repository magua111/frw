<template>
  <div class="body teacher userAddAll groupAll">
    <ol class="breadcrumb">
      <li>用户组管理</li>
      <li class="active">组用户添加</li>
    </ol>
    <div class="teacher-add">
      <form class="form-horizontal col-md-offset-2">
        <div class="form-group">
          <label for="" class="col-md-3 control-label">所属人员</label>
          <div class="col-md-4">
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
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label userAddLable">用户名</label>
          <div class="col-md-4">
            <el-select v-model="genre"  :disabled='disableControl' clearable placeholder="请先选择所属人员" class='userGroupaddTwo'>
              <el-option
                v-for="item in optionsadd"
                :key="item.uid"
                :label="item.userName"
                :value="item.uid">
              </el-option>
            </el-select>
          </div>
        </div>
        <div v-if='constrol' class='addUserinfo'>
          <span>{{message}}</span>
        </div>
        <div class="form-group">
          <div class="col-md-7">
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
        optionSelectrole : [],
        selectedrole : [],
        optionSelectgroup : [],
        selectedgroup : [],
        userType : '',
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
        disableControl : true,
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
        aid : '',
        optionsadd : '',
        genre : '',
      }
    },  

    created(){
      this.aid = this.$route.params.id;
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
      },
      value1(newValue,oldValue){
       if(newValue == '' || newValue == null){
         this.disableControl = true;
       }else{
         this.getUserName()
         this.disableControl = false;
       }
      }
    },
    methods:{
      backAdd(){
        this.$router.go(-1)
      },
      referadd(){
        if(this.addControl == true){
          this.addControl = false;
          var data = {};
          data.gid  = this.aid
          data.uid  = this.genre;
          var dataNew = JSON.stringify(data)
          if(data.gid  == null || data.gid == '' ||  data.uid == null ||  data.uid  == ''){
            this.constrol = true
            this.message = '请选择用户名'
            this.addControl = true;
          }else{
            var url  = '/uums_mgr/user/addUserToUGroup';
            this.$http.post(url,dataNew,{emulateJSON:true}).then(res=>{
              if(res.bodyText == 'true'){
                this.$message({
                  message : '添加成功',
                  type : 'success'
                });
                this.addControl = true;
              }else{
                this.$message.error('添加失败')
                this.addControl = true;
              }
              this.$router.push('/userGroupside/foundationGroup/' +this.aid);
            },res=>{
              this.$message.error('添加失败')
              this.addControl = true;
            })
          }
        }else{
          return false
        }
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
      getUserName(){
        var url = '/uums_mgr/user/findUsersByPid?pid=' + this.value1
        this.$http.get(url).then(res=>{
          this.optionsadd = res.body
        },res=>{
        })
      },
    }
  }
</script>

<style>
  .el-input__inner {
    height: 30px;
  }
  .groupAll .el-input{
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

  .userAddLable .userAdded{
    float: left;
    width: 410px;
  }
  .addUserinfo{
    text-align : center;
    color : red;
    padding-right : 323px;

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
  .userGroupaddTwo{
    width : 100%;
  }
</style>
