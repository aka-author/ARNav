

class ArnavBurger extends ArnavUIControl {

    constructor(chief=null, options=null,  id=undefined) {
        
        super(chief, options, id);

        this.unfoldIconId = this.getId() + "Unfold";
        this.foldIconId = this.getId() + "Fold";
    }
    
    getUnfoldIconId() {
        return this.unfoldIconId;
    }

    getUnfoldIcon() {
        return document.getElementById(this.getUnfoldIconId());
    }

    getFoldIconId() {
        return this.foldIconId;
    }

    getFoldIcon() {
        return document.getElementById(this.getFoldIconId());
    }

    showUnfolded() {
        this.getUnfoldIcon().style.display = "none";
        this.getFoldIcon().style.display = "";
        return this;
    }

    showFolded() {
        this.getUnfoldIcon().style.display = "";
        this.getFoldIcon().style.display = "none";
        return this;
    }

    getSidebar() {
        let sidebar = null;
        for(sidebar of this) 
            break;
        return sidebar;
    }

    showSidebar() {
        this.getSidebar().show();
        return this;
    }

    hideSidebar() {
        this.getSidebar().hide();
        return this;
    }

    unfold() {
        return this.showUnfolded().showSidebar();
    }

    fold() {
        return this.showFolded().hideSidebar();
    }

    toggle() {
        return this.getSidebar().isVisible() ? this.fold() : this.unfold();
    }

    handle__dom_click(task) {
        this.toggle();
        this.cease(task);
    }
}
