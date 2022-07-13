/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	bureaucrat.js                             (\(\
 Func:		Issue resolving generic procedures        (^.^)
* * ** *** ***** ******** ************* *********************/

const ITYPE_GENERIC   = "generic";
const ITYPE_DOM_EVENT = "dom";

class ArnavIssue {

	constructor(payload=null, iType=ITYPE_GENERIC, id=undefined) {
		this.iType = iType;
		this.id = id ? id : createUuid();
		this.payload = payload; 
		this.resolvers = {};
		this.active = true;
	}

	setType(iType) {
		this.iType = iType;
	}

	getType() {
		return this.iType;
	}

	getId() {
		return this.id;
	}

	setPayload(payload) {
		this.payload = payload;
	}

	getPayload() {
		return this.payload;
	}

	registerResolver(bureaucrat) {
		this.resolvers[bureaucrat.getId()] = true;
	}

	hasNoResolverWithId(bureaucratId) {
		return !this.resolvers[bureaucratId];
	}

	terminate() {
		this.active = false;
	}

	isActive() {
		return this.active;
	}

	isTerminated() {
		return !this.active;
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
		console.log(issue.resolvers);

		this.attempt(issue);
		issue.registerResolver(this);

		this.downstream(issue);
		this.escalate(issue);			
		
		return this;
	}

	edom(e) {
		this.resolve(new ArnavIssue(e, ITYPE_DOM_EVENT));
	}
}