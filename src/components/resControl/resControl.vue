<template>
  <div class="cont  ainer-fluid rescontrolAll" >
    <div class="body teacher-list">
      <ol class="breadcrumb">
        <li >数据管理</li>
        <li class="active">资源管理</li>
      </ol>
    </div>
    <el-menu :default-active="activeIndex2" class="demo" mode="horizontal" @select="handleSelect">
      <el-select v-model="genre" clearable placeholder="请选择专区" class='foundation_top'>
        <el-option
          v-for="item in options"
          :key="item.aid"
          :label="item.name"
          :value="item.aid">
        </el-option>
      </el-select>
      <el-select v-model="genre1" clearable placeholder="请选择资源类型" class='foundation_top'>
        <el-option
          v-for="item in options9"
          :key="item.code"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-select
        class='foundation_top'
        v-model="value2"
        :multiple='false'
        filterable
        :remote='true'
        placeholder="请输入名称关键词"
        :remote-method="remoteMethod2"
        :clearable = 'true'
        :loading="loading">
        <el-option
          v-for="item in options1"
          :key="item.pid"
          :label="item.fullName"
          :value="item.pid">
        </el-option>
      </el-select>
      <el-select
        class='foundation_top'
        v-model="value3"
        :multiple='false'
        filterable
        :remote='true'
        placeholder="请输入代码关键词"
        :clearable = 'true'
        :remote-method="remoteMethod3"
        :loading="loading">
        <el-option
          v-for="item in options3"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <button class="btn btn-success btn-sm foundation_topsear" v-on:click='searchGroup'>
        搜索
      </button>
      <button class="btn btn-success btn-sm " v-on:click='addGroup' id='addroleadd'>添 加</button>
    </el-menu>
    <div class="panel panel-default" v-loading = 'loadingControl' element-loading-text = '拼命加载中'>
      
      <el-tree
        empty-text = ''
        :data="data2"
        :props="defaultProps"
        node-key="id"
        class=''
        :expand-on-click-node="false"
        :default-expand-all = 'true'
        :render-content="renderContent">
      </el-tree>


      <!-- 编辑模态框 -->
      <el-dialog title="资源管理编辑" :visible.sync="dialogFormVisible" :show-close='false' :visible="controlDialog" size='resControlModel'>
        <el-form :model="form">
          <el-form-item label="系统名称" :label-width="formLabelWidth" class='resLable'>
            <el-select v-model="genre2" clearable placeholder="请选择应用系统" class='resfouned'>
              <el-option
                v-for="item in optionserr"
                :key="item.aid"
                :label="item.name"
                :value="item.aid">
              </el-option>
            </el-select>
            <span class='star'>*</span>
          </el-form-item>
          <el-form-item label="代码" :label-width="formLabelWidth" class='resLable'>
            <el-input v-model="form.resourceCode" auto-complete="off" class='resfouned' v-on:blur='resControlEdTitle'></el-input>
            <div class='resControlEdTitle' v-if='resControlEdTitleControl == true'><div><span class='glyphicon glyphicon-remove'>字母下划线连接符组成</span></div></div>
            <span class='star' v-else>*</span>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth" class='resLable'>
            <el-input v-model="form.resourceName" auto-complete="off" class='resfouned'></el-input>
            <span class='star'>*</span>
          </el-form-item>
          <el-form-item label="资源类型" :label-width="formLabelWidth" class='resLable'>
            <el-select v-model="valueType"  placeholder="资源类型" class='resfouned'>
              <el-option
                v-for="item in optionsType"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <span class='star'>*</span>
          </el-form-item>
          <el-form-item label="URI描述	" :label-width="formLabelWidth" class='resLable'>
            <el-input v-model="form.uri" auto-complete="off" class='resfouned' v-on:blur='resControleduri'></el-input>
            <div class='resControleduri' v-if='resControleduriControl==true'><div><span class='glyphicon glyphicon-remove'></span>长度在100以内</div></div>
            <span class='star' v-else>*</span>
          </el-form-item>
          <el-form-item label="操作类型" :label-width="formLabelWidth" class='resLable'>
            <v-select multiple :options="optionsDo"  v-model="valueDo" label="name" value='code' class='resfouned'></v-select>
            <span class='star'>*</span>
          </el-form-item>
          <div v-if='control' class='tsxt_infoErr'>
            <span class='info_massageErr'>{{message}}</span>
          </div>
        </el-form>
        <div slot="footer" class="resControl-footer">
          <el-button @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false ; editor()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 查看模态框 -->
      <el-dialog title="资源管理编辑" :visible.sync="dialogFormVisibleLook" :show-close='false' :visible="controlDialogLook" size='resControlModel'>
        <el-form :model="form">
          <el-form-item label="系统名称" :label-width="formLabelWidth" class='resLable'>
            <el-select v-model="genre2" clearable placeholder="请选择应用系统" class='resfouned' disabled>
              <el-option
                v-for="item in optionserr"
                :key="item.aid"
                :label="item.name"
                :value="item.aid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代码" :label-width="formLabelWidth" class='resLable'>
            <el-input v-model="form.resourceCode" auto-complete="off" class='resfouned' readonly></el-input>
            <div class='resControlEdTitle'><div  v-if='resControlEdTitleControl'><span class='glyphicon glyphicon-remove'>字母下划线连接符组成</span></div></div>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth" class='resLable'>
            <el-input v-model="form.resourceName" auto-complete="off" class='resfouned' readonly></el-input>
          </el-form-item>
          <el-form-item label="资源类型" :label-width="formLabelWidth" class='resLable'>
            <el-select v-model="valueType" clearable placeholder="资源类型" class='resfouned' disabled>
              <el-option
                v-for="item in optionsType"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="URI描述	" :label-width="formLabelWidth" class='resLable'>
            <el-input v-model="form.uri" auto-complete="off" class='resfouned' readonly></el-input>
            <div class='resControleduri'><div  v-if='resControleduriControl'><span class='glyphicon glyphicon-remove'></span>长度在100以内</div></div>
          </el-form-item>
          <el-form-item label="操作类型" :label-width="formLabelWidth" class='resLable'>
            <el-popover
              ref="popover1"
              placement="top-start"
              title="nginx重定向URL"
              width=""
              trigger="hover"
              :content="form.name">
            </el-popover>
            <el-input v-popover:popover1 v-model="form.name" auto-complete="off" class='resfouned' readonly></el-input>
          </el-form-item>
          <div v-if='control' class='tsxt_info'>
            <span class='info_massage'>{{message}}</span>
          </div>
        </el-form>
        <div slot="footer" class="resControl-footer">
          <el-button type="success" @click="dialogFormVisibleLook = false ; editorLook()">关 闭</el-button>
        </div>
      </el-dialog>
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
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        data2: [],
        defaultProps: {
          id : 'aid',
          children: 'children',
          label: 'resourceName'
        },
        resControlEdTitleControl : false,
        resControleduriControl : false,
        value10 : '',
        options5 : [],
        value2 : '',
        value3 : '',
        options3 : [],
        loading : false,
        options: [],
        list : [],
        valueDo :[],
        optionsDo :[
        ],
        valueType : '',
        optionsType : [],
        genre2 : '',
        options2 : [],
        optionserr : [],
        passGenre : '',
        passGenre1 : '',
        passValue2  : '',
        passValue3 : '',
        activeIndex: '1',
        activeIndex2: '1',
        tab : true,
        tabzu : false,
        tableData: [],
        options: [],
        options9: [],
        genre1 : '',
        dialogFormVisible : false,
        dialogFormVisible_group : false,
        dialogFormVisibleLook : false,
        controlDialogLook : false,
        form :{
          resourceCode : '',
          resourceName : '',
          uri : '',
        },
        form_group : {},
        full_name : '机构/人',
        genre : '',
        formLabelWidth : '220px',
        control : false,
        message : '',
        searchData : '',
        controlDialog : false,
        delete_userName : '',
        controlDialog_group : false,
        ledetegroup_Info : '',
        delete_gid : '',
        aid : '',
        asideLists : [],
        name : '',
        guid : '',
        fullName : '',
        groupName : '',
        roleName : '',
        resource : '',
        reid : '',
        num : 0,
        num_group : 0,
        pagenum : 10,
        pageallnum : 0,
        currentPage1: 1,
        loadingControl : true,
        options1 : [],
      }
    },
    created(){
      this.asideGet();
      this.resourcefun();
      this.userList();
    },
    methods:{
      editorLook(){
        this.controlDialogLook = false;
      },

      handleSizeChange(val) {
        this.pagenum = val
        this.userList()
      },
      handleCurrentChange(val) {
        this.currentPage1 = val;
        this.userList()
      },
      job(index,row){
      },
      renderContent(h, { node, data, store }) {
        return (
         <span>
           <span>
             <span>{node.label}</span>
           </span>
           <span style="float: right; margin-right: 20px">
            <el-button size="mini" type='success' icon="edit" on-click={ () => this.handleLook(store, data) }>查看</el-button>
            <el-button size="mini" type='success' icon="document" on-click={ () => this.handleEdit(store, data) }>编辑</el-button>
            <el-button size="mini" type='success' icon="plus" on-click={ () => this.addSon(store, data) }>添加子集</el-button>
            <el-button size="mini" type='warning' icon="delete2"  on-click={ () => this.deleteRow(store, data) }>删除</el-button>
           </span>
        </span>);
      },
      addSon(store,data){
        let reid = ''
        let aid = ''
        let parentId = ''
        reid = data.reid
        aid = data.aid
        parentId = data.parentid
        if(parentId == null || parentId == ''){
          parentId = 0
        }
        this.$router.push('/addresource/' + reid + '/' + aid + '/' + parentId)
      },
      searchGroup(){
        this.passGenre = this.genre
        this.passGenre1 = this.genre1
        this.passValue2  = this.value2
        this.passValue3 = this.value3
        this.userList();
      },
      userList(){
        var url_data = '&pageNum=' + this.currentPage1 +'&pageSize=' + this.pagenum
        var url  = '/uums_mgr/resource/findAll?aid=' + this.passGenre + '&type=' +  this.passGenre1 + '&name=' +  this.passValue2 + '&code=' + this.passValue3 + url_data 
        this.$http.get(url).then(res=>{
          this.data2 = res.body.list
          this.num = res.body.total
          this.loadingControl = false;
        },res=>{
        })
      },
      editor(){
        var data = this.form;
        data.typeName = this.valueType
        if(this.valueDo == '' || this.valueDo == null ||this.valueDo == []){
          data.operationCodes = ''
          data.operationNames = ''
        }else{
          var a = [];
          var c = []
          for(var i = 0 ; i<this.valueDo.length ; i++){
            a.push(this.valueDo[i].code)
            c.push(this.valueDo[i].name)
          }
          var code = ''
          var name = ''
          code = a.join(',')
          name = c.join(',')
          data.operationCodes = code
          data.operationNames = name
        }
        data.aid = this.genre2
        data.typeCode = this.valueType;
        if( data.resourceCode.trim() == '' ||  data.resourceCode== null ){
          this.control  = true;
          this.message = '代码不能为空'
        }
        else if( data.resourceName.trim() == '' ||  data.resourceName== null ){
          this.control  = true;
          this.message = '名称不能为空'
        }
        else if( this.genre2 == '' ||  this.genre2 == null ){
          this.control  = true;
          this.message = '系统名称不能为空'
        }
        else if( this.valueType == '' ||  this.valueType == null ){
          this.control  = true;
          this.message = '资源类型不能为空'
        }
        else if( data.uri == '' ||   data.uri == null ){
          this.control  = true;
          this.message = 'URL描述不能为空'
        }
        else if( this.valueDo == '' ||   this.valueDo == null || this.valueDo == []){
          this.control  = true;
          this.message = '操作类型不能为空'
        }
        else if( this. resControlEdTitleControl == true ||   this.resControleduriControl==true ){
          this.control  = true;
          this.message = '请注意输入类型'
        }
        else{
          var edData = JSON.stringify(data)
          console.log(edData)
          var url  = '/uums_mgr/resource/update';
          this.$http.post(url,edData,{emulateJSON:true}).then(res=>{
            var passData = JSON.parse(res.bodyText)
            if(passData.result == 'success'){
              this.$message({
                message : '编辑成功',
                type : 'success'
              });
            }else{
              this.$message.error('编辑失败')
            }
            this.controlDialog = false;
            this.userList();
            this.control  = false;
            this.message = ''
          },res=>{
            this.$message.error('编辑失败')
          })
        }
      },

      resControleduri(){
        if(this.form.uri == '' || this.form.uri == null){
          return false
          this.resControleduriControl = false
        }else{
          var data = this.form.uri.split('')
          if(data.length > 100){
            this.resControleduriControl = true;
          }else{
            this.resControleduriControl = false
          }
        }
      },

      resControlEdTitle(){
        if(this.form.resourceCode == '' || this.form.resourceCode == null){
          return false
          this.resControlEdTitleControl = false
        }else{
          this.resControlEdTitleControl = this.validate.domainUserFun(this.form.resourceCode)
        }
      },

      asideGet2(){
        this.getOrg.getOrgOption().then(res=>{
          this.optionserr = res.body
        },res=>{
        })
      },

      handleEdit(index, row) {
        this.valueDo = []
        var passData = []
        this.rescourseDo(row)
        this.resControlEdTitleControl = false;
        this.control = false;
        this.asideGet2();
        this.rescourseType()
        this.form = row;
        this.toArryfun(row,passData)
        this.valueDo = passData
        this.valueType = row.typeCode
        this.genre2 = row.aid
        this.controlDialog = true;
      },

      toArryfun(row,passData){
        console.log(row.operationNames)
        if(row.operationNames == '' || row.operationNames == []){
          row.operationNames = ''
          passData = []
        }else{
          let names = [] 
          let val = []
          names = row.operationNames.split(',')
          val = row.operationCodes.split(',')
          for(var i = 0 ; i< names.length ; i++){
            let data = {}
            data.name = names[i]
            data.code = val[i]
            passData.push(data)
          }
        }
      },

      rescourseDo(row){
        var data = [];
        var url  = 'uums_mgr/resource/findOperations?parentid=' + row.parentid;
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


      handleLook(index, row){
        this.form.name = '';
        this.resControlEdTitleControl = false;
        this.control = false;
        this.asideGet2();
        this.rescourseType()
        this.form = row;
        this.form.name = row.operationNames
        this.valueType = row.typeCode
        this.genre2 = row.aid
        this.controlDialogLook = true;
      },
      resourcefun(){
        var url  = '/uums_mgr/type/findAll';
        this.$http.get(url).then(res=>{
          this.options9 = res.body
        },res=>{
        })
      },
      rescourseType(){
        var url  = '/uums_mgr/type/findAll';
        this.$http.get(url).then(res=>{
          this.optionsType = res.body
        },res=>{
        })
      },

      
      asideGet(){
        this.getOrg.getOrgOption().then(res=>{
          this.options = res.body
        },res=>{
        })
      },

      remoteMethod2(query) {
        var childThis = this;
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
          this.loading = false;
          this.getOrg.choose1(query,childThis)
          this.options2 = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.getOrg.choose1(query,childThis)
          this.options2 = [];
        }
      },

      choose3(query){
        var url = '/uums_mgr/resource/findCode?code='+ query
        this.$http.get(url).then(res=>{
          this.options3 = res.body;
        },res=>{
        })
      },

      remoteMethod3(query) {
        var childThis = this;
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
          this.loading = false;
          this.choose3(query);
          this.options3 = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.choose3(query)
          this.options3 = [];
        }
      },
      deleteRow(index,row){
        console.log(row);
        this.peid = row.peid;
        this.open2()
      },

      open2() {
        this.$confirm('是否确定删除该资源', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editor2()
        }).catch(() => {  
            this.$message({
            type: 'info',
          message: '已取消删除'
        });
        });
      },
      editor2(){
        var url_delete = '/uums_mgr/resource/delete?peid=' + this.peid;
        this.$http.get(url_delete).then(res=>{
          console.log(res)
          var passData = JSON.parse(res.bodyText)
          if(passData.result == 'success'){
            this.$message({
              message : '删除成功',
              type : 'success'
            });
          }else{
            this.$message.error('删除失败')
          }
          this.userList()
        },res=>{
          this.$message.error('删除失败')
        })
      },
      cancle2(){
        this.controlDialog2 = false;
      },
      usergroup(){
        this.tab = false;
        this.groupList();
        this.tabzu = true;
      },
      user(){
        this.tabzu = false;
        this.userList();
        this.tab = true;
        console.log('成功')
      },
      cancle(){
        this.controlDialog = false;
        this.userList();
      },
      search(){
        this.userList()
      },

      addGroup(){
        this.$router.push('/addresource/0/0/0');
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
};
</script>

<style>


  .rescontrolAll .el-dialog__body {
    padding: 30px 20px 10px 20px;
    color: #48576a;
    font-size: 14px;
  }

  .el-input__inner{
    height : 30px;
  }
  .resType{
    width : 90%;
  }
  .resControleduri{
    height: 30px;
    line-height:30px;
    font-size: 12px;
    color: red;
    text-indent: 5px;
    text-align: left;
  }
  .resControlEdTitle{
    height: 30px;
    line-height:15px;
    font-size: 12px;
    color: red;
    text-align: left;
  }
  .resLable .resfouned{
    float: left;
    width: 410px;
  }
  .el-dialog--resControlModel{
    font-family : inherit;
    color : inherit;
    border-radius: 8px;
    background-color: rgb(255,255,255);
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    padding-right : 50px;
    width: 60%;
  }
  .foundation_top{
    margin-right: 10px;
    margin-top:13px;
    width: 18%;
  }
  .foundation_topsear{
    margin-right: 10px;
    margin-top:0px;
  }

  .breadcrumb {
    margin-bottom: 0;
  }
  .el-menu {
    margin: 10px 0;
  }
  .el-input{
    margin-bottom: 10px;
  }
  .localchose{
    width : 126px;
    height: 31px;
  }
  .panel-body {
    padding: 15px;
    width: 400px;
    display: inline-block;
  }
  .demo{
    position : relative;
    height : 60px;
    background-color : #dcdcdc;
    padding-left:10px;
  }
  #addroleadd{
    position: absolute;
    right: 15px;
    top: 15px;
    width: 50px;
  }
  .resControl-footer{
    
  }
  .demojjj{
    width : 90%;
    hieght : 100%;
    display: inline-block;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .el-popover{
    background-color : #ccc;
  }
</style>

