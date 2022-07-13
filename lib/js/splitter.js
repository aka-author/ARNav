/* * ** *** ***** ******** ************* *********************
Product:	Web help plug-in for DITA OT
Module:		splitter.js
Func:		Resizing TOC and matter areas
* * ** *** ***** ******** ************* *********************/

class PageSplitter {
	
	constructor(splitterDivId) {
		this.splitterDivId = splitterDivId;
		this.beingDragged = false;
	}
	
	getId() {
		return this.splitterDivId;
	}
	
	getSplitterDiv() {
		return document.getElementById(this.getId());
	}
	
	resizePageTocAreaDiv(width) {
		
		let tocPageAreaDiv = getPageTocAreaDiv();
		
		tocPageAreaDiv.style.maxWidth = width;
        tocPageAreaDiv.style.minWidth = width;
	}
	
	isBeingDragged() {
		return this.beingDragged;
	}
	
	activate() {
		let splitterDiv = this.getSplitterDiv();
		splitterDiv.style.width = "6pt";
		splitterDiv.style.background = "#cc2222";
	}

    deactivate() {
		if(!this.isBeingDragged()) {
			let splitterDiv = this.getSplitterDiv();	
			splitterDiv.style = "3pt";
			splitterDiv.style.background = "#cccccc";
		}
    }
	
	startDrag() {
		this.beingDragged = true;
	}
	
	stopDrag() {
		this.beingDragged = false;
		let sd = this.getSplitterDiv();
		sd.style.width = "3pt";
		sd.style.background = "#cccccc";
		this.save();
	}
	
	doDrag(e) {
		if(this.isBeingDragged()) {
            
			let tpad = getPageTocAreaDiv();
			
			let scrollbarWidth = tpad.offsetWidth - tpad.clientWidth;
			
			let newWidth = (e.clientX - scrollbarWidth - 10) + "px";
			
			this.resizePageTocAreaDiv(newWidth);
		}
	}
	
	save() {
		let currentWidth = getPageTocAreaDiv().style.maxWidth;
		cook_cookie_set_secx('tocwidth', currentWidth, 100000);
	}
	
	restore() {
		let previousWidth = cook_cookie_get('tocwidth');
		let tocPageAreaDiv = getPageTocAreaDiv();
		this.resize(previousWidth);
	}
}


var GLOBAL_Splitter = new Splitter("pageSplitter");


function getSplitter() {
	return GLOBAL_Splitter();
}