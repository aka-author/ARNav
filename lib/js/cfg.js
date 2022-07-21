/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	usercfg.js                                 (\(\
 Func:		Saving and loading user's configuration    (^.^)
* * ** *** ***** ******** ************* *********************/
	
const CFG_SYS_PARAMS 	    = undefined;
const CFG_DEFAULT_DOC_ID    = "default";
const CFG_UI_LANG_CODE      = "CFG_UI_LANG_CODE";
	
class ArnavCfg {
	
	constructor() {
		this.params = {"sys": {}, "doc": {"default": {}}};
		this.setDefaults();
	}		
	
	getBrowserName() {
		return this.getBrowserName();
	}

	getOsName() {
		return this.getOsName();
	}

	isMobile() {
		return this.isMobile();
	}

	checkOnlineDoc(docId) {
		if(!this.params.doc[docId]) this.params.doc[docId] = {};
	}
	
	pokeCfgParam(docId, paramName, safeParamValue) {
				
		if(docId) {
			this.checkOnlineDoc(docId);
			this.params.doc[docId][paramName] = safeParamValue;	
		}
		else
			this.params.sys[paramName] = safeParamValue;
	}
	
    peekCfgParam(docId, paramName) {

		let paramValue = docId ? 
			(this.params.doc[docId] ? this.params.doc[docId][paramName] : "") : 
			this.params.sys[paramName];
		
		return paramValue;
	}
	
	setSysCfgParam(paramName, paramValue) {
		this.pokeCfgParam(CFG_SYS_PARAMS, paramName, asciiSafeEncode(paramValue));
	}

    getSysCfgParam(paramName) {
		return asciiSafeDecode(this.peekCfgParam(CFG_SYS_PARAMS, paramName));
	}
	
    setDocCfgParam(docId, paramName, paramValue) {
		this.pokeCfgParam(docId, paramName, asciiSafeEncode(paramValue));
	}

    setDefaultDocCfgParam(paramName, paramValue) {
		this.pokeCfgParam(CFG_DEFAULT_DOC_ID, paramName, asciiSafeEncode(paramValue));
	}

	getDocCfgParam(docId, paramName) {
		let docValue = this.peekCfgParam(docId, paramName);
		let defValue = this.peekCfgParam(CFG_DEFAULT_DOC_ID, paramName);
		return asciiSafeDecode(useful(docValue, defValue));
	}
	
	getBrowserLangCode() {
		return navigator.language.substring(0, 2);
	}
	
    setUiLangCode(langCode) {
		this.setSysCfgParam(CFG_UI_LANG_CODE, langCode);
	}

	getUiLangCode() {
		return this.getSysCfgParam(CFG_UI_LANG_CODE) ? 
					this.getSysCfgParam(CFG_UI_LANG_CODE) : this.getBrowserLangCode();
	}
	
	assembleJson() {

		delete this.params.doc[CFG_DEFAULT_DOC_ID];
		
		return JSON.stringify(this.params);
	}	
	
	unpackFromJson(paramsJson) {
		
		let parseSuccess = true;
		
		let params = {};
	
		try {
			params = JSON.parse(paramsJson);
		}
		catch(e) {
			parseSuccess = false;
		}			
				
		if(parseSuccess) {
						
			for(let paramName in params.sys) 
				this.pokeCfgParam(CFG_SYS_PARAMS, paramName, params.sys[paramName]);
				
			for(let docId in params.doc) 
				for(let paramName in params.doc[docId]) 
					this.pokeCfgParam(docId, paramName, params.doc[docId][paramName]);
		}
				
		return parseSuccess;
	}
	
	setDefaults() {
		/* abstract */

        // Example:
        // this.setSysCfgParam("USER_NAME", "Ilon Musk");
        // this.setDefaultDocCfgParam("pageName", "index.html");

	}
}