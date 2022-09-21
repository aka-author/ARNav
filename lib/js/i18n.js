/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:    i18n.js                               (\(\
 Func:		Managing localized resources          (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavI18n {

    constructor(owner=null) {
        this.owner = owner;
        this.locals = {};
    }

    normalizeLocalCode(localCode) {

        let nlc = localCode;

        switch(localCode.length) {
            case 2: nlc = localCode; break;
            case 5: nlc = localCode[0] + localCode[1] + "-" + localCode[3] + localCode[4];
        }

        return nlc.toLowerCase();
    }

    getLangCode(localCode) {
        let nlc = this.normalizeLocalCode(localCode);
        return nlc[0] + nlc[1];
    }

    getCountryCode(localCode) {

        let nlc = this.normalizeLocalCode(localCode);

        switch(localCode.length) {
            case 2: return nlc;
            case 5: return localCode[3] + localCode[4];
        }

        return undefined;
    }

    matchLocalCodes(lc1, lc2) {
     
        let langCode1 = this.getLangCode(lc1);
        let langCode2 = this.getLangCode(lc2);

        if(langCode1 == langCode2) {
            let countryCode1 = this.getCountryCode(lc1);
            let countryCode2 = this.getCountryCode(lc2);
            return countryCode1 == "" || countryCode2 == "" || countryCode1 == countryCode2;  
        } else 
            return false;

    }

    getLocalCodes() {
        return Object.keys(this.locals);
    }

    getMatchingLocal(localCode) {

        let matchingLc = undefined;

        for(let lc of this.getLocalCodes()) 
            if(this.matchLocalCodes(lc, localCode)) {
                matchingLc = lc; 
                break;
            };

        return matchingLc;
    }

    hasLocal(localCode) {
        return !!localCode && !!this.locals[this.normalizeLocalCode(localCode)];
    }

    getDefaultLocalCode() {
        let lcs = this.getLocalCodes();
        return lcs.length > 0 ? lcs[0] : undefined;
    }

    addLocalSimple(strings, localCode) {
        this.locals[this.normalizeLocalCode(localCode)] = strings;
    }

    getstr(id, localCode=undefined) {
        let lc = this.hasLocal(localCode) ? this.normalizeLocalCode(localCode) : this.getDefaultLocalCode();
        console.log("getstr: ", lc, id, this.locals[lc][id]);
        return !!lc ? this.locals[lc][id] : "";
    }

}