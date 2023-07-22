// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      root.js                                    (\(\
// Func:        A prototype for each class in the library  (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavRoot {

    constructor(id=undefined) {
        
        this.id = !!id ? id : ArnavUtils.compressUUID(ArnavUtils.getUUID4());

        this.statusCodes = {
            "ok": 0,
            "irrelevant": 1,
            "networkFailure": 2,
            "backendIsNotResponging": 3
        };

        this.statusCode = ArnavRoot
        this.setStatusCode(this.statusCodes.Ok);
    }

    getId() {
        return this.id;
    }

    setStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    getStatusCode() {
        return this.statusCode;
    }

    isOk() {
        return this.getStatusCode() == this.statusCodes.ok;
    }

    debon() {
        ArnavDebug.debugOn();
        return this;
    }

    deboff() {
        ArnavDebug.debugOff();
        return this;
    }

    deblog(message) {
        ArnavDebug.log(message);
        return this;
    }
}