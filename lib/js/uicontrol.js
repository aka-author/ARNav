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
	}
		
	getDomObject() {
		return document.getElementById(this.getId());
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
	
	assembleHtml(id) {
		/* abstract */
	}

	show() {
		this.getDomObject().style.display = "";
	}
	
	hide() {
		this.getDomObject().style.display = "none";
	}
	
	onChange() {
		/* abstract */
	}

}