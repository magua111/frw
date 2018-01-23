<template>
  <div>
    <div class="panel panel-default personliseAll">
      <div class='perlist_allside'>
        <button v-on:click='addpersonBtu' class='addinfopeo btn btn-success btn-sm'> 添 加</button>
        <el-select v-model="full_name" clearable placeholder="请选择部门类型" class='peosonlistSearch'>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input class='peosonlistSearch peosonlistSearchimput' placeholder='请输入筛选条件'  v-model = 'term'></el-input>
        <button class="btn btn-success btn-sm personListSearchBtn" v-on:click='searchByname()' type='success'>搜索</button>
      </div>
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
          width="130">
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
            width="140">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.workMobile }}</span>
            </template>
          </el-table-column>
        <el-table-column
          width="240"
          label="操作">
          <template scope="scope">
          <button size="mini" type='success' @click="handleEdit(scope.$index, scope.row);  dialogFormVisible1 = true;" class='btn btn-success btn-xs'>
            查看
          </button>
          <button size="mini" type='success' @click="handleLook(scope.$index, scope.row);  dialogFormVisible = true; changeInfo(scope.$index, scope.row)" class='btn btn-success btn-xs'>
            编辑
          </button>
          <button size="mini" type='warning' @click="deletepersonInfo(scope.$index, scope.row)" class='btn btn-warning btn-xs'>
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
      <!-- 查看模态框 -->
      <el-dialog :visible.sync="dialogFormVisible1" :visible="controlDialog1" :show-close='false' class='title_message' size='largepeoli'>
        <div class='person_title'>基本信息</div>
        <div class='pic'></div>
        <div class='perplist_topleft'>
          <div class='perplist_Name'>姓名 ：</div>
          <div class='perplist_Num'>{{form.fullName}}</div>
          <div class='perplist_Title'></div>
          <div class='perplist_Name'>生日 ：</div>
          <div class='perplist_Num'>{{birtyday}}</div>
          <div class='perplist_Title'></div>
          <div class='perplist_Name'>域账号 ：</div>
          <div class='perplist_Num'>{{form.domainUser}}</div>
          <div class='perplist_Title'></div>
              <el-popover
                ref="popoverpersonList"
                placement="top-start"
                title="所属机构"
                width=""
                trigger="hover"
                :content="deptNamenew">
              </el-popover>
          <div class='perplist_Name'>所属机构 ：</div>
          <div class='perplist_Num oidNameMore'   v-popover:popoverpersonList>{{deptNamenew}}</div>
          <div class='perplist_Title'></div>
        </div>
        <div class='perplist_topright'>
          <div class='perplist_Name'>个人手机号 ：</div>
          <div class='perplist_Num'>{{form.homeMobile}}</div>
          <div class='perplist_Title'></div>
          <div class='perplist_Name'>家庭电话 ：</div>
          <div class='perplist_Num'>{{form.homePhone}}</div>
          <div class='perplist_Title'></div>
          <div class='perplist_Name'>CDMA手机号 ：</div>
          <div class='perplist_Num'>{{form.workMobile}}</div>
          <div class='perplist_Title'></div>
          <div class='perplist_Name'>电子邮箱 ：</div>
          <div class='perplist_Num'>{{form.email}}</div>
          <div class='perplist_Title'></div>
        </div>
        <div class='perplist_botright'>
          <div class='perplist_botleftName'>工号 ：</div>
          <div class='perplist_botleftNum'>{{form.pCode}}</div>
          <div class='perplist_Title'></div>
          <div class='perplist_botleftName'>职级 ：</div>
          <div class='perplist_botleftNum'>{{form.positionState}}</div>
          <div class='perplist_Title'></div>
          <div class='perplist_botleftName'>政治面貌 ：</div>
          <el-select v-model="form.polity" clearable placeholder="" class='perplist_botleftNumpolity' :disabled='true'>
            <el-option
              v-for="item in optionsPolity"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class='perplist_Title'></div>
          <div class='perplist_botleftName'>进所日期 ：</div>
          <div class='perplist_botleftNum'>{{joinsysdate}}</div>
          <div class='perplist_Title'></div>
          <div class='perplist_botleftName'>分机号 ：</div>
          <div class='perplist_botleftNum'>{{form.extension}}</div>
          <div class='perplist_Title'></div>
        </div>
        <div class='perplist_botleft'>
          <div class='perplist_botleftName'>参加工作日期 ：</div>
          <div class='perplist_botleftNumDataLook'>{{joinworkdate}}</div>
          <div class='perplist_Title'></div>
          <div class='perplist_botleftName'>家庭住址 ：</div>
          <div class='perplist_botleftNum'>{{form.address}}</div>
          <div class='perplist_Title'></div>
          <div class='perplist_botleftName'>邮政编码 ：</div>
          <div class='perplist_botleftNum'>{{form.postalcode}}</div>
          <div class='perplist_Title'></div>
          <div class='perplist_botleftName'>户口所在地编码 ：</div>
          <div class='perplist_botleftNum'>{{form.permanreside}}</div>
          <div class='perplist_Title'></div>
          <div class='perplist_botleftName'>工作电话 ：</div>
          <div class='perplist_botleftNum'>{{form.workPhone}}</div>
          <div class='perplist_Title'></div>
        </div>
        <div slot="footer" class="">
        <el-button type="success" @click="dialogFormVisible = false; watchTrue()" class='pwesonClose'>关 闭</el-button>
        </div>
      </el-dialog>
      <!-- 编辑模态框 -->
      <el-dialog  :visible.sync="dialogFormVisible" :visible="controlDialog" :show-close='false' class='title_message' size='largepeoli'>
        <div class='person_title'>基本信息</div>
        <div class='pic'></div>
        <div class='perplist_topleft'>
          <div class='perplist_Name'>姓名 ：</div>
          <input type='text' class='perplist_Num' v-model='form.fullName' v-on:blur='name' >
          <span class='star'>*</span>
          <div class='perplist_Title' ><span class='glyphicon glyphicon-remove' v-if='nameControl'>{{nameMessage}}</span></div>
          <div class='perplist_Name'>生日 ：</div>
          <div>
            <el-date-picker
              :editable='false'
              v-model="birtyday"
              type="date"
              id='dataChose'
              format='yyyy-MM-dd'
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
          <div class='perplist_Title'></div>
          <div class='perplist_Name'>域账号 ：</div>
          <input type='text' class='perplist_Num' v-model='form.domainUser' v-on:blur='domainUser'>
          <div class='perplist_Title'><span class='glyphicon glyphicon-remove' v-if='domainUserControl'>数字字母下划线连接符组成</span></div>
          <div class='perplist_Name'>所属机构 ：</div>
            <el-popover
              v-if='tittleTopControl'
              ref="popoverpersonListed"
              placement="top-start"
              title="所属机构"
              width=""
              trigger="hover"
              :content="infoOrg1">
            </el-popover>
            <el-select v-popover:popoverpersonListed
              class='perplist_NumOrg'
              v-model="value9"
              :multiple='true'
              filterable
              :clearable = 'true'
              :remote='true'
              :placeholder="infoOrg1"
              :remote-method="remoteMethod3"
              :loading="loading">
              <el-option
                v-for="item in options4"
                :key="item[0]"
                :label="item[1]"
                :value="item[0]">
              </el-option>
            </el-select>
          <div class='perplist_Title'></div>
         </div>
         <div class='perplist_botright'>
          <div class='perplist_botleftName'>工号 ：</div>
          <input type='text' class='perplist_botleftNum' v-model='pCode'>
          <span class='starPerlist'>*</span>
          <div class='perplist_Titleb'><span class='glyphicon glyphicon-remove' v-if='pCodeControl'>{{messagePcode}}</span></div>

          <div class='perplist_botleftName'>分机号 ：</div>
          <input type='text' class='perplist_botleftNum' v-model='form.extension' v-on:blur='extension'>
          <div class='perplist_Titleb'><span class='glyphicon glyphicon-remove' v-if='extensionControl'>您输入的数值有误</span></div>
          
          <div class='perplist_botleftName'>职级 ：</div>
           <el-select v-model="form.positionState" clearable placeholder="请选择职级" class='perplist_botleftNumJobNum'>
            <el-option
              v-for="item in option1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
           </el-select>
           <div class='perplist_Titleb'></div>
          <div class='perplist_botleftName'>政治面貌 ：</div>
           <el-select v-model="form.polity"  placeholder="请选择政治面貌" class='perplist_botleftNumJobNum'>
            <el-option
              v-for="item in optionsPolity"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
           </el-select>
          <div class='perplist_Titleb'></div>
          <div class='perplist_botleftName'>进所日期 ：</div>
          <el-date-picker
            class='perplist_botleftNumData'
            v-model="joinsysdate"
            type="date"
            id='dataChose'
            :editable='false'
            format='yyyy-MM-dd'
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
          <div class='perplist_Titleb'></div>
        </div>
        <div class='perplist_topright'>
          <div class='perplist_Name'>个人手机号 ：</div>
            <input type='text' class='perplist_Num' v-model='form.homeMobile' v-on:blur='homeMobile'>
          <div class='perplist_Title'><span class='glyphicon glyphicon-remove' v-if='homeMobileControl'>请输入正确的手机号且不为空</span></div>
          <div class='perplist_Name'>家庭电话 ：</div>
            <input type='text' class='perplist_Num' v-model='form.homePhone' v-on:blur='homePhone'>
          <div class='perplist_Title'><span class='glyphicon glyphicon-remove' v-if='homePhoneControl'>请输入座机号且注意格式</span></div>
          <div class='perplist_Name'>CDMA手机号 ：</div>
            <input type='text' class='perplist_Num' v-model='form.workMobile' v-on:blur='workMobile'>
          <div class='perplist_Title'><span class='glyphicon glyphicon-remove' v-if='workMobileControl'>请输入正确的手机号且不为空</span></div>
          <div class='perplist_Name'>电子邮箱 ：</div>
            <input type='text' class='perplist_Num' v-model='form.email' v-on:blur='email'>
          <div class='perplist_Title'><span class='glyphicon glyphicon-remove' v-if='emailControl'>请填写电子邮箱且注意格式</span></div>
        </div>
        <div class='perplist_botleft'>
          <div class='perplist_botleftName'>参加工作日期 ：</div>
          <el-date-picker
            class= 'perplist_botleftNumData'
            v-model="joinworkdate"
            type="date"
            :editable='false'
            id='dataChose2'
            format='yyyy-MM-dd'
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
          <div class='perplist_Titleb'></div>
          <div class='perplist_botleftName'>家庭住址 ：</div>
          <input type='text' class='perplist_botleftNum' v-model='form.address'>
          <div class='perplist_Titleb'></div>
          <div class='perplist_botleftName'>邮政编码 ：</div>
          <input type='text' class='perplist_botleftNum' v-model='form.postalcode' v-on:blur='postalcode'>
          <div class='perplist_Titleb'><span class='glyphicon glyphicon-remove'  v-if='postalcodeControl'>邮政编码格式有误</span></div>
          <div class='perplist_botleftName'>户口所在地编码 ：</div>
            <input type='text' class='perplist_botleftNum' v-model='form.permanreside' v-on:click='permanreside' v-if='permanresideControlInput'>
            <div  class='perplist_botleftNumAd' v-if='permanresideControlSelect'><v-distpicker :province="select.province" :city="select.city" :area="select.area" @selected='onSelected' ></v-distpicker></div>
          <div class='perplist_Titleb'><span class='addressNumper'>户口所在地请精确到区</span></div>
          <div class='perplist_botleftName'>工作电话 ：</div>
          <input type='text' class='perplist_botleftNum' v-model='form.workPhone' v-on:blur='workPhone'>
          <div class='perplist_Titleb'><span class='glyphicon glyphicon-remove' v-if='workPhoneControl'>请输入座机号码且注意格式</span></div> 
        </div>
        
        <div v-if='contorl' class = 'PersonlistTittlecontrol'>{{message}}</div>
        <div slot="footer" class="peoFotter">
          <el-button @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false ; editorPerinfo()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        emptyText : '数据正在加载中...',
        permanresideControlSelect : false, 
        permanresideControlInput : true,
        tittleTopControl : true,
        select: { },
        option1: [
          {
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
        pickerOptions0: {
          disabledDate(time) {
          }
        },
        infoOrg1 : '',
        messagePcode : '',
        value9 : [],
        loading : false,
        options4 : [],
        list : [],
        options: [{
          value: 'fullName',
          label: '姓名'
        }, {
          value: 'pCode',
          label: '工号'
        }],
        pickerOptions1: {
          disabledDate(time) {
          }
        },
        joinworkdate : '',
        birtyday : '',
        joinsysdate : '',
        tt : [],
        tableData: [],
        deptNamenew : '',
        dialogFormVisible : false,
        contorl : false,
        form :{},
        formLabelWidth : '220px',
        controlDialog : false,
        delete_aid : '',
        num : 0,
        full_name : 'fullName',
        pagenum : 10,
        pageallnum : 0,
        currentPage1: 1,
        search_name : '',
        controlDialog1 : false,
        dialogFormVisible1 : false,
        oid : '1',
        pid : '',
        term : '',
        passOid : [],
        personId : '',
        valueoidNew : [],
        passPcode : '',
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
      }
    },
    created(){
       this.user_list_get();
    },
    computed: {
      deptName2(){
        return this.$store.state.deptName2
      }
    },
    watch:{
      pCode(a,b){
        this.pCodeOnly(a)
      }
    },

    methods: {
      onSelected(data){
        this.form.permanreside =  data.area.code;
      },  
      permanreside(){
        this.permanresideControlSelect = true
        this.permanresideControlInput = false
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
//          return false
//       }else{
//         var s = /^[0-9]*$/
//         if(s.test(this.form.extension)){
//           this.extensionControl = false
//         }else{
//           this.extensionControl = true
//         }
//       }
      },
      pCodefun(a){
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
        if(a == this.passPcode){
          return false
        }else{
          var url = '/uums_mgr/person/pCode'
          var data = {};
          data.pCode = a;
          this.$http.post(url,data,{emulateJSON:true}).then(res=>{
            if(res.body == true){
              this.pCodeControl = false
              this.messagePcode = ''
              this.pCodefun(a)
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
      //编辑提交
      editorPerinfo(){
        this.valueoidNew = []
        this.contorl = false;
        this.message = ''
        var newdata = this.form;
        newdata.pCode = this.pCode;
        var joinworkdate = this.joinworkdate
        var birtyday = this.birtyday
        var joinsysdate = this.joinsysdate
        newdata.birtyday = this.validate.turnDate(birtyday);
        newdata.joinsysdate = this.validate.turnDate(joinsysdate);
        newdata.joinworkdate = this.validate.turnDate(joinworkdate);
        if( this.value9.length == 0 ){
          if(this.passOid == null){
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
        newdata.organizations = this.valueoidNew
        if( newdata.fullName == [] ||  newdata.fullName == null){
            newdata.fullName = ''
        }
        var fullName = newdata.fullName.toString()
        if( fullName.trim() == '' ){
          this.contorl = true;
          this.message = '姓名不能为空'
        }
        else if(this.form.pCode == '' || this.form.pCode == null){
          this.contorl = true;
          this.message = '工号不能为空'
        }
        else if(newdata.organizations  == [] || newdata.organizations  == null || newdata.organizations  == ""){
          this.contorl = true;
          this.message = '所属机构不能为空'
        }
        else if(this.nameControl == true || this.domainUserControl == true || this.workMobileControl == true || this.homePhoneControl == true || this.homeMobileControl == true || this.emailControl == true || this.postalcodeControl == true || this.workPhoneControl == true || this.extensionControl == true || this.pCodeControl == true){
          this.contorl = true;
          this.message = '请注意输入格式'
        }else{
          var data = JSON.stringify(newdata)
          var url =  '/uums_mgr/person/update';
          this.$http.post(url,data,{emulateJSON:true}).then(res=>{
            var datapAss = JSON.parse(res.bodyText)
            if(datapAss.result == 'success'){
              this.$message({
                type: 'success',
                message: '编辑成功!'
              });
            }else{
              this.$message.error('编辑失败')
            }
            this.controlDialog = false;
            this.contorl = false;
            this.message = ''
            this.select = {}
            this.permanresideControlSelect = false  
            this.permanresideControlInput = true;
            this.value9 = []
            this.valueoidNew = []
            this.passOid = []
            this.infoOrg1 = ''
            this.user_list_get()
          },res=>{
            this.$message.error('编辑失败')
          })
        }
      },

      handleLook(index, row) {
        this.value9 = []
        this.nameControl = this.domainUserControl = this.workMobileControl =this.homePhoneControl =this.homeMobileControl = this.emailControl = this.postalcodeControl =this.workPhoneControl =this.extensionControl =this.pCodeControl = false;
        this.contorl = false;
        this.message = ''
        this.controlDialog = true;
        this.pCodeControl = false;
        if( row.organizations == null){
          this.infoOrg1 = ''
        }else{
          for( var i = 0; i< row.organizations.length;i++){
            var passoidName = {}
            passoidName.oid=  row.organizations[i].oid
            this.passOid.push(passoidName)
          }
          for( var i = 0; i< row.organizations.length;i++){
            this.infoOrg1 = this.infoOrg1 +  row.organizations[i].deptName +  '   ';
          }
          this.passPcode = row.pCode
          this.joinsysdate = row.joinsysdate
          this.birtyday = row.birtyday
          this.joinworkdate = row.joinworkdate
          this.form = row;
          this.pCode = row.pCode
          if(row.polity == null){
            this.form.polity = ''
          }else{
            this.form.polity =row.polity.toString()
          }
        }
      },
      addpersonBtu(){
        this.$router.push('/addpersonfit')
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
      //刚进页面默认渲染
      user_list_get(){
        var url = '/uums_mgr/person/findAll?pageNum=' + this.currentPage1 + '&pageSize=' + this.pagenum +'&'+ this.full_name +'=' + this.term;
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

      deletepersonInfo(index,row){
        this.pid = row.pid
        this.open2()
      },

      open2() {
        this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editor2();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      cancle3(){
        this.dialogFormVisible1 = false;
        this.controlDialog1 = false;
      },
      watchTrue(){
        this.dialogFormVisible1 = false;
        this.controlDialog1 = false;
        this.deptNamenew = ''
      },
      editor2(){
        var url = '/uums_mgr/person/delete?pid=' + this.pid;
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
      changeInfo(index,row){
      },

      searchByname(){
        var url = '/uums_mgr/person/findAll?pageNum=' + this.currentPage1 + '&pageSize=' + this.pagenum +'&'+ this.full_name +'=' + this.term;
        this.$http.get(url).then(res=>{
          this.tableData = res.body.content;
          this.num = res.body.totalElements;
        },res=>{
        })
      },
      viewJob(index,row){
        this.$store.state.pid = window.localStorage.pid = row.pid;
        this.$store.state.joblistIndex =  window.localStorage.joblistIndex = '1'
        this.$store.state.authore = window.localStorage.fullName = row.fullName
        this.$router.push('/person/fondbyPerson')
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
      handleEdit(index, row){
        for( var i = 0; i< row.organizations.length;i++){
          this.deptNamenew =  this.deptNamenew +  row.organizations[i].deptName + ' ';
        }
        this.form = row;
        this.joinsysdate = row.joinsysdate
        this.birtyday = row.birtyday
        this.joinworkdate = row.joinworkdate
        this.controlDialog1 = true;
        if(row.polity == null){
            this.form.polity = ''
        }else{
            this.form.polity = row.polity.toString()
        }
      },
      cancle(){
        this.controlDialog = false;
        this.user_list_get()
        this.infoOrg1  = ''
        this.passOid = [];
        this.select = {}  
        this.permanresideControlSelect = false  
        this.permanresideControlInput = true;
      },
      Addcancle(){
        this.controlDialogAdd = false;
        this.user_list_get()
        this.infoOrg1  = ''
        this.passOid = [];
      },
      editor(){
        this.controlDialog = false;
        this.user_list_get()
        this.infoOrg1 = ''
        this.passOid = []
      },
    },
  }
</script>

<style>
  #app .personliseAll .el-input.is-disabled .el-input__inner {
    background-color: #fff!important;
  }
  .personliseAll .el-date-editor.el-input {
    width: 269px;
  }
  .perplist_botleft .address select{
    width : 32%;
    height : 30px;
    line-height : 15px;
  }
  .personliseAll .el-input__inner {
    height: 30px;
  }
  .el-input {
    margin-bottom: 0px!important;
  }
   .perplist_botleftNumpolity .el-input.is-disabled .el-input__inner{
    background-color : #e4e8f1;
    color : black;
  }
  .el-select__tags{
    padding-top: 5px;
    transform: translateY(0)!important;
    top: 0!important;
  }
  .el-dialog--largepeoli {
    color: inherit;
    border-radius: 8px;
    font-family: inherit;
    background-color: #fff;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    width: 86%;
  }
</style>




<style scoped>
  
  .addressNumper{
    color: #7d7d7d;
  }
  
  .peosonlistSearch{
    margin-left: 10px;
    margin-top: 0px;
  }
  .peosonlistSearchimput{
    height: 30px;
    line-height: 30px;
    width: 200px;
  }
  
  .peoFotter{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .pwesonClose{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .perplist_linemiddle{
    position: absolute;
    top:350px;
    left: 0;
    width: 100%;
    border: 1px solid #e5e5e5;
  }
  .perplist_botleftName{
    width: 170px;
    padding-right: 5px;
    text-align: right;
    height: 30px;
    line-height:30px;
    float: left;
    padding-left: 2px;
  }
  .perplist_botleftNum{
    width: 310px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
    text-indent: 5px; 
    border-radius: 3px;
    border: 1px solid #ccc;
  }
   .perplist_botleftNumAd{
     width: 310px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
   }
  .perplist_botleftNumpolity{
    width: 310px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
  }
 
  .perplist_botleftNumData{
    width: 310px!important;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
  }
  .perplist_botleftNumDataLook{
    width: 310px!important;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
    text-indent: 5px;
    border: 1px solid #ccc;
  }
  .perplist_botleft{
    width: 500px;
    height: 369px;
    margin-left: 20px;
    margin-top: 20px;
  }
  .perplist_botleftNumJobNum{
    width: 310px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
  }
  .perplist_NumOrg{
    width: 270px;
    float: left;
    text-align: left;
  }
  .perplist_Num{
    width: 270px;
    height: 30px;
    float: left;
    line-height: 30px;
    text-align: left;
    text-indent: 5px;
    border-radius: 3px;
    border: 1px solid #ccc
  }
  .perplist_Title{
    width:480px!important;
    height: 30px;
    line-height: 30px;
    float: left;
    color: red;
    font-size: 12px;
    text-align : left ;
    padding-left : 145px;
  }
  .perplist_Titleb{
    width:480px;
    height: 30px;
    line-height: 30px;
    float: left;
    color: red;
    font-size: 12px;
    text-align: left;
    padding-left : 170px;
  }
  .perplist_Name{
    width: 145px;
    padding-right: 5px;
    text-align: right;
    height: 30px;
    line-height:30px;
    float: left;
    padding-left: 2px;
  }
  .perplist_botright{
    width: 500px;
    height: 369px;
    float:right;
    margin-top : 20px;
    margin-right: 25px;
  }
  .perplist_topleft{
    padding-top: 5px;
    margin-left: 170px;
    width: 430px;
    height: 270px;
  }
  .perplist_topright{
    padding-top: 5px;
    position: absolute;
    width: 430px;
    height: 255px;  
    right: 74px;
    top: 50px;
  }
  
  .pic{
    width: 190px;
    background: url("../../assets/img/default.jpg") center;
    height: 190px;
    position: absolute;
    left: 20px;
    top: 50px;
  }
  #dataChose{
    margin-right: 0px!important;
    float: left;
  }
  .person_title{
    position: absolute;
    left: 8px;
    top: 8px;
  }
  .fl{
    float : left;
    height : 30px;
  }
  .perlist_allside{
    margin-bottom : 20px;
    margin-top: 17px;
    height : 31px;
    position: relative;
    padding-right: 15px;
  }
  
  .personListSearchBtn{
    margin-left : 10px!important;
  }
  .addinfopeo{
    float : right;
  }
  .PersonlistTittlecontrol{
    position: absolute;
    bottom: 87px;
    color: red;
    left: 500px;
    font-size : 15px;
  }
  
  .oidNameMore{
    display: inline-block;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .starPerlist{
    color: red;
    font-size: 14px;
    height: 30px;
    display: inline-block;
    line-height: 30px;
  }
</style>
