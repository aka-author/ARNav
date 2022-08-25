/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:    figimg.js                                 (\(\
 Func:		Displaying an image in an HTML strip      (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavFigureImg extends ArnavControl {

    constructor(chief, id) {
        super(chief, id);
        this.originalWidth = this.getWidth();
    }

    getMaxWidth() {
        return this.getChief().getWidth() - this.getLeft();
    }

    getOriginalWidth() {
        return this.originalWidth;
    }
    
    isLarge() {
        return this.getOriginalWidth() > this.getMaxWidth();
    }

    adjustWidth() {
        this.setWidth(this.getMaxWidth());
        this.getDomObject().style.cursor = "zoom-in";
        this.adjusted = true;
        return this;
    }

    restoreOriginalWidth() {
        this.setWidth(this.getOriginalWidth());
        this.getDomObject().style.cursor = "zoom-out";
        return this;
    }   

    handle__click(issue) {
        
        if(this.adjusted) { 
            this.restoreOriginalWidth(); 
            this.adjusted = false;
        } else 
            this.adjustWidth();

        issue.terminate();
    }

}