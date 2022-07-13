

class Page extends UIControl {

    constructor(app, id) {

        super(app, id)
        
        this.createPageHeader();
        this.createContentConsole();
    }
    
    isPage() {
        return true;
    }

    createSearchPane() {

    }

    createLangSelector() {

    }

    createPageHeader() {
        this.createSearchPane();
        this.createLangSelector();
    }

    createTocTree() {

    }

    createTocFramelet() {

        this.createTocTree()

    }

    createReaderFramelet() {

    }

    createContentConsole() {
        this.createTocFramelet();
        this.createReaderFramelet();
    }

}