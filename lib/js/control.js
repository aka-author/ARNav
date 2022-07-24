/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	control.js                               (\(\
 Func:      Managing DOM objects                     (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavControl extends ArnavBureaucrat {
	
	constructor(chief, id) {
		
		super(chief, id);

		this.assignType(ARNAV_TYPE_CONTROL);			
		this.domObjectValue = this.getDomObjectValue();
		this.controlValue = this.domObject ? this.getControlValue() : null;
	}

	checkDomObject() {
		return !!document.getElementById(this.getId());
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

	addEventListeners(domEventNames) {

		if(this.checkDomObject()) {			
			let domObject = this.getDomObject();
			for(let i in domEventNames)
				domObject.addEventListener(domEventNames[i], e => {this.edom(e)});
		}
		
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
		}

		return this;
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
	}

	goToBack() {
		this.getChief().bringToBack(this);
	}
}