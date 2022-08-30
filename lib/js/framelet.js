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
        this.foldBox = this.createFoldBox().bindDomObject();
    }

    assembleFoldBoxId(frameletHeaderId) {
        return frameletHeaderId + "Fold";
    }

    createFoldBox() {
        let foldBoxId = this.assembleFoldBoxId(this.getId()); 
        return checkElementById(foldBoxId) ? 
            (new ArnavFrameletHeaderFoldBox(this, foldBoxId)) : null;
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

    calcHeaderLeft() {
        return this.getWidth() - this.getHeader().getWidth();
    }

    calcPaneHeight() {
        return this.getHeight() - (this.isMaximized() ? 0 : this.getHeader().getHeight());
    }

    setWidth(pxWidth) {
        super.setWidth(pxWidth);
        this.getHeader().setLeft(this.calcHeaderLeft());
        this.getPane().setWidth(this.getWidth());
        return this;
    }

    setHeight(pxHeight) {
        super.setHeight(pxHeight);
        if(this.isNormalized()) this.getPane().setHeight(this.calcPaneHeight());
        return this;
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

    normalizeTask() {
        super.normalizeTask();
        this.showHeader();
        this.getPane().setTop(this.getHeader().getHeight());
    }

    maximizeTask() {
        this.hideHeader();
        super.maximizeTask();
        this.getPane().maximize();
        this.hideShortcut();
    }

}


class ArnavHeadlessFramelet extends ArnavFramelet {

}
