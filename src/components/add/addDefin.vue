<template>
  <div class="body teacher">
    <ol class="breadcrumb">
      <li><a href="javascript:;">系统管理</a></li>
      <li >基础数据管理</li>
      <li class="active">资源类型添加</li>
    </ol>
    <div class="teacher-add">
      <form class="form-horizontal col-md-offset-2">
        <div class="form-group">
          <label for="" class="col-md-3 control-label">名称</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.name'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">代码</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.code'>
          </div>
        </div>
        <div v-show='constrol' class='info'>
          <span>{{message}}</span>
        </div>
        <div class="form-group">
          <div class="col-md-7">
            <button class="btn btn-success btn-sm pull-right"  v-on:click.prevent='refer()'>添 加</button>
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
        product:{
        },
        message :'',
        constrol : false
      }
    },
    methods:{
      // 添加确定函数
      refer(){
        var data = this.product;
        var edData = JSON.stringify(data)
        var url  = '/uums_mgr/type/add';
        this.$http.post(url,edData,{emulateJSON:true}).then(res=>{
        this.$router.push('/bassData/definition')
        },res=>{
        })
      }
    }
  }
</script>

<style scoped>
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
</style>
