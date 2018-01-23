<template>
  <div class="body teacher add_list addAllb">
    <ol class="breadcrumb">
      <li>应用管理</li>
      <li class="active">应用添加</li>
    </ol>
    <div class="teacher-add">
      <form class="form-horizontal col-md-offset-2">
        <div class="form-group">
          <label for="" class="col-md-3 control-label">系统标示</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.guid' v-on:blur='guid' placeholder='！系统标识一旦添加不可修改'>
          </div>
          <div class='addperFittitle' >
            <div v-if='guidControl==true' class='addperFittitle_im'><span class='glyphicon glyphicon-remove'></span>{{messageGuidname}}</div>
            <span class='starAdd' v-else>*</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">应用全称</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.name'>
          </div>
          <span class='starAdd'>*</span>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">接口权限认证密码</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.appKey' v-on:blur='appKey'>
          </div>
          <div class='addperFittitle' v-if='appKeyControl==true'>
            <div class='addperFittitle_im'><span class='glyphicon glyphicon-remove'></span>长度在50以内</div>
          </div>
          <span class='starAdd' v-else>*</span>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">内部重定向地址</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.bizUrl1' v-on:blur='url' placeholder='若使用绝对跳转url请以http或https开头，其他url仅做相对跳转。'>
          </div>
          <div class='addperFittitle' v-if='urlC==true'>
            <div class='addperFittitle_im'><span class='glyphicon glyphicon-remove'></span>长度在100以内</div>
          </div>
          <span class='starAdd' v-else>*</span>
        </div>

        <div class="form-group">
             <label for="" class="col-md-3 control-label">外部重定向地址</label>
          <div class="col-md-4">
            <input type="text"  class="form-control input-sm" v-model='product.bizUrl2' placeholder='若使用绝对跳转url请以http或https开头，其他url仅做相对跳转。'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">应用简称</label>
          <div class="col-md-4">
            <input type="text" class="form-control input-sm" v-model='product.nameAbbr'>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="col-md-3 control-label">ekey+密码(0否1是)</label>
          <div class="col-md-4">
            <el-select v-model="product.ekeyOnly"  placeholder="请选择部门类型" class='addEkey' >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div v-show='constrol' class='info'>
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
      options: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],
      product: {
        guid: "",
        name: "",
        nameAbbr: "",
        bizUrl1: "",
        bizUrl2: "",
        appKey: "",
        domains: "",
        ekeyOnly: 0
      },
      message: "",
      constrol: false,
      guidControl: false,
      appKeyControl: false,
      messageGuidname: "",
      urlC: false
    };
  },
  methods: {
    backAdd() {
      this.$router.go(-1);
    },
    // 系统标识的限制
    guid() {
      if (this.product.guid == "" || this.product.guid == null) {
        this.guidControl = false;
        return false;
      } else {
        var s = /^[A-Za-z0-9_-]*$/g;
        if (s.test(this.product.guid)) {
          this.guidControl = false;
          this.messageGuidname = "";
          if (this.product.guid == this.guidPass) {
            return false;
          } else {
            this.guidOnly();
          }
        } else {
          this.guidControl = true;
          this.messageGuidname = "数字字母下划线连接符组成";
        }
      }
    },
    // 系统标识的唯一性
    guidOnly() {
      var url = "/uums_mgr/app/guid";
      var data = {};
      data.guid = this.product.guid;
      this.$http.post(url, data, { emulateJSON: true }).then(
        res => {
          if (res.body == true) {
            this.guidControl = false;
            this.messageGuidname = "";
          } else {
            this.guidControl = true;
            this.messageGuidname = "系统标识已存在";
          }
        },
        res => {
          this.guidControl = true;
          this.messageGuidname = "系统标识已存在";
        }
      );
    },
    // nginx重定向URL限制
    url() {
      if (this.product.bizUrl1 == "" || this.product.bizUrl1 == null) {
        return false;
        this.urlC = false;
      } else {
        var data = this.product.bizUrl1.split("");
        if (data.length > 100) {
          this.urlC = true;
        } else {
          this.urlC = false;
        }
      }
    },
    // ekey限制
    appKey() {
      if (this.product.appKey == "" || this.product.appKey == null) {
        return false;
        this.appKeyControl = false;
      } else {
        var data = this.product.appKey.split("");
        if (data.length > 50) {
          this.appKeyControl = true;
        } else {
          this.appKeyControl = false;
        }
      }
    },
    // 添加提交
    refer() {
      if (this.addControl == true) {
        this.addControl = false;
        var data = this.product;
        var newdata = JSON.stringify(data);
        var tguid = this.product.guid.trim();
        var tname = this.product.name.trim();
        var tnameAbbr = this.product.nameAbbr.trim();
        if (this.product.bizUrl1 == null) {
          this.product.bizUrl1 = "";
        }
        var tbizUrl1 = this.product.bizUrl1.trim();
        var tappKey = this.product.appKey.trim();
        var tdomains = this.product.domains.trim();
        data.bizUrl1 = tbizUrl1;
        var newdata = JSON.stringify(data);
        var newdaaa = { app: [newdata] };
        var yy = { Application: newdaaa };

        if (tguid == "") {
          this.constrol = true;
          this.message = "系统标示不能为空";
          this.addControl = true;
          return false;
        } else if (tname == "") {
          this.constrol = true;
          this.message = "应用全称不能为空";
          this.addControl = true;
          return false;
        } else if (tappKey == "") {
          this.message = "接口权限认证密码不能为空";
          this.addControl = true;
          this.constrol = true;
          return false;
        } else if (tbizUrl1.split("").length == 0) {
          this.message = "内部重定向地址不能为空";
          this.addControl = true;
          this.constrol = true;
          return false;
        } else if (
          this.guidControl == true ||
          this.appKeyControl == true ||
          this.urlC == true
        ) {
          this.message = "请输入正确的格式";
          this.addControl = true;
          this.constrol = true;
          return false;
        } else {
          var url = "/uums_mgr/app/add";
          this.$http.post(url, newdata, { emulateJSON: true }).then(
            res => {
              if (res.bodyText == "success") {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.addControl = true;
              } else {
                this.$message.error("编辑失败");
                this.addControl = true;
              }
              this.constrol = false;
              this.$router.push("/appManagement");
            },
            res => {
              this.$message.error("编辑失败");
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
.add_list .el-input {
  margin-bottom: 0px;
}
.box {
  visibility: hidden;
}
</style>

<style scoped>
.add_list .form-control {
  display: inline-block;
  width: 130%;
}
.add_list .col-md-7 {
  width: 67.333333%;
}
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
  height: 30px;
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
.addperFittitle {
  width: 237px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: red;
  float: left;
}
.addperFittitle_im {
  padding-left: 77px;
}
.addEkey {
  width: 130%;
}
.starAdd {
  color: red;
  display: inline-block;
  height: 30px;
  line-height: 35px;
  font-size: 15px;
  width: 7px;
  margin-left: 80px;
}
</style>
