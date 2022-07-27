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

    getSmartphoneWidth() {
        return 560;
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

    tileFramelets() {
        // TBD        
    }

    stretchFramelets() {

        this.tocFramelet = this.getWorkerById("divTocFramelet");
        this.matterFramelet = this.getWorkerById("divMatterFramelet");

        if(this.isSmartphone()) {
            this.tocFramelet.maximize();
            this.matterFramelet.maximize();
            this.smartphone = true;
        }

        if(!this.isSmartphone() && this.smartphone) {
            this.tocFramelet.setLeft(this.getHorizontalPadding()).setWidth(300);
            this.matterFramelet.setLeft(this.tocFramelet.getRight() + this.getHorizontalPadding());
            this.matterFramelet.setTop(this.getVerticalPadding());
            this.matterFramelet.setRight(this.getRight() - this.getHorizontalPadding());
            this.matterFramelet.setBottom(this.getBottom()- this.getVerticalPadding());
            this.smartphone = false;
        }

        if(!this.tocFramelet.isFolded())
            this.tocFramelet.setBottom(this.getHeight() - this.getVerticalPadding() - 20);
        
        if(this.matterFramelet.isMaximized() || this.isSmartphone()) {
            this.matterFramelet.setRight(this.getWidth());
            this.matterFramelet.setBottom(this.getHeight());
        } else {
            this.matterFramelet.setRight(this.getWidth() - this.getHorizontalPadding());
            this.matterFramelet.setBottom(this.getHeight() - this.getVerticalPadding());    
        }
    }

    handle__fold(issue) {
     
        issue.terminate();

        issue.getPayload().fold();

        this.matterFramelet = this.getWorkerById("divMatterFramelet");
        this.matterFramelet.maximize();

        this.getApp().shortcut.show();
    }

    handle__unfold(issue) {

        issue.terminate();

        issue.getPayload().unfold();
        issue.getSender().hide();

        this.matterFramelet = this.getWorkerById("divMatterFramelet");
        this.matterFramelet.demaximize();

        this.stretchFramelets();
    }

    handle__mouseup(issue) {
    
        if(this.resizing) {            
            this.resizing = false;

            let sizes = {}; 
            sizes.toc = this.tocFramelet.getSize();
            sizes.matter = this.matterFramelet.getSize(); 

            issue.convert("frameletsResized", sizes);
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

    handle__resize(issue) {
        
        this.tocFramelet = this.getWorkerById("divTocFramelet");
        this.matterFramelet = this.getWorkerById("divMatterFramelet");

        this.stretchFramelets();

        let sizes = {}; 
        sizes.toc = this.tocFramelet.getSize();
        sizes.matter = this.matterFramelet.getSize(); 

        issue.convert("frameletsResized", sizes);
    }

}