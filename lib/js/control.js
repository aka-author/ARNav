/* * ** *** ***** ******** ************* ********************* 
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
            let domObject = this.getDomObject();
            domObject.style.left = pxLeft + "px";
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

	beforeNormalize() {}

	normalizeTask() {
		if(this.isFolded()) this.show();
		this.setSize(this.getNormalSize());
	}

	afterNormalize() {}

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

	beforeMaximize() {}

	maximizeTask() {
		this.stratch();
	}

	afterMaximize() {}

	maximize() {

		if(!this.isMaximized()) {
			if(this.isFolded()) this.normalize();
			this.saveNormalSize();
			this.beforeMaximize();
			this.maximizeTask();
			this.afterMaximize();
			this.maximized = true;
			this.folded = false;
		}

		return this;
	}

	isFolded() {
		return this.folded;
	}

	beforeFold() {}

	foldTask() {
		this.hide();
	}

	afterFold() {}

	fold() {

		if(!this.isFolded()) {
			this.saveNormalSize();
			this.beforeFold();
			this.foldTask();
			this.afterFold();
			this.maximized = false;
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
}