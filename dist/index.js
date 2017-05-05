!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define("HatcherSonde",t):e.HatcherSonde=t()}(this,function(){"use strict";function e(e){return e<1e3?e+"&micro;s":e<1e6?(e/1e3).toFixed(2)+"ms":(e/1e6).toFixed(2)+"s"}function t(e,t,o,i){var s=document.createElement(e);if(t&&(s.innerHTML=t),o)for(var n=o.split(" "),r=0;r<n.length;r++)s.classList.add(n[r]);if(i)for(var a in i)s.setAttribute(a,i[a]);return s}function o(e,t){return t.start>e.start&&t.start<e.stop}function i(e){if(null===u){u=[];var t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(){var e=this;this.addEventListener("readystatechange",function(){if(e.readyState==XMLHttpRequest.DONE)for(var t=0;t<u.length;t++)u[t](e)},!1),t.apply(this,arguments)}}u.push(e)}function s(e,t){function o(o){var i=e.header.root.offsetHeight+t.offsetHeight,s=window.innerHeight-o.clientY-i;e.setHeight(s)}function i(){document.body.classList.remove("phpsonde-resizing"),document.removeEventListener("mouseup",i),document.removeEventListener("mousemove",o)}t.addEventListener("mousedown",function(e){e.preventDefault(),document.body.classList.add("phpsonde-resizing"),document.addEventListener("mousemove",o),document.addEventListener("mouseup",i)})}var n=function(e){var t=this;this.bar=e,this.root=document.createElement("header");var o=document.createElement("div");this.root.appendChild(o),o.innerHTML="logo",this.reportSelect=document.createElement("select");var i=document.createElement("div");i.classList.add("phpsonde-request-select"),i.appendChild(this.reportSelect),this.root.appendChild(i),this.reportSelect.addEventListener("change",function(){e.showReport(this.value)}),this.itemList=document.createElement("ul"),this.root.appendChild(this.itemList),o.addEventListener("click",function(){t.bar.toggle()}),e.on("reportAdded",function(o){var i=new Option(o.label,e.reports.length-1);t.reportSelect.options[t.reportSelect.options.length]=i}),e.on("showReport",function(o){t.showReport(e.reports[o])})};n.prototype.showReport=function(e){for(var t=this;this.itemList.lastChild;)t.itemList.removeChild(t.itemList.lastChild)},n.prototype.addPanelTab=function(e,o){var i=t("li",e,"phpsonde-panel-tab");this.itemList.appendChild(i);var s=this;1===this.itemList.children.length&&(i.classList.add("phpsonde-open"),o.classList.add("phpsonde-open")),i.addEventListener("click",function(){for(var e=s.bar.root.querySelectorAll(".phpsonde-panel-tab.phpsonde-open, .phpsonde-panel.phpsonde-open"),t=0;t<e.length;t++)e[t].classList.remove("phpsonde-open");i.classList.add("phpsonde-open"),o.classList.add("phpsonde-open"),s.bar.open()})};var r=function(e){if(!e||"string"!=typeof e)throw new Error("Event name should be a valid non-empty string!")},a=function(e){if("function"!=typeof e)throw new Error("Handler should be a function!")},d=function(e,t){if(e&&e.indexOf(t)<0)throw new Error('Event "'+t+'" is not allowed!')},p=Object.freeze({allowedEvents:Symbol("allowedEvents"),listeners:Symbol("listeners")}),l=function(e){if(void 0!==e&&!Array.isArray(e))throw new Error("Allowed events should be a valid array of strings!");this[p.listeners]=new Map,this[p.allowedEvents]=e};l.prototype.on=function(e,t){r(e),d(this[p.allowedEvents],e),a(t);var o=this[p.listeners].get(e);o||(o=new Set,this[p.listeners].set(e,o)),o.add(t)},l.prototype.once=function(e,t){var o=this;a(t);var i=function(s){o.off(e,i),t.call(o,s)};this.on(e,i)},l.prototype.off=function(e,t){r(e),d(this[p.allowedEvents],e),a(t);var o=this[p.listeners].get(e);o&&(o.delete(t),o.size||this[p.listeners].delete(e))},l.prototype.offAll=function(e){if(void 0===e)return void this[p.listeners].clear();r(e),d(this[p.allowedEvents],e);var t=this[p.listeners].get(e);t&&(t.clear(),this[p.listeners].delete(e))},l.prototype.emit=function(e,t){var o=this;r(e),d(this[p.allowedEvents],e);var i=this[p.listeners].get(e);i&&i.forEach(function(e){try{e.call(o,t)}catch(e){console.error(e)}})},l.prototype.hasListeners=function(e){return r(e),d(this[p.allowedEvents],e),this[p.listeners].has(e)},l.mixin=function(e,t){if(!e||"object"!=typeof e)throw new Error("Object to mix into should be valid object!");if(void 0!==t&&!Array.isArray(t))throw new Error("Allowed events should be a valid array of strings!");var o=new l(t);return["on","once","off","offAll","emit","hasListeners"].forEach(function(t){if(void 0!==e[t])throw new Error('Object to mix into already has "'+t+'" property defined!');"constructor"!==t&&(e[t]=o[t].bind(o))},o),e};var h=function(e){var o=this;this.bar=e,this.root=t("div",null,"phpsonde-panel phpsonde-timeline-panel"),this.header=t("header","Show "),this.root.appendChild(this.header),this.typeSelector=document.createElement("select"),this.header.appendChild(this.typeSelector),this.typeSelector.addEventListener("change",function(){o.filterType(this.value)}),this.itemList=document.createElement("ul"),this.root.appendChild(this.itemList),e.on("showReport",function(t){o.showReport(e.reports[t])})};h.prototype.showReport=function(i){for(var s=this;this.itemList.lastChild;)s.itemList.removeChild(s.itemList.lastChild);var n=i.data.duration;if(!n)throw"No valid duration for profile";this.bar.header.addPanelTab(e(n),this.root);for(var r={},a=[],d=0;d<i.data.profiles.length;d++)!function(d){var p=i.data.profiles[d],l=p.type.toLowerCase(),h=s.bar.profileTypes.hasOwnProperty(l)?l:"default",c=s.bar.profileTypes[h];r.hasOwnProperty(l)||(r[l]=c.label||l);var u=document.createElement("li");u.setAttribute("data-phpsonde-type",l);var f=document.createElement("div");u.appendChild(f),f.classList.add("phpsonde-summary");var v=t("div",null,"phpsonde-color-helper");f.appendChild(v),v.style.background=c.color;var m=c.label||p.type;if(c.synopsis&&"function"==typeof c.synopsis){var y=c.synopsis(p);y&&(m+=' <span class="phpsonde-synopsis">'+y+"</span>")}for(;a.length>0&&!o(a[a.length-1],p);)a.pop();if(a.length>0)for(var g=0;g<a.length;g++)m='<div class="phpsonde-indent"></div>'+m;a.push(p),f.appendChild(t("div",m,"phpsonde-label"));var L=document.createElement("div");L.classList.add("phpsonde-duration"),L.innerHTML=e(p.stop-p.start),f.appendChild(L);var w=document.createElement("div"),b=document.createElement("div");b.classList.add("phpsonde-timebar"),b.appendChild(w),f.appendChild(b);var E=100*p.start/n,C=100*(p.stop-p.start)/n;w.style["margin-left"]=E+"%",w.style.width=C>0?C+"%":"1px",c.color&&(w.style["background-color"]=c.color);var S=document.createElement("div");if(S.classList.add("phpsonde-details"),u.appendChild(S),p.data&&Object.keys(p.data).length>0){var H=t("div",null,"phpsonde-data-details");H.appendChild(t("h6","Details")),S.appendChild(H);var R=t("table");H.appendChild(R);for(var A in p.data){var T=t("tr");R.appendChild(T),T.appendChild(t("td",A)),T.appendChild(t("td",p.data[A]))}}var x=document.createElement("div");x.classList.add("phpsonde-stacktrace");var O=document.createElement("pre");O.innerHTML=p.trace,x.appendChild(t("h6","Stack Trace")),x.appendChild(O),S.appendChild(x),f.addEventListener("click",function(){S.classList.toggle("phpsonde-open")}),s.itemList.appendChild(u)}(d);for(;this.typeSelector.options.length;)s.typeSelector.options.remove(0);var p=new Option("All",-1);this.typeSelector.options[0]=p;for(var l in r){var h=new Option(r[l],l);s.typeSelector.options[s.typeSelector.options.length]=h}},h.prototype.filterType=function(e){var t=this;if(-1==e)for(var o=0;o<this.itemList.children.length;o++)t.itemList.children[o].classList.remove("phpsonde-hidden");else for(var i=0;i<this.itemList.children.length;i++){var s=t.itemList.children[i];s.getAttribute("data-phpsonde-type").toLocaleLowerCase()===e?t.itemList.children[i].classList.remove("phpsonde-hidden"):t.itemList.children[i].classList.add("phpsonde-hidden")}};var c=function(e){var o=this;this.bar=e,this.root=t("div","","phpsonde-panel phpsonde-messages-panel"),this.itemList=t("ul"),this.root.appendChild(this.itemList),e.on("showReport",function(t){o.showReport(e.reports[t])})};c.prototype.showReport=function(e){for(var o=this;this.itemList.lastChild;)o.itemList.removeChild(o.itemList.lastChild);var i=e.data.messages;if(i){var s=t("span",i.length,"phpsonde-bubble");this.bar.header.addPanelTab("messages "+s.outerHTML,this.root);for(var n=0;n<i.length;n++){var r=i[n],a=t("li","&rsaquo; "+r.text,"bar");o.itemList.appendChild(a)}}};var u=null,f=function(){if(this.root=document.createElement("div"),this.root.classList.add("phpsonde"),this.sizer=t("div",null,"phpsonde-sizer"),this.root.appendChild(this.sizer),this.header=new n(this),this.root.appendChild(this.header.root),this.body=document.createElement("div"),this.body.classList.add("phpsonde-body"),this.root.appendChild(this.body),this.timeline=new h(this),this.body.appendChild(this.timeline.root),this.messages=new c(this),this.body.appendChild(this.messages.root),document.body.appendChild(this.root),this.reports=[],this.profileTypes={default:{color:"#AAA"},database:{color:"#ECB400",synopsis:function(e){if(e.data)return e.data.statement}},view:{color:"#6DC520",synopsis:function(e){if(e.data)return e.data.name}},elasticsearch:{color:"#6db3c5",synopsis:function(e){if(e.data)return e.data.uri}}},s(this,this.sizer),localStorage){var e=localStorage.getItem("phpsonde_bodyheight");null!==e&&this.setHeight(e,!1);var o=localStorage.getItem("phpsonde_baropened");"true"!==o&&!0!==o||this.open()}var i=this;window.addEventListener("resize",function(){i.root.offsetHeight>window.innerHeight-50&&i.setHeight(window.innerHeight,!1)})};return f.prototype.setHeight=function(e,t){t=void 0===t||!0===t,e=parseInt(e,10)||300,e<0?e=10:e>window.innerHeight-50&&(e=window.innerHeight-50),this.body.style.height=e+"px",t&&localStorage&&localStorage.setItem("phpsonde_bodyheight",e)},f.prototype.open=function(){this.root.classList.add("phpsonde-open"),localStorage&&localStorage.setItem("phpsonde_baropened",!0)},f.prototype.close=function(){this.root.classList.remove("phpsonde-open"),localStorage&&localStorage.setItem("phpsonde_baropened",!1)},f.prototype.toggle=function(){this.root.classList.toggle("phpsonde-open"),localStorage&&localStorage.setItem("phpsonde_baropened",this.root.classList.contains("phpsonde-open"))},f.prototype.addProfileType=function(e,t){this.profileTypes[e.toLocaleLowerCase()]=t},f.prototype.addReport=function(e,t){var o={label:e,data:t};this.reports.push(o),this.emit("reportAdded",o),1===this.reports.length&&this.showReport(0)},f.prototype.showReport=function(e){this.emit("showReport",e)},f.prototype.listenForXhrReports=function(){var e=this;i(function(t){var o=t.getResponseHeader("phpsondereport");if(o){for(var i,s=1;i=t.getResponseHeader("phpsondereport-"+s);)o+=i,s++;try{o=atob(o),o=JSON.parse(o)}catch(e){console.error("Sonde was unable to decode data fro ajax request, please see the error below and report it on https://github.com/hatcher-project/sonde/issues with as much details as possible, including your browser version"),console.error(e)}if(o.reportBundle)for(var n=0;n<o.reportBundle.length;n++)e.addReport("xhr",o.reportBundle[n]);else e.addReport("XHR",o)}})},l.mixin(f.prototype),{Bar:f}});
//# sourceMappingURL=index.js.map
