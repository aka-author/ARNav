/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	console.js                               (\(\
 Func:      Managing a set of framelets              (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavFrameletShortcut extends ArnavControl {

    constructor(chiefConsole, id, framelet) {
        super(chiefConsole, id);
        this.assignType(ARNAV_TYPE_SHORTCUT);
        this.framelet = framelet.setShortcut(this);
    }

    getTitle() {
        return this.framelet.getTitle();
    }

    handle__click(issue) {
        issue.convert("unfold", this.framelet);
    }
}


class ArnavConsole extends ArnavControl {

    constructor(chief, id) {
        super(chief, id);
        this.assignType(ARNAV_TYPE_CONSOLE);
        this.frameletShortcuts = {};
    }

    getSmartphoneWidth() {
        return 600;
    }

    isSmartphone() {
        return this.getWidth() <= this.getSmartphoneWidth();
    }

    getHorizontalPadding() {
        return 13;
    }

    getVerticalPadding() {
        return 13;
    }

    isFrameletFolded(id) {
        let fmlt = this.getWorkerById(id);
        return fmlt ? fmlt.isFolded() : undefined;
    }

    beforeTileFramelets() {
        // abstract
    }

    tileFrameletsTask() {
        /* TBD */
    }

    afterTileFramelets() {
        // abstract
    }

    tileFramelets() {
        this.beforeTileFramelets();
        this.tileFrameletsTask();
        this.afterTileFramelets();
        return this;        
    }

    handle__fold(issue) {
        issue.terminate();
        issue.getPayload().fold();
    }

    handle__unfold(issue) {
        issue.terminate();
        issue.getPayload().normalize();
        issue.getSender().hide();
    }

    handle__mouseup(issue) {
        // TBD
    }

    handle__mousedown(issue) {
        // TBD
    }

    handle__mousemove(issue) {
        // TBD
    }

    handle__resize(issue) {
        // TBD
    }

}