<template>
  <div class="cont  ainer-fluid orgFather">
    <div class="body teacher-list">
      <ol class="breadcrumb">
        <li >系统管理</li>
        <li class="active">机构管理</li>
      </ol>
      <div class='instit_all'>
        <div class='choose_allTop'>
          <el-select
            class='treeFather'
            v-model="value9"
            :multiple='false'
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
          <el-select v-model="value4" clearable placeholder="请选择部门类型" class='treeFather'>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <input type="text" class="form-control input-sm treeFather" v-model='name' placeholder='请输入机构名称'>
          <el-button class="btn btn-success btn-sm " v-on:click='search()' icon="search" type='success'>搜索</el-button>
          <button  class='addinfopeo1 btn btn-success btn-sm ' v-on:click='addOrg'> 添加一级机构</button>
        </div>
      </div>
      <!--主体-->
    </div>
     <router-view></router-view>
  </div>
</template>
<script>
  let id = 1000;
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '公司'
        }, {
          value: '2',
          label: '部门'
        }, {
          value: '3',
          label: '社团'
        }, {
          value: '4',
          label: '待定'
        }],
        value4: '',

        full_name : '',
        name : '',
        info : '',
        options4: [],
        deptType : '0',
        message : {},
        value9: [],
        list: [],
        loading: false,
        states: [],
      }
    },
    computed:{
      parentD(){
      },
    },
    watch :{
      $route (a ,b){
        if(a.path == '/institution/tree'){
          this.value4 = '';
          this.value9 = '';
          this.name = '';
        }
      }
    },
    created(){
    },
    methods: {
      choose(query){
        var url = '/uums_mgr/org/findOrgsByDeptName?deptName='+ query
        this.$http.get(url).then(res=>{
          this.options4 = res.body;
        },res=>{
        })
      },
      addOrg(){
        this.$router.push('/center/addInstitution/' + 0)
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
      search(){
        this.message.deptName = this.value4;
        this.message.oid = this.value9;
        this.message.name = this.name;
        this.$store.state.parentD.deptName  = window.localStorage.deptName = this.message.deptName
        this.$store.state.parentD.oid = window.localStorage.oid = this.message.oid
        this.$store.state.parentD.name = window.localStorage.name = this.message.name
        this.$router.push('/institution/emptyOrg')
      },
    }
  }
</script>
<style>
  .orgFather .el-input__inner {
    height: 30px;
  }
  #dataChose{
    margin-right : 176px;
  }
  .tableSize{
    font-size : 12px;
  }
  .el-table{
    font-size: 12px;
  }
  .edit_message{
    color: red ;
    text-align : center;
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
  .choose_allTop{
    width : 100%;
    position : absolute;
    left : 0;
    height : 31px;
    margin-left:10px;
    margin-right: 10px;
  }
  .instit_all{
    margin-bottom : 20px;
    margin-top: 17px;
    height : 31px;
    position: relative;
  }
  .treeFather{
    width: 190px;
    height: 30px;
    float : left;
    margin-right : 10px;
  }
  .addinfopeo1{
    position: absolute;
    right: 24px;
  }
  

</style>
