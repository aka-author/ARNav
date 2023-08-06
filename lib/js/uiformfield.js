

class ArnavFormField extends ArnavUIControl {

    constructor(chief=null, options=null, id=undefined) {
        super(chief, options, id);
        this.field = this.createField();
    }

    createField() {
        return null;
    }

    isValid() {
        return true;
    }

    setSerializeFormat() {

    }

    getSerializeFromat() {

    }

    serialize(nativeValue) {

    }

    setParseFormat() {

    }

    getParseFormat() {

    }

    parse(strValue) {

    }

    setValue(nativeValue) {

    }

    getValue() {

    }


}


class ArnavEditFormField extends ArnavFormField {

}

class ArnavStringFormField extends ArnavEditFormField {

    createField() {
        return ArnavStringField();
    }

}

class ArnavNumericFormField extends ArnavEditFormField {

}

class ArnavBigintFormField extends ArnavNumericFormField {

    createField() {
        return ArnavBigintField();
    }

}

class ArnavFloatFormField extends ArnavNumericFormField {

}

class ArnavBooleanFormField extends ArnavFormField {

}

class ArnavSelectiveFormField extends ArnavFormField {

    update() {
        
    }
    
}


class ArnavRemoteSelectFormField extends ArnavSelectFormField {
    
}
