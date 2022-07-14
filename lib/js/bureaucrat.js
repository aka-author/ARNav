/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	bureaucrat.js                             (\(\
 Func:		Issue resolving generic procedures        (^.^)
* * ** *** ***** ******** ************* *********************/

const ITYPE_GENERIC   = "generic";
const ITYPE_DOM_EVENT = "dom";

class ArnavIssue {

	constructor(iType, payload=null, id=undefined, src=null) {
		this.setType(iType);
		this.setPayload(payload);
		this.setId(id);
		this.setSrc(src); 
		this.resetResolvers();
		this.active = true;
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

	setId(id) {
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

	registerResolver(bureaucrat) {
		this.resolvers.push(bureaucrat);
		this.revResolvers[bureaucrat.getId()] = true;
		return this;
	}

	hasNoResolverWithId(bureaucratId) {
		return !this.revResolvers[bureaucratId];
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

	convert(iType, payload=null, id=undefined) {

		let src = new ArnavIssue(this.getType(), this.getPayload(), this.getId(), this.getSrc());
		this.setSrc(src.copyResolvers(this).terminate());
		
		this.setType(iType).setPayload(payload).setId(id);

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

	isApp() {
		return false;
	}
	
	getApp() {
		return this.isApp() ? this : (this.hasChief() ? this.getChief().getApp() : null);
	}

	getCfg() {
		return this.cfg ? this.cfg : (this.hasChief() ? this.getChief().getCfg() : null);
	}

	setModel(model) {
		this.model = model;
		return this;
	}

	getModel() {
		return this.model ? this.model : (this.hasChief() ? this.getChief().getModel() : null);
	}

	setPage(page) {
		this.page = page;
		return this;
	}

	getPage() {
		return this.page ? this.page : (this.hasChief() ? this.getChief().getPage() : null);
	}

	delegate(issue, bureaucrat) {
		if(issue.hasNoResolverWithId(bureaucrat.getId()))
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

	attempt(issue) {
		/* abstract */
	}

	resolve(issue) {

		this.attempt(issue);
		issue.registerResolver(this);

		this.downstream(issue);
		this.escalate(issue);			
		
		return this;
	}

	edom(e) {
		this.resolve(new ArnavIssue(ITYPE_DOM_EVENT, e));
	}
}