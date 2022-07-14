

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

    //attempt(issue) {
    uitocentry(issue) {   
        this.getCfg().setDocCfgParam(this.getModel().getId(), "TOC_OPEN_TOC_ENTRIES", issue.getPayload());
        console.log(issue);
    }
    
    uitocscroll(issue) {

    }
     
    afterRun() {
        console.log("Running...");
    
        let cfg = this.getCfg();
        console.log("CFG: ", cfg.assembleJson());

        let doc = new ArnavDoc(this, "toc");
        doc.loadFromDto(GLOBAL_DOC_DTO);
        this.setModel(doc);

        this.uiToc = new ArnavUiToc(this, "uitoc");
        this.uiToc.setOpen(this.getCfg().getDocCfgParam(doc.getId(), "TOC_OPEN_TOC_ENTRIES").split(" "));

        document.getElementById("tocContainer").appendChild(this.uiToc.assembleDom());

        console.log(GLOBAL_DOC_DTO);
        console.log(this.uiToc.assembleDom());
    }

}

var GLOBAL_APP = new App();
