/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	bureaucrat.js                             (\(\
 Func:		Issue resolving generic procedures        (^.^)
* * ** *** ***** ******** ************* *********************/

const ITYPE_GENERIC   = "generic";
const ITYPE_DOM_EVENT = "dom";

class ArnavIssue {

	constructor(iType=ITYPE_GENERIC, payload=null) {
		this.setType(iType);
		this.setPayload(payload);
		this.setId();
		this.src = null; 
		this.sender = null;
		this.resetResolvers();
		this.activate();
	}

	setType(iType) {
		this.iType = iType;
		return this;
	}

	getType() {
		return this.iType;
	}

	setPayload(payload) {
		this.payload = payload;
		return this;
	}

	getPayload() {
		return this.payload;
	}

	setId(id=undefined) {
		this.id = id ? id : createUuid();
		return this;
	}

	getId() {
		return this.id;
	}

	setSrc(src) {
		this.src = src;
		return this;
	}

	hasSrc() {
		return !!this.src;
	}

	getSrc() {
		return this.src;
	}

	setSender(bureaucrat) {
		this.sender = bureaucrat;
		return this;
	}

	getSender() {
		return this.sender;
	}

	registerResolver(bureaucrat) {
		this.resolvers.push(bureaucrat);
		this.revResolvers[bureaucrat.getId()] = true;
		return this;
	}

	hasResolverWithId(bureaucratId) {
		return this.revResolvers[bureaucratId];
	}

	hasResolver(bureaucrat) {
		return this.hasResolverWithId(bureaucrat.getId());
	}

	resetResolvers() {
		this.resolvers = [];
		this.revResolvers = {};
		return this;
	}

	copyResolvers(issue) {
		for(let i in issue.resolvers)
			this.registerResolver(issue.resolvers[i]);
		return this;
	}

	activate() {
		this.active = true;
		return this;
	}

	terminate() {
		this.active = false;
		return this;
	}

	isActive() {
		return this.active;
	}

	isTerminated() {
		return !this.active;
	}

	convert(iType=ITYPE_GENERIC, payload=null) {

		let src = new ArnavIssue(this.getType(), this.getPayload());
		this.setSrc(src.setId(this.getId()).setSrc(this.getSrc()).copyResolvers(this).terminate());
		
		this.setType(iType).setPayload(payload);

		return this;
	}
}												 


 class ArnavBureaucrat {

	constructor(chief=null, id=undefined) {
		this.chief = chief;
		this.id = id ? id : createUuid();
		this.cfg = null;
		this.model = null;
		this.page = null;
		this.workers = [];
		if(chief) chief.registerWorker(this);
		this.setupProperties();
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
		this.afterRegisterWorker(bureaucrat)
		return this;
	}

	hasWorkers() {
		return this.workers.length > 0;
	}

	countWorkers() {
		return this.workers.length;
	}

	getWorkerByIdx(idx) {
		return this.workers[idx];
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

	setModel(model) {
		this.model = model;
		return this;
	}

	getModel() {
		return this.getProp("model");
	}

	setPage(page) {
		this.page = page;
		return this;
	}

	getPage() {
		return this.getProp("page");
	}

	createIssue(iType=ITYPE_GENERIC, payload=null) {
		return new ArnavIssue(iType, payload);
	}

	handle(issue) {
		/* abstract */
	}

	dispatch(issue) {
		let iType = issue.getType();
		typeof this[iType] === "function" ? this[iType](issue) : this.handle(issue);
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

	edom(e) {
		this.resolve(this.createIssue(this.mapDomEventType(e), e).setSender(this));
	}

	sendIssue(issue, bureaucrat) {
		this.delegate(issue.setSender(this), bureaucrat);
	}
}