
/*
{
    "source": {
        "foo": "bar",
        "pivo": "raki",
        "price": 21,
        "subsource": {
            "ssfoo": "bar",
            "sspivo": "raki",
            "ssprice": "21"
        }


    }
}
*/

class ArnavField extends ArnavRoot {

    constructor(id=undefined) {
        super(id);
    }

    detectSerialized(s) {
        return false;
    }

    parse(s) {
        return s;
    }

    serialize(nativeValue) {
        return nativeValue;
    }

    

}

class ArnavFieldKeeper extends ArnavRoot {

    consructor(id=undefined) {
        super(id);
        this.fields = [];
        this.fieldsByNames = {};
    }

    addFields(...fields) {
        this.fields.push(...fields);
        fields.forEach(field => this.fieldsByNames[field.getFieldName()] = field);
        return this;
    }

    getField(fieldName) {
        return this.fieldByName[fieldName];
    }

    *[Symbol.iterator]() {
        for(const field of this.fields) 
            yield field;
    }

    forEach(callback) {

        for(const field of this) 
            callback(field);

        return this;
    }

}


class ArnavFieldManager extends ArnavRoot {

    constructor(id=undefined) {
        super(id);
        this.fk = null;
        this.fieldValues = {};
    }

    setFieldKeeper(fk) {
        this.fk = fk;
        return this;
    }

    getFieldKeeper() {
        return this.fk;
    }


    parseObject(source, groupName=undefined) {

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

    repairSourceObject() {

    }

}