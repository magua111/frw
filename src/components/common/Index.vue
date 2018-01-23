<template>
  <div>
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <div class="main">
      <div class="container-fluid">
        <router-view>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/common/Header'
import Sidebar from '@/common/Sidebar'
export default {
  components: {
    'app-header': Header,
    'app-sidebar': Sidebar
  },
  data(){
    return {
    }
  },
  watch:{
  },
  methods:{
  }
}
</script>
<style>
  .backr{
    position: absolute;
    top: 71px;
    right: 29px;
    z-index: 1000;
  }
</style>
