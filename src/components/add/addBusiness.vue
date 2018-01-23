<template>
  <div class="body teacher addAllb">
    <ol class="breadcrumb">
      <li>直属人员</li>
      <li class="active">职务添加</li>
    </ol>
    <div class="teacher-add">
      <form class="form-horizontal col-md-offset-2">
        <div class="form-group">
          <label for="" class="col-md-3 control-label">人员</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='authore' readonly>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">部门</label>
          <div class="col-md-4">
            <el-select
              class='addjobDoor'
              v-model="value9"
              :multiple='false'
              filterable
              :remote='true'
              placeholder="请输入部门关键词"
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
          <span class='star'>*</span>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">职务名称</label>
          <div class="col-md-4">
            <el-select v-model="full_name"  placeholder="请选择职务名" class='jobnameAddjob'>
             <el-option
               v-for="item in lists"
               :key="item.poCode"
               :label="item.poName"
               :value="item.poCode">                  
            </el-option>
            </el-select>
          </div>
          <span class='star'>*</span>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">职务时效</label>
          <div class="col-md-4">
            <el-select v-model="genre" clearable placeholder="请选择职务时效" class='addjobDoor'>
              <el-option
                v-for="item in options"
                :key="item.lable"
                :label="item.lable"
                :value="item.lable">
              </el-option>
            </el-select>
          </div>
          <span class='star'>*</span>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">内序</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.rank' v-on:blur='addjobrank'>
          </div>
          <div class='addjobrank' v-if='addjobrankControl == true'>
            <span class='glyphicon glyphicon-remove'></span>
            <span>请输入127小的数字</span>
          </div>
          <span class='star' v-else>*</span>
        </div>
        <div v-show='contorl' class='info'>
          <span>{{message}}</span>
        </div>
        <div class="form-group">
          <div class="col-md-7">
            <button class="btn btn-success btn-sm addButAll"  v-on:click.prevent='refer()'>添 加</button>
            <button class="btn btn-primary  btn-sm addBack"  v-on:click.prevent='backAdd()'>返 回</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addControl: true,
      value9: "",
      options4: "",
      createdate: "",
      options: [
        { lable: "全职", value: 1 },
        { lable: "兼职", value: 2 },
        { lable: "借调", value: 3 },
        { lable: "待定", value: 4 }
      ],
      states: [],
      list: [],
      lists: [],
      full_name: "",
      genre: "",
      addjobrankControl: false,
      loading: false,
      product: {},
      message: "",
      contorl: false,
      pid: "",
      oid: "",
      pickerOptions0: {
        disabledDate(time) {}
      }
    };
  },
  created() {
    this.pid = this.$router.history.current.params.id;
    this.oid = this.$route.params.id;
    var url = "/uums_mgr/position/pagePositions";
    this.$http.get(url).then(
      res => {
        this.lists = res.body.content;
      },
      res => {}
    );
  },
  computed: {
    authore() {
      return (this.$store.state.authore = window.localStorage.fullName);
    }
  },
  methods: {
    backAdd() {
      this.$router.go(-1);
    },
    addjobrank() {
      var s = /^[0-9]*$/;
      if (s.test(this.product.rank) && this.product.rank - 0 < 127) {
        this.addjobrankControl = false;
      } else {
        this.addjobrankControl = true;
      }
    },

    choose(query) {
      var url = "/uums_mgr/org/findOrgsByDeptName?deptName=" + query;
      this.$http.get(url).then(
        res => {
          this.options4 = res.body;
        },
        res => {}
      );
    },

    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.choose(query);
          this.deptName = this.value9;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.choose(query);
        this.options4 = [];
      }
    },

    refer() {
      if (this.addControl == true) {
        this.addControl = false;
        var data = this.product;
        data.pid = this.$store.state.pid;
        data.poCode = this.full_name;
        data.effectiveness = this.genre;
        data.oid = this.value9;
        if (data.rank == "" || data.rank == null) {
          this.contorl = true;
          this.addControl = true;
          this.message = "内序不能为空";
        } else if (this.addjobrankControl == true) {
          this.contorl = true;
          this.addControl = true;
          this.message = "请注意输入格式";
        } else if (data.poCode == "" || data.poCode == null) {
          this.contorl = true;
          this.addControl = true;
          this.message = "职务名不能为空";
        } else if (data.oid == "" || data.oid == null) {
          this.contorl = true;
          this.addControl = true;
          this.message = "部门不能为空";
        } else if (data.effectiveness == "" || data.effectiveness == null) {
          this.contorl = true;
          this.addControl = true;
          this.message = "职务时效不能为空";
        } else {
          var newdata = JSON.stringify(data);
          var url = "/uums_mgr/duty/add";
          this.$http.post(url, newdata, { emulateJSON: true }).then(
            res => {
              if (res.bodyText == "success") {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.addControl = true;
              } else {
                this.$message.error("添加失败");
                this.addControl = true;
              }
              this.constrol = false;
              this.$router.push("/person/fondbyPerson");
            },
            res => {
              this.constrol = false;
              this.$message.error("添加失败");
              this.addControl = true;
            }
          );
        }
      } else {
        return false;
      }
    }
  }
};
</script>
<style>
.el-input__inner {
  height: 30px;
}
.addAllb .el-input {
  margin-bottom: 0px;
}
</style>
<style scoped>
.info {
  text-align: center;
  color: red;
  position: absolute;
  width: 275px;
  left: 590px;
}
select {
  width: 100%;
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
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.btn-sm,
.btn-group-sm > .btn {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  margin-top: 23px;
}
.deptOrderTreeAddjob {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: red;
}
.addjobDoor {
  height: 30px;
  width: 100% !important;
}
.addjobrank {
  color: red;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
.jobnameAddjob {
  width: 100%;
}
</style>
