/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	console.js                               (\(\
 Func:      Managing a set of framelets              (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavFrameletShortcut extends ArnavControl {

    constructor(chiefConsole, id, framelet) {
        super(chiefConsole, id);
        this.assignType(ARNAV_TYPE_SHORTCUT);
        this.framelet = framelet;
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

    /*afterRegisterWorker(framelet) {
        let shortcut = this.createFrameletShortcut(framelet);
        this.frameletShortcuts[framelet.getId()] = shortcut;
        let domObject = this.getDomObject();
        domObject.appendChild(shortcut.assembleHtml());
        shortcut.subscribeOnDomEvents();
    }*/

    isFrameletFolded() {
        let fmlt = this.getWorkerById(id);
        fmlt ? fmlt.isFolded() : undefined;
    }

    tileFramelets() {

    }

    foldFramelet(id) {
        let fmlt = this.getWorkerById(id);
        if(fmlt) {
            fmlt.fold();
            this.tileFramelets();
        }
    }

    handle__fold(issue) {
        issue.terminate();
        issue.getPayload().fold();
        this.getApp().shortcut.show();
        this.tileFramelets();
    }

    handle__unfold(issue) {
        issue.terminate();
        issue.getPayload().unfold();
        issue.getSender().hide();
    }

}