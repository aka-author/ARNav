/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	icap.js	                               (\(\
 Func:		Collecting statistical data            (^.^)
* * ** *** ***** ******** ************* *********************/

function icapAssembleUniqueId() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


function icapAssembleNowString() {

    function d2(n) {return (n < 10 ? "0" : "") + Math.abs(n)}
    function d3(n) {return (n < 10 ? "00" : (n < 100 ? "0" : "")) + Math.abs(n)}
    function p3(a, b, c, s) {return [d2(a), d2(b), d2(c)].join(s)}
    function sn(n) {return n < 0 ? "-" : "+"}

    let d = new Date();

    let fDate = p3(d.getFullYear(), d.getMonth() + 1, d.getDate(), "-");
    let fTime = p3(d.getHours(), d.getMinutes(), d.getSeconds(), ":") + "." + d3(d.getMilliseconds());
    let tzOffset = -d.getTimezoneOffset()/60;
    let fTzOffset = sn(tzOffset) + d2(tzOffset);

    return  fDate + " " + fTime + " UTC" + fTzOffset;
}


class IcapVarValue {

    constructor(varName, parsableValue) {
        this.varName = varName;
        this.parsableValue = parsableValue; 
    }

    getVarName() {
        return this.varName;
    }

    setParsableValue(parsableValue) {
        this.parsableValue = parsableValue;
        return this;
    }    

    getParsableValue() {
        return this.parsableValue;
    }

    exportDto() {

        let dto = {
            "varname": this.getVarName(),
            "parsable_value": this.getParsableValue()
        }

        return dto;
    }
}


class IcapMeasurement {

    constructor(sensorId) {
        this.id = icapAssembleUniqueId();
        this.acceptedAt = icapAssembleNowString();
        this.sensorId = sensorId;
        this.argValues = [];
        this.outValues = [];
        this.committed = false;
    }

    getId() {
        return this.id;
    }

    getAcceptedAt() {
        return this.acceptedAt;
    }

    getSensorId() {
        return this.sensorId;
    }

    createVarValue(varName, parsableValue) {
        return new IcapVarValue(varName, parsableValue);
    }

    addArgValue(varName, parsableValue) {
        this.argValues.push(this.createVarValue(varName, parsableValue));
        return this;
    }

    addOutValue(varName, parsableValue) {
        this.outValues.push(this.createVarValue(varName, parsableValue));
        return this;
    }

    assembleValDtoArray(vals) {
        let dtos = [];
        vals.forEach(v => dtos.push(v.exportDto()));
        return dtos;
    }

    exportArgDtos() {
        return this.assembleValDtoArray(this.argValues);
    }

    exportOutDtos() {
        return this.assembleValDtoArray(this.outValues);
    }

    exportDto() {

        let dto = {
            "id": this.getId(),
            "accepted_at": this.getAcceptedAt(),
            "sensor_id": this.getSensorId(),
            "args": this.exportArgDtos(),
            "outs": this.exportOutDtos()
        }

        return dto;
    }

    markAsCommitted() {
        this.committed = true;
    }

    isCommitted() {
        return this.committed;
    }
}


class IcapParser {

    constructor() {

        this.icapMetas = {};
        
        for(let meta of document.getElementsByTagName("meta")) 
            if(this.isIcapMeta(meta))
                this.icapMetas[meta.getAttribute("name")] = meta.getAttribute("content");
    }

    getPageTitle() {
        let title = document.getElementsByTagName("title")[0];
        return !!title ? title.innerText : "";
    }

    getPageUrl() {
        return location.href;
    }

    getUserAgent() {
        return navigator.userAgent;
    }

    getUserLangCode() {
        return navigator.language;
    }

    isIcapMetaName(metaName) {
        return metaName.indexOf("icap.") == 0;
    }

    isIcapMeta(meta) {
        return this.isIcapMetaName(String(meta.getAttribute("name")));
    }

    getMeta(metaName) {
        return this.icapMetas[metaName];
    }

    getDocLocalCode() {

        let html = document.getElementsByTagName("html");

        let explicitLocalCode = html[0].getAttribute("lang");

        return !!explicitLocalCode ? explicitLocalCode : "en";
    }

    getReceiverEndpointUrl() {
        return this.getMeta("icap.receiver.endpointUrl");
    }

    getSensorId() {
        return this.getMeta("icap.sensor.id");
    }

    getDocSignature() {
        return this.getMeta("icap.cms.doc.uid") + ":" + this.getMeta("icap.cms.doc.verno");     
    }

    isIcapTaxonomyMetaName(metaName) {
        return metaName.indexOf("icap.cms.taxonomy.") == 0;
    }

    getTaxonomy() {

        let taxonomy = [];

        for(let metaName of Object.keys(this.icapMetas))
            if(this.isIcapTaxonomyMetaName(metaName))
                taxonomy.push({"entry": metaName, "content": this.getMeta(metaName)})

        return taxonomy;
    }
}


class IcapReporter {

    constructor() {
        this.parser = this.createParser();

        this.prevPagereadId = this.recallPrevPagereadId();
        this.setPagereadId();
        
        this.startedAt = new Date();
        
        this.measurements = [];

        this.addPagereadMeasurement();
        this.addTaxonomyMeasurement();
        this.addCountryMeasurement();
        this.addLoadActionMeasurement();

        this.commitMeasurements();
    }

    createParser() {
        return new IcapParser();
    }

    getPagereadStorageKey() {
        "icap." + this.parser.getDocSignature();
    }

    recallPrevPagereadId() {
        return localStorage.getItem(this.getPagereadStorageKey());
    }

    setPagereadId() {
        this.pagereadId = icapAssembleUniqueId();
        localStorage.setItem(this.getPagereadStorageKey(), this.pagereadId);
    }

    getPagereadId() {
        return this.pagereadId;
    }

    getPrevPagereadId() {
        return this.prevPagereadId;
    }

    getStartedAt() {
        return this.startedAt;
    }

    getTimeOffset() {
        return (new Date()).getTime() - this.getStartedAt().getTime();
    }

    getNotCommittedMeasurements() {
        return this.measurements.filter(m => !m.isCommitted());
    }

    markMeasurementsAsCommitted() {
        this.measurements.forEach(m => m.markAsCommitted());
    }

    getCommitMeasurementsRequestHeaders() {
        return {"Content-Type": "application/json"};
    }

    createMeasurement() {
        return new IcapMeasurement(this.parser.getSensorId());
    }

    addMeasurement(measurement) {
        this.measurements.push(measurement);
    }

    addPagereadMeasurement() {
        
        let m = this.createMeasurement();

        m.addArgValue("icap.pagereadId", this.getPagereadId());
        m.addOutValue("icap.prevPagereadId", this.getPrevPagereadId());
        m.addOutValue("icap.cms.doc.uid", this.parser.getMeta("icap.cms.doc.uid"));
        m.addOutValue("icap.cms.doc.verno", this.parser.getMeta("icap.cms.doc.verno"));
        m.addOutValue("icap.cms.doc.localCode", this.parser.getDocLocalCode());
        m.addOutValue("icap.cms.topic.uid", this.parser.getMeta("icap.cms.topic.uid"));
        m.addOutValue("icap.cms.topic.verno", this.parser.getMeta("icap.cms.topic.verno"));
        m.addOutValue("icap.page.title", this.parser.getPageTitle());
        m.addOutValue("icap.page.url", this.parser.getPageUrl())
        m.addOutValue("userAgentInfo", this.parser.getUserAgent());
        m.addOutValue("userLangCode", this.parser.getUserLangCode());

        this.addMeasurement(m);
    }

    addTaxonomyMeasurement() {
        let taxonomy = this.parser.getTaxonomy();
        if(taxonomy.length > 0) {
            let m = this.createMeasurement();
            m.addArgValue("icap.cms.doc.uid", this.parser.getMeta("icap.cms.doc.uid"));
            m.addArgValue("icap.cms.doc.verno", this.parser.getMeta("icap.cms.doc.verno"));
            m.addArgValue("icap.cms.doc.localCode", this.parser.getDocLocalCode());
            m.addArgValue("icap.cms.topic.uid", this.parser.getMeta("icap.cms.topic.uid"));
            m.addArgValue("icap.cms.topic.verno", this.parser.getMeta("icap.cms.topic.verno"));
            taxonomy.forEach(t => m.addOutValue(t.entry, t.content));
            this.addMeasurement(m);
        }
    }

    addCountryMeasurement() {
        fetch("https://api.country.is").then(
            (response) => {
                return response.json();
            }
        ).then(
            (response) => {
                let m = this.createMeasurement();
                m.addArgValue("icap.pagereadId", this.getPagereadId());
                m.addOutValue("icap.countryCode", response.country);
                this.addMeasurement(m);
                this.commitMeasurements();
            }
        );
    }

    addActionMeasurement(actionCode, outs=null) {

        let m = this.createMeasurement();
        
        m.addArgValue("icap.pagereadId", this.getPagereadId());
        m.addArgValue("icap.action.code", actionCode);
        m.addArgValue("icap.action.timeOffset", this.getTimeOffset());
        
       

        if(!!outs) outs.forEach(o => m.addOutValue(o.varname, o.parsable_value));
        
        this.addMeasurement(m);
    }

    addLoadActionMeasurement() {
        this.addActionMeasurement("LOAD");
    }

    addUnloadActionMeasurement() {
        this.addActionMeasurement("UNLOAD");
    }

    assembleMeasurementDtoArray() {
        let dtos = [];
        this.getNotCommittedMeasurements().forEach((m) => dtos.push(m.exportDto()));
        return dtos;
    }

    exportDto() {

        let dto = {
            "measurements": this.assembleMeasurementDtoArray(),
        }

        return dto;
    }

    commitMeasurements() {

        let reqData = {
            method:    "post",
            headers:   this.getCommitMeasurementsRequestHeaders(),
            body:      JSON.stringify(this.exportDto()),
            keepalive: true 
        } 

        fetch(this.parser.getReceiverEndpointUrl(), reqData);

        this.markMeasurementsAsCommitted();
    }

    commitUnload() {
        this.addUnloadActionMeasurement();
        let fd = new FormData();
        fd.set("unloadMeasurement", JSON.stringify(this.exportDto()))
        navigator.sendBeacon(this.parser.getReceiverEndpointUrl(), fd);
    }
}


var GLOBAL_ICAP_REPORTER = new IcapReporter();


function icapCommitUnload() {
    GLOBAL_ICAP_REPORTER.commitUnload();
}


function icapInstallMeasurementsReporter() {
    window.addEventListener("beforeunload", icapCommitUnload);
}


icapInstallMeasurementsReporter();