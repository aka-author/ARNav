// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      uisidebar.js                              (\(\
// Func:        Managing a sidebar                        (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavSidebar extends ArnavUIControl {

    constructor(chief=null, options=null, id=undefined) {
        
        super(chief, options, id);

        this.setVisibleCssClassName(this.getCssClassName() + "Visible");
        this.setHiddenCssClassName(this.getCssClassName() + "Hidden");
    }

    setVisibleCssClassName(cssClassName) {
        this.visibleClassName = cssClassName;
        return this;
    }

    getVisibleCssClassName() {
        return this.visibleClassName;
    }

    setHiddenCssClassName(cssClassName) {
        this.hiddenCssClassName = cssClassName;
        return this;
    }

    getHiddenCssClassName() {
        return this.hiddenCssClassName;
    }

    show() {
        return this.replaceCssClass(this.getHiddenCssClassName(), this.getVisibleCssClassName());
    }

    hide() {
        return this.replaceCssClass(this.getVisibleCssClassName(), this.getHiddenCssClassName());
    }

    isVisible() {
        return this.hasCssClass(this.getVisibleCssClassName());
    }

    toggle() {
        return this.isVisible() ? this.hide() : this.show();
    }
}
