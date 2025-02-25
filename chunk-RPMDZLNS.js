import{a as b}from"./chunk-WVDVFJNE.js";import{e as w}from"./chunk-7MKG6VHM.js";import{K as s,L as p,M as d,R as f,Sa as u,Wa as _,X as h,bb as g,hb as y,ob as v,s as m,vb as C,xb as S}from"./chunk-3B44IZU7.js";var k={formId:"petallergy",title:"Allergy",components:[{name:"Text",key:"name",focused:!0,fields:[{name:"Placeholder",value:"fill petallergy title"},{name:"Label",value:"Title"}]},{name:"Text",key:"description",fields:[{name:"Placeholder",value:"fill petallergy description"},{name:"Label",value:"Description"}]}]};var c=(()=>{class o{get rows(){return this._petallergyService.petallergys}constructor(i,t,e,l,a,M){this._translate=i,this._petallergyService=t,this._alert=e,this._form=l,this._core=a,this._router=M,this.pet_id=this._router.url.includes("allergies/")?this._router.url.replace("/allergies/",""):"",this.columns=["name","description"],this.form=this._form.getForm("petallergy",k),this.config={create:()=>{this._form.modal(this.form,{label:"Create",click:(r,n)=>{this._preCreate(r),this._petallergyService.create(r),n()}})},update:r=>{this._form.modal(this.form,[],r).then(n=>{this._core.copy(n,r),this._petallergyService.update(r)})},delete:r=>{this._alert.question({text:this._translate.translate("Common.Are you sure you want to delete this petallergy?"),buttons:[{text:this._translate.translate("Common.No")},{text:this._translate.translate("Common.Yes"),callback:()=>{this._petallergyService.delete(r)}}]})},buttons:[{icon:"cloud_download",click:r=>{this._form.modalUnique("petallergy","url",r)}}],headerButtons:[{icon:"playlist_add",click:this._bulkManagement(),class:"playlist"},{icon:"edit_note",click:this._bulkManagement(!1),class:"edit"}]}}_bulkManagement(i=!0){return()=>{this._form.modalDocs(i?[]:this.rows).then(t=>{if(i)for(let e of t)this._preCreate(e),this._petallergyService.create(e);else{for(let e of this.rows)t.find(l=>l._id===e._id)||this._petallergyService.delete(e);for(let e of t){let l=this.rows.find(a=>a._id===e._id);l?(this._core.copy(e,l),this._petallergyService.update(l)):(this._preCreate(e),this._petallergyService.create(e))}}})}}_preCreate(i){delete i.__created,this.pet_id&&(i.pet=this.pet_id)}static{this.\u0275fac=function(t){return new(t||o)(s(v),s(b),s(y),s(S),s(g),s(u))}}static{this.\u0275cmp=p({type:o,selectors:[["ng-component"]],standalone:!1,decls:1,vars:3,consts:[["title","Allergies",3,"columns","config","rows"]],template:function(t,e){t&1&&h(0,"wtable",0),t&2&&f("columns",e.columns)("config",e.config)("rows",e.rows)},dependencies:[C],encapsulation:2})}}return o})();var A=[{path:"",component:c},{path:":pet_id",component:c}],Y=(()=>{class o{static{this.\u0275fac=function(t){return new(t||o)}}static{this.\u0275mod=d({type:o})}static{this.\u0275inj=m({imports:[_.forChild(A),w]})}}return o})();export{Y as AllergiesModule};
