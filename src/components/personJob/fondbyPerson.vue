<template>
  <div>
    <div class="panel panel-default fondbyperAll">
      <div class='fondbyfeo_all'>
        <button class="btn btn-success btn-sm pull-right" v-on:click='addInfo'>
           添 加
        </button>
      </div>
      <el-table :data="tableData" border style="width: 100%" :empty-text='emptyText'>
        <el-table-column
            label="人员"
            prop='fullName'
            width="141">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.fullName }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="机构"
            prop='deptName'
            width="206">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.deptName }}</span>
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
          width="167">
          <template scope="scope">
             <span style="margin-left: 10px">{{ scope.row.duty.effectiveness }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <button  size="mini" type='success' @click="handleEdit(scope.$index, scope.row);  dialogFormVisible1 = true;" class='btn btn-success btn-xs'>
                        查看
            </button>
            <button size="mini" type='success' @click="handleLook(scope.$index, scope.row);  dialogFormVisible = true;" class='btn btn-success btn-xs'>
                       编辑
            </button>
              <button size="mini" type='warning' @click="deleteperson(scope.$index, scope.row);  dialogFormVisible = true;" class='btn btn-warning btn-xs'>
                       删除
            </button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑模态框 -->
      <el-dialog  :visible.sync="dialogFormVisible" :visible="controlDialog" :show-close='false' class='title_message' size='personlistsize'>
        <div class='person_title'>职务信息</div>
        <div class='fondBuypered_left'>
          <div class='fondBuyper_info'>部门 ：</div>
          <div class='fondBuyper_num'>
            <div class='fondBuypered_numJob'>
              <el-select
                v-model="value9"
                :multiple='false'
                filterable
                :remote='true'
                :clearable = 'true'
                :placeholder="orgInfo"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="item in options4"
                  :key="item[0]"
                  :label="item[1]"
                  :value="item[0]">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class='fondBuyper_info'>人员 ：</div>
          <div class='fondBuyper_num'>
            <input type='text' class='fondBuypered_name form-control  input-sm' v-model='form.fullName' readonly>
          </div>
          <div class='fondBuyper_info'>职务名 ：</div>
          <div class='fondBuyper_num'>
            <div class='fondBuypered_numName'>
              <el-select v-model="full_name"  placeholder="请选择职务名" >
                <el-option
                  v-for="item in lists"
                  :key="item.poCode"
                  :label="item.poName"
                  :value="item.poCode">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class='fondBuypered_right'>
          <div class='fondBuyper_info'>职务时效 ：</div>
          <div class='fondBuyper_num'>
            <el-select v-model="effectiveness" placeholder="请选择职务时效" >
              <el-option
                v-for="item in options1"
                :key="item.lable"
                :label="item.lable"
                :value="item.lable">
              </el-option>
            </el-select>
          </div>
          <div class='fondBuyper_info'>内序 ：</div>
          <div class='fondBuyper_num'>
            <el-input class='fondBuypered_num' v-model='rank' v-on:blur='fondbyrank'></el-input>
          </div>
          <span class='starFondperlist'>*</span>
          <div class='fondByPersonTitle' v-if='fondbyPER'>
             <span class='glyphicon glyphicon-remove'></span>
             <span>请输入127小的数字</span>
          </div>
        </div>
        <div v-if='contorl' class = 'fombyperEditcon'>{{message}}</div>
        <div slot="footer">
          <el-button size='small' @click="dialogFormVisible = false" v-on:click='cancle'>取 消</el-button>
          <el-button size='small' type="primary" @click="dialogFormVisible = false ; editorPerinfo()">确 定</el-button>
        </div>
      </el-dialog>
       <!-- 查看模态框 -->
      <el-dialog :visible.sync="dialogFormVisible1" :visible="controlDialog1" :show-close='false' class='title_message' size='personlistsize'>
        <div class='person_title'>职务信息</div>
        <div class='fondBuyper_left'>
          <div class='fondBuyper_info'>部门 ：</div>
          <div class='fondBuyper_num'>{{deptName}}</div>
          <div class='fondBuyper_info'>人员 ：</div>
          <div class='fondBuyper_num'>{{fullName}}</div>
          <div class='fondBuyper_info'>职务名称 ：</div>
          <div class='fondBuyper_num'>{{poName}}</div>
        </div>
        <div class='fondBuyper_right'>
          <div class='fondBuyper_info'>内序 ：</div>
          <div class='fondBuyper_num'>{{rank}}</div>
          <div class='fondBuyper_info'>职务时效 ：</div>
          <div class='fondBuyper_num'>{{form.effectiveness}}</div>
          <div class='fondBuyper_info'>最后更新时间 ：</div>
          <div class='fondBuyper_num'>{{form.lastUpdTime}}</div>
        </div>
        <div slot="footer">
          <el-button type="success" size='small' @click="dialogFormVisible = false; watchTrue()" class='closeBtn3'>关 闭</el-button>
        </div>
      </el-dialog>
      <div class='bottomTable'>
        <button class="btn btn-primary btn-sm bottomTablebtn" v-on:click='back' ><span class=' glyphicon glyphicon-backward'></span> 返 回</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
     return {
       emptyText : '数据正在加载中...',
       fondbyPER : false,
       contorl : false,
       value9: '',
       loading : '',
       options4  : [],
       tt : [],
       list : [],
       orgInfo : '',
       effectiveness : '',
       options1 : [
         {lable : '全职', value : 1},
         {lable : '兼职', value : 2},
         {lable : '借调', value : 3},
         {lable : '待定', value : 4},
       ],
       tableData: [],
       dialogFormVisible : false,
       form :{},
       formLabelWidth : '220px',
       controlDialog : false,
       delete_aid : '',
       delete_name : '',
       full_name : '姓名',
       search_name : '',
       controlDialog1 : false,
       dialogFormVisible1 : false,
       oid : '',
       did : '',
       pid : '',
       personId : '',
       rank : '',
       deptName : '',
       fullName : '',
       poName : '',
       lists : [],
       passid : '',
       ordDataid : '',
       options: [{
         value: 'fullName',
         label: '姓名'
       }, {
         value: 'pCode',
         label: '工号'
       }],
     }
    },
    created(){
      this.activeIndex = this.$store.state.joblistIndex =  window.localStorage.joblistIndex
      this.pid = this.$store.state.pid = window.localStorage.pid
      this.user_list_get();
      var url = '/uums_mgr/position/pagePositions'
      this.deptName = this.$store.state.name
      this.$http.get(url).then(res=>{
        this.lists = res.body.content;
      },res=>{
      })
    },
    computed:{
      authore(){
      },
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      fondbyrank(){
        this.fondbyPER = this.validate.rank(this.fondbyPER,this.rank)
      },
       handleLook(index, row) {
        this.contorl = false;
        this.message = ''
        this.fondbyPER = false;
        this.controlDialog = true;
        this.orgInfo = row.deptName;
        this.ordDataid = row.duty.oid;
        this.full_name = row.duty.poCode
        this.effectiveness = row.effectiveness
        this.form = row;
        this.form.did = row.duty.did;
        this.rank = row.duty.rank;
        this.effectiveness = row.duty.effectiveness;
        this.form.lastUpdTime = row.duty.lastUpdTime;
        this.deptName = row.deptName;
        this.fullName = row.fullName;
        this.poName = row.poName;
      },
      //编辑提交
      editorPerinfo(){
        var data = {}
        data.rank = this.rank;
        data.poCode = this.full_name
        data.pid = this.form.duty.pid;
        data.did = this.form.did;
        data.effectiveness = this.effectiveness
        if(this.value9 == ''){
          data.oid = this.ordDataid
        }else{
          data.oid = this.value9;
        }
        if(this.rank == '' || this.rank == null){
          this.contorl = true;
          this.message = '内序不能为空'
        }
        else if(this.fondbyPER == true){
          this.contorl = true;
          this.message = '请注意输入格式'
        }
        else if(data.poCode == '' || data.poCode == null){
          this.contorl = true;
          this.message = '职务名不能为空'
        }
        else if(this.effectiveness == '' || this.effectiveness == null){
          this.contorl = true;
          this.message = '职务时效不能为空'
        }
        else{
          var newData = JSON.stringify(data)
          var url =  '/uums_mgr/duty/update';
          this.$http.post(url,newData,{emulateJSON:true}).then(res=>{
            if(res.bodyText == 'success'){
               this.$message({
                 message : '编辑成功',
                 type : 'success'
               });
            }else{
              this.$message.error('编辑失败')
            }
              this.controlDialog = false;
              this.value9 = '';
              this.user_list_get()
          },res=>{
            this.$message.error('编辑失败')
          })
        }
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
    //刚进页面默认渲染
      user_list_get(){
        var url  = '/uums_mgr/duty/pageDutys?pid=' + this.pid;
        this.$http.get(url).then(res=>{
          if(res.body.length == 0){
            this.emptyText = '暂无数据'
          }else{
            this.emptyText = '';
          }
          this.tableData = res.body.content;
          this.form = res.body;
        },res=>{
          this.emptyText = '获取数据失败!!!';
        })
      },
      watchTrue(){
        this.dialogFormVisible1 = false;
        this.controlDialog1 = false;
      },
      handleEdit(index, row){
        this.controlDialog1 = true;
        this.form.did = row.duty.did;
        this.rank = row.duty.rank
        this.form.effectiveness = row.duty.effectiveness;
        this.form.lastUpdTime = row.duty.lastUpdTime;
        this.deptName = row.deptName;
        this.fullName = row.fullName;
        this.poName = row.poName;
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
      handleClose(done){
        this.$confirm('确认关闭吗')
          .then(_=>{
            this.$route.push('/course_topic')
          })
          .catch(_=>{});
      },
      deleteperson(index,row){
        this.did = row.duty.did
        this.open2()
      },
      deletefunc(){
        var url = '/uums_mgr/duty/delete?did=' + this.did;
        this.$http.get(url).then(res=>{
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
      open2() {
        this.$confirm('是否确定删除该人员?', '提示', {
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
      addInfo(){
        this.$router.push("/center/addBusiness" )
      },
      userList(){
        this.user_list_get();
      },
      cancle(){
        this.controlDialog = false;
        this.value9 = ''
        this.user_list_get()
      },
      editor(){
        this.controlDialog = false;
      },
    },
  }
</script>

<style>
  .el-input__inner{
    height : 30px;
  }
  .fondByPersonTitle{
    color: red;
    width: 233px;
    height: 30px;
    line-height: 27px;
    font-size: 12px;
    padding-left: 87px;
    position: absolute;
    bottom: 125px;
  }
  .fondBuypered_numJob,.fondBuypered_numTime,.fondBuypered_numName{
    float: left;
    height: 40px;
    line-height: 40px;
    width: 195px;
    text-align: left;
  }
  .fondBuypered_numNameInput{
    width: 195px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .fondBuypered_numTitle{
    float: left;
    height: 40px;
    line-height: 20px;
    width: 195px;
    text-align: left;
    padding-left: 10px;
    border-radius: 3px;
    width: 195px;
    height: 40px;
    color: red;
    font-size: 12px;
  }
  
  .fondBuypered_num{
    float: left;
    line-height: 30px;
    width: 195px;
    height: 30px;
    margin-top: 5px;
  }
  .fondBuypered_name{
    float: left;
    line-height: 30px;
    width: 195px;
    height: 30px;
    margin-top : 5px;
  }
  .fondBuypered_left{
    width: 50%;
    float: left;
    height: 240px;
    padding: 56px 0px;
  } 
  .fondBuypered_right{
    width:50%;
    float: left;
    height: 240px;
    padding: 56px 0px;
  }
  .fondBuyper_left{
    width: 50%;
    float: left;
    height: 240px;
    padding: 56px 0px;
  }
  .fondBuyper_right{
    width:50%;
    float: left;
    height: 240px;
    padding: 56px 0px;
  }
  .fondBuyper_num{
    float: left;
    height: 40px;
    line-height: 40px;
    width: 195px;
    text-align: left;
  }
  .fondBuyper_info{
    float: left;
    height: 40px;
    line-height: 40px;
    width: 108px;
    text-align: right;
    padding-right: 5px;
  }
  .fondbyperAll .el-dialog--personlistsize{
    position: absolute;
    left: 50%;
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
  .person_title {
    position: absolute;
    left: 22px;
    top: 16px;
    font-size: 16px;
    font-weight: 700;
  }
  .fondbyfeo_all{
    margin-bottom : 20px;
    margin-top: 17px;
    height : 31px;
    position: relative;
    padding-right: 15px;
  }
  .closeBtn3{
    margin-left:30px;
  }
  .bottomTable{
    width : 100%;
    text-align : center;
    margin-top : 60px;
  }
  .starFondperlist{
    color : red;
    font-size : 15px;
    height : 80px;
    line-height : 112px;
  }
  .fombyperEditcon{
    width: 410px;
    height: 30px;
    text-align: center;
    color: red;
    padding-left: 244px;
    line-height: 30px;
    position: absolute;
    bottom: 56px;
    left: 20px;
  }
</style>
