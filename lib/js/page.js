/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	page.js                                   (\(\
 Func:      The top of controls' hierarchy (<body>)   (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavPage extends ArnavControl {

    constructor(chief, id="BODYPAGE") {
        super(chief, id);
        this.page = this;
    }

    getDomObject() {
        return document.getElementsByTagName("body")[0];
    }

    addEventListener(domEventName) {
        let eventAttrName = "on" + domEventName;
        let globalAppName = this.getApp().getGlobalAppName();
        let callCode = globalAppName + ".getPage().edomBody('" + domEventName + "')";
        let bodyObject = this.getDomObject();
        bodyObject.setAttribute(eventAttrName, callCode);
    }

    edomBody(eType) {
        this.edom(new CustomEvent(eType, {"detail": this.getDomObject()}));
    }

    handle__resize(issue) {

        let body = issue.getPayload().detail;

        let rect = {
            "top": body.clientTop,
            "left": body.clientLeft,
            "width": body.clientWidth,
            "height": body.clientHeight
        };
        
        issue.convert("resize", rect)
    }

}