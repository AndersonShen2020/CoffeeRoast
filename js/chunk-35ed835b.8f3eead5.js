(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-35ed835b"],{"0827":function(e,t,c){},"1cd7":function(e,t,c){"use strict";c("0827")},4630:function(e,t,c){},e6aa:function(e,t,c){"use strict";c.r(t);var a=c("7a23");function n(e,t,c,n,o,r){var l=Object(a["resolveComponent"])("Navbar"),s=Object(a["resolveComponent"])("RouterView"),i=Object(a["resolveComponent"])("FooterBar");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["createVNode"])(l),Object(a["createVNode"])(s),Object(a["createVNode"])(i,{class:"mt-5"})],64)}var o={class:"navbar navbar-expand-lg navbar-light bg-secondary bg-opacity-50"},r={class:"container"},l={class:"position-relative"},s={key:0,class:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"},i=Object(a["createElementVNode"])("i",{class:"bi bi-cart"},null,-1),d=Object(a["createElementVNode"])("span",{class:"logo"},"CoffeeRoast",-1),b=Object(a["createElementVNode"])("button",{class:"navbar-toggler order-md-2",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent"},[Object(a["createElementVNode"])("span",{class:"navbar-toggler-icon"})],-1),u={class:"collapse navbar-collapse justify-content-end order-lg-1",id:"navbarSupportedContent",ref:"collapse"},m={class:"navbar-nav"},f={class:"nav-item"},v={class:"nav-item"},p={class:"nav-item"};function j(e,t,c,n,j,O){var N=Object(a["resolveComponent"])("RouterLink");return Object(a["openBlock"])(),Object(a["createElementBlock"])("nav",o,[Object(a["createElementVNode"])("div",r,[Object(a["createVNode"])(N,{class:"nav-link text-primary order-lg-2 order-md-0 coffee-nav-icon",to:"/CheckOrder",onClick:e.closeNavHam},{default:Object(a["withCtx"])((function(){return[Object(a["createElementVNode"])("div",l,[0!==j.cartData.length?(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",s,Object(a["toDisplayString"])(j.cartData.length),1)):Object(a["createCommentVNode"])("",!0),i])]})),_:1},8,["onClick"]),Object(a["createVNode"])(N,{class:"navbar-brand order-lg-0 order-md-1",to:"/",onClick:e.closeNavHam},{default:Object(a["withCtx"])((function(){return[d]})),_:1},8,["onClick"]),b,Object(a["createElementVNode"])("div",u,[Object(a["createElementVNode"])("ul",m,[Object(a["createElementVNode"])("li",f,[Object(a["createVNode"])(N,{class:"nav-link text-primary coffee-nav-item",to:"/about",onClick:e.closeNavHam},{default:Object(a["withCtx"])((function(){return[Object(a["createTextVNode"])(" 關於本店 ")]})),_:1},8,["onClick"])]),Object(a["createElementVNode"])("li",v,[Object(a["createVNode"])(N,{class:"nav-link text-primary coffee-nav-item",to:"/KnowledgeView",onClick:e.closeNavHam},{default:Object(a["withCtx"])((function(){return[Object(a["createTextVNode"])(" 咖啡知識 ")]})),_:1},8,["onClick"])]),Object(a["createElementVNode"])("li",p,[Object(a["createVNode"])(N,{class:"nav-link text-primary coffee-nav-item",to:"/products",onClick:e.closeNavHam},{default:Object(a["withCtx"])((function(){return[Object(a["createTextVNode"])(" 產品列表 ")]})),_:1},8,["onClick"])])])],512)])])}var O=c("1da1"),N=(c("96cf"),c("99af"),c("fe9f")),g=c("bc3a"),h=c.n(g),V=c("810f"),C=c.n(V),k={methods:{closeNavHam:function(){this.collapse.hide()},toggleNavHam:function(){this.collapse.toggle()}},mounted:function(){this.collapse=new C.a(this.$refs.collapse,{toggle:!1})}},E="https://vue3-course-api.hexschool.io/v2",w="ashen",x={mixins:[k],data:function(){return{cartData:[]}},methods:{getCartNum:function(){var e=this;return Object(O["a"])(regeneratorRuntime.mark((function t(){var c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h.a.get("".concat(E,"/api/").concat(w,"/cart"));case 3:c=t.sent,e.cartData=c.data.data.carts,t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),e.$swal({icon:"error",timer:2e3,showConfirmButton:!1,text:t.t0.response.data.message});case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()}},mounted:function(){this.getCartNum();var e=this;N["a"].on("getCartNum",(function(){e.getCartNum()}))}},y=(c("1cd7"),c("d959")),B=c.n(y);const H=B()(x,[["render",j]]);var _=H,R={class:"bg-secondary bg-opacity-50 py-3 py-md-4 py-lg-4"},D={class:"container"},S={class:"d-flex justify-content-center"},F=Object(a["createElementVNode"])("i",{class:"bi bi-person-circle coffee-icon-size"},null,-1),L=Object(a["createElementVNode"])("a",{class:"coffee-nav-icon",href:"https://github.com/AndersonShen2020/Vue_Final"},[Object(a["createElementVNode"])("i",{class:"bi bi-github coffee-icon-size"})],-1),T=Object(a["createElementVNode"])("div",{class:"row text-center"},[Object(a["createElementVNode"])("p",{class:"mb-0"}," 本網站僅個人練習使用．不做任何商業用途 "),Object(a["createElementVNode"])("p",{class:"mb-0"}," Copyright © 2022 made by AndersonShen2020 ")],-1);function z(e,t){var c=Object(a["resolveComponent"])("RouterLink");return Object(a["openBlock"])(),Object(a["createElementBlock"])("footer",R,[Object(a["createElementVNode"])("div",D,[Object(a["createElementVNode"])("div",S,[Object(a["createVNode"])(c,{class:"me-3 coffee-nav-icon",to:"/Login"},{default:Object(a["withCtx"])((function(){return[F]})),_:1}),L]),T])])}c("ff3b");const A={},J=B()(A,[["render",z]]);var $=J,K={components:{Navbar:_,FooterBar:$}};const q=B()(K,[["render",n]]);t["default"]=q},ff3b:function(e,t,c){"use strict";c("4630")}}]);
//# sourceMappingURL=chunk-35ed835b.8f3eead5.js.map