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
        let mfs = matterFramelet.getDomObject().style;

        if(tocFramelet.isFolded()) {
            console.log(matterFramelet.getDomObject().className);
            matterFramelet.getDomObject().className = "matterFrameletAlone";
            console.log(matterFramelet.getDomObject().className);
            /*mfs.position = "absolute";
            mfs.top = "0pt";
            mfs.width = '100%';
            mfs.margin = '0pt';
            mfs.zIndex = 0;*/
        } else {
            matterFramelet.getDomObject().className = "matterFramelet";
            console.log("::: ", matterFramelet.getDomObject().className);
            /*tfs = tocFramelet.getDomObject().style;
            tfs.position = "absolute";
            tfs.top = "20pt";
            tfs.width = 'calc(30% - 10pt)';
            tfs.marginLeft = '10pt';
            tfs.zIndex = 0;

            mfs.position = "absolute";
            mfs.top = "20pt";
            mfs.width = 'calc(70% - 20pt)';
            mfs.marginLeft = '10pt';
            mfs.zIndex = 0;*/
        }
    }

    foldFramelet(id) {
        let fmlt = this.getWorkerById(id);
        if(fmlt) {
            fmlt.fold();
            this.tileFramelets();
        }
    }

    handle__resize(issue) {
        console.log(issue);
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
        this.tileFramelets();
    }

}