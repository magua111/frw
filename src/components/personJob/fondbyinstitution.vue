<template>
  <div class='fondbyinst'>
    <div class="panel panel-default">
      <div class='findper'>
         <el-select
           class='fondbyFit_choosejob'
           v-model="value9"
           :multiple='false'
           :clearable = 'true'
           filterable
           :remote='true'
           placeholder="请输入机构关键词"
           :remote-method="remoteMethod"
           :loading="loading">
           <el-option
             v-for="item in options4"
             :key="item[0]"
             :label="item[1]"
             :value="item[0]">
           </el-option>
         </el-select>
         <button class="btn btn-success btn-sm fondbyyoufitSearch" v-on:click='search'>
            搜索
         </button>
      </div>
        <!--列表-->
      <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
            <el-table-column
              label="机构"
              prop='deptName'
              width="190">
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
              width="120">
              <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.duty.rank }}</span>
              </template>
            </el-table-column>
              <el-table-column
                label="职务名称"
                prop='poName'
                width="150">
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
            <el-table-column
             label="操作"
            >
              <template scope="scope">
                <button  size="mini" type='success' icon="edit" @click="handleEdit(scope.$index, scope.row);  dialogFormVisible1 = true;" class='btn btn-success btn-xs'>
                      查看
                </button>
                <button  size="mini" type='success' icon="document" @click="handleLook(scope.$index, scope.row);  dialogFormVisible = true; changeInfo(scope.$index, scope.row)" class='btn btn-success btn-xs'>
                      编辑
                </button>
                <button  size="mini" type='success' icon="plus" @click="handleadd(scope.$index, scope.row);  dialogFormVisible1 = true;" class='btn btn-success btn-xs'>
                      添加
                </button>
                <button size="mini" type='warning' icon="delete2" @click="handledelete(scope.$index, scope.row);  dialogFormVisible1 = true;" class='btn btn-warning btn-xs'>
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
      <!-- 编辑模态框 -->
      <el-dialog  :visible.sync="dialogFormVisible" :visible="controlDialog" :show-close='false' class='title_message' size='joblistsize'>
        <div class='person_title'>职务信息</div>
        <div class='fondByfited_Left'>
          <div class='fondByfit_Name'>部门 ：</div>
          <div class='fondByfit_Num'>
            <el-select
              v-model="valuefit"
              :multiple='false'
              filterable
              :remote='true'
              :clearable = 'true'
              :placeholder="infoOrgname"
              :remote-method="remoteMethod1"
              :loading="loading">
              <el-option
                v-for="item in optionsfit"
                :key="item[0]"
                :label="item[1]"
                :value="item[0]">
              </el-option>
            </el-select>
          </div>
          <div class='fondByfit_Name'>人员 ：</div>
          <div class='fondByfit_Num'>
             <input type='text' class='fondByfited_NumPer form-control  input-sm' v-model='form.fullName' readonly>
          </div>
          <div class='fondByfit_Name'>职务名 ：</div>
          <div class='fondByfit_Num'>
            <el-select v-model="genre"  placeholder="请选择职务名" class=''>
              <el-option
                v-for="item in lists"
                :key="item.poCode"
                :label="item.poName"
                :value="item.poCode">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class='fondByfited_Right'>
          <div class='fondByfit_Name'>职务时效 ：</div>
         <div class='fondByfit_Num'>
          <el-select v-model="effectiveness"  placeholder="请选择职务时效" >
            <el-option
              v-for="item in options1"
              :key="item.lable"
              :label="item.lable"
              :value="item.lable">
            </el-option>
          </el-select>
        </div>
        <div class='fondByfit_Name'>内序 ：</div>
        <div class='fondByfit_Num'>
          <el-input class='fondByfited_Num' v-model='rank' v-on:blur='fondbyrank'></el-input>
        </div>
        <span class='starFondin'>*</span>
        <div class='fondByfited_Name'></div>
        <div class='fondyoufitcontrol' v-if='fondbyPER'>
          <span class='glyphicon glyphicon-remove'></span>
          <span>请输入127小的数字</span>
        </div>
      </div>
      <div v-if='contorl' class = 'fondyoufitTitlecontrol'>{{message}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button size='small' @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
        <el-button size='small' type="primary" @click="dialogFormVisible = false ; upDatafit()">确 定</el-button>
      </div>
      </el-dialog>
      <!-- 查看模态框 -->
      <el-dialog :visible.sync="dialogFormVisible1" :visible="controlDialog1" :show-close='false' class='title_message' size='joblistsize'>
        <div class='person_title'>职务信息</div>
        <div class='fondByfit_Left'>
          <div class='fondByfit_Name'>部门 ：</div>
          <div class='fondByfit_Num'>{{form.deptName}}</div>
          <div class='fondByfit_Name'>人员 ：</div>
          <div class='fondByfit_Num'>{{form.fullName}}</div>
          <div class='fondByfit_Name'>职务名称 ：</div>
          <div class='fondByfit_Num'>{{form.poName}}</div>
        </div>
        <div class='fondByfit_Right'>
          <div class='fondByfit_Name'>内序 ：</div>
          <div class='fondByfit_Num'>{{rank}}</div>
          <div class='fondByfit_Name'>职务时效 ：</div>
          <div class='fondByfit_Num'>{{form.effectiveness}}</div>
          <div class='fondByfit_Name'>最后更新时间 ：</div>
          <div class='fondByfit_Num'>{{form.lastUpdTime}}</div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="success" size='small' @click="dialogFormVisible = false; watchTrue()" class='closeBtn4'>关 闭</el-button>
        </div>
      </el-dialog>
    <div class='bottomTable'>
      <button class="btn btn-primary btn-sm bottomTablebtn" v-on:click='back'><span class=' glyphicon glyphicon-backward'></span> 返 回</button>
    </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        valuefit :'',
        infoOrgname : '',
        valuefitnew : '',
        loading :false,
        emptyText : '数据正在加载中...',
        contorl :false,
        fondbyPER :false,
        options1 : [
          {lable : '全职', value : 1},
          {lable : '兼职', value : 2},
          {lable : '借调', value : 3},
          {lable : '待定', value : 4},
        ],
        effectiveness : '',
        optionsfit : [],
        list : [],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        tt : [],
        tableData: [],
        genre : '',
        dialogFormVisible : false,
        formLabelWidth : '220px',
        controlDialog : false,
        delete_aid : '',
        delete_name : '',
        num : 0,
        full_name : '姓名',
        pagenum : 10,
        form : '',
        pageallnum : 0,
        currentPage1: 1,
        search_name : '',
        controlDialog1 : false,
        dialogFormVisible1 : false,
        oid : '',
        lists : [],
        rank : '',
        pid : '',
        deleteId : '',
        name : '',
        options4: [],
        value9: [],
        list: [],
        loading: false,
        states: [],
        orgId : '',
        path : '',
      }
    },
    props : ['id'],
    created(){
      this.user_list_get();
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    computed:{
      authore(){
      },
    },
    methods: {
      back(){
        this.$router.go(-2)
      },
      fondbyrank(){
        this.fondbyPER = this.validate.rank(this.fondbyPER,this.rank)
      },

      upDatafit(){
        var newdata = this.form;
        var duty = {}
        duty.effectiveness = this.effectiveness
        duty.poCode = this.genre
        duty.rank = this.rank
        if(this.valuefit == ''){
          this.valuefitnew = this.orgId
        }else{
          this.valuefitnew = this.valuefit
        }
        duty.oid =this.valuefitnew
        duty.did =this.form.duty.did
        duty.pid =this.form.duty.pid
        if(duty.rank == '' ||duty.rank == null){
          this.contorl = true;
          this.message = '内序不能为空'
        }
        else if(this.fondbyPER == true){
          this.contorl = true;
          this.message = '请注意输入格式'
        }
        else if(this.genre == '' || this.genre == null){
          this.contorl = true;
          this.message = '职务名不能为空'
        }
        else if(duty.effectiveness == '' || duty.effectiveness == null){
          this.contorl = true;
          this.message = '职务时效不能为空'
        }
        else{
          var upData = JSON.stringify(duty)
          var url = '/uums_mgr/duty/update'
          this.$http.post(url,upData,{emulateJSON:true}).then(res=>{
            if(res.bodyText == 'success'){
              this.$message({
                message : '编辑成功',
                type : 'success'
              });
            }else{
              this.$message.error('添加失败')
            }
            this.infoOrgname = ''
            this.controlDialog = false;
            this.contorl = false;
            this.message = ''
            this.valuefit = ''
            this.user_list_get();
          },res=>{
            this.infoOrgname = ''
            this.$message.error('添加失败')
          })
        }
      },
        // 模态框打开

      handleEdit(index, row){
        this.controlDialog1 = true;
        this.form = row;
        this.rank = this.form.duty.rank
        this.form.did = row.duty.did;
        this.form.effectiveness = row.duty.effectiveness;
        this.form.lastUpdTime = row.duty.lastUpdTime;
      },
      handleLook(index, row) {
        this.contorl = false;
        this.message = ''
        this.fondbyPER = false
        this.infoOrgname = row.deptName;
        this.orgId = row.duty.oid;
        this.form = row;
        this.effectiveness = row.duty.effectiveness
        this.genre = row.duty.poCode
        this.rank = this.form.duty.rank
        this.controlDialog = true;
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
      handledelete(index,row){
        this.deleteId = row.duty.did
        this.open2()
      },
      deletefunc(){
        var url = '/uums_mgr/duty/delete?did=' + this.deleteId;
        this.$http.get(url).then(res=>{
          console.log(res)
          if(res.bodyText == 'success'){
            this.$message({
                type: 'success',
                message: '删除成功!'
              });
          }else{
            this.$message.error('添加失败')
          }
          this.user_list_get();
        },res=>{
          this.$message.error('添加失败')
        })
      },
      open2() {
        this.$confirm('是否删除该职务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deletefunc();
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      choose1(query){
        var url = '/uums_mgr/org/findOrgsByDeptName?deptName='+ query
        this.$http.get(url).then(res=>{
          this.optionsfit = res.body;
        },res=>{
        })
      },
      remoteMethod1(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          this.choose1(query);
          this.deptName = this.valuefit
          this.optionsfit = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
        });
        }, 200);
        } else {
          this.choose1(query)
          this.optionsfit = [];
        }
      },
      choose(query){
        var url = '/uums_mgr/org/findOrgsByDeptName?deptName='+query+'&pageNumber=' + this.currentPage1 + '&pageSize=' + this.pagenum
        this.$http.get(url).then(res=>{
            this.options4 = res.body;
        },res=>{
        })
      },
      user_list_get(){
        var urlsearch = '/uums_mgr/duty/pageDutysByOid?oid=' + this.value9 + '&pageNumber=' + this.currentPage1 + '&pageSize=' + this.pagenum
        this.$http.get(urlsearch).then(res=>{
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
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.choose(query);
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
      search(){
          this.user_list_get();
      },
      //添加
      handleadd(index,row){
        this.name = row.fullName
        this.$store.state.authore = window.localStorage.fullName = this.name;
        this.$store.state.pid =this.pid = row.duty.pid
        this.$router.push('/addjobOrg/' + this.pid)
      },

      
      watchTrue(){
        this.dialogFormVisible1 = false;
        this.controlDialog1 = false;
      },
      changeInfo(index,row){
      },
      searchByname(){
        var url = '/uums_mgr/app/findByName?pageNumber=' + this.currentPage1 + '&pageSize=' + this.pagenum +'&name=' + this.search_name;
        this.$http.get(url).then(res=>{
        this.tableData = res.body.content;
        this.num = res.body.totalElements;
        },res=>{
        })
      },
      viewJob(index,row){
        this.delete_aid = row.aid;
        this.delete_name = row.name;
        this.controlDialog2 = true;
      },
      open_succcess(){
        this.$message({
          message : '删除成功',
          type : 'success'
        });
      },
      open_fail(){
        this.$message.error("删除失败")
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
        this.valuefit = ''
        this.user_list_get();
      },
      editor(){
        this.controlDialog = false;
      },
    },
  }
</script>


<style>
  .fondbyinst .el-input__inner {
    height: 30px;
  }
  .fondbyinst .el-dialog--joblistsize{
    position: absolute;
    left: 55%;
    width: 55%;
    color : inherit;
    border-radius: 8px;
    font-family : inherit;
    background-color: rgb(255,255,255);
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
  }
  .el-dialog__title {
    line-height: 1;
    font-size: 16px;
    color: #1f2d3d;
    font-weight: inherit;
  }
  .fondByfited_Name{
    float: left;
    height: 30px;
    line-height: 42px;
    width: 100px;
    text-align: right;
    padding-right: 5px;
  }
  .fondByfited_NumPer{
    height: 30px;
    width: 195px;
    text-align: right;
    padding-right: 5px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    text-align: left;
    padding-left: 8px;
    float: left;
  }
  .fondByfited_NumPername{
    float: left;
    height: 30px;
    width: 95px;
    text-align: right;
    line-height: 29px;
    margin-top: 10px;
  }
  .fondByfited_Num{
    float: left;
    height: 30px;
    line-height: 30px;
    width: 195px;
    margin-top: 5px;
  }
  .fondByfited_Numtitle{
    float: left;
    height: 40px;
    line-height: 20px;
    width: 195px;
    text-align: left;
    padding-left: 10px;
    width: 195px;
    height: 40px;
    color: red;
    font-style: 12px;
  }
  .fondByfited_Numjob,.fondByfited_Numtime{
    float: left;
    height: 40px;
    line-height: 40px;
    width: 195px;
    text-align: left;
    border-radius: 3px;
    width: 195px;
    height: 30px;
  }
  .fondByfited_Left{
    width: 50%;
    float: left;
    height: 240px;
    padding: 56px 0px;
  } 
  .fondByfited_Right{
    width:50%;
    float: left;
    height: 240px;
    padding: 56px 0px;
  }
  .fondByfit_Left{
    width: 50%;
    float: left;
    height: 240px;
    padding: 56px 0px;
  }
  .fondByfit_Right{
    width:50%;
    float: left;
    height: 240px;
    padding: 56px 0px;
  }
  .fondByfit_Num{
    float: left;
    height: 40px;
    line-height: 40px;
    width: 195px;
    text-align: left;
  }
  .fondByfit_Name{
    float: left;
    height: 40px;
    line-height: 40px;
    width: 108px;
    text-align: right;
    padding-right: 5px;
  }
  .person_title {
    position: absolute;
    left: 20px;
    top: 10px;
    font-size: 16px;
    font-weight: 700;
   }
  
  .bassMessage_info2{
    text-align : left;
    height : 30px;
    line-height : 30px;
    margin-top : 8px;
    width : 65%;
    float: right;
  }
  .findper{
    width : 100%;
    height : 36px;
    margin : 10px 0px;
    position: relative;

  }
  .fondbyFit_choosejob{
    margin-left : 8px;
  }
  .person_title {
    position: absolute;
    left: 20px;
    top: 10px;
    font-size: 16px;
    font-weight: 700;
  }
  .bassMessage_info2{
    text-align : left;
    height : 45px;
    line-height : 45px;
    width : 65%;
    float: right;
  }
  .el-table td, .el-table th {
    height: 40px!important;
    min-width: 0;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  .closeBtn4{
    margin-left:30px;
  }
  .fondyoufitcontrol{
    color: red;
    width: 233px;
    height: 30px;
    line-height: 27px;
    font-size: 12px;
    padding-left: 87px;
  }
  .fondyoufitTitlecontrol{
    position: absolute;
    bottom: 56px;
    left: 312px;
    color: red;
  }
  .fondbyyoufitSearch{
    margin-left : 8px;
  }
  .bottomTable{
    width : 100%;
    text-align : center;
    margin-top : 60px;
  }
  .starFondin{
    color : red;
    font-size : 15px;
    display : inline-block;
    height : 30px;
    line-height : 30px;
    margin-top : 42px;
  }
</style>
