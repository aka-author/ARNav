// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      controller.js                             (\(\
// Func:        Providing the base for all controllers    (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavController extends ArnavTasker {

    // Accessing Arnav properties and building hierarchy

    setArnavPropsAttrName(attrName) {
        ArnavDOMControl.arnavPropsAttrName = attrName;
    }

    getArnavPropsAttrName() {
        return ArnavDOMControl.arnavPropsAttrName;
    }

    isArnavDOMElement(domElement) {
        return domElement.hasAttribute(this.getArnavPropsAttrName());
    }

    detectArnavAncestorId(domElement) {

        let arnavDomAncestorId = undefined;

        let currDomNode = domElement;
        let arnavDomAncestor = null;
        
        while(currDomNode.parentNode.nodeType === Node.ELEMENT_NODE && !arnavDomAncestor) {
            
            currDomNode = currDomNode.parentNode;
            
            if(this.isArnavDOMElement(currDomNode)) {
                arnavDomAncestor = currDomNode;
                arnavDomAncestorId = arnavDomAncestor.getAttribute("id");
            }
        }

        return arnavDomAncestorId;
    }

    getArnavDOMElementProps(domElement) {
        return ArnavUtils.parseStyle(domElement.getAttribute(this.getArnavPropsAttrName()));
    }

    getArnavDOMElementProp(domElement, propName) {

        let propValue = undefined;

        const props = this.getArnavDOMElementProps(domElement);

        switch(propName) {
            case "chief":
                propValue = !!props[propName] ? props[propName] : this.detectArnavAncestorId(domElement);
                break;
            default:
                propValue = props[propName]; 
        }

        return propValue;
    }
}
