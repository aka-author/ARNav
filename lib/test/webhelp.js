

class Cfg extends ArnavCfg {

    setDefaults() {
        // this.setSysCfgParam("USER_NAME", "Ilon Musk");
        // this.setDocCfgParam("default", "USER_NAME", "Ilon Musk");
        // this.setDefaultDocCfgParam("TOC_OPEN_TOC_ENTRIES", "");
    }
}

class App extends ArnavApp {

    createCfg() {
        return new Cfg();
    }

    createDoc() {
        let doc = new ArnavDoc(this, "toc");
        doc.loadFromDto(GLOBAL_DOC_DTO);
        this.setModel(doc);
    }

    saveDocCfgParam(paramName, paramValue) {
        this.getCfg().setDocCfgParam(this.getModel().getId(), paramName, paramValue);
    }

    loadDocCfgParam(paramName) {
        return this.getCfg().getDocCfgParam(this.getModel().getId(), paramName);
    }

    saveOpenIds(openIds) {
        this.saveDocCfgParam("TOC_OPEN_TOC_ENTRIES", openIds.join(" "));
    }

    loadOpenIds() {
        return this.loadDocCfgParam("TOC_OPEN_TOC_ENTRIES").split(" ");
    }

    saveTocScrollTop(scrollTop) {
        this.saveDocCfgParam("TOC_SCROLL", scrollTop.toString());
    }

    loadTocScrollTop() {
        return Number(this.loadDocCfgParam("TOC_SCROLL"));
    }

    uitocentry(issue) {   
        this.saveOpenIds(issue.getPayload());
    }

    uitocscroll(issue) {
        this.saveTocScrollTop(issue.getPayload());
    }
     
    afterRun() {
        console.log("Running...");
        console.log("CFG: ", this.getCfg().assembleJson());

        this.createDoc();
        this.tocArea = new ArnavTocArea(this, "tocArea");
        this.ticTree = new ArnavUiTocMultipage(this.tocArea, "tocTree", "sec1.3", this.loadOpenIds());
        this.tocArea.setScrollState(this.loadTocScrollTop());
    }

}

var GLOBAL_APP = new App();
