(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[11,16],{365:function(e,t,a){"use strict";a.r(t),a.d(t,"initialState",(function(){return l})),a.d(t,"setFilter",(function(){return i})),a.d(t,"setData",(function(){return m})),a.d(t,"setPagination",(function(){return d})),a.d(t,"setSortTable",(function(){return f})),a.d(t,"setCurrentPage",(function(){return p})),a.d(t,"setPageSize",(function(){return b})),a.d(t,"setModal",(function(){return g})),a.d(t,"setListServer",(function(){return E})),a.d(t,"setRequestDetail",(function(){return h})),a.d(t,"getListRequests",(function(){return v})),a.d(t,"onCreateNewRequest",(function(){return y})),a.d(t,"getListServerOptions",(function(){return O})),a.d(t,"getListUserOptions",(function(){return j})),a.d(t,"approveRequest",(function(){return I})),a.d(t,"cancelRequest",(function(){return S})),a.d(t,"getRequestDetail",(function(){return q})),a.d(t,"onUpdateRequest",(function(){return w})),a.d(t,"exportRequestByServer",(function(){return D}));var n=a(96),r=a(62),c=a(371),s=a(351),l={blockIds:null,data:[],pageSize:10,totalPage:1,currentPage:1,sortOrder:"descend",sortBy:"",showModal:!1,lstServer:[],requestDetail:{},requestLogs:[],filterKeys:""},o=Object(n.b)({name:"requestManagement",initialState:l,reducers:{setFilter:function(e,t){e.blockIds=t.payload.blockIds},setData:function(e,t){e.data=t.payload.data},setPagination:function(e,t){e.currentPage=t.payload.currentPage,e.pageSize=t.payload.pageSize,e.totalPage=t.payload.totalPage},setSortTable:function(e,t){e.sortBy=t.payload.sortBy,e.sortOrder=t.payload.sortOrder,e.filterKeys=t.payload.filterKeys},setCurrentPage:function(e,t){e.currentPage=t.payload.currentPage},setPageSize:function(e,t){e.pageSize=t.payload.pageSize,e.currentPage=1},setModal:function(e,t){e.showModal=t.payload.showModal},setListServer:function(e,t){e.lstServer=t.payload.lstServer},setRequestDetail:function(e,t){e.requestDetail=t.payload.requestDetail,e.requestLogs=t.payload.requestLogs}}}),u=o.actions,i=u.setFilter,m=u.setData,d=u.setPagination,f=u.setSortTable,p=u.setCurrentPage,b=u.setPageSize,g=u.setModal,E=u.setListServer,h=u.setRequestDetail;t.default=o.reducer;var v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t){return new Promise((function(a,n){return Object(c.f)(e).then((function(n){t(d({currentPage:n.CurrentPage,pageSize:e.pageSize,totalPage:n.TotalPage})),t(m({data:n.data})),a()})).catch((function(e){n(e)}))}))}},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t){return console.log("hello"),new Promise((function(a,n){return t(Object(r.b)()),Object(c.c)(e).then((function(e){s.b.success("success"),t(g({showModal:!1})),t(v({pageSize:l.pageSize,pageNumber:l.currentPage,sortColumn:l.sortBy,sortOrder:l.sortOrder,keyword:""})),a(e)})).catch((function(e){s.b.error(e.response.data.message),n(e)})).finally((function(){t(Object(r.g)())}))}))}},O=function(){return function(e){return new Promise((function(t,a){return Object(c.i)().then((function(a){e(E({lstServer:a.data.data})),t(a)})).catch((function(e){a(e)}))}))}},j=function(){return new Promise((function(e,t){return Object(c.g)().then((function(t){e(t)})).catch((function(e){t(e)}))}))},I=function(e){return function(t){return new Promise((function(a,n){return t(Object(r.b)()),Object(c.a)(e).then((function(n){s.b.success("success"),t(q(e.requestId)),a()})).catch((function(e){s.b.error(e.response.data.message),n(e)})).finally((function(){t(Object(r.g)())}))}))}},S=function(e){return function(t){return new Promise((function(a,n){return t(Object(r.b)()),Object(c.b)(e).then((function(n){s.b.success("success"),t(q(e.requestId)),a()})).catch((function(e){s.b.error(e.response.data.message),n(e)})).finally((function(){t(Object(r.g)())}))}))}},q=function(e){return function(t){return new Promise((function(a,n){return Object(c.h)(e).then((function(e){e.data&&t(h({requestDetail:e.data.detail,requestLogs:e.data.logs})),a()})).catch((function(e){n(e)}))}))}},w=function(e,t){return function(a){return new Promise((function(n,l){return a(Object(r.b)()),Object(c.j)(e,t).then((function(e){a(q(t)),s.b.success("success"),n()})).catch((function(e){s.b.error(e.response.data.message),l(e)})).finally((function(){a(Object(r.g)())}))}))}},D=function(e){return function(t){return new Promise((function(t,a){return Object(c.d)(e).then((function(e){s.b.success("success"),t(e)})).catch((function(e){s.b.error("fail"),a(e)}))}))}}},371:function(e,t,a){"use strict";a.d(t,"f",(function(){return r})),a.d(t,"c",(function(){return c})),a.d(t,"i",(function(){return s})),a.d(t,"a",(function(){return l})),a.d(t,"b",(function(){return o})),a.d(t,"j",(function(){return u})),a.d(t,"h",(function(){return i})),a.d(t,"g",(function(){return m})),a.d(t,"d",(function(){return d})),a.d(t,"e",(function(){return f}));var n=a(39),r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(t,a){return n.a.get("/api/requests",{params:e}).then((function(e){t(e.data)})).catch((function(e){a(e)}))}))},c=function(e){return new Promise((function(t,a){return n.a.post("/api/requests",e).then((function(e){t(e)})).catch((function(e){a(e)}))}))},s=function(){return new Promise((function(e,t){return n.a.get("/api/servers/active").then((function(t){e(t)})).catch((function(e){t(e)}))}))},l=function(e){return new Promise((function(t,a){return n.a.put("/api/requests/approve-request",e).then((function(e){t(e)})).catch((function(e){a(e)}))}))},o=function(e){return new Promise((function(t,a){return n.a.put("/api/requests/cancel-request",e).then((function(e){t(e)})).catch((function(e){a(e)}))}))},u=function(e,t){return new Promise((function(a,r){return n.a.put("/api/requests/".concat(t),e).then((function(e){a(e)})).catch((function(e){r(e)}))}))},i=function(e){return new Promise((function(t,a){return n.a.get("/api/requests/".concat(e)).then((function(e){t(e)})).catch((function(e){a(e)}))}))},m=function(){return new Promise((function(e,t){return n.a.get("/api/users/listall").then((function(t){e(t)})).catch((function(e){t(e)}))}))},d=function(e){return new Promise((function(t,a){return n.a.post("/api/requests/export-request",e).then((function(e){t(e)})).catch((function(e){a(e)}))}))},f=function(e){return new Promise((function(t,a){return n.a.get("/api/messages/by-request/".concat(e)).then((function(e){t(e)})).catch((function(e){a(e)}))}))}},376:function(e,t){},392:function(e,t){},393:function(e,t){},500:function(e,t,a){},501:function(e,t,a){},539:function(e,t,a){},567:function(e,t){},570:function(e,t,a){},604:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(29),s=(a(500),a(117)),l=a(66),o=a(84),u=a(593),i=a(116),m=a(83),d=a(57),f=a(601),p=a(438),b=(a(501),a(58)),g=a(365),E=a(513),h=a.n(E),v=a(591),y=a(403),O=a(354),j=a(350),I=a(600),S=a(372),q=a.n(S),w=y.a.Option,D=function(e){var t=Object(b.b)(),a=O.a.useForm(),c=Object(o.a)(a,1)[0],s=Object(b.c)((function(e){return e.requestManagement})),u=s.showModal,f=s.lstServer,p=Object(n.useState)(""),E=Object(o.a)(p,2),h=E[0],v=E[1],S=Object(n.useState)(),D=Object(o.a)(S,2),C=D[0],P=D[1],x=Object(n.useState)(),R=Object(o.a)(x,2),N=R[0],M=R[1];Object(n.useEffect)((function(){c.resetFields()}),[u]),Object(n.useEffect)((function(){t(Object(g.getListServerOptions)())}),[]),Object(n.useEffect)((function(){e.request&&e.request.Title&&c.setFieldsValue({title:e.request.Title,startDate:q()(e.request.StartDate),endDate:q()(e.request.EndDate),server:e.request.ServerName+"-"+e.request.IpAddress,description:e.request.Description})}),[e.request]);var k=f.filter((function(e){return e.Server.includes(h)})).map((function(e,t){return r.a.createElement(w,{value:e.Server,key:e.Server},e.Server)})),T=e.disable&&"new"!==e.type;return r.a.createElement(r.a.Fragment,null,r.a.createElement(O.a,{form:c,name:"request-form",style:{paddingTop:"30px"},onFinish:function(a){var n=Object(l.a)(Object(l.a)({},a),{},{startDate:a.startDate.format("YYYY-MM-DD hh:mm:ss"),endDate:a.endDate.format("YYYY-MM-DD hh:mm:ss")});"update"===e.type?t(Object(g.onUpdateRequest)(n,e.request.Id)):t(Object(g.onCreateNewRequest)(n))},layout:"vertical"},r.a.createElement(m.a,{gutter:[16,16]},r.a.createElement(d.a,{span:24},r.a.createElement(O.a.Item,{name:"title",label:"Title",rules:[{required:!0,message:"Please input the title!"}]},r.a.createElement(j.a,{disabled:T,style:{fontWeight:"bold"}})))),r.a.createElement(m.a,{gutter:[16,16]},r.a.createElement(d.a,{span:12},r.a.createElement(O.a.Item,{label:"From Date",name:"startDate",rules:[{required:!0,message:"Please input start date!"}]},r.a.createElement(I.a,{showTime:!0,disabled:T,onChange:function(e){return M(e)},disabledDate:function(e){return!e||C&&!e.isBefore(q()(C).format("YYYY-MM-DD HH:mm:ss"))},style:{width:"100%",fontWeight:"bold"}}))),r.a.createElement(d.a,{span:12},r.a.createElement(O.a.Item,{label:"To Date",name:"endDate",rules:[{required:!0,message:"Please input end date!"}]},r.a.createElement(I.a,{showTime:!0,disabled:T,onChange:function(e){return P(e)},disabledDate:function(e){return!e||N&&!e.isAfter(q()(N).format("YYYY-MM-DD HH:mm:ss"))},style:{width:"100%",fontWeight:"bold"}})))),r.a.createElement(m.a,{gutter:[16,16]},r.a.createElement(d.a,{span:24},r.a.createElement(O.a.Item,{name:"server",label:"Server",rules:[{required:!0,message:"Please input the valid server info!"}]},r.a.createElement(y.a,{showSearch:!0,onSearch:function(e){v(e)},disabled:T,style:{fontWeight:"bold"}},k)))),r.a.createElement(m.a,{gutter:[16,16]},r.a.createElement(d.a,{span:24},r.a.createElement(O.a.Item,{name:"description",label:"Description",rules:[{required:!0,message:"Please input some description!"}]},r.a.createElement(j.a.TextArea,{autoSize:{minRows:3,maxRows:5},disabled:T,style:{fontWeight:"bold"}})))),r.a.createElement(m.a,{gutter:[16,16],justify:"center"},r.a.createElement(O.a.Item,null,r.a.createElement(i.a,{type:"primary",htmlType:"submit",disabled:T},"Submit")))))},C=function(e){var t=Object(b.b)(),a=Object(b.c)((function(e){return e.requestManagement})).showModal;function n(e){t(Object(g.setModal)({showModal:e}))}return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,{type:"primary",onClick:function(){return n(!0)},style:{width:"300px"}},"Create new request"),r.a.createElement(v.a,{visible:a,footer:null,onCancel:function(){return n(!1)}},r.a.createElement(m.a,{justify:"center"},r.a.createElement("h2",null,"Create new request")),r.a.createElement(D,null)))},P=a(51),x=a(391),R=a(373),N=y.a.Option,M=function(e){var t=Object(b.b)(),a=Object(n.useState)(!1),c=Object(o.a)(a,2),s=c[0],u=c[1],f=Object(n.useState)(""),p=Object(o.a)(f,2),E=p[0],h=p[1],v=Object(n.useState)(""),j=Object(o.a)(v,2),S=j[0],q=j[1],w=Object(n.useState)(""),D=Object(o.a)(w,2),C=D[0],P=D[1],M=Object(n.useState)([]),k=Object(o.a)(M,2),T=k[0],F=k[1],Y=Object(b.c)((function(e){return e.requestManagement})).lstServer,A=O.a.useForm(),U=Object(o.a)(A,1)[0];Object(n.useEffect)((function(){Y.length<=0&&t(Object(g.getListServerOptions)()),Object(g.getListUserOptions)().then((function(e){F(e.data)}))}),[]);var z=T.filter((function(e,t){return e.Email.includes(S)})).map((function(e,t){return r.a.createElement(N,{value:e.Id,key:e.Id},e.Email)})),B=T.filter((function(e,t){return["admin","dc-member"].includes(e.RoleName)&&e.Email.includes(E)})).map((function(e,t){return r.a.createElement(N,{value:e.Id,key:e.Id},e.Email)})),L=Y.filter((function(e){return e.Server.includes(C)})).map((function(e,t){return r.a.createElement(N,{value:e.Server,key:e.Server},e.Server)}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,{onClick:function(){return u(!s)},style:{width:"300px"}},"Export requests by server"),s&&r.a.createElement(O.a,{form:U,onFinish:function(e){var a,n;e.fromDate&&(a=e.fromDate.format("YYYY-MM-DD hh:mm:ss")),e.toDate&&(n=e.toDate.format("YYYY-MM-DD hh:mm:ss")),t(Object(g.exportRequestByServer)(Object(l.a)(Object(l.a)({},e),{},{fromDate:a,toDate:n}))).then((function(e){!function(e,t){var a={Sheets:{data:R.utils.json_to_sheet(e)},SheetNames:["data"]},n=R.write(a,{bookType:"xlsx",type:"array"}),r=new Blob([n],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});x.saveAs(r,t+".xlsx")}(e.data,"RequestFile"),U.resetFields()}))},style:{marginTop:"20px"},layout:"vertical"},r.a.createElement(m.a,{gutter:[16,16]},r.a.createElement(d.a,{span:6},r.a.createElement(O.a.Item,{label:"From Date",name:"fromDate"},r.a.createElement(I.a,{style:{width:"100%"}}))),r.a.createElement(d.a,{span:6},r.a.createElement(O.a.Item,{label:"To Date",name:"toDate"},r.a.createElement(I.a,{style:{width:"100%"}}))),r.a.createElement(d.a,{span:6},r.a.createElement(O.a.Item,{label:"Requester",name:"createdBy"},r.a.createElement(y.a,{showSearch:!0,onSearch:function(e){q(e)},mode:"multiple",allowClear:!0},z))),r.a.createElement(d.a,{span:6},r.a.createElement(O.a.Item,{label:"Approver",name:"approvedBy"},r.a.createElement(y.a,{showSearch:!0,onSearch:function(e){h(e)},mode:"multiple",allowClear:!0},B))),r.a.createElement(d.a,{span:12},r.a.createElement(O.a.Item,{label:"Server",name:"server"},r.a.createElement(y.a,{showSearch:!0,onSearch:function(e){P(e)},mode:"multiple",allowClear:!0},L)))),r.a.createElement(m.a,{gutter:[16,16]},r.a.createElement(O.a.Item,null,r.a.createElement(i.a,{htmlType:"submit",type:"primary"},"Export")))))},k=a(73),T=[{title:"Number",width:"5%",dataIndex:"Number",key:"number",fixed:"left"},{title:"Status",width:"5%",dataIndex:"Status",key:"status",filterMultiple:!1,filters:[{text:"pending",value:"pending"},{text:"approved",value:"approved"},{text:"closed",value:"closed"}],render:function(e){return e.IsApproved||e.IsClosed?e.IsClosed?r.a.createElement(u.a,null,"Closed"):r.a.createElement(u.a,{color:"green"},"Approved"):r.a.createElement(u.a,{color:"blue"},"Pending")}},{title:"Created Date",width:"12%",dataIndex:"CreatedDate",key:"created-date",sorter:!0},{title:"Updated Date",dataIndex:"UpdatedDate",key:"updated-date",width:"12%",sorter:!0},{title:"Server",dataIndex:"Server",key:"server",width:"10%",sorter:!0},{title:"Title",dataIndex:"Title",key:"title",width:"30%",render:function(e){return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("strong",null,"Title: "),e.Title),r.a.createElement("div",null,r.a.createElement("strong",null,"Description: "),e.Description))}},{title:"Request From",dataIndex:"StartDate",key:"request-from",width:"10%",sorter:!0},{title:"Request To",dataIndex:"EndDate",key:"request-to",width:"10%",sorter:!0},{title:"Action",key:"operation",dataIndex:"link",width:"6%",render:function(e){return r.a.createElement(P.b,{to:e},r.a.createElement(i.a,null,"Detail"))}}],F=function(e){var t=Object(b.b)(),a=Object(b.c)((function(e){return e.requestManagement})),c=a.data,s=a.currentPage,u=a.totalPage,i=a.pageSize,E=a.sortBy,v=a.sortOrder,y=a.filterKeys,O=(Object(b.c)((function(e){return e.app})).loading,Object(n.useState)("")),j=Object(o.a)(O,2),I=j[0],S=j[1];Object(n.useEffect)((function(){!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{pageNumber:s,pageSize:i,sortColumn:E,sortOrder:v,keyword:I,filterKeys:y};console.log(e),t(Object(g.getListRequests)(Object(l.a)({},e)))}()}),[s,i,E,v,I,y]),console.log(E);var q=c.map((function(e,t){var a={Title:e.Title,Description:e.Description},n={IsApproved:e.IsApproved,IsClosed:e.IsClosed};return Object(l.a)(Object(l.a)({},e),{},{Status:n,Title:a,key:e.Id,link:"/request-management/".concat(e.Id)})}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,null,r.a.createElement(d.a,{span:8},r.a.createElement(C,null)),r.a.createElement(d.a,{span:8,offset:8},r.a.createElement(h.a,{placeholder:"input search text",enterButton:!0,onSearch:function(e){S(e.trim())}}))),r.a.createElement(m.a,{style:{marginTop:"10px",marginBottom:"10px"}},r.a.createElement(d.a,{span:8}),r.a.createElement(d.a,{span:8,offset:8},r.a.createElement(k.b,{I:"export",a:"request"},r.a.createElement(M,null)))),r.a.createElement(f.a,{bordered:!0,columns:T,dataSource:q,onChange:function(e,a,n){console.log(a),console.log(n),t(Object(g.setSortTable)({sortBy:n.field?n.field:E,sortOrder:n.order?n.order:v,filterKeys:a.status?a.status.join(","):""}))},pagination:!1,scroll:{x:1500}}),r.a.createElement(m.a,{gutter:[16,16],justify:"center"},r.a.createElement(d.a,null,r.a.createElement("p",null,"Total: ",c.length>0?c[0].Total:0," items")),r.a.createElement(d.a,{span:10},r.a.createElement(p.a,{total:u*i,current:s,pageSize:i,onChange:function(e,a){t(Object(g.setCurrentPage)({currentPage:e}))},showSizeChanger:!0,onShowSizeChange:function(e,a){t(Object(g.setPageSize)({pageSize:a}))}}))))},Y=a(353),A=function(e){var t=Object(b.b)(),a=O.a.useForm(),n=Object(o.a)(a,1)[0];function c(){t(Object(g.cancelRequest)({requestId:e.requestId})).then((function(){n.resetFields()}))}return r.a.createElement(r.a.Fragment,null,r.a.createElement(O.a,{form:n},r.a.createElement(O.a.Item,{name:"Description",rules:[{required:!0,message:"Please input some description!"}]},r.a.createElement(j.a.TextArea,{autoSize:{minRows:3,maxRows:5},placeholder:"Type the description...",disabled:e.IsClosed})),r.a.createElement(m.a,null,e.IsApproved||e.IsClosed?e.IsClosed?r.a.createElement(d.a,{span:4},r.a.createElement(O.a.Item,null,r.a.createElement(i.a,{type:"ghost",disabled:!0},"Closed"))):r.a.createElement(d.a,{span:4},r.a.createElement(O.a.Item,null,r.a.createElement(i.a,{type:"danger",onClick:c},"Cancel Request"))):r.a.createElement(r.a.Fragment,null,r.a.createElement(d.a,{span:4},r.a.createElement(O.a.Item,null,r.a.createElement(i.a,{type:"primary",onClick:function(){t(Object(g.approveRequest)({requestId:e.requestId})).then((function(){n.resetFields()}))}},"Approve Request"))),r.a.createElement(d.a,{span:4,offset:1},r.a.createElement(O.a.Item,null,r.a.createElement(i.a,{type:"danger",onClick:c},"Cancel Request")))))))},U=(a(539),function(e){var t=e.logs.map((function(e,t){return r.a.createElement("div",{className:"row",key:e.Id},r.a.createElement("div",{className:"col-xs-12 col-sm-6 col-sm-offset-3"},r.a.createElement("div",{className:"new-message-box"},r.a.createElement("div",{className:"new-message-box-alert"},r.a.createElement("div",{className:"info-tab tip-icon-alert",title:"error"},r.a.createElement("i",null)),r.a.createElement("div",{className:"tip-box-alert"},r.a.createElement("div",{className:"status-header"},r.a.createElement("p",null,e.UserName," "),r.a.createElement("p",null," ",e.UpdateTime)),r.a.createElement("p",null,e.StatusChange))))))}));return r.a.createElement(Y.a,{title:"Change logs",bordered:!0,headStyle:{backgroundColor:"#99ccff",color:"white"},bodyStyle:{height:"450px",overflowY:"auto",backgroundColor:"#E7EBF0",border:"1px solid #99ccff"}},t)}),z=a(404),B=a(540),L=a.n(B)()("http://localhost:5000",{query:{token:localStorage.getItem("token")}}),K=a(371),W=(a(570),a(436)),H=a(437);var J=r.a.memo((function(e){var t=Object(n.useRef)(null),a=Object(b.c)((function(e){return e.app})).userId,c=e.msg,s=Object(n.useState)(null),l=Object(o.a)(s,2);l[0],l[1];Object(n.useEffect)((function(){e.focus&&t.current.focus()}),[e.focus]);var u=null;return c.ReplyMsg&&c.ReplyMsg.Id&&c.ReplyMsg.User&&c.ReplyMsg.User.Id&&(u=r.a.createElement("div",{className:"flr"},r.a.createElement("span",{className:"timestamp"},r.a.createElement("span",null,"Reply to: "),r.a.createElement("span",{className:"username"},c.ReplyMsg.User.FirstName),"\u2022",r.a.createElement("span",{className:"posttime"},c.ReplyMsg.CreatedDate)),r.a.createElement("div",{className:"messages"},r.a.createElement("p",{className:c.User.Id===a?"msg-right":"msg"},c.ReplyMsg.Content)))),r.a.createElement("div",{ref:t},r.a.createElement("article",{className:"msg-container ".concat(c.User.Id===a?"msg-self":"msg-remote")},u,r.a.createElement("div",{className:"msg-box"},r.a.createElement("img",{className:"user-img",src:"".concat("http://localhost:5000","/api/users/thumbnails/").concat(c.Avatar)}),r.a.createElement("div",{className:"flr"},r.a.createElement("span",{className:"timestamp"},r.a.createElement("span",{className:"username"},c.User.FirstName),"\u2022",r.a.createElement("span",{className:"posttime"},c.CreatedDate)),r.a.createElement("div",{className:"messages"},r.a.createElement("p",{className:"msg"},c.Content)))),r.a.createElement("button",{className:"reply-btn",onClick:function(){c.ReplyMsg&&c.ReplyMsg.Id?e.setReplyToMsg(c.ReplyMsg):e.setReplyToMsg({Id:c.Id,CreatedDate:c.CreatedDate,User:{FirstName:c.User.FirstName,Id:c.User.Id},Content:c.Content,Avatar:c.Avatar})}},r.a.createElement(W.a,{icon:H.a}))))}),(function(e,t){return e.msg.Id===t.msg.Id&&e.msg.ReplyId===t.msg.ReplyId&&e.focus===t.focus})),_=function(e){var t=O.a.useForm(),a=Object(o.a)(t,1)[0],c=Object(n.useState)([]),s=Object(o.a)(c,2),u=s[0],f=s[1],p=Object(n.useState)(null),g=Object(o.a)(p,2),E=g[0],h=g[1],v=Object(b.c)((function(e){return e.app})),y=v.token,I=(v.userId,v.avatar);Object(n.useEffect)((function(){var t;t=e.request.Id,Object(K.e)(t).then((function(e){f(e.data.reverse())})).catch((function(e){console.log(e)}))}),[e.request.Id]),Object(n.useEffect)((function(){return L.emit("joinRoom",{requestId:e.request.Id,headers:{Authorization:y}}),function(){L.emit("leaveRoom",{requestId:e.request.Id,headers:{Authorization:y}})}}),[e.request.Id]),L.once(e.request.Id,(function(e){!function(e){f([e].concat(Object(z.a)(u)))}(e),a.resetFields()}));var S=u.map((function(e,t){return r.a.createElement(J,{msg:e,key:e.Id,setReplyToMsg:h,focus:t===u.length-1})}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(Y.a,{title:"Conversation",bordered:!0,headStyle:{backgroundColor:"#339966",color:"white"},bodyStyle:{height:"500px",border:"1px solid #339966",overflowY:"auto",display:"flex",flexDirection:"column-reverse"}},S),E&&r.a.createElement("article",{className:"msg-container msg-remote"},r.a.createElement("div",{className:"msg-box"},r.a.createElement("img",{className:"user-img",src:"".concat("http://localhost:5000","/api/users/thumbnails/").concat(E.Avatar)}),r.a.createElement("div",{className:"flr"},r.a.createElement("span",{className:"timestamp"},r.a.createElement("span",{className:"username"},E.User.FirstName),"\u2022",r.a.createElement("span",{className:"posttime"},E.CreatedDate)),r.a.createElement("div",{className:"messages"},r.a.createElement("p",{className:"msg"},E.Content)))),r.a.createElement("button",{className:"reply-btn",onClick:function(){return h(null)}},r.a.createElement(W.a,{icon:H.b}))),r.a.createElement(O.a,{form:a,onFinish:function(t){L.emit("msgToServer",Object(l.a)(Object(l.a)({},t),{},{requestId:e.request.Id,ReplyId:E?E.Id:null,ReplyMsg:E,avatar:I,headers:{Authorization:y}}))}},r.a.createElement(m.a,null,r.a.createElement(d.a,{span:22},r.a.createElement(O.a.Item,{name:"message"},r.a.createElement(j.a,{autoFocus:!0}))),r.a.createElement(d.a,{span:2},r.a.createElement(O.a.Item,null,r.a.createElement(i.a,{htmlType:"submit",type:"primary"},"Send"))))))};var V=function(e){var t=Object(b.b)(),a=e.match.params.requestId,c=Object(b.c)((function(e){return e.requestManagement})),s=c.requestDetail,l=c.requestLogs,o=Object(b.c)((function(e){return e.app})).userId;return Object(n.useEffect)((function(){var e;e=a,t(Object(g.getRequestDetail)(e))}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Request #",s.Number),r.a.createElement(m.a,{gutter:[16,16]},r.a.createElement(d.a,{span:12},r.a.createElement(k.b,{I:"approve-cancel",a:"request"},r.a.createElement(Y.a,{title:"Response",bordered:!0,headStyle:{backgroundColor:"#0066ff",color:"white"},bodyStyle:{border:"1px solid #0066ff"}},r.a.createElement(A,{requestId:a,IsApproved:s.IsApproved,IsClosed:s.IsClosed}))),r.a.createElement(Y.a,{title:"Update Detail",bordered:!0,headStyle:{backgroundColor:"#0066ff",color:"white"},bodyStyle:{border:"1px solid #0066ff"}},r.a.createElement(m.a,null,r.a.createElement("p",null,r.a.createElement("strong",null,"Status: "),s.IsApproved||s.IsClosed?s.IsClosed?"Closed":"Approved":"Pending")),r.a.createElement(m.a,null,r.a.createElement("p",null,r.a.createElement("strong",null,"Created Date: "),new Date(s.CreatedDate).toString())),r.a.createElement(m.a,null,r.a.createElement("p",null,r.a.createElement("strong",null,"Created By: "),s.CreatedBy)),r.a.createElement(m.a,null,r.a.createElement("p",null,r.a.createElement("strong",null,"Updated Date: "),s.UpdatedDate?new Date(s.UpdatedDate).toString():"")),r.a.createElement(m.a,null,r.a.createElement("p",null,r.a.createElement("strong",null,"Update By: "),s.UpdatedBy)),r.a.createElement(D,{request:s,type:"update",disable:s.OwnerId!==o||s.IsApproved||s.IsClosed}))),r.a.createElement(d.a,{span:12},r.a.createElement(_,{request:s}),r.a.createElement(U,{logs:l}))))};t.default=function(){var e=Object(c.i)();return r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",null,"Loading ...")},r.a.createElement(c.d,null,r.a.createElement(c.b,{exact:!0,path:e.url,component:F}),r.a.createElement(c.b,{exact:!0,path:"".concat(e.url,"/:requestId"),component:V}),r.a.createElement(c.b,{component:s.a})))}}}]);
//# sourceMappingURL=11.bc03e140.chunk.js.map