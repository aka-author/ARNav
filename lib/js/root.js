// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      root.js                                    (\(\
// Func:        A prototype for each class in the library  (^.^)  
// * * ** *** ***** ******** ************* *********************

/**
 * @class
 * Provides a root class for Arnav class hierarchy.
 */

class ArnavRoot {

    /**
     * @param {string} id - a unique identifier of an object. A unique identifier will be generated
     *                 automatically bu default. 
     */

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

    /**
     * Gives the unique identifier of the object.
     * @returns The unique identifier of the object.
     */

    getId() {
        return this.id;
    }

    getClassName() {
        return this.constructor.name;
    }

    /**
     * Assigns a status code to the object.
     * @param {number} statusCode - A status code of the object. 
     * @returns The calling object.
     */
    setStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    /**
     * Gives the current status code of the object.
     * @returns The current status code of the object.
     */
    getStatusCode() {
        return this.statusCode;
    }

    /**
     * Checks if the current status code of the object is ok.
     * @returns true if the object is ok, otherwise returns false.
     */
    isOk() {
        return this.getStatusCode() == this.statusCodes.ok;
    }

    /**
     * Turns debug features on.
     * @returns The calling object.
     */
    debon() {
        ArnavDebug.debugOn();
        return this;
    }

    /**
     * Turns debug features off.
     * @returns The calling object.
     */
    deboff() {
        ArnavDebug.debugOff();
        return this;
    }

    /**
     * Prints a message to the console.
     * @param {string} A message to be printed. 
     * @returns The calling object.
     */
    deblog(message) {
        ArnavDebug.log(message);
        return this;
    }
}