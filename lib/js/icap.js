/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	icap.js	                                   (\(\
 Func:		Collecting statistical data                (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavIcapVarValue {

    constructor(varName, varValue=undefined) {
        this.varName = varName;
        this.varValue = varValue; 
    }

    getVarName() {
        return this.varName;
    }

    setVarValue(varValue) {
        this.varValue = varValue;
        return this;
    }    

    getVarValue() {
        return this.varValue;
    }

}


class ArnavIcapMeasurement {

    constructor(sensorId) {
        this.uuid = createUuid();
        this.sensorId = sensorId;
        this.variableValues = {};
    }

    addVarValue(variable) {
        this.variables[variable.getVarname()] = variable;
        return this;
    }

}