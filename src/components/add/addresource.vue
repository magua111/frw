<template>
  <div class="body teacher addresourceAll userAddAll">
    <!-- 面包屑 -->
    <ol class="breadcrumb">
      <li>数据管理 </li>
      <li>资源管理</li>
      <li class="active">资源添加</li>
    </ol>
    <div class="teacher-add">
      <form class="form-horizontal col-md-offset-2" >
        <div class="form-group" v-if='oidControl'>
          <label for="" class="col-md-3 control-label">系统选择</label>
          <div class="col-md-5">
            <el-select v-model="value10" clearable placeholder="请选择应用系统" class='fl widthAll2'>
              <el-option
                v-for="item in options5"
                :key="item.aid"
                :label="item.name"
                :value="item.aid">
              </el-option>
            </el-select>
          </div>
          <div class='resControladdTitle'>
            <span class='star'>*</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">代码</label>
          <div class="col-md-5">
            <input type="text" class="form-control input-sm" v-model='product.resourceCode' v-on:blur='resControladdTitle'>
          </div>
          <div class='resControladdTitle'>
            <div  v-if='resControladdTitleTitleControl == true'>
              <span class='glyphicon glyphicon-remove'>字母下划线连接符组成</span>
            </div>
            <span class='star' v-else>*</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="" class="col-md-3 control-label">名称</label>
          <div class="col-md-5">
            <input type="text" class="form-control input-sm" v-model='product.resourceName'>
          </div>
          <div class='resControladdTitle'>
            <span class='star'>*</span>
          </div>
        </div>

        <div class="form-group">
          <label for="" class="col-md-3 control-label">URI描述</label>
          <div class="col-md-5">
            <input type="text" class="form-control input-sm" v-model='product.uri' v-on:blur='resControladdurlTitle'>
          </div>
          <div class='resControladdTitle'>
            <div  v-if='resControladdurlTitleControl == true'><span class='glyphicon glyphicon-remove'>长度在100以内</span>
            </div>
            <span class='star' v-else>*</span>
          </div>
        </div>

        <div class="form-group">
          <label for="" class="col-md-3 control-label">资源类型</label>
          <div class="col-md-5">
            <el-select v-model="genre" placeholder="请选择资源类型" class='fl resAaddType'>
              <el-option
                v-for="item in options9"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
          <div class='resControladdTitle'>
            <span class='star'>*</span>
          </div>
        </div>

        <div class="form-group">
          <label for="" class="col-md-3 control-label">操作类型</label>
          <div class="col-md-5">
            <v-select multiple :options="optionsDo"  v-model="valueDo" label="name" value='code' class='resAdddo'></v-select>
          </div>
          <div class='resControladdTitle'>
            <span class='star'>*</span>
          </div>
        </div>

        <div v-if='control' class='infoaddresourse'>
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
        resControladdTitleTitleControl : false,
        resControladdurlTitleControl : false,
        product:{
          resourceCode : '',
          resourceName : '',
          uri : '',
        },
        message :'',
        genre : '',
        options : [],
        control : false,
        value9 : [],
        options4 : [],
        list : [],
        loading : false,
        options9 : [],
        value10 : '',
        options5 : [],
        valueDo :[],
        optionsDo : [],
        oidControl : false,
        aidPass : '',
        passPeid : '',
        parentId : '',
      }
    },
    created(){
      this.resourcefun()
      this.asideGet()
      this.passPeid = this.$router.history.current.params.id
      this.aidPass = this.$router.history.current.params.aid
      this.parentId = this.$router.history.current.params.partneId
      console.log(this.parentId)
      if(this.aidPass == 0){
        this.oidControl = true;
      }else{
        this.oidControl = false;
      }
      this.rescourseDo()
    },
    methods:{
      backAdd(){
        this.$router.go(-1)
      },
      resControladdurlTitle(){
        if(this.product.uri == '' || this.product.uri == null){
            return false
            this.resControladdurlTitleControl = false
        }else{
            var data = this.product.uri.split('')
          if(data.length > 100){
            this.resControladdurlTitleControl = true;
          }else{
            this.resControladdurlTitleControl = false
          }
        }
      },

      resControladdTitle(){
        if(this.product.resourceCode == '' || this.product.resourceCode == null){
          return false
          this.resControladdTitleTitleControl = false
        }else{
           this.resControladdTitleTitleControl = this.validate.domainUserFun(this.product.resourceCode)
        }
      },

      resourcefun(){
        var url  = '/uums_mgr/type/findAll';
        this.$http.get(url).then(res=>{
           this.options9 = res.body
        },res=>{
        })
      },

      asideGet(){
       this.getOrg.getOrgOption().then(res=>{
           this.options5 = res.body
        },res=>{
        })
      },

      rescourseDo(){
        var data = [];
        this.optionsDo = [];
        var url  = 'uums_mgr/resource/findOperations?parentid=' + this.parentId;
        this.$http.get(url).then(res=>{
          var resData = res.body
          if(resData == null){
            resData = [];
            this.optionsDo = []
          }else{
            for(var i = 0 ; i<resData.length;i++){
              var resName = resData[i]
              var passData = {}
              passData.name = resName[0]
              passData.code = resName[1]-0
              data.push(passData)
            }
            this.optionsDo = data   
          }
        },res=>{
        })
      },

      refer(){
        var data = this.product;
        if(this.oidControl == true){
          data.aid = this.value10
        }else{
          data.aid = this.aidPass;
        }
        data.typeCode = this.genre
        data.parentid = this.passPeid  
        data.operationCodes = []
        for(var i = 0 ; i<this.valueDo.length;i++){
          data.operationCodes.push(this.valueDo[i].code)
        }
        data.operationCodes = data.operationCodes.join(',')
        var newdata = JSON.stringify(data)
        if( data.aid == '' ||  data.aid == null ){
          this.control  = true;
          this.message = '应用系统不能为空'
        }
        else  if( data.resourceCode.trim() == '' ||  data.resourceCode== null ){
          this.control  = true;
          this.message = '代码不能为空'
        }
        else if( data.resourceName.trim() == '' ||  data.resourceName== null ){
          this.control  = true;
          this.message = '名称不能为空'
        }
        else if( data.uri == '' ||   data.uri == null ){
          this.control  = true;
          this.message = 'URL描述不能为空'
        }
        else if( this.genre == '' ||  this.genre == null ){
          this.control  = true;
          this.message = '资源类型不能为空'
        }
        else if( this.valueDo == '' ||   this.valueDo == null ){
          this.control  = true;
          this.message = '操作类型不能为空'
        }
        else if( this.resControladdurlTitleControl == true  || this.resControladdTitleTitleControl == true ){
          this.control  = true;
          this.message = '请注意输入格式'
        }
        else{
          var url  = '/uums_mgr/resource/add';
          console.log(newdata)
          this.$http.post(url,newdata,{emulateJSON:true}).then(res=>{
            var passData = JSON.parse(res.bodyText)
            if(passData.result == 'success'){
              this.$message({
                message : '添加成功',
                type : 'success'
              });
            }else{
              this.$message.error('添加失败')
            }
            this.constrol = false
            this.$router.push('/resControl');
            },res=>{
            this.$message.error('添加失败')
          })
        }
      }
    }
  }
</script>

<style>
  .addresourceAll .el-input {
    margin-bottom: 0px; 
  }

</style>


<style scoped>
  .resControladdTitle{
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
  .infoaddresourse{
    color : red;
    padding-left : 36%;
  }
  .resAaddType{
    width: 100%;
  }
  .widthAll2{
    width:100%;
  }
  .resAdddo{
    width:100%;
  }
</style>
<style>
  .el-input__inner{
    height : 30px;
  }
</style>
