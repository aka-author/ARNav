// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      fsm.js                                  (\(\
// Func:        Simulating a finite state machine       (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavFiniteStateMachine extends ArnavRoot {

    constructor(id=undefined) {

        super(id);

        this.sourceStateNames = new Set();
        this.targetStateNames = new Set();
        this.alphabet = new Set();

        this.initialStateName = undefined;
        this.acceptingStateNames = new Set();

        this.transitions = {};
        this.defaultTrigger = null;
        
        this.clear();
    }

    clear() {
        this.currStateName = undefined;
        this.prevState = undefined;
        this.lastSymbol = undefined;
        this.lastPayload = null;
        this.setStatusCode(this.statusCodes.Ok);
    }

    setInitialState(stateName) {
        this.initialStateName = stateName;
        return this;
    }

    getInitialStateName() {
        return this.initialStateName;
    }

    addAcceptingState(stateName) {
        this.acceptingStates.add(stateName);
        return this;
    }

    isAcceptedState(stateName) {
        return this.acceptingStates.has(stateName);
    }

    addTransition(sourceStateName, inputSymbol, targetStateName, triggerFunc=null) {

        if(!this.transitions[sourceStateName])
            this.transitions[sourceStateName] = {};

        const outcome = {"targetStateName": targetStateName, "trigger": triggerFunc}

        this.transitions[sourceStateName][inputSymbol] = outcome;

        if(!!this.initialStateName)
            this.setInitialState(sourceStateName);

        this.sourceStateNames.add(sourceStateName);
        this.targetStateNames.add(targetStateName);
        this.alphabet.add(inputSymbol);

        return this;
    }

    addTransitions(...transitions) {

        for(let t of transitions) 
            this.addTransition(t[0], t[1], t[2], !!t[3] ? t[3] : undefined);

        return this;
    } 

    hasDefaultTrigger() {
        return !!this.defaultTrigger;
    }

    setDefaultTrigger(triggerFunc) {
        this.defaultTrigger = triggerFunc;
        return this;
    }

    getDefaultTrigger() {
        return this.defaultTrigger;
    }

    isAccepted() {
        return this.isAcceptedState(this.getCurrStateName());
    }

    getCurrStateName() {
        return this.currStateName;
    }

    setCurrState(stateName) {
        this.currStateName = stateName;
        return this;
    }

    hasSourceState(stateName) {
        return !!this.sourceStateNames.has(stateName);
    }

    hasTargetState(stateName) {
        return !!this.targetStateNames.has(stateName);
    }

    hasSymbol(symbol) {
        return this.alphabet.has(symbol);
    }

    hasTransition(sourceStateName, symbol) {
        return ArnavUtils.matrixExists(this.transitions, sourceStateName, symbol)
    }

    getTransitionOutcome(sourceStateName, symbol) {
        return this.hasTransition(sourceStateName, symbol) ? this.transitions[sourceStateName][symbol] : null;
    }

    setPrevState(stateName) {
        this.prevStateName = stateName;
        return this;
    }

    getPrevStateName() {
        return this.prevStateName;
    }

    setLastSymbol(symbol) {
        this.lastSymbol = symbol;
        return this;
    }

    getLastSymbol() {
        return this.lastSymbol;
    }

    setLastPayload(payload) {
        this.lastPayload = payload;
        return this;
    }

    getLastPayload() {
        return this.lastPayload;
    }

    getLastTaskProp(propName) {
        return this.getLastPayload().getPayload()[propName];
    }

    consume(symbol, payload=null) {

        this.setStatusCode(this.statusCodes.Failure);
        
        const currStateName = this.getCurrStateName();
        
        if(this.hasTransition(currStateName, symbol)) {
            
            const outcome = this.getTransitionOutcome(currStateName, symbol);

            this.setPrevState(this.getCurrStateName());
            this.setLastSymbol(symbol);
            this.setLastPayload(payload);
            this.setCurrState(outcome.targetStateName);
            
            if(!!outcome.trigger) 
                outcome.trigger(this);
            else if(this.hasDefaultTrigger())
                this.getDefaultTrigger()(this);

            this.setStatusCode(this.statusCodes.Ok);
        }

        return this;
    }

    reset() {
        this.clear();
        this.setCurrState(this.getInitialStateName());
        return this;
    }

}