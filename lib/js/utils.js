 // * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      utils.js                                  (\(\
// Func:        Auxilliary functions                      (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavUtils {

    // UUID and other identifiers

    static getUUID4() {

        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });

        return uuid;
    }

    static baseConvert(number, fromBase, toBase) {
        const digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const fromDigits = digits.slice(0, fromBase);
        const toDigits = digits.slice(0, toBase);
        let converted = '';
      
        let value = BigInt('0');
        let multiplier = BigInt('1');
      
        for (let i = number.length - 1; i >= 0; i--) {
          const digit = fromDigits.indexOf(number[i]);
          if (digit === -1) {
            throw new Error(`Invalid digit: ${number[i]}`);
          }
          value += BigInt(digit) * multiplier;
          multiplier *= BigInt(fromBase);
        }
      
        while (value > BigInt('0')) {
          converted = toDigits[value % BigInt(toBase)] + converted;
          value /= BigInt(toBase);
        }
      
        return converted;
    }

    static compressUUID(uuid) {
        const hex = uuid.replace(/-/g, '');
        const compressed = this.baseConvert(hex, 16, 62); // Convert from base-16 to base-62
        return compressed.padStart(16, '0');
      }
      
    static decompressUUID(compressed) {
        const hex = this.baseConvert(compressed, 62, 16); // Convert from base-62 to base-16
        const uuid = hex.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
        return uuid;
    }
    
    
    // Strings

    static substringBefore(str, separ) {
    
        const separIndex = str.indexOf(separ);
    
        if (separIndex !== -1) 
          return str.substring(0, separIndex);
    
        return str;
    }

    static substringAfter(str, separ) {

        const separIndex = str.indexOf(separ);
      
        if (separIndex !== -1) 
          return str.substring(separIndex + separ.length);
      
        return "";
    }


    // Style strings and other strings of this kind

    static isValidStyleString(styleString) {
      
      let pattern = /^([a-zA-Z-]+)\s*:\s*([^;]+)(;\s*[a-zA-Z-]+\s*:\s*[^;]+)*\s*;?$/;
    
      return pattern.test(styleString);
    }

    static parseStyle(styleString) {

      var styleObj = {};
    
      var declarations = styleString.split(';');
    
      for (var i = 0; i < declarations.length; i++) {
        var declaration = declarations[i].trim();
    
        var colonIndex = declaration.indexOf(':');
        if (colonIndex !== -1) {
          var property = declaration.substring(0, colonIndex).trim();
          var value = declaration.substring(colonIndex + 1).trim();
    
          if (!isNaN(value)) {
            value = parseFloat(value);
          }
    
          if (value === 'true') {
            value = true;
          } else if (value === 'false') {
            value = false;
          }
    
          styleObj[property] = value;
        }
      }
    
      return styleObj;
    }


    // Values and units

    static extractNumber(value) {
      const numberRegex = /[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?/;
      const match = value.match(numberRegex);
      return match ? parseFloat(match[0]) : NaN;
    }
    
    static extractUnit(value) {
      const unitRegex = /[a-zA-Z]+/;
      const match = value.match(unitRegex);
      return match ? match[0] : '';
    }


    // Datatypes and objects

    static isNotEmpty(obj) {
      return Object.keys(obj).length > 0; 
    }

    static classExists(className) {
      return !!className;
    }

    static matrixExists(matrix, primary, secondary) {
      return !!matrix[primary] ? !!matrix[primary][secondary] : false;
    }

}
