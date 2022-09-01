/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	bureaucrat.js                             (\(\
 Func:		Generic methods for resolving issues      (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavBureaucrat {

	constructor(chief=null, id=undefined) {

		this.assignType(ARNAV_TYPE_BUREAUCRAT);
		
		this.chief = chief;
		this.id = id ? id : createUuid();
		this.cfg = null;
		this.model = null;
		this.page = null;
		this.workers = [];
		this.workersById = {};
		if(chief) chief.registerWorker(this);
		this.setupProperties();
	}
	
	assignType(typeName) {
		if(!this.types) this.types = {};
		this.types[typeName] = true;
	}

	hasType(typeName) {
		return this.types && this.types[typeName];
	}

	setupProperties() {
		/* abstract */
	}

	hasChief() {
		return !!this.chief;
	}
	
	getChief() {
		return this.chief;
	}
		
	getId() {
		return this.id;
	}

	beforeRegisterWorker(bureaucrat) {
		/* abstract */
	}

	afterRegisterWorker(bureaucrat) {
		/* abstract */
	}
	
	registerWorker(bureaucrat) {
		this.beforeRegisterWorker(bureaucrat)
		this.workers.push(bureaucrat);
		this.workersById[bureaucrat.getId()] = bureaucrat;
		this.afterRegisterWorker(bureaucrat)
		return this;
	}

	getWorkers(typeName=undefined) {

		let workers = [];
		
		if(!!typeName) {
			for(let i in this.workers) 
				if(this.workers[i].hasType(typeName))
					workers.push(this.workers[i]);
		} else
			workers = this.workers;
		
		return workers;
	}

	hasWorkers(typeName=undefined) {
		return this.getWorkers(typeName).length > 0;
	}

	countWorkers(typeName=undefined) {
		return this.getWorkers(typeName).length;
	}

	getWorkerByIdx(idx) {
		return this.workers[idx];
	}

	getWorkerById(id) {
		return this.workersById[id];
	}

	getProp(propName) {
		return this[propName] ? this[propName] : (this.hasChief() ? this.getChief().getProp(propName) : null);
	}

	isApp() {
		return false;
	}
	
	getApp() {
		return this.getProp("app");
	}

	getCfg() {
		return this.getProp("cfg");
	}

	hasModel() {
		return !!this.model;
	}

	setModel(model) {
		this.model = model;
		return this;
	}

	getModel() {
		return this.getProp("model");
	}

	getActiveModelId() {
		return this.getApp().getActiveModelId()
	}

	setPage(page) {
		this.page = page;
		return this;
	}

	getPage() {
		return this.getProp("page");
	}

	setCfgProp(propName, propValue) {
		this.getCfg().setProp(propName, propValue, this.getActiveModelId());
	}

	getCfgProp(propName) {
		return this.getCfg().getProp(propName, this.getActiveModelId());
	}

	beforeRun() {}

	runTask() {
		this.getWorkers().forEach(worker => worker.run());
	}

	afterRun() {}

	run() {
		this.beforeRun();
		this.runTask()
		this.afterRun();
	}

	beforeQuit() {}

	quitTask() {
		this.getWorkers().forEach(worker => worker.quit());
	}

	afterQuit() {}

	quit() {
		this.beforeQuit();
		this.quitTask();
		this.afterQuit();
	}

	createIssue(iType=ITYPE_GENERIC, payload=null) {
		return new ArnavIssue(iType, payload);
	}

	assembleHandleFuncName(iTypeName, envTypeName=undefined) {
		return "handle__" + iTypeName + (!!envTypeName ? "__" + envTypeName : "");
	}

	hasHandleFunc(iTypeName, envTypeName=undefined) {
		let handleFuncName = this.assembleHandleFuncName(iTypeName, envTypeName);
		return typeof this[handleFuncName] === "function";
	}

	handle(issue) {
		/* abstract */
	}

	dispatch(issue) {
		let iTypeName = issue.getType();
		let handleFuncName = this.assembleHandleFuncName(iTypeName);
		typeof this[handleFuncName] === "function" ? this[handleFuncName](issue) : this.handle(issue);
	}

	attempt(issue) {
		this.dispatch(issue);
	}

	delegate(issue, bureaucrat) {
		bureaucrat.resolve(issue);
	}

	escalate(issue) {
		if(issue.isActive() && this.hasChief()) this.delegate(issue, this.getChief());
	}

	downstream(issue) {
		let workerIdx = 0;
		while(issue.isActive() && workerIdx < this.countWorkers()) 
			this.delegate(issue, this.getWorkerByIdx(workerIdx++));	
	}

	canResolve(issue) {
		return !issue.hasResolver(this); 
	}

	resolve(issue) {
		
		if(this.canResolve(issue)) {
			
			issue.registerResolver(this);

			this.attempt(issue);
			this.downstream(issue);
			this.escalate(issue);
		}
		
		return this;
	}

	mapDomEventType(e) {
		return e.type;
	}

	isDomEventValid(e) {
		return e.detail != "dummy";
	}

	edom(e) {
		if(this.isDomEventValid(e)) {
			this.getDomObject().dispatchEvent(new CustomEvent(e.type, {"detail": "dummy"}));		
			e.stopPropagation();
			this.resolve(this.createIssue(this.mapDomEventType(e), e).setSender(this));
		}
	}

	sendIssue(issue, bureaucrat) {
		this.delegate(issue.setSender(this), bureaucrat);
	}
}