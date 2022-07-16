/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	uicommon.js                              (\(\
 Func:      Implementing common UI controls          (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavScrollArea extends ArnavUiControl {
	
    subscribeOnDomEvents() {
	    this.setRelevantDomEvents("scroll");
    }

	setHScrollState(scrollLeft) {
		this.getDomObject().scrollTop = scrollLeft; 
	}

    setVScrollState(scrollTop) {
		this.getDomObject().scrollTop = scrollTop; 
	}

	scroll(issue) {
        issue.convert("uitocscroll", this.getDomObject().scrollTop.toString());
	}
}