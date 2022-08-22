/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	usercfg.js                                 (\(\
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
		// asciiSafeEncode
			
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
		// asciiSafeDecode
		return propVal;
	}

	getDefaultProp(propPath) {
		return this.defaultPropsByPaths[propPath];
	}

	getDefaultPropContent(propPath) {
		return this.existsDefaultProp(propPath) ? this.getDefaultProp(propPath).getContent() : "";
	}

	setProp(propPath, propVal, docId=undefined) {
		if(this.isMutable(propPath)) 
			this.pokeMutableProp(propPath, propVal, docId)
	}

	getProp(propPath, docId=undefined) {	 
		return this.isMutable(propPath) ? 
			useful(this.peekMutableProp(propPath, docId), this.getDefaultPropContent(propPath)) : 
			this.getDefaultPropContent(propPath);
	}
		

	// Saving and loading mutable properties

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
				
		if(parseSuccess) {

			this.mutableProps = props;
					
			/*
			for(let propName in props.sys) 
				this.pokeCfgParam(CFG_SYS_PARAMS, paramName, params.sys[paramName]);
				
			for(let docId in params.doc) 
				for(let paramName in params.doc[docId]) 
					this.pokeCfgParam(docId, paramName, params.doc[docId][paramName]); */
		}
				
		console.log("::", props);

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
	
}