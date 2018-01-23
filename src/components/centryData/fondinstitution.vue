<template>
 <div class="cont  ainer-fluid orgFindAll">
     <!--主体-->
      <div class="panel panel-default">
       <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
          <el-table-column
          label="机构名称"
          prop='deptName'
          fixed
          width="234">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.deptName }}</span>
          </template>
          </el-table-column>
          <el-table-column
            label="公司名称"
            prop='corpName'
            width="162">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.corpName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="机构简称"
            prop='deptAbbr'
            width="143">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.deptAbbr }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="机构代码"
            prop='deptCode'
            width="167">
            <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.deptCode }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="内序"
            prop='deptOrder'
            width="167">
            <template scope="scope">
               <span style="margin-left: 10px">{{ scope.row.deptOrder }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="部门成立时间"
            prop='createdate'
            width="141">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.createdate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="机构类型"
            prop='deptType'
            width="130">
            <template scope="scope">
               <span style="margin-left: 10px">{{ scope.row.deptTname }}</span>
            </template>
          </el-table-column>
          
           <el-table-column
            width="230"
            fixed='right'
            label="操作"
           >
             <template scope="scope">
              <button size="large" type='text' icon="edit" @click="handlelook(scope.$index, scope.row);  dialogFormVisible = true;" class='btn btn-success btn-xs'>
                   查看
             </button>
             <button size="large" type='text' icon="document" @click="handleEdit(scope.$index, scope.row);  dialogFormVisible = true;" class='btn btn-success btn-xs'>
                   编辑
             </button>
             <button size="large" type="text" @click="handleadd(scope.$index, scope.row);  dialogFormVisible = true;" class='btn btn-success btn-xs'>
                   添加子机构
              </button>
             <button type='success' icon="delete2" @click='deleteRow(scope.$index,scope.row)' class="btn btn-warning btn-xs">
                   删除
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
       <!-- 模态框 -->
       <el-dialog title="机构信息编辑" :visible.sync="dialogFormVisible" :visible="controlDialog" :show-close='false' class='title_message' size='searchourfit'>
          <el-form :model="form">
            <el-form-item label="机构名称" :label-width="formLabelWidth" class='fOurfitLable'>
              <el-input v-model="form.deptName" auto-complete="off" class='fOurfitouned'></el-input>
              <span class='star'>*</span>
            </el-form-item>
            
            <el-form-item label="机构代码" :label-width="formLabelWidth" class='fOurfitLable'>
              <el-input v-model="form.deptCode" auto-complete="off"" class='fOurfitouned'></el-input>
              <span class='star'>*</span>
            </el-form-item>
            <el-form-item label="机构类型" :label-width="formLabelWidth" class='fOurfitLable'>
              <el-select v-model="form.deptType"  placeholder="请选择部门类型" class='fOurfitouned '>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                </el-select>
              <span class='star'>*</span>
            </el-form-item>
            <el-form-item label="内序" :label-width="formLabelWidth" class='fOurfitLable'>
              <el-input v-model="form.deptOrder" auto-complete="off"  class='fOurfitouned'  v-on:blur='deptOrderTree'></el-input>
              <span class='star'>*</span>
            </el-form-item>
            <el-form-item label="成立时间" :label-width="formLabelWidth" class='fOurfitLable'>
              <el-date-picker
                class='fOurfitouned'
                v-model="form.createdate"
                type="date"
                id='dataChose'
                format='yyyy-MM-dd'
                placeholder="选择日期"
                :picker-options="pickerOptions0">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="公司名称" :label-width="formLabelWidth" class='fOurfitLable'>
              <el-input v-model="form.corpName" auto-complete="off"" class='fOurfitouned'></el-input>
              <span class='star'></span>
            </el-form-item>
            <el-form-item label="机构简称" :label-width="formLabelWidth" class='fOurfitLable'>
              <el-input v-model="form.deptAbbr" auto-complete="off"" class='fOurfitouned'></el-input>
              <span class='star'></span>
            </el-form-item>
              <div class='searchOurfitdeptOrder'><div  v-if='deptOrderTreeControl'><span class='glyphicon glyphicon-remove'></span>请输入四位以内数字</div></div>
            </el-form>
            <div class='edit_message' v-if='control'>{{edit_message}}</div>
            <div slot="footer" class="footer_classonly">
              <el-button @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false ; editor()">确 定</el-button>
            </div>
       </el-dialog>
       <el-dialog title="机构信息查看" :visible.sync="dialogFormVisible" :visible="controlDialog1" :show-close='false' class='title_message' size='searchourfit'>
        <el-form :model="form">
          <el-form-item label="机构名称" :label-width="formLabelWidth">
            <el-input v-model="form.deptName" auto-complete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="机构简称" :label-width="formLabelWidth">
            <el-input v-model="form.deptAbbr" auto-complete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="机构代码" :label-width="formLabelWidth">
            <el-input v-model="form.deptCode" auto-complete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="公司名称" :label-width="formLabelWidth">
            <el-input v-model="form.corpName" auto-complete="off" readonly></el-input>
            </el-form-item>
            <el-form-item label="成立时间" :label-width="formLabelWidth">
            <el-input v-model="createdateLook" auto-complete="off" readonly></el-input>
            </el-form-item>
            <el-form-item label="内序" :label-width="formLabelWidth">
            <el-input v-model="form.deptOrder" auto-complete="off" readonly></el-input>
            </el-form-item>

            <el-form-item label="机构类型" :label-width="formLabelWidth">
              <el-input v-model="form.deptTname" auto-complete="off" readonly></el-input>
            </el-form-item>
            <el-form-item label="上级机构代码" :label-width="formLabelWidth">
            <el-input v-model="form.parentcode" auto-complete="off" readonly></el-input>
            </el-form-item>
            <div class='edit_message' v-if='control'>{{edit_message}}</div>
        </el-form>
        <div slot="footer" class="footer_classonly">
          <el-button type="success" size='samll' @click="dialogFormVisible = false ; cancle3()" class='closeBut'>关 闭</el-button>
        </div>
       </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [{
          value: 1,
          label: '公司'
        }, {
          value: 2,
          label: '部门'
        }, {
          value: 3,
          label: '社团'
        }, {
          value: 4,
          label: '待定'
        }],
        emptyText : '数据正在加载中...',
        full_name : '',
        edit_message : '',
        info : '',
        options4: [],
        deptType : '0',
        message : {},
        value9: [],
        list: [],
        loading: false,
        control: false,
        states: [],
        tt : [],
        tableData: [],
        dialogFormVisible : false,
        form :{},
        formLabelWidth : '220px',
        edit_message:'我是提示信息',
        control : false,
        controlDialog : false,
        controlDialog2 : false,
        delete_aid : '',
        delete_name : '',
        num : 0,
        pagenum : 10,
        pageallnum : 0,
        currentPage1: 1,
        search_name : '',
        createdate : '',
        createdateLook : '',
        oid : '',
        deptOrderTreeControl : false,
        passData : '请输入上级机构关键词',
        parentData : {},
        childrenData : [],
        newUrkl : '',
        controlDialog1 : false,
        deleteTittle : '',
        pickerOptions0: {
          disabledDate(time) {
          }
        }
      }
    },
    watch:{
      '$store'(newAid,oldAid){
        this.user_list_get()
      }
    },
    computed:{
      parentD(){
        return this.$store.state.parentD
      },
    },
    created(){
      this.parentData.deptName = this.$store.state.parentD.deptName = window.localStorage.deptName
      this.parentData.oid = this.$store.state.parentD.oid = window.localStorage.oid
      this.parentData.name = this.$store.state.parentD.name = window.localStorage.name
      this.user_list_get()
    },
    methods: {
      user_list_get(){
        var url = '/uums_mgr/org/findOrgsByConditions?deptName='+ this.parentData.name + '&deptType='+this.parentData.deptName+'&parentid='+this.parentData.oid+'&pageNumber=' + this.currentPage1 + '&pageSize=' + this.pagenum
        this.$http.get(url).then(res=>{
          if(res.body.content.length == 0){
            this.emptyText = '暂无数据'
          }else{
           this.emptyText = ''
          }
          for(var i = 0 ; i<res.body.content.length; i++){
            if( res.body.content[i].deptType== 1){
              res.body.content[i].deptTname = '公司'
            }else if(res.body.content[i].deptType== 2){
              res.body.content[i].deptTname = '部门'
            }else if(res.body.content[i].deptType== 3){
              res.body.content[i].deptTname = '社团'
            }else if(res.body.content[i].deptType== 4){
              res.body.content[i].deptTname = '待定'
            }
          }
          this.tableData = res.body.content
          this.num = res.body.totalElements
        },res=>{
          this.emptyText = '获取数据失败！！！'
        })
      },
      editor(){
        var data = {}
        data.oid = this.oid;
        data.deptCode = this.form.deptCode
        data.parentid = this.form.parentid
        data.deptOrder = this.form.deptOrder
        data.corpName = this.form.corpName
        data.deptType = this.form.deptType
        data.parentcode = this.form.parentcode
        data.deptName = this.form.deptName
        data.deptAbbr = this.form.deptAbbr
        data.children = this.childrenData
        if(this.form.deptName == null){
          this.form.deptName = ''
        }
        if(this.form.deptAbbr == null){
          this.form.deptAbbr = ''
        }
        if(this.form.deptCode == null){
          this.form.deptCode = ''
        }
        if(this.form.corpName == null){
          this.form.corpName = ''
        }
        if(this.form.deptType == null){
          this.form.deptType = ''
        }
        if(this.form.deptOrder == null){
          this.form.deptOrder = ''
        }
        var d = this.form.createdate
        var createdate = this.validate.turnDate(d);
        data.createdate = createdate
        if(this.form.deptName.trim() == ''){
          this.control=true
          this.edit_message = '机构名称不能为空'
        }
        else if(this.form.deptCode.trim() == ''){
          this.control=true
          this.edit_message = '机构代码不能为空'
        }
        else if(this.form.deptType.toString().trim() == ''){
          this.control=true
          this.edit_message = '机构类型不能为空'
        }
        else if(this.form.deptOrder.toString().trim() == ''){
          this.control=true
          this.edit_message = '内序不能为空'
        }
        else if(this.deptOrderTreeControl == true){
          this.control=true
          this.edit_message = '请注意输入格式'
        }
        else{
          var newdata = JSON.stringify(data)
          var url  = '/uums_mgr/org/update';
          this.$http.post(url,newdata,{emulateJSON:true}).then(res=>{
            if(res.bodyText == 'success'){
              this.controlDialog = false;
              this.control = false;
              this.control=false
              this.edit_message = ''
              this.$message({
                message : '编辑成功',
                type : 'success'
              });
              this.user_list_get()
            }else{
              this.$message.error("编辑失败")
            }
          },res=>{
          })
        }
      },
      deptOrderTree(){
        var s = /^\+?[1-9]\d{0,3}(\.\d*)?$/
        if(s.test(this.form.deptOrder)){
          this.deptOrderTreeControl = false;
        }else{
          this.deptOrderTreeControl = true
        }
      },
     
      handleClose(done){
        this.$confirm('确认关闭吗')
        .then(_=>{
          this.$route.push('/course_topic')
        })
        .catch(_=>{});
      },
      cancle3(){
        this.controlDialog1 = false;
      },
      handleSizeChange(val) {
        this.pagenum = val
        this.user_list_get()
      },
      handleCurrentChange(val) {
        this.currentPage1 = val;
        this.user_list_get()
      },
      handleadd(index,row){
        this.$router.push('/center/addInstitution/'+ row.oid)
      },
      handleEdit(index, row) {
        this.childrenData = row.children
        this.controlDialog = true;
        this.oid = row.oid;
        this.form = row;
      },
      handlelook(index, row){
        this.controlDialog1 = true;
        this.form = row;
        this.createdateLook = row.createdate
      },
      cancle(){
        this.controlDialog = false;
        this.user_list_get()
      },
      //删除
      deleteRow(index,row){
        this.deleteTittle = '';
        this.delete_aid = row.oid;
        this.open2();
      },
      getdelet(){
        var url = '/uums_mgr/org/delete?oid=' + this.delete_aid
         this.$http.get(url).then(res=>{
          this.deleteTittle = res.bodyText;
          if(  this.deleteTittle == 'success'){
            this.$message({
            type: 'success',
            message: '删除成功!'
            });
            this.user_list_get()
          } else if( this.deleteTittle == 'false'){
            this.$message.error('删除失败')
            this.user_list_get()
          }else if( this.deleteTittle == '不存在这条记录'){
            this.$message.error('不存在这条记录')
            this.user_list_get()
          }
          },res=>{
        })
      },

      open2() {
        this.$confirm('是否确定删除该机构', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getdelet();
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消删除'
          });
           this.user_list_get()
        });
      },
    },
  }
</script>

<style>
  .orgFindAll .el-table__empty-text{
    left: 40%;
  }
  .treeFather .el-select .el-input__inner {
    cursor: pointer;
    padding-right: 10px;
  }
  .orgFindAll .el-dialog--searchourfit{
    font-family : inherit;
    color : inherit;
    border-radius: 8px;
    background-color: rgb(255,255,255);
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    padding-right : 50px;
    width : 64%;
    height: 650px;
  }
  .el-table{
      font-size: 12px;
  }
  .edit_message{
    color: red ;
    text-align : center;
  }
  .el-table th>.cell{
    padding: 0 3px;
  }
  .input-group-btn{
    height : 30px !important;;
  }
  .btn-success{
    margin : 0 !important;;
  }
  table{
    table-layout : fixed !important;
    word-break : break-all;
  }

</style>
  

<style scoped>
  
  .searchOurfitdeptOrder{
    position: absolute;
    bottom: 92px;
    height: 30px;
    left: 249px;
    line-height: 15px;
    font-size: 12px;
    color: red;
  }
  .fOurfitLable .fOurfitouned{
    float: left;
    width: 90%;
  }
  
  
  .tableSize{
       font-size : 12px;
  }
  
  
  .footer_classonly{
    position: absolute;
    right: 20px;
    bottom:20px;
  }
  
  table{
    table-layout : fixed !important;
    word-break : break-all;
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
  .list_search{
    width : 200px;
    height : 30px;
    float :left;
    background-color : #ccc;
    border-radius : 3px;
  }
  .list_add{
    display : block;
    width : 50px;
    float : right;
  }
  .search_body{
    height : 30px;
    margin : 15px 10px;
  }
  .input-sm{
    border-radius : 3px;
  }
  .search_body{
    border : 0;
  }
  
  .title_message{
    color : red;
  }
  .fl{
    float : left;
    height : 30px;
  }
  #dataChose{
    margin-right : 176px;
  }
  .tableSize{
    font-size : 12px;
  }
  .el-table td, .el-table th{
    height: 60px;
  }
  .el-table{
    font-size: 12px;
  }
  .edit_message{
    color: red ;
    text-align : center;
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
  .list_search{
    width : 200px;
    height : 30px;
    float :left;
    background-color : #ccc;
    border-radius : 3px;
  }
  .list_add{
    display : block;
    width : 50px;
    float : right;
  }
  .search_body{
    height : 30px;
    margin : 15px 10px;
  }
  .input-sm{
    border-radius : 3px;
  }
  .search_body{
    border : 0;
  }
  .input-group-btn{
    height : 30px !important;;
  }
  .btn-success{
    margin : 0 !important;;
  }
  .title_message{
    color : red;
  }
  .job{
    background-color : #EFF2F7;
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
  .choose_l{
    folate : left;
  }

  .choose_all{
    width : 100%;
    position : absolute;
    left : 0;
    height : 31px;
  }
  .tsxt_info {
    width: 100%;
  }

  .fl{
    float : left;
    height : 30px;
  }
  .func6{
    margin-bottom : 20px;
    margin-top: 17px;
    height : 31px;
    position: relative;
    padding-left : 10px;
  }
  .genre{
    margin-left : -100px;
  }
  .info_massage {
    display: block;
    width: 300px;
    text-align: center;
    color: red;
    margin-left: 126px;
  }
  #choose{
    border : 1px solid rgb(169, 169, 169);
  }

  .searchname{
    position : absolute;
    left : 238px;
  }
  .searchtype{
    margin-left: 10px;
  }

  #choose{
    border : 1px solid rgb(169, 169, 169);
    display : inline-block;
    position : absolute;
    left : 281px;
  }

  .fitnameSearh{
    position : absolute;
    left : 428px;
    width : 80px;
    height : 30px;
    line-height : 30px;
  }
  


</style>
