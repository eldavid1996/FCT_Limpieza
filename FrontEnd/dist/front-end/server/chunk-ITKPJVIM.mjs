import './polyfills.server.mjs';
import"./chunk-VVCT4QZE.mjs";function x(r){"@babel/helpers - typeof";return x=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},x(r)}function Pe(r,n){return Pe=Object.setPrototypeOf||function(u,c){return u.__proto__=c,u},Pe(r,n)}function Wt(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function ue(r,n,o){return Wt()?ue=Reflect.construct:ue=function(c,S,g){var D=[null];D.push.apply(D,S);var k=Function.bind.apply(c,D),X=new k;return g&&Pe(X,g.prototype),X},ue.apply(null,arguments)}function N(r){return Bt(r)||$t(r)||jt(r)||Xt()}function Bt(r){if(Array.isArray(r))return Fe(r)}function $t(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function jt(r,n){if(r){if(typeof r=="string")return Fe(r,n);var o=Object.prototype.toString.call(r).slice(8,-1);if(o==="Object"&&r.constructor&&(o=r.constructor.name),o==="Map"||o==="Set")return Array.from(r);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return Fe(r,n)}}function Fe(r,n){(n==null||n>r.length)&&(n=r.length);for(var o=0,u=new Array(n);o<n;o++)u[o]=r[o];return u}function Xt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Yt=Object.hasOwnProperty,ft=Object.setPrototypeOf,Vt=Object.isFrozen,qt=Object.getPrototypeOf,Kt=Object.getOwnPropertyDescriptor,h=Object.freeze,O=Object.seal,Zt=Object.create,ht=typeof Reflect<"u"&&Reflect,ce=ht.apply,Ue=ht.construct;ce||(ce=function(n,o,u){return n.apply(o,u)});h||(h=function(n){return n});O||(O=function(n){return n});Ue||(Ue=function(n,o){return ue(n,N(o))});var Jt=R(Array.prototype.forEach),ct=R(Array.prototype.pop),Z=R(Array.prototype.push),fe=R(String.prototype.toLowerCase),De=R(String.prototype.toString),pt=R(String.prototype.match),M=R(String.prototype.replace),Qt=R(String.prototype.indexOf),er=R(String.prototype.trim),T=R(RegExp.prototype.test),Ce=tr(TypeError);function mt(r){return typeof r=="number"&&isNaN(r)}function R(r){return function(n){for(var o=arguments.length,u=new Array(o>1?o-1:0),c=1;c<o;c++)u[c-1]=arguments[c];return ce(r,n,u)}}function tr(r){return function(){for(var n=arguments.length,o=new Array(n),u=0;u<n;u++)o[u]=arguments[u];return Ue(r,o)}}function s(r,n,o){var u;o=(u=o)!==null&&u!==void 0?u:fe,ft&&ft(r,null);for(var c=n.length;c--;){var S=n[c];if(typeof S=="string"){var g=o(S);g!==S&&(Vt(n)||(n[c]=g),S=g)}r[S]=!0}return r}function H(r){var n=Zt(null),o;for(o in r)ce(Yt,r,[o])===!0&&(n[o]=r[o]);return n}function le(r,n){for(;r!==null;){var o=Kt(r,n);if(o){if(o.get)return R(o.get);if(typeof o.value=="function")return R(o.value)}r=qt(r)}function u(c){return console.warn("fallback value for",c),null}return u}var _t=h(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),we=h(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ie=h(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),rr=h(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),xe=h(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),ar=h(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),dt=h(["#text"]),Tt=h(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),ke=h(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vt=h(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),se=h(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),nr=O(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ir=O(/<%[\w\W]*|[\w\W]*%>/gm),or=O(/\${[\w\W]*}/gm),lr=O(/^data-[\-\w.\u00B7-\uFFFF]/),sr=O(/^aria-[\-\w]+$/),ur=O(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),fr=O(/^(?:\w+script|data):/i),cr=O(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),pr=O(/^html$/i),mr=O(/^[a-z][.\w]*(-[.\w]+)+$/i),_r=function(){return typeof window>"u"?null:window},dr=function(n,o){if(x(n)!=="object"||typeof n.createPolicy!="function")return null;var u=null,c="data-tt-policy-suffix";o.currentScript&&o.currentScript.hasAttribute(c)&&(u=o.currentScript.getAttribute(c));var S="dompurify"+(u?"#"+u:"");try{return n.createPolicy(S,{createHTML:function(D){return D},createScriptURL:function(D){return D}})}catch{return console.warn("TrustedTypes policy "+S+" could not be created."),null}};function Et(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:_r(),n=function(e){return Et(e)};if(n.version="2.5.4",n.removed=[],!r||!r.document||r.document.nodeType!==9)return n.isSupported=!1,n;var o=r.document,u=r.document,c=r.DocumentFragment,S=r.HTMLTemplateElement,g=r.Node,D=r.Element,k=r.NodeFilter,X=r.NamedNodeMap,At=X===void 0?r.NamedNodeMap||r.MozNamedAttrMap:X,yt=r.HTMLFormElement,gt=r.DOMParser,J=r.trustedTypes,Q=D.prototype,St=le(Q,"cloneNode"),bt=le(Q,"nextSibling"),Ot=le(Q,"childNodes"),Y=le(Q,"parentNode");if(typeof S=="function"){var pe=u.createElement("template");pe.content&&pe.content.ownerDocument&&(u=pe.content.ownerDocument)}var L=dr(J,o),me=L?L.createHTML(""):"",ee=u,_e=ee.implementation,Rt=ee.createNodeIterator,Lt=ee.createDocumentFragment,Mt=ee.getElementsByTagName,Nt=o.importNode,He={};try{He=H(u).documentMode?u.documentMode:{}}catch{}var C={};n.isSupported=typeof Y=="function"&&_e&&_e.createHTMLDocument!==void 0&&He!==9;var de=nr,Te=ir,ve=or,Dt=lr,Ct=sr,wt=fr,ze=cr,It=mr,he=ur,p=null,Ge=s({},[].concat(N(_t),N(we),N(Ie),N(xe),N(dt))),m=null,We=s({},[].concat(N(Tt),N(ke),N(vt),N(se))),f=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),V=null,Ee=null,Be=!0,Ae=!0,$e=!1,je=!0,z=!1,ye=!0,P=!1,ge=!1,Se=!1,G=!1,te=!1,re=!1,Xe=!0,Ye=!1,xt="user-content-",be=!0,q=!1,W={},B=null,Ve=s({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),qe=null,Ke=s({},["audio","video","img","source","image","track"]),Oe=null,Ze=s({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ae="http://www.w3.org/1998/Math/MathML",ne="http://www.w3.org/2000/svg",w="http://www.w3.org/1999/xhtml",$=w,Re=!1,Le=null,kt=s({},[ae,ne,w],De),F,Pt=["application/xhtml+xml","text/html"],Ft="text/html",_,j=null,Je=255,Ut=u.createElement("form"),Qe=function(e){return e instanceof RegExp||e instanceof Function},Me=function(e){j&&j===e||((!e||x(e)!=="object")&&(e={}),e=H(e),F=Pt.indexOf(e.PARSER_MEDIA_TYPE)===-1?F=Ft:F=e.PARSER_MEDIA_TYPE,_=F==="application/xhtml+xml"?De:fe,p="ALLOWED_TAGS"in e?s({},e.ALLOWED_TAGS,_):Ge,m="ALLOWED_ATTR"in e?s({},e.ALLOWED_ATTR,_):We,Le="ALLOWED_NAMESPACES"in e?s({},e.ALLOWED_NAMESPACES,De):kt,Oe="ADD_URI_SAFE_ATTR"in e?s(H(Ze),e.ADD_URI_SAFE_ATTR,_):Ze,qe="ADD_DATA_URI_TAGS"in e?s(H(Ke),e.ADD_DATA_URI_TAGS,_):Ke,B="FORBID_CONTENTS"in e?s({},e.FORBID_CONTENTS,_):Ve,V="FORBID_TAGS"in e?s({},e.FORBID_TAGS,_):{},Ee="FORBID_ATTR"in e?s({},e.FORBID_ATTR,_):{},W="USE_PROFILES"in e?e.USE_PROFILES:!1,Be=e.ALLOW_ARIA_ATTR!==!1,Ae=e.ALLOW_DATA_ATTR!==!1,$e=e.ALLOW_UNKNOWN_PROTOCOLS||!1,je=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,z=e.SAFE_FOR_TEMPLATES||!1,ye=e.SAFE_FOR_XML!==!1,P=e.WHOLE_DOCUMENT||!1,G=e.RETURN_DOM||!1,te=e.RETURN_DOM_FRAGMENT||!1,re=e.RETURN_TRUSTED_TYPE||!1,Se=e.FORCE_BODY||!1,Xe=e.SANITIZE_DOM!==!1,Ye=e.SANITIZE_NAMED_PROPS||!1,be=e.KEEP_CONTENT!==!1,q=e.IN_PLACE||!1,he=e.ALLOWED_URI_REGEXP||he,$=e.NAMESPACE||w,f=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&Qe(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(f.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&Qe(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(f.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(f.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),z&&(Ae=!1),te&&(G=!0),W&&(p=s({},N(dt)),m=[],W.html===!0&&(s(p,_t),s(m,Tt)),W.svg===!0&&(s(p,we),s(m,ke),s(m,se)),W.svgFilters===!0&&(s(p,Ie),s(m,ke),s(m,se)),W.mathMl===!0&&(s(p,xe),s(m,vt),s(m,se))),e.ADD_TAGS&&(p===Ge&&(p=H(p)),s(p,e.ADD_TAGS,_)),e.ADD_ATTR&&(m===We&&(m=H(m)),s(m,e.ADD_ATTR,_)),e.ADD_URI_SAFE_ATTR&&s(Oe,e.ADD_URI_SAFE_ATTR,_),e.FORBID_CONTENTS&&(B===Ve&&(B=H(B)),s(B,e.FORBID_CONTENTS,_)),be&&(p["#text"]=!0),P&&s(p,["html","head","body"]),p.table&&(s(p,["tbody"]),delete V.tbody),h&&h(e),j=e)},et=s({},["mi","mo","mn","ms","mtext"]),tt=s({},["foreignobject","annotation-xml"]),Ht=s({},["title","style","font","a","script"]),ie=s({},we);s(ie,Ie),s(ie,rr);var Ne=s({},xe);s(Ne,ar);var zt=function(e){var t=Y(e);(!t||!t.tagName)&&(t={namespaceURI:$,tagName:"template"});var a=fe(e.tagName),l=fe(t.tagName);return Le[e.namespaceURI]?e.namespaceURI===ne?t.namespaceURI===w?a==="svg":t.namespaceURI===ae?a==="svg"&&(l==="annotation-xml"||et[l]):!!ie[a]:e.namespaceURI===ae?t.namespaceURI===w?a==="math":t.namespaceURI===ne?a==="math"&&tt[l]:!!Ne[a]:e.namespaceURI===w?t.namespaceURI===ne&&!tt[l]||t.namespaceURI===ae&&!et[l]?!1:!Ne[a]&&(Ht[a]||!ie[a]):!!(F==="application/xhtml+xml"&&Le[e.namespaceURI]):!1},E=function(e){Z(n.removed,{element:e});try{e.parentNode.removeChild(e)}catch{try{e.outerHTML=me}catch{e.remove()}}},oe=function(e,t){try{Z(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch{Z(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is"&&!m[e])if(G||te)try{E(t)}catch{}else try{t.setAttribute(e,"")}catch{}},rt=function(e){var t,a;if(Se)e="<remove></remove>"+e;else{var l=pt(e,/^[\r\n\t ]+/);a=l&&l[0]}F==="application/xhtml+xml"&&$===w&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");var A=L?L.createHTML(e):e;if($===w)try{t=new gt().parseFromString(A,F)}catch{}if(!t||!t.documentElement){t=_e.createDocument($,"template",null);try{t.documentElement.innerHTML=Re?me:A}catch{}}var v=t.body||t.documentElement;return e&&a&&v.insertBefore(u.createTextNode(a),v.childNodes[0]||null),$===w?Mt.call(t,P?"html":"body")[0]:P?t.documentElement:v},at=function(e){return Rt.call(e.ownerDocument||e,e,k.SHOW_ELEMENT|k.SHOW_COMMENT|k.SHOW_TEXT|k.SHOW_PROCESSING_INSTRUCTION|k.SHOW_CDATA_SECTION,null,!1)},nt=function(e){return e instanceof yt&&(typeof e.__depth<"u"&&typeof e.__depth!="number"||typeof e.__removalCount<"u"&&typeof e.__removalCount!="number"||typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof At)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},K=function(e){return x(g)==="object"?e instanceof g:e&&x(e)==="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"},I=function(e,t,a){C[e]&&Jt(C[e],function(l){l.call(n,t,a,j)})},it=function(e){var t;if(I("beforeSanitizeElements",e,null),nt(e)||T(/[\u0080-\uFFFF]/,e.nodeName))return E(e),!0;var a=_(e.nodeName);if(I("uponSanitizeElement",e,{tagName:a,allowedTags:p}),e.hasChildNodes()&&!K(e.firstElementChild)&&(!K(e.content)||!K(e.content.firstElementChild))&&T(/<[/\w]/g,e.innerHTML)&&T(/<[/\w]/g,e.textContent)||a==="select"&&T(/<template/i,e.innerHTML)||e.nodeType===7||ye&&e.nodeType===8&&T(/<[/\w]/g,e.data))return E(e),!0;if(!p[a]||V[a]){if(!V[a]&&lt(a)&&(f.tagNameCheck instanceof RegExp&&T(f.tagNameCheck,a)||f.tagNameCheck instanceof Function&&f.tagNameCheck(a)))return!1;if(be&&!B[a]){var l=Y(e)||e.parentNode,A=Ot(e)||e.childNodes;if(A&&l)for(var v=A.length,d=v-1;d>=0;--d){var U=St(A[d],!0);U.__removalCount=(e.__removalCount||0)+1,l.insertBefore(U,bt(e))}}return E(e),!0}return e instanceof D&&!zt(e)||(a==="noscript"||a==="noembed"||a==="noframes")&&T(/<\/no(script|embed|frames)/i,e.innerHTML)?(E(e),!0):(z&&e.nodeType===3&&(t=e.textContent,t=M(t,de," "),t=M(t,Te," "),t=M(t,ve," "),e.textContent!==t&&(Z(n.removed,{element:e.cloneNode()}),e.textContent=t)),I("afterSanitizeElements",e,null),!1)},ot=function(e,t,a){if(Xe&&(t==="id"||t==="name")&&(a in u||a in Ut||a==="__depth"||a==="__removalCount"))return!1;if(!(Ae&&!Ee[t]&&T(Dt,t))){if(!(Be&&T(Ct,t))){if(!m[t]||Ee[t]){if(!(lt(e)&&(f.tagNameCheck instanceof RegExp&&T(f.tagNameCheck,e)||f.tagNameCheck instanceof Function&&f.tagNameCheck(e))&&(f.attributeNameCheck instanceof RegExp&&T(f.attributeNameCheck,t)||f.attributeNameCheck instanceof Function&&f.attributeNameCheck(t))||t==="is"&&f.allowCustomizedBuiltInElements&&(f.tagNameCheck instanceof RegExp&&T(f.tagNameCheck,a)||f.tagNameCheck instanceof Function&&f.tagNameCheck(a))))return!1}else if(!Oe[t]){if(!T(he,M(a,ze,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&Qt(a,"data:")===0&&qe[e])){if(!($e&&!T(wt,M(a,ze,"")))){if(a)return!1}}}}}}return!0},lt=function(e){return e!=="annotation-xml"&&pt(e,It)},st=function(e){var t,a,l,A;I("beforeSanitizeAttributes",e,null);var v=e.attributes;if(v){var d={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:m};for(A=v.length;A--;){t=v[A];var U=t,b=U.name,y=U.namespaceURI;if(a=b==="value"?t.value:er(t.value),l=_(b),d.attrName=l,d.attrValue=a,d.keepAttr=!0,d.forceKeepAttr=void 0,I("uponSanitizeAttribute",e,d),a=d.attrValue,!d.forceKeepAttr&&(oe(b,e),!!d.keepAttr)){if(!je&&T(/\/>/i,a)){oe(b,e);continue}if(ye&&T(/((--!?|])>)|<\/(style|title)/i,a)){oe(b,e);continue}z&&(a=M(a,de," "),a=M(a,Te," "),a=M(a,ve," "));var ut=_(e.nodeName);if(ot(ut,l,a)){if(Ye&&(l==="id"||l==="name")&&(oe(b,e),a=xt+a),L&&x(J)==="object"&&typeof J.getAttributeType=="function"&&!y)switch(J.getAttributeType(ut,l)){case"TrustedHTML":{a=L.createHTML(a);break}case"TrustedScriptURL":{a=L.createScriptURL(a);break}}try{y?e.setAttributeNS(y,b,a):e.setAttribute(b,a),nt(e)?E(e):ct(n.removed)}catch{}}}}I("afterSanitizeAttributes",e,null)}},Gt=function i(e){var t,a=at(e);for(I("beforeSanitizeShadowDOM",e,null);t=a.nextNode();)if(I("uponSanitizeShadowNode",t,null),!it(t)){var l=Y(t);t.nodeType===1&&(l&&l.__depth?t.__depth=(t.__removalCount||0)+l.__depth+1:t.__depth=1),(t.__depth>=Je||mt(t.__depth))&&E(t),t.content instanceof c&&(t.content.__depth=t.__depth,i(t.content)),st(t)}I("afterSanitizeShadowDOM",e,null)};return n.sanitize=function(i){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t,a,l,A,v;if(Re=!i,Re&&(i="<!-->"),typeof i!="string"&&!K(i))if(typeof i.toString=="function"){if(i=i.toString(),typeof i!="string")throw Ce("dirty is not a string, aborting")}else throw Ce("toString is not a function");if(!n.isSupported){if(x(r.toStaticHTML)==="object"||typeof r.toStaticHTML=="function"){if(typeof i=="string")return r.toStaticHTML(i);if(K(i))return r.toStaticHTML(i.outerHTML)}return i}if(ge||Me(e),n.removed=[],typeof i=="string"&&(q=!1),q){if(i.nodeName){var d=_(i.nodeName);if(!p[d]||V[d])throw Ce("root node is forbidden and cannot be sanitized in-place")}}else if(i instanceof g)t=rt("<!---->"),a=t.ownerDocument.importNode(i,!0),a.nodeType===1&&a.nodeName==="BODY"||a.nodeName==="HTML"?t=a:t.appendChild(a);else{if(!G&&!z&&!P&&i.indexOf("<")===-1)return L&&re?L.createHTML(i):i;if(t=rt(i),!t)return G?null:re?me:""}t&&Se&&E(t.firstChild);for(var U=at(q?i:t);l=U.nextNode();)if(!(l.nodeType===3&&l===A)&&!it(l)){var b=Y(l);l.nodeType===1&&(b&&b.__depth?l.__depth=(l.__removalCount||0)+b.__depth+1:l.__depth=1),(l.__depth>=Je||mt(l.__depth))&&E(l),l.content instanceof c&&(l.content.__depth=l.__depth,Gt(l.content)),st(l),A=l}if(A=null,q)return i;if(G){if(te)for(v=Lt.call(t.ownerDocument);t.firstChild;)v.appendChild(t.firstChild);else v=t;return(m.shadowroot||m.shadowrootmod)&&(v=Nt.call(o,v,!0)),v}var y=P?t.outerHTML:t.innerHTML;return P&&p["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&T(pr,t.ownerDocument.doctype.name)&&(y="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+y),z&&(y=M(y,de," "),y=M(y,Te," "),y=M(y,ve," ")),L&&re?L.createHTML(y):y},n.setConfig=function(i){Me(i),ge=!0},n.clearConfig=function(){j=null,ge=!1},n.isValidAttribute=function(i,e,t){j||Me({});var a=_(i),l=_(e);return ot(a,l,t)},n.addHook=function(i,e){typeof e=="function"&&(C[i]=C[i]||[],Z(C[i],e))},n.removeHook=function(i){if(C[i])return ct(C[i])},n.removeHooks=function(i){C[i]&&(C[i]=[])},n.removeAllHooks=function(){C={}},n}var vr=Et();export{vr as default};
