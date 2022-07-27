/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	app.js	                                   (\(\
 Func:		Application abstract class                 (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavApp extends ArnavBureaucrat {

	constructor() {
		
		super(null, "app");

		this.app = this;

		this.cfg = this.createCfg();
		this.loadCfg();

		this.page = this.createPage(this);
	}
	
	getGlobalAppName() {
		return "GLOBAL_APP";
	}

	getArnavUniqueId() {
		return "genericArnavApp2022";
	}

	createCfg() {
		return new ArnavCfg();
	}

	saveCfg() {
		saveToLocalStorage(this.getArnavUniqueId(), this.getCfg().assembleJson());
	}

	loadCfg() {
		let lsResult = loadFromLocalStorage(this.getArnavUniqueId());
		if(lsResult.statusCode == STATUS_OK)
			this.getCfg().unpackFromJson(lsResult.value);
	}
	
	createPage(chief) {
		/* abstract */
		return null;
	}

	afterRun() {
		/* abstract */
	}

	run() {
		this.afterRun();
	}

	beforeQuit() {
		/* abstract */
	}

	print() {
		let tmp = document.body.innerHTML; 
		document.body.innerHTML = document.getElementById('divTopicBody').innerHTML;
		window.print();
		document.body.innerHTML = tmp;
	}

	quit() {
		this.beforeQuit();
		this.saveCfg();
	}

}
