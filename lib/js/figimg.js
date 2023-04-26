/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:    figimg.js                                 (\(\
 Func:		Displaying an image in an HTML strip      (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavFigureImg extends ArnavControl {

    constructor(chief, id) {
        super(chief, id);
        this.originalLeft = this.getLeft();
        let domImg = this.getDomObject();
        this.originalWidth = domImg ? 
            (this.isHardSized() ? domImg.getAttribute("width") : domImg.naturalWidth) : 0;
        this.originalHeight = domImg ? 
            (this.isHardSized() ? domImg.getAttribute("height") : domImg.naturalHeight) : 0;
    }

    getOriginalLeft() {
        return this.originalLeft;
    }

    getOriginalWidth() {
        return this.originalWidth;
    }

    getOriginalHeight() {
        return this.originalHeight;
    }

    getMaxWidth() {
        return this.getChief().getWidth() - this.getOriginalLeft();
    }
    
    isHardSized() {
        let domImg = this.getDomObject();
        return domImg ? domImg.hasAttribute("width") || domImg.hasAttribute("height") : false;
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


class ArnavCoverImg extends ArnavFigureImg {

    adjustWidth() {
        
        let coverdiv = document.getElementById("covertext");

        let maxwidth = this.chief.chief.getWidth();
        let maxheight = this.chief.chief.getHeight() - 25 - coverdiv.offsetHeight; 

        let newheight = this.getOriginalHeight()*maxwidth/this.getOriginalWidth();

        if(newheight <= maxheight) 
            this.setWidth(0.8*maxwidth);
        else 
            this.setWidth(0.8*this.getOriginalWidth()*maxheight/this.getOriginalHeight());
    }

}