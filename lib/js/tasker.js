// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      tasker.js                                 (\(\
// Func:        A base for each model, view, controller   (^.^)  
// * * ** *** ***** ******** ************* *********************

/**
 * 
 * @class ArnavTasker
 * @classdesc Implements common features for processing tasks.  
 */

class ArnavTasker extends ArnavRoot {

    static everyone = {};
    static app = null;

    /**
     * 
     * @param {ArnavTasker|null} chief The chief tasker for the object 
     * @param {object|null} options A pack of custom options for creating a tasker. The set 
     *                         of keys in an options object depends on a certain class
     *                         derived ArnavTasker
     * @param {string|undefined} id An unique identifier of the new tasker
     */
    constructor(chief=null, options=null, id=undefined) {

        super(id);

        this.registerTasker(this);

        this.chief = chief;
        this.options = options;

        this.fsms = [];

        this.taskers = {};

        this.bannedEscalationRegexp = undefined;
    }

    *[Symbol.iterator]() {
        for(const taskerId of Object.keys(this.taskers)) 
            yield this.taskers[taskerId];
    }

    /**
     * 
     * @callback eachTaskerCallback
     * @param {ArnavTasker} tasker A subordinate tasker
    */

    /**
     * 
     * Executes a given function for each subordinate tasker of the tasker.
     * @param {eachTaskerCallback} callback 
     * @returns The calling object.
     */
    forEach(callback) {

        for(const tasker of this) 
            callback(tasker);

        return this;
      }

    getTaskHandlerPrefix() {
        return "handle__";
    }

    assembleTaskHandlerName(taskTypeName) {
        return this.getTaskHandlerPrefix() + taskTypeName;
    }

    hasFSMTaskHandler(taskTypeName) {

        for(const fsm of this.fsms) 
            if(fsm.hasSymbol(taskTypeName))
                return true;

        return false;
    }

    hasExplicitTaskHandler(taskTypeName) {
        return !!this[this.assembleTaskHandlerName(taskTypeName)];
    }

    hasTaskHandler(taskTypeName) {
        return this.hasExplicitTaskHandler(taskTypeName) || this.hasFSMTaskHandler(taskTypeName);
    }

    /**
     * 
     * Counts the number of subordinate taskers of the tasker. 
     * @returns The number of subordinate taskers of the tasker. 
     */
    countTaskers() {
        return Object.keys(this.taskers).length;
    }

    /**
     * 
     * Checks if a tasker has a chief tasker.
     * @returns true if a chief of the tasker is available, otherwise returns false.
     */
    hasChief() {
        return !!this.chief;
    }

    /**
     * 
     * Assigns a chief tasker for the tasker.
     * @param {ArnavTasker} chiefTasker A tasker that becomes a chief of the tasker.
     * @returns The calling object.
     */
    setChief(chiefTasker) {

        this.chief = chiefTasker;

        if(chiefTasker)
            chiefTasker.addTasker(this);
        
        return this;
    }

    setDefaultChief() {
        return this.setChief(this.getApp());
    }


    /**
     * 
     * Gives the chief of the tasker.
     * @returns The chief tasker of the tasker.
     */
    getChief() {
        return this.chief;
    }

    /**
     * 
     * Retrieves the value of a property that can be assigned either to the tasker or to one of its superiors in the hierarchy. 
     * @param {string} propName The name of a target property.
     * @returns The value of a target property. The method returns `undefined` if the property is nowhere defined. 
     */
    inheritProp(propName) {

        let propValue = undefined;

        if(propName in this) 
            propValue = this[propName];
        else if(this.hasChief()) {
            if(this.getChief().inheritProp) 
                propValue = this.getChief().inheritProp(propName);
        }
        
        return propValue;
    }

    registerTasker(tasker) {
        ArnavTasker.everyone[tasker.getId()] = tasker;
        return this;
    }

    unregisterTasker(taskerId) {
        delete ArnavTasker.everyone[taskerId()];
        return this;
    }

    /**
     * Verifies whether the tasker has a subordinate tasker matching the provided identifier. 
     * @param {*} taskerId 
     * @returns true if the tasker has a subordinate tasker matching the provided identifier, 
     *          otherwise returns false.
     */
    hasTasker(taskerId) {
        return !!this.taskers[taskerId];
    }

    /**
     * Adds the provided tasker as a subordinate to the senior tasker.
     * @param {*} tasker - A subordinate tasker to be added to the tasker.
     * @returns The calling object.
     */
    addTasker(tasker) {
        this.taskers[tasker.getId()] = tasker;
        this.registerTasker(tasker);
        return this;
    }

    /**
     * Retrieves a subordinate tasker by its identifier.
     * @param {*} taskerId - An identifier of the requested subordinate tasker.
     * @returns The requested tasker. 
     */
    getTasker(taskerId) {
        return ArnavTasker.everyone[taskerId];
    }

    getApp() {
        return ArnavTasker.app;
    }

    /**
     * Excludes a tasker from custom subsets of subordinate taskers.
     * @param {*} taskerId - The identifier of the tasker to be excluded from custom 
     *                       subsets of subordinate taskers.
     * @abstract
     */
    removeTaskerFromSubsets(taskerId) {

    }

    /**
     * Removes a subordinate tasker from the senior tasker.
     * @param {*} taskerId - The identifier of the tasker to be removed.
     * @returns The calling object.
     */
    removeTasker(taskerId) {
        delete this.taskers[taskerId];
        this.unregisterTasker(taskerId);
        this.removeTaskerFromSubsets(taskerId);
        return this;
    }

    /**
     * Appends 
     * @param {ArnavFiniteStateMachine} fsm - A finite state machine to be added to the tasker. 
     * @returns The calling object.
     */
    addFiniteStateMachine(fsm) {
        this.fsms.push(fsm);
        return this;
    }


    /**
     * Handles a transition of a finite state machine if an explicit handler is not
     * specified for this transition.
     * @param {FiniteStateMachine} fsm - The finite state machine made the transtition
     * @param {string} taskPattern - A template for the name of a task that the method
     * should send based on the transition
     * @returns The calling object. 
     */
    ontrans(fsm, taskPattern=undefined) {

        const source = fsm.getPrevStateName();
        const symbol = fsm.getLastSymbol();
        const target = fsm.getCurrStateName(); 

        const defaultPattern = "${source}__${target}";
        const actualTaskPattern = taskPattern ? taskPattern : defaultPattern;
        const fsmTaskTypeName = eval("`" + actualTaskPattern + "`");

        const task = fsm.getLastPayload();

        let fsmTask = this.mutate(task, fsmTaskTypeName).makePrivate();

        this.perform(fsmTask);

        return this;
    }

    /**
     * Banning escalation for tasks by their names.
     * @param {RegExp} taskTypeNameRegexp - A regular expression for task names to be banned for escalating.
     * @returns The calling obgect.
     */
    banEscalation(taskTypeNameRegexp=/.*/) {
        this.bannedEscalationRegexp = taskTypeNameRegexp;
        return this;
    }

    getBannedEscalationRegexp() {
        return this.bannedEscalationRegexp;
    }

    escalationAllowed(task) {
        const banRegexp = this.getBannedEscalationRegexp();
        if(!banRegexp) return true;
        return !banRegexp.test(task.getTypeName());
    }

    accept(task) {
        return task.isActive() && !task.hasAttempter(this.getId());
    }

    cease(task) {
        task.cease(this);
        return this;
    }

    start(task) {

    }

    finish(task) {

    }

    applyFiniteStateMachines(task) {

        let handledByFsm = false;

        for(let fsm of this.fsms) 
            handledByFsm ||= fsm.consume(task.getTypeName(), task).isOk();

        if(handledByFsm) 
            this.cease(task);

        return this;
    }

    applyExpicitHandler(task) {

        const taskTypeName = task.getTypeName();

        if(this.hasExplicitTaskHandler(taskTypeName)) 
            this[this.assembleTaskHandlerName(taskTypeName)](task);

        return this;
    }

    diy(task) {
        return this.applyFiniteStateMachines(task).applyExpicitHandler(task);
    }

    delegate(task, tasker) {
        return tasker.perform(task);
    }

    escalate(task) {

        if(this.hasChief() && this.escalationAllowed(task))
            this.delegate(task, this.getChief());

        return this;
    }

    shareWithColleagues(task) {

        if(this.hasChief())
            for(const tasker of this.getChief())
                tasker.perform(task);

        return this;
    } 

    downstream(task) {

        for(const tasker of this)
            if(task.isActive())
                this.delegate(task, tasker);
            else
                break;
		
        return this;	
    }

    perform(task) {
        
        if(this.accept(task)) {
            
            task.registerAttempter(this);
        
            this.start(task);

            this.diy(task);
            
            if(task.isActive()) {
                
                if(task.isBroadcast() || task.isBubble())
                    this.escalate(task);

                if(task.isCollegial())
                    this.shareWithColleagues(task);

                if(task.isBroadcast() || task.isSinker() || task.isCollegial())
                    this.downstream(task);
            }
            
            this.finish();
        }

        return this;
    }

    emit(taskTypeName="generic") {
        return new ArnavTask(taskTypeName).setEmitter(this);
    }

    derive(task, taskTypeName=undefined) {
            
        let derivedTask = 
            this.emit(!!taskTypeName ? taskTypeName : task.getTypeName())
                .setScope(task.getScopeName())
                .setDOMEvent(task.getDOMEvent())
                .setOriginal(task);

        return derivedTask;
    }

    mutate(task, taskTypeName=undefined) {
        
        let mutantTask = this.derive(task, taskTypeName);
        
        this.cease(task);
        
        return mutantTask;
    }
    
    installFiniteStateMachines() {

    }

    turnOn() {
        
        this.installFiniteStateMachines();

        for(const tasker of this)
            tasker.turnOn();
        
        return this;
    }

    turnOff() {

        for(const tasker of this)
            tasker.turnOff();

        return this;
    }

} 
