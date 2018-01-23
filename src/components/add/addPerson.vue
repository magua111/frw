<template>
  <div class="body teacher addPersonlist">
    <ol class="breadcrumb">
      <li>机构管理</li>
      <li>{{this.deptName}}</li>
      <li class="active">人员添加</li>
    </ol>
    <form class="form-addpersonFit">
      <div class='addpersonFitLeft'>
        <div class='addperfitLine'>
          <div class='addpersonFitLeftleft'>姓名</div>
          <div class='addpersonFitLeftCenter'>
            <input type="text" class="form-control input-sm" v-model='product.fullName' v-on:blur='name'>
            <span class='star'>*</span>
          </div>
          <div class='addpersonFitLefbottom'>
            <div class='addperFittitle'>
            <div v-if='nameControl'><span class='glyphicon glyphicon-remove' ></span><span>{{nameMessage}}</span></div></div>
          </div>
        </div>
        <div  class='addperfitLine'>
          <div class='addpersonFitLeftleft'>工号</div>
          <div class='addpersonFitLeftCenter'>
            <input type="tsxt" class="form-control input-sm" v-model='pCode'>
            <span class='star'>*</span>
          </div>
          <div class='addpersonFitLefbottom'>
            <div class='addperFittitle' v-if='pCodeControl'><span class='glyphicon glyphicon-remove'  >{{messagePcode}}
            </span></div>
          </div>
        </div>
        <div  class='addperfitLine'>
          <div class='addpersonFitLeftleft'>分机号</div>
          <div class='addpersonFitLeftCenter'>
          <input type="text" class="form-control input-sm" v-model='product.extension' v-on:blur='extension'>
        </div>
        <div class='addpersonFitLefbottom'>
          <div class='addperFittitle'>
          <div v-if='extensionControl'><span class='glyphicon glyphicon-remove' v-if=''></span>您输入的数值有误</div></div>
        </div>
      </div>
      <div  class='addperfitLine'>
        <div class='addpersonFitLeftleft'>工作电话</div>
        <div class='addpersonFitLeftCenter'>
          <input type="text" class="form-control input-sm" v-model='product.workPhone' v-on:blur='workPhone'>
      </div>
      <div class='addpersonFitLefbottom'>
        <div class='addperFittitle'>
          <div  v-if='workPhoneControl'><span class='glyphicon glyphicon-remove' v-if=''></span>请输入座机号码且注意格式</div></div>
        </div>
      </div>
      <div  class='addperfitLine'>
        <div class='addpersonFitLeftleft'>家庭电话</div>
        <div class='addpersonFitLeftCenter'>
          <input type="text" class="form-control input-sm" v-model='product.homePhone' v-on:blur='homePhone'>
        </div>
        <div class='addpersonFitLefbottom'>
          <div class='addperFittitle'>
          <div v-if='homePhoneControl'><span class='glyphicon glyphicon-remove' v-if=''></span>请输入座机号且注意格式</div></div>
        </div>
      </div>
      <div  class='addperfitLine'>
        <div class='addpersonFitLeftleft'>电子邮箱</div>
        <div class='addpersonFitLeftCenter'>
          <input type="text" class="form-control input-sm" v-model='product.email' v-on:blur='email'>
        </div>
        <div class='addpersonFitLefbottom'>
          <div class='addperFittitle'>
            <div v-if='emailControl'><span class='glyphicon glyphicon-remove' v-if=''></span>请填写电子邮箱且注意格式</div>
          </div>
        </div>
      </div>
      <div  class='addperfitLine'>
        <div class='addpersonFitLeftleft'>家庭住址</div>
        <div class='addpersonFitLeftCenter'>
          <input type="text" class="form-control input-sm" v-model='product.address'>
        </div>
        <div class='addpersonFitLefbottom'>
          <div class='addperFittitle'></div>
        </div>
      </div>
      <div  class='addperfitLine'>
        <div class='addpersonFitLeftleft'>邮政编码</div>
        <div class='addpersonFitLeftCenter'>
          <input type="text" class="form-control input-sm" v-model='product.postalcode' v-on:blur='postalcode'>
        </div>
      <div class='addpersonFitLefbottom'>
        <div class='addperFittitle'>
          <div v-if='postalcodeControl'><span class='glyphicon glyphicon-remove' v-if=''></span>您输入的数值有误</div>
          </div>
        </div>
      </div>
      <div  class='addperfitLine'>
        <div class='addpersonFitLeftleft'>个人手机号</div>
        <div class='addpersonFitLeftCenter'>
          <input type="text" class="form-control input-sm" v-model='product.homeMobile' v-on:blur='homeMobile'>
        </div>
          <div class='addpersonFitLefbottom'>
            <div class='addperFittitle'>
            <div  v-if='homeMobileControl'><span class='glyphicon glyphicon-remove' v-if=''></span>请输入正确的手机号</div></div>
          </div>
        </div>
        <div  class='addperfitLine'>
          <div class='addpersonFitLeftleft'>CDMA手机号</div>
          <div class='addpersonFitLeftCenter'>
            <input type="text" class="form-control input-sm" v-model='product.workMobile' v-on:blur='workMobile'>
          </div>
          <div class='addpersonFitLefbottom'>
            <div class='addperFittitle'>
            <div v-if='workMobileControl'><span class='glyphicon glyphicon-remove'>请输入正确的手机号</span></div></div>
          </div>
        </div>
      </div>
      <div class='addpersonFitRight'>
          <div  class='addperfitLine'>
            <div class='addpersonFitLeftleftdomain'>户口所在地</div>
            <div class='addpersonFitLeftCenter addPersonorg'>
              <v-distpicker :province="select.province" :city="select.city" :area="select.area" @selected='onSelected'></v-distpicker>
            </div>
            <div class='addpersonFitLefbottom'>
              <div class='addperFittitle'><span class='addperFittitlePermanreside'>户口所在地请精确到区</span></div>
            </div>
          </div>
          <div  class='addperfitLine'>
            <div class='addpersonFitLeftleftdomain'>域账号</div>
            <div class='addpersonFitLeftCenter addPersonorg'>
              <input type="text" class="form-control input-sm" v-model='product.domainUser' v-on:blur='domainUser'>
            </div>
            <div class='addpersonFitLefbottom'>
              <div class='addperFittitle'>
              <div v-if='domainUserControl'><span class='glyphicon glyphicon-remove' v-if=''></span>字母下划线连接符组成</div></div>
            </div>
          </div>
          <div  class='addperfitLine'>
            <div class='addpersonFitLeftleftspale'>职级</div>
            <div class='addpersonFitLeftCenter'>
              <el-select v-model="positionState" clearable placeholder="请选择职级" class='addperFibir'>
              <el-option
                  v-for="item in option1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            </div>
            <div class='addpersonFitLefbottom'>
               <div class='addperFittitle'></div>
            </div>
          </div>
          <div  class='addperfitLine'>
            <div class='addpersonFitLeftleftspale'>参加工作日期</div>
            <div class='addpersonFitLeftCenter'>
               <el-date-picker
                v-model="joinworkdate"
                class='addperFibir'
                type="date"
                id='dataChose1'
                :editable='false'
                format='yyyy-MM-dd'
                placeholder="选择日期"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </div>
            <div class='addpersonFitLefbottom'>
              <div class='addperFittitle'></div>
            </div>
          </div>
           <div  class='addperfitLine'>
            <div class='addpersonFitLeftleftspale'>生日</div>
            <div class='addpersonFitLeftCenter'>
              <el-date-picker
                v-model="birtyday"
                class='addperFibir'
                type="date"
                id='dataChose'
                format='yyyy-MM-dd'
                :editable='false'
                placeholder="选择日期"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </div>
            <div class='addpersonFitLefbottom'>
               <div class='addperFittitle'></div>
            </div>
          </div>
          <div  class='addperfitLine'>
            <div class='addpersonFitLeftleftspale'>政治面貌</div>
            <div class='addpersonFitLeftCenter'>
               <el-select v-model="polity" clearable placeholder="请选择政治面貌" class='addperFibir'>
              <el-option
                  v-for="item in optionsPolity"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
              </el-select>
            </div>
            <div class='addpersonFitLefbottom'>
              <div class='addperFittitle'></div>
            </div>
          </div>
          <div  class='addperfitLine'>
            <div class='addpersonFitLeftleftspale'>进所日期</div>
            <div class='addpersonFitLeftCenter'>
               <el-date-picker
                v-model="joinsysdate"
                type="date"
                :editable='false'
                class='addperFibir'
                id='dataChose1'
                format='yyyy-MM-dd'
                placeholder="选择日期"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </div>
            <div class='addpersonFitLefbottom'>
              <div class='addperFittitle'></div>
            </div>
          </div>
          <div  class='addperfitLine'>
            <div class='addpersonFitLeftleftspale'>所属机构</div>
            <div class='addpersonFitLeftCenter addPersonorg'>
              <input type="text" class="form-control input-sm" v-model='deptName' readonly>
            </div>
            <div class='addpersonFitLefbottom'>
              <div class='addperFittitle'></div>
            </div>
          </div>
          <div  class='addperfitLine'>
            <div class='addpersonFitLeftleftspale'>职务名称</div>
            <div class='addpersonFitLeftCenter'>
                <el-select v-model="full_name"  placeholder="请选择职务名" class='addpersonFitFull'>
              <el-option
                  v-for="item in lists"
                  :key="item.poCode"
                  :label="item.poName"
                  :value="item.poCode">
              </el-option>
            </el-select>
            </div>
            <div class='addpersonFitLefbottom'>
               <div class='addperFittitle'></div>
            </div>
          </div>
      </div>
      <div class="addpersonAddfather">
          <button class="btn btn-success btn-sm addButAll"  v-on:click.prevent='refer()'>添 加</button>
          <button class="btn btn-primary  btn-sm addBack"  v-on:click.prevent='backAdd()'>返 回</button>
          <div v-show='contorl' class='addPersonFitTinfo'>
            <span>{{message}}</span>
          </div>
      </div>
    </form>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        addControl : true,
        nameMessage : '',
        nameControl : false,
        domainUserControl :false,
        workMobileControl :false,
        homePhoneControl :false,
        homeMobileControl :false,
        emailControl :false,
        postalcodeControl :false,
        workPhoneControl :false,
        extensionControl :false,
        pCodeControl :false,
        select : {},
        birtyday : '',
        polity : '',
        pCode : '',
        positionState : '',
        option1: [{
          value: '1',
          label: '1'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }, {
          value: '6',
          label: '6'
        }, {
          value: '7',
          label: '7'
        }, {
          value: '8',
          label: '8'
        }, {
          value: '9',
          label: '9'
        }, {
          value: '10',
          label: '10'
        }, {
          value: '11',
          label: '11'
        }, {
          value: '12',
          label: '12'
        }, {
          value: '13',
          label: '13'
        }],
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
        messagePcode : '',
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
        contorl : false,
        lists : [],
        permanreside : '',
        pickerOptions0: {
          disabledDate(time) {
          }
        },
      }
    },
    created(){
      this.deptName = this.$store.state.org =  window.localStorage.orgName
      this.oid = this.$route.params.id;
      var url = '/uums_mgr/position/pagePositions'
      this.deptName = this.$store.state.org
      this.$http.get(url).then(res=>{
          this.lists = res.body.content;
      },res=>{
      })
    },
    computed:{
      authore(){
        this.deptName = this.$store.state.name
      },
      org(){
        return this.$store.state.org
      }
    },
    watch :{
      pCode(a,b){
        this.pCodeOnly(a)
      }
    },
    methods:{
      backAdd(){
        this.$router.go(-1)
      },
      onSelected(data){
         this.permanreside = data.area.code;
      },
      name(){
        this.nameControl = this.validate.peoName(this.product.fullName).b
        this.nameMessage = this.validate.peoName(this.product.fullName).c
      },
      domainUser(){
        this.domainUserControl = this.validate.domainUserFun(this.product.domainUser)
      },
      email(){
        this.emailControl = this.validate.emailFun(this.product.email)
      },
      workMobile(){
        this.workMobileControl = this.validate.mobilPhone(this.product.workMobile)
      },
      homePhone(){ 
        this.homePhoneControl = this.validate.homePhoneFun(this.product.homePhone)
      },
      homeMobile(){
        this.homeMobileControl = this.validate.mobilPhone(this.product.homeMobile)
      },
      postalcode(){
        this.postalcodeControl  = this.validate.postalcodeFun(this.product.postalcode)
      },
      workPhone(){
        this.workPhoneControl = this.validate.homePhoneFun(this.product.workPhone)
      },
      extension(){
  //      if(this.product.extension == '' || this.product.extension == null){
  //        return false
  //      }else{
  //        var s = /^[0-9]*$/
  //        if(s.test(this.product.extension)){
  //          this.extensionControl = false
  //        }else{
  //          this.extensionControl = true
  //        }
  //      }
      },
      pCodeHun(a){
        if(a == '' ||a == null){
           this.pCodeControl = true;
           this.messagePcode = '工号不可以为空'
           return false
        }else{
            var s = /^[A-Za-z0-9_-]*$/g;
            if(s.test(a)){
              this.pCodeControl = false
              this.messagePcode = ''
            }else{
              this.pCodeControl = true
              this.messagePcode = '字母数字下划线连接符组成'
            }
        }
      },
      pCodeOnly(a){
        var url = '/uums_mgr/person/pCode'
        var data = {};
        data.pCode = a
        this.$http.post(url,data,{emulateJSON:true}).then(res=>{
          if(res.body == true){
            this.pCodeControl = false
            this.messagePcode = ''
            this.pCodeHun(a)
          }else{
            this.pCodeControl = true
            this.messagePcode = '该工号已存在'
          }
        },res=>{
            this.pCodeControl = true
            this.messagePcode = '该工号已存在'
        })
      },
      refer(){
        if(this.addControl == true){
          this.addControl = false;
          var data = this.product;
          data.pCode = this.pCode
          data.birtyday = this.validate.turnDate(this.birtyday);
          data.joinsysdate = this.validate.turnDate(this.joinsysdate);
          data.joinworkdate = this.validate.turnDate(this.joinworkdate);
          data.positionState = this.positionState;
          data.polity = this.polity;
          data.poCode = this.full_name;
          data.organizations = [];
          var oidPass= {};
          oidPass.oid = this.oid
          data.permanreside =  this.permanreside
          data.organizations.push(oidPass)
          if( data.fullName == null){
            data.fullName = ''
          }
          if( data.fullName.trim() == '' ){
            this.contorl = true;
            this.message = '姓名不能为空'
            this.addControl = true;
            return false;
          }
          else if(data.pCode == '' || data.pCode == null){
            this.contorl = true;
            this.message = '工号不能为空'
            this.addControl = true;
            return false;
          }
          else if(this.oid == '' || this.oid == null){
            this.contorl = true;
            this.message = '所属机构不能为空'
            this.addControl = true;
            return false;
          }
          else if(this.nameControl == true || this.domainUserControl == true || this.workMobileControl == true || this.homePhoneControl == true || this.homeMobileControl == true || this.emailControl == true || this.postalcodeControl == true || this.workPhoneControl == true || this.extensionControl == true || this.pCodeControl == true){
            this.contorl = true;
            this.message = '请注意输入格式'
            this.addControl = true;
            return false;
          }
          else{
            var aa = JSON.stringify(data)
            data.fullName = '';
            var url  = '/uums_mgr/person/add';
            this.$http.post(url,aa,{emulateJSON:true}).then(res=>{
              if(res.body.result == 'success'){
                this.$router.push('/institution/peopleList/' + this.oid);
                this.$message({
                  message : '添加成功',
                  type : 'success'
                });
                this.addControl = true;
              }else{
                this.$message.error('添加失败')
                this.addControl = true;
              }
            },res=>{
              this.$message.error('添加失败')
              this.addControl = true;
            })
          }
        }else{
          return false;
        }
      }
    }
  }
</script>

<style>
  .addpersonFitLeftCenter .address select{
    width : 32%;
    height : 30px;
    line-height : 15px;
  }
  .addPersonlist .addpersonFitLeftCenter .address{
    width: 102%;
  }
  .addPersonlist .el-input__inner{
    height : 30px;
    line-height : 30px;
  }
</style>

<style scoped>
  .addpersonFitLeftleftdomain{
    width: 18%;
    float: left;
    height: 30px;
    color: #666;
    font-weight: normal;
    line-height: 30px;
    text-align: right;
    padding-right: 10px;
  }
  .addPersonlist .form-control{
    width : 96%;
    display : inline-block;
  }
  .addPersonorg .form-control{
    width : 100%;
    display : inline-block;
  }
  .addperFittitlePermanreside{
    color: #7d7d7d;
    padding-left: 5px;
  }
  .addperfitLine{
    height : 30px;
    margin : 15px 0;
  }
  .addpersonFitLeftleftspale{
    width: 18%;
    float : left;
    height : 30px;
    color: #666;
    font-weight: normal;
    line-height : 30px;
    text-align: right;
    padding-right : 10px;
  }
  .addpersonAddfather{
    width: 100%;
    height: 30px;
    padding-right: 58px;
    position: absolute;
    bottom: 79px;
  }
  .addpersonFitLeftleft{
    width: 19%;
    float : left;
    height : 30px;
    color: #666;
    font-weight: normal;
    line-height : 30px;
    text-align: right;
    padding-right : 10px;
  }
  .addpersonFitLeftCenter{
    width : 70%;
    float : left;
    height : 30px;
    line-height : 30px;
  }
  .addpersonFitLefbottom{
    width: 63%;
    height: 30px;
    line-height: 30px;
    margin-top: 30px;
    padding-left: 50px;
    padding-left: 99px;
  }
  .form-addpersonFit{
    height : 650px;
    position: relative;
  }
  .addpersonFitLeft{
    width : 50%;
    height: 100%;
    float : left;
    padding-left: 10px;
    padding-right: 10px;
  }
  .addpersonFitRight{
    width : 50%;
    height: 100%;
    float : right;
    padding : 0,10px;
  }
  .addpersonFitAdd{
    float : right 
  }
  .addPersoninfo{
    color: red;
    padding-left: 300px;
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
  .addperFittitle{
    width: 200px;
    height: 30px;
    line-height:30px;
    font-size: 12px;
    color: red;
    float: left;
  }
  .addperFibir{
    width: 100% !important;
    height: 30px;
  }
 .addPersonFitTinfo{
    color: red;
    text-align: center;
  }
  .addpersonFitFull{
    width : 100%;
  }
  .addPersonlist .btn-sm{
    margin-top : 0px!important;
  }
</style>
