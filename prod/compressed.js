class ArnavApp extends ArnavBureaucrat{constructor(){super(null,"app");this.app=this;this.cfg=this.createCfg();this.loadCfg();this.page=this.createPage(this)}getArnavUniqueId(){return"genericArnavApp2022"}createCfg(){return new ArnavCfg()}saveCfg(){saveToLocalStorage(this.getArnavUniqueId(),this.getCfg().assembleJson())}loadCfg(){let jsonCfg=loadFromLocalStorage(this.getArnavUniqueId());this.getCfg().unpackFromJson(jsonCfg)}createPage(chief){return null}afterRun(){}run(){this.afterRun()}beforeQuit(){}quit(){this.beforeQuit();this.saveCfg()}}class ArnavBureaucrat{constructor(chief=null,id=undefined){this.chief=chief;this.id=id?id:createUuid();this.cfg=null;this.model=null;this.page=null;this.workers=[];if(chief)chief.registerWorker(this);this.setupProperties()}setupProperties(){}hasChief(){return!!this.chief}getChief(){return this.chief}getId(){return this.id}beforeRegisterWorker(bureaucrat){}afterRegisterWorker(bureaucrat){}registerWorker(bureaucrat){this.beforeRegisterWorker(bureaucrat)this.workers.push(bureaucrat);this.afterRegisterWorker(bureaucrat)return this}hasWorkers(){return this.workers.length>0}countWorkers(){return this.workers.length}getWorkerByIdx(idx){return this.workers[idx]}getProp(propName){return this[propName]?this[propName]:(this.hasChief()?this.getChief().getProp(propName):null)}isApp(){return false}getApp(){return this.getProp("app")}getCfg(){return this.getProp("cfg")}setModel(model){this.model=model;return this}getModel(){return this.getProp("model")}setPage(page){this.page=page;return this}getPage(){return this.getProp("page")}createIssue(iType=ITYPE_GENERIC,payload=null){return new ArnavIssue(iType,payload)}handle(issue){}dispatch(issue){let iType=issue.getType();typeof this[iType]==="function"?this[iType](issue):this.handle(issue)}attempt(issue){this.dispatch(issue)}delegate(issue,bureaucrat){bureaucrat.resolve(issue)}escalate(issue){if(issue.isActive()&&this.hasChief())this.delegate(issue,this.getChief())}downstream(issue){let workerIdx=0;while(issue.isActive()&&workerIdx<this.countWorkers())this.delegate(issue,this.getWorkerByIdx(workerIdx++))}canResolve(issue){return!issue.hasResolver(this)}resolve(issue){if(this.canResolve(issue)){issue.registerResolver(this);this.attempt(issue);this.downstream(issue);this.escalate(issue)}return this}mapDomEventType(e){return e.type}edom(e){this.resolve(this.createIssue(this.mapDomEventType(e),e).setSender(this))}sendIssue(issue,bureaucrat){this.delegate(issue.setSender(this),bureaucrat)}}const CFG_SYS_PARAMS=undefined;const CFG_DEFAULT_DOC_ID="default";const CFG_UI_LANG_CODE="CFG_UI_LANG_CODE";class ArnavCfg{constructor(){this.params={"sys":{},"doc":{"default":{}}};this.setDefaults()}checkOnlineDoc(docId){if(!this.params.doc[docId])this.params.doc[docId]={}}pokeCfgParam(docId,paramName,safeParamValue){if(docId){this.checkOnlineDoc(docId);this.params.doc[docId][paramName]=safeParamValue}else this.params.sys[paramName]=safeParamValue}peekCfgParam(docId,paramName){let paramValue=docId?(this.params.doc[docId]?this.params.doc[docId][paramName]:""):this.params.sys[paramName];return paramValue}setSysCfgParam(paramName,paramValue){this.pokeCfgParam(CFG_SYS_PARAMS,paramName,asciiSafeEncode(paramValue))}getSysCfgParam(paramName){return asciiSafeDecode(this.peekCfgParam(CFG_SYS_PARAMS,paramName))}setDocCfgParam(docId,paramName,paramValue){this.pokeCfgParam(docId,paramName,asciiSafeEncode(paramValue))}setDefaultDocCfgParam(paramName,paramValue){this.pokeCfgParam(CFG_DEFAULT_DOC_ID,paramName,asciiSafeEncode(paramValue))}getDocCfgParam(docId,paramName){let docValue=this.peekCfgParam(docId,paramName);let defValue=this.peekCfgParam(CFG_DEFAULT_DOC_ID,paramName);return asciiSafeDecode(useful(docValue,defValue))}getBrowserLangCode(){return navigator.language.substring(0,2)}setUiLangCode(langCode){this.setSysCfgParam(CFG_UI_LANG_CODE,langCode)}getUiLangCode(){return this.getSysCfgParam(CFG_UI_LANG_CODE)?this.getSysCfgParam(CFG_UI_LANG_CODE):this.getBrowserLangCode()}assembleJson(){delete this.params.doc[CFG_DEFAULT_DOC_ID];return JSON.stringify(this.params)}unpackFromJson(paramsJson){let parseSuccess=true;let params={};try{params=JSON.parse(paramsJson)}catch(e){parseSuccess=false}if(parseSuccess){for(let paramName in params.sys)this.pokeCfgParam(CFG_SYS_PARAMS,paramName,params.sys[paramName]);for(let docId in params.doc)for(let paramName in params.doc[docId])this.pokeCfgParam(docId,paramName,params.doc[docId][paramName])}return parseSuccess}setDefaults(){}}class ArnavTocEntry extends ArnavModel{constructor(chief,id,title,uri=undefined){super(chief,id);this.title=title;this.uri=uri}getTitle(){return this.title}hasUri(){return!!this.uri}getUri(){return this.uri}getLevel(){return this.getChief().getLevel()+1}matchUri(uri){let clauses=uri.split("/");return clauses[clauses.length-1]==this.getUri()}getEntries(){return this.workers}}class ArnavDoc extends ArnavModel{getLevel(){return 0}createEntryOfDto(chief,entryDto){return new ArnavTocEntry(chief,entryDto.id,entryDto.title,entryDto.uri)}extractTocEntriesFromDto(dto){return dto.toc.entries}loadEntryFromDto(chief,entryDto){let entry=this.createEntryOfDto(chief,entryDto);if(entryDto.entries)this.loadEntriesFromDto(entry,entryDto.entries);return entry}loadEntriesFromDto(chief,entriesDtoArray){for(let i in entriesDtoArray){this.loadEntryFromDto(chief,entriesDtoArray[i])}}loadFromDto(dto){this.id=dto.id;this.title=dto.title;this.loadEntriesFromDto(this,this.extractTocEntriesFromDto(dto))}getEntries(){return this.workers}}class ArnavIssue{constructor(iType="generic",payload=null){this.setType(iType);this.setPayload(payload);this.setId();this.src=null;this.sender=null;this.resetResolvers();this.activate()}setType(iType){this.iType=iType;return this}getType(){return this.iType}setPayload(payload){this.payload=payload;return this}getPayload(){return this.payload}setId(id=undefined){this.id=id?id:createUuid();return this}getId(){return this.id}setSrc(src){this.src=src;return this}hasSrc(){return!!this.src}getSrc(){return this.src}setSender(bureaucrat){this.sender=bureaucrat;return this}getSender(){return this.sender}registerResolver(bureaucrat){this.resolvers.push(bureaucrat);this.revResolvers[bureaucrat.getId()]=true;return this}hasResolverWithId(bureaucratId){return this.revResolvers[bureaucratId]}hasResolver(bureaucrat){return this.hasResolverWithId(bureaucrat.getId())}resetResolvers(){this.resolvers=[];this.revResolvers={};return this}copyResolvers(issue){for(let i in issue.resolvers)this.registerResolver(issue.resolvers[i]);return this}activate(){this.active=true;return this}terminate(){this.active=false;return this}isActive(){return this.active}isTerminated(){return!this.active}convert(iType="generic",payload=null){let src=new ArnavIssue(this.getType(),this.getPayload());this.setSrc(src.setId(this.getId()).setSrc(this.getSrc()).copyResolvers(this).terminate());this.setType(iType).setPayload(payload);return this}}class ArnavModel extends ArnavBureaucrat{}class Page extends UIControl{constructor(app,id){super(app,id)this.createPageHeader();this.createContentConsole()}isPage(){return true}createSearchPane(){}createLangSelector(){}createPageHeader(){this.createSearchPane();this.createLangSelector()}createTocTree(){}createTocFramelet(){this.createTocTree()}createReaderFramelet(){}createContentConsole(){this.createTocFramelet();this.createReaderFramelet()}}function getPageTocAreaDiv(){return document.getElementById("tocdiv")}var GLOBAL_App=null;function initWebhelp(){GLOBAL_App=new App();GLOBAL_App.start()}class PageSplitter{constructor(splitterDivId){this.splitterDivId=splitterDivId;this.beingDragged=false}getId(){return this.splitterDivId}getSplitterDiv(){return document.getElementById(this.getId())}resizePageTocAreaDiv(width){let tocPageAreaDiv=getPageTocAreaDiv();tocPageAreaDiv.style.maxWidth=width;tocPageAreaDiv.style.minWidth=width}isBeingDragged(){return this.beingDragged}activate(){let splitterDiv=this.getSplitterDiv();splitterDiv.style.width="6pt";splitterDiv.style.background="#cc2222"}deactivate(){if(!this.isBeingDragged()){let splitterDiv=this.getSplitterDiv();splitterDiv.style="3pt";splitterDiv.style.background="#cccccc"}}startDrag(){this.beingDragged=true}stopDrag(){this.beingDragged=false;let sd=this.getSplitterDiv();sd.style.width="3pt";sd.style.background="#cccccc";this.save()}doDrag(e){if(this.isBeingDragged()){let tpad=getPageTocAreaDiv();let scrollbarWidth=tpad.offsetWidth-tpad.clientWidth;let newWidth=(e.clientX-scrollbarWidth-10)+"px";this.resizePageTocAreaDiv(newWidth)}}save(){let currentWidth=getPageTocAreaDiv().style.maxWidth;cook_cookie_set_secx('tocwidth',currentWidth,100000)}restore(){let previousWidth=cook_cookie_get('tocwidth');let tocPageAreaDiv=getPageTocAreaDiv();this.resize(previousWidth)}}var GLOBAL_Splitter=new Splitter("pageSplitter");function getSplitter(){return GLOBAL_Splitter()}const STATUS_OK=0;const ERR_NO_LOCAL_STORAGE=1;class ArnavUiControl extends ArnavBureaucrat{constructor(chief,id){super(chief,id);this.domObject=this.getDomObject();this.domObjectValue=this.getDomObjectValue();this.uiControlValue=this.domObject?this.getUiControlValue():null;this.relevantDomEventsNames=[];this.subscribeOnDomEvents()}getDomObject(){return document.getElementById(this.getId())}getRelevantDomEventNames(){return this.relevantDomEventsNames}addEventListeners(){let domObject=this.getDomObject();if(domObject){let domEventNames=this.getRelevantDomEventNames();for(let i in this.relevantDomEventsNames)domObject.addEventListener(domEventNames[i],e=>{this.edom(e)})}return this}setRelevantDomEvents(){this.relevantDomEventsNames=[];for(let i in arguments)this.relevantDomEventsNames.push(arguments[i]);this.addEventListeners();return this}subscribeOnDomEvents(){}getDomObjectValue(){let domObject=this.getDomObject();return domObject?this.getDomObject().value:this.getId()}setDomObjectValue(domObjectValue){this.getDomObject().value=domObjectValue}assembleEmptyUiControlValue(){return undefined}parseSerializedUiControlValue(serializedUiControlValue){return serializedUiControlValue}assembleDomObjectValue(uiControlValue){return String(uiControlValue)}assembleDomObjectValueAppearance(uiControlValue){return String(uiControlValue)}parseDomObjectValue(domObjectValue){return domObjectValue}serializeUiControlValue(uiControlValue){return String(uiControlValue)}publishUiControlValue(uiControlValue){return String(uiControlValue)}getUiControlValue(){this.domObject=this.getDomObject();this.domObjectValue=this.getDomObjectValue();this.uiControlValue=this.parseDomObjectValue(this.domObjectValue);return this.uiControlValue}setUiControlValue(uiControlValue){this.uiControlValue=uiControlValue;this.domObject=this.getDomObject();this.domObjectValue=this.assembleDomObjectValue(uiControlValue);this.setDomObjectValue(this.domObjectValue)}assembleDom(id){}insertToDom(){let domObject=this.getDomObject();if(domObject)domObject.appendChild(this.assembleDom())}show(){this.getDomObject().style.display=""}hide(){this.getDomObject().style.display="none"}}class ArnavUiToc extends ArnavUiControl{constructor(chief,id,selectedId=undefined,openIds=[]){super(chief,id);this.setSelectedId(selectedId);this.setOpen(openIds);this.insertToDom()}subscribeOnDomEvents(){this.setRelevantDomEvents("click")}setSelectedId(id){this.selectedId=id;return this}getSelectedId(){return this.selectedId}isSelected(entry){return entry.getId()!=this.getSelectedId()}setOpen(openIds){this.open={};for(let i in openIds)if(openIds[i])this.open[openIds[i]]=true}isOpen(id){return!!this.open[id]}getIdSepar(){return"_._"}assembleId(id,suffix){return id+this.getIdSepar()+suffix}extractId(domElementId){return domElementId.split(this.getIdSepar())[0]}extractSuffix(domElementId){return domElementId.split(this.getIdSepar())[1]}getLinkId(id){return this.assembleId(id,"select")}getOpenBoxId(id){return this.assembleId(id,"open")}getCloseBoxId(id){return this.assembleId(id,"close")}getEntryDivId(id){return this.assembleId(id,"div")}getSelectedClassName(entry){return"tocSelected"}getLevelClassName(entry){return"tocLevel"+entry.getLevel()}getLabelClassName(entry){return"tocLabel"}getEntryOuterClassName(entry){return"tocEntryOuter"}getEntryTitleClassName(entry){return entry.hasWorkers()?"tocEntryTitleNode":"tocEntryTitleLeaf"}getEntryInnerClassName(entry){return"tocEntryInner"}assembleEntryOuterClassRefs(entry){return this.getEntryOuterClassName(entry)}assembleTitleLabelClassRefs(entry){let classRefs=[this.getLabelClassName(entry),this.getLevelClassName(entry)];if(this.isSelected(entry))classRefs.push(this.getSelectedClassName(entry));return classRefs.join(" ")}assembleTitleBlockClassRefs(entry){let classRefs=[this.getEntryTitleClassName(entry),this.getLevelClassName(entry)];if(this.isSelected(entry))classRefs.push(this.getSelectedClassName(entry));return classRefs.join(" ")}assembleEntryInnerClassRefs(entry){return this.getEntryInnerClassName(entry)}assembleTocClassRefs(){return"tocTree"}assembleEntryOuterDom(entry){let oDiv=document.createElement("div");oDiv.setAttribute("id",entry.getId());oDiv.setAttribute("class",this.assembleEntryOuterClassRefs(entry));oDiv.appendChild(this.assembleEntryTitleDom(entry));if(entry.hasWorkers())oDiv.appendChild(this.assembleEntryInnerDom(entry));return oDiv}assembleOpenBoxInnerDom(){return document.createTextNode(">")}assembleOpenBoxDom(entry){let oSpan=document.createElement("span");let id=entry.getId();oSpan.setAttribute("id",this.getOpenBoxId(id));oSpan.setAttribute("style","display: "+(this.isOpen(id)?"none":""));oSpan.appendChild(this.assembleOpenBoxInnerDom());return oSpan}assembleCloseBoxInnerDom(){return document.createTextNode("�")}assembleCloseBoxDom(entry){let cSpan=document.createElement("span");let id=entry.getId();cSpan.setAttribute("id",this.getCloseBoxId(id));cSpan.setAttribute("style","display: "+(this.isOpen(id)?"":"none"));cSpan.appendChild(this.assembleCloseBoxInnerDom());return cSpan}assembleEntryLinkDom(entry){}assembleEntryTitleDom(entry){let tDiv=document.createElement("div");if(entry.hasWorkers()){tDiv.appendChild(this.assembleOpenBoxDom(entry));tDiv.appendChild(this.assembleCloseBoxDom(entry))}tDiv.setAttribute("class",this.assembleTitleBlockClassRefs(entry));tDiv.appendChild(this.assembleEntryLinkDom(entry));return tDiv}assembleEntryInnerDom(entry){let iDiv=document.createElement("div");let id=entry.getId();iDiv.setAttribute("id",this.getEntryDivId(id));iDiv.setAttribute("class",this.assembleEntryOuterClassRefs(entry));iDiv.setAttribute("style","display: "+(this.isOpen(id)?"":"none"));let entries=entry.getEntries();for(let idx in entries)iDiv.appendChild(this.assembleEntryOuterDom(entries[idx]));return iDiv}assembleDom(){let tDiv=document.createElement("div");tDiv.setAttribute("id",this.getId());tDiv.setAttribute("class",this.assembleTocClassRefs());let entries=this.getModel().getEntries();for(let i in entries)tDiv.appendChild(this.assembleEntryOuterDom(entries[i]));return tDiv}getOpenIds(){let openIds=[];for(let id in this.open)if(this.open[id])openIds.push(id)return openIds}openEntry(id){let obox=document.getElementById(this.getOpenBoxId(id));let cbox=document.getElementById(this.getCloseBoxId(id));let div=document.getElementById(this.getEntryDivId(id));obox.style.display="none";cbox.style.display="";div.style.display="";this.open[id]=true;return this.getOpenIds()}closeEntry(id){let obox=document.getElementById(this.getOpenBoxId(id));let cbox=document.getElementById(this.getCloseBoxId(id));let div=document.getElementById(this.getEntryDivId(id));obox.style.display="";cbox.style.display="none";div.style.display="none";this.open[id]=false;return this.getOpenIds()}click(issue){}}class ArnavUiTocMultipage extends ArnavUiToc{assembleEntryLinkDom(entry){let wrapper=null;if(entry.hasUri()&&this.isSelected(entry)){wrapper=document.createElement("a");wrapper.setAttribute("id",this.getLinkId(entry.getId()));wrapper.setAttribute("href",entry.getUri())}else wrapper=document.createElement("span");wrapper.setAttribute("class",this.assembleTitleLabelClassRefs(entry));wrapper.appendChild(document.createTextNode(entry.getTitle()));return wrapper}click(issue){let e=issue.getPayload();let id=this.extractId(e.target.id);let op=this.extractSuffix(e.target.id)switch(op){case"open":issue.convert("uitocentry",this.openEntry(id));break;case"close":issue.convert("uitocentry",this.closeEntry(id));break}}}class ArnavUiTocSinglePage extends ArnavUiToc{assembleEntryLinkDom(entry){let wrapper=wrapper=document.createElement("span");if(entry.hasUri()&&this.isSelected(entry)){wrapper=document.createElement("a");wrapper.setAttribute("id",this.getLinkId(entry.getId()))}wrapper.setAttribute("class",this.assembleTitleLabelClassRefs(entry));wrapper.appendChild(document.createTextNode(entry.getTitle()));return wrapper}selectEntry(id){return id}click(issue){let e=issue.getPayload();let id=this.extractId(e.target.id);let op=this.extractSuffix(e.target.id)switch(op){case"open":issue.convert("uitocentry",this.openEntry(id));break;case"close":issue.convert("uitocentry",this.closeEntry(id));break;case"select":issue.convert("uitocentry",this.selectEntry(id));break}}}class ArnavTocArea extends ArnavUiControl{subscribeOnDomEvents(){this.setRelevantDomEvents("scroll")}setScrollState(scrollTop){this.getDomObject().scrollTop=scrollTop}scroll(issue){issue.convert("uitocscroll",this.getDomObject().scrollTop.toString())}}function useful(value,default_value){return value?value:default_value}function createUuid(){var dt=new Date().getTime();var uuid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=(dt+Math.random()*16)%16|0;dt=Math.floor(dt/16);return(c=='x'?r:(r&0x3|0x8)).toString(16)});return uuid}function firstChr(str){return str?str[0]:""}function trimFirstChr(str){return str?str.substring(1):""}function isSubstring(str,substr){return str.indexOf(substr)>-1}function lastChr(str){return str?str[str.length-1]:""}function substringBefore(str,sep){let pos=String(str).indexOf(sep);return pos>-1?str.substring(0,pos):str}function substringAfter(str,sep){let sepStartPos=String(str).indexOf(sep);let substrStartPos=sepStartPos+sep.length;return sepStartPos>-1?str.substring(substrStartPos,str.length):""}function substringReverseBefore(str,sep){let pos=str.lastIndexOf(sep);return pos>-1?str.substring(0,pos):str}function substringReverseAfter(str,sep){let sepStartPos=str.lastIndexOf(sep);let substrStartPos=sepStartPos+sep.length;return sepStartPos>-1?str.substring(substrStartPos,str.length):""}function substringBetween(str,before,after){return substringReverseBefore(substringAfter(str,before),after)}function multiChr(chr,num){return chr.repeat(num)}function capitalizeFirstChr(str){return firstChr(str).toUpperCase()+trimFirstChr(str)}function snakeToCamel(name){function reducer(acc,curr){return acc+capitalizeFirstChr(curr)}return name.split("_").reduce(reducer)}function CamelToSnake(name){let snake="";for(let i=0;i<name.length;i++){let currChr=name.charAt(i);snake+=currChr==currChr.toUpperCase()?"_"+currChr.toLowerCase():currChr}return snake}function safeCompareStrings(s1,s2){if(!Boolean(s1)&&Boolean(s2))return-1;else if(Boolean(s1)&&!Boolean(s2))return 1;else if(!Boolean(s1)&&!Boolean(s2))return 0;else return String(s1).localeCompare(String(s2))}const CHR_ASCII_SAFE_SEP=":";const RXP_ASCII_SAFE_CHRS=/^[A-Za-z\d_\-]*$/;const RXP_ID_RESTRICTED_CHRS=/[^A-Za-z\d]/g;function isAsciiUnsafe(str){console.log("::::",str);return!str.match(RXP_ASCII_SAFE_CHRS)}function isAsciiSafeEncoded(str){return String(str).includes(CHR_ASCII_SAFE_SEP)}function asciiSafeToken(chr){return chr.charCodeAt(0).toString()}function asciiSafeChr(token){return String.fromCharCode(parseInt(token))}function asciiSafeEncode(str){console.log(str);return isAsciiUnsafe(str)?CHR_ASCII_SAFE_SEP+str.split("").map(asciiSafeToken).join(CHR_ASCII_SAFE_SEP):str}function asciiSafeDecode(str){return isAsciiSafeEncoded(str)?trimFirstChr(str).split(CHR_ASCII_SAFE_SEP).map(asciiSafeChr).join(""):str}function idSafeEncode(str){let rawId=encodeURIComponent(str).replace(RXP_ID_RESTRICTED_CHRS,"_");return rawId.match(/^\d.*/)?"_":""+rawId}function loadFromLocalStorage(itemName){return!!window.localStorage?useful(window.localStorage.getItem(itemName),""):undefined}function saveToLocalStorage(itemName,itemValue){let statusCode=STATUS_OK;if(!!window.localStorage)window.localStorage.setItem(itemName,itemValue)else statusCode=ERR_NO_LOCAL_STORAGE;return statusCode}