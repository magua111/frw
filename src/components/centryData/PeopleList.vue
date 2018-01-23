<template>
  <!-- 客户列表 -->
  <div class="cont  ainer-fluid perplistAll">
    <div class="body teacher-list">
      <ol class="breadcrumb">
        <li >系统管理</li>
        <li >机构管理</li>
        <li >直属人员</li>
        <li class="active">{{deptName2}}</li>
      </ol>
      <div class="panel panel-default">
        <div class='perplist_all'>
          <button class="btn btn-success btn-sm pull-right" v-on:click='addPeople'>
            添 加
          </button>
          <el-select v-model="full_name" clearable placeholder="请选择部门类型" class='peoplelistClassTop'>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input type="text" class=' peosonlistSearchimput ' placeholder='请输入筛选条件' v-model='term'></el-input>
          <el-button class="btn btn-success btn-sm  btnSpecal" type='success' v-on:click='searchByname'>搜索</el-button>
        </div>
              <!--列表-->
        <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
          <el-table-column
            label="姓名"
            prop='fullName'
            width="150">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fullName }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="工号"
            prop='pCode'
            width="130">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.pCode }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="域账号"
            prop='domainUser'
            width="140">
            <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.domainUser }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="电子邮箱"
            prop='email'
            width="">
            <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.email }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="手机号"
            prop='workMobile'
            width="170">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.workMobile }}</span>
            </template>
          </el-table-column>

          <el-table-column
          width="250px"
          label="操作"
          >
            <template scope="scope">
              <button size="mini" type='success' @click="handleEdit(scope.$index, scope.row);  dialogFormVisible1 = true;" class='btn btn-success btn-xs'>
                查看
              </button>
              <button size="mini" type='success' @click="handleLook(scope.$index, scope.row);  dialogFormVisible = true; changeInfo(scope.$index, scope.row)" class='btn btn-success btn-xs'>
                编辑
              </button>
              <button size="mini" type='warning' @click="handledelete(scope.$index, scope.row);  dialogFormVisible1 = true;" class='btn btn-warning btn-xs'>
                删除
              </button>
              <button size="mini" type='info' @click='viewJob(scope.$index,scope.row)' class="btn btn-info btn-xs">
                该人员的职务
              </button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagenum"
            :page-count='pageallnum'
            layout="total, sizes, prev, pager, next, jumper"
            :total="num">
          </el-pagination>
        </div>
        <!-- 编辑模态框 -->
        <el-dialog  :visible.sync="dialogFormVisible" :visible="controlDialog" :show-close='false' class='title_message' size='largepeoli'>
          <div class='person_title'>基本信息</div>
          <div class='pic'></div>
          <div class='perple_topleft'>
            <div class='peopleplist_Name'>姓名 ：</div>
            <input type='text' class='peopleplist_Num' v-model='form.fullName' v-on:blur='name'>
            <span class='star'>*</span>
            <div class='perpeoplist_Title' ><span class='glyphicon glyphicon-remove' v-if='nameControl'>{{nameMessage}}</span></div>
            <div class='peopleplist_Name'>生日 ：</div>
            <div>
              <el-date-picker
                :editable='false'
                v-model="birtyday"
                type="date"
                id='peoplist_dataChose'
                format='yyyy-MM-dd'
                placeholder="选择日期"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </div>
            <div class='perpeoplist_Title'></div>
            <div class='peopleplist_Name'>域账号 ：</div>
            <input type='text' class='peopleplist_Num' v-model='form.domainUser'  v-on:blur='domainUser'>
            <div class='perpeoplist_Title'><span class='glyphicon glyphicon-remove'  v-if='domainUserControl'>字母数字下划线连接符组成</span></div>
            <div class='peopleplist_NameoidName'>所属机构 ：</div>
            <el-popover
              v-if='tittleTopControl'
              ref="popoverpersonListed"
              placement="top-start"
              title="所属机构"
              width="300"
              trigger="hover"
              :content="messageinput">                            
            </el-popover>
            <el-select  v-popover:popoverpersonListed
              v-model="value9"
              id='peoplist_dataChose'
              :multiple='true'
              filterable
              :remote='true'
              :clearable = 'true'
              :placeholder="messageinput"
              :remote-method="remoteMethod3"
              :loading="loading">
              <el-option
                v-for="item in options4"
                :key="item[0]"
                :label="item[1]"
                :value="item[0]">
              </el-option>
            </el-select>
            <div class='perpeoplist_Title'></div>
          </div>
          <div class='perple_topright'>
            <div class='peopleplist_Name'>个人手机号 ：</div>
            <input type='text' class='peopleplist_Num' v-model='form.homeMobile'  v-on:blur='homeMobile'>
            <div class='perpeoplist_Title'><span class='glyphicon glyphicon-remove' v-if='homeMobileControl'>请输入正确的手机号</span></div>
            <div class='peopleplist_Name'>家庭电话 ：</div>
            <input type='text' class='peopleplist_Num' v-model='form.homePhone' v-on:blur='homePhone'>
            <div class='perpeoplist_Title'><span class='glyphicon glyphicon-remove' v-if='homePhoneControl'>请输入座机号且注意格式</span></div>
            <div class='peopleplist_Name'>CDMA手机号 ：</div>
            <input type='text' class='peopleplist_Num' v-model='form.workMobile' v-on:blur='workMobile'>
            <div class='perpeoplist_Title'><span class='glyphicon glyphicon-remove'v-if='workMobileControl'>请输入正确的手机号</span></div>
            <div class='peopleplist_Name'>电子邮箱 ：</div>
            <input type='text' class='peopleplist_Num' v-model='form.email' v-on:blur='email'>
            <div class='perpeoplist_Title'><span class='glyphicon glyphicon-remove' v-if='emailControl'>请填写电子邮箱且注意格式</span></div>
          </div>

          <div class='perple_botright'>
            <div class='people_botleftName'>工号 ：</div>
            <input type='text' class='peoplelist_botleftNumInput' v-model='pCode'>
            <span class='star'>*</span>
            <div class='perpeoplist_Titleb'><span class='glyphicon glyphicon-remove' v-if='pCodeControl'>{{messagePcode}}</span></div>
            <div class='people_botleftName'>职级 ：</div>
            <el-select v-model="form.positionState" clearable placeholder="请选择职级" class='peoplelist_botleftNum'>
              <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div class='perpeoplist_Titleb'></div>
            <div class='people_botleftName'>政治面貌 ：</div>
              <el-select v-model="form.polity" clearable placeholder="请选择政治面貌" class='peoplelist_botleftNum'>
                <el-option
                  v-for="item in optionsPolity"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            <div class='perpeoplist_Titleb'></div>
            <div class='people_botleftNamedataIn'>进所日期 ：</div>
              <el-date-picker
                v-model="joinsysdate"
                :editable='false'
                type="date"
                id='peoplelist_botleftNumData'
                format='yyyy-MM-dd'
                placeholder="选择日期"
                :picker-options="pickerOptions0">
              </el-date-picker>
            <div class='perpeoplist_Titleb'></div>
            <div class='people_botleftName'>邮政编码 ：</div>
            <input type='text' class='peoplelist_botleftNumInput' v-model='form.postalcode' v-on:blur='postalcode'>
            <div class='perpeoplist_Titleb'><span class='glyphicon glyphicon-remove' v-if='postalcodeControl  '>邮政编码格式有误</span></div>
          </div>


          <div class='perple_botleft'>
            <div class='peoplist_botleftName'>参加工作日期 ：</div>
            <el-date-picker
              v-model="joinworkdate"
              :editable='false'
              type="date"
              id='peoplelist_botleftNumDatajoin'
              format='yyyy-MM-dd'
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
            <div class='perpeoplist_TitlebL'></div>
            <div class='peoplist_botleftName'>家庭住址 ：</div>
            <input type='text' class='peoplist_botleftNum' v-model='form.address'>
            <div class='perpeoplist_TitlebL'></div>
            <div class='peoplist_botleftName'>户口所在地编码 ：</div>
            <input type='text' class='peoplist_botleftNum' v-model='form.permanreside' v-on:click='permanreside' v-if='permanresideControlInput'>
            <div  class='perplist_botleftNumAd' v-if='permanresideControlSelect'><v-distpicker :province="select.province" :city="select.city" :area="select.area" @selected='onSelected' ></v-distpicker></div>
            <div class='perpeoplist_TitlebL'><span class='addressNumpeo'>户口所在地请精确到区</span></div>  
            <div class='peoplist_botleftName'>工作电话 ：</div>
            <input type='text' class='peoplist_botleftNum' v-model='form.workPhone' v-on:blur='workPhone'>
            <div class='perpeoplist_TitlebL'><span class='glyphicon glyphicon-remove' v-if='workPhoneControl'>请输入座机号码且注意格式</span></div>
            <div class='peoplist_botleftName'>分机号 ：</div>
            <input type='text' class='peoplist_botleftNum' v-model='form.extension' >
            <div class='perpeoplist_TitlebL'><span class='glyphicon glyphicon-remove' v-if='extensionControl'>请输入座机号码且注意格式</span></div>
          </div>
          
          <div v-if='contorl' class = 'controlpeoplelist'>{{message}}</div>
          <div slot="footer" class="peoplistFooter">
          <el-button @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false ; editorPerinfo()">确 定</el-button>
          </div>
        </el-dialog>
              <!-- 查看模态框 -->
        <el-dialog :visible.sync="dialogFormVisible1" :visible="controlDialog1" :show-close='false' class='title_message' size='largepeoli'>
            <div class='person_title'>基本信息</div>
            <div class='pic'></div>
            <div class='perple_topleft'>
              <div class='peopleplist_Name'>姓名 ：</div>
              <div class='peopleplist_Num'>{{form.fullName}}</div>
              <div class='perpeoplist_Title'></div>
              <div class='peopleplist_Name'>生日 ：</div>
              <div class='peopleplist_Num'>{{birtyday}}</div>
              <div class='perpeoplist_Title'></div>
              <div class='peopleplist_Name'>域账号 ：</div>
              <div class='peopleplist_Num'>{{form.domainUser}}</div>
              <div class='perpeoplist_Title'></div>
              <el-popover
                ref="popoverpersonList"
                placement="top-start"
                title="所属机构"
                width="300"
                trigger="hover"
                :content="deptNamenew">
              </el-popover>
              <div class='peopleplist_Name'>所属机构 ：</div>
              <div class='peopleplist_Num  oidNameMore' v-popover:popoverpersonList>{{deptNamenew}}</div>
              <div class='perpeoplist_Title'></div>
            </div>
            <div class='perple_topright'>
              <div class='peopleplist_Name'>个人手机号 ：</div>
              <div class='peopleplist_Num'>{{form.homeMobile}}</div>
              <div class='perpeoplist_Title'></div>
              <div class='peopleplist_Name'>家庭电话 ：</div>
              <div class='peopleplist_Num'>{{form.homePhone}}</div>
              <div class='perpeoplist_Title'></div>
              <div class='peopleplist_Name'>CDMA手机号 ：</div>
              <div class='peopleplist_Num'>{{form.workMobile}}</div>
              <div class='perpeoplist_Title'></div>
              <div class='peopleplist_Name'>电子邮箱 ：</div>
              <div class='peopleplist_Num'>{{form.email}}</div>
              <div class='perpeoplist_Title'></div>
            </div>
            <div class='perple_botright'>
              <div class='people_botleftName'>工号 ：</div>
              <div class='peoplelist_botleftNumInput'>{{form.pCode}}</div>
              <div class='perpeoplist_Title'></div>
              <div class='people_botleftName'>职级 ：</div>
              <div class='peoplelist_botleftNumInput'>{{form.positionState}}</div>
              <div class='perpeoplist_Title'></div>
              <div class='people_botleftName'>政治面貌 ：</div>
              <el-select v-model="form.polity" clearable placeholder="" class='peoplelist_botleftNumInputpolity' :disabled='true'>
                <el-option
                  v-for="item in optionsPolity"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class='perpeoplist_Title'></div>
              <div class='people_botleftName'>进所日期 ：</div>
              <div class='peoplelist_botleftNumInput'>{{form.joinsysdate}}</div>
              <div class='perpeoplist_Title'></div>
              <div class='people_botleftName'>分机号 ：</div>
              <div class='peoplelist_botleftNumInput'>{{form.extension}}</div>
              <div class='perpeoplist_Title'></div>
            </div>
            <div class='perple_botleft'>
              <div class='peoplist_botleftName'>参加工作日期 ：</div>
              <div class='peoplist_botleftNum'>{{joinworkdate}}</div>
              <div class='perpeoplist_Title'></div>
              <div class='peoplist_botleftName'>家庭住址 ：</div>
              <div class='peoplist_botleftNum'>{{form.address}}</div>
              <div class='perpeoplist_Title'></div>
              <div class='peoplist_botleftName'>邮政编码 ：</div>
              <div class='peoplist_botleftNum'>{{form.postalcode}}</div>
              <div class='perpeoplist_Title'></div>
              <div class='peoplist_botleftName'>户口所在地编码 ：</div>
              <div class='peoplist_botleftNum'>{{form.permanreside}}</div>
              <div class='perpeoplist_Title'></div>
              <div class='peoplist_botleftName'>工作电话 ：</div>
              <div class='peoplist_botleftNum'>{{form.workPhone}}</div>
              <div class='perpeoplist_Title'></div>
            </div>
            <div slot="footer" class="">
              <el-button type="success" @click="dialogFormVisible = false; watchTrue()" class='peopleClose'>关 闭</el-button>
            </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        permanresideControlInput : true,
        permanresideControlSelect : false,
        nameMessage : '',
        tittleTopControl : true,
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
        messagePcode :'',
        passPcode :'',
        valueoidNew : [],
        emptyText :'数据正在加载中...',
        messageinput : '',
        pickerOptions0: {
          disabledDate(time) {
          }
        },
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
        options: [{
          value: 'fullName',
          label: '姓名'
        }, {
          value: 'pCode',
          label: '工号'
        }],
        value9 : '',
        options4 : [],
        loading : false,
        list : [],
        tt : [],
        tableData: [],
        dialogFormVisible : false,
        form :{},
        formLabelWidth : '220px',
        controlDialog : false,
        delete_aid : '',
        delete_name : '',
        num : 0,
        full_name : 'fullName',
        deptNamenew : '',
        pagenum : 10,
        pageallnum : 0,
        currentPage1: 1,
        search_name : '',
        controlDialog1 : false,
        dialogFormVisible1 : false,
        oid : '',
        term : '',
        pid : '',
        passOid : [],
        saveoid : '',
        oidPass : '',
        passoidNameed : [],
        lastUpdUser : '',
        joinsysdate : '',
        joinworkdate : '',
        birtyday : '',
        depyNameORG : '',
        select :{},
        contorl : false,
        pCode : '',
        message : '',
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
      }
    },
    created(){
      this.oid = this.$route.params.id;
      this.depyNameORG = this.$store.state.deptName2 =  window.localStorage.deptName2
      this.user_list_get();
    },
    watch:{
      pCode(a,b){
        this.pCodeOnly(a)
      }
    },
    computed: {
      deptName2(){
        return this.$store.state.deptName2
      }
    },
    methods: {
      addPeople(){
        this.$router.push('/addPerson/' + this.oid)
      },
      permanreside(){
        this.permanresideControlSelect = true
        this.permanresideControlInput = false
      },
      onSelected(data){
        this.form.permanreside =  data.area.code;
      },
      viewJob(index,row){
        this.$store.state.authore = window.localStorage.fullName = row.fullName
        this.$store.state.joblistIndex =  window.localStorage.joblistIndex = '1'
        this.$store.state.pid = window.localStorage.pid = row.pid
        this.$router.push('/person/fondbyPerson')
      },
      //打开编辑
      handleLook(index, row) {
        this.passOid = [];
        this.pCodeControl = false;
        this.nameControl = this.domainUserControl = this.workMobileControl = this.homePhoneControl = this.homeMobileControl = this.emailControl = this.postalcodeControl = this.workPhoneControl = this.extensionControl = false;
        this.contorl = false;
        this.message = ''
        this.messageinput = '';
        if( row.organizations == null){
          this.infoOrg1 = ''
        }else{
        for( var i = 0; i< row.organizations.length;i++){
          var passoidName = {}
          passoidName.oid=  row.organizations[i].oid
          this.passOid.push(passoidName)
        }
        for( var i = 0; i< row.organizations.length;i++){
          this.messageinput = this.messageinput +  row.organizations[i].deptName +  '   ';
        }
          this.saveoid = row.oid
          this.form = row;
          this.pCode = this.passPcode = row.pCode;
          this.joinsysdate = row.joinsysdate
          this.birtyday = row.birtyday
          this.joinworkdate = row.joinworkdate
          this.controlDialog = true;
          if(row.polity == null){
            this.form.polity = ''
          }else{
            this.form.polity =row.polity.toString()
          }
        }          
      },
           //编辑提交
      editorPerinfo(){
        this.valueoidNew = [];
        this.contorl = false;
        this.message = ''
        this.select = {}  
        if( this.value9.length == 0 ){
          if(this.passOid == null || this.passOid == ''){
            this.passOid = []
          }
          this.valueoidNew = this.passOid 
        }else{    
          for(var i = 0 ; i<this.value9.length; i++){   
            var oidNumpass = {}
            oidNumpass.oid = this.value9[i]
            this.valueoidNew.push(oidNumpass)
          }
        }
        var newdata = this.form;
        var joinworkdate = this.joinworkdate
        var birtyday = this.birtyday
        var joinsysdate = this.joinsysdate
        if(newdata.fullName == [] || newdata.fullName == null){
          newdata.fullName = ''
        }
        var fullName = newdata.fullName.toString()
        newdata.term = this.term
        if( fullName.trim() == '' ){
          this.contorl = true;
          this.message = '姓名不能为空'
          return false;
        }
        else if(this.form.pCode == '' || this.form.pCode == null){
          this.contorl = true;
          this.message = '工号不能为空'
          return false;
        }
        else if(this.valueoidNew == [] || this.valueoidNew == null){
          this.contorl = true;
          this.message = '所属机构不能为空'
          return false;
        }
        else if(this.nameControl == true || this.domainUserControl == true || this.workMobileControl == true || this.homePhoneControl == true || this.homeMobileControl == true || this.emailControl == true || this.postalcodeControl == true || this.workPhoneControl == true || this.extensionControl == true || this.pCodeControl == true){
          this.contorl = true;
          this.message = '请注意输入格式'
          return false;
        }
        else{
          newdata.birtyday = this.validate.turnDate(birtyday);
          newdata.joinsysdate = this.validate.turnDate(joinsysdate);
          newdata.joinworkdate = this.validate.turnDate(joinworkdate);
          newdata.organizations = this.valueoidNew
          var data = JSON.stringify(newdata)
          var url =  '/uums_mgr/person/update';
          this.$http.post(url,data,{emulateJSON:true}).then(res=>{
            var datapass = JSON.parse(res.bodyText)
            if(datapass.result == 'success'){
                this.$message({
                  message : '编辑成功',
                  type : 'success'
                });
                this.user_list_get()
            }else{
                this.$message.error('编辑失败')
            }
            this.valueoidNew = [];
            this.passOid  = [];
            this.contorl = false;
            this.message = ''
            this.value9 = [];
            this.select = {}  
            this.permanresideControlSelect = false  
            this.permanresideControlInput = true;
            this.messageinput = this.depyNameORG
            this.controlDialog = false;
          },res=>{
            this.$message.error('编辑失败')
            this.valueoidNew = [];
            this.passOid  = [];
            this.messageinput = this.depyNameORG
          })
        }
      },
      handleEdit(index, row){
       if( row.organizations == null){
         this.deptNamenew = ''
        }else{
          for( var i = 0; i< row.organizations.length;i++){
            var passoidName = {}
            passoidName.oid=  row.organizations[i].oid
            this.passOid.push(passoidName)
          }
          for( var i = 0; i< row.organizations.length;i++){
            this.deptNamenew = this.deptNamenew +  row.organizations[i].deptName +  '   ';
          }
          this.controlDialog1 = true;
          this.form = row;
          this.joinsysdate = row.joinsysdate
          this.birtyday = row.birtyday
          this.joinworkdate = row.joinworkdate
          if(row.polity == null){
              this.form.polity = ''
          }else{
            this.form.polity =row.polity.toString()    
          }
        }
      },
      name(){
        this.nameControl = this.validate.peoName(this.form.fullName).b
        this.nameMessage = this.validate.peoName(this.form.fullName).c
      },
      domainUser(){
        this.domainUserControl = this.validate.domainUserFun(this.form.domainUser)
      },
      email(){
        this.emailControl = this.validate.emailFun(this.form.email)
      },
      workMobile(){
        this.workMobileControl = this.validate.mobilPhone(this.form.workMobile)
      },
      homePhone(){
        this.homePhoneControl = this.validate.homePhoneFun(this.form.homePhone)
      },
      homeMobile(){
        this.homeMobileControl = this.validate.mobilPhone(this.form.homeMobile)
      },
      postalcode(){
        this.postalcodeControl  = this.validate.postalcodeFun(this.form.postalcode)
      },
      workPhone(){
        this.workPhoneControl = this.validate.homePhoneFun(this.form.workPhone)
      },
      extension(){
//       if(this.form.extension == '' || this.form.extension == null){
//        return false
//      }else{
//        var s = /^[0-9]*$/
//        if(s.test(this.form.extension)){
//        this.extensionControl = false
//        }else{
//        this.extensionControl = true
//      }
//     }
      },
      pCodeHun(a){
        if(a == '' || a == null){
          this.pCodeControl = true
          this.messagePcode = '工号不能为空'
          return false
        }else{
          var s = /^[A-Za-z0-9_-]*$/g;
          if(s.test(a)){
            if(a == this.passPcode){
              this.pCodeControl = false;
              this.messagePcode = ''
            }else{
              this.pCodeControl = false
              this.messagePcode = ''
            }
          }else{
            this.pCodeControl = true
            this.messagePcode = '字母数字下划线连接符组成'
          }
        }
      },
      pCodeOnly(a){
        if(this.passPcode == a){
          this.pCodeHun(a)
        }else{
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
        }
      },
   
      dept(query){
        var url = '/uums_mgr/org/findOrgsByDeptName?deptName=' + query;
        this.$http.get(url).then(res=>{
          this.options4 = res.body;
        },res=>{
        })
      },
      remoteMethod3(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
          this.loading = false;
          this.dept(query);
          this.options1 = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.dept(query)
          this.options1 = [];
        }
      },

      searchByname(){
        this.user_list_get()
      },
    //刚进页面默认渲染
      user_list_get(){
        var url = '/uums_mgr/person/findAll?pageNum=' + this.currentPage1 + '&pageSize=' + this.pagenum +'&'+ this.full_name +'=' + this.term + '&oid=' + this.oid;
        this.$http.get(url).then(res=>{
          if(res.body.content.length == 0){
            this.emptyText = '暂无数据'
          }else{
            this.emptyText = ''
          }
          this.tableData = res.body.content;
          this.num = res.body.totalElements;
          this.form = res.body.content;
        },res=>{
          this.emptyText = '获取数据失败！！！'
        })
      },
      watchTrue(){
        this.dialogFormVisible1 = false;
        this.controlDialog1 = false;
        this.passOid = [];
        this.deptNamenew = '';
      },
      changeInfo(index,row){
      },
         //打开删除
      handledelete(index,row){
        this.pid = row.pid
        this.open2();
      },
      //删除函数
      deleteuser(){
         var url = '/uums_mgr/person/delete?pid=' + this.pid
         this.$http.get(url).then(res=>{
            var data = JSON.parse(res.bodyText)
            if(data.result == 'success'){
              this.$message({
                message : '删除成功',
                type : 'success'
              });
            }else{
                this.$message.error("删除失败")
            }
            this.user_list_get();
         },res=>{
           this.$message.error("删除失败")
         })
      },
      open2() {
        this.$confirm('是否删除该人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteuser();
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleClose(done){
        this.$confirm('确认关闭吗')
        .then(_=>{
           this.$route.push('/course_topic')
        })
        .catch(_=>{});
      },
      handleSizeChange(val) {
        this.pagenum = val
        this.user_list_get()
      },
      handleCurrentChange(val) {
        this.currentPage1 = val;
        this.user_list_get()
      },
      userList(){
        this.user_list_get();
      },
      cancle(){
        this.controlDialog = false;
        this.user_list_get();
        this.select = {}  
        this.permanresideControlSelect = false  
        this.permanresideControlInput = true;
      },
      cancle3(){
        this.controlDialog1 = false;
        this.user_list_get()
      },
      editor(){
        this.controlDialog = false;
        this.user_list_get()
      },
    },
  }
</script>
<style>
  .perplistAll .el-input.is-disabled .el-input__inner {
    background-color : #fff!important;
    border-color: #ccc;
    color:  black;
    cursor: not-allowed;
  } 
  .perplist_botleftNumAd .address select{
   width : 32%;
   height : 30px;
   line-height : 15px;
  }
  .perplistAll .el-input {
    margin-bottom: 0px!important;
  }
  .peoplelist_botleftNumInputpolity .el-input.is-disabled .el-input__inner{
    background-color : #fff;
    color : black;
  }
  .perplistAll .el-input__inner{
    height : 30px;
  }
  .perplistAll .el-menu {
    margin: 10px 0;
  }
  .perplistAll .el-input{
    margin-bottom: 10px;
  }
  .perplistAll .el-dialog--largepeoli {
    color: black;
    border-radius: 8px;
    font-family: inherit;
    background-color: #fff;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    width: 86%;
    height: 778px;
  }
</style>
  


<style scoped>
  
  .addressNumpeo{
    color: #7d7d7d;
  }

  .perplist_botleftNumAd{
    width: 310px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
   }
  .peopleClose{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  #peoplelist_botleftNumDatajoin{
    margin-right: 18px!important;
    width: 310px;
  }
  #peoplelist_botleftNumData{
    margin-right: 0px!important;
    width: 310px;
  }
  #peoplist_dataChose {
    margin-right: 0px!important;
    width: 270px;
    float : left;
  }
  
  .peoplistFooter{
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  .peoplelist_botleftNum{
    width: 310px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
    margin-left : 5px;
    border-radius: 3px;
  }
  .peoplelist_botleftNumInput{
    width: 310px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
    text-indent: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
    margin-left: 5px;
  }
  .peoplelist_botleftNumInputpolity{
    width: 310px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
    margin-left: 5px;
  }
  
  .people_botleftName{
    width: 170px;
    padding-right: 5px;
    text-align: right;
    height: 30px;
    line-height:30px;
    float: left;
    padding-left: 2px;
  }
  .peoplist_botleftNum{
    width: 310px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
    text-indent: 5px;
    border-radius: 3px;
    border: 1px solid #ccc
  }
  .peoplist_botleftName{
    width: 170px;
    padding-right: 5px;
    text-align: right;
    height: 30px;
    line-height:30px;
    float: left;
    padding-left: 2px;
  }
  .people_botleftNamedataIn{
    width: 170px;
    padding-right: 5px;
    text-align: right;
    height: 30px;
    line-height:30px;
    float: left;
    padding-left: 2px;
    margin-right : -9px;
  }
  .peopleplist_Num{
    width: 270px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
    text-indent: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }
  .perpeoplist_Title{
    width: 480px;
    height: 30px;
    line-height: 30px;
    float: left;
    color: red;
    font-size: 12px;
    text-align: left;
    padding-left: 145px;
  }
  .perpeoplist_TitlebL{
    width: 480px;
    height: 30px;
    line-height: 30px;
    float: left;
    color: red;
    font-size: 12px;
    text-align: left;
    padding-left: 170px;
  }
  .perpeoplist_Titleb{
    width: 620px;
    height: 30px;
    line-height: 30px;
    float: left;
    color: red;
    font-size: 12px;
    text-align: left;
    padding-left: 175px;
  }
  .peopleplist_Name{
    width: 145px;
    padding-right: 5px;
    text-align: right;
    height: 30px;
    line-height:30px;
    float: left;
    padding-left: 2px;
  }
  .peopleplist_NameoidName{
    width: 145px;
    padding-right: 5px;
    text-align: right;
    height: 40px;
    line-height:40px;
    float: left;
    padding-left: 2px;
  }
  .perple_botright{
    width: 500px;
    height: 369px;
    float: right;
    margin-right: 40px;
    margin-top: 24px;
  }
  .perple_botleft{
    width: 500px;
    height: 369px;
    margin-top : 20px;
  }
  .perple_topleft{
    padding-top: 5px;
    width: 430px;
    height: 270px;
    margin-left : 170px;
  }
  .perple_topright{
    padding-top: 5px;
    position: absolute;
    width: 430px;
    height: 250px;
    right: 50px;
    top: 50px;
  }
  
  .inputterm{
    height:30px;
    line-height:30px;
    border : 1px solid #8391a5;
    border-radius: 3px;
  }
  .localchosename22{
    position: absolute;
    left:3px;
  }
  .pic{
    width: 190px;
    background: url("../../assets/img/default.jpg") center;
    height: 190px;
    position: absolute;
    left: 20px;
    top: 50px;
  }
  .person_title{
    color: #666;
    font-weight: normal;
    position: absolute;
    left: 8px;
    top: 8px;
  }
  .breadcrumb {
    margin-bottom: 0;
  }
  .fl{
    float : left;
    height : 30px;
  }
  #choose2{
    border : 1px solid rgb(169, 169, 169);
    display: inline-block;
    position: absolute;
    left: 208px;
    height:30px;
    text-indent: 5px;
    line-height:36px;
  }
  .perplist_all{
    margin-bottom : 20px;
    margin-top: 17px;
    height : 31px;
    position: relative;
    padding-right: 15px;
  }
  .choose_all3{
    width: 400px;
    height: 31px;
    position: absolute;
    left : 0;
  }
  .searchbutton{
      margin-left : 10px;
  }
  .inputterm{
    position: absolute;
    left : 200px;
  }
  .breadcrumb {
    margin-bottom: 0;
  }
  
  .panel-body {
    padding: 15px;
    width: 400px;
    display: inline-block;
  }
  .fl{
    float : left;
    height : 30px;
  }
  .personAdd{
    color : white;
  }
  .personAdd:hover{
    color : white;
  }
  
  .controlpeoplelist{
    position: absolute;
    bottom: 87px;
    color: red;
    left: 500px;
    font-size : 15px;
  }
  .peosonlistSearchimput{
    height: 30px;
    line-height:30px;
    width : 200px;
    text-indent : 10px;
    color: #1f2d3d;
    font-size: inherit;
    background-color: #fff;
    margin-right: 10px;
    float: left;
  }
  .peoplelistClassTop{
    margin-left: 10px;
    float : left;
  }
  .btnSpecal{
    display : inline-block;
    margin-left: 10px!important;
  }
  .oidNameMore{
    display: inline-block;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  
</style>
