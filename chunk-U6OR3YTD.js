import{a as F,b as T}from"./chunk-BQQUI5CC.js";import{e as x}from"./chunk-7MKG6VHM.js";import{$ as l,H as n,Ha as C,K as d,L as g,M as y,Sa as b,T as p,V as t,W as i,Wa as I,X as u,bb as P,eb as w,f as h,hb as E,ia as s,ja as v,ka as m,ob as k,qa as _,qb as j,ra as S,s as f,sa as M,xb as O}from"./chunk-3B44IZU7.js";var B=(()=>{class a{constructor(r,o,e,c,D,N){this._petrecordService=r,this._router=o,this._form=e,this._core=c,this._alert=D,this._translate=N,this.petrecord=this._petrecordService.doc(this._router.url.replace("/pethistorypage/","")),this.isMenuOpen=!1,this.form=this._form.getForm("petrecord",F)}update(r){this._form.modal(this.form,[],r).then(o=>{this._core.copy(o,r),this._petrecordService.update(r)})}delete(r){this._alert.question({text:this._translate.translate("Common.Are you sure you want to delete this petrecord?"),buttons:[{text:this._translate.translate("Common.No")},{text:this._translate.translate("Common.Yes"),callback:()=>h(this,null,function*(){this._petrecordService.delete(r),this._router.navigateByUrl("/pethistory/"+r.pet)})}]})}static{this.\u0275fac=function(o){return new(o||a)(d(T),d(b),d(O),d(P),d(E),d(k))}}static{this.\u0275cmp=g({type:a,selectors:[["ng-component"]],standalone:!1,decls:33,vars:20,consts:[[1,"documents-wrapper"],[1,"documents-container"],[1,"documents-list"],[1,"burger-wrap",3,"click"],[1,"burger"],[1,"documents-sidebar"],[1,"documents-sidebar-content"],[1,"documents-sidebar__img"],["src","assets/default.png","alt",""],[1,"documents-sidebar__title"],[3,"click"],[1,"documents-main"],[1,"documents-main-content"],[1,"documents-main-row"],[1,"documents__title"],[1,"documents__date"],[1,"documents__disease"],[1,"documents__treatment"],[1,"documents__procedure"],[1,"documents__notes"]],template:function(o,e){o&1&&(t(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),l("click",function(){return e.isMenuOpen=!e.isMenuOpen}),u(4,"div",4),i(),t(5,"div",5)(6,"div",6)(7,"div",7),u(8,"img",8),i(),t(9,"div",9),s(10),i(),t(11,"div")(12,"wbutton",10),l("click",function(){return e.update(e.petrecord)}),s(13,"Edit"),i(),t(14,"wbutton",10),l("click",function(){return e.delete(e.petrecord)}),s(15,"Delete"),i()()()(),t(16,"div",11)(17,"div",12)(18,"div",13)(19,"div",14),s(20),i(),t(21,"div",15),s(22),_(23,"mongodate"),_(24,"date"),i(),t(25,"div",16),s(26),i(),t(27,"div",17),s(28),i(),t(29,"div",18),s(30),i(),t(31,"div",19),s(32),i()()()()()()()),o&2&&(p("documents-wrapper--open",e.isMenuOpen),n(3),p("burger-wrap--open",e.isMenuOpen),n(),p("burger--close",e.isMenuOpen),n(),p("documents-sidebar--open",e.isMenuOpen),n(5),m(" ",e.petrecord.name," "),n(10),v(e.petrecord.name),n(2),m(" ",M(24,17,S(23,15,e.petrecord._id),"d MMMM y H:mm")," "),n(4),m(" ",e.petrecord.disease," "),n(2),m(" ",e.petrecord.treatment," "),n(2),m(" ",e.petrecord.procedure," "),n(2),v(e.petrecord.notes))},dependencies:[j,C,w],encapsulation:2})}}return a})();var R=[{path:":record_id",component:B}],Z=(()=>{class a{static{this.\u0275fac=function(o){return new(o||a)}}static{this.\u0275mod=y({type:a})}static{this.\u0275inj=f({imports:[I.forChild(R),x]})}}return a})();export{Z as PethistorypageModule};
