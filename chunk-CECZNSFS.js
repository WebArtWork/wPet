import{a as D}from"./chunk-XO6GTODC.js";import{e as k}from"./chunk-7MKG6VHM.js";import{K as o,L as m,M as h,Qa as _,R as f,Sa as v,Wa as y,X as g,bb as w,f as l,hb as b,i as n,ob as C,s as u,vb as S,xb as P}from"./chunk-3B44IZU7.js";var M={formId:"petdrug",title:"Petdrug",components:[{name:"Text",key:"name",focused:!0,fields:[{name:"Placeholder",value:"fill petdrug title"},{name:"Label",value:"Title"}]},{name:"Text",key:"dosage",fields:[{name:"Placeholder",value:"fill petdrug dosage"},{name:"Label",value:"Dosage"}]},{name:"Text",key:"frequency",fields:[{name:"Placeholder",value:"fill petdrug usage frequency"},{name:"Label",value:"Frequency"}]},{name:"Text",key:"usageperiod",fields:[{name:"Placeholder",value:"fill petdrug usage period"},{name:"Label",value:"Usage period"}]},{name:"Text",key:"purpose",fields:[{name:"Placeholder",value:"fill petdrug purpose"},{name:"Label",value:"Purpose"}]},{name:"Text",key:"description",fields:[{name:"Placeholder",value:"fill petdrug description"},{name:"Label",value:"Description"}]}]};var p=(()=>{class s{constructor(e,i,t,a,c,q,x){this._translate=e,this._petdrugService=i,this._alert=t,this._form=a,this._core=c,this._router=q,this._route=x,this.columns=["name","dosage","frequency","usageperiod","purpose","description"],this.form=this._form.getForm("petdrug",M),this.config={paginate:this.setRows.bind(this),perPage:20,setPerPage:this._petdrugService.setPerPage.bind(this._petdrugService),allDocs:!1,create:()=>{this._form.modal(this.form,{label:"Create",click:(r,d)=>l(this,null,function*(){d(),this._preCreate(r),yield n(this._petdrugService.create(r)),this.setRows()})})},update:r=>{this._form.modal(this.form,[],r).then(d=>{this._core.copy(d,r),this._petdrugService.update(r)})},delete:r=>{this._alert.question({text:this._translate.translate("Common.Are you sure you want to delete this petdrug?"),buttons:[{text:this._translate.translate("Common.No")},{text:this._translate.translate("Common.Yes"),callback:()=>l(this,null,function*(){yield n(this._petdrugService.delete(r)),this.setRows()})}]})},buttons:[{icon:"cloud_download",click:r=>{this._form.modalUnique("petdrug","url",r)}}],headerButtons:[{icon:"playlist_add",click:this._bulkManagement(),class:"playlist"},{icon:"edit_note",click:this._bulkManagement(!1),class:"edit"}]},this.rows=[],this.place_id="",this._page=1,this.setRows(),this._route.paramMap.subscribe(r=>{this.place_id=r.get("place_id")||""})}setRows(e=this._page){this._page=e,this._core.afterWhile(this,()=>{this._petdrugService.get({page:e,query:this._query()}).subscribe(i=>{this.rows.splice(0,this.rows.length),this.rows.push(...i)})},250)}_bulkManagement(e=!0){return()=>{this._form.modalDocs(e?[]:this.rows).then(i=>l(this,null,function*(){if(e)for(let t of i)this._preCreate(t),yield n(this._petdrugService.create(t));else{for(let t of this.rows)i.find(a=>a._id===t._id)||(yield n(this._petdrugService.delete(t)));for(let t of i){let a=this.rows.find(c=>c._id===t._id);a?(this._core.copy(t,a),yield n(this._petdrugService.update(a))):(this._preCreate(t),yield n(this._petdrugService.create(t)))}}this.setRows()}))}}_preCreate(e){delete e.__created,this.place_id&&(e.place=this.place_id)}_query(){let e="";return this.place_id&&(e+=(e?"&":"")+"place="+this.place_id),e}static{this.\u0275fac=function(i){return new(i||s)(o(C),o(D),o(b),o(P),o(w),o(v),o(_))}}static{this.\u0275cmp=m({type:s,selectors:[["ng-component"]],standalone:!1,decls:1,vars:3,consts:[["title","Drugs",3,"columns","config","rows"]],template:function(i,t){i&1&&g(0,"wtable",0),i&2&&f("columns",t.columns)("config",t.config)("rows",t.rows)},dependencies:[S],encapsulation:2})}}return s})();var j=[{path:"",component:p},{path:":place_id",component:p}],H=(()=>{class s{static{this.\u0275fac=function(i){return new(i||s)}}static{this.\u0275mod=h({type:s})}static{this.\u0275inj=u({imports:[y.forChild(j),k]})}}return s})();export{H as DrugsModule};
