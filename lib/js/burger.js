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

    isPaneVisible() {
        return this.paneVisible;
    }

    showPane() {
        this.getPane().goToFront();
        this.showUnfolded();
        this.paneVisible = true;
        return this;
    }

    hidePane() {
        this.getPane().goToBack();
        this.showFolded();
        this.paneVisible = false;
        return this;
    }

    handle__click(issue) {

        issue.terminate();
        
        if(this.isPaneVisible()) 
            this.hidePane();
        else 
            this.showPane();
    }

}