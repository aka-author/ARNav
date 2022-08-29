/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	utils.js                                  (\(\
 Func:		Service functions                         (^.^)                                                
* * ** *** ***** ******** ************* *********************/

// Struggling empty values

function useful(value, default_value) {
	return !!value ? value : default_value; 
}


// UUID

function createUuid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


// Characters and strings

function firstChr(str) {
	return str ? str[0] : "";
}

function trimFirstChr(str) {
	return str ? str.substring(1) : "";
}

function isSubstring(str, substr) {
	return str.indexOf(substr) > -1;
}

function lastChr(str) {
	return str ? str[str.length - 1] : "";
}

function substringBefore(str, sep) {
	let pos = String(str).indexOf(sep);
	return pos > -1 ? str.substring(0, pos) : str;
}

function substringAfter(str, sep) {
	let sepStartPos = String(str).indexOf(sep);
	let substrStartPos = sepStartPos + sep.length;
	return sepStartPos > -1 ? str.substring(substrStartPos, str.length) : "";
}

function substringReverseBefore(str, sep) {
	let pos = str.lastIndexOf(sep);
	return pos > -1 ? str.substring(0, pos) : str;
}

function substringReverseAfter(str, sep) {
	let sepStartPos = str.lastIndexOf(sep);
	let substrStartPos = sepStartPos + sep.length;
	return sepStartPos > -1 ? str.substring(substrStartPos, str.length) : "";
}

function substringBetween(str, before, after) {
	return substringReverseBefore(substringAfter(str, before), after);
}

function multiChr(chr, num) {
	return chr.repeat(num);
}

function capitalizeFirstChr(str) {
	return firstChr(str).toUpperCase() + trimFirstChr(str);
}

function snakeToCamel(name) {
	
	function reducer(acc, curr) {
		return acc + capitalizeFirstChr(curr);
	}

	return name.split("_").reduce(reducer);	
}

function CamelToSnake(name) {

	let snake = "";
	
	for(let i = 0; i < name.length; i++) { 
		let currChr = name.charAt(i);
		snake += currChr == currChr.toUpperCase() ? 
					"_" + currChr.toLowerCase() : 
					currChr;
	}	

	return snake;
}

function safeCompareStrings(s1, s2) {
	
	if(!Boolean(s1) && Boolean(s2))
		return -1;
	else 
		if(Boolean(s1) && !Boolean(s2))
			return 1;
		else 
			if(!Boolean(s1) && !Boolean(s2))
				return 0;
			else
				return String(s1).localeCompare(String(s2));	
}


// ASCII safe encoding

const CHR_ASCII_SAFE_SEP     = ":";
const RXP_ASCII_SAFE_CHRS    = /^[A-Za-z\d_\-]*$/; 
const RXP_ID_RESTRICTED_CHRS = /[^A-Za-z\d]/g;

function isAsciiUnsafe(str) {
	return !str.match(RXP_ASCII_SAFE_CHRS);
}

function isAsciiSafeEncoded(str) {
	return String(str).includes(CHR_ASCII_SAFE_SEP);
}

function asciiSafeToken(chr) {
	return  chr.charCodeAt(0).toString();
}

function asciiSafeChr(token) {
	return String.fromCharCode(parseInt(token));
}

function asciiSafeEncode(str) {

	return isAsciiUnsafe(str) ? 
				CHR_ASCII_SAFE_SEP + 
				str.split("").map(asciiSafeToken).join(CHR_ASCII_SAFE_SEP) : 
				str; 
}

function asciiSafeDecode(str) {

	return isAsciiSafeEncoded(str) ? 
				trimFirstChr(str).split(CHR_ASCII_SAFE_SEP).map(asciiSafeChr).join("") : 
				str;
}

function idSafeEncode(str) {
	
	let rawId = encodeURIComponent(str).replace(RXP_ID_RESTRICTED_CHRS, "_");
	
	return rawId.match(/^\d.*/) ? "_" : "" + rawId;
}


// Accessing a local storage

function loadFromLocalStorage(itemName) {
	
	let output = {"statusCode": ERR_NO_LOCAL_STORAGE, "value": undefined};

	if(!!window.localStorage) {
		try {
			output.value = window.localStorage.getItem(itemName);
			output.statusCode = STATUS_OK;
		} catch {
			output.statusCode = ERR_LOCAL_STORAGE_FAILURE;
		}
	}

	return output;
}

function saveToLocalStorage(itemName, itemValue) {
	
	let statusCode = ERR_NO_LOCAL_STORAGE;
	
	if(!!window.localStorage) {
		try {
			window.localStorage.setItem(itemName, itemValue);
			statusCode = STATUS_OK;
		} catch {
			output.statusCode = ERR_LOCAL_STORAGE_FAILURE;
		}
	}

	return statusCode;
}


// Retrieving environment params

function getBrowserName() {
	return window.navigator.userAgent;
}

function getOsName() {
	return substringBetween(window.navigator.userAgent, "(", ";");
}

function isMobile() {
	if(window.navigator.userAgentData)
		return window.navigator.userAgentData.mobile;
	else
		return false
}


// HTML and DOM

function checkElementById(id) {
	return !!document.getElementById(id);
}/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	domutils.js                              (\(\
 Func:		Accessing DOM features                   (^.^)
* * ** *** ***** ******** ************* *********************/

const ARNAV_DOM_EVENTS = [
"abort",  
"activate",  
"addstream",  
"addtrack",  
"afterprint",  
"afterscriptexecute",  
"animationcancel",  
"animationend",  
"animationiteration",  
"animationstart",  
"appinstalled",  
"audioend",  
"audioprocess",  
"audiostart",  
"auxclick",  
"beforeinput",  
"beforeprint",  
"beforescriptexecute",  
"beforeunload",  
"beginEvent",  
"blocked",  
"blur",  
"boundary",  
"bufferedamountlow",  
"cancel",  
"canplay",  
"canplaythrough",  
"change",  
"click",  
"close",  
"closing",  
"complete",  
"compositionend",  
"compositionstart",  
"compositionupdate",  
"connect",  
"connectionstatechange",  
"contentdelete",  
"contextmenu",  
"copy",  
"cuechange",  
"cut",  
"datachannel",  
"dblclick",  
"devicechange",  
"devicemotion",  
"deviceorientation",  
"DOMActivate",  
"DOMContentLoaded",  
"DOMContentLoaded",  
"DOMMouseScroll",  
"drag",  
"dragend",  
"dragenter",  
"dragleave",  
"dragover",  
"dragstart",  
"drop",  
"durationchange",  
"emptied",  
"end",  
"ended",  
"endEvent",  
"enterpictureinpicture",  
"error",  
"focus",  
"focusin",  
"focusout",  
"formdata",  
"fullscreenchange",  
"fullscreenerror",  
"gamepadconnected",  
"gamepaddisconnected",  
"gatheringstatechange",  
"gesturechange",  
"gestureend",  
"gesturestart",  
"gotpointercapture",  
"hashchange",  
"icecandidate",  
"icecandidateerror",  
"iceconnectionstatechange",  
"icegatheringstatechange",  
"IDBTransaction", 
"input",  
"inputsourceschange",  
"install",  
"invalid",  
"keydown",  
"keypress",  
"keyup",  
"languagechange",  
"leavepictureinpicture",  
"load",  
"loadeddata",  
"loadedmetadata",  
"loadend",  
"loadstart",  
"lostpointercapture",  
"mark",  
"merchantvalidation",  
"message",  
"messageerror",  
"mousedown",  
"mouseenter",  
"mouseleave",  
"mousemove",  
"mouseout",  
"mouseover",  
"mouseup",  
"mousewheel",  
"msContentZoom",  
"MSGestureChange",  
"MSGestureEnd",  
"MSGestureHold",  
"MSGestureStart",  
"MSGestureTap",  
"MSInertiaStart",  
"MSManipulationStateChanged",  
"mute",  
"negotiationneeded",  
"nomatch",  
"notificationclick",  
"offline",  
"online",  
"open",  
"orientationchange",  
"pagehide",  
"pageshow",  
"paste",  
"pause",  
"payerdetailchange",  
"paymentmethodchange",  
"play",  
"playing",  
"pointercancel",  
"pointerdown",  
"pointerenter",  
"pointerleave",  
"pointerlockchange",  
"pointerlockerror",  
"pointermove",  
"pointerout",  
"pointerover",  
"pointerup",  
"popstate",  
"progress",  
"push",  
"pushsubscriptionchange",  
"ratechange",  
"readystatechange",  
"rejectionhandled",  
"removestream",  
"removetrack",  
"removeTrack",  
"repeatEvent",  
"reset",  
"resize",  
"resourcetimingbufferfull",  
"result",  
"resume",  
"scroll",  
"search",  
"seeked",  
"seeking",  
"select",  
"selectedcandidatepairchange",  
"selectend",  
"selectionchange",  
"selectstart",  
"shippingaddresschange",  
"shippingoptionchange",  
"show",  
"signalingstatechange",  
"slotchange",  
"soundend",  
"soundstart",  
"speechend",  
"speechstart",  
"squeeze",  
"squeezeend",  
"squeezestart",  
"stalled",  
"start",  
"statechange",  
"storage",  
"submit",  
"success",  
"suspend",  
"timeout",  
"timeupdate",  
"toggle",  
"tonechange",  
"touchcancel",  
"touchend",  
"touchmove",  
"touchstart",  
"track",  
"transitioncancel",  
"transitionend",  
"transitionrun",  
"transitionstart",  
"unhandledrejection",  
"unload",  
"unmute",  
"upgradeneeded",  
"versionchange",  
"visibilitychange",  
"voiceschanged",  
"volumechange",  
"vrdisplayactivate",  
"vrdisplayblur",  
"vrdisplayconnect",  
"vrdisplaydeactivate",  
"vrdisplaydisconnect",  
"vrdisplayfocus",  
"vrdisplaypointerrestricted",  
"vrdisplaypointerunrestricted",  
"vrdisplaypresentchange",  
"waiting",  
"webglcontextcreationerror",  
"webglcontextlost",  
"webglcontextrestored",  
"webkitmouseforcechanged",  
"webkitmouseforcedown",  
"webkitmouseforceup",  
"webkitmouseforcewillbegin",  
"wheel"];

function getAvailableDomEventNames() {
    return ARNAV_DOM_EVENTS;
}

/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	status.js                                 (\(\
 Func:		handling outcomes and errors              (^.^)
* * ** *** ***** ******** ************* *********************/

const STATUS_OK = 0;
const ERR_NO_LOCAL_STORAGE = 1;
const ERR_LOCAL_STORAGE_FAILURE = 2;/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	issue.js                                   (\(\
 Func:		Representing events occurring in a system  (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavIssue {

	constructor(iType="generic", payload=null) {
		this.setType(iType);
		this.setPayload(payload);
		this.setId();
		this.src = null; 
		this.sender = null;
		this.resetResolvers();
		this.activate();
	}

	setType(iType) {
		this.iType = iType;
		return this;
	}

	getType() {
		return this.iType;
	}

	setPayload(payload) {
		this.payload = payload;
		return this;
	}

	getPayload() {
		return this.payload;
	}

	setId(id=undefined) {
		this.id = id ? id : createUuid();
		return this;
	}

	getId() {
		return this.id;
	}

	setSrc(src) {
		this.src = src;
		return this;
	}

	hasSrc() {
		return !!this.src;
	}

	getSrc() {
		return this.src;
	}

	setSender(bureaucrat) {
		this.sender = bureaucrat;
		return this;
	}

	getSender() {
		return this.sender;
	}

	registerResolver(bureaucrat) {
		this.resolvers.push(bureaucrat);
		this.revResolvers[bureaucrat.getId()] = true;
		return this;
	}

	hasResolverWithId(bureaucratId) {
		return this.revResolvers[bureaucratId];
	}

	hasResolver(bureaucrat) {
		return this.hasResolverWithId(bureaucrat.getId());
	}

	resetResolvers() {
		this.resolvers = [];
		this.revResolvers = {};
		return this;
	}

	copyResolvers(issue) {
		for(let i in issue.resolvers)
			this.registerResolver(issue.resolvers[i]);
		return this;
	}

	activate() {
		this.active = true;
		return this;
	}

	terminate() {
		this.active = false;
		return this;
	}

	isActive() {
		return this.active;
	}

	isTerminated() {
		return !this.active;
	}

	convert(iType="generic", payload=null) {

		let src = new ArnavIssue(this.getType(), this.getPayload());
		this.setSrc(src.setId(this.getId()).setSrc(this.getSrc()).copyResolvers(this).terminate());
		
		this.setType(iType).setPayload(payload);

		return this;
	}
}/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	arnavtype.js                              (\(\
 Func:      Standard ARNav types                      (^.^)
* * ** *** ***** ******** ************* *********************/

const ARNAV_TYPE_BUREAUCRAT = "bureaucrat";
const ARNAV_TYPE_CONTROL = "control";
const ARNAV_TYPE_CONSOLE = "console";
const ARNAV_TYPE_FRAMELET = "framelet";
const ARNAV_TYPE_SHORTCUT = "shortcut";
/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	bureaucrat.js                             (\(\
 Func:		Generic methods for resolving issues      (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavBureaucrat {

	constructor(chief=null, id=undefined) {

		this.assignType(ARNAV_TYPE_BUREAUCRAT);
		
		this.chief = chief;
		this.id = id ? id : createUuid();
		this.cfg = null;
		this.model = null;
		this.page = null;
		this.workers = [];
		this.workersById = {};
		if(chief) chief.registerWorker(this);
		this.setupProperties();
	}
	
	assignType(typeName) {
		if(!this.types) this.types = {};
		this.types[typeName] = true;
	}

	hasType(typeName) {
		return this.types && this.types[typeName];
	}

	setupProperties() {
		/* abstract */
	}

	hasChief() {
		return !!this.chief;
	}
	
	getChief() {
		return this.chief;
	}
		
	getId() {
		return this.id;
	}

	beforeRegisterWorker(bureaucrat) {
		/* abstract */
	}

	afterRegisterWorker(bureaucrat) {
		/* abstract */
	}
	
	registerWorker(bureaucrat) {
		this.beforeRegisterWorker(bureaucrat)
		this.workers.push(bureaucrat);
		this.workersById[bureaucrat.getId()] = bureaucrat;
		this.afterRegisterWorker(bureaucrat)
		return this;
	}

	getWorkers(typeName=undefined) {

		let workers = [];
		
		if(!!typeName) {
			for(let i in this.workers) 
				if(this.workers[i].hasType(typeName))
					workers.push(this.workers[i]);
		} else
			workers = this.workers;
		
		return workers;
	}

	hasWorkers(typeName=undefined) {
		return this.getWorkers(typeName).length > 0;
	}

	countWorkers(typeName=undefined) {
		return this.getWorkers(typeName).length;
	}

	getWorkerByIdx(idx) {
		return this.workers[idx];
	}

	getWorkerById(id) {
		return this.workersById[id];
	}

	getProp(propName) {
		return this[propName] ? this[propName] : (this.hasChief() ? this.getChief().getProp(propName) : null);
	}

	isApp() {
		return false;
	}
	
	getApp() {
		return this.getProp("app");
	}

	getCfg() {
		return this.getProp("cfg");
	}

	setModel(model) {
		this.model = model;
		return this;
	}

	getModel() {
		return this.getProp("model");
	}

	setPage(page) {
		this.page = page;
		return this;
	}

	getPage() {
		return this.getProp("page");
	}

	createIssue(iType=ITYPE_GENERIC, payload=null) {
		return new ArnavIssue(iType, payload);
	}

	assembleHandleFuncName(iTypeName, envTypeName=undefined) {
		return "handle__" + iTypeName + (!!envTypeName ? "__" + envTypeName : "");
	}

	hasHandleFunc(iTypeName, envTypeName=undefined) {
		let handleFuncName = this.assembleHandleFuncName(iTypeName, envTypeName);
		return typeof this[handleFuncName] === "function";
	}

	handle(issue) {
		/* abstract */
	}

	dispatch(issue) {
		let iTypeName = issue.getType();
		let handleFuncName = this.assembleHandleFuncName(iTypeName);
		typeof this[handleFuncName] === "function" ? this[handleFuncName](issue) : this.handle(issue);
	}

	attempt(issue) {
		this.dispatch(issue);
	}

	delegate(issue, bureaucrat) {
		bureaucrat.resolve(issue);
	}

	escalate(issue) {
		if(issue.isActive() && this.hasChief()) this.delegate(issue, this.getChief());
	}

	downstream(issue) {
		let workerIdx = 0;
		while(issue.isActive() && workerIdx < this.countWorkers()) 
			this.delegate(issue, this.getWorkerByIdx(workerIdx++));	
	}

	canResolve(issue) {
		return !issue.hasResolver(this); 
	}

	resolve(issue) {
		
		if(this.canResolve(issue)) {
			
			issue.registerResolver(this);

			this.attempt(issue);
			this.downstream(issue);
			this.escalate(issue);
		}
		
		return this;
	}

	mapDomEventType(e) {
		return e.type;
	}

	edom(e) {
		//e.stopPropagation();
		this.resolve(this.createIssue(this.mapDomEventType(e), e).setSender(this));
	}

	sendIssue(issue, bureaucrat) {
		this.delegate(issue.setSender(this), bureaucrat);
	}
}/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	cfg.js                                     (\(\
 Func:		Saving and loading user's configuration    (^.^)
* * ** *** ***** ******** ************* *********************/
	
const CFG_UI_LANG_CODE = "runtime.i18n.uiLangCode";


class ArnavCfgDefaultProp {

		constructor(defaultPropDto) {
			this.path = defaultPropDto.property["@path"];
			this.mutability = defaultPropDto.property["@mutability"];
			this.content = defaultPropDto.property["@content"];
		}

		getPath() {
			return this.path;
		}

		getMutability() {
			return this.mutability ? this.mutability.toLowerCase() : undefined;
		}

		isMutable() {
			return !!this.getMutability()
		}

		isSysMutable() {
			return this.getMutability() === "sys";
		}

		isDocMutable() {
			return this.getMutability() === "doc";
		}

		getContent() {
			return this.content;
		}
}


class ArnavCfg {
	
	constructor() {
		this.defaultProps = [];
		this.defaultPropsByPaths = {};
		this.mutableProps = {"sys": {}, "doc": {}};
	}		


	// Building a configuration object

	createDefaultProp(propDto) {
		return new ArnavCfgDefaultProp(propDto);
	}
	
	addDefaultProp(propDto) {
		let prop = this.createDefaultProp(propDto);
		this.defaultProps.push(prop);
		this.defaultPropsByPaths[prop.getPath()] = prop;
	}

	loadDefaultProps(defaultPropsDto) {

		for(let prop of defaultPropsDto.cfg) 
			this.addDefaultProp(prop)
		
		return this;
	}


	// Accessing values of configuration properties 

	existsDoc(docId) {
		return !!this.mutableProps.doc[docId];
	}

	checkDoc(docId) {
		if(!this.existsDoc(docId)) this.mutableProps.doc[docId] = {};
	}
	
	existsDefaultProp(propPath) {
		return !!this.defaultPropsByPaths[propPath];
	}

	isMutable(propPath) {
		return this.existsDefaultProp(propPath) ? 
			this.getDefaultProp(propPath).isMutable() : false;
	}

	isSysMutable(propPath) {
		return this.existsDefaultProp(propPath) ? 
			this.getDefaultProp(propPath).getMutability() === "sys" : false;
	}

	isDocMutable(propPath) {
		return this.existsDefaultProp(propPath) ? 
			this.getDefaultProp(propPath).getMutability() === "doc" : false;
	}

	pokeMutableProp(propPath, propVal, docId=undefined) {
			
		if(this.isDocMutable(propPath) && docId) {
			this.checkDoc(docId);
			this.mutableProps.doc[docId][propPath] = propVal;		
		} else {
			if(this.isSysMutable(propPath))
				this.mutableProps.sys[propPath] = propVal;
		}
	}
	
    peekMutableProp(propPath, docId=undefined) {

		let propVal = "";

		if(this.isDocMutable(propPath) && docId) {
			if(this.existsDoc(docId)) 
				propVal = useful(this.mutableProps.doc[docId][propPath], "");	
		} else {
			if(this.isSysMutable(propPath))
				propVal = useful(this.mutableProps.sys[docId][propPath], "");;
		}
		
		return propVal;
	}

	getDefaultProp(propPath) {
		return this.defaultPropsByPaths[propPath];
	}

	getDefaultPropContent(propPath) {
		return this.existsDefaultProp(propPath) ? this.getDefaultProp(propPath).getContent() : "";
	}


	// Setting and getting values of configuration properties 

	setProp(propPath, propVal, docId=undefined) {
		if(this.isMutable(propPath)) 
			this.pokeMutableProp(propPath, propVal, docId)
	}

	getProp(propPath, docId=undefined) {	 
		return this.isMutable(propPath) ? 
			useful(this.peekMutableProp(propPath, docId), this.getDefaultPropContent(propPath)) : 
			this.getDefaultPropContent(propPath);
	}
		

	// Saving and loading values of mutable configuraation properties

	assembleJson() {		
		return JSON.stringify(this.mutableProps);
	}

	unpackFromJson(propsJson) {
		
		let parseSuccess = true;
		
		let props = {};
	
		try {
			props = JSON.parse(propsJson);
			parseSuccess = !!props ? parseSuccess = props.sys && props.doc : false;
		}
		catch(e) {
			parseSuccess = false;
		}			
				
		if(parseSuccess) 
			this.mutableProps = props;
						
		return parseSuccess;
	}


	// Testing system parameters

	getBrowserName() {
		return getBrowserName();
	}

	getOsName() {
		return getOsName();
	}

	isMobile() {
		return isMobile();
	}

	getBrowserLangCode() {
		return navigator.language.substring(0, 2);
	}
	
    setUiLangCode(langCode) {
		this.setProp(CFG_UI_LANG_CODE, langCode);
	}

	getUiLangCode() {
		let langCode = this.getProp(CFG_UI_LANG_CODE);
		return langCode ? langCode : this.getBrowserLangCode();
	}
	
}/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	control.js                               (\(\
 Func:      Managing DOM objects                     (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavSize {

	constructor(left=0, top=0, width=0, height=0, maximized=false, folded=false) {
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
		this.maximized = maximized;
		this.folded = folded;
	}
}


class ArnavControl extends ArnavBureaucrat {
	
	constructor(chief, id) {
		
		super(chief, id);

		this.assignType(ARNAV_TYPE_CONTROL);			
		this.domObjectValue = this.getDomObjectValue();
		this.controlValue = this.domObject ? this.getControlValue() : null;
		this.normalSize = this.createSize();
		this.maximized = false;
		this.folded = false;
	}

	getDomObject() {
		return document.getElementById(this.getId());
	}

	checkDomObject() {
		return !!this.getDomObject();
	}

	getAvailableDomEventNames() {
		return getAvailableDomEventNames();
	}

	detectRelevantDomEventNames() {

		let relevantDomEventsNames = [];

		let eventNames = this.getAvailableDomEventNames();

		for(let i in eventNames)
			if(this.hasHandleFunc(eventNames[i]))
				relevantDomEventsNames.push(eventNames[i]);

		return relevantDomEventsNames;
	}

	addEventListener(domEventName) {
		this.getDomObject().addEventListener(domEventName, e => {this.edom(e)});
	}

	addEventListeners(domEventNames) {

		if(this.checkDomObject()) 		
			domEventNames.forEach(enm => {this.addEventListener(enm, e => {this.edom(e)})});
		
		return this;
	}

	subscribeOnDomEvents() {
		this.addEventListeners(this.detectRelevantDomEventNames());
		return this;
	}

	assembleDom() {

		/* The function is supposed to return a DOM object of an array of DOM objects */
		
		return null;
	}

	implantDom(domInner) {

		if(!!domInner && this.checkDomObject()) {
			
			let domChildren = (typeof domInner === "array") ? domInner : [domInner];
			
			let domObject = this.getDomObject();

			for(let i in domChildren)
				domObject.appendChild(domChildren[i]);
		}

		return this;
	}

	bindDomObject() {

		if(this.checkDomObject()) {
			this.implantDom(this.assembleDom());
			this.subscribeOnDomEvents();
			this.saveNormalSize();
		}

		return this;
	}
	
	getDomObjectValue() { 	
		let domObject = this.getDomObject();
		return domObject ? this.getDomObject().value : this.getId();
	}
	
	setDomObjectValue(domObjectValue) {
		this.getDomObject().value = domObjectValue;
	}

	assembleEmptyControlValue() {
		return undefined;
	}
	
	// when picking from a file
	parseSerializedControlValue(serializedControlValue) {
		return serializedControlValue;
	}
	
	// when loading a value to a DOM object, e.g. select/option/@value
	assembleDomObjectValue(controlValue) {
		return String(controlValue);
	}
	
	// when loading a representation to a DOM object, e.g. select/option
	assembleDomObjectValueAppearance(controlValue) {
		return String(controlValue);
	}
	
	// when retrieving a value from a DOM object
	parseDomObjectValue(domObjectValue) {
		return domObjectValue;
	}
	
	// when saving to a file
	serializeControlValue(controlValue) {
		return String(controlValue);
	}
	
	// when displaying a value out of a control
	publishControlValue(controlValue) {
		return String(controlValue);
	}	
	
	getControlValue() {
		this.domObject = this.getDomObject();
		this.domObjectValue = this.getDomObjectValue();
		this.controlValue = this.parseDomObjectValue(this.domObjectValue);
		return this.controlValue;
	}
	
	setControlValue(controlValue) {
		this.controlValue = controlValue;
		this.domObject = this.getDomObject();
		this.domObjectValue = this.assembleDomObjectValue(controlValue);
		this.setDomObjectValue(this.domObjectValue);
	}		
	
	show() {
		this.getDomObject().style.display = "";
	}
	
	hide() {
		this.getDomObject().style.display = "none";
	}

	getLeft() {
        let domObject = this.getDomObject();
        return domObject ? domObject.offsetLeft : undefined;
    }

    setLeft(pxLeft) {

        if(this.checkDomObject()) {
			console.log(pxLeft);
            let domObject = this.getDomObject();
            domObject.style.left = pxLeft + "px";
			console.log(this.getLeft());
        }

        return this;
    }

	getTop() {
        let domObject = this.getDomObject();
        return domObject ? domObject.offsetTop : undefined;
    }

    setTop(pxTop) {

        if(this.checkDomObject()) {
            let domObject = this.getDomObject();
            domObject.style.top = pxTop + "px";
        }

        return this;    
    }

    getRight() {
        let domObject = this.getDomObject();
        return domObject ? domObject.offsetLeft + domObject.clientWidth : undefined;
    }

	setRight(pxRight) {
		this.resizeRight(pxRight - this.getRight());
		return this;
	}

	getBottom() {
        let domObject = this.getDomObject();
        return domObject ? domObject.offsetTop + domObject.clientHeight : undefined;
    }

	setBottom(pxBottom) {
		this.resizeBottom(pxBottom - this.getBottom());
		return this;
	}

    getWidth() {
        let domObject = this.getDomObject();
        return domObject ? domObject.clientWidth : undefined;
    }

    setWidth(pxWidth) {

        if(this.checkDomObject()) {
            let domObject = this.getDomObject();
            domObject.style.width = pxWidth + "px";
        }

        return this;    
    }

    getHeight() {
        let domObject = this.getDomObject();
        return domObject ? domObject.clientHeight : undefined;
    }

    setHeight(pxHeight) {

        if(this.checkDomObject()) {
            let domObject = this.getDomObject();
            domObject.style.height = pxHeight + "px";
        }

        return this;    
    }

	resizeLeft(pxDelta) {

		let currLeft = this.getLeft();
		let currWidth = this.getWidth();
		let newLeft = currLeft + pxDelta;
		let newWidth = currWidth - pxDelta;

		this.setLeft(newLeft).setWidth(newWidth);

		return this;
	}

	resizeRight(pxDelta) {

		let currWidth = this.getWidth();
		let newWidth = currWidth + pxDelta;

		this.setWidth(newWidth);

		return this;
	}

	resizeBottom(pxDelta) {

		let currHeight = this.getHeight();
		let newHeight = currHeight + pxDelta;

		this.setHeight(newHeight);

		return this;
	}

	stratch() {
		let chief = this.getChief();
		this.setSize4(0, 0, chief.getInnerWidth(), chief.getInnerHeight());
	}

	getInnerWidth() {
		return this.getWidth();
	}

	getInnerHeight() {
		return this.getHeight();
	}

	createSize(left=0, top=0, width=0, height=0, maximized=false, folded=false) {
		return new ArnavSize(left, top, width, height, maximized, folded);
	}

	getSize() {
		return this.createSize(this.getLeft(), this.getTop(), 
							   this.getWidth(), this.getHeight(),
			                   this.isMaximized(), this.isFolded());
	}

	setSize(size) {
		return this.setTop(size.top).setLeft(size.left).setWidth(size.width).setHeight(size.height);
	}

	setSize4(left, top, width, height) {
		return this.setSize(this.createSize(left, top, width, height));
	}

	isNormalized() {
		return !this.isMaximized() && !this.isFolded();
	}

	getNormalSize() {
		return this.normalSize;
	}

	setNormalSize(size) {
		this.normalSize = size;
	}

	saveNormalSize() {
		if(this.isNormalized()) this.normalSize = this.getSize();
	}

	getNormalLeft() {
		return this.getNormalSize().left;
	}

	getNormalTop() {
		return this.getNormalSize().top;
	}

	getNormalWidth() {
		return this.getNormalSize().width;
	}

	getNormalHeight() {
		return this.getNormalSize().height;
	}

	beforeNormalize() {

	}

	normalizeTask() {
		if(this.isFolded()) this.show();
		this.setSize(this.getNormalSize());
	}

	afterNormalize() {

	}

	normalize() {

		if(!this.isNormalized()) {
			this.beforeNormalize();
			this.normalizeTask();
			this.afterNormalize();	
			this.maximized = false;
			this.folded = false;
		}

		return this;
	}

	isMaximized() {
		return this.maximized;
	}

	beforeMaximize() {

	}

	maximizeTask() {
		this.stratch();
	}

	afterMaximize() {

	}

	maximize() {

		if(!this.isMaximized()) {
			this.saveNormalSize();
			this.beforeMaximize();
			this.maximizeTask();
			this.afterMaximize();
			this.maximized = true;
		}

		return this;
	}

	isFolded() {
		return this.folded;
	}

	beforeFold() {

	}

	foldTask() {
		this.hide();
	}

	afterFold() {

	}

	fold() {

		if(!this.isFolded()) {
			this.saveNormalSize();
			this.beforeFold();
			this.foldTask();
			this.afterFold();
			this.folded = true;
		}

		return this;
	}

	setZIndex(zIndex) {
		if(this.checkDomObject())
			this.getDomObject().style.zIndex = zIndex;
		return this;
	}

	getZIndex() {
		return this.checkDomObject() ? useful(this.getDomObject().style.zIndex, 0) : 0; 
	}

	getZIndexMax() {

		let zIndexMax = 0;

		if(this.hasWorkers()) {
			let zIndexMax = this.getWorkerByIdx(0).getZIndex();
			for(let i = 1; i < this.countWorkers(); i++) {
				let zIndex = this.getWorkerByIdx(i).getZIndex();
				zIndexMax = zIndexMax < zIndex ? zIndex : zIndexMax;
			}
		}

		return zIndexMax
	}

	getZIndexMin() {

		let zIndexMin = 0;

		if(this.hasWorkers()) {
			let zIndexMin = this.getWorkerByIdx(0).getZIndex();
			for(let i = 1; i < this.countWorkers(); i++) {
				let zIndex = this.getWorkerByIdx(i).getZIndex();
				zIndexMin = zIndexMin > zIndex ? zIndex : zIndexMin;
			}
		}

		return zIndexMin
	}

	bringToFront(targetWorker) {
		targetWorker.setZIndex(this.getZIndexMax() + 1);		
		return this;
	}

	bringToBack(targetWorker) {
		targetWorker.setZIndex(this.getZIndexMin() - 1);		
		return this;
	}

	goToFront() {
		this.getChief().bringToFront(this);
		return this;
	}

	goToBack() {
		this.getChief().bringToBack(this);
		return this;
	}

	handle__resize(issue) {
		if(this.isMaximized())
			this.stratch();
	}
}/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	area.js                              (\(\
 Func:      Implementing areas                   (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavScrollArea extends ArnavControl {
	
	setHScrollState(scrollLeft) {
		this.getDomObject().scrollTop = scrollLeft; 
	}

    setVScrollState(scrollTop) {
		this.getDomObject().scrollTop = scrollTop; 
	}

	handle__scroll(issue) {
        issue.convert("uitocscroll", this.getDomObject().scrollTop.toString());
	}
}/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	page.js                                   (\(\
 Func:      The top of controls' hierarchy (<body>)   (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavPage extends ArnavControl {

    constructor(chief, id) {
        super(chief, id);
        this.page = this;
    }

    getDomObject() {
        return document.getElementsByTagName("body")[0];
    }

    addEventListener(domEventName) {
        let eventAttrName = "on" + domEventName;
        let globalAppName = this.getApp().getGlobalAppName();
        let callCode = globalAppName + ".getPage().edomBody('" + domEventName + "')";
        let bodyObject = this.getDomObject();
        bodyObject.setAttribute(eventAttrName, callCode);
    }

    edomBody(eType) {
        this.edom(new CustomEvent(eType, {"detail": this.getDomObject()}));
    }

    handle__resize(issue) {

        let body = issue.getPayload().detail;

        let rect = {
            "top": body.clientTop,
            "left": body.clientLeft,
            "width": body.clientWidth,
            "height": body.clientHeight
        };
        
        issue.convert("resize", rect)
    }

}/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:	doc.js                                   (\(\
 Func:		Managing document data                   (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavTocEntry extends ArnavBureaucrat {

	constructor(chief, id, title, uri=undefined) {
		
		super(chief, id);
		
		this.title = title;
		this.uri = uri;
	}

	getTitle() {
		return this.title;
	}

	hasUri() {
		return !!this.uri;
	}

	getUri() {
		return this.uri;
	}

	getLevel() {
		return this.getChief().getLevel() + 1;
	}

	matchUri(uri) {
		let clauses = uri.split("/");
		return clauses[clauses.length-1] == this.getUri();	
	}

	getEntries() {
		return this.workers;
	}
}


class ArnavDoc extends ArnavBureaucrat {

	getLevel() {
		return 0;
	}

	createEntryOfDto(chief, entryDto) {
		return new ArnavTocEntry(chief, entryDto.entry['@id'], 
									entryDto.entry['@title'], entryDto.entry['@uri']);
	}

	extractTocEntriesFromDto(dto) {
		return dto["entries"];
	}

	loadEntryFromDto(chief, entryDto) {
		let entry = this.createEntryOfDto(chief, entryDto);
		this.entriesByUri[entry.getUri] = entry; 
		if(entryDto.entry.entries)
			this.loadEntriesFromDto(entry, entryDto.entry.entries);
		return entry;	
	}

	loadEntriesFromDto(chief, entriesDtoArray) {
		for(let i in entriesDtoArray) {
			this.loadEntryFromDto(chief, entriesDtoArray[i]);
		}
	}

	loadFromDto(dto) {
		this.id = dto["entry"]["@id"];
		this.title = dto["entry"]["@title"];
		this.entriesByUri = {};
		this.loadEntriesFromDto(this, this.extractTocEntriesFromDto(dto["entry"])); 
	}
	
	getEntries() {
		return this.workers;
	}

}
/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:    toctree.js                               (\(\
 Func:		Displaying a global TOC                  (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavTocTree extends ArnavScrollArea {
	
	constructor(chief, id, selectedId=undefined, openIds=[]) {
		super(chief, id);
        this.setSelectedId(selectedId);
        this.setOpen(openIds);
	}

    setSelectedId(id) {
        this.selectedId = id;
        return this;
    }

    getSelectedId() {
        return this.selectedId;
    }

    isSelected(entry) {
        return entry.matchUri(window.location.href);
    }

    setOpen(openIds) {
        this.open = {};
        for(let i in openIds)
            if(openIds[i])
                this.open[openIds[i]] = true;
    }

    isOpen(id) {
        return !!this.open[id];
    }

    getIdSepar() {
        return "_._";
    }

    assembleId(id, suffix) {
        return id + this.getIdSepar() + suffix;
    }

    extractId(domElementId) {
        return domElementId.split(this.getIdSepar())[0];
    }

    extractSuffix(domElementId) {
        let clauses = domElementId.split(this.getIdSepar());
        return clauses[clauses.length - 1];
    }

    getLinkId(id) {
        return this.assembleId(id, "select");
    }

	getOpenBoxId(id) {
		return this.assembleId(id, "open");
	}

    getOpenBoxIconId(id) {
		return this.assembleId(this.assembleId(id, "icon"), "open");
	}

	getCloseBoxId(id) {
		return this.assembleId(id, "close");
	}

    getCloseBoxIconId(id) {
		return this.assembleId(this.assembleId(id, "icon"), "close");
	}

	getEntryDivId(id) {
		return this.assembleId(id, "div");
	}

    // Assembling class names and lists

    getSelectedClassName(entry) {
        return entry.hasWorkers() ?                 
                    this.getCfg().getProp("toc.tree.classTitleNodeSelected") : 
                    this.getCfg().getProp("toc.tree.classTitleLeafSelected");
    }

    getLevelClassName(entry) {
        return this.getCfg().getProp("toc.tree.classLevelPrefix") + entry.getLevel();
    }

    getLabelClassName(entry) {
        return this.getCfg().getProp("toc.tree.classLabel");
    }

    getEntryOuterClassName(entry) {
        return this.getCfg().getProp("toc.tree.classEntryOuter");
    }

    getEntryTitleClassName(entry) {
        return entry.hasWorkers() ? 
                this.getCfg().getProp("toc.tree.classEntryTitleNode") : 
                this.getCfg().getProp("toc.tree.classEntryTitleLeaf");
    }

    getEntryInnerClassName(entry) {
        return this.getCfg().getProp("toc.tree.classEntryInner");
    }

    assembleEntryOuterClassRefs(entry) {
        return this.getEntryOuterClassName(entry);
    }

    assembleOpenBoxClassRefs() {
        return this.getCfg().getProp("toc.tree.classOpenBox");
    }

    assembleCloseBoxClassRefs() {
        return this.getCfg().getProp("toc.tree.classOpenBox");
    }

    assembleTitleLabelClassRefs(entry) {
        let classRefs = [this.getLabelClassName(entry), this.getLevelClassName(entry)];
        if(this.isSelected(entry)) classRefs.push(this.getSelectedClassName(entry));
        return classRefs.join(" ");
    }

    assembleEntryInnerClassRefs(entry) {
        return this.getEntryInnerClassName(entry);
    }

    getTitleOuterClassName(entry) {

        if(entry.hasWorkers()) {
            return this.isSelected(entry) ? 
                    this.getCfg().getProp("toc.tree.classTitleNodeSelected") : 
                    this.getCfg().getProp("toc.tree.classTitleNode");
        } else {
            return this.isSelected(entry) ? 
                    this.getCfg().getProp("toc.tree.classTitleLeafSelected") : 
                    this.getCfg().getProp("toc.tree.classTitleLeaf");
        }
    }

	// Assembling DOM objects for a TOC

	assembleEntryOuterDom(entry) {

        let oDiv = document.createElement("div");
        
        oDiv.setAttribute("id", entry.getId());
        oDiv.setAttribute("class", this.assembleEntryOuterClassRefs(entry));
		oDiv.appendChild(this.assembleEntryTitleDom(entry));
        
        if(entry.hasWorkers())
		    oDiv.appendChild(this.assembleEntryInnerDom(entry));
        
        return oDiv;
	}

    assembleOpenBoxInnerDom(entry) {
        //return document.createTextNode("►");
        let id = entry.getId();
        let imgIcon = document.createElement("img");
        imgIcon.setAttribute("id", this.getOpenBoxIconId(id));
        imgIcon.setAttribute("src", this.getCfg().getProp('toc.tree.srcImgOpen'));
        return imgIcon;
    }

	assembleOpenBoxDom(entry) {
        
        let oSpan = document.createElement("span");
        
        let id = entry.getId();
        oSpan.setAttribute("id", this.getOpenBoxId(id));
        oSpan.setAttribute("class", this.assembleOpenBoxClassRefs());
        oSpan.setAttribute("style", "display: " + (this.isOpen(id) ? "none" : ""));
		oSpan.appendChild(this.assembleOpenBoxInnerDom(entry));
		
        return oSpan;
	}

    assembleCloseBoxInnerDom(entry) {
        //return document.createTextNode("▼");
        let id = entry.getId();
        let imgIcon = document.createElement("img");
        imgIcon.setAttribute("id", this.getCloseBoxIconId(id));
        imgIcon.setAttribute("src", this.getCfg().getProp('toc.tree.srcImgClose'));
        return imgIcon;
    }

	assembleCloseBoxDom(entry) {
        
        let cSpan = document.createElement("span");
		
        let id = entry.getId();
        cSpan.setAttribute("id", this.getCloseBoxId(id));
        cSpan.setAttribute("class", this.assembleCloseBoxClassRefs());
        cSpan.setAttribute("style", "display: " + (this.isOpen(id) ? "" : "none"));
		cSpan.appendChild(this.assembleCloseBoxInnerDom(entry));
		
        return cSpan;
	}

	assembleEntryLinkDom(entry) {
        /* abstract */
	}

	assembleEntryTitleDom(entry) {

		let tDiv = document.createElement("div");

        if(entry.hasWorkers()) {
            tDiv.appendChild(this.assembleOpenBoxDom(entry));
            tDiv.appendChild(this.assembleCloseBoxDom(entry));
        }

        tDiv.appendChild(this.assembleEntryLinkDom(entry));
        tDiv.setAttribute("class", this.getTitleOuterClassName(entry));      
		
        return tDiv;
	}

	assembleEntryInnerDom(entry) {

		let iDiv = document.createElement("div");

        let id = entry.getId();
		iDiv.setAttribute("id", this.getEntryDivId(id));
        iDiv.setAttribute("class", this.assembleEntryInnerClassRefs(entry));
        iDiv.setAttribute("style", "display: " + (this.isOpen(id) ? "" : "none"));
		
        let entries = entry.getEntries();
		for(let idx in entries)
			iDiv.appendChild(this.assembleEntryOuterDom(entries[idx]));
		
		return iDiv;
	}

	assembleDom() {

		let tDiv = document.createElement("div");

        let iDiv = document.createElement("div");
        iDiv.setAttribute("class", this.getCfg().getProp("toc.tree.classInner"));

        let entries = this.getModel().getEntries();
		for(let i in entries)
			iDiv.appendChild(this.assembleEntryOuterDom(entries[i]));

        tDiv.appendChild(iDiv);

		return tDiv;
	}

	// Letting a reader to select entries in a TOC

	getOpenIds() {
        let openIds = [];
		for(let id in this.open) if(this.open[id]) openIds.push(id)     
        return openIds;
	}

	openEntry(id) {
		
		let obox = document.getElementById(this.getOpenBoxId(id));
		let cbox = document.getElementById(this.getCloseBoxId(id));
		let div = document.getElementById(this.getEntryDivId(id));
	 
		obox.style.display = "none";
		cbox.style.display = "";
		div.style.display = "";

        this.open[id] = true;
        
        return this.getOpenIds();
	}
    
	closeEntry(id)
	{
	 let obox = document.getElementById(this.getOpenBoxId(id));
	 let cbox = document.getElementById(this.getCloseBoxId(id));
	 let div = document.getElementById(this.getEntryDivId(id));
	 
	 obox.style.display="";
	 cbox.style.display="none";
	 div.style.display="none";
	 
     this.open[id] = false;

	 return this.getOpenIds();
	}

    handle__click(issue) {
        /* abstract */
    }

    handle__scroll(issue) {
        issue.convert("uitocscroll", this.getDomObject().scrollTop.toString());
	}
}

      
class ArnavTocTreeMultipage extends ArnavTocTree {

    constructor(chief, id, selectedId=undefined, openIds=[]) {
		super(chief, id, selectedId, openIds);
    }

    assembleEntryLinkDom(entry) {
        
        let wrapper = null; 

        if(entry.hasUri() && !this.isSelected(entry)) { 
            wrapper = document.createElement("a");
            wrapper.setAttribute("id", this.getLinkId(entry.getId())); 
		    wrapper.setAttribute("href", entry.getUri());
        } else 
            wrapper = document.createElement("span");
            
        wrapper.setAttribute("class", this.assembleTitleLabelClassRefs(entry));
        wrapper.appendChild(document.createTextNode(entry.getTitle()));

		return wrapper;
	}

    handle__click(issue) {
        
        let e  = issue.getPayload();

        let id = this.extractId(e.target.id);
        let op = this.extractSuffix(e.target.id) 

        switch(op) {
            case "open": 
                issue.convert("uitocentry", this.openEntry(id));
                break;
            case "close":
                issue.convert("uitocentry", this.closeEntry(id));
                break;
        }
    }

} 


class ArnavTocTreeSinglePage extends ArnavTocTree {
    
    assembleEntryLinkDom(entry) {
        
        /* TBD */

        let wrapper = wrapper = document.createElement("span"); 

        if(entry.hasUri() && !this.isSelected(entry)) { 
            wrapper = document.createElement("a");
            wrapper.setAttribute("id", this.getLinkId(entry.getId())); 
        } 
            
        wrapper.setAttribute("class", this.assembleTitleLabelClassRefs(entry));
        wrapper.appendChild(document.createTextNode(entry.getTitle()));

		return wrapper;
	}

    selectEntry(id) {
        /* TBD */
        return id;
    }

    handle__click(issue) {
        
        let e  = issue.getPayload();

        let id = this.extractId(e.target.id);
        let op = this.extractSuffix(e.target.id) 
        
        switch(op) {
            case "open": 
                issue.convert("uitocentry", this.openEntry(id));
                break;
            case "close":
                issue.convert("uitocentry", this.closeEntry(id));
                break;
            case "select":
                issue.convert("uitocentry", this.selectEntry(id));
                break;
        }
    }
}



/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	framelet.js                               (\(\
 Func:      Managing a framelet                       (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavFrameletHeaderFoldBox extends ArnavControl {

    handle__click(issue) {
        issue.convert("fold");
    }
}


class ArnavFrameletHeader extends ArnavControl {

    constructor(chiefFrameletHeader, id) {
        super(chiefFrameletHeader, id);
        this.foldBox = this.createFoldBox();
    }

    assembleFoldBoxId(frameletHeaderId) {
        return frameletHeaderId + "Fold";
    }

    createFoldBox() {
        let foldBoxId = this.assembleFoldBoxId(this.getId()); 
        return checkElementById(foldBoxId) ? 
            (new ArnavFrameletHeaderFoldBox(this, foldBoxId)).bindDomObject() : null;
    }
}


class ArnavFrameletPane extends ArnavControl {


}


class ArnavFramelet extends ArnavControl {

    constructor(chiefConsole, id, initialState=undefined) {
        super(chiefConsole, id);
        this.assignType(ARNAV_TYPE_FRAMELET);
        this.folded = initialState;
        this.pane = this.createPane().bindDomObject();
        this.shortcut = null;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    getTitle() {
        return this.title;
    }

    hasShortcut() {
        return !!this.shortcut;
    }

    setShortcut(shortcut) {
        this.shortcut = shortcut;
        return this;
    }

    getShortcut() {
        return this.shortcut;
    }

    showShortcut() {
        if(this.hasShortcut()) this.getShortcut().show();
        return this;
    }

    hideShortcut() {
        if(this.hasShortcut()) this.getShortcut().hide();
        return this;
    }

    assemblePaneId(frameletId) {
        return frameletId + "Pane";
    }

    createPane() {
        let paneId = this.assemblePaneId(this.getId());
        return checkElementById(paneId) ? new ArnavFrameletPane(this, paneId) : null;
    }

    getPane() {
        return this.pane;
    }

    normalizeTask() {
        this.hideShortcut();
        super.normalizeTask();
    }

    foldTask() {
        super.foldTask();
        this.showShortcut();
    }

    handle__fold(issue) {
        // The issue is still "fold", but we change the payload. 
        // The console will receive this issue and fold the framelet.
        // That's because the console may have more ideas what else 
        // to do before or after folding the frmelet.
        issue.convert("fold", this);
    }

    handle__resize(issue) {
        // console.log(issue);
    }

    handle__mousedown__(issue) {
        console.log("Start");
        this.dragging = true;
        this.getDomObject().style.userSelect = "none";
        issue.terminate();
    }

    handle__shuher(issue) {
        this.shuher = true;
        this.getDomObject().style.cursor = "col-resize";
        issue.terminate();

    }

    handle__unshuher(issue) {
        this.shuher = false;
        issue.terminate();

    }

    handle__mouseout__(issue) {
        issue.convert("unshuher");
    }

    handle__mousemove__(issue) {
        
        let d = this.getDomObject().offsetLeft - issue.getPayload().clientX;
        if(Math.abs(d) <= 3 && !this.shuher) {
            issue.convert("shuher");
            console.log(issue);
        } else {
            if(this.dragging) {
                console.log("Move", issue.getPayload().clientX);
                this.getDomObject().style.position = "absolute";
                this.getDomObject().style.left = issue.getPayload().clientX + "px";
                this.getDomObject().style.width -= 
                issue.terminate();

            }

            if(this.shuher) {
                issue.convert("unshuher");
                console.log(issue);
            }
        }
            
    }

}


class ArnavHeadedFramelet extends ArnavFramelet {

    constructor(chiefConsole, id, initialState) {
        super(chiefConsole, id, initialState);
        this.header = this.createHeader().bindDomObject();
    }

    assembleHeaderId(frameletId) {
        return frameletId + "Header";
    }

    createHeader() {
        let headerId = this.assembleHeaderId(this.getId());
        return checkElementById(headerId) ? new ArnavFrameletHeader(this, headerId) : null;
    }

    getHeader() {
        return this.header;
    }

    showHeader() {
        let header = this.getHeader();
        if(header) header.show();
        return this;
    }

    hideHeader() {
        let header = this.getHeader();
        if(header) header.hide();
        return this;
    }

    beforeNormalize() {
        this.showHeader();
        this.getPane().setTop(this.getHeader().getNormalHeight());
    }

    maximizeTask() {
        this.hideHeader();
        super.maximizeTask();
        this.getPane().maximize();
    }

}


class ArnavHeadlessFramelet extends ArnavFramelet {

}
/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	console.js                               (\(\
 Func:      Managing a set of framelets              (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavFrameletShortcut extends ArnavControl {

    constructor(chiefConsole, id, framelet) {
        super(chiefConsole, id);
        this.assignType(ARNAV_TYPE_SHORTCUT);
        this.framelet = framelet.setShortcut(this);
    }

    getTitle() {
        return this.framelet.getTitle();
    }

    handle__click(issue) {
        issue.convert("unfold", this.framelet);
    }
}


class ArnavConsole extends ArnavControl {

    constructor(chief, id) {
        super(chief, id);
        this.assignType(ARNAV_TYPE_CONSOLE);
        this.frameletShortcuts = {};
    }

    getSmartphoneWidth() {
        return 600;
    }

    isSmartphone() {
        return this.getWidth() <= this.getSmartphoneWidth();
    }

    getHorizontalPadding() {
        return 13;
    }

    getVerticalPadding() {
        return 13;
    }

    isFrameletFolded(id) {
        let fmlt = this.getWorkerById(id);
        return fmlt ? fmlt.isFolded() : undefined;
    }

    beforeTileFramelets() {
        // abstract
    }

    tileFrameletsTask() {
        /* TBD */
    }

    afterTileFramelets() {
        // abstract
    }

    tileFramelets() {
        this.beforeTileFramelets();
        this.tileFrameletsTask();
        this.afterTileFramelets();
        return this;        
    }

    handle__fold(issue) {
        issue.terminate();
        issue.getPayload().fold();
    }

    handle__unfold(issue) {
        issue.terminate();
        issue.getPayload().normalize();
        issue.getSender().hide();
    }

    handle__mouseup(issue) {
        // TBD
    }

    handle__mousedown(issue) {
        // TBD
    }

    handle__mousemove(issue) {
        // TBD
    }

    handle__resize(issue) {
        // TBD
    }

}/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	burger.js                                   (\(\
 Func:		Managing hidden framelets on small screens  (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavBurger extends ArnavControl {

    constructor(chief, id, pane) {
        super(chief, id);
        this.paneVisible = false;
        this.pane = pane;
        this.iconFolded = document.getElementById(this.getId() + "ImgFolded");
        this.iconUnfolded = document.getElementById(this.getId() + "ImgUnfolded");
    }

    getPane() {
        return this.pane;
    }

    showPane() {
        this.getPane().goToFront();
        this.paneVisible = true;
        return this;
    }

    hidePane() {
        this.getPane().goToBack();
        this.paneVisible = false;
        return this;
    }

    isPaneVisible() {
        return this.paneVisible;
    }

    getIconFolded() {
        return this.iconFolded;
    }

    getIconUnfolded() {
        return this.iconUnfolded;
    }

    showFolded() {
        this.getIconFolded().style.display = "";
        this.getIconUnfolded().style.display = "none";
    }

    showUnfolded() {  
        this.getIconFolded().style.display = "none";
        this.getIconUnfolded().style.display = "";
    }

    handle__click(issue) {

        issue.terminate();
        
        if(this.isPaneVisible()) {
            this.hidePane();
            this.showFolded();
        } else {
            this.showPane()
            this.showUnfolded();
        };
    }

}/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:    strip.js                                   (\(\
 Func:		Managing an HTML strip and inner matter    (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavStrip extends ArnavControl {

    constructor(chief, id) {
        super(chief, id);
        this.setupFigureImgs();
    }

    getFigureImgs() {
        return this.figureImgs;
    }

    createFigureImg(domImg) {
        return new ArnavFigureImg(this, domImg.id);
    }

    setupFigureImgs() {

        this.figureImgs = [];

        let domImgs = this.getDomObject().getElementsByTagName("img");

        for(let domImg of domImgs)
            this.figureImgs.push(this.createFigureImg(domImg).bindDomObject());
    }

    adjustLargeImgs() {

        for(let figImg of this.getFigureImgs())
            figImg.adjustWidth();

        return this;
    }


}/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:    figimg.js                                 (\(\
 Func:		Displaying an image in an HTML strip      (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavFigureImg extends ArnavControl {

    constructor(chief, id) {
        super(chief, id);
        this.originalWidth = this.getWidth();
    }

    getMaxWidth() {
        return this.getChief().getWidth() - this.getLeft();
    }

    getOriginalWidth() {
        return this.originalWidth;
    }
    
    isLarge() {
        return this.getOriginalWidth() > this.getMaxWidth();
    }

    adjustWidth() {
        this.setWidth(this.getMaxWidth());
        this.getDomObject().style.cursor = "zoom-in";
        this.adjusted = true;
        return this;
    }

    restoreOriginalWidth() {
        this.setWidth(this.getOriginalWidth());
        this.getDomObject().style.cursor = "zoom-out";
        return this;
    }   

    handle__click(issue) {
        
        if(this.adjusted) { 
            this.restoreOriginalWidth(); 
            this.adjusted = false;
        } else 
            this.adjustWidth();

        issue.terminate();
    }

}/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	app.js	                                   (\(\
 Func:		Application abstract class                 (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavApp extends ArnavBureaucrat {

	constructor() {
		
		super(null, "app");

		this.app = this;

		this.cfg = this.createCfg();
		this.loadCfg();

		this.page = this.createPage(this);
	}
	
	getGlobalAppName() {
		return "GLOBAL_APP";
	}

	getArnavUniqueId() {
		return "genericArnavApp2022";
	}

	createCfg() {
		return new ArnavCfg();
	}

	saveCfg() {
		saveToLocalStorage(this.getArnavUniqueId(), this.getCfg().assembleJson());
	}

	loadCfg() {
		let lsResult = loadFromLocalStorage(this.getArnavUniqueId());
		if(lsResult.statusCode == STATUS_OK)
			this.getCfg().unpackFromJson(lsResult.value);
	}
	
	createPage(chief) {
		/* abstract */
		return null;
	}

	afterRun() {
		/* abstract */
	}

	run() {
		this.afterRun();
	}

	beforeQuit() {
		/* abstract */
	}

	print() {
		let tmp = document.body.innerHTML; 
		document.body.innerHTML = document.getElementById('divTopicBody').innerHTML;
		window.print();
		document.body.innerHTML = tmp;
	}

	quit() {
		this.beforeQuit();
		this.saveCfg();
	}

}
