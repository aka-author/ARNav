/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:    ctrltree.js                         (\(\
 Func:		Displaying a tree                   (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavTree extends ArnavScrollArea {
	
	constructor(chief, id, selectedId=undefined, openIds=[]) {
		super(chief, id);
        this.setSelectedId(selectedId);
        this.setOpen(openIds);
	}

    setSelectedId(id) {
        this.selectedId = id;
        return this;
    }

    getSelectedId() {
        return this.selectedId;
    }

    getEntries(entry) {
        return entry.getWorkers();
    }

    isSelected(entry) {
        return entry.matchUri(window.location.href);
    }

    setOpen(openIds) {
        this.open = {};
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
        let clauses = domElementId.split(this.getIdSepar());
        return clauses[clauses.length - 1];
    }

    getLinkId(id) {
        return this.assembleId(id, "select");
    }

	getOpenBoxId(id) {
		return this.assembleId(id, "open");
	}

    getOpenBoxIconId(id) {
		return this.assembleId(this.assembleId(id, "icon"), "open");
	}

	getCloseBoxId(id) {
		return this.assembleId(id, "close");
	}

    getCloseBoxIconId(id) {
		return this.assembleId(this.assembleId(id, "icon"), "close");
	}

	getEntryDivId(id) {
		return this.assembleId(id, "div");
	}

    // Assembling class names and lists

    getSelectedClassName(entry) {
        return entry.hasWorkers() ?                 
                    this.getCfg().getProp("toc.tree.classTitleNodeSelected") : 
                    this.getCfg().getProp("toc.tree.classTitleLeafSelected");
    }

    getLevelClassName(entry) {
        return this.getCfg().getProp("toc.tree.classLevelPrefix") + entry.getLevel();
    }

    getLabelClassName(entry) {
        return this.getCfg().getProp("toc.tree.classLabel");
    }

    getEntryOuterClassName(entry) {
        return this.getCfg().getProp("toc.tree.classEntryOuter");
    }

    getEntryTitleClassName(entry) {
        return entry.hasWorkers() ? 
                this.getCfg().getProp("toc.tree.classEntryTitleNode") : 
                this.getCfg().getProp("toc.tree.classEntryTitleLeaf");
    }

    getEntryInnerClassName(entry) {
        return this.getCfg().getProp("toc.tree.classEntryInner");
    }

    assembleEntryOuterClassRefs(entry) {
        return this.getEntryOuterClassName(entry);
    }

    assembleOpenBoxClassRefs() {
        return this.getCfg().getProp("toc.tree.classOpenBox");
    }

    assembleCloseBoxClassRefs() {
        return this.getCfg().getProp("toc.tree.classOpenBox");
    }

    assembleTitleLabelClassRefs(entry) {
        let classRefs = [this.getLabelClassName(entry), this.getLevelClassName(entry)];
        if(this.isSelected(entry)) classRefs.push(this.getSelectedClassName(entry));
        return classRefs.join(" ");
    }

    assembleEntryInnerClassRefs(entry) {
        return this.getEntryInnerClassName(entry);
    }

    getTitleOuterClassName(entry) {

        if(entry.hasWorkers()) {
            return this.isSelected(entry) ? 
                    this.getCfg().getProp("toc.tree.classTitleNodeSelected") : 
                    this.getCfg().getProp("toc.tree.classTitleNode");
        } else {
            return this.isSelected(entry) ? 
                    this.getCfg().getProp("toc.tree.classTitleLeafSelected") : 
                    this.getCfg().getProp("toc.tree.classTitleLeaf");
        }
    }

	// Assembling DOM objects for a TOC

	assembleEntryOuterDom(entry) {

        let oDiv = document.createElement("div");
        
        oDiv.setAttribute("id", entry.getId());
        oDiv.setAttribute("class", this.assembleEntryOuterClassRefs(entry));
		oDiv.appendChild(this.assembleEntryTitleDom(entry));
        
        if(entry.hasWorkers())
		    oDiv.appendChild(this.assembleEntryInnerDom(entry));
        
        return oDiv;
	}

    assembleOpenBoxInnerDom(entry) {
        //return document.createTextNode("►");
        let id = entry.getId();
        let imgIcon = document.createElement("img");
        imgIcon.setAttribute("id", this.getOpenBoxIconId(id));
        imgIcon.setAttribute("src", this.getCfg().getProp('toc.tree.srcImgOpen'));
        return imgIcon;
    }

	assembleOpenBoxDom(entry) {
        
        let oSpan = document.createElement("span");
        
        let id = entry.getId();
        oSpan.setAttribute("id", this.getOpenBoxId(id));
        oSpan.setAttribute("class", this.assembleOpenBoxClassRefs());
        oSpan.setAttribute("style", "display: " + (this.isOpen(id) ? "none" : ""));
		oSpan.appendChild(this.assembleOpenBoxInnerDom(entry));
		
        return oSpan;
	}

    assembleCloseBoxInnerDom(entry) {
        //return document.createTextNode("▼");
        let id = entry.getId();
        let imgIcon = document.createElement("img");
        imgIcon.setAttribute("id", this.getCloseBoxIconId(id));
        imgIcon.setAttribute("src", this.getCfg().getProp('toc.tree.srcImgClose'));
        return imgIcon;
    }

	assembleCloseBoxDom(entry) {
        
        let cSpan = document.createElement("span");
		
        let id = entry.getId();
        cSpan.setAttribute("id", this.getCloseBoxId(id));
        cSpan.setAttribute("class", this.assembleCloseBoxClassRefs());
        cSpan.setAttribute("style", "display: " + (this.isOpen(id) ? "" : "none"));
		cSpan.appendChild(this.assembleCloseBoxInnerDom(entry));
		
        return cSpan;
	}

	assembleEntryLinkDom(entry) {}

	assembleEntryTitleDom(entry) {

		let tDiv = document.createElement("div");

        if(entry.hasWorkers()) {
            tDiv.appendChild(this.assembleOpenBoxDom(entry));
            tDiv.appendChild(this.assembleCloseBoxDom(entry));
        }

        tDiv.appendChild(this.assembleEntryLinkDom(entry));
        tDiv.setAttribute("class", this.getTitleOuterClassName(entry));      
		
        return tDiv;
	}

	assembleEntryInnerDom(entry) {

		let iDiv = document.createElement("div");

        let id = entry.getId();
		iDiv.setAttribute("id", this.getEntryDivId(id));
        iDiv.setAttribute("class", this.assembleEntryInnerClassRefs(entry));
        iDiv.setAttribute("style", "display: " + (this.isOpen(id) ? "" : "none"));
		
        let entries = this.getEntries(entry);
		for(let idx in entries)
			iDiv.appendChild(this.assembleEntryOuterDom(entries[idx]));
		
		return iDiv;
	}

	assembleDom() {

		let tDiv = document.createElement("div");

        let iDiv = document.createElement("div");
        iDiv.setAttribute("class", this.getCfg().getProp("toc.tree.classInner"));

        let entries = this.getModel().getEntries();
		for(let i in entries)
			iDiv.appendChild(this.assembleEntryOuterDom(entries[i]));

        tDiv.appendChild(iDiv);

		return tDiv;
	}

	// Letting a reader to select entries in a TOC

	getOpenIds() {
        let openIds = [];
		for(let id in this.open) if(this.open[id]) openIds.push(id)     
        return openIds;
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

    flipFlopEntry(id) {
        if(this.isOpen(id)) this.closeEntry(id); else this.openEntry(id);
    }

    handle__click(issue) {}

    handle__scroll(issue) {
        issue.convert("uitocscroll", this.getDomObject().scrollTop.toString());
	}
}
