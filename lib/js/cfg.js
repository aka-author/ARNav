// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      cfg.js                                  (\(\
// Func:        Accessing configuration paramaters      (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavCfg extends ArnavRoot {

    constructor(id) {

        super(id);

        this.remoteParamGroups = {};

        this.cfg = {};
        this.userCfg = {};

        this.loadedFlag = false;
    }

    hasRemoteParams() {
        return ArnavUtils.isNotEmpty(this.remoteParamGroups);
    }

    isLoaded() {
        return this.loadedFlag;
    }

    setLoadedFlag(flag=true) {
        this.loadedFlag = flag;
        return this;
    }

    separName(paramName) {
        return "." + paramName;
    }

    nameSepar(paramName) {
        return paramName + ".";
    }

    joinParamName(groupName, paramName) {
        return groupName ? groupName + this.separName(paramName) : paramName;
    }

    extractGroupName(paramFullName, paramName) {
        return ArnavUtils.substringBefore(paramFullName, this.separName(paramName));
    }

    hasParam(groupName, paramName) {
        return groupName == paramName || groupName.endsWith(this.separName(paramName))
    }

    hasGroup(groupName, clause) {

        const start = this.nameSepar(clause);
        const middle = this.separName(start);

        return groupName.startsWith(start) || groupName.indexOf(middle) > -1;
    }

    hasGroupOrParam(groupName, clause) {
        return this.hasParam(groupName, clause) || hasGroup(groupName, clause);
    }

    detectParamFullName(paramName) {

        let paramFullName = undefined;

        for(const pfn in this.cfg) 
            if(pfn == paramName || this.hasParam(pfn, paramName)) {
                paramFullName = pfn;
                break;
            }

        return paramFullName;
    }

    findParams(subname) {

        let matchingParamNames = [];

        for(const paramName in this.cfg) 
            if(this.hasGroupOrParam(paramName, subname)) 
                matchingParamNames.push(paramName);

        return matchingParamNames;
    }

    set(paramName, paramValue) {

        this.cfg[paramName] = paramValue;

        return this;
    }

    userSet(userParamName, paramValue) {

        const paramFullName = this.detectParamFullName(userParamName);

        if(!!paramFullName) 
            this.userCfg[paramFullName] = paramValue;

        this.commitUserParams();

        return this;
    }

    get(paramName) {

        let paramValue = undefined;

        const paramFullName = this.detectParamFullName(paramName);
        
        if(!!paramFullName) 
            paramValue = !!this.userCfg[paramFullName] ? this.userCfg[paramFullName] : this.cfg[paramFullName]; 
            
        return paramValue;
    }

    parseSource(source, groupName=undefined) {

        for(const paramName in source) {

            const branchPath = this.joinParamName(groupName, paramName);
            const branchValue = source[paramName];

            if(typeof(branchValue) == "object")
                this.parseSource(branchValue, branchPath);
            else 
                this.cfg[branchPath] = branchValue;
        }

        return this;
    }

    unpackStaticParams(cfgSource) {

        this.parseSource(cfgSource);

        return this;
    }

    getUserCfgRecordKey(id) {
        return id + "_cfg";
    }

    loadUserParams(id) {

        let userCfgSource = {};

        try {
            userCfgSource = JSON.parse(localStorage.getItem(this.getUserCfgRecordKey(id)));
        } catch {}
            
        this.userCfg = !!userCfgSource ? userCfgSource : {};

        return this;
    }

    commitUserParams() {

        try {
            localStorage.setItem(this.getUserCfgRecordKey(), JSON.stringify(this.userCfg));
        } catch {}

        return this;
    }

    markRemoteParamGroupLoaded(groupName, flag=true) {

        this.remoteParamGroups[groupName] = flag;
        
        return this;
    }

    areRemoteParamsLoaded() {

        for(const groupName in this.remoteParamGroups)
            if(!this.remoteParamGroups[groupName])
                return false;

        return true;
    }

    fetchRemoteParamGroup(groupName) {

        const requestURL = this.get(this.joinParamName(groupName, "@url"));

        fetch(requestURL).then(
            (response) => {
                return response.json();
            }
        ).then(
            (response) => {

                for(const propName in response) 
                    this.set(this.joinParamName(groupName, propName), response[propName]);
                
                this.markRemoteParamGroupLoaded(groupName);

                if(this.areRemoteParamsLoaded()) {
                    
                    this.setLoadedFlag();

                    if(!!callback)
                        callback();
                }
            }
        )
    }

    fetchRemoteParams(callback) {

        for(const paramFullName in this.cfg) 
            if(this.hasParam(paramFullName, "@url")) {
                let groupName = this.extractGroupName(paramFullName, "@url");
                this.markRemoteParamGroupLoaded(groupName, false);
            }
            
        if(this.hasRemoteParams()) {

            this.setLoadedFlag(false);

            for(const remoteParamGroupName in this.remoteParamGroups) 
                this.fetchRemoteParamGroup(remoteParamGroupName, callback);  
        } else {
            callback();
        }
        
        return this;
    }

    detectCustomParams() {
        /* May be redefined */
    }

    load(cfgSource, callback=null) {

        this.unpackStaticParams(cfgSource);
        this.loadUserParams(this.getId());
        this.fetchRemoteParams(callback);
        this.detectCustomParams();
        
        return this;
    }

    getBrowserName() {

        const userAgent = navigator.userAgent;
        let browserName;
      
        if (userAgent.indexOf("Firefox") > -1) {
          browserName = "Firefox";
        } else if (userAgent.indexOf("Chrome") > -1) {
          browserName = "Chrome";
        } else if (userAgent.indexOf("Safari") > -1) {
          browserName = "Safari";
        } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
          browserName = "Opera";
        } else if (userAgent.indexOf("Edge") > -1) {
          browserName = "Edge";
        } else if (userAgent.indexOf("Trident") > -1) {
          browserName = "MSIE";
        } else {
          browserName = "Unknown";
        }
      
        return browserName;
      }

    getOS() {
        const userAgent = navigator.userAgent;
        let operatingSystem;
      
        if (userAgent.indexOf("Win") > -1) {
          operatingSystem = "Windows";
        } else if (userAgent.indexOf("Mac") > -1) {
          operatingSystem = "MacOS";
        } else if (userAgent.indexOf("Linux") > -1) {
          operatingSystem = "Linux";
        } else if (userAgent.indexOf("Android") > -1) {
          operatingSystem = "Android";
        } else if (userAgent.indexOf("iOS") > -1) {
          operatingSystem = "iOS";
        } else {
          operatingSystem = "Unknown";
        }
      
        return operatingSystem;
      }

    isMobile() {
        const userAgent = navigator.userAgent;
        const mobileKeywords = [
          "Android",
          "webOS",
          "iPhone",
          "iPad",
          "iPod",
          "BlackBerry",
          "Windows Phone"
        ];
      
        for (let i = 0; i < mobileKeywords.length; i++) {
          if (userAgent.indexOf(mobileKeywords[i]) > -1) {
            return true;
          }
        }
      
        return false;
      }

      getDefaultLanguage() {

        const navigatorLanguage = navigator.language || navigator.userLanguage;
      
        if (navigatorLanguage) 
          return navigatorLanguage;
      
        if (navigator.browserLanguage) 
          return navigator.browserLanguage;
      
        return undefined; 
      }  
}
