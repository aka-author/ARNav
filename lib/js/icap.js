/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	icap.js	                                   (\(\
 Func:		Collecting statistical data                (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavIcapVariable {

    constructor(varname, value=undefined) {
        this.varname = varnamel
        this.value = value; 
    }

    getVarname() {
        return this.varname;
    }

    setValue(value) {
        this.value = value;
        return this;
    }    

    getValue() {
        return this.value;
    }

}


class ArnavIcapMeasurement {

    constructor(sensorId) {
        this.uuid = createUuid();
        this.sensorId = sensorId;
        this.variables = {};
    }

    addVariable(variable) {
        this.variables[variable.getVarname()] = variable;
        return this;
    }

}