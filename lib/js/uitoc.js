/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:    uitoc.js                                 (\(\
 Func:		Displaying a global TOC                  (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavUiToc extends ArnavUiControl {
	
	constructor(chief, id) {
		
		super(chief, id);

		this.open = {};
	}

    setOpen(openIds) {
        for(let i in openIds)
            if(openIds[i])
                this.open[openIds[i]] = true;
    }

    isOpen(id) {
        return !!this.open[id];
    }

    getIdSepar() {
        return "_._";
    }

    assembleId(id, suffix) {
        return id + this.getIdSepar() + suffix;
    }

    extractId(domElementId) {
        return domElementId.split(this.getIdSepar())[0];
    }

    extractSuffix(domElementId) {
        return domElementId.split(this.getIdSepar())[1];
    }

    getLinkId(id) {
        return this.assembleId(id, "select");
    }

	getOpenBoxId(id) {
		return this.assembleId(id, "open");
	}

	getCloseBoxId(id) {
		return this.assembleId(id, "close");
	}

	getEntryDivId(id) {
		return this.assembleId(id, "div");
	}

	// Assembling DOM objects for a TOC

    getDivTocEntryOuterClassName(entry) {
        return "tocEntryOuter";
    }

	assembleEntryOuterDom(entry) {

        let oDiv = document.createElement("div");
        
        oDiv.setAttribute("id", entry.getId());
        oDiv.setAttribute("class", this.getDivTocEntryOuterClassName(entry));
		oDiv.appendChild(this.assembleEntryTitleDom(entry));
        
        if(entry.hasWorkers())
		    oDiv.appendChild(this.assembleEntryInnerDom(entry));
        
        return oDiv;
	}

    assembleOpenBoxInnerDom() {
        return document.createTextNode("►");
    }

	assembleOpenBoxDom(entry) {
        
        let oSpan = document.createElement("span");
        
        let id = entry.getId();
        oSpan.setAttribute("id", this.getOpenBoxId(id));
        oSpan.setAttribute("style", "display: " + (this.isOpen(id) ? "none" : ""));
		oSpan.appendChild(this.assembleOpenBoxInnerDom());
		
        return oSpan;
	}

    assembleCloseBoxInnerDom() {
        return document.createTextNode("▼");
    }

	assembleCloseBoxDom(entry) {
        
        let cSpan = document.createElement("span");
		
        let id = entry.getId();
        cSpan.setAttribute("id", this.getCloseBoxId(id));
        cSpan.setAttribute("style", "display: " + (this.isOpen(id) ? "" : "none"));
		cSpan.appendChild(this.assembleCloseBoxInnerDom());
		
        return cSpan;
	}

    getTocEntryLinkClassName(entry) {
        return "tocEntry";
    }

    getTocEntrySpanClassName(entry) {
        return "tocEntry";
    }

	assembleEntryLinkDom(entry) {
        
        let wrapper = null; 
    
        if(entry.hasUri()) { 
            wrapper = document.createElement("a");
            wrapper.setAttribute("id", this.getLinkId(entry.getId())); 
		    wrapper.setAttribute("href", entry.getUri());
            wrapper.setAttribute("class", this.getTocEntryLinkClassName(entry));
        } else {
            wrapper = document.createElement("span");
            wrapper.setAttribute("class", this.getTocEntrySpanClassName(entry));
        }

        wrapper.appendChild(document.createTextNode(entry.getTitle()));

		return wrapper;
	}

    getDivEntryTitleClassName(entry) {
        let baseClassName = entry.hasWorkers() ? "tocEntryNodeTitle" : "tocEntryLeafTitle";
        return baseClassName + entry.getLevel().toString();
    }

	assembleEntryTitleDom(entry) {

		let tDiv = document.createElement("div");
        
        if(entry.hasWorkers()) {
            tDiv.appendChild(this.assembleOpenBoxDom(entry));
            tDiv.appendChild(this.assembleCloseBoxDom(entry));
        }

        tDiv.setAttribute("class", this.getDivEntryTitleClassName(entry));
		tDiv.appendChild(this.assembleEntryLinkDom(entry));
		
        return tDiv;
	}

    getDivTocEntryInnerClassName(entry) {
        return "tocEntryInner";
    }

	assembleEntryInnerDom(entry) {

		let iDiv = document.createElement("div");

        let id = entry.getId();
		iDiv.setAttribute("id", this.getEntryDivId(id));
        iDiv.setAttribute("class", this.getDivTocEntryInnerClassName(entry));
        iDiv.setAttribute("style", "display: " + (this.isOpen(id) ? "" : "none"));
		
        let entries = entry.getEntries();
		for(let idx in entries)
			iDiv.appendChild(this.assembleEntryOuterDom(entries[idx]));
		
		return iDiv;
	}

    getDivTocEntryInnerClassName() {
        return "tocTree";
    }

	assembleDom() {

		let tDiv = document.createElement("div");

		tDiv.setAttribute("id", this.getId());
        tDiv.setAttribute("class", this.getDivTocEntryInnerClassName());
        tDiv.addEventListener("click", e => {this.edom(e)});

        let entries = this.getModel().getEntries();
		for(let i in entries)
			tDiv.appendChild(this.assembleEntryOuterDom(entries[i]));

		return tDiv;
	}

	// Letting a reader to select entries in a TOC

	getOpenIds() {
        let openIds = [];
		for(let id in this.open) if(this.open[id]) openIds.push(id)     
        return openIds.join(" ");
	}
	
	openEntry(id) {
		
		let obox = document.getElementById(this.getOpenBoxId(id));
		let cbox = document.getElementById(this.getCloseBoxId(id));
		let div = document.getElementById(this.getEntryDivId(id));
	 
		obox.style.display = "none";
		cbox.style.display = "";
		div.style.display = "";

        this.open[id] = true;
        
        return this.getOpenIds();
	}
    
	closeEntry(id)
	{
	 let obox = document.getElementById(this.getOpenBoxId(id));
	 let cbox = document.getElementById(this.getCloseBoxId(id));
	 let div = document.getElementById(this.getEntryDivId(id));
	 
	 obox.style.display="";
	 cbox.style.display="none";
	 div.style.display="none";
	 
     this.open[id] = false;

	 return this.getOpenIds();
	}

    click(issue) {
        console.log("!!!");
        let e  = issue.getPayload();

        let id = this.extractId(e.target.id);
        let op = this.extractSuffix(e.target.id) 
        
        switch(op) {
            case "open": 
                issue.convert("uitocentry", this.openEntry(id));
                break;
            case "close":
                issue.convert("uitocentry", this.closeEntry(id));
                break;
        }

    }
}


class ArnavTocArea extends ArnavUiControl {
	
	constructor(id, chief) {
		
		super(id, chief);
		
		this.toc = new Toc("tocdiv", this);
		
	}
	
	storeScrollState() {
		let div = document.getElementById('tocdiv');
		cook_cookie_set_secx('tocscroll', (div.scrollTop).toString(), 100000); 
	}

	restoreScrollState() {
		let div = document.getElementById('tocdiv');
		let scrollPos = cook_cookie_get('tocscroll');
		div.scrollTop = Number(scrollPos); 
	}
}
