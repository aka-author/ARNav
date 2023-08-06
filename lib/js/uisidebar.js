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

    /**
     * Displaying a sidebar.
     * @returns The calling object.
     */
    show() {
        return this.replaceCssClass(this.getHiddenCssClassName(), this.getVisibleCssClassName());
    }

    /**
     * Hiding a sidebar.
     * @returns The calling object.
     */
    hide() {
        return this.replaceCssClass(this.getVisibleCssClassName(), this.getHiddenCssClassName());
    }

    /**
     * Verifies if a sidebar is visible now.
     * @returns true if a sidebar is visible, otherwise fasle.
     */
    isVisible() {
        return this.hasCssClass(this.getVisibleCssClassName());
    }

    /**
     * Displaies a sidebar if it is hidden, otherwise hides a sidebar.
     * @returns The calling object.
     */
    toggle() {
        return this.isVisible() ? this.hide() : this.show();
    }
}
