/* * ** *** ***** ******** ************* ********************* 
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
}