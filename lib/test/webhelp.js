

class Cfg extends ArnavCfg {

    setDefaults() {
        this.setSysCfgParam("USER_NAME", "Ilon Musk");

        this.setDocCfgParam("default", "USER_NAME", "Ilon Musk");
        this.setDefaultDocCfgParam("TOC_OPEN_TOC_ENTRIES", "");
    }
}

class App extends ArnavApp {

    createCfg() {
        return new Cfg();
    }

    uitocentry(issue) {   
        this.getCfg().setDocCfgParam(this.getModel().getId(), "TOC_OPEN_TOC_ENTRIES", issue.getPayload());
        console.log(issue);
    }
    
    uitocscroll(issue) {
        this.getCfg().setDocCfgParam(this.getModel().getId(), "TOC_SCROLL", issue.getPayload());
        console.log(issue);
    }
     
    afterRun() {
        console.log("Running...");
    
        let cfg = this.getCfg();
        console.log("CFG: ", cfg.assembleJson());

        // Loading model 
        console.log(GLOBAL_DOC_DTO);
        let doc = new ArnavDoc(this, "toc");
        doc.loadFromDto(GLOBAL_DOC_DTO);
        this.setModel(doc);

        // TOC Area
        let tocArea = new ArnavTocArea(this, "tocArea");
        

        // TOC tree
        this.uiToc = new ArnavUiTocMultipage(tocArea, "uitoc");
        this.uiToc.setOpen(this.getCfg().getDocCfgParam(doc.getId(), "TOC_OPEN_TOC_ENTRIES").split(" "));
        document.getElementById("tocContainer").appendChild(this.uiToc.assembleDom());
        console.log(this.uiToc.assembleDom());

        tocArea.setScrollState(Number(this.getCfg().getDocCfgParam(doc.getId(), "TOC_SCROLL")));
    }

}

var GLOBAL_APP = new App();
