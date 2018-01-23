<template>
  <div class='joblistHeader'>
    <div class="panel panel-default">
      <div class='joblist_all'>
        <el-select v-model="full_name" clearable placeholder="请选择搜索条件" class='jobchoosenameTit'>
          <el-option
            v-for="item in optionsChoose"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
          v-if='controlChooseorg'
          class='jobchoosenameTit specialBtn'
          v-model="valueOrg"
          :multiple='false'
          filterable
          :remote='true'
          :clearable = 'true'
          placeholder="请输入上级机构关键词"
          :remote-method="remoteMethodOrg"
          :loading="loading">
          <el-option
            v-for="item in optionsOrg"
            :key="item[0]"
            :label="item[1]"
            :value="item[0]">
          </el-option>
        </el-select>
        <el-select
          class='jobchoosenameTit specialBtn'
          v-if='controlChoosepid'
          v-model="valueName"
          :multiple='false'
          filterable
          :remote='true'
          :clearable = 'true'
          placeholder="请输入姓名关键词"
          :remote-method="remoteMethod1"
          :loading="loading">
          <el-option
            v-for="item in options1"
            :key="item.pid"
            :label="item.fullName"
            :value="item.pid">
          </el-option>
        </el-select>
        <button class="btn btn-success btn-sm  " v-on:click='search'>搜索</button>
        <button class='addclass2 btn btn-success btn-sm ' v-on:click='addjob '>添 加</button>
      </div>
         <!--列表-->
      <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
        <el-table-column
           label="机构"
           prop='deptName'
           width="180">
         <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.deptName }}</span>
         </template>
        </el-table-column>
        <el-table-column
          label="人员"
          prop='fullName'
          width="141">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fullName }}</span>
        </template>
        </el-table-column>
        <el-table-column
          label="内序"
          prop='duty'
          width="167">
            <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.duty.rank }}</span>
            </template>
        </el-table-column>
        <el-table-column
          label="职务名称"
          prop='poName'
          width="190">
          <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.poName }}</span>
          </template>
         </el-table-column>
        <el-table-column
          label="职务时效"
          prop='duty'
          width="150">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.duty.effectiveness }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
          <button size="large" type="text" @click="handleEdit(scope.$index, scope.row);  dialogFormVisible1 = true;" class='btn btn-success btn-xs'>
              查看
          </button>
          <button size="large" type="text" @click="handleLook(scope.$index, scope.row);  dialogFormVisible = true" class='btn btn-success btn-xs'>
             编辑
          </button>
           <el-button size="mini" type='warning' @click="deleteJob(scope.$index, scope.row);  dialogFormVisible = true" class='btn btn-success btn-xs'>
             删除
          </el-button>
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
        <el-dialog  :visible.sync="dialogFormVisible" :visible="controlDialog" :show-close='false' class='title_message' size='jobListModel'>
          <div class='person_title'>基本信息</div>
            <div class='bassMessageLeft'>
              <div class= 'bessClass'>部门 :</div>
              <div class= 'bassMessage_info'>
                <el-select
                  class='joblistEditdeptname'
                  v-model="value9"
                  :multiple='false'
                  filterable
                  :clearable = 'true'
                  :remote='true'
                  :placeholder="editInfo"
                  :remote-method="remoteMethod3"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item[0]"
                    :label="item[1]"
                    :value="item[0]">
                  </el-option>
                </el-select>
              </div>
              
              <div class= 'bessClass'>人员 :</div>
              <div class= 'bassMessage_info'>
                <input type="text" class="form-control input-sm joblistEditdeptname" v-model = 'form.fullName' readonly>
              </div>

              <div class= 'bessClass'>职务时效 :</div>
              <div class= 'bassMessage_info'>
                <el-select v-model="time"  placeholder="请选择部门类型" class='joblistEditdeptname'>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>

            </div> 
            <div class='nonnectWithRight'>
              <div class= 'bessClass'>职务名 :</div>
              <div class= 'bassMessage_info'>
                <el-select v-model="poCode"  placeholder="请选择职务名" class='joblistEditdeptname'>
                  <el-option
                    v-for="item in lists"
                    :key="item.poCode"
                    :label="item.poName"
                    :value="item.poCode">
                  </el-option>
                </el-select>
              </div>
              <div class= 'bessClass'>内序 :</div>
              <div class= 'bassMessage_info'>
                <input type="text" class="form-control input-sm joblistEditdeptname" v-model = 'rank' v-on:blur='jobListRank'>
              </div>
              <span class='jobliststar'>*</span>
                <div class='jobListRank' v-if='jobListRankControl'>
                  <span class='glyphicon glyphicon-remove'></span>
                  <span>请输入127小的数字</span>
                </div>
            </div>
          <div v-if='contorl' class = 'libLiStcontrol'>{{message}}</div>
          <div slot="footer" class="joblist">
            <el-button @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false " v-on:click='upDatafit()'>确 定</el-button>
          </div>
        </el-dialog>
         <!-- 查看模态框 -->
        <el-dialog :visible.sync="dialogFormVisible1" :visible="controlDialog1" :show-close='false' class='title_message' size='jobListModel'>
          <div class='person_title'>职务信息</div>
          <div class='bassMessageLeft'>
            <div class='bessClass'>部门 ：</div>
            <div class='bassMessage_info'>{{form.deptName}}</div>
            <div class='bessClass'>人员 ：</div>
            <div class='bassMessage_info'>{{form.fullName}}</div>
            <div class='bessClass'>职务名称 ：</div>
            <div class='bassMessage_info'>{{form.poName}}</div>
          </div>
          <div class='nonnectWithRight'>
            <div class='bessClass'>内序 ：</div>
            <div class='bassMessage_info'>{{rank}}</div>
            <div class='bessClass'>职务时效 ：</div>
            <div class='bassMessage_info'>{{form.effectiveness}}</div>
            <div class='bessClass'>最后更新时间 ：</div>
            <div class='bassMessage_info'>{{form.lastUpdTime}}</div>
          </div>
          <div slot="footer" class="joblist"> 
            <el-button type="success" size='small' @click="dialogFormVisible = false; watchTrue()" class='closeBtn4'>关 闭</el-button>
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
        valueOrg : '',
        optionsOrg : [],
        controlChooseorg : false,
        controlChoosepid : true,
        jobListRankControl : false,
        contorl : false,
        poCode : '',
        editInfo : '部门名为空',
        time : '',
        value9 : '',
        loading: false,
        list : [],
        options4 : [],
        optionsChoose : [
          {
            value: '1',
            label: '机构'
          }, {
            value: '2',
            label: '人员'
          }
        ],
        options: [{
          value: '全职',
          label: '全职'
        }, {
          value: '兼职',
          label: '兼职'
        }, {
          value: '实习',
          label: '实习'
        }, {
          value: '借调',
          label: '借调'
        }],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        tt : [],
        tableData: [],
        dialogFormVisible : false,
        formLabelWidth : '220px',
        controlDialog : false,
        delete_aid : '',
        oldvalueOrgname : '',
        delete_name : '',
        num : 0,
        full_name : '2',
        pagenum : 10,
        form : '',
        pageallnum : 0,
        currentPage1: 1,
        search_name : '',
        controlDialog1 : false,
        dialogFormVisible1 : false,
        oid : '',
        lists : [],
        seleteId : '',
        rank : '',
        valueOrgname : '',
        valueName : '',
        options1 : [],
      }
    },
    props : ['id'],
    created(){
      this.user_list_get();
    },
    watch:{
      full_name(newName,oldName){
        if(newName == 2){
          this.controlChoosepid = true
          this.controlChooseorg = false
        }else{
          this.controlChooseorg = true
          this.controlChoosepid = false
        }
        this.valueOrg = ''
        this.valueName = ''
      }
    },
    methods: {
      jobListRank(){
        this.jobListRankControl = this.validate.rank(this.jobListRankControl,this.rank)
      },

      search(){
        this.user_list_get();
      },
       
      //刚进页面默认渲染
      user_list_get(){
        var url  = '/uums_mgr/duty/pageDutys?pageNumber=' + this.currentPage1 + '&pageSize=' + this.pagenum + '&oid=' + this.valueOrg + '&pid=' + this.valueName
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
          this.emptyText = '数据获取失败！！！'
        })
      },
      
      remoteMethod1(query) {
        var childThis = this;
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          this.getOrg.choose1(query,childThis)
          this.optionsName = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.getOrg.choose1(query,childThis)
          this.optionsName = [];
        }
      },
      chooseOrg(query){
        var url = '/uums_mgr/org/findOrgsByDeptName?deptName='+ query
        this.$http.get(url).then(res=>{
        this.optionsOrg = res.body;
        },res=>{
        })
      },

      remoteMethodOrg(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          this.chooseOrg(query);
          this.optionsOrg = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.chooseOrg(query)
          this.optionsOrg = [];
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

      open2() {
        this.$confirm('此操作将永久删除该职务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteJobtrue();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      watchTrue(){
        this.dialogFormVisible1 = false;
        this.controlDialog1 = false;
      },

        //删除
      deleteJob(index,row){
        this.deleteId = row.duty.did;
        this.open2()
      },
      deleteJobtrue(){
        var url = '/uums_mgr/duty/delete?did=' + this.deleteId
        this.$http.get(url).then(res=>{
          console.log(res)
          if(res.bodyText == 'success'){
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

      //添加
      addJob(index,row){
        this.oid = row.duty.oid
        this.$router.push('/addPerson/' + this.oid)
      },
      // 模态框打开
      handleLook(index, row) {
        this.message = ''
        this.jobListRankControl = false;
        this.contorl = false;
        this.oldvalueOrgname = row.duty.oid
        var oidInfo = row.duty.oid
        var url = '/uums_mgr/org/findDeptNameByOid?oid=' + oidInfo;
        this.$http.get(url).then(res=>{
        if(res.body == null){
          this.editInfo = '部门名为空'
        }else{
          this.editInfo = res.body.deptName
        }
        },res=>{
        })
        this.poCode = row.duty.poCode
        this.time = row.duty.effectiveness;
        this.controlDialog = true;
        this.form = row;
        this.rank = this.form.duty.rank;
        this.form.did = row.duty.did;
        this.form.lastUpdTime = row.duty.lastUpdTime;
        this.form.effectiveness = row.duty.effectiveness;
        this.form.lastUpdTime = row.duty.lastUpdTime;
        var url = '/uums_mgr/position/findAllPositions'
        this.$http.get(url).then(res=>{
          this.lists = res.body
        },res=>{
        })
      },
      upDatafit(){
        var newdata = this.form.duty;
        newdata.effectiveness = this.time;
        if(this.value9 == null || this.value9 == ''){
          this.valueOrgname = this.oldvalueOrgname
        }else{
          this.valueOrgname = this.value9
        }
        newdata.oid = this.valueOrgname;
        newdata.rank = this.rank;
        newdata.poCode = this.poCode;
        if(newdata.effectiveness == '' || newdata.effectiveness == null){
          this.contorl = true;
          this.message = '职务时效不能为空'
          return false;
        }
        else if(this.rank == '' || this.rank == null){
          this.contorl = true;
          this.message = '内序不能为空'
          return false;
        }
        else if(this.jobListRankControl == true){
          this.contorl = true;
          this.message = '请注意输入格式'
          return false;
        }
        else if(this.poCode == '' || this.poCode == null){
          this.contorl = true;
          this.message = '职务名不能为空'
          return false;
        }
        else{
          var upData = JSON.stringify(newdata)
          var url = '/uums_mgr/duty/update'
          this.$http.post(url,upData,{emulateJSON:true}).then(res=>{
            if(res.bodyText == 'success'){
              this.$message({
                message : '编辑成功',
                type : 'success'
              });
            }else{
              this.$message.error('编辑失败')
            }
            this.controlDialog = false;
            this.control = false;
            this.message = ''
            this.value9 = ''
            this.user_list_get();
          },res=>{
            this.$message.error('编辑失败')
          })
        }
      },
      addjob(){
        this.$router.push('/addjobPer')
      },
     
      viewJob(index,row){
        this.delete_aid = row.aid;
        this.delete_name = row.name;
        this.controlDialog2 = true;
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
        this.controlDialog1 = true;
        this.form.did = row.duty.did;
        this.form = row;
        this.rank = this.form.duty.rank;
        this.form.effectiveness = row.duty.effectiveness;
        this.form.lastUpdTime = row.duty.lastUpdTime;
      },
      cancle(){
        this.controlDialog = false;
        this.value9 = ''
        this.user_list_get();
      },
      editor(){
        this.controlDialog = false;
      },
    },
  }
</script>

<style>
  .el-dialog--jobListModel {
    position: relative;
    color: inherit;
    border-radius: 8px;
    font-family: inherit;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    width: 55%;
    height: 350px;
  }
  .joblistHeader .el-input__inner {
    height: 30px;
  }
</style>
<style scoped>
  .jobliststar{
    color: red;
    font-size: 15px;
    height: 80px;
    line-height: 129px;
  }
  .bassMessageLeft{
    width: 50%;
    float: left;
    height: 240px;
    padding: 56px 0px;
  }
  .jobchoosenameTit{
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
  }
  .nonnectWithRight{
    width:50%;
    float: left;
    height: 240px;
    padding: 56px 0px;
    position: relative;
  }
  .person_title {
    position: absolute;
    left: 20px;
    top: 10px;
    font-size: 16px;
    font-weight: 700;
  }
  .bessClass{
    float: left;
    height: 40px;
    line-height: 40px;
    width: 108px;
    text-align: right;
    padding-right: 5px;
  }
  .joblist{
    position : absolute ;
    bottom :20px;
    right : 20px;

  }
  .bassMessage_info{
    float: left;
    height: 40px;
    line-height: 40px;
    width: 195px;
    text-align: left;
  }
  .pocode{
    height : 30px;
    width : 200px;
    display : block;
  }
  .joblist_all{
    margin-bottom : 20px;
    margin-top: 17px;
    height : 31px;
    position: relative;
    padding-right: 15px;
  }
  .bassMessage_infoor{
    position: absolute;
    left: 14px;
    top: 0px;
  }
  .addclass2{
    float : right;
  }
  .closeBtn4{
    margin-left:30px;
  }
  .el-table td, .el-table th {
    height: 40px!important;
    min-width: 0;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  .joblistEditdeptname{
    width : 200px;
    height : 30px;
    line-height : 30px;
    display: inline-block;
  }
  .joblistEditdeptnameClass{
    width : 200px;
    height : 30px;
    line-height : 30px;
    border : 1px solid #ccc;
    border-radius : 3px;
  }
  .libLiStcontrol{
    position: absolute;
    bottom: 56px;
    color: red;
    font-size: 14px;
    left: 280px;
  }
  .jobListRank{
    font-size: 12px;
    color: red;
    height: 30px;
    line-height: 11px;
    width: 170px;
    text-align: left;
    position: absolute;
    left: 105px;
    bottom: 65px;
  }
  .specialBtn{
    margin-right : 10px;
  }
</style>
