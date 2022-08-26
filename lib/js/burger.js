/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	burger.js                                   (\(\
 Func:		Managing hidden framelets on small screens  (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavBurger extends ArnavControl {

    constructor(chief, id, pane) {
        super(chief, id);
        this.paneVisible = false;
        this.pane = pane;
        this.iconFolded = document.getElementById(this.getId() + "ImgFolded");
        this.iconUnfolded = document.getElementById(this.getId() + "ImgUnfolded");
    }

    getPane() {
        return this.pane;
    }

    showPane() {
        this.getPane().goToFront();
        this.paneVisible = true;
        return this;
    }

    hidePane() {
        this.getPane().goToBack();
        this.paneVisible = false;
        return this;
    }

    isPaneVisible() {
        return this.paneVisible;
    }

    getIconFolded() {
        return this.iconFolded;
    }

    getIconUnfolded() {
        return this.iconUnfolded;
    }

    showFolded() {
        this.getIconFolded().style.display = "";
        this.getIconUnfolded().style.display = "none";
    }

    showUnfolded() {  
        this.getIconFolded().style.display = "none";
        this.getIconUnfolded().style.display = "";
    }

    handle__click(issue) {

        issue.terminate();
        
        if(this.isPaneVisible()) {
            this.hidePane();
            this.showFolded();
        } else {
            this.showPane()
            this.showUnfolded();
        };
    }

}