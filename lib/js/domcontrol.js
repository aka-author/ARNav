// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      domcontrol.js                             (\(\
// Func:        Managing objects exinsing in a page       (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavDOMControl extends ArnavTasker {

    static arnavPropsAttrName = "data-arnav-props";
    
    static eventExpirationAge = 10000;
    static activeEvents = new Map();

    static DOMEventType2TaskTypeName = function(domEventType) {
        return "dom_" + domEventType;
    }

    constructor(chief=null, options=null, id=undefined) {
        
        super(chief, options, id);
        
        this.domElementName = "div";
        this.cssClassName = this.constructor.name;

        this.headerDomElementName = "div";
        this.headerCssClassName = this.cssClassName + "Header";

        this.bodyDomElementName = "div";
        this.bodyCssClassName = this.cssClassName + "Body";

        this.offspringDomElementName = "div";
        this.offspringCssClassName = this.cssClassName + "Offspring";

        this.initialDisplay = "";
        
        this.domObject = null;
    }

    // Accessing Arnav properties and building hierarchy

    setArnavPropsAttrName(attrName) {
        ArnavDOMControl.arnavPropsAttrName = attrName;
    }

    getArnavPropsAttrName() {
        return ArnavDOMControl.arnavPropsAttrName;
    }

    isArnavDOMElement(domElement) {
        return domElement.hasAttribute(this.getArnavPropsAttrName());
    }

    detectArnavAncestorId(domElement) {

        let arnavDomAncestor = null;

        let currDomNode = domElement;

        while(currDomNode.parentNode && !arnavDomAncestor) {
            
            currDomNode = currDomNode.parentNode;
            
            if(this.isArnavDOMElement(currDomNode))
                arnavDomAncestor = currDomNode;
        }

        return arnavDomAncestor.getAttribute("id");
    }

    getArnavDOMElementProps(domElement) {
        return ArnavUtils.parseStyle(domElement.getAttribute(this.getArnavPropsAttrName()));
    }

    getArnavDOMElementProp(domElement, propName) {

        let propValue = undefined;

        const props = this.getArnavDOMElementProps(domElement);

        switch(propName) {
            case "chief":
                propValue = !!props[propName] ? props[propName] : this.detectArnavAncestorId(domElement);
                break;
            default:
                propValue = props[propName]; 
        }

        return propValue;
    }

    befriend() {

        this.setChief(this.getTasker(this.getArnavDOMElementProp(this.getDOMObject(), "chief")));
        
        return this;
    }

    // Performing tasks

    setEventExpirationTime(expTimeMs) {
        ArnavDOMControl.eventExpirationTime = expTimeMs;
        return this;
    } 

    getEventExpirationAge() {
        return ArnavDOMControl.eventExpirationTime;
    }

    registerActiveEvent(event, timeStamp) {
        ArnavDOMControl.activeEvents.set(event, timeStamp);
        return this;
    }

    isActiveEvent(event) {
        return ArnavDOMControl.activeEvents.get(event);
    }

    getEventTimeStamp(event) {
        return ArnavDOMControl.activeEvents.get(event);
    }

    clearObsoleteEvents(timeStamp) {

        for(let event of ArnavDOMControl.activeEvents.keys()) {

            const expirationAge = this.getEventExpirationAge();
            const eventAge = timeStamp - this.getEventTimeStamp(event);

            if(eventAge > expirationAge)
                ArnavTasker.activeEvents.delete(event);
        }

        return this;
    }

    isMyDOMEvent(event) {

        if(this.isActiveEvent(event)) 
            return false;

        const tsNow = (new Date()).getTime();

        this.registerActiveEvent(event, tsNow);
        this.clearObsoleteEvents(tsNow);

        return true;
    }

    static setDOMEventType2TaskTypeName(func) {
        ArnavDOMControl.DOMEventType2TaskTypeName = func;
        return this;
    }

    assembleDOMTaskTypeName(domEventType) {
        return ArnavDOMControl.DOMEventType2TaskTypeName(domEventType);
    }

    onevent(domEvent) {
        if(this.isMyDOMEvent(domEvent)) {
            const taskTypeName = this.assembleDOMTaskTypeName(domEvent.type);
            this.perform(this.emit(taskTypeName).setDOMEvent(domEvent), this);
        }
    }

    bind() {

        const domEventNames = ArnavDOMUtils.getDOMEventNames();
        
        const domObject = this.getDOMObject();
        
        if(!!domObject) 
            for(const domEventName of domEventNames)
                if(this.hasTaskHandler(this.assembleDOMTaskTypeName(domEventName)))
                    domObject.addEventListener(domEventName, e => this.onevent(e));
    
        return this;
    }

    // Assembling a corresponding DOM object

    setDOMElementName(domElementName) {
        this.domElementName = domElementName;
        return this;
    }

    getDOMElementName() {
        return this.domElementName;
    }

    getDOMObjectId() {
        return this.getId();
    }

    setCssClassName(cssClassName) {
        this.cssClassName = cssClassName;
        return this;
    }

    getCssClassName() {
        return this.cssClassName;
    }

    setHeaderDOMElementName(domElementName) {
        this.headerDomElementName = domElementName;
        return this;
    }

    getHeaderDOMElementName() {
        return this.headerDomElementName;
    }

    getHeaderDOMObjectId() {
        return this.getDOMObjectId() + "Header";
    }

    setHeaderCssClassName(cssClassName) {
        this.headerCssClassName = cssClassName;
        return this;
    }

    getHeaderCssClassName() {
        return this.headerCssClassName;
    }

    setBodyDOMElementName(domElementName) {
        this.bodyDomElementName = domElementName;
        return this;
    }

    getBodyDOMElementName() {
        return this.bodyDomElementName;
    }

    getBodyDOMObjectId() {
        return this.getDOMObjectId() + "Body";
    }

    setBodyCssClassName(cssClassName) {
        this.bodyCssClassName = cssClassName;
        return this;
    }

    getBodyCssClassName() {
        return this.bodyCssClassName;
    }

    setOffspringDOMElementName(domElementName) {
        this.offspringDomElementName = domElementName;
        return this;
    }

    getOffspringDOMElementName() {
        return this.offspringDomElementName;
    }

    getOffspringDOMObjectId() {
        return this.getDOMObjectId() + "Offspring";
    }

    setOffspringCssClassName(cssClassName) {
        this.offspringCssClassName = cssClassName;
        return this;
    }

    getOffspringCssClassName() {
        return this.offspringCssClassName;
    }

    setInitialDisplay(display="") {
        this.initialDisplay = display;
        return this; 
    }

    getInitialDisplay() {
        return this.initialDisplay;
    }

    assembleHeaderInnerDOMObjects() {
        return [];
    }

    assembleHeaderDOMObject() {

        const innerDomObjects = this.assembleHeaderInnerDOMObjects();

        if(innerDomObjects.length == 0) return null;

        const headerDomObject = document.createElement(this.getHeaderDOMElementName());
        headerDomObject.setAttribute("id", this.getHeaderDOMObjectId());
        headerDomObject.className = this.getHeaderCssClassName();

        for(const innerDomObject of innerDomObjects)
            headerDomObject.appendChild(innerDomObject);

        return headerDomObject;
    }

    assembleBodyInnerDOMObjects() {
        return [];
    }

    assembleBodyDOMObject() {

        const innerDomObjects = this.assembleBodyInnerDOMObjects();

        if(innerDomObjects.length == 0) return null;

        const bodyDomObject = document.createElement(this.getBodyDOMElementName());
        bodyDomObject.setAttribute("id", this.getBodyDOMObjectId());
        bodyDomObject.className = this.getBodyCssClassName();

        for(const innerDomObject of innerDomObjects)
            bodyDomObject.appendChild(innerDomObject);

        return bodyDomObject;
    }

    assembleOffspringInnirDOMObjects() {

        const offspringDomObjects = [];

        for(const tasker of this)
            offspringDomObjects.push(tasker.assembleDOMObject());

        return offspringDomObjects;
    }

    assembleOffspringDOMObject() {

        const innerDomObjects = this.assembleOffspringInnirDOMObjects();

        if(innerDomObjects.length == 0) return null;

        const offspringDomObject = document.createElement(this.getOffspringDOMElementName());
        offspringDomObject.setAttribute("id", this.getOffspringDOMObjectId());
        offspringDomObject.className = this.getOffspringCssClassName();

        for(const innerDomObject of innerDomObjects)
            offspringDomObject.appendChild(innerDomObject);

        return offspringDomObject;
    }

    assembleEmptyDOMObject() {
        const domObject = document.createElement(this.getDOMElementName());
        domObject.setAttribute("id", this.getDOMObjectId());
        domObject.className = this.getCssClassName();
        domObject.setAttribute("style", "display:" + this.getInitialDisplay());
        return domObject;
    }

    assembleDOMObject() {

        const domObject = this.assembleEmptyDOMObject();
        
        if(!domObject) return null;
        
        domObject.setAttribute("id", this.getDOMObjectId());
        domObject.className = this.getCssClassName();

        for(const partDomObject of 
            [this.assembleHeaderDOMObject(), this.assembleBodyDOMObject(), this.assembleOffspringDOMObject()])
            if(!!partDomObject) domObject.appendChild(partDomObject);

        this.setDOMObject(domObject).bind();

        return domObject;
    }

    // Accessing a corresponding DOM object

    hasDOMObject() {
        return !!document.getElementById(this.getId());
    }

    setDOMObject(domObject) {
        this.domObject = domObject;
        return this;
    }

    getDOMObject() {

        if(!this.domObject) 
            this.setDOMObject(document.getElementById(this.getDOMObjectId()));

        return this.domObject;
    }

    getHeaderDOMObject() {
        return document.getElementById(this.getHeaderDOMObjectId());
    }

    getBodyDOMObject() {
        return document.getElementById(this.getBodyDOMObjectId());
    }
}
