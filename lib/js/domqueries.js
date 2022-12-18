/* * ** *** ***** ******** ************* ********************* 
 Product:	Active Reader Navigation Library
 Module:	domqueries.js                              (\(\
 Func:		Parsing a current HTML document            (^.^)
* * ** *** ***** ******** ************* *********************/

function getMetaContent(metaName) {

    let metas = document.getElementsByTagName("meta");

    for(let meta of metas) 
        if(meta.getAttribute("name") == metaName) 
            return meta.getAttribute("content");
            
    return undefined;
}