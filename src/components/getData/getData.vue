<template>
  <div class='getDataAll' v-loading.body = 'loadingControl'  >
    <div class='dataTogather'>
       用户中心数据同步系统
    </div>
    <el-button type="primary" v-on:click='dataTogather'>同步数据</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loadingControl : false,
      }
    },
    created(){
    },
    methods: {
      dataTogather(){
        this.loadingControl = true;
        var url = '/uums_hr/syncAction'
        this.$http.get(url).then(res=>{
        if( res.body.msg == 'success' ){
          this.loadingControl = false;
          this.openSuccess();    
        }else{
          this.loadingControl = false;
          this.openFail();    
        }
        },res=>{
          this.loadingControl = false;
          this.openFail();    
        })
      },
      openSuccess(){
      this.$message({
        message : '数据同步成功',
        type : 'success'
      })
      },
      openFail(){
        this.$message.error('数据同步失败')
      },
    },
  }
</script>
<style>
  .getDataAll{
    width : 100%;
    height : 500px;
    text-align : center;
  }
  .dataTogather{
    margin: 80px auto;
    font-size: 32px;
    font-family: cursive;
    text-shadow: 5px 5px 5px #9b9dce;
  }
</style>