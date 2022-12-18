function useful(a,b){return a?a:b}function createUuid(){var a=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(b){var c=(a+16*Math.random())%16|0;a=Math.floor(a/16);return("x"==b?c:c&3|8).toString(16)})}function checkNumbers(){let a=[!0],b=arguments.length-1,c="function"==typeof arguments[b]?arguments[b--]:d=>!0;for(let d=0;d<=b;d++){let e=+arguments[d],f;(f=a)[0]&&(f[0]=Number.isNaN(e)?!1:c(e));a.push(e)}return a}function firstChr(a){return a?a[0]:""}
function trimFirstChr(a){return a?a.substring(1):""}function isSubstring(a,b){return-1<a.indexOf(b)}function lastChr(a){return a?a[a.length-1]:""}function substringBefore(a,b){b=String(a).indexOf(b);return-1<b?a.substring(0,b):a}function substringAfter(a,b){let c=String(a).indexOf(b);b=c+b.length;return-1<c?a.substring(b,a.length):""}function substringReverseBefore(a,b){b=a.lastIndexOf(b);return-1<b?a.substring(0,b):a}
function substringReverseAfter(a,b){let c=a.lastIndexOf(b);b=c+b.length;return-1<c?a.substring(b,a.length):""}function substringBetween(a,b,c){return substringReverseBefore(substringAfter(a,b),c)}function multiChr(a,b){return a.repeat(b)}function capitalizeFirstChr(a){return firstChr(a).toUpperCase()+trimFirstChr(a)}function snakeToCamel(a){return a.split("_").reduce(function(b,c){return b+capitalizeFirstChr(c)})}
function CamelToSnake(a){let b="";for(let c=0;c<a.length;c++){let d=a.charAt(c);b+=d==d.toUpperCase()?"_"+d.toLowerCase():d}return b}function safeCompareStrings(a,b){return!a&&b?-1:a&&!b?1:a||b?String(a).localeCompare(String(b)):0}const CHR_ASCII_SAFE_SEP=":",RXP_ASCII_SAFE_CHRS=/^[A-Za-z\d_\-]*$/,RXP_ID_RESTRICTED_CHRS=/[^A-Za-z\d]/g;function isAsciiUnsafe(a){return!a.match(RXP_ASCII_SAFE_CHRS)}function isAsciiSafeEncoded(a){return String(a).includes(CHR_ASCII_SAFE_SEP)}
function asciiSafeToken(a){return a.charCodeAt(0).toString()}function asciiSafeChr(a){return String.fromCharCode(parseInt(a))}function asciiSafeEncode(a){return isAsciiUnsafe(a)?CHR_ASCII_SAFE_SEP+a.split("").map(asciiSafeToken).join(CHR_ASCII_SAFE_SEP):a}function asciiSafeDecode(a){return isAsciiSafeEncoded(a)?trimFirstChr(a).split(CHR_ASCII_SAFE_SEP).map(asciiSafeChr).join(""):a}
function idSafeEncode(a){a=encodeURIComponent(a).replace(RXP_ID_RESTRICTED_CHRS,"_");return a.match(/^\d.*/)?"_":""+a}function loadFromLocalStorage(a){let b={statusCode:ERR_NO_LOCAL_STORAGE,value:void 0};if(window.localStorage)try{b.value=window.localStorage.getItem(a),b.statusCode=STATUS_OK}catch{b.statusCode=ERR_LOCAL_STORAGE_FAILURE}return b}
function saveToLocalStorage(a,b){let c=ERR_NO_LOCAL_STORAGE;if(window.localStorage)try{window.localStorage.setItem(a,b),c=STATUS_OK}catch{output.statusCode=ERR_LOCAL_STORAGE_FAILURE}return c}function getBrowserName(){return window.navigator.userAgent}function getOsName(){return substringBetween(window.navigator.userAgent,"(",";")}function isMobile(){return window.navigator.userAgentData?window.navigator.userAgentData.mobile:!1}function checkElementById(a){return!!document.getElementById(a)}
const ARNAV_DOM_EVENTS="abort activate addstream addtrack afterprint afterscriptexecute animationcancel animationend animationiteration animationstart appinstalled audioend audioprocess audiostart auxclick beforeinput beforeprint beforescriptexecute beforeunload beginEvent blocked blur boundary bufferedamountlow cancel canplay canplaythrough change click close closing complete compositionend compositionstart compositionupdate connect connectionstatechange contentdelete contextmenu copy cuechange cut datachannel dblclick devicechange devicemotion deviceorientation DOMActivate DOMContentLoaded DOMContentLoaded DOMMouseScroll drag dragend dragenter dragleave dragover dragstart drop durationchange emptied end ended endEvent enterpictureinpicture error focus focusin focusout formdata fullscreenchange fullscreenerror gamepadconnected gamepaddisconnected gatheringstatechange gesturechange gestureend gesturestart gotpointercapture hashchange icecandidate icecandidateerror iceconnectionstatechange icegatheringstatechange IDBTransaction input inputsourceschange install invalid keydown keypress keyup languagechange leavepictureinpicture load loadeddata loadedmetadata loadend loadstart lostpointercapture mark merchantvalidation message messageerror mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup mousewheel msContentZoom MSGestureChange MSGestureEnd MSGestureHold MSGestureStart MSGestureTap MSInertiaStart MSManipulationStateChanged mute negotiationneeded nomatch notificationclick offline online open orientationchange pagehide pageshow paste pause payerdetailchange paymentmethodchange play playing pointercancel pointerdown pointerenter pointerleave pointerlockchange pointerlockerror pointermove pointerout pointerover pointerup popstate progress push pushsubscriptionchange ratechange readystatechange rejectionhandled removestream removetrack removeTrack repeatEvent reset resize resourcetimingbufferfull result resume scroll search seeked seeking select selectedcandidatepairchange selectend selectionchange selectstart shippingaddresschange shippingoptionchange show signalingstatechange slotchange soundend soundstart speechend speechstart squeeze squeezeend squeezestart stalled start statechange storage submit success suspend timeout timeupdate toggle tonechange touchcancel touchend touchmove touchstart track transitioncancel transitionend transitionrun transitionstart unhandledrejection unload unmute upgradeneeded versionchange visibilitychange voiceschanged volumechange vrdisplayactivate vrdisplayblur vrdisplayconnect vrdisplaydeactivate vrdisplaydisconnect vrdisplayfocus vrdisplaypointerrestricted vrdisplaypointerunrestricted vrdisplaypresentchange waiting webglcontextcreationerror webglcontextlost webglcontextrestored webkitmouseforcechanged webkitmouseforcedown webkitmouseforceup webkitmouseforcewillbegin wheel".split(" ");
function getAvailableDomEventNames(){return ARNAV_DOM_EVENTS}function getMetaContent(a){let b=document.getElementsByTagName("meta");for(let c of b)if(c.getAttribute("name")==a)return c.getAttribute("content")}const STATUS_OK=0,ERR_NO_LOCAL_STORAGE=1,ERR_LOCAL_STORAGE_FAILURE=2;
class ArnavIssue{constructor(a="generic",b=null){this.setType(a);this.setPayload(b);this.setId();this.sender=this.src=null;this.resetResolvers();this.activate()}setType(a){this.iType=a;return this}getType(){return this.iType}setPayload(a){this.payload=a;return this}getPayload(){return this.payload}setId(a){this.id=a?a:createUuid();return this}getId(){return this.id}setSrc(a){this.src=a;return this}hasSrc(){return!!this.src}getSrc(){return this.src}setSender(a){this.sender=a;return this}getSender(){return this.sender}registerResolver(a){this.resolvers.push(a);
this.revResolvers[a.getId()]=!0;return this}hasResolverWithId(a){return this.revResolvers[a]}hasResolver(a){return this.hasResolverWithId(a.getId())}resetResolvers(){this.resolvers=[];this.revResolvers={};return this}copyResolvers(a){for(let b in a.resolvers)this.registerResolver(a.resolvers[b]);return this}activate(){this.active=!0;return this}terminate(){this.active=!1;return this}isActive(){return this.active}isTerminated(){return!this.active}convert(a="generic",b=null){let c=new ArnavIssue(this.getType(),
this.getPayload());this.setSrc(c.setId(this.getId()).setSrc(this.getSrc()).copyResolvers(this).terminate());this.setType(a).setPayload(b);return this}}const ARNAV_TYPE_BUREAUCRAT="bureaucrat",ARNAV_TYPE_CONTROL="control",ARNAV_TYPE_CONSOLE="console",ARNAV_TYPE_FRAMELET="framelet",ARNAV_TYPE_SHORTCUT="shortcut";
class ArnavBureaucrat{constructor(a=null,b){this.assignType(ARNAV_TYPE_BUREAUCRAT);this.chief=a;this.id=b?b:createUuid();this.i18n=this.cfg=null;this.currLocalCode=void 0;this.page=this.model=null;this.workers=[];this.workersById={};a&&a.registerWorker(this);this.setupProperties()}assignType(a){this.types||(this.types={});this.types[a]=!0}hasType(a){return this.types&&this.types[a]}setupProperties(){}hasChief(){return!!this.chief}getChief(){return this.chief}getId(){return this.id}beforeRegisterWorker(a){}afterRegisterWorker(a){}registerWorker(a){this.beforeRegisterWorker(a);
this.workers.push(a);this.workersById[a.getId()]=a;this.afterRegisterWorker(a);return this}getWorkers(a){let b=[];if(a)for(let c in this.workers)this.workers[c].hasType(a)&&b.push(this.workers[c]);else b=this.workers;return b}hasWorkers(a){return 0<this.getWorkers(a).length}countWorkers(a){return this.getWorkers(a).length}getWorkerByIdx(a){return this.workers[a]}getWorkerById(a){return this.workersById[a]}setProp(a,b){this[a]=b}getProp(a){return this[a]?this[a]:this.hasChief()?this.getChief().getProp(a):
null}isApp(){return!1}getApp(){return this.getProp("app")}getCfg(){return this.getProp("cfg")}getI18n(){return this.getProp("i18n")}setCurrLocalCode(a){this.currLocalCode=a}getCurrLocalCode(){return this.getProp("currLocalCode")}hasModel(){return!!this.model}setModel(a){this.model=a;return this}getModel(){return this.getProp("model")}getActiveModelId(){return this.getApp().getActiveModelId()}setPage(a){this.page=a;return this}getPage(){return this.getProp("page")}setCfgProp(a,b){this.getCfg().setProp(a,
b,this.getActiveModelId());(a=this.getApp())&&a.saveCfg()}getCfgProp(a){return this.getCfg().getProp(a,this.getActiveModelId())}beforeRun(){}runTask(){this.getWorkers().forEach(a=>a.run())}afterRun(){}run(){this.beforeRun();this.runTask();this.afterRun()}beforeQuit(){}quitTask(){this.getWorkers().forEach(a=>a.quit())}afterQuit(){}quit(){this.beforeQuit();this.quitTask();this.afterQuit()}createIssue(a=ITYPE_GENERIC,b=null){return new ArnavIssue(a,b)}assembleHandleFuncName(a,b){return"handle__"+a+(b?
"__"+b:"")}hasHandleFunc(a,b){return"function"===typeof this[this.assembleHandleFuncName(a,b)]}handle(a){}dispatch(a){var b=a.getType();b=this.assembleHandleFuncName(b);"function"===typeof this[b]?this[b](a):this.handle(a)}attempt(a){this.dispatch(a)}delegate(a,b){b.resolve(a)}escalate(a){a.isActive()&&this.hasChief()&&this.delegate(a,this.getChief())}downstream(a){let b=0;for(;a.isActive()&&b<this.countWorkers();)this.delegate(a,this.getWorkerByIdx(b++))}canResolve(a){return!a.hasResolver(this)}resolve(a){this.canResolve(a)&&
(a.registerResolver(this),this.attempt(a),this.downstream(a),this.escalate(a));return this}mapDomEventType(a){return a.type}isDomEventValid(a){return"dummy"!=a.detail}edom(a){this.isDomEventValid(a)&&(this.getDomObject().dispatchEvent(new CustomEvent(a.type,{detail:"dummy"})),a.stopPropagation(),this.resolve(this.createIssue(this.mapDomEventType(a),a).setSender(this)))}sendIssue(a,b){this.delegate(a.setSender(this),b)}}const CFG_UI_LANG_CODE="runtime.i18n.uiLangCode";
class ArnavCfgDefaultProp{constructor(a){this.path=a.property["@path"];this.mutability=a.property["@mutability"];this.content=a.property["@content"]}getPath(){return this.path}getMutability(){return this.mutability?this.mutability.toLowerCase():void 0}isMutable(){return!!this.getMutability()}isSysMutable(){return"sys"===this.getMutability()}isDocMutable(){return"doc"===this.getMutability()}getContent(){return this.content}}
class ArnavCfg{constructor(){this.defaultProps=[];this.defaultPropsByPaths={};this.mutableProps={sys:{},doc:{}}}createDefaultProp(a){return new ArnavCfgDefaultProp(a)}addDefaultProp(a){a=this.createDefaultProp(a);this.defaultProps.push(a);this.defaultPropsByPaths[a.getPath()]=a}loadDefaultProps(a){for(let b of a.cfg)this.addDefaultProp(b);return this}existsDoc(a){return!!this.mutableProps.doc[a]}checkDoc(a){this.existsDoc(a)||(this.mutableProps.doc[a]={})}existsDefaultProp(a){return!!this.defaultPropsByPaths[a]}isMutable(a){return this.existsDefaultProp(a)?
this.getDefaultProp(a).isMutable():!1}isSysMutable(a){return this.existsDefaultProp(a)?"sys"===this.getDefaultProp(a).getMutability():!1}isDocMutable(a){return this.existsDefaultProp(a)?"doc"===this.getDefaultProp(a).getMutability():!1}pokeMutableProp(a,b,c){this.isDocMutable(a)&&c?(this.checkDoc(c),this.mutableProps.doc[c][a]=b):this.isSysMutable(a)&&(this.mutableProps.sys[a]=b)}peekMutableProp(a,b){let c="";this.isDocMutable(a)&&b?this.existsDoc(b)&&(c=useful(this.mutableProps.doc[b][a],"")):this.isSysMutable(a)&&
(c=useful(this.mutableProps.sys[b][a],""));return c}getDefaultProp(a){return this.defaultPropsByPaths[a]}getDefaultPropContent(a){return this.existsDefaultProp(a)?this.getDefaultProp(a).getContent():""}setProp(a,b,c){this.isMutable(a)&&this.pokeMutableProp(a,b,c)}getProp(a,b){return this.isMutable(a)?useful(this.peekMutableProp(a,b),this.getDefaultPropContent(a)):this.getDefaultPropContent(a)}assembleJson(){return JSON.stringify(this.mutableProps)}unpackFromJson(a){let b=!0,c={};try{b=(c=JSON.parse(a))?
b=c.sys&&c.doc:!1}catch(d){b=!1}b&&(this.mutableProps=c);return b}getBrowserName(){return getBrowserName()}getOsName(){return getOsName()}isMobile(){return isMobile()}getBrowserLangCode(){return navigator.language.substring(0,2)}setUiLangCode(a){this.setProp(CFG_UI_LANG_CODE,a)}getUiLangCode(){let a=this.getProp(CFG_UI_LANG_CODE);return a?a:this.getBrowserLangCode()}}
class ArnavI18n{constructor(a=null){this.owner=a;this.locals={}}normalizeLocalCode(a){let b=a;switch(a.length){case 2:b=a;break;case 5:b=a[0]+a[1]+"-"+a[3]+a[4]}return b.toLowerCase()}getLangCode(a){a=this.normalizeLocalCode(a);return a[0]+a[1]}getCountryCode(a){let b=this.normalizeLocalCode(a);switch(a.length){case 2:return b;case 5:return a[3]+a[4]}}matchLocalCodes(a,b){let c=this.getLangCode(a),d=this.getLangCode(b);return c==d?(a=this.getCountryCode(a),b=this.getCountryCode(b),""==a||""==b||a==
b):!1}getLocalCodes(){return Object.keys(this.locals)}getMatchingLocal(a){let b=void 0;for(let c of this.getLocalCodes())if(this.matchLocalCodes(c,a)){b=c;break}return b}hasLocal(a){return!!a&&!!this.locals[this.normalizeLocalCode(a)]}getDefaultLocalCode(){let a=this.getLocalCodes();return 0<a.length?a[0]:void 0}addLocalSimple(a,b){this.locals[this.normalizeLocalCode(b)]=a}getstr(a,b){return(b=this.hasLocal(b)?this.normalizeLocalCode(b):this.getDefaultLocalCode())?this.locals[b][a]:""}}
const CTL_STATE_MAXIMIZED="maximized",CTL_STATE_NORMALIZED="normalized",CTL_STATE_FOLDED="folded";
class ArnavSize{constructor(a=0,b=0,c=0,d=0,e=CTL_STATE_NORMALIZED){this.left=a;this.top=b;this.width=c;this.height=d;this.state=e}isValid(){let a={CTL_STATE_FOLDED,CTL_STATE_NORMALIZED,CTL_STATE_MAXIMIZED};return checkNumbers(this.left,this.top,this.width,this.height,b=>0<=b)[0]&&Object.values(a).includes(this.state)}load(a){a&&([this.left,this.top,this.width,this.height,this.state]=[a.left,a.top,a.width,a.height,a.state]);return this}belongs(a,b){return this.getLeft()<=a&&a<=this.getRight()&&this.getTop()<=
b&&b<=this.getBottom()}}
class ArnavControl extends ArnavBureaucrat{constructor(a,b){super(a,b);this.assignType(ARNAV_TYPE_CONTROL);this.domObjectValue=this.getDomObjectValue();this.controlValue=this.domObject?this.getControlValue():null;this.normalSize=this.createSize();this.state=CTL_STATE_NORMALIZED;this.zIndexMax=this.zIndexMin=0}getDomObject(){return document.getElementById(this.getId())}checkDomObject(){return!!this.getDomObject()}getAvailableDomEventNames(){return getAvailableDomEventNames()}detectRelevantDomEventNames(){let a=[],
b=this.getAvailableDomEventNames();for(let c in b)this.hasHandleFunc(b[c])&&a.push(b[c]);return a}addEventListener(a){this.getDomObject().addEventListener(a,b=>{this.edom(b)})}addEventListeners(a){this.checkDomObject()&&a.forEach(b=>{this.addEventListener(b,c=>{this.edom(c)})});return this}subscribeOnDomEvents(){this.addEventListeners(this.detectRelevantDomEventNames());return this}assembleDom(){return null}implantDom(a){if(a&&this.checkDomObject()){a="array"===typeof a?a:[a];let b=this.getDomObject();
for(let c in a)b.appendChild(a[c])}return this}bindDomObject(){this.checkDomObject()&&(this.implantDom(this.assembleDom()),this.subscribeOnDomEvents(),this.saveNormalSize());return this}getDomObjectValue(){return this.getDomObject()?this.getDomObject().value:this.getId()}setDomObjectValue(a){this.getDomObject().value=a}assembleEmptyControlValue(){}parseSerializedControlValue(a){return a}assembleDomObjectValue(a){return String(a)}assembleDomObjectValueAppearance(a){return String(a)}parseDomObjectValue(a){return a}serializeControlValue(a){return String(a)}publishControlValue(a){return String(a)}getControlValue(){this.domObject=
this.getDomObject();this.domObjectValue=this.getDomObjectValue();return this.controlValue=this.parseDomObjectValue(this.domObjectValue)}setControlValue(a){this.controlValue=a;this.domObject=this.getDomObject();this.domObjectValue=this.assembleDomObjectValue(a);this.setDomObjectValue(this.domObjectValue)}show(){this.getDomObject().style.display="";return this}hide(){this.getDomObject().style.display="none";return this}getLeft(){let a=this.getDomObject();return a?a.offsetLeft:void 0}setLeft(a){this.checkDomObject()&&
(this.getDomObject().style.left=a+"px");return this}getTop(){let a=this.getDomObject();return a?a.offsetTop:void 0}setTop(a){this.checkDomObject()&&(this.getDomObject().style.top=a+"px");return this}getRight(){let a=this.getDomObject();return a?a.offsetLeft+a.clientWidth:void 0}setRight(a){this.resizeRight(a-this.getRight());return this}getBottom(){let a=this.getDomObject();return a?a.offsetTop+a.clientHeight:void 0}setBottom(a){this.resizeBottom(a-this.getBottom());return this}getWidth(){let a=this.getDomObject();
return a?a.clientWidth:void 0}setWidth(a){this.checkDomObject()&&(this.getDomObject().style.width=a+"px");return this}getHeight(){let a=this.getDomObject();return a?a.clientHeight:void 0}setHeight(a){this.checkDomObject()&&(this.getDomObject().style.height=a+"px");return this}resizeLeft(a){let b=this.getLeft(),c=this.getWidth()-a;this.setLeft(b+a).setWidth(c);return this}resizeRight(a){let b=this.getWidth();this.setWidth(b+a);return this}resizeBottom(a){let b=this.getHeight();this.setHeight(b+a);
return this}stratch(){let a=this.getChief();this.setSize4(0,0,a.getInnerWidth(),a.getInnerHeight());return this}getInnerWidth(){return this.getWidth()}getInnerHeight(){return this.getHeight()}createSize(a=0,b=0,c=0,d=0,e){return new ArnavSize(a,b,c,d,e)}getSize(){return this.createSize(this.getLeft(),this.getTop(),this.getWidth(),this.getHeight(),this.state)}setSize(a){return this.setTop(a.top).setLeft(a.left).setWidth(a.width).setHeight(a.height).setState(a.state)}setSize4(a,b,c,d){return this.setSize(this.createSize(a,
b,c,d))}issueBelongs(a){return this.getSize.belongs(a.payload.clientX,a.payload.clientY)}setState(a){this.state=a}getState(){return this.state}isNormalized(){return this.getState()==CTL_STATE_NORMALIZED}getNormalSize(){return this.normalSize}setNormalSize(a){this.normalSize=a}saveNormalSize(){this.isNormalized()&&(this.normalSize=this.getSize())}getNormalLeft(){return this.getNormalSize().left}getNormalTop(){return this.getNormalSize().top}getNormalWidth(){return this.getNormalSize().width}getNormalHeight(){return this.getNormalSize().height}beforeNormalize(){}normalizeTask(){this.isFolded()&&
this.show();this.setSize(this.getNormalSize())}afterNormalize(){}normalize(){this.beforeNormalize();this.normalizeTask();this.afterNormalize();this.setState(CTL_STATE_NORMALIZED);return this}isMaximized(){return this.getState()==CTL_STATE_MAXIMIZED}beforeMaximize(){}maximizeTask(){this.stratch()}afterMaximize(){}maximize(){this.isFolded()&&this.normalize();this.saveNormalSize();this.beforeMaximize();this.maximizeTask();this.afterMaximize();this.setState(CTL_STATE_MAXIMIZED);return this}isFolded(){return this.getState()==
CTL_STATE_FOLDED}beforeFold(){}foldTask(){this.hide()}afterFold(){}fold(){this.saveNormalSize();this.beforeFold();this.foldTask();this.afterFold();this.setState(CTL_STATE_FOLDED);return this}setZIndexMin(a){this.zIndexMin=a;return this}getZIndexMin(){return this.zIndexMin}setZIndexMax(a){this.zIndexMax=a;return this}getZIndexMax(){return this.zIndexMax}setZIndex(a){this.checkDomObject()&&(this.getDomObject().style.zIndex=a);return this}getZIndex(){return this.checkDomObject()?useful(this.getDomObject().style.zIndex,
0):0}calcZIndexBack(){return this.getZIndexMin()-1}calcZIndexTop(){return this.getZIndexMax()+1}bringToFront(a){let b=this.calcZIndexTop();this.setZIndexMax(b);a.setZIndex(b);return this}bringToBack(a){let b=this.calcZIndexBack();this.setZIndexMin(b);a.setZIndex(b);return this}goToFront(){this.getChief().bringToFront(this);return this}goToBack(){this.getChief().bringToBack(this);return this}handle__resize(a){this.isMaximized()&&this.stratch()}}
class ArnavScrollArea extends ArnavControl{setHScrollState(a){this.getDomObject().scrollTop=a}setVScrollState(a){this.getDomObject().scrollTop=a}handle__scroll(a){a.convert("uitocscroll",this.getDomObject().scrollTop.toString())}}
class ArnavPage extends ArnavControl{constructor(a,b="BODYPAGE"){super(a,b);this.page=this}getDomObject(){return document.getElementsByTagName("body")[0]}addEventListener(a){let b="on"+a;a=this.getApp().getGlobalAppName()+".getPage().edomBody('"+a+"')";this.getDomObject().setAttribute(b,a)}edomBody(a){this.edom(new CustomEvent(a,{detail:this.getDomObject()}))}handle__resize(a){let b=a.getPayload().detail;a.convert("resize",{top:b.clientTop,left:b.clientLeft,width:b.clientWidth,height:b.clientHeight})}}
class ArnavTocEntry extends ArnavBureaucrat{constructor(a,b,c,d){super(a,b);this.title=c;this.uri=d}setTitle(a){this.title=a}getTitle(){return this.title}hasUri(){return!!this.uri}getUri(){return this.uri}getLevel(){return this.getChief().getLevel()+1}matchUri(a){a=a.split("/");return a[a.length-1]==this.getUri()}getEntries(){return this.workers}handle__localize(a){this.setTitle(this.getI18n().getstr(this.getId()))}}
class ArnavDoc extends ArnavBureaucrat{getLevel(){return 0}createEntryOfDto(a,b){return new ArnavTocEntry(a,b.entry["@id"],b.entry["@title"],b.entry["@uri"])}extractTocEntriesFromDto(a){return a.entries}loadEntryFromDto(a,b){a=this.createEntryOfDto(a,b);this.entriesByUri[a.getUri]=a;b.entry.entries&&this.loadEntriesFromDto(a,b.entry.entries);return a}loadEntriesFromDto(a,b){for(let c in b)this.loadEntryFromDto(a,b[c])}loadFromDto(a){this.id=a.entry["@id"];this.title=a.entry["@title"];this.entriesByUri=
{};this.loadEntriesFromDto(this,this.extractTocEntriesFromDto(a.entry))}getEntries(){return this.workers}}
class ArnavTocTree extends ArnavScrollArea{constructor(a,b,c,d=[]){super(a,b);this.setSelectedId(c);this.setOpen(d)}setSelectedId(a){this.selectedId=a;return this}getSelectedId(){return this.selectedId}isSelected(a){return a.matchUri(window.location.href)}setOpen(a){this.open={};for(let b in a)a[b]&&(this.open[a[b]]=!0)}isOpen(a){return!!this.open[a]}getIdSepar(){return"_._"}assembleId(a,b){return a+this.getIdSepar()+b}extractId(a){return a.split(this.getIdSepar())[0]}extractSuffix(a){a=a.split(this.getIdSepar());
return a[a.length-1]}getLinkId(a){return this.assembleId(a,"select")}getOpenBoxId(a){return this.assembleId(a,"open")}getOpenBoxIconId(a){return this.assembleId(this.assembleId(a,"icon"),"open")}getCloseBoxId(a){return this.assembleId(a,"close")}getCloseBoxIconId(a){return this.assembleId(this.assembleId(a,"icon"),"close")}getEntryDivId(a){return this.assembleId(a,"div")}getSelectedClassName(a){return a.hasWorkers()?this.getCfg().getProp("toc.tree.classTitleNodeSelected"):this.getCfg().getProp("toc.tree.classTitleLeafSelected")}getLevelClassName(a){return this.getCfg().getProp("toc.tree.classLevelPrefix")+
a.getLevel()}getLabelClassName(a){return this.getCfg().getProp("toc.tree.classLabel")}getEntryOuterClassName(a){return this.getCfg().getProp("toc.tree.classEntryOuter")}getEntryTitleClassName(a){return a.hasWorkers()?this.getCfg().getProp("toc.tree.classEntryTitleNode"):this.getCfg().getProp("toc.tree.classEntryTitleLeaf")}getEntryInnerClassName(a){return this.getCfg().getProp("toc.tree.classEntryInner")}assembleEntryOuterClassRefs(a){return this.getEntryOuterClassName(a)}assembleOpenBoxClassRefs(){return this.getCfg().getProp("toc.tree.classOpenBox")}assembleCloseBoxClassRefs(){return this.getCfg().getProp("toc.tree.classOpenBox")}assembleTitleLabelClassRefs(a){let b=
[this.getLabelClassName(a),this.getLevelClassName(a)];this.isSelected(a)&&b.push(this.getSelectedClassName(a));return b.join(" ")}assembleEntryInnerClassRefs(a){return this.getEntryInnerClassName(a)}getTitleOuterClassName(a){return a.hasWorkers()?this.isSelected(a)?this.getCfg().getProp("toc.tree.classTitleNodeSelected"):this.getCfg().getProp("toc.tree.classTitleNode"):this.isSelected(a)?this.getCfg().getProp("toc.tree.classTitleLeafSelected"):this.getCfg().getProp("toc.tree.classTitleLeaf")}assembleEntryOuterDom(a){let b=
document.createElement("div");b.setAttribute("id",a.getId());b.setAttribute("class",this.assembleEntryOuterClassRefs(a));b.appendChild(this.assembleEntryTitleDom(a));a.hasWorkers()&&b.appendChild(this.assembleEntryInnerDom(a));return b}assembleOpenBoxInnerDom(a){a=a.getId();let b=document.createElement("img");b.setAttribute("id",this.getOpenBoxIconId(a));b.setAttribute("src",this.getCfg().getProp("toc.tree.srcImgOpen"));return b}assembleOpenBoxDom(a){let b=document.createElement("span"),c=a.getId();
b.setAttribute("id",this.getOpenBoxId(c));b.setAttribute("class",this.assembleOpenBoxClassRefs());b.setAttribute("style","display: "+(this.isOpen(c)?"none":""));b.appendChild(this.assembleOpenBoxInnerDom(a));return b}assembleCloseBoxInnerDom(a){a=a.getId();let b=document.createElement("img");b.setAttribute("id",this.getCloseBoxIconId(a));b.setAttribute("src",this.getCfg().getProp("toc.tree.srcImgClose"));return b}assembleCloseBoxDom(a){let b=document.createElement("span"),c=a.getId();b.setAttribute("id",
this.getCloseBoxId(c));b.setAttribute("class",this.assembleCloseBoxClassRefs());b.setAttribute("style","display: "+(this.isOpen(c)?"":"none"));b.appendChild(this.assembleCloseBoxInnerDom(a));return b}assembleEntryLinkDom(a){}assembleEntryTitleDom(a){let b=document.createElement("div");a.hasWorkers()&&(b.appendChild(this.assembleOpenBoxDom(a)),b.appendChild(this.assembleCloseBoxDom(a)));b.appendChild(this.assembleEntryLinkDom(a));b.setAttribute("class",this.getTitleOuterClassName(a));return b}assembleEntryInnerDom(a){let b=
document.createElement("div"),c=a.getId();b.setAttribute("id",this.getEntryDivId(c));b.setAttribute("class",this.assembleEntryInnerClassRefs(a));b.setAttribute("style","display: "+(this.isOpen(c)?"":"none"));a=a.getEntries();for(let d in a)b.appendChild(this.assembleEntryOuterDom(a[d]));return b}assembleDom(){let a=document.createElement("div"),b=document.createElement("div");b.setAttribute("class",this.getCfg().getProp("toc.tree.classInner"));let c=this.getModel().getEntries();for(let d in c)b.appendChild(this.assembleEntryOuterDom(c[d]));
a.appendChild(b);return a}getOpenIds(){let a=[];for(let b in this.open)this.open[b]&&a.push(b);return a}openEntry(a){let b=document.getElementById(this.getOpenBoxId(a)),c=document.getElementById(this.getCloseBoxId(a)),d=document.getElementById(this.getEntryDivId(a));b.style.display="none";c.style.display="";d.style.display="";this.open[a]=!0;return this.getOpenIds()}closeEntry(a){let b=document.getElementById(this.getOpenBoxId(a)),c=document.getElementById(this.getCloseBoxId(a)),d=document.getElementById(this.getEntryDivId(a));
b.style.display="";c.style.display="none";d.style.display="none";this.open[a]=!1;return this.getOpenIds()}flipFlopEntry(a){this.isOpen(a)?this.closeEntry(a):this.openEntry(a)}handle__click(a){}handle__scroll(a){a.convert("uitocscroll",this.getDomObject().scrollTop.toString())}}
class ArnavTocTreeMultipage extends ArnavTocTree{constructor(a,b,c,d=[]){super(a,b,c,d)}assembleEntryLinkDom(a){let b;a.hasUri()&&!this.isSelected(a)?(b=document.createElement("a"),b.setAttribute("id",this.getLinkId(a.getId())),b.setAttribute("href",a.getUri())):(b=document.createElement("span"),a.hasWorkers()&&(b.setAttribute("id",a.getId()+this.getIdSepar()+"flipFlop"),b.setAttribute("style","cursor: pointer")));b.setAttribute("class",this.assembleTitleLabelClassRefs(a));b.appendChild(document.createTextNode(a.getTitle()));
return b}handle__click(a){let b=a.getPayload(),c=this.extractId(b.target.id);switch(this.extractSuffix(b.target.id)){case "open":a.convert("uitocentry",this.openEntry(c));break;case "close":a.convert("uitocentry",this.closeEntry(c));break;case "flipFlop":this.flipFlopEntry(c)}}}
class ArnavTocTreeSinglePage extends ArnavTocTree{assembleEntryLinkDom(a){let b=document.createElement("span");a.hasUri()&&!this.isSelected(a)&&(b=document.createElement("a"),b.setAttribute("id",this.getLinkId(a.getId())));b.setAttribute("class",this.assembleTitleLabelClassRefs(a));b.appendChild(document.createTextNode(a.getTitle()));return b}selectEntry(a){return a}handle__click(a){let b=a.getPayload(),c=this.extractId(b.target.id);switch(this.extractSuffix(b.target.id)){case "open":a.convert("uitocentry",
this.openEntry(c));break;case "close":a.convert("uitocentry",this.closeEntry(c));break;case "select":a.convert("uitocentry",this.selectEntry(c))}}}class ArnavFrameletHeaderFoldBox extends ArnavControl{handle__click(a){a.convert("fold")}}
class ArnavFrameletHeader extends ArnavControl{constructor(a,b){super(a,b);this.foldBox=this.createFoldBox().bindDomObject()}assembleFoldBoxId(a){return a+"Fold"}createFoldBox(){let a=this.assembleFoldBoxId(this.getId());return checkElementById(a)?new ArnavFrameletHeaderFoldBox(this,a):null}}class ArnavFrameletPane extends ArnavControl{handle__click(a){a.terminate()}}
class ArnavFramelet extends ArnavControl{constructor(a,b,c){super(a,b);this.assignType(ARNAV_TYPE_FRAMELET);this.folded=c;this.pane=this.createPane().bindDomObject();this.shortcut=null}setTitle(a){this.title=a;return this}show(){this.goToFront()}hide(){this.goToBack()}getTitle(){return this.title}hasShortcut(){return!!this.shortcut}setShortcut(a){this.shortcut=a;return this}getShortcut(){return this.shortcut}showShortcut(){this.hasShortcut()&&this.getShortcut().show();return this}hideShortcut(){this.hasShortcut()&&
this.getShortcut().hide();return this}assemblePaneId(a){return a+"Pane"}createPane(){let a=this.assemblePaneId(this.getId());return checkElementById(a)?new ArnavFrameletPane(this,a):null}getPane(){return this.pane}normalizeTask(){this.hideShortcut();super.normalizeTask()}foldTask(){super.foldTask();this.showShortcut()}handle__fold(a){a.convert("fold",this)}}
class ArnavHeadedFramelet extends ArnavFramelet{constructor(a,b,c){super(a,b,c);this.header=this.createHeader().bindDomObject()}assembleHeaderId(a){return a+"Header"}createHeader(){let a=this.assembleHeaderId(this.getId());return checkElementById(a)?new ArnavFrameletHeader(this,a):null}getHeader(){return this.header}calcHeaderLeft(){return this.getWidth()-this.getHeader().getWidth()}calcPaneHeight(){return this.getHeight()-(this.isMaximized()?0:this.getHeader().getHeight())}setWidth(a){super.setWidth(a);
this.getHeader().setLeft(this.calcHeaderLeft());this.getPane().setWidth(this.getWidth());return this}setHeight(a){super.setHeight(a);this.isNormalized()&&this.getPane().setHeight(this.calcPaneHeight());return this}showHeader(){let a=this.getHeader();a&&a.show();return this}hideHeader(){let a=this.getHeader();a&&a.hide();return this}normalizeTask(){super.normalizeTask();this.showHeader();this.getPane().setTop(this.getHeader().getHeight())}maximizeTask(){this.hideHeader();super.maximizeTask();this.getPane().maximize();
this.hideShortcut()}}class ArnavHeadlessFramelet extends ArnavFramelet{}class ArnavFrameletShortcut extends ArnavControl{constructor(a,b,c){super(a,b);this.assignType(ARNAV_TYPE_SHORTCUT);this.framelet=c.setShortcut(this)}getTitle(){return this.framelet.getTitle()}handle__click(a){a.convert("unfold",this.framelet)}}
class ArnavConsole extends ArnavControl{constructor(a,b){super(a,b);this.assignType(ARNAV_TYPE_CONSOLE);this.frameletShortcuts={}}getSmartphoneWidth(){return 600}isSmartphone(){return this.getWidth()<=this.getSmartphoneWidth()}getHorizontalPadding(){return 13}getVerticalPadding(){return 13}isFrameletFolded(a){return(a=this.getWorkerById(a))?a.isFolded():void 0}beforeOrganizeFramelets(){}organizeFrameletsTask(){}afterOrganizeFramelets(){}organizeFramelets(){this.beforeOrganizeFramelets();this.organizeFrameletsTask();
this.afterOrganizeFramelets();return this}handle__fold(a){a.terminate();a.getPayload()&&a.getPayload().fold()}handle__unfold(a){a.terminate();a.getPayload().normalize();a.getSender().hide()}handle__mouseup(a){}handle__mousedown(a){}handle__mousemove(a){}handle__resize(a){}}
class ArnavBurger extends ArnavControl{constructor(a,b,c){super(a,b);this.paneVisible=!1;this.pane=c;this.iconFolded=document.getElementById(this.getId()+"ImgFolded");this.iconUnfolded=document.getElementById(this.getId()+"ImgUnfolded")}getPane(){return this.pane}getIconFolded(){return this.iconFolded}getIconUnfolded(){return this.iconUnfolded}showFolded(){this.getIconFolded().style.display="";this.getIconUnfolded().style.display="none"}showUnfolded(){this.getIconFolded().style.display="none";this.getIconUnfolded().style.display=
""}isPaneVisible(){return this.paneVisible}showPane(){this.getPane().goToFront();this.showUnfolded();this.paneVisible=!0;return this}hidePane(){this.getPane().goToBack();this.showFolded();this.paneVisible=!1;return this}handle__click(a){a.terminate();this.isPaneVisible()?this.hidePane():this.showPane()}}
class ArnavStrip extends ArnavControl{constructor(a,b){super(a,b);this.setupFigureImgs()}getFigureImgs(){return this.figureImgs}createFigureImg(a){return new ArnavFigureImg(this,a.id)}isFigureImg(a){return a.hasAttribute("id")}setupFigureImgs(){this.figureImgs=[];let a=this.getDomObject().getElementsByTagName("img");for(let b of a)this.isFigureImg(b)&&this.figureImgs.push(this.createFigureImg(b).bindDomObject())}adjustLargeImgs(){for(let a of this.getFigureImgs())a.isHardSized()||a.adjustWidth();
return this}}
class ArnavFigureImg extends ArnavControl{constructor(a,b){super(a,b);this.originalLeft=this.getLeft();this.originalWidth=this.getDomObject()?this.getDomObject().naturalWidth:0}getOriginalLeft(){return this.originalLeft}getOriginalWidth(){return this.originalWidth}getMaxWidth(){return this.getChief().getWidth()-this.getOriginalLeft()}isHardSized(){let a=this.getDomObject();return a?a.hasAttribute("width")||a.hasAttribute("height"):!1}isLarge(){return this.getOriginalWidth()>this.getMaxWidth()}isSmall(){return this.getOriginalWidth()<this.getMaxWidth()}isUnreasonablySmall(){return this.isLarge()&&
this.getWidth()<this.getMaxWidth()||this.isSmall()&&this.getWidth()<this.getOriginalWidth()}adjustWidth(){this.getWidth()>this.getMaxWidth()?(this.setWidth(this.getMaxWidth()),this.getDomObject().style.cursor="zoom-in",this.adjusted=!0):this.isUnreasonablySmall()&&(this.setWidth(Math.min(this.getOriginalWidth(),this.getMaxWidth())),this.adjusted=!0);this.getWidth()==this.getOriginalWidth()&&this.getOriginalWidth()<this.getMaxWidth()&&(this.makePassive(),this.adjusted=!1);return this}makePassive(){this.getDomObject().style.cursor=
"default"}restoreOriginalWidth(){this.setWidth(this.getOriginalWidth());this.getDomObject().style.cursor="zoom-out";return this}handle__click(a){this.isLarge()&&(this.adjusted?(this.restoreOriginalWidth(),this.adjusted=!1):this.adjustWidth());a.terminate()}}
class ArnavApp extends ArnavBureaucrat{constructor(){super(null,"app");this.app=this;this.cfg=this.createCfg();this.loadCfg();this.i18n=this.createI18n();this.currLocalCode="en";this.page=this.createPage(this)}getGlobalAppName(){return"GLOBAL_APP"}getArnavUniqueId(){return"genericArnavApp2022"}createCfg(){return new ArnavCfg}saveCfg(){saveToLocalStorage(this.getArnavUniqueId(),this.getCfg().assembleJson())}loadCfg(){let a=loadFromLocalStorage(this.getArnavUniqueId());a.statusCode==STATUS_OK&&this.getCfg().unpackFromJson(a.value)}createI18n(){return new ArnavI18n(this)}getActiveModelId(){return this.hasModel()?
this.getModel().getId():void 0}createPage(a){return null}print(){let a=document.body.innerHTML;document.body.innerHTML=document.getElementById("divTopicBody").innerHTML;window.print();document.body.innerHTML=a;location.reload()}afterQuit(){}};
