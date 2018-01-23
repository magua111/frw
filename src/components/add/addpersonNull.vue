<template>
  <div class="body teacher">
    <ol class="breadcrumb">
      <li><a href="javascript:;">用户管理</a></li>
      <li class="active">用户添加</li>
    </ol>
    <div class="teacher-add">
      <form class="form-horizontal col-md-offset-2">
        <div class="form-group">
          <label for="" class="col-md-3 control-label">姓名</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.fullName'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">工号</label>
          <div class="col-md-4">
            <input type="tsxt" class="form-control input-sm" v-model='product.pCode'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">域账号</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.password'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">个人手机号</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.workMobile'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">生日</label>
          <div class="col-md-4">
            <el-date-picker
              v-model="birtyday"
              type="date"
              id='dataChose'
              format='yyyy-MM-dd'
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">家庭住址</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.address'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">邮政编码</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.postalcode'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">户口所在地</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.permanreside'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">个人手机号</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.homeMobile'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">家庭电话</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.homePhone'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">CDMA手机号</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.workMobile'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">工作电话</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.workPhone'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">电子邮箱</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.email'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">参加工作日期</label>
          <div class="col-md-4">
            <el-date-picker
              v-model="joinworkdate"
              type="date"
              id='dataChose1'
              format='yyyy-MM-dd'
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">政治面貌</label>
          <el-select v-model="product.polity" clearable placeholder="请选择政治面貌" class='localchosename fl'>
            <el-option
              v-for="item in optionsPolity"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="col-md-4">
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">进所日期</label>
          <div class="col-md-4">
            <el-date-picker
              v-model="joinsysdate"
              type="date"
              id='dataChose1'
              format='yyyy-MM-dd'
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">所属机构</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='deptName' readonly>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">职务名称</label>
          <div class="col-md-4">
            <select class='localchose fl' v-model='full_name'>
              <option :value= 'list.poCode' v-for='list in lists'>{{list.poName}}</option>
            </select>
          </div>
        </div>
        <div v-show='constrol' class='info'>
          <span>{{message}}</span>
        </div>
        <div class="form-group">
          <div class="col-md-7 addpersonbut">
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
        birtyday : '',
        joinsysdate : '',
        optionsPolity : [
          {
            label : '中共党员',
            value : '1'
          },
          {
            label : '民主党派',
            value : '2'
          },
          {
            label : '群众',
            value : '3'
          },
          {
            label : '其他',
            value : '4'
          },

        ],
        full_name : '',
        deptName : '',
        product:{
          fullName : '',
          pCode : '',
          email : '',
          workMobile : '',
          password : '',
        },
        oid : '',
        joinsysdate : '',
        joinworkdate : '',
        birtyday : '',
        message :'',
        constrol : false,
        lists : [],
        pickerOptions0: {
          disabledDate(time) {
          }
        },
      }
    },
    created(){
      this.oid = this.$route.params.id;
      var url = '/uums_mgr/position/pagePositions'
      this.deptName = this.$store.state.name
      this.$http.get(url).then(res=>{
        this.lists = res.body.content;
      },res=>{
      })
    },
    computed:{
      authore(){
        this.deptName = this.$store.state.name
      },
    },
    methods:{
      turnDate(d){
        var date = /[a-z]/i;
        var newDate = date.test(d);
        if(newDate == true){
          return  d.getFullYear() + '-' + (d.getMonth() + 1 ) + '-' + d.getDate()
        }else{
          return d;
        }
      },
      refer(){
        var data = this.product;
        data.birtyday = this.turnDate(this.birtyday)
        data.joinsysdate = this.turnDate(this.joinsysdate)
        data.joinworkdate = this.turnDate(this.joinworkdate)
        data.poCode = this.full_name;
        data.oid = this.oid;
        var aa = JSON.stringify(data)
        var url  = '/uums_mgr/person/add';
        console.log(url)
        this.$http.post(url,aa,{emulateJSON:true}).then(res=>{
          if(res.body.result == 'success'){
          this.$router.push('/centeryData/personlist');
        }
        this.constrol = true;
        },res=>{
        })
      }
    }
  }
</script>

<style>
  .info{
    text-align : center;
    color : red;
  }
  .addpersonbut{
    margin-top : 60px;
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
  .localchosename{
    position: absolute;
    left: 590px;

  }
</style>
