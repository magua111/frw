<template>
  <div class="body teacher addPelist">
    <!-- 面包屑 -->
    <ol class="breadcrumb">
      <li>人员管理</li>
      <li class="active">人员添加</li>
    </ol>
      <form class="form-addpersonFit clearfix">
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
               <div v-if='emailControl'><span class='glyphicon glyphicon-remove' v-if=''></span>请填写电子邮箱且注意格式</div></div>
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
              <div v-if='postalcodeControl'><span class='glyphicon glyphicon-remove' v-if=''></span>您输入的数值有误</div></div>
            </div>
          </div>
           <div  class='addperfitLine'>
            <div class='addpersonFitLeftleft'>个人手机号</div>
            <div class='addpersonFitLeftCenter'>
               <input type="text" class="form-control input-sm" v-model='product.homeMobile' v-on:blur='homeMobile'>
            </div>
            <div class='addpersonFitLefbottom'>
              <div class='addperFittitle'>
              <div  v-if='homeMobileControl'><span class='glyphicon glyphicon-remove' v-if=''></span>请输入正确的手机号且不为空</div></div>
            </div>
          </div>
          <div  class='addperfitLine'>
            <div class='addpersonFitLeftleft'>CDMA手机号</div>
            <div class='addpersonFitLeftCenter'>
              <input type="text" class="form-control input-sm" v-model='product.workMobile' v-on:blur='workMobile'>
            </div>
            <div class='addpersonFitLefbottom'>
               <div class='addperFittitle'>
               <div v-if='workMobileControl'><span class='glyphicon glyphicon-remove'>请输入正确的手机号且不为空</span></div></div>
            </div>
          </div>
        </div>
        <div class='addpersonFitRight'>
          <div  class='addperfitLine'>
            <div class='addpersonFitLeftleft'>户口所在地</div>
            <div class='addpersonFitLeftCenter'>
               <!--  <input type="text" class="form-control input-sm" v-model='product.permanreside'> -->
               <v-distpicker :province="select.province" :city="select.city" :area="select.area" @selected='onSelected'></v-distpicker>
            </div>
            <div class='addpersonFitLefbottom'>
              <div class='addperFittitle'><span class='addperFittitlePermanreside'>户口所在地请精确到区</span></div>
            </div>
          </div>
          <div  class='addperfitLine'>
            <div class='addpersonFitLeftleft'>域账号</div>
            <div class='addpersonFitLeftCenter'>
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

          <div  class='addperfitLine'>
            <div class='addpersonFitLeftleftspale'>所属机构</div>
            <div class='addpersonFitLeftCenterorg orgChooseAdd'>
              <el-select
                  class='addperFibir'
                  v-model="value9"
                  :multiple='true'
                  filterable
                  :remote='true'
                  :clearable = 'true'
                  placeholder="请输入上级机构关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                <el-option
                    v-for="item in options4"
                    :key="item[0]"
                    :label="item[1]"
                    :value="item[0]">
                </el-option>
              </el-select>
              <span class='star'>*</span>
            </div>
            <div class='addpersonFitLefbottom'>
              <div class='addperFittitle'></div>
            </div>
          </div>
        </div>
        <div class="addpersonFitAddfather">
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
        select : {},
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
        pCode : '',
        birtyday : '',
        options4 : [],
        value9 : '',
        list : [],
        loading :false,
        polity : '',
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
        product:{
          fullName : '',
          pCode : '',
          email : '',
          workMobile : '',
          password : '',
          permanreside : '',
        },
        permanreside : '',
        oid : '',
        joinsysdate : '',
        joinworkdate : '',
        birtyday : '',
        message :'',
        contorl : false,
        lists : [],
        messagePcode : '',
        pickerOptions0: {
          disabledDate(time) {
          }
        },
      }
    },
    created(){
      this.oid = this.$route.params.id;
      var url = 'uums_mgr/position/pagePositions'
      this.$http.get(url).then(res=>{
        this.lists = res.body.content;
      },res=>{
      })
    },
    watch:{
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
//        if(this.product.extension == '' || this.product.extension == null){
//           return false
//        }else{
//           var s = /^[0-9]*$/
//           if(s.test(this.product.extension)){
//           this.extensionControl = false
//          }else{
//           this.extensionControl = true
//          }
//        }
      },
      pCodeFun(a){
        if(a == '' || a == null){
          this.pCodeControl = true
          this.messagePcode = '工号不能为空'
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
               this.pCodeFun(a)
           }else{
             this.pCodeControl = true
             this.messagePcode = '该工号已存在'
           }
        },res=>{
             this.pCodeControl = true
             this.messagePcode = '该工号已存在'
        })
      },

      choose(query){
        var url = '/uums_mgr/org/findOrgsByDeptName?deptName='+ query
        this.$http.get(url).then(res=>{
        this.options4 = res.body;
        },res=>{
        })
      },

      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          this.choose(query);
          this.deptName = this.value9
          this.options4 = this.list.filter(item => {
                return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.choose(query)
          this.options4 = [];
        }
      },

      refer(){
        if(this.addControl == true){
          this.addControl = false;
          var data = this.product;
          data.birtyday =  this.validate.turnDate(this.birtyday);
          data.joinsysdate = this.validate.turnDate(this.joinsysdate);
          data.joinworkdate =  this.validate.turnDate(this.joinworkdate);
          data.positionState = this.positionState;
          data.polity = this.polity;
          data.pCode = this.pCode
          data.poCode = this.full_name;
          data.organizations = [];
          data.permanreside = this.permanreside;
          for(var i = 0 ; i < this.value9.length;i++){
            var oidNum = {};
            oidNum.oid = this.value9[i]
            data.organizations.push(oidNum)
          }
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
          else if(data.organizations == '' || data.organizations == null){
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
          }else{
            var aa = JSON.stringify(data)
            data.fullName = '';
            var url  = '/uums_mgr/person/add';
            this.$http.post(url,aa,{emulateJSON:true}).then(res=>{
              if(res.body.result == 'success'){
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.addControl = true;
                this.$router.push('/centeryData/personlist');
              }else{
                this.$message.error('添加失败')
                this.addControl = true;
              }
              this.constrol = true;
            },res=>{
              this.$message.error('添加失败')
              this.addControl = true;
            })
          }
        }else{
          return false
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
  .addPelist .addpersonFitLeftCenter .address{
    width : 96%;
  }
  .addPelist .el-input__inner{
    height : 30px;
    line-height : 30px;
  }
</style>

<style scoped>
  .addperFittitlePermanreside{
    color : #7d7d7d;
    padding-left: 5px;
  }
  .addPelist .form-control{
    width : 94%;
    display : inline-block;
  }
  
  .addperfitLine{
    height : 30px;
    margin : 15px 0;

  }
  .addpersonFitLeftleftspale{
    width: 18%;
    float : left;
    height : 40px;
    color: #666;
    font-weight: normal;
    line-height : 40px;
    text-align: right;
    padding-right : 10px;

  }
  .addpersonFitAddfather{
    width: 100%;
    height: 30px;
    padding-right: 58px;
    margin-bottom: -60px;
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
  .addpersonFitLeftCenterorg{
    width : 70%;
    float : left;
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

  .el-select__tags{
    padding-top: 5px;
    transform: translateY(0)!important;
    top: 0!important;
  }

  .addperFibir{
    width: 94% !important;
    margin-left: 5px;
  }

  .addperFittitle{
    height: 30px;
    width: 100%;
    line-height: 30px;
    font-size: 12px;
    color: red;
  }
  .info{
    text-align : center;
    color : red;
  }
  .addpersonbut{
    margin-top : 60px;
  }

  .addPersonFitTinfo{
     color: red;
     text-align: center;
  }
  .addpersonFitFull{
    width: 94%;
    margin-left: 5px;
  }
  .addPersonlist .btn-sm{
    margin-top : 0px!important;
  }
</style>
