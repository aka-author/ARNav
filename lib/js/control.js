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

    getLeft() {
        let domObject = this.getDomObject();
        return domObject ? domObject.offsetLeft : undefined;
    }

    setLeft(pxLeft) {

        if(this.checkDomObject()) {
			console.log(pxLeft);
            let domObject = this.getDomObject();
            domObject.style.left = pxLeft + "px";
			//domObject.style.left = "200px";
			console.log(this.getLeft());
        }

        return this;
    }

	getRight() {
        let domObject = this.getDomObject();
        return domObject ? domObject.offsetLeft + domObject.clientWidth : undefined;
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

	getBottom() {
        let domObject = this.getDomObject();
        return domObject ? domObject.offsetTop + domObject.clientHeight : undefined;
    }

	getInnerWidth() {
		return this.getWidth();
	}

	getInnerHeight() {
		return this.getHeight();
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

	maximize() {
		let chief = this.getChief();
		this.setLeft(0).setTop(0).setWidth(chief.getInnerWidth()).setHeight(chief.getInnerHeight());
		return this;
	}

	getSize() {
		return {"left": this.getLeft(), "top": this.getTop(), "width": this.getWidth(), "height": this.getHeight()}
	}

	pushSize() {
		if(!this.sizes) this.sizes = [];
		console.log(this.getSize());
		this.sizes.push(this.getSize());
		return this;
	}

	popSize() {

		if(!!this.sizes) {
			let size = this.sizes[this.sizes.length - 1];
			console.log("Pop: ", size);
			this.setTop(size.top).setLeft(size.left).setWidth(size.width).setHeight(size.height);
			delete this.sizes[this.sizes.length - 1];
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
	}

	goToBack() {
		this.getChief().bringToBack(this);
	}
}