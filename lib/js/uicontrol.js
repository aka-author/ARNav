/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	uicontrol.js                             (\(\
 Func:      Managing DOM objects                     (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavUiControl extends ArnavBureaucrat {
	
	constructor(chief, id) {
		
		super(chief, id);
				
		this.domObject = this.getDomObject();
		this.domObjectValue = this.getDomObjectValue();
		this.uiControlValue = this.domObject ? this.getUiControlValue() : null;
		this.relevantDomEventsNames = [];
		this.subscribeOnDomEvents();
	}
		
	getDomObject() {
		return document.getElementById(this.getId());
	}
	
	getRelevantDomEventNames() {
		return this.relevantDomEventsNames;
	}

	addEventListeners() {

		let domObject = this.getDomObject();
		
		if(domObject) {			
			let domEventNames = this.getRelevantDomEventNames();
			for(let i in this.relevantDomEventsNames)
				domObject.addEventListener(domEventNames[i], e => {this.edom(e)});
		}
		
		return this;
	}

	setRelevantDomEvents() {

		this.relevantDomEventsNames = [];

		for(let i in arguments)
			this.relevantDomEventsNames.push(arguments[i]);

		this.addEventListeners();

		return this;
	}

	subscribeOnDomEvents() {
		/* abstract */
		// Example:
		// this.setRelevantDomEvents("click", "scroll");
	}

	getDomObjectValue() { 	
		let domObject = this.getDomObject();
		return domObject ? this.getDomObject().value : this.getId();
	}
	
	setDomObjectValue(domObjectValue) {
		this.getDomObject().value = domObjectValue;
	}

	assembleEmptyUiControlValue() {
		return undefined;
	}
	
	// when picking from a file
	parseSerializedUiControlValue(serializedUiControlValue) {
		return serializedUiControlValue;
	}
	
	// when loading a value to a DOM object, e.g. select/option/@value
	assembleDomObjectValue(uiControlValue) {
		return String(uiControlValue);
	}
	
	// when loading a representation to a DOM object, e.g. select/option
	assembleDomObjectValueAppearance(uiControlValue) {
		return String(uiControlValue);
	}
	
	// when retrieving a value from a DOM object
	parseDomObjectValue(domObjectValue) {
		return domObjectValue;
	}
	
	// when saving to a file
	serializeUiControlValue(uiControlValue) {
		return String(uiControlValue);
	}
	
	// when displaying a value out of a control
	publishUiControlValue(uiControlValue) {
		return String(uiControlValue);
	}	
	
	getUiControlValue() {
		this.domObject = this.getDomObject();
		this.domObjectValue = this.getDomObjectValue();
		this.uiControlValue = this.parseDomObjectValue(this.domObjectValue);
		return this.uiControlValue;
	}
	
	setUiControlValue(uiControlValue) {
		this.uiControlValue = uiControlValue;
		this.domObject = this.getDomObject();
		this.domObjectValue = this.assembleDomObjectValue(uiControlValue);
		this.setDomObjectValue(this.domObjectValue);
	}		
	
	assembleDom(id) {
		/* abstract */
	}

	insertToDom() {
		let domObject = this.getDomObject();
		if(domObject)
			domObject.appendChild(this.assembleDom());
	}

	show() {
		this.getDomObject().style.display = "block";
		console.log("Fremelet show...");
	}
	
	hide() {
		this.getDomObject().style.display = "none";
		console.log("Fremelet hide...");
	}
}