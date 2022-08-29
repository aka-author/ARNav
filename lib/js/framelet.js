/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	framelet.js                               (\(\
 Func:      Managing a framelet                       (^.^)
* * ** *** ***** ******** ************* *********************/

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


class ArnavFrameletPane extends ArnavControl {


}


class ArnavFramelet extends ArnavControl {

    constructor(chiefConsole, id, initialState=undefined) {
        super(chiefConsole, id);
        this.assignType(ARNAV_TYPE_FRAMELET);
        this.folded = initialState;
        this.pane = this.createPane().bindDomObject();
        this.shortcut = null;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    getTitle() {
        return this.title;
    }

    hasShortcut() {
        return !!this.shortcut;
    }

    setShortcut(shortcut) {
        this.shortcut = shortcut;
        return this;
    }

    getShortcut() {
        return this.shortcut;
    }

    showShortcut() {
        if(this.hasShortcut()) this.getShortcut().show();
        return this;
    }

    hideShortcut() {
        if(this.hasShortcut()) this.getShortcut().hide();
        return this;
    }

    assemblePaneId(frameletId) {
        return frameletId + "Pane";
    }

    createPane() {
        let paneId = this.assemblePaneId(this.getId());
        return checkElementById(paneId) ? new ArnavFrameletPane(this, paneId) : null;
    }

    getPane() {
        return this.pane;
    }

    normalizeTask() {
        this.hideShortcut();
        super.normalizeTask();
    }

    foldTask() {
        super.foldTask();
        this.showShortcut();
    }

    handle__fold(issue) {
        // The issue is still "fold", but we change the payload. 
        // The console will receive this issue and fold the framelet.
        // That's because the console may have more ideas what else 
        // to do before or after folding the frmelet.
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


class ArnavHeadedFramelet extends ArnavFramelet {

    constructor(chiefConsole, id, initialState) {
        super(chiefConsole, id, initialState);
        this.header = this.createHeader().bindDomObject();
    }

    assembleHeaderId(frameletId) {
        return frameletId + "Header";
    }

    createHeader() {
        let headerId = this.assembleHeaderId(this.getId());
        return checkElementById(headerId) ? new ArnavFrameletHeader(this, headerId) : null;
    }

    getHeader() {
        return this.header;
    }

    showHeader() {
        let header = this.getHeader();
        if(header) header.show();
        return this;
    }

    hideHeader() {
        let header = this.getHeader();
        if(header) header.hide();
        return this;
    }

    beforeNormalize() {
        this.showHeader();
        this.getPane().setTop(this.getHeader().getNormalHeight());
    }

    maximizeTask() {
        this.hideHeader();
        super.maximizeTask();
        this.getPane().maximize();
    }

}


class ArnavHeadlessFramelet extends ArnavFramelet {

}
