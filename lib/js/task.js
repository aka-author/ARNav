// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      task.js                                   (\(\
// Func:        Data blocks taskers send to each other    (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavTask extends ArnavRoot {

    constructor(typeName="generic", id=undefined) {
        
        super(id);
        
        this.typeName = typeName;
        this.scopeName = "bubble";

        this.activeFlag = true;

        this.emitter = null;
        this.ceaser = null;

        this.domEvent = null;
        this.payload = null;
        this.original = null;
        
        this.attempters = {};
        this.reset();
    }

    setType(typeName) {
        this.typeName = typeName;
        return this;
    }

    getTypeName() {
        return this.typeName;
    }

    setScope(scopeName) {
        this.scopeName = scopeName;
        return this;
    }

    getScopeName() {
        return this.scopeName;
    }

    isActive() {
        return this.activeFlag;
    }

    makeBroadcast() {
        this.setScope("broadcast");
        return this;
    }

    isBroadcast() {
        return this.scopeName == "broadcast";
    }

    makeBubble() {
        this.setScope("bubble");
        return this;
    }

    makeCollegial() {
        this.setScope("collegial");
        return this;
    }

    isCollegial() {
        return this.scopeName == "collegial";
    }

    isBubble() {
        return this.scopeName == "bubble";
    }

    makePrivate() {
        this.setScope("private");
        return this;
    }
    
    isPrivate() {
        return this.scopeName == "private";
    } 

    makeSinker() {
        this.setScope("sinker");
        return this;
    }

    isSinker() {
        return this.scopeName == "sinker";
    }

    hasDOMEvent() {
        return !!this.domEvent;
    }

    setDOMEvent(domEvent) {
        this.domEvent = domEvent;
        return this;
    }

    getDOMEvent() {
        return this.domEvent;
    }

    setPayload(payload) {
        this.payload = payload;
        return this;
    }

    getPayload() {
        return this.payload;
    }

    hasOriginal() {
        return !!this.original;
    }

    setOriginal(task) {
        this.original = task;
        return this;
    }

    getOriginal() {
        return this.original;
    }

    setEmitter(tasker) {
        this.emitter = tasker;
        return this;
    }

    getEmitter() {
        return this.emitter;
    }

    setCeaser(tasker) {
        this.ceaser = tasker;
        return this;
    }

    getCeaser() {
        return this.ceaser;
    }

    registerAttempter(attempter) {
        this.attempters[attempter.getId()] = attempter;
        return this;
    }

    hasAttempter(attempterId) {
        return !!this.attempters[attempterId];
    }

    reset() {
        this.activeFlag = true;
        this.attempters = {};
        return this;
    }

    cease(tasker) {
        this.activeFlag = false;
        this.setCeaser(tasker);
        return this;
    }
    
    getDOMTarget() {
        const e = this.getDOMEvent();
        return !!e ? e.target : null; 
    }

    getDOMClientVect() {
        const e = this.getDOMEvent();
        return !!e ? new ArnavVect(e.clientX, e.clientY) : null;
    }

    getDOMViewportVect() {
        

    }
}
