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

    handle__click(issue) {

        issue.terminate();
        
        return this.isPaneVisible() ? this.hidePane() : this.showPane();
    }

}