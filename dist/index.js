!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define("HatcherSonde",t):e.HatcherSonde=t()}(this,function(){"use strict";function e(e){return e<1e3?e+"&micro;s":e<1e6?(e/1e3).toFixed(2)+"ms":(e/1e6).toFixed(2)+"s"}function t(e,t,o,i){var s=document.createElement(e);if(t&&(s.innerHTML=t),o)for(var n=o.split(" "),r=0;r<n.length;r++)s.classList.add(n[r]);if(i)for(var a in i)s.setAttribute(a,i[a]);return s}function o(e){if(null===c){c=[];var t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(){var e=this;this.addEventListener("readystatechange",function(){if(e.readyState==XMLHttpRequest.DONE)for(var t=0;t<c.length;t++)c[t](e)},!1),t.apply(this,arguments)}}c.push(e)}function i(e,t){function o(o){var i=e.header.root.offsetHeight+t.offsetHeight,s=window.innerHeight-o.clientY-i;e.setHeight(s)}function i(){document.body.classList.remove("phpsonde-resizing"),document.removeEventListener("mouseup",i),document.removeEventListener("mousemove",o)}t.addEventListener("mousedown",function(e){e.preventDefault(),document.body.classList.add("phpsonde-resizing"),document.addEventListener("mousemove",o),document.addEventListener("mouseup",i)})}var s=function(e){var t=this;this.bar=e,this.root=document.createElement("header");var o=document.createElement("div");this.root.appendChild(o),o.innerHTML="logo",this.reportSelect=document.createElement("select");var i=document.createElement("div");i.classList.add("phpsonde-request-select"),i.appendChild(this.reportSelect),this.root.appendChild(i),this.reportSelect.addEventListener("change",function(){e.showReport(this.value)}),this.itemList=document.createElement("ul"),this.root.appendChild(this.itemList),o.addEventListener("click",function(){t.bar.toggle()}),e.on("reportAdded",function(o){var i=new Option(o.label,e.reports.length-1);t.reportSelect.options[t.reportSelect.options.length]=i}),e.on("showReport",function(o){t.showReport(e.reports[o])})};s.prototype.showReport=function(e){for(var t=this;this.itemList.lastChild;)t.itemList.removeChild(t.itemList.lastChild)},s.prototype.addPanelTab=function(e,o){var i=t("li",e,"phpsonde-panel-tab");this.itemList.appendChild(i);var s=this;1===this.itemList.children.length&&(i.classList.add("phpsonde-open"),o.classList.add("phpsonde-open")),i.addEventListener("click",function(){for(var e=s.bar.root.querySelectorAll(".phpsonde-panel-tab.phpsonde-open, .phpsonde-panel.phpsonde-open"),t=0;t<e.length;t++)e[t].classList.remove("phpsonde-open");i.classList.add("phpsonde-open"),o.classList.add("phpsonde-open"),s.bar.open()})};var n=function(e){if(!e||"string"!=typeof e)throw new Error("Event name should be a valid non-empty string!")},r=function(e){if("function"!=typeof e)throw new Error("Handler should be a function!")},a=function(e,t){if(e&&e.indexOf(t)<0)throw new Error('Event "'+t+'" is not allowed!')},d=Object.freeze({allowedEvents:Symbol("allowedEvents"),listeners:Symbol("listeners")}),p=function(e){if(void 0!==e&&!Array.isArray(e))throw new Error("Allowed events should be a valid array of strings!");this[d.listeners]=new Map,this[d.allowedEvents]=e};p.prototype.on=function(e,t){n(e),a(this[d.allowedEvents],e),r(t);var o=this[d.listeners].get(e);o||(o=new Set,this[d.listeners].set(e,o)),o.add(t)},p.prototype.once=function(e,t){var o=this;r(t);var i=function(s){o.off(e,i),t.call(o,s)};this.on(e,i)},p.prototype.off=function(e,t){n(e),a(this[d.allowedEvents],e),r(t);var o=this[d.listeners].get(e);o&&(o.delete(t),o.size||this[d.listeners].delete(e))},p.prototype.offAll=function(e){if(void 0===e)return void this[d.listeners].clear();n(e),a(this[d.allowedEvents],e);var t=this[d.listeners].get(e);t&&(t.clear(),this[d.listeners].delete(e))},p.prototype.emit=function(e,t){var o=this;n(e),a(this[d.allowedEvents],e);var i=this[d.listeners].get(e);i&&i.forEach(function(e){try{e.call(o,t)}catch(e){console.error(e)}})},p.prototype.hasListeners=function(e){return n(e),a(this[d.allowedEvents],e),this[d.listeners].has(e)},p.mixin=function(e,t){if(!e||"object"!=typeof e)throw new Error("Object to mix into should be valid object!");if(void 0!==t&&!Array.isArray(t))throw new Error("Allowed events should be a valid array of strings!");var o=new p(t);return["on","once","off","offAll","emit","hasListeners"].forEach(function(t){if(void 0!==e[t])throw new Error('Object to mix into already has "'+t+'" property defined!');"constructor"!==t&&(e[t]=o[t].bind(o))},o),e};var l=function(e){var o=this;this.bar=e,this.root=t("div",null,"phpsonde-panel phpsonde-timeline-panel"),this.header=t("header","Show "),this.root.appendChild(this.header),this.typeSelector=document.createElement("select"),this.header.appendChild(this.typeSelector),this.typeSelector.addEventListener("change",function(){o.filterType(this.value)}),this.itemList=document.createElement("ul"),this.root.appendChild(this.itemList),e.on("showReport",function(t){o.showReport(e.reports[t])})};l.prototype.showReport=function(o){for(var i=this;this.itemList.lastChild;)i.itemList.removeChild(i.itemList.lastChild);var s=o.data.duration;if(!s)throw"No valid duration for profile";this.bar.header.addPanelTab(e(s),this.root);for(var n={},r=0;r<o.data.profiles.length;r++)!function(r){var a=o.data.profiles[r],d=a.type.toLowerCase(),p=i.bar.profileTypes.hasOwnProperty(d)?d:"default",l=i.bar.profileTypes[p];n.hasOwnProperty(d)||(n[d]=l.label||d);var h=document.createElement("li");h.setAttribute("data-phpsonde-type",d);var c=document.createElement("div");h.appendChild(c),c.classList.add("phpsonde-summary");var u=t("div",null,"phpsonde-color-helper");c.appendChild(u),u.style.background=l.color;var f=l.label||a.type;if(console.log(l.synopsis),l.synopsis&&"function"==typeof l.synopsis){var v=l.synopsis(a);v&&(f+=' <span class="phpsonde-synopsis">'+v+"</span>")}c.appendChild(t("div",f,"phpsonde-label"));var m=document.createElement("div");m.classList.add("phpsonde-duration"),m.innerHTML=e(a.stop-a.start),c.appendChild(m);var y=document.createElement("div"),g=document.createElement("div");g.classList.add("phpsonde-timebar"),g.appendChild(y),c.appendChild(g);var L=100*a.start/s,w=100*(a.stop-a.start)/s;y.style["margin-left"]=L+"%",y.style.width=w>0?w+"%":"1px",l.color&&(y.style["background-color"]=l.color);var b=document.createElement("div");if(b.classList.add("phpsonde-details"),h.appendChild(b),a.data&&Object.keys(a.data).length>0){var E=t("div",null,"phpsonde-data-details");E.appendChild(t("h6","Details")),b.appendChild(E);var C=t("table");E.appendChild(C);for(var S in a.data){var H=t("tr");C.appendChild(H),H.appendChild(t("td",S)),H.appendChild(t("td",a.data[S]))}}var R=document.createElement("div");R.classList.add("phpsonde-stacktrace");var A=document.createElement("pre");A.innerHTML=a.trace,R.appendChild(t("h6","Stack Trace")),R.appendChild(A),b.appendChild(R),c.addEventListener("click",function(){b.classList.toggle("phpsonde-open")}),i.itemList.appendChild(h)}(r);for(;this.typeSelector.options.length;)i.typeSelector.options.remove(0);var a=new Option("All",-1);this.typeSelector.options[0]=a;for(var d in n){var p=new Option(n[d],d);i.typeSelector.options[i.typeSelector.options.length]=p}},l.prototype.filterType=function(e){var t=this;if(-1==e)for(var o=0;o<this.itemList.children.length;o++)t.itemList.children[o].classList.remove("phpsonde-hidden");else for(var i=0;i<this.itemList.children.length;i++){var s=t.itemList.children[i];s.getAttribute("data-phpsonde-type").toLocaleLowerCase()===e?t.itemList.children[i].classList.remove("phpsonde-hidden"):t.itemList.children[i].classList.add("phpsonde-hidden")}};var h=function(e){var o=this;this.bar=e,this.root=t("div","","phpsonde-panel phpsonde-messages-panel"),this.itemList=t("ul"),this.root.appendChild(this.itemList),e.on("showReport",function(t){o.showReport(e.reports[t])})};h.prototype.showReport=function(e){for(var o=this;this.itemList.lastChild;)o.itemList.removeChild(o.itemList.lastChild);var i=e.data.messages;if(i){var s=t("span",i.length,"phpsonde-bubble");this.bar.header.addPanelTab("messages "+s.outerHTML,this.root);for(var n=0;n<i.length;n++){var r=i[n],a=t("li","&rsaquo; "+r.text,"bar");o.itemList.appendChild(a)}}};var c=null,u=function(){if(this.root=document.createElement("div"),this.root.classList.add("phpsonde"),this.sizer=t("div",null,"phpsonde-sizer"),this.root.appendChild(this.sizer),this.header=new s(this),this.root.appendChild(this.header.root),this.body=document.createElement("div"),this.body.classList.add("phpsonde-body"),this.root.appendChild(this.body),this.timeline=new l(this),this.body.appendChild(this.timeline.root),this.messages=new h(this),this.body.appendChild(this.messages.root),document.body.appendChild(this.root),this.reports=[],this.profileTypes={default:{color:"#AAA"},database:{color:"#ECB400"},view:{color:"#6DC520"}},i(this,this.sizer),localStorage){var e=localStorage.getItem("phpsonde_bodyheight");null!==e&&this.setHeight(e,!1);var o=localStorage.getItem("phpsonde_baropened");"true"!==o&&!0!==o||this.open()}var n=this;window.addEventListener("resize",function(){n.root.offsetHeight>window.innerHeight-50&&n.setHeight(window.innerHeight,!1)})};return u.prototype.setHeight=function(e,t){t=void 0===t||!0===t,e=parseInt(e,10)||300,e<0?e=10:e>window.innerHeight-50&&(e=window.innerHeight-50),this.body.style.height=e+"px",t&&localStorage&&localStorage.setItem("phpsonde_bodyheight",e)},u.prototype.open=function(){this.root.classList.add("phpsonde-open"),localStorage&&localStorage.setItem("phpsonde_baropened",!0)},u.prototype.close=function(){this.root.classList.remove("phpsonde-open"),localStorage&&localStorage.setItem("phpsonde_baropened",!1)},u.prototype.toggle=function(){this.root.classList.toggle("phpsonde-open"),localStorage&&localStorage.setItem("phpsonde_baropened",this.root.classList.contains("phpsonde-open"))},u.prototype.addProfileType=function(e,t){this.profileTypes[e.toLocaleLowerCase()]=t},u.prototype.addReport=function(e,t){var o={label:e,data:t};this.reports.push(o),this.emit("reportAdded",o),1===this.reports.length&&this.showReport(0)},u.prototype.showReport=function(e){this.emit("showReport",e)},u.prototype.listenForXhrReports=function(){var e=this;o(function(t){var o=t.getResponseHeader("phpsondereport");if(o){for(var i,s=1;i=t.getResponseHeader("phpsondereport-"+s);)o+=i,s++;try{o=atob(o),o=JSON.parse(o)}catch(e){console.error("Sonde was unable to decode data fro ajax request, please see the error below and report it on https://github.com/hatcher-project/sonde/issues with as much details as possible, including your browser version"),console.error(e)}if(o.reportBundle)for(var n=0;n<o.reportBundle.length;n++)e.addReport("xhr",o.reportBundle[n]);else e.addReport("XHR",o)}})},p.mixin(u.prototype),{Bar:u}});
//# sourceMappingURL=index.js.map
