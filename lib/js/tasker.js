// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      tasker.js                                 (\(\
// Func:        A base for each model, view, controller   (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavTasker extends ArnavRoot {

    static everyone = {};

    constructor(chief=null, options=null, id=undefined) {

        super(id);

        this.registerTasker(this);

        this.chief = chief;
        this.options = options;

        this.fsms = [];

        this.taskers = {};
    }

    *[Symbol.iterator]() {
        for(const taskerId of Object.keys(this.taskers)) 
            yield this.taskers[taskerId];
    }

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

    countTaskers() {
        return Object.keys(this.taskers).length;
    }

    hasChief() {
        return !!this.chief;
    }

    setChief(chiefTasker) {

        this.chief = chiefTasker;

        if(chiefTasker)
            chiefTasker.addTasker(this);
        
        return this;
    }

    getChief() {
        return this.chief;
    }

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

    hasTasker(taskerId) {
        return !!this.taskers[taskerId];
    }

    addTasker(tasker) {
        this.taskers[tasker.getId()] = tasker;
        this.registerTasker(tasker);
        return this;
    }

    getTasker(taskerId) {
        return ArnavTasker.everyone[taskerId];
    }

    removeTaskerFromSubsets(taskerId) {

    }

    removeTasker(taskerId) {
        delete this.taskers[taskerId];
        this.unregisterTasker(taskerId);
        this.removeTaskerFromSubsets(taskerId);
        return this;
    }

    addFiniteStateMachine(fsm) {
        this.fsms.push(fsm);
        return this;
    }

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

        if(this.hasChief())
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
