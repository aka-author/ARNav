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

    isFrameletFolded(id) {
        let fmlt = this.getWorkerById(id);
        return fmlt ? fmlt.isFolded() : undefined;
    }

    tileFramelets() {
        // TBD        
    }

    handle__fold(issue) {
     
        issue.terminate();

        issue.getPayload().fold();

        this.matterFramelet = this.getWorkerById("divMatterFramelet");
        this.matterFramelet.pushSize().maximize();

        this.getApp().shortcut.show();
    }

    handle__unfold(issue) {

        issue.terminate();

        issue.getPayload().unfold();
        issue.getSender().hide();

        this.matterFramelet = this.getWorkerById("divMatterFramelet");
        this.matterFramelet.popSize();
    }

    handle__mouseup(issue) {
    
        if(this.resizing) {            
            this.resizing = false;
        }
    }

    handle__mousedown(issue) {
        this.resizing = true;
        this.startX = issue.getPayload().pageX;
    }

    handle__mousemove(issue) {

        this.tocFramelet = this.getWorkerById("divTocFramelet");
        this.matterFramelet = this.getWorkerById("divMatterFramelet");

        if(this.resizing) {
            let x = issue.getPayload().pageX;
            let delta = x - this.startX; 
            this.tocFramelet.resizeRight(delta);
            this.matterFramelet.resizeLeft(delta);
            this.startX = x;
        } else {
            let x = issue.getPayload().offsetX;
            if(this.tocFramelet.getRight() < x && x < this.matterFramelet.getLeft())
                this.getDomObject().style.cursor = "col-resize";
            else 
                this.getDomObject().style.cursor = ""; 
        }
    }

}