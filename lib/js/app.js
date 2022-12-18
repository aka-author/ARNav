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

		this.i18n = this.createI18n();
		this.currLocalCode = "en";

		this.page = this.createPage(this);

		this.measurements = [];
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
	
	createI18n() {
		return new ArnavI18n(this);
	}

	getActiveModelId() {
		return this.hasModel() ? this.getModel().getId() : undefined;
	}

	createPage(chief) {	return null }

	getMetaContent(metaName) {
		return getMetaContent(metaName)
	}

	print() {
		let tmp = document.body.innerHTML; 
		document.body.innerHTML = document.getElementById('divTopicBody').innerHTML;
		window.print();
		document.body.innerHTML = tmp;
		location.reload();
	}

	afterQuit() {
		//this.saveCfg();
	}

}
