import Vue from 'vue'
import Vuex from 'vuex'
// import * as types from './types'

Vue.use(Vuex)

const mutations = {
  add(state){
    state.count++;
    console.log( state.count)
  }
}

const store = new Vuex.Store({
  // 定义状态
  state: {
    count : 1,
    authore: '',
    name :'',
    person : '',
    pid : '',
    parentD : {},
    deptName2 : '',
    userName : '',
    org : '',
    asideNum : '',
    aidNumber : '',
    asiderNum : '',
    gidNumber : '',
    pidNum : '',
    joblistIndex : '1',
    index : '1',
    userIndex : '1',
    operateDate : [],
    hrpassindex : '1',
    personList : [],
    tablePassorganizationList : [],
    bassDataIndex : '1',
    poweraAid : '',
  //  this.$store.state.poweraAid = this.message.poweraAid
  },
  mutations,

  // mutations :{
  //   [types.Login] : (state,data)=>{
  //     localStorage.token =data;
  //     state.token = data;
  //   },
  //   [type.LOGOUT]: (state)=>{
  //     localStorage.removeItem('token')
  //     state.token = null;
  //   },
  //   [type.TITLE] : (state,data)=>{
  //     state.token = data
  //   }
  // }
})

export default store







