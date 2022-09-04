/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:    figimg.js                                 (\(\
 Func:		Displaying an image in an HTML strip      (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavFigureImg extends ArnavControl {

    constructor(chief, id) {
        super(chief, id);
        this.originalLeft = this.getLeft();
        this.originalWidth = this.getDomObject() ? this.getDomObject().naturalWidth : 0;
    }

    getOriginalLeft() {
        return this.originalLeft;
    }

    getOriginalWidth() {
        return this.originalWidth;
    }

    getMaxWidth() {
        return this.getChief().getWidth() - this.getOriginalLeft();
    }
    
    isLarge() {
        return this.getOriginalWidth() > this.getMaxWidth();
    }

    isSmall() {
        return this.getOriginalWidth() < this.getMaxWidth();
    }

    isUnreasonablySmall() {
        return    (this.isLarge() && this.getWidth() < this.getMaxWidth()) 
               || (this.isSmall() && this.getWidth() < this.getOriginalWidth());                
     }

    adjustWidth() {

        if(this.getWidth() > this.getMaxWidth()) {
            this.setWidth(this.getMaxWidth());
            this.getDomObject().style.cursor = "zoom-in";
            this.adjusted = true;
        } else if(this.isUnreasonablySmall()) {
            this.setWidth(Math.min(this.getOriginalWidth(), this.getMaxWidth()));
            this.adjusted = true;
        }

       if(this.getWidth() == this.getOriginalWidth() && this.getOriginalWidth() < this.getMaxWidth()) {
            this.makePassive();
            this.adjusted = false;
       }

        return this;
    }

    makePassive() {
        this.getDomObject().style.cursor = "default";
    }

    restoreOriginalWidth() {
        this.setWidth(this.getOriginalWidth());
        this.getDomObject().style.cursor = "zoom-out";
        return this;
    }   

    handle__click(issue) {
        
        if(this.isLarge()) {
            if(this.adjusted) { 
                this.restoreOriginalWidth(); 
                this.adjusted = false;
            } else 
                this.adjustWidth();
        }

        issue.terminate();
    }

}