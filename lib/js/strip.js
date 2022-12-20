/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:    strip.js                                   (\(\
 Func:		Managing an HTML strip and inner matter    (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavStrip extends ArnavControl {

    constructor(chief, id) {
        super(chief, id);
        this.setupFigureImgs();
    }

    getFigureImgs() {
        return this.figureImgs;
    }

    createFigureImg(domImg) {
        return new ArnavFigureImg(this, domImg.id);
    }

    isFigureImg(domImg) {
        return domImg.hasAttribute("id");
    }

    setupFigureImgs() {

        this.figureImgs = [];

        let domImgs = this.getDomObject().getElementsByTagName("img");

        for(let domImg of domImgs) {
            if(this.isFigureImg(domImg))
                this.figureImgs.push(this.createFigureImg(domImg).bindDomObject());
        }
    }

    adjustLargeImgs() {

        for(let figImg of this.getFigureImgs()) 
            figImg.adjustWidth();
        
        return this;
    }


}