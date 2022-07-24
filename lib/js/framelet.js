/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	framelet.js                               (\(\
 Func:      Managing a framelet                       (^.^)
* * ** *** ***** ******** ************* *********************/

const FRLT_STATE_FOLDED   = "folded";
const FRLT_STATE_UNFOLDED = "unfolded";

class ArnavFrameletHeaderFoldBox extends ArnavControl {

    handle__click(issue) {
        issue.convert("fold");
    }
}


class ArnavFrameletHeader extends ArnavControl {

    constructor(chiefFrameletHeader, id) {
        super(chiefFrameletHeader, id);
        this.foldBox = this.createFoldBox();
    }

    assembleFoldBoxId(frameletHeaderId) {
        return frameletHeaderId + "Fold";
    }

    createFoldBox() {
        let foldBoxId = this.assembleFoldBoxId(this.getId()); 
        return checkElementById(foldBoxId) ? 
            (new ArnavFrameletHeaderFoldBox(this, foldBoxId)).bindDomObject() : null;
    }
}


class ArnavFramelet extends ArnavControl {

    constructor(chiefConsole, id, initialState) {

        super(chiefConsole, id);
        
        this.assignType(ARNAV_TYPE_FRAMELET);
        
        this.folded = initialState;
        this.header = this.createHeader();
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    getTitle() {
        return this.title;
    }

    assembleHeaderId(frameletId) {
        return frameletId + "Header";
    }

    createHeader() {
        let headerId = this.assembleHeaderId(this.getId());
        return checkElementById(headerId) ? new ArnavFrameletHeader(this, headerId) : null;
    }

    getWidth() {
        let domObject = this.getDomObject();
        return domObject ? domObject.clientWidth : undefined;
    }

    getHeight() {
        let domObject = this.getDomObject();
        return domObject ? domObject.clientHeight : undefined;
    }

    resize(newWidth, newHeight) {

    }

    ifFolded() {
        return this.folded;
    }

    fold() {
        this.folded = FRLT_STATE_FOLDED;
        this.hide();
    }

    unfold() {
        this.folded = FRLT_STATE_UNFOLDED;
        this.show();
    }

    handle__fold(issue) {
        issue.convert("fold", this);
    }

}

