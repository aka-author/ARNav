/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	utils.js                                  (\(\
 Func:		Service functions                         (^.^)                                                
* * ** *** ***** ******** ************* *********************/

// Struggling empty values

function useful(value, default_value) {
	return !!value ? value : default_value; 
}


// UUID

function createUuid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


// Numbers

function checkNumbers() {

	let nums = [true];

	let last = arguments.length - 1;
	let validate = typeof arguments[last] == "function" ? arguments[last--] : n => true;
		
	for(let i = 0; i <= last; i++) {
		let num = +arguments[i];
		nums[0] &&= Number.isNaN(num) ? false : validate(num);
		nums.push(num);
	}	
		
	return nums;
}


// Characters and strings

function firstChr(str) {
	return str ? str[0] : "";
}

function trimFirstChr(str) {
	return str ? str.substring(1) : "";
}

function isSubstring(str, substr) {
	return str.indexOf(substr) > -1;
}

function lastChr(str) {
	return str ? str[str.length - 1] : "";
}

function substringBefore(str, sep) {
	let pos = String(str).indexOf(sep);
	return pos > -1 ? str.substring(0, pos) : str;
}

function substringAfter(str, sep) {
	let sepStartPos = String(str).indexOf(sep);
	let substrStartPos = sepStartPos + sep.length;
	return sepStartPos > -1 ? str.substring(substrStartPos, str.length) : "";
}

function substringReverseBefore(str, sep) {
	let pos = str.lastIndexOf(sep);
	return pos > -1 ? str.substring(0, pos) : str;
}

function substringReverseAfter(str, sep) {
	let sepStartPos = str.lastIndexOf(sep);
	let substrStartPos = sepStartPos + sep.length;
	return sepStartPos > -1 ? str.substring(substrStartPos, str.length) : "";
}

function substringBetween(str, before, after) {
	return substringReverseBefore(substringAfter(str, before), after);
}

function multiChr(chr, num) {
	return chr.repeat(num);
}

function capitalizeFirstChr(str) {
	return firstChr(str).toUpperCase() + trimFirstChr(str);
}

function snakeToCamel(name) {
	
	function reducer(acc, curr) {
		return acc + capitalizeFirstChr(curr);
	}

	return name.split("_").reduce(reducer);	
}

function CamelToSnake(name) {

	let snake = "";
	
	for(let i = 0; i < name.length; i++) { 
		let currChr = name.charAt(i);
		snake += currChr == currChr.toUpperCase() ? 
					"_" + currChr.toLowerCase() : 
					currChr;
	}	

	return snake;
}

function safeCompareStrings(s1, s2) {
	
	if(!Boolean(s1) && Boolean(s2))
		return -1;
	else 
		if(Boolean(s1) && !Boolean(s2))
			return 1;
		else 
			if(!Boolean(s1) && !Boolean(s2))
				return 0;
			else
				return String(s1).localeCompare(String(s2));	
}


// ASCII safe encoding

const CHR_ASCII_SAFE_SEP     = ":";
const RXP_ASCII_SAFE_CHRS    = /^[A-Za-z\d_\-]*$/; 
const RXP_ID_RESTRICTED_CHRS = /[^A-Za-z\d]/g;

function isAsciiUnsafe(str) {
	return !str.match(RXP_ASCII_SAFE_CHRS);
}

function isAsciiSafeEncoded(str) {
	return String(str).includes(CHR_ASCII_SAFE_SEP);
}

function asciiSafeToken(chr) {
	return  chr.charCodeAt(0).toString();
}

function asciiSafeChr(token) {
	return String.fromCharCode(parseInt(token));
}

function asciiSafeEncode(str) {

	return isAsciiUnsafe(str) ? 
				CHR_ASCII_SAFE_SEP + 
				str.split("").map(asciiSafeToken).join(CHR_ASCII_SAFE_SEP) : 
				str; 
}

function asciiSafeDecode(str) {

	return isAsciiSafeEncoded(str) ? 
				trimFirstChr(str).split(CHR_ASCII_SAFE_SEP).map(asciiSafeChr).join("") : 
				str;
}

function idSafeEncode(str) {
	
	let rawId = encodeURIComponent(str).replace(RXP_ID_RESTRICTED_CHRS, "_");
	
	return rawId.match(/^\d.*/) ? "_" : "" + rawId;
}


// Accessing a local storage

function loadFromLocalStorage(itemName) {
	
	let output = {"statusCode": ERR_NO_LOCAL_STORAGE, "value": undefined};

	if(!!window.localStorage) {
		try {
			output.value = window.localStorage.getItem(itemName);
			output.statusCode = STATUS_OK;
		} catch {
			output.statusCode = ERR_LOCAL_STORAGE_FAILURE;
		}
	}

	return output;
}

function saveToLocalStorage(itemName, itemValue) {
	
	let statusCode = ERR_NO_LOCAL_STORAGE;
	
	if(!!window.localStorage) {
		try {
			window.localStorage.setItem(itemName, itemValue);
			statusCode = STATUS_OK;
		} catch {
			output.statusCode = ERR_LOCAL_STORAGE_FAILURE;
		}
	}

	return statusCode;
}


// Retrieving environment params

function getBrowserName() {
	return window.navigator.userAgent;
}

function getOsName() {
	return substringBetween(window.navigator.userAgent, "(", ";");
}

function isMobile() {
	if(window.navigator.userAgentData)
		return window.navigator.userAgentData.mobile;
	else
		return false
}


// HTML and DOM

function checkElementById(id) {
	return !!document.getElementById(id);
}