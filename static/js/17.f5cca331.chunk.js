(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[17],{114:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n,l=a(126),r=a(127).a.div(n||(n=Object(l.a)(["\n  width:10px;\n  height:auto;\n  display:inline-block;\n}"])))},115:function(e,t,a){"use strict";a.d(t,"b",(function(){return s})),a.d(t,"a",(function(){return u}));var n=a(21),l=a(1),r=a.n(l),c=a(170),i=a(171),o={control:function(e){return Object(n.a)(Object(n.a)({},e),{},{width:150})},container:function(e){return Object(n.a)(Object(n.a)({},e),{},{display:"inline-block",textAlign:"left"})}},s=function(e){return r.a.createElement(i.a,{isMulti:e.isMulti,styles:o,value:e.value,onChange:e.onSelect,options:e.list.map((function(e){return{value:e,label:e}})),isDisabled:e.isDisabled,isClearable:e.isClearable})},u=function(e){return r.a.createElement(c.a,{isClearable:!0,styles:o,value:e.value,onChange:e.onSelect,options:e.list.map((function(e){return{value:e,label:e}})),isDisabled:e.isDisabled})}},118:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(22),l=a(1),r=a.n(l),c=a(95),i=a(114),o=a(115),s=function(e){var t=e.filterobject,a=e.filtervalue;return r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},r.a.createElement("div",null,Object.keys(t).map((function(l){return r.a.createElement("div",{key:t[l].title,style:{display:"inline-block"}},r.a.createElement("label",null,l,":"),r.a.createElement(i.a,null),r.a.createElement(o.b,Object.assign({list:t[l].list,title:t[l].title,value:{label:a[l],value:a[l]},onSelect:function(t){return function(t,a){e.onSelectDropDown&&e.onSelectDropDown(Object(n.a)({},t,a.value))}(l,t)}},e)),r.a.createElement(i.a,null))}))),r.a.createElement("div",null,r.a.createElement(c.a,{onClick:e.onResetSelection},"Reset")))}},119:function(e,t,a){"use strict";a.d(t,"a",(function(){return E}));var n=a(21),l=a(1),r=a.n(l),c=a(411),i=a(395),o=a(396),s=a(104),u=a(105),m=a(106),d=a(354),f=a(95),p=a(129),b=a.n(p),v=a(172),h=a(114),g=a(118),E=function(e){var t=e.initialState,a="Submit",l=!0;e.deleteflag&&(a="Delete"),e.editflag&&(a="Save");var p=e.filtervalue||[];return e.filterComponent&&Object.keys(p).map((function(e){p[e].search("Select")||(l=!1)})),r.a.createElement(c.a,{isOpen:e.open,size:"lg"},r.a.createElement(i.a,{toggle:e.ontoggle},e.titleVal),r.a.createElement(o.a,null,e.filterComponent?r.a.createElement(s.a,null,r.a.createElement(u.a,null,r.a.createElement(m.a,{className:"mb-3"},r.a.createElement(d.a,null,r.a.createElement(g.a,e))))):null,r.a.createElement(s.a,null,r.a.createElement(u.a,null,r.a.createElement(m.a,{className:"mb-3"},r.a.createElement(d.a,null,e.initialState?r.a.createElement(v.d,{initialValues:e.initialState,validationSchema:e.schemaValidation,onSubmit:function(t,a){var l=a.setSubmitting,r=a.resetForm;t=Object(n.a)(Object(n.a)({},t),{},{createdatetime:b()().toISOString()}),l(!0),fetch("http://localhost:9080/api/"+e.serviceName,{method:e.method,body:JSON.stringify(Object(n.a)(Object(n.a)({},t),p)),headers:{"Content-Type":"application/json"}}).then((function(a){a.status>=200&&a.status<300?a.json().then((function(a){if(0!==a.rowCount){switch(e.onClickSubmit(t),e.method){case"POST":alert("Insert Row operation successful");break;case"PUT":alert("Update Row operation successful"),e.ontoggle()}r()}else alert("No Rows Affected. Please check the Filter")})):a.json().then((function(e){return alert("There was an error, please try again, ".concat(e.reason))})),l(!1)})).catch((function(){alert("There was an error, please try again"),l(!1)}))}},(function(n){var c=n.isSubmitting,i=n.handleReset,o=n.dirty,s=n.errors;return r.a.createElement(v.c,null,Object.keys(t).map((function(t){return r.a.createElement("div",{key:t,style:{display:"inline-block",height:"100%"}},r.a.createElement(v.a,{name:t,render:function(e){return r.a.createElement("div",{style:{fontSize:"0.5em",color:"red",width:"200px",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}},e)}}),r.a.createElement(v.b,{name:t,component:e.component,editflag:e.editflag,deleteflag:e.deleteflag,disabled:e.disabled,disabledelement:e.disabledelement,filterobject:e.filterobject,filtervalue:p,column:e.column,initialstate:e.initialState,keyfield:e.keyfield,expensecategory:e.expenseCategory,vendorlist:e.vendorlist,selectionlist:e.selectionlist}))})),r.a.createElement("br",null),e.hidebutton?null:r.a.createElement("div",null,r.a.createElement(f.a,{color:"primary",type:"submit",disabled:Object.keys(s).length>0||!l||!e.deleteflag&&!o},a),r.a.createElement(h.a,null),r.a.createElement(f.a,{color:"secondary",onClick:i,disabled:!o||c},"Reset")," "))})):null))))))}},125:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return s}));var n=a(21),l=a(120),r=a.n(l),c=a(121),i=function(){var e=Object(c.a)(r.a.mark((function e(t,a){var n,l,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=encodeURIComponent(JSON.stringify(a)),e.next=3,fetch("http://localhost:9080/api/"+t+"?filterValue="+n);case 3:return l=e.sent,e.next=6,l.json();case 6:return c=e.sent,e.abrupt("return",c);case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),o=function(){var e=Object(c.a)(r.a.mark((function e(t,a){var n,l,c,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=encodeURIComponent(JSON.stringify(a)),e.next=3,fetch("http://localhost:9080/api/"+t+"?filterValue="+n);case 3:return l=e.sent,e.next=6,l.json();case 6:return c=e.sent,i=c.map((function(e){return Object.values(e)[0]})),e.abrupt("return",i);case 9:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),s=function(){var e=Object(c.a)(r.a.mark((function e(t,a,l){var c,o,s,u;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c="",o=[],s=[],u="",console.log(t),e.t0=t,e.next="Verticals"===e.t0?8:"Sub-Verticals"===e.t0?14:"Vendors"===e.t0?20:"Branch"===e.t0?26:32;break;case 8:return c="Sub-Verticals",e.next=11,i("managesubverticaldata",a);case 11:return o=e.sent,u="sub-vertical",e.abrupt("break",37);case 14:return c="Vendors",e.next=17,i("managevendordata",a);case 17:return o=e.sent,u="vendor",e.abrupt("break",37);case 20:return c="Company",e.next=23,i("managecompanydata",a);case 23:return o=e.sent,u="company",e.abrupt("break",37);case 26:return c="Branch",e.next=29,i("managebranchdata");case 29:return o=e.sent,u="branch",e.abrupt("break",37);case 32:return c="Verticals",e.next=35,i("manageverticaldata",a);case 35:o=e.sent,u="vertical";case 37:s=o.map((function(e){return e[u]})),l((function(e){var t=Object(n.a)({},e);t[c]=Object(n.a)(Object(n.a)({},t[c]),{},{list:s});for(var a=t[c].childType;a;)t[a]=Object(n.a)(Object(n.a)({},t[a]),{},{list:[]}),a=t[a].child||null;return t}));case 39:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}()},128:function(e,t,a){"use strict";var n=a(15),l=a(126),r=a(1),c=a.n(r),i=a(21),o=a(0),s=a.n(o),u=(Object(i.a)(Object(i.a)({},s.a),{},{ID:s.a.oneOfType([s.a.string,s.a.number]).isRequired,component:s.a.oneOfType([s.a.string,s.a.func]),date:s.a.oneOfType([s.a.instanceOf(Date),s.a.string])}),a(19)),m=a(22),d=a(3),f=a.n(d),p=["tag","className","type"],b={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6","display-1":"h1","display-2":"h1","display-3":"h1","display-4":"h1",p:"p",lead:"p",blockquote:"blockquote"},v=function(e){var t,a=e.tag,l=e.className,r=e.type,i=Object(n.a)(e,p),o=f()(Object(m.a)({},r,!!r),l);return t=a||(!a&&b[r]?b[r]:"p"),c.a.createElement(t,Object.assign({},i,{className:o}))};v.defaultProps={type:"p"};var h,g=v,E=a(127),y=a(97),j=a(98),O=a(95),S=a(6),w=["title","create","breadcrumbs","onClick","tag","className","children"],C=u.a.create("page"),k=E.a.div(h||(h=Object(l.a)(["\n  display: inline-block;\n"]))),D=function(e){var t=e.title,a=e.create,l=(e.breadcrumbs,e.onClick),r=e.tag,i=e.className,o=e.children,s=Object(n.a)(e,w),u=C.b("px-3",i);return c.a.createElement(r,Object.assign({className:u},s),c.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},c.a.createElement(k,{className:C.e("header")},c.a.createElement(y.a,{light:!0,expand:!0},c.a.createElement(j.a,{navbar:!0,className:"mr-2"},c.a.createElement(O.a,{outline:!0,onClick:function(e){e.preventDefault(),e.stopPropagation(),document.querySelector(".cr-sidebar").classList.toggle("cr-sidebar--open")}},c.a.createElement(S.d,{size:25}))))),c.a.createElement(k,{className:C.e("header")},t&&"string"===typeof t?c.a.createElement(g,{type:"h4",className:C.e("title")},t):t),a?c.a.createElement(k,null,c.a.createElement(O.a,{color:"primary",value:"Create",onClick:l},"Create")):c.a.createElement("div",null)),o)};D.defaultProps={tag:"div",title:""};t.a=D},139:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(35),l=a(1);function r(){var e=window;return{width:e.innerWidth,height:e.innerHeight}}function c(){var e=Object(l.useState)(r()),t=Object(n.a)(e,2),a=t[0],c=t[1];return Object(l.useEffect)((function(){function e(){c(r())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),a}},140:function(e,t,a){"use strict";var n=a(22),l=a(21),r=a(35),c=a(1),i=a.n(c),o=a(119),s=a(411),u=a(395),m=a(396),d=a(104),f=a(105),p=a(106),b=a(354),v=a(95),h=a(114),g=function(e){var t={},a=Object(c.useState)(!1),n=Object(r.a)(a,2),o=n[0],g=n[1];e.selectedRows.map((function(e){Object.keys(e).map((function(a){t[a]||(t[a]=[]),t[a].push(e[a])}))}));return i.a.createElement(s.a,{isOpen:e.open,size:"lg"},i.a.createElement(u.a,{toggle:e.ontoggle},e.titleVal),i.a.createElement(m.a,null,i.a.createElement(d.a,null,i.a.createElement(f.a,null,i.a.createElement(p.a,{className:"mb-3"},i.a.createElement(b.a,null,i.a.createElement("div",{style:{paddingBottom:"10px"}},"Are you sure to delete ",e.selectedRows.length," rows?"),i.a.createElement("div",null,i.a.createElement(v.a,{color:"primary",type:"submit",onClick:function(){fetch("http://localhost:9080/api/"+e.serviceName,{method:"DELETE",body:JSON.stringify(Object(l.a)({},t)),headers:{"Content-Type":"application/json"}}).then((function(t){t.status>=200&&t.status<300?(g(!0),t.json().then((function(t){0!==t.rowCount?(e.onClickSubmit(),e.ontoggle(),alert("Delete Row operation successful")):(alert("No Rows Affected. Please check the Filter"),g(!1))}))):(alert("There was an error, please try again"),g(!1))}))},disabled:o},"Delete"),i.a.createElement(h.a,null),i.a.createElement(v.a,{color:"secondary",onClick:e.ontoggle},"Cancel"))))))))};a.d(t,"a",(function(){return E}));var E=function(e){var t=Object(c.useState)({Edit:e.editFlag,Delete:!e.editFlag}),a=Object(r.a)(t,2),s=a[0],u=a[1],m=e.updateType?Object(l.a)(Object(l.a)({},e.rowData),{},Object(n.a)({},"new "+e.keyfield,"")):Object(l.a)({},e.rowData);if(m.servicesavailed){var d;d=m.servicesavailed.split(",").map((function(e){if(""!==e)return{label:e.trim(),value:e.trim()}})),m.servicesavailed=d}var f=function(e){u(Object(l.a)(Object(l.a)({},s),{},Object(n.a)({},e.target.value,!s[e.target.value])))};return i.a.createElement("div",null,e.editFlag?i.a.createElement(o.a,{component:e.editComponent,disabledelement:e.disabledelement,editflag:!0,expenseCategory:e.expenseCategory,initialState:m,keyfield:e.keyfield,method:"PUT",open:s.Edit,serviceName:e.serviceName,titleVal:e.edittitle,ontoggle:function(){f({target:{value:"Edit"}})},filterComponent:!1,filterobject:e.filterobject,filtervalue:e.filtervalue,selectionlist:e.selectionlist,vendorlist:e.vendorlist,onClickSubmit:e.onClickSubmit,onResetSelection:e.onResetSelection,onSelectDropDown:e.onSelectDropDown}):i.a.createElement(g,{method:"DELETE",open:s.Delete,serviceName:e.serviceName,selectedRows:e.selectedRows,titleVal:e.deletetitle,ontoggle:function(){f({target:{value:"Delete"}})},onClickSubmit:e.onClickSubmit,onResetSelection:e.onResetSelection,onSelectDropDown:e.onSelectDropDown}))}},410:function(e,t,a){"use strict";a.r(t);var n=a(120),l=a.n(n),r=a(21),c=a(121),i=a(35),o=a(15),s=a(1),u=a.n(s),m=a(174),d=a(95),f=a(128),p=a(115),b=a(172),v=a(114),h=a(125),g=a(22),E=a(176),y=a(140),j=a(401),O=a(402),S=a(139),w=(a(177),a(178),{mouseX:null,mouseY:null}),C={Edit:!1,Delete:!1,CSV:!1,Email:!1},k=function(e){var t=e.mouseState,a=e.setMouseState,n=e.setFlag,l=function(e){n((function(t){return Object(r.a)(Object(r.a)({},t),{},Object(g.a)({},e,!0))})),a(w)};return u.a.createElement(j.a,{keepMounted:!0,open:null!==t.mouseY,onClose:l,anchorReference:"anchorPosition",anchorPosition:null!==t.mouseY&&null!==t.mouseX?{top:t.mouseY,left:t.mouseX}:void 0},u.a.createElement(O.a,{onClick:function(){return l("Delete")}},"Delete"),u.a.createElement(O.a,{onClick:function(){return l("CSV")}},"ExportCSV"))},D=function(e){var t=Object(s.useState)([]),a=Object(i.a)(t,2),n=(a[0],a[1]),l=Object(s.useState)([]),r=Object(i.a)(l,2),c=r[0],o=r[1],m=Object(s.useState)(w),d=Object(i.a)(m,2),f=d[0],p=d[1],b=Object(s.useState)(!1),v=Object(i.a)(b,2),h=v[0],g=v[1],j=Object(s.useState)(C),O=Object(i.a)(j,2),D=O[0],x=O[1],N=Object(s.useState)(null),R=Object(i.a)(N,2),V=R[0],T=R[1],F=e.makeColumns(e.data[0]),P=Object(S.a)().width;function z(e){return e.columnApi.getAllDisplayedColumns()[0]===e.column}D.CSV&&(V.api.exportDataAsCsv({fileName:e.fileName}),x(C));var M={resizable:!0,headerCheckboxSelection:z,checkboxSelection:z};return u.a.createElement("div",{className:"ag-theme-balham",style:{width:"100%",height:"100%",display:"flex",flexDirection:"column"},onContextMenu:function(e){e.preventDefault(),g(!1),p(w)}},h?u.a.createElement(k,{mouseState:f,setMouseState:p,setFlag:x}):null,u.a.createElement(E.AgGridReact,{columnDefs:F,defaultColDef:M,rowData:e.data,rowSelection:"multiple",overlayLoadingTemplate:'<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',overlayNoRowsTemplate:'<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">No Rows To Show</span>',onCellContextMenu:function(e){e.event.preventDefault(),e.node.setSelected(!0),n(e.node.data),o(e.api.getSelectedRows()),x(C),g(!0),p({mouseX:e.event.clientX-2,mouseY:e.event.clientY-4})},onGridReady:function(e){P>800&&e.api.sizeColumnsToFit(),T(e)}}),D.Delete?u.a.createElement(y.a,Object.assign({selectedRows:c,editFlag:D.Edit,columnDefs:F},e)):null)},x={clientname:"",pan:"",category:"",filename:"",createdatetime:null},N=function(){return Object.keys(x).map((function(e){return{field:e,headerName:e.toUpperCase(),filter:"agTextColumnFilter",sortable:!0,resizable:!0,cellRenderer:"filename"===e?function(e){return"<a href=".concat(e.data.s3url,">").concat(e.data.filename,"</a>")}:null}}))};a.d(t,"DocDownload",(function(){return T}));var R=["field","form"],V=function(e){var t=e.field,a=e.form,n=Object(o.a)(e,R);switch(t.name){case"category":return u.a.createElement("label",null,t.name.toUpperCase(),": ",u.a.createElement(v.a,null),u.a.createElement(p.b,{isMulti:!1,list:n.category,value:{label:t.value,value:t.value},onSelect:function(e){e?a.setFieldValue(t.name,e.value):a.setFieldValue(t.name,"")},isClearable:!0}),u.a.createElement(v.a,null));case"clientname":return u.a.createElement("label",null,t.name.toUpperCase(),": ",u.a.createElement(v.a,null),u.a.createElement(p.b,{isMulti:!1,list:n.selectionlist[t.name],value:{label:t.value,value:t.value},onSelect:function(e){a.resetForm(),a.setFieldValue(t.name,e.value)}}),u.a.createElement(v.a,null));case"pan":return u.a.createElement("label",null,t.name.toUpperCase(),": ",u.a.createElement(v.a,null),u.a.createElement(p.b,{isMulti:!1,list:n.selectionlist[t.name][a.values.clientname]?n.selectionlist[t.name][a.values.clientname]:[],value:{label:t.value,value:t.value},onSelect:function(e){a.setFieldValue(t.name,e.value)}}),u.a.createElement(v.a,null))}},T=function(){var e=["clientname","pan","category"],t=Object(s.useState)({clientname:[],pan:{}}),a=Object(i.a)(t,2),n=a[0],o=a[1],p=Object(s.useState)({clientname:"",pan:"",category:""}),g=Object(i.a)(p,2),E=g[0],y=g[1],j=Object(s.useState)([]),O=Object(i.a)(j,2),S=O[0],w=O[1],C=Object(s.useState)([]),k=Object(i.a)(C,2),x=k[0],R=k[1];Object(s.useEffect)((function(){(function(){var e=Object(c.a)(l.a.mark((function e(){var t,a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(h.a)("managemiscdata",{type:"pan"});case 2:t=e.sent,a=[],n={},t.map((function(e){a.push(e.name),n[e.name]||(n[e.name]=[]),n[e.name].push(e.pan)}),[]),o((function(e){return Object(r.a)(Object(r.a)({},e),{},{clientname:a,pan:n})}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(s.useEffect)((function(){(function(){var e=Object(c.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(h.b)("managemiscdata",{type:"documentcategory"});case 2:t=e.sent,w(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var T=function(e){y(Object(r.a)({},e)),Object(h.a)("managedocument",Object(r.a)({},e)).then((function(e){R(e)}))};return u.a.createElement(f.a,{title:"Download Documents",breadcrumbs:[{name:"Download Documents",active:!0}]},u.a.createElement("div",{style:{height:"100%",display:"flex",flexDirection:"column"}},u.a.createElement(b.d,{initialValues:{clientname:"Select...",pan:"Select...",category:"Select..."},validationSchema:m.e().shape({clientname:m.f().required(),pan:m.f().required()}),onSubmit:function(e,t){var a=t.setSubmitting;a(!0),T(e),a(!1)}},(function(t){var a=t.errors,l=t.dirty;return u.a.createElement(b.c,null,e.map((function(e){return u.a.createElement("div",{key:e,style:{display:"inline-block"}},u.a.createElement(b.a,{name:e,render:function(e){return u.a.createElement("div",{style:{fontSize:"0.5em",color:"red",width:"200px",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}},e)}}),u.a.createElement(b.b,{name:e,component:V,selectionlist:n,category:S}))})),u.a.createElement(v.a,null),u.a.createElement(v.a,null),u.a.createElement(d.a,{color:"primary",type:"submit",disabled:Object.keys(a).length>0||!l},"Submit"))})),u.a.createElement(D,{deletetitle:"Delete Files",data:x,fileName:E.clientname,serviceName:"managedocument",makeColumns:N,onClickSubmit:function(){T(E)}})))};t.default=T}}]);
//# sourceMappingURL=17.f5cca331.chunk.js.map