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

    isFrameletFolded() {
        let fmlt = this.getWorkerById(id);
        fmlt ? fmlt.isFolded() : undefined;
    }

    tileFramelets() {

        let tocFramelet = this.getWorkerById("divTocFramelet");

        let matterFramelet = this.getWorkerById("divMatterFramelet");

        matterFramelet.getDomObject().className = 
            tocFramelet.isFolded() ? "matterFrameletAlone" : "matterFramelet";        
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

        

        //let classes = document.querySelectorAll(".frameletPane");
        //console.log(document);

    }

    handle__unfold(issue) {
        issue.terminate();
        issue.getPayload().unfold();
        issue.getSender().hide();
        this.tileFramelets();
    }

    handle__mousemove(issue) {}

}