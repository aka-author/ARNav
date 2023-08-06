// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      domutils.js                              (\(\
// Func:        Working with DOM objects and events      (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavDOMUtils {

    // Measure units

    static recalcWidth = {};
    static recalcHeight = {};

    static updateScreenInfo() {
        ArnavDOMUtils.buildRecalculationTable();
    }

    // CSS classes

    static hasCssClass(element, cssClassName) {
        return element.classList.contains(cssClassName);
    }

    static addCssClass(element, cssClassName) {
        element.classList.add(cssClassName);
    }

    static removeCssClass(element, cssClassName) {
        element.classList.remove(cssClassName);
    }

    static toggleCssClass(element, cssClassName) {
        element.classList.toggle(cssClassName);
        return this;
    }

    static replaceCssClass(element, currentCssClassName, replacingCssClassName) {
        requestAnimationFrame(() => {
            ArnavDOMUtils.addCssClass(element, replacingCssClassName);
            ArnavDOMUtils.removeCssClass(element, currentCssClassName);
        });
    }

    // Effects

    static tremblers = new Map();

    static buildRecalculationTable() {
        const dummyElement = document.createElement("div");
        dummyElement.style.position = "absolute";
        dummyElement.style.visibility = "hidden";
        dummyElement.style.width = "1in";
        dummyElement.style.height = "1in";
        document.body.appendChild(dummyElement);
    
        SizeUtils.recalcWidth = {};
        SizeUtils.recalcHeight = {};
    
        const units = ["cm", "em", "in", "mm", "pt", "px", "vh", "vw"];
    
        for (const unit of units) {
          dummyElement.style.width = `1${unit}`;
          SizeUtils.recalcWidth[unit] = dummyElement.offsetWidth;
    
          dummyElement.style.height = `1${unit}`;
          SizeUtils.recalcHeight[unit] = dummyElement.offsetHeight;
        }
    
        document.body.removeChild(dummyElement);
    }

    static toPixels(size, unit, dimension) {

        if (!SizeUtils.recalcWidth[unit] || !SizeUtils.recalcHeight[unit]) 
            ArnavDOMUtils.buildRecalculationTable();
    
        const recalcTable = dimension === "width" ? ArnavDOMUtils.recalcWidth : ArnavDOMUtils.recalcHeight;
    
        const sizeValue = parseFloat(size);
        const sizeUnit = unit.toLowerCase();
    
        if (recalcTable[sizeUnit]) 
          return sizeValue*recalcTable[sizeUnit];
    
        return NaN;
    }

    // Detecting and setting text direction

    static getTextDirection(element=undefined) {

        const htmlElement = element ? element : document.documentElement;
      
        const computedStyle = window.getComputedStyle(htmlElement);
        const direction = computedStyle.getPropertyValue("direction");
      
        if(direction === "ltr" || direction === "rtl") 
            return direction;
      
        const parentElement = htmlElement.parentElement;
        
        if(parentElement) 
          return ArnavDOMUtils.getTextDirection(parentElement);
        
        return "ltr";
    }

    static isLTR(element=undefined) {
        return ArnavDOMUtils.getTextDirection(!!element ? documentElement : element) == "ltr";
    }

    static setTextDirection(direction, element=undefined) {
        const targetElement = !!element ? element : document.documentElement;
        targetElement.style.direction = direction;
    }

    static toggleTextDirection(element=undefined) {

        const targetElement = !!element ? element : document.documentElement;
        const currentDirection = ArnavDOMUtils.getTextDirection(targetElement);
    
        const newDirection = currentDirection === "ltr" ? "rtl" : "ltr";
        ArnavDOMUtils.setTextDirection(newDirection, targetElement);
    }

    // Displaying and hiding elements

    static show(element) {
		element.style.display = "";
        return element;
	}
	
	static hide(element) {
		element.style.display = "none";
        return element;
	}
    
    // Element sizes and coordinates 

    static setWidth(element, pxWidth) {
        element.style.width = pxWidth + "px";
        return element;
    }

    static getWidth(element) {

        if(element.style.display != "none")
            return element.clientWidth;
        else {
            const visibility = element.style.visibility;
            
            element.style.visibility = "hidden";
            element.style.display = "";

            const width = element.clientWidth;
            
            element.style.display = "none";
            element.style.visibility = visibility;

            return width;            
        }
    }

    static setHeight(element, pxHeight) {
        element.style.height = pxHeight + "px";
        return element;
    }

    static getHeight(element) {
        return element.clientHeight;
    }

    static setLeft(element, pxLeft) {
        element.style.left = pxLeft + "px";
        return element;
    }

    static getLeft(element) {
        return element.offsetLeft;
    }

    static setTop(element, pxTop) {
        element.style.top = pxTop + "px";
        return element;
    }

    static getTop(element) {
        return element.offsetTop;
    }

    static setRight(element, pxRight) {
        element.stype.right = pxRight;
        return this;
    }

    static getRight(element) {
        return element.offsetLeft + element.clientWidth;
    }
    
    static getBottom(element) {
        return element.offsetTop + element.clientHeight;
    }

    static getStart(element) {
        return ArnavDOMUtils.isLTR() ? ArnavDOMUtils.getLeft(element) : ArnavDOMUtils.getRight(element); 
    }

    static setStart(element, pxStart) {
        
        if(ArnavDOMUtils.isLTR()) 
            ArnavDOMUtils.setLeft(element, pxStart);
        else {
            const maxX = ArnavDOMUtils.getMaxX(element);
            const width = ArnavDOMUtils.getWidthWithBorders(element);
            ArnavDOMUtils.setLeft(element, maxX - width - pxStart);
        }

        return element;;
    }

    static getStop(element) {
        return ArnavDOMUtils.isLTR() ? ArnavDOMUtils.getRight(element) : ArnavDOMUtils.getLeft(element);
    }

    static setRect(element, left, top, width, height) {
        
        ArnavDOMUtils.setLeft(element, left);
        ArnavDOMUtils.setTop(element, top);
        ArnavDOMUtils.setWidth(element, width);
        ArnavDOMUtils.setHeight(element, height);

        return element;
    }


    // Element borders 

    static getBorderWidth(element, borderName) {
        const computedStyle = window.getComputedStyle(element);
        const borderWidth = computedStyle.getPropertyValue(borderName);
        return parseFloat(borderWidth);
    }

    static getLeftBorderWidth(element) {
        return this.getBorderWidth(element, "border-left-width");
    }

    static getRightBorderWidth(element) {
        return this.getBorderWidth(element, "border-right-width");
    }

    static getTopBorderWidth(element) {
        return this.getBorderWidth(element, "border-top-width");
    }

    static getBottomBorderWidth(element) {
        return this.getBorderWidth(element, "border-bottom-width");
    }

    static getWidthWithBorders(element) {
        return this.getLeftBorderWidth(element) 
                + this.getWidth(element) 
                + this.getRightBorderWidth(element);
    }

    static getHeightWithBorders(element) {
        return this.getTopBorderWidth(element) 
                + this.getHeight(element) 
                + this.getBottomBorderWidth(element);
    }

    // Element margins 

    static getMarginWidth(element, marginName) {
        return parseFloat(window.getComputedStyle(element).getPropertyValue(marginName));
    }

    static getLeftMarginWidth(element) {
        return ArnavDOMUtils.getMarginWidth(element, "margin-left");
    }

    static getRightMarginWidth(element) {
        return ArnavDOMUtils.getMarginWidth(element, "margin-right");
    }

    static getTopMarginWidth(element) {
        return ArnavDOMUtils.getMarginWidth(element, "margin-top");
    }

    static getBottomMarginWidth(element) {
        return ArnavDOMUtils.getMarginWidth(element, "margin-bottom");
    }

    static getWidthWithMargins(element) {
        return this.getLeftMarginWidth(element) 
                + this.getWidthWithBorders(element) 
                + this.getRightMarginWidth(element);
    }
    
    static getHeightWithMargins(element) {
        return this.getTopMarginHeight(element) 
                + this.getHeightWithBorders(element) 
                + this.getBottomMarginHeight(element);
    }

    // Misc. element properties

    static makeAbsolute(element) {
        element.style.position = "absolute";
        return element;
    }

    static setTitle(element, title) {
        element.setAttribute("title", title);
        return element;
    }

    static setZIndex(element, zIndex) {
        element.style.zIndex = zIndex;
        return element;
    }

    static setCursor(element, cursor) {
        element.style.cursor = cursor;
        return element;
    }

    static setBorderRadius(element, r) {
        element.style.borderRadius = r + "px";
        return element;
    }

    static setBackgroundColor(element, color) {
        element.style.background = color;
        return element;
    }

    static randomColor(opacity=0.5) {

        const r = (Math.round(Math.random()*255)).toString();
        const g = (Math.round(Math.random()*255)).toString();
        const b = (Math.round(Math.random()*255)).toString();

        const randomColor = `rgba(${r}, ${g}, ${b}, ${opacity})`; 
                    
        return randomColor;
    }

    static getMaxX(element) {

        const maxX = element.offsetLeft + element.offsetWidth;
        const parentWidth = element.parentNode.offsetWidth;
        
        return Math.max(maxX, parentWidth);
    }
    
    // Working with certain elements

    static getMetaContent(metaName) {

        let content = undefined

        let metas = document.getElementsByTagName("meta");
    
        for(let meta of metas) 
            if(meta.getAttribute("name") == metaName) {
                content = meta.getAttribute("content");
                break;
            }
                
        return content;
    }

    // Effects

    static tremble(element) {

        const trembler =  ArnavDOMUtils.tremblers.get(element);

        if(Math.abs(trembler.left - ArnavDOMUtils.getLeft(element)) < trembler.amplitude) {
            const left =  ArnavDOMUtils.getLeft(element) + (Math.random() - .5)*trembler.amplitude;
            ArnavDOMUtils.setLeft(element, left);
        } else 
            ArnavDOMUtils.setLeft(element, trembler.left);

        if(Math.abs(trembler.top - ArnavDOMUtils.getTop(element)) < trembler.amplitude) {
            const top = ArnavDOMUtils.getTop(element) + (Math.random() - .5)*trembler.amplitude;
            ArnavDOMUtils.setTop(element, top);
        } else 
            ArnavDOMUtils.setTop(element, trembler.top);

        if(trembler.timeout) {
            const now = (new Date()).getTime();
            if(now - trembler.start > trembler.timeout)
                ArnavDOMUtils.stopTremble(element);
        }
    }

    static startTremble(element, amplitude, period, timeout=undefined) {

        if(!ArnavDOMUtils.tremblers.get(element)) {

            const left =  ArnavDOMUtils.getLeft(element);
            const top = ArnavDOMUtils.getTop(element);

            const trembler = {
                "amplitude": amplitude,
                "left": left, 
                "top": top, 
                "timer": setInterval(() => {ArnavDOMUtils.tremble(element, amplitude)}, period),
                "start": new Date().getTime(),
                "timeout": timeout
            };
            
            ArnavDOMUtils.tremblers.set(element, trembler);
        }
    }

    static stopTremble(element) {
        const trembler = ArnavDOMUtils.tremblers.get(element);
        clearInterval(trembler.timer);
        ArnavDOMUtils.setLeft(element, trembler.left);
        ArnavDOMUtils.setTop(element, trembler.top);
        ArnavDOMUtils.tremblers.delete(element);
    }

    // Events

    static getEventLocalVect(event, element) {
        
        const elementRect = element.getBoundingClientRect();

        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;

        const localX = event.clientX - elementRect.left + scrollX - window.pageXOffset;
        const localY = event.clientY - elementRect.top + scrollY - window.pageYOffset;

        return new ArnavVect(localX, localY);
    }

    static eventsDeltaVect(currEvent, prevEvent) {

        const deltaX = Math.round(currEvent.screenX - prevEvent.screenX);
        const deltaY = Math.round(currEvent.screenY - prevEvent.screenY);

        return new ArnavVect(deltaX, deltaY);
    }

    static isKeyPressed(event, keys) {

        const keyCombination = keys.split('+');
      
        if (!event || !event.key || typeof event.getModifierState !== 'function') {
          return false;
        }
      
        const hasCtrl = keyCombination.includes('Ctrl') ? event.ctrlKey : !event.ctrlKey;
        const hasAlt = keyCombination.includes('Alt') ? event.altKey : !event.altKey;
        const hasShift = keyCombination.includes('Shift') ? event.shiftKey : !event.shiftKey;
        const hasCommand = keyCombination.includes('Cmd') ? event.getModifierState('Meta') : true;
        const hasWin = keyCombination.includes('Win') ? event.getModifierState('Win') : true;
      
        const mainKey = keyCombination[keyCombination.length - 1];
        const hasMainKey = event.key === mainKey;
      
        return hasCtrl && hasAlt && hasShift && hasCommand && hasWin && hasMainKey;
      }

    static getDOMEventNames() {

        const DOMEventNames = [
            "abort",  
            "activate",  
            "addstream",  
            "addtrack",  
            "afterprint",  
            "afterscriptexecute",  
            "animationcancel",  
            "animationend",  
            "animationiteration",  
            "animationstart",  
            "appinstalled",  
            "audioend",  
            "audioprocess",  
            "audiostart",  
            "auxclick",  
            "beforeinput",  
            "beforeprint",  
            "beforescriptexecute",  
            "beforeunload",  
            "beginEvent",  
            "blocked",  
            "blur",  
            "boundary",  
            "bufferedamountlow",  
            "cancel",  
            "canplay",  
            "canplaythrough",  
            "change",  
            "click",  
            "close",  
            "closing",  
            "complete",  
            "compositionend",  
            "compositionstart",  
            "compositionupdate",  
            "connect",  
            "connectionstatechange",  
            "contentdelete",  
            "contextmenu",  
            "copy",  
            "cuechange",  
            "cut",  
            "datachannel",  
            "dblclick",  
            "devicechange",  
            "devicemotion",  
            "deviceorientation",  
            "DOMActivate",  
            "DOMContentLoaded",  
            "DOMContentLoaded",  
            "DOMMouseScroll",  
            "drag",  
            "dragend",  
            "dragenter",  
            "dragleave",  
            "dragover",  
            "dragstart",  
            "drop",  
            "durationchange",  
            "emptied",  
            "end",  
            "ended",  
            "endEvent",  
            "enterpictureinpicture",  
            "error",  
            "focus",  
            "focusin",  
            "focusout",  
            "formdata",  
            "fullscreenchange",  
            "fullscreenerror",  
            "gamepadconnected",  
            "gamepaddisconnected",  
            "gatheringstatechange",  
            "gesturechange",  
            "gestureend",  
            "gesturestart",  
            "gotpointercapture",  
            "hashchange",  
            "icecandidate",  
            "icecandidateerror",  
            "iceconnectionstatechange",  
            "icegatheringstatechange",  
            "IDBTransaction", 
            "input",  
            "inputsourceschange",  
            "install",  
            "invalid",  
            "keydown",  
            "keypress",  
            "keyup",  
            "languagechange",  
            "leavepictureinpicture",  
            "load",  
            "loadeddata",  
            "loadedmetadata",  
            "loadend",  
            "loadstart",  
            "lostpointercapture",  
            "mark",  
            "merchantvalidation",  
            "message",  
            "messageerror",  
            "mousedown",  
            "mouseenter",  
            "mouseleave",  
            "mousemove",  
            "mouseout",  
            "mouseover",  
            "mouseup",  
            "mousewheel",  
            "msContentZoom",  
            "MSGestureChange",  
            "MSGestureEnd",  
            "MSGestureHold",  
            "MSGestureStart",  
            "MSGestureTap",  
            "MSInertiaStart",  
            "MSManipulationStateChanged",  
            "mute",  
            "negotiationneeded",  
            "nomatch",  
            "notificationclick",  
            "offline",  
            "online",  
            "open",  
            "orientationchange",  
            "pagehide",  
            "pageshow",  
            "paste",  
            "pause",  
            "payerdetailchange",  
            "paymentmethodchange",  
            "play",  
            "playing",  
            "pointercancel",  
            "pointerdown",  
            "pointerenter",  
            "pointerleave",  
            "pointerlockchange",  
            "pointerlockerror",  
            "pointermove",  
            "pointerout",  
            "pointerover",  
            "pointerup",  
            "popstate",  
            "progress",  
            "push",  
            "pushsubscriptionchange",  
            "ratechange",  
            "readystatechange",  
            "rejectionhandled",  
            "removestream",  
            "removetrack",  
            "removeTrack",  
            "repeatEvent",  
            "reset",  
            "resize",  
            "resourcetimingbufferfull",  
            "result",  
            "resume",  
            "scroll",  
            "search",  
            "seeked",  
            "seeking",  
            "select",  
            "selectedcandidatepairchange",  
            "selectend",  
            "selectionchange",  
            "selectstart",  
            "shippingaddresschange",  
            "shippingoptionchange",  
            "show",  
            "signalingstatechange",  
            "slotchange",  
            "soundend",  
            "soundstart",  
            "speechend",  
            "speechstart",  
            "squeeze",  
            "squeezeend",  
            "squeezestart",  
            "stalled",  
            "start",  
            "statechange",  
            "storage",  
            "submit",  
            "success",  
            "suspend",  
            "timeout",  
            "timeupdate",  
            "toggle",  
            "tonechange",  
            "touchcancel",  
            "touchend",  
            "touchmove",  
            "touchstart",  
            "track",  
            "transitioncancel",  
            "transitionend",  
            "transitionrun",  
            "transitionstart",  
            "unhandledrejection",  
            "unload",  
            "unmute",  
            "upgradeneeded",  
            "versionchange",  
            "visibilitychange",  
            "voiceschanged",  
            "volumechange",  
            "vrdisplayactivate",  
            "vrdisplayblur",  
            "vrdisplayconnect",  
            "vrdisplaydeactivate",  
            "vrdisplaydisconnect",  
            "vrdisplayfocus",  
            "vrdisplaypointerrestricted",  
            "vrdisplaypointerunrestricted",  
            "vrdisplaypresentchange",  
            "waiting",  
            "webglcontextcreationerror",  
            "webglcontextlost",  
            "webglcontextrestored",  
            "webkitmouseforcechanged",  
            "webkitmouseforcedown",  
            "webkitmouseforceup",  
            "webkitmouseforcewillbegin",  
            "wheel"
        ];

        return DOMEventNames;
    }
}
