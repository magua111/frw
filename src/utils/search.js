
   
   
// //    selectedgroup = this.selectedgroup
// //    optionSelectgroup = this.optionSelectgroup
   

//    function groupeditGet(newAid,optionSelectgroup){
//     optionSelectgroup = [];
//     if( newAid.length == 0 ){
//         optionSelectgroup = []
//     }else{
//       var dataArr2 = [];
//       dataArr2.push(newAid)
//       var newArr2 = JSON.stringify(dataArr2)
//       var url  = '/uums_mgr/uGroup/findUGroupsListByAids';
//       this.$http.post(url,newArr2,{emulateJSON:true}).then(res=>{
//       for( var i = 0;i < res.body.length;i++ ){
//         optionSelectgroup.push(res.body[i])
//       }
//     },res=>{
//     })
//   }
//   }

//    function getnewGroup(a ,selectedgroup){
//     var url  = '/uums_mgr/uGroup/findUGroupsListByAidsAndGids';
//     var data = {};
//     var dataaid = [];
//     var datagid = [];
//     if(a.length == 0){
//         selectedgroup = [];
//     }else{
//       dataaid.push(a)
//       for(var i = 0; i<selectedgroup.length ; i++){
//         datagid.push(selectedgroup[i].gid)
//       }
//       data.aids = dataaid;
//       data.gids = datagid;
//       var newData = JSON.stringify(data)
//       this.$http.post(url,newData,{emulateJSON:true}).then(res=>{
//         selectedgroup = res.body
//       },res=>{
//       })
//     }
//   }
//   var sear = {}
//   sear.getnewGroup = getnewGroup, 
//   sear.groupeditGet = groupeditGet
 


// export {sear}