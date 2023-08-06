

class ArnavPropertySheet extends ArnavUIControl {

    createPropGroup() {

    }

    createPropField() {

    }

    getPropFiedByName(propName) {

    }

    setPropValue(propName, nativeValue) {
        this.getPropFiedByName(propName).setValue(nativeValue);
        return this;
    }

    getPropValue(propName) {
        return this.getPropFiedByName(propName).getValue(nativeValue);
    }

    setFieldValues() {

    }

    getFieldValues() {
        
    }

    


}