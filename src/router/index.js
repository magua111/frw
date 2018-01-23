
import Vue from 'vue'
import Cookies from 'js-cookie'
import VueRouter from 'vue-router'

// HR同步数据展示
import hr from '@/HR/hr'
import empty from '@/HR/empty'
import person from '@/HR/person'
import organization from '@/HR/organization' 

// 角色管理
import role from '@/role/role'
import power from '@/role/power'


// 公共模块及登录
import Index from '@/common/Index'
import visit from '@/common/visit'
import Login from '@/common/Login'

// HR手动同步数据
import getData from '@/getData/getData'

// 资源管理
import resControl from '@/resControl/resControl'

// 机构管理
import tree from '@/centryData/tree'
import emptyOrg from '@/centryData/emptyOrg'
import PeopleList from '@/centryData/PeopleList'
import institution from '@/centryData/institution'
import personControl from '@/centryData/personControl'
import fondinstitution from '@/centryData/fondinstitution'

// 人员管理
import post from '@/perManagment/post'
import jobList from '@/perManagment/jobList'
import personlist from '@/perManagment/personlist'

// 应用系统
import UserList from '@/system/List'

//基础数据管理组件
import operate from '@/bassData/operate'
import bassData from '@/bassData/bassData'
import definition from '@/bassData/definition'

//  添加组件
import TeacherAdd from '@/add/Add'
import roleAdd from '@/add/roleAdd'
import userAdd from '@/add/userAdd'
import management from '@/add/list'
import addGroup from '@/add/addGroup'
import addPerson from '@/add/addPerson'
import addjobPer from '@/add/addjobPer'
import addjobOrg from '@/add/addjobOrg'
import addBusiness from '@/add/addBusiness'
import addresource from '@/add/addresource'
import addPersonall from '@/add/addPersonall'
import addpersonfit from '@/add/addpersonfit'
import addUserGroup from '@/add/addUserGroup'
import addpersonNull from '@/add/addpersonNull'
import addInstitution from '@/add/addInstitution'

// 用户管理
import Usermanagment from '@/userControl/foundation' 

// 用户组管理
import userGroupside from '@/usergroup/userGroupside'
import foundationGroup from '@/usergroup/foundationGroup'

//按人员查该人员的职务
import personJob from '@/personJob/personJob'
import fondbyPerson from '@/personJob/fondbyPerson'
import fondbyinstitution from '@/personJob/fondbyinstitution'


Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'active',
  // mode:'history',
  routes: [
    { path: '/', component: Login },
    {
      path: '/home',
      component: Index,
      children: [
        { path: '/role', component: role},
        { path: '/empty', component: empty},
        { path: '/getdata', component: getData},
        { path: '/roleAdd', component: roleAdd},
        { path: '/addjobPer', component: addjobPer},
        { path: '/uums_mgr', component: management},
        { path: '/role/power/:id', component: power},
        { path: '/center/add', component: TeacherAdd},
        { path: '/resControl', component: resControl},
        { path: '/center/userAdd', component: userAdd},
        { path: '/appManagement', component: UserList},
        { path: '/addjobOrg/:id', component: addjobOrg},
        { path: '/addPerson/:id', component: addPerson},
        { path: '/userGroupside', component: userGroupside},
        { path: '/addresource/:id/:aid/:partneId', component: addresource},
        { path: '/center/addGroup', component: addGroup},
        { path: '/addPersonall', component: addPersonall},
        { path: '/addpersonfit', component: addpersonfit},
        { path: '/userControl/:id', component: Usermanagment},
        { path: '/center/addBusiness', component: addBusiness},
        { path: '/center/addUserGroup/:id', component: addUserGroup},
        { path: '/institution/peopleList/:id', component: PeopleList},
        { path: '/center/addInstitution/:id', component: addInstitution},
        { path: '/userGroupside/foundationGroup/:id', component: foundationGroup},
        { path: '/institution', component: institution,children : [
            {path: '/institution/tree' , component: tree},
            {path: '/institution/fondinstitution' , component: fondinstitution},
            {path: '/institution/emptyOrg' , component: emptyOrg},
          ]},
        { path: '/HR', component: hr ,
          children : [
            {path :'/HR/person', component: person},
            {path :'/HR/organization', component: organization}
          ]     
        },
        { path: '/bassData', component: bassData ,
          children : [
            {path: '/bassData/operate' , component: operate},
            {path: '/bassData/dvdRip' , component: definition}
          ]
        },
        { path: '/personControl', component: personControl,
          children : [
            {path: '/centeryData/personlist' , component: personlist},
            {path: '/centeryData/jobList' , component: jobList},
            {path: '/centeryData/post' , component: post}
          ]
        },
        { path: '/person', component: personJob,
          children : [
          {path: '/person/fondbyinstitution' , component: fondbyinstitution},
          {path: '/person/fondbyPerson' , component: fondbyPerson}
        ]},
      ]
    },
  ]
})


export default router