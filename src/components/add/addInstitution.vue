<template>
  <div class="body teacher addAllb">
    <ol class="breadcrumb">
      <li>系统管理</li>
      <li>机构管理</li>
      <li class="active">机构添加</li>
    </ol>
    <div class="teacher-add">
      <form class="form-horizontal col-md-offset-2">
        <div class="form-group">
           <label for="" class="col-md-3 control-label">机构名称</label>
           <div class="col-md-5">
             <input type="text" class="form-control input-sm" v-model='product.deptName'>
           </div>
           <div class='deptOrderAddfit' >
            <span class='star' >*</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="" class="col-md-3 control-label">机构代码</label>
          <div class="col-md-5">
            <input type="text" class="form-control input-sm" v-model='product.deptCode'>
          </div>
          <div class='deptOrderAddfit' >
            <span class='star' >*</span>
          </div>
        </div>
        <div class="form-group">
           <label for="" class="col-md-3 control-label">机构类型</label>
           <div class="col-md-5">
             <el-select v-model="deptType" clearable placeholder="请选择部门类型" class='dateChose '>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
             </el-select>
           </div>
          <div class='deptOrderAddfit' >
            <span class='star' >*</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">内序</label>
          <div class="col-md-5">
            <input type="text" class="form-control input-sm" v-model='product.deptOrder' v-on:blur='deptOrderAddfit'>
          </div>
          <div class='deptOrderAddfit' >
            <div v-if='deptOrderAddfitControl == true'>
              <span class='glyphicon glyphicon-remove'>请输入四位以内数字</span>
            </div>
            <span class='star' v-else>*</span>
          </div>
        </div>
        <div class="form-group">
           <label for="" class="col-md-3 control-label">公司名称</label>
           <div class="col-md-5">
             <input type="text" class="form-control input-sm" v-model='product.corpName'>
           </div>
           <div class='deptOrderAddfit' >
            <span class='star' ></span>
          </div>
        </div>
        <div class="form-group">
           <label for="" class="col-md-3 control-label">机构简称</label>
           <div class="col-md-5">
             <input type="text" class="form-control input-sm" v-model='product.deptAbbr'>
           </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">成立日期</label>
          <div class="col-md-5">
            <el-date-picker
              class='dateChose'
              v-model="createdate"
              type="date"
              id='dataChose'
              format='yyyy-MM-dd'
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
        </div>
        <div  class='info'>
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
        deptOrderAddfitControl : false,
        createdate : '',
        product:{
        deptName: '',
        deptAbbr: '',
        deptCode: '',
        dateChose: '',
        deptType: '',
        deptOrder: '',
        },
        options: [{
          value: '1',
          label: '公司'
        }, {
          value: '2',
          label: '部门'
        }, {
          value: '3',
          label: '社团'
        }, {
          value: '4',
          label: '待定'
        }],
        deptType : '',
        message :'',
        constrol : false,
        aid : '',
        pickerOptions0: {
          disabledDate(time) {
          }
        }
      }
    },
    created(){
      this.aid = this.$router.history.current.params.id
    },
    methods:{
      backAdd(){
        this.$router.go(-1)
      },
      // 内序限制
      deptOrderAddfit(){
        this.deptOrderAddfitControl = this.validate.deptOrder(this.deptOrderTreeControl,this.product.deptOrder)
      },
      // 添加确定
      refer(){
        if( this.addControl == true ){
          this.addControl = false
          var data = this.product;
          data.parentid = this.aid;
          data.deptType = this.deptType;
          data.createdate = this.createdate;
          if(  data.deptName == '' ||  data.deptName == null){
            this.constrol = true;
            this.message = '机构名称不能为空'
            this.addControl = true
          }
          else if( data.deptCode == '' ||  data.deptCode == null){
            this.constrol = true;
            this.message = '机构代码不能为空'
          }
          else if( this.deptType == '' ||  this.deptType == null){
            this.constrol = true;
            this.addControl = true
            this.message = '机构类型不能为空'
          }
          else if( data.deptOrder == '' ||  data.deptOrder == null){
            this.constrol = true;
            this.addControl = true
            this.message = '内序不能为空'
          }
          else if( this.deptOrderAddfitControl == true ){
            this.constrol = true;
            this.addControl = true
            this.message = '请注意输入格式'
          }
          else{
            this.constrol = false;
            this.message = ''
            var newdata = JSON.stringify(data)
            var url  = '/uums_mgr/org/add';
            this.$http.post(url,newdata,{emulateJSON:true}).then(res=>{
              if(res.bodyText == 'success'){
                this.$message({
                  message : '添加成功',
                  type : 'success'
                });
                this.$router.push('/institution/tree');
                this.addControl = true
              }else{
                  this.$message.error('添加失败')
                  this.addControl = true
              }
            },res=>{
              this.$message.error('添加失败')
              this.addControl = true
            })
          }
        }else{
          return false;
        }  
      }
    }
  }
</script>

<style scoped>
  .deptOrderAddfit{
    color:red;
    font-size : 12px;
    text-align : left;
    text-indent : 5px;
    height : 30px;
    line-height: 30px
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
  .dateChose{
    height : 30px;
    width : 100%!important;
  }
  .deptOrderTreeAdd{
    height: 30px;
    line-height:30px;
    color: red;
    font-size: 12px;
  }
</style>

<style>
 .el-input__inner{
    height : 30px;
  }
 
</style>
