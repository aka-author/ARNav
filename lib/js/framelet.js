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

    isFolded() {
        return this.folded == FRLT_STATE_FOLDED;
    }

    fold() {

        if(!this.isFolded()) {
            this.folded = FRLT_STATE_FOLDED;
            this.pushSize();
            console.log("Folding: ", this.sizes);
            this.hide();
        }

        return this;
    }

    unfold() {

        if(this.isFolded()) {
            this.folded = FRLT_STATE_UNFOLDED;
            this.show();
            console.log("Unfolding: ", this.sizes);
            this.popSize();
        }

        return this;
    }

    handle__fold(issue) {
        issue.convert("fold", this);
    }

    handle__resize(issue) {
        // console.log(issue);
    }

    handle__mousedown__(issue) {
        console.log("Start");
        this.dragging = true;
        this.getDomObject().style.userSelect = "none";
        issue.terminate();
    }

    handle__shuher(issue) {
        this.shuher = true;
        this.getDomObject().style.cursor = "col-resize";
        issue.terminate();

    }

    handle__unshuher(issue) {
        this.shuher = false;
        issue.terminate();

    }

    handle__mouseout__(issue) {
        issue.convert("unshuher");
    }

    handle__mousemove__(issue) {
        
        let d = this.getDomObject().offsetLeft - issue.getPayload().clientX;
        if(Math.abs(d) <= 3 && !this.shuher) {
            issue.convert("shuher");
            console.log(issue);
        } else {
            if(this.dragging) {
                console.log("Move", issue.getPayload().clientX);
                this.getDomObject().style.position = "absolute";
                this.getDomObject().style.left = issue.getPayload().clientX + "px";
                this.getDomObject().style.width -= 
                issue.terminate();

            }

            if(this.shuher) {
                issue.convert("unshuher");
                console.log(issue);
            }
        }
            
    }

}

