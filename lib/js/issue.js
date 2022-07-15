/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	issue.js                                   (\(\
 Func:		Representing events occurring in a system  (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavIssue {

	constructor(iType="generic", payload=null) {
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

	convert(iType="generic", payload=null) {

		let src = new ArnavIssue(this.getType(), this.getPayload());
		this.setSrc(src.setId(this.getId()).setSrc(this.getSrc()).copyResolvers(this).terminate());
		
		this.setType(iType).setPayload(payload);

		return this;
	}
}