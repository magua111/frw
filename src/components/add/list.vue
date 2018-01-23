<template>
  <div class='firstPage'>
    <div v-on:click="$store.commit('add')">+</div>


    <div class='name'>上海证券交易所</div>
    <div class='userCenter'>用户中心</div>
  </div>
</template>
<script>
import VueCoreImageUpload from 'vue-core-image-upload'
export default {
  components: {
    'vue-core-image-upload': VueCoreImageUpload,
  },
  data() {
    return {
      number: [],
      data : {},
      src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
    }
  },
  methods: {
    imageuploaded(res) {
      if (res.errcode == 0) {
        this.src = res.data.src;
      }
    }
  }
}
</script>
<style scoped lang="less">
 
  .firstPage{
    margin-top : 170px;
    height: 200px;
    position: relative;
    .name{
      color: #0e0e0e;
      font-size: 52px;
      height: 40px;
      position: absolute;
      line-height: 40px;
      font-family: cursive;
      animation : title 5s forwards;
    }
    .userCenter{
      color: #d9534f;
      font-size: 42px;
      height: 40px;
      position: absolute;
      top: 112px;
      right : 0px;
      line-height: 40px;
      font-family: cursive;
      animation : user 5s forwards;
    }

    @keyframes title{
      0%  {left : 0px}
      70% {left : 350px; text-shadow: 0px 0px 0px;}
      100% {left : 350px; text-shadow: 5px 5px 10px;}
    }
    @keyframes user{
      0%  {right : 0px}
      70% {right : 470px; text-shadow: 0px 0px 0px;}
      100% {right : 470px; text-shadow: 5px 5px 10px;}
    }
  }
  
  
</style>
