(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{19:function(e,a,t){"use strict";var n,r=t(3),c=t.n(r),o=(n="cr",{create:function(e){var a=e;return"string"===typeof n&&(a="".concat(n,"-").concat(e)),{b:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return c()(a,t)},e:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return c()("".concat(a,"__").concat(e),n)},m:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return c()("".concat(a,"--").concat(e),n)}}}});a.a=o},24:function(e,a,t){e.exports=t.p+"static/media/logo.c31ee675.png"},34:function(e,a,t){e.exports=t.p+"static/media/sidebar-4.80d4a4e5.jpg"},51:function(e,a,t){"use strict";t.d(a,"a",(function(){return n}));var n={gender:["Male","Female"],residentialstatus:["Resident","Non-Resident"],kyc:["Registered","Non-Registered","In-Progress"],interestfrequency:["Monthly","Quarterly","HalfYearly","Yearly","Cumulative"],plantype:{"Life Insurance":["Term Insurance"],"Health Insurance":["Family","Individual"],"Motor Insurance":["2 Wheeler","4 Wheeler"],"Travel Insurance":["Single Country","Multi Country"],"Select SubVertical":["Term Insurance"]},paymentfrequency:["Monthly","HalfYearly","Yearly","2year","OneTime"],producttype:["Fixed Deposits","NCDS","Capital Gain","Bonds"],fileuploadcategory:["transaction","client","insurance","term_deposit"],documentcategory:["pan","aadhar","passport","driverlicesne","others"]}},52:function(e,a,t){e.exports=t(89)},87:function(e,a,t){},89:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),c=t(18),o=t.n(c),s=t(35),i=t(47),l=t.n(i),m=t(107),u=t(110),p=t(49),d=t(108),h=t(10),g=t(11),b=t(13),f=t(12),E=t(91),v=t(92),y=t(93),x=t(94),O=t(95),N=t(24),k=t.n(N),w=function(e){Object(b.a)(t,e);var a=Object(f.a)(t);function t(e){var n;return Object(h.a)(this,t),(n=a.call(this,e)).changeAuthState=function(e){return function(a){a.preventDefault(),n.props.onChangeAuthState(e)}},n.onUsernameChange=function(e){n.setState({email:e.target.value})},n.onPasswdChange=function(e){n.setState({password:e.target.value})},n.handleSubmit=function(e){e.preventDefault(),fetch("http://localhost:9080/api/manageuserdetail",{method:"POST",body:JSON.stringify({email:n.state.email,password:n.state.password}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json().then((function(e){n.props.setAdmin(e[0].admin),"true"===e[0].admin?n.props.history.push("/dashboard"):0!==e.length?n.props.history.push("/manage-verticals"):alert("User not set, Please set the user")}))})).catch((function(){alert("There was an error, please try again")}))},n.state={email:"",password:" "},n}return Object(g.a)(t,[{key:"isLogin",get:function(){return this.props.authState===C}},{key:"isSignup",get:function(){return this.props.authState===S}},{key:"renderButtonText",value:function(){var e=this.props.buttonText;return!e&&this.isLogin?"Login":!e&&this.isSignup?"Signup":e}},{key:"render",value:function(){var e=this.props,a=e.showLogo,t=e.usernameLabel,n=e.usernameInputProps,c=e.passwordLabel,o=e.passwordInputProps,s=e.confirmPasswordLabel,i=e.confirmPasswordInputProps,l=e.children;return r.a.createElement(E.a,{onSubmit:this.handleSubmit},a&&r.a.createElement("div",{className:"text-center pb-4"},r.a.createElement("img",{src:k.a,className:"rounded",style:{width:60,height:60,cursor:"pointer"},alt:"logo"}))," ",r.a.createElement(v.a,null,r.a.createElement(y.a,{for:t},t),r.a.createElement(x.a,Object.assign({},n,{onChange:this.onUsernameChange}))),r.a.createElement(v.a,null,r.a.createElement(y.a,{for:c},c),r.a.createElement(x.a,Object.assign({},o,{onChange:this.onPasswdChange}))),this.isSignup&&r.a.createElement(v.a,null,r.a.createElement(y.a,{for:s},s),r.a.createElement(x.a,i)),r.a.createElement(v.a,{check:!0},r.a.createElement(y.a,{check:!0},r.a.createElement(x.a,{type:"checkbox"})," ",this.isSignup?"Agree the terms and policy":"Remember me")),r.a.createElement("hr",null),r.a.createElement(O.a,{size:"lg",className:"bg-gradient-theme-left border-0",block:!0,onClick:this.handleSubmit},this.renderButtonText()),r.a.createElement("div",{className:"text-center pt-1"},r.a.createElement("h6",null,this.isSignup?r.a.createElement("a",{href:"#login",onClick:this.changeAuthState(C)},"Login"):"")),l)}}]),t}(r.a.Component),C="LOGIN",S="SIGNUP";w.defaultProps={authState:"LOGIN",showLogo:!0,usernameLabel:"Email",usernameInputProps:{type:"email",placeholder:"your@email.com"},passwordLabel:"Password",passwordInputProps:{type:"password",placeholder:"your password"},confirmPasswordLabel:"Confirm Password",confirmPasswordInputProps:{type:"password",placeholder:"confirm your password"},username:"",password:""};var j=w,P=t(0),I=t.n(P),A=t(29),L=!!Object({NODE_ENV:"production",PUBLIC_URL:"/CoolMilanShah/wm-dashboard-widget-master"}).REACT_APP_GOOGLE_ANALYTICS;L&&A.a.initialize(Object({NODE_ENV:"production",PUBLIC_URL:"/CoolMilanShah/wm-dashboard-widget-master"}).REACT_APP_GOOGLE_ANALYTICS);var z=function(e){Object(b.a)(t,e);var a=Object(f.a)(t);function t(){return Object(h.a)(this,t),a.apply(this,arguments)}return Object(g.a)(t,[{key:"componentDidMount",value:function(){L&&(this.sendPageView(this.context.router.history.location),this.context.router.history.listen(this.sendPageView))}},{key:"sendPageView",value:function(e){A.a.set({page:e.pathname}),A.a.pageview(e.pathname)}},{key:"render",value:function(){return this.props.children}}]),t}(r.a.Component);z.contextTypes={router:I.a.object};var D=z,_=t(15),T=t(96),R=t(19),U=["tag","className"],M=R.a.create("content"),B=function(e){var a=e.tag,t=e.className,n=Object(_.a)(e,U),c=M.b(t);return r.a.createElement(a,Object.assign({className:c},n))};B.defaultProps={tag:T.a};var G=B,V=["children"],Y=function(e){var a=e.children,t=Object(_.a)(e,V);return r.a.createElement("main",Object.assign({className:"cr-app bg-light"},t),r.a.createElement(G,{fluid:!0},a))},q=t(97),F=t(98),H=t(99),J=function(e){return r.a.createElement("a",Object.assign({href:Object({NODE_ENV:"production",PUBLIC_URL:"/CoolMilanShah/wm-dashboard-widget-master"}).REACT_APP_SOURCE_URL,target:"_blank",rel:"noopener noreferrer"},e))},W=t(6),Q=t(21),K=t(3),X=t.n(K),Z=t(100),$=["position","size","style","className"],ee=["tag"],ae={"top-right":{top:-3,right:-3},"top-left":{top:-3,left:-3},"bottom-left":{bottom:-3,left:-3},"bottom-right":{bottom:-3,right:-3}},te={xs:{width:10,height:10},sm:{width:15,height:15},md:{width:20,height:20},lg:{width:25,height:25},xl:{width:30,height:30}},ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=e.position,t=void 0===a?"bottom-right":a,n=e.size,c=void 0===n?"sm":n,o=e.style,s=void 0===o?{}:o,i=e.className,l=Object(_.a)(e,$);return function(e){return function(a){var n=a.tag,o=void 0===n?"div":n,m=Object(_.a)(a,ee);return r.a.createElement(o,{className:"d-inline-block position-relative"},r.a.createElement(e,m),r.a.createElement(Z.a,Object.assign({className:X()("position-absolute",i),style:Object(Q.a)(Object(Q.a)(Object(Q.a)({},ae[t]),te[c]),{},{borderRadius:"50%",border:"2px solid #fff"},s)},l)))}}},re=R.a.create("header"),ce=(ne({size:"md",color:"primary",style:{top:-10,right:-10,display:"inline-flex",justifyContent:"center",alignItems:"center"},children:r.a.createElement("small",null,"5")})(W.k),r.a.Component,["component","layout"]),oe=function(e){var a=e.component,t=e.layout,n=Object(_.a)(e,ce);return r.a.createElement(p.a,Object.assign({},n,{render:function(e){return r.a.createElement(t,null,r.a.createElement(a,e))}}))},se=(t(74),t(51),function(e){Object(b.a)(t,e);var a=Object(f.a)(t);function t(){var e;Object(h.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=a.call.apply(a,[this].concat(r))).handleContentClick=function(a){!t.isSidebarOpen()||"xs"!==e.props.breakpoint&&"sm"!==e.props.breakpoint&&"md"!==e.props.breakpoint||e.openSidebar("close")},e}return Object(g.a)(t,[{key:"componentWillReceiveProps",value:function(e){var a=e.breakpoint;a!==this.props.breakpoint&&this.checkBreakpoint(a)}},{key:"componentDidMount",value:function(){this.checkBreakpoint(this.props.breakpoint)}},{key:"checkBreakpoint",value:function(e){switch(e){case"xs":case"sm":case"md":return this.openSidebar("close");case"lg":case"xl":default:return this.openSidebar("open")}}},{key:"openSidebar",value:function(e){if("open"===e)return document.querySelector(".cr-sidebar").classList.add("cr-sidebar--open");document.querySelector(".cr-sidebar").classList.remove("cr-sidebar--open")}},{key:"render",value:function(){var e=this.props.children;return r.a.createElement("main",{className:"cr-app bg-light"},r.a.createElement(ve,null),r.a.createElement(G,{fluid:!0,onClick:this.handleContentClick},e))}}],[{key:"isSidebarOpen",value:function(){return document.querySelector(".cr-sidebar").classList.contains("cr-sidebar--open")}}]),t}(r.a.Component)),ie=t(22),le=t(109),me=t(101),ue=t(102),pe=t(34),de=t.n(pe),he={backgroundImage:'url("'.concat(de.a,'")'),backgroundSize:"cover",backgroundRepeat:"no-repeat"},ge=[{to:"/document-upload",name:"upload",exact:!1,Icon:W.f},{to:"/document-download",name:"download",exact:!1,Icon:W.e}],be=[{to:"/manage-verticals",name:"verticals",exact:!1,Icon:W.c},{to:"/manage-subverticals",name:"subverticals",exact:!1,Icon:W.a},{to:"/manage-vendors",name:"vendors",exact:!1,Icon:W.l},{to:"/manage-companies",name:"company",exact:!1,Icon:W.b},{to:"/manage-client",name:"clients",exact:!1,Icon:W.a},{to:"/manage-transaction",name:"transactions",exact:!1,Icon:W.b},{to:"/manage-aum",name:"aum",exact:!1,Icon:W.b},{to:"/manage-expense",name:"Expenses",exact:!1,Icon:W.b},{to:"/manage-insurancedetail",name:"Insurance Details",exact:!1,Icon:W.b},{to:"/manage-termdeposits",name:"Term Deposits",exact:!1,Icon:W.b}],fe=[{to:"/dashboard",name:"dashboard",exact:!0,Icon:W.g},{to:"/file-upload",name:"data upload",exact:!0,Icon:W.i}],Ee=R.a.create("sidebar"),ve=function(e){Object(b.a)(t,e);var a=Object(f.a)(t);function t(){var e;Object(h.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=a.call.apply(a,[this].concat(r))).state={isOpenDocuments:!1,isOpenCategories:!1},e.handleClick=function(a){return function(){e.setState((function(e){var t=e["isOpen".concat(a)];return Object(ie.a)({},"isOpen".concat(a),!t)}))}},e}return Object(g.a)(t,[{key:"render",value:function(){return r.a.createElement("aside",{className:Ee.b(),"data-image":de.a},r.a.createElement("div",{className:Ee.e("background"),style:he}),r.a.createElement("div",{className:Ee.e("content")},r.a.createElement(q.a,null,r.a.createElement(J,{className:"navbar-brand d-flex"},r.a.createElement("img",{src:k.a,width:"60",height:"60",className:"pr-2",alt:""}),r.a.createElement("span",{className:"text-white"}))),r.a.createElement(F.a,{vertical:!0},fe.map((function(e,a){var t=e.to,n=e.name,c=e.exact,o=e.Icon;return r.a.createElement(H.a,{key:a,className:Ee.e("nav-item")},r.a.createElement(me.a,{id:"navItem-".concat(n,"-").concat(a),className:"text-uppercase",tag:le.a,to:t,activeClassName:"active",exact:c},r.a.createElement(o,{className:Ee.e("nav-item-icon")}),r.a.createElement("span",{className:""},n)))})),r.a.createElement(H.a,{className:Ee.e("nav-item"),onClick:this.handleClick("Categories")},r.a.createElement(me.a,{className:Ee.e("nav-item-collapse")},r.a.createElement("div",{className:"d-flex"},r.a.createElement(W.h,{className:Ee.e("nav-item-icon")}),r.a.createElement("span",{className:" align-self-start"},"Categories")),r.a.createElement(W.j,{className:Ee.e("nav-item-icon"),style:{padding:0,transform:this.state.isOpenCategories?"rotate(0deg)":"rotate(-90deg)",transitionDuration:"0.3s",transitionProperty:"transform"}}))),r.a.createElement(ue.a,{isOpen:this.state.isOpenCategories},be.map((function(e,a){var t=e.to,n=e.name,c=e.exact,o=e.Icon;return r.a.createElement(H.a,{key:a,className:Ee.e("nav-item")},r.a.createElement(me.a,{id:"navItem-".concat(n,"-").concat(a),className:"text-uppercase",tag:le.a,to:t,activeClassName:"active",exact:c},r.a.createElement(o,{className:Ee.e("nav-item-icon")}),r.a.createElement("span",{className:""},n)))}))),r.a.createElement(H.a,{className:Ee.e("nav-item"),onClick:this.handleClick("Documents")},r.a.createElement(me.a,{className:Ee.e("nav-item-collapse")},r.a.createElement("div",{className:"d-flex"},r.a.createElement(W.h,{className:Ee.e("nav-item-icon")}),r.a.createElement("span",{className:" align-self-start"},"Documents")),r.a.createElement(W.j,{className:Ee.e("nav-item-icon"),style:{padding:0,transform:this.state.isOpenDocuments?"rotate(0deg)":"rotate(-90deg)",transitionDuration:"0.3s",transitionProperty:"transform"}}))),r.a.createElement(ue.a,{isOpen:this.state.isOpenDocuments},ge.map((function(e,a){var t=e.to,n=e.name,c=e.exact,o=e.Icon;return r.a.createElement(H.a,{key:a,className:Ee.e("nav-item")},r.a.createElement(me.a,{id:"navItem-".concat(n,"-").concat(a),className:"text-uppercase",tag:le.a,to:t,activeClassName:"active",exact:c},r.a.createElement(o,{className:Ee.e("nav-item-icon")}),r.a.createElement("span",{className:""},n)))}))))))}}]),t}(r.a.Component),ye=function(e){return r.a.createElement("div",{style:{alignSelf:"center",textAlign:"center"}},"Access Denied")},xe=t(103),Oe=function(e){var a=e.color,t=void 0===a?"primary":a;return r.a.createElement("div",{className:"cr-page-spinner"},r.a.createElement(xe.a,{color:t}))},Ne=t(104),ke=t(105),we=t(106),Ce=function(e){Object(b.a)(t,e);var a=Object(f.a)(t);function t(){var e;Object(h.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=a.call.apply(a,[this].concat(r))).handleAuthState=function(a){a===C?e.props.history.push("/login"):e.props.history.push("/signup")},e}return Object(g.a)(t,[{key:"render",value:function(){return r.a.createElement(Ne.a,{style:{height:"100vh",justifyContent:"center",alignItems:"center"}},r.a.createElement(ke.a,{md:6,lg:4},r.a.createElement(we.a,{body:!0},r.a.createElement(j,{authState:this.props.authState,onChangeAuthState:this.handleAuthState,history:this.props.history,admin:this.props.admin,setAdmin:this.props.setAdmin}))))}}]),t}(r.a.Component),Se=(t(87),t(88),r.a.lazy((function(){return Promise.all([t.e(0),t.e(18),t.e(21)]).then(t.bind(null,403))}))),je=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(16)]).then(t.bind(null,412))})),Pe=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(14)]).then(t.bind(null,413))})),Ie=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(15)]).then(t.bind(null,414))})),Ae=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(13)]).then(t.bind(null,415))})),Le=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(6)]).then(t.bind(null,404))})),ze=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(11)]).then(t.bind(null,405))})),De=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(7)]).then(t.bind(null,406))})),_e=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(8)]).then(t.bind(null,407))})),Te=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(9)]).then(t.bind(null,408))})),Re=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(10)]).then(t.bind(null,409))})),Ue=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(20)]).then(t.bind(null,399))})),Me=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(19)]).then(t.bind(null,400))})),Be=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(17)]).then(t.bind(null,410))})),Ge=l()((function(e){var a=e.width;return a<575?{breakpoint:"xs"}:a>576&&a<767?{breakpoint:"sm"}:a>768&&a<991?{breakpoint:"md"}:a>992&&a<1199?{breakpoint:"lg"}:a>1200?{breakpoint:"xl"}:{breakpoint:"xs"}}))((function(){var e=Object(n.useState)(!1),a=Object(s.a)(e,2),t=a[0],c=a[1];return r.a.createElement(m.a,{basename:"/".concat("/CoolMilanShah/wm-dashboard-widget-master".split("/").pop())},r.a.createElement(D,null,r.a.createElement(u.a,null,r.a.createElement(oe,{exact:!0,path:"/",layout:Y,component:function(e){return r.a.createElement(Ce,Object.assign({},e,{authState:C,setAdmin:c}))}}),r.a.createElement(oe,{exact:!0,path:"/admin",layout:Y,component:function(e){return r.a.createElement(Ce,Object.assign({},e,{authState:C,admin:!0,setAdmin:c}))}}),r.a.createElement(oe,{exact:!0,path:"/signup",layout:Y,component:function(e){return r.a.createElement(Ce,Object.assign({},e,{authState:S}))}}),r.a.createElement(se,null,r.a.createElement(r.a.Suspense,{fallback:r.a.createElement(Oe,null)},r.a.createElement(p.a,{exact:!0,path:"/dashboard",render:function(e){return"true"===t?r.a.createElement(Se,e):r.a.createElement(ye,e)}}),r.a.createElement(p.a,{exact:!0,path:"/manage-verticals",component:je}),r.a.createElement(p.a,{exact:!0,path:"/manage-subverticals",component:Pe}),r.a.createElement(p.a,{exact:!0,path:"/manage-vendors",component:Ie}),r.a.createElement(p.a,{exact:!0,path:"/manage-companies",component:Ae}),r.a.createElement(p.a,{exact:!0,path:"/manage-client",component:Le}),r.a.createElement(p.a,{exact:!0,path:"/manage-transaction",render:function(e){return"true"===t?r.a.createElement(ze,e):r.a.createElement(ye,e)}}),r.a.createElement(p.a,{exact:!0,path:"/manage-aum",render:function(e){return"true"===t?r.a.createElement(De,e):r.a.createElement(ye,e)}}),r.a.createElement(p.a,{exact:!0,path:"/manage-expense",render:function(e){return"true"===t?r.a.createElement(_e,e):r.a.createElement(ye,e)}}),r.a.createElement(p.a,{exact:!0,path:"/manage-insurancedetail",component:Te}),r.a.createElement(p.a,{exact:!0,path:"/manage-termdeposits",component:Re}),r.a.createElement(p.a,{exact:!0,path:"/file-upload",component:Ue}),r.a.createElement(p.a,{exact:!0,path:"/document-upload",component:Me}),r.a.createElement(p.a,{exact:!0,path:"/document-download",component:Be}))),r.a.createElement(d.a,{to:"/"}))))}));o.a.render(r.a.createElement(Ge,null),document.getElementById("root"))}},[[52,5,12]]]);
//# sourceMappingURL=main.18009ae2.chunk.js.map