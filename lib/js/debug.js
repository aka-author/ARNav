// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      debug.js                               (\(\
// Func:        Moderating debug-related activity      (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavDebug {

    static debugFlag = false;
    static logRecords  = [];
    static arnavVerInfo = {
        "verno": "0.00.01a"
    }; 

    constructor() {
        this.debugFlag = true;
    }

    static getArnavVerInfo() {
        return this.arnavVerInfo;
    }

    static isDebugOn() {
        return this.debugFlag;
    }

    static debugOn() {
        this.debugFlag = true;
    }

    static debugOff() {
        this.debugFlag = false;
    }

    static getStackTrace() {
        try {
          throw new Error();
        } catch (e) {
          return e.stack;
        }
      }

    static log(message) {

        if(this.isDebugOn()) {

            const logRecord = {
                "message": message,
                "stack": this.getStackTrace()
            };

            this.addLogRecord(logRecord);
            
            console.log(message);
        }
    }

}