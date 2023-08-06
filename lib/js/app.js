// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      app.js                                    (\(\
// Func:        A base for a top object in a hierarchy    (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavApp extends ArnavController {

    constructor(chief=null, options=null, id=undefined) {
        super(chief, options, id);
        ArnavTasker.app = this;
    }

    detectArnavDOMElements() {

        let arnavDomElements = [];

        const allDomElements = document.getElementsByTagName('*');

        for(let domElement of allDomElements) 
            if(this.isArnavDOMElement(domElement)) 
                arnavDomElements.push(domElement);
        
        return arnavDomElements;
    }

    createControlForElement(domElement) {

        let domControl = null;

        const domControlId = domElement.getAttribute("id");
        const arnavClassName = this.getArnavDOMElementProp(domElement, "class");

        if(ArnavUtils.classExists(arnavClassName)) {
            const props = this.getArnavDOMElementProps(domElement);
            domControl = eval(`new ${arnavClassName}(null, props, "${domControlId}")`);
        }

        return domControl;
    }

    establishControls() {

        const arnavDOMElements = this.detectArnavDOMElements();
        
        const domControls = [];

        for(const arnavDOMElement of arnavDOMElements) {
        
            const domControl = this.createControlForElement(arnavDOMElement);
        
            if(!!domControl)
                domControls.push(domControl.bind());
        }

        for(const domControl of domControls)
            domControl.befriend();

        return this;
    }

    turnOn() {
        this.establishControls();
        return super.turnOn();
    }

    loadCfg() {

    }

    begin() {

    }

    quit() {

    }

}
