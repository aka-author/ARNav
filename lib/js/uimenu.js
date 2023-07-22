// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      uimenu.js                                 (\(\
// Func:        Managing menus                            (^.^)  
// * * ** *** ***** ******** ************* *********************

// Abstract menus, menu items, etc.

class ArnavMenuItemHaver extends ArnavUIControl {

    createMenuItemCommand(srcObj) {
        return null;
    }

    createMenuItemNested(srcObj) {
        return null;
    }

    isNestedSrcObj(srcObj) {
        return !!srcObj.menu;
    }

    createMenuItem(srcObj) {

        const menuItem = this.isNestedSrcObj(srcObj) ? 
                this.createMenuItemNested(srcObj) : 
                this.createMenuItemCommand(srcObj);
        
        menuItem.load(srcObj);
        
        return menuItem;
    }

    addMenuItem(menuItem) {
        return this.addTasker(menuItem);
    }
}


class ArnavMenuItemGroup extends ArnavMenuItemHaver {

    load(srcObj) {

        /*
            {
                "items": [
                    {"label": "Cats...", "code": "reportCats"},
                    {"label": "Dogs...", "code": "reportDogs"}
                ] 
            }
        */

        for(const srcMenuItem of srcObj.items) {
            const menu = this.getChief();
            const menuItem = menu.createMenuItem(srcMenuItem);
            this.addMenuItem(menuItem);
        }

        return this;
    }
} 


class ArnavMenuItem extends ArnavUIControl {

    constructor(chief, options=null, id=undefined) {
        
        super(chief, options, id);

        this.labelText = undefined;
        this.iconUri = undefined;
        this.hotkey = undefined;
        this.code = undefined;
        this.disabledFlag = false;

        this.headerActiveCssClassName   = this.getHeaderCssClassName() + "Active";
        this.headerSelectedCssClassName = this.getHeaderCssClassName() + "Selected";
        this.headerDisabledCssClassName = this.getHeaderCssClassName() + "Disabled";
    }

    setLabelText(labelText) {
        this.labelText = labelText;
        return this;
    }

    getLabelText() {
        return this.labelText;
    }

    setIconURI(uri) {
        this.iconUri = uri;
        return this;
    }

    getIconURI() {
        return this.iconUri;
    }

    setHotkey(hotkey) {
        this.hotkey = hotkey;
        return this;
    }

    getHotkey() {
        return this.hotkey;
    }

    setCode(code) {
        this.code = code;
        return this;
    }

    getCode() {
        return this.code;
    }

    setDisabledFlag(flag=true) {
        this.disabledFlag = flag;
        return this;
    }

    isDisabled() {
        return this.disabledFlag;
    }

    load(srcObj) {

        /*
            {
                "label": "Open...",
                "icon": "rsrc://layout/icons/open.svg",
                "hotkey": "Ctrl+O",
                "code": "open",
                "disabled": true
            }
        */

        this.setLabelText(srcObj.label)
            .setIconURI(srcObj.icon)
            .setHotkey(srcObj.hotkey)
            .setCode(srcObj.code)
            .setDisabledFlag(srcObj.disabled);
        
        return this;
    }

    setHeaderActiveCssClassName(className) {
        this.headerActiveClassName = className;
        return this;
    }

    getHeaderActiveCssClassName() {
        return this.headerActiveClassName;
    }

    setHeaderSelectedCssClassName(className) {
        this.headerSelectedCssClassName = className;
        return this;
    }

    getHeaderSelectedCssClassName() {
        return this.headerSelectedCssClassName;
    }

    setHeaderDisabledCssClassName(className) {
        this.headerDisabledCssClassName = className;
        return this;
    }

    getHeaderDisabledCssClassName(className) {
        return this.headerDisabledCssClassName = className;
    }

    assembleHeaderInnerDOMObjects() {

        const clauses = [];

        const label = document.createElement("div");
        label.appendChild(document.createTextNode(this.getLabelText()));
        clauses.push(label);

        return clauses;
    }

    displayIdle() {
        this.getHeaderDOMObject().classList.remove(this.getHeaderActiveCssClassName());
        this.getHeaderDOMObject().classList.remove(this.getHeaderSelectedCssClassName());
    }

    displaySelected() {
        this.getHeaderDOMObject().classList.remove(this.getHeaderActiveCssClassName());
        this.getHeaderDOMObject().classList.add(this.getHeaderSelectedCssClassName());
    }

    displayActive() {
        this.getHeaderDOMObject().classList.remove(this.getHeaderSelectedCssClassName());
        this.getHeaderDOMObject().classList.add(this.getHeaderActiveCssClassName());
        return this;
    }

    displayDisabled() {
        this.getDOMObject().className = this.getDisabledClassName();
        return this;
    }

    activate() {
        this.displayActive();
        return this;
    }

    relax() {
        this.displayRegular();
        return this;
    }

    disable() {
        this.setDisabledFlag();
        this.displayDisabled();
        return this;
    }

    enable() {
        this.setDisabledFlag(false);
        this.displayRegular();
        return this;
    }

    getRelevantClassName() {
        return this.isDisabled() ? this.getDisabledClassName() : this.getRegularClassName();
    }

    assessDisable(fsm) {
        if(fsm.getPayload().code == this.getCode()) {
            this.disable();
            fsm.setCurrState("disabled");
        }
    }

    assessEnable(fsm) {
        if(fsm.getPayload().code == this.getCode()) {
            this.enable();
            fsm.setCurrState("enabled");
        }
    }    
}


class ArnavMenuItemCommand extends ArnavMenuItem {

    select(fsm) {
        const commandInfo = {"code": this.getCode()};
        this.perform(this.emit("menu_command_selected").setPayload(commandInfo));
    }

    assessKey(fsm) {
        if(ArnavDOMUtils.isKeyPressed(fsm.getLastPayload().getDOMEvent(), this.getHotkey())) 
            this.select(fsm);
    }
}


class ArnavMenuItemNested extends ArnavMenuItem {

    createMenu(srcObj) {
        return null;
    }

    addMenu(menu) {
        return this.addTasker(menu);
    }

    load(srcObj) {

        /*
            {
                "label": "Reports",
                "code": "reports",
                "menu": {
                    "items": [
                        {"label": "Cats...", "code": "reportCats"},
                        {"label": "Dogs...", "code": "reportDogs"}
                    ]
                }
            }
        */

        super.load(srcObj);

        this.menu = this.createMenu(srcObj.menu);
        this.addMenu(this.menu);

        return this;
    }
}


class ArnavMenu extends ArnavMenuItemHaver {

    constructor(chief, options=null, id=undefined) {

        super(chief, options, id);

        this.setInitialDisplay("none");
    }

    createMenuItemGroup(srcObj) {
        return new ArnavMenuItemGroup(this).load(srcObj);
    }

    addMenuItemGroup(menuItemGroup) {
        return this.addTasker(menuItemGroup);
    }

    isMenuItemGroupSrc(srcObj) {
        return !srcObj.label;
    }

    load(srcObj) {

        for(const srcItemObj of srcObj.items)
            if(this.isMenuItemGroupSrc(srcItemObj))
                this.addMenuItemGroup(this.createMenuItemGroup(srcItemObj));
            else
                this.addMenuItem(this.createMenuItem(srcItemObj));
                
        return this;
    }

    show() {

        const menuHaver = this.getChief();

        if(menuHaver.getNestedMenuPosition) {
            const menuPosition = this.getChief().getNestedMenuPosition();
            this.setPosition(menuPosition);
        }
        
        return super.show();
    }

    open() {
        return this.show();
    }

    close() {
        this.hide();
    }
}


// Full-screen menus

// Pull-down menu

class ArnavPullDownMenuItemCommand extends ArnavMenuItemCommand {

    assembleHeaderInnerDOMObjects() {

        const clauses = [];

        const label = document.createElement("div");
        label.appendChild(document.createTextNode(this.getLabelText()));
        clauses.push(label);

        if(this.getHotkey()) {
            const hotkey = document.createElement("div");
            hotkey.appendChild(document.createTextNode(this.getHotkey()));
            clauses.push(hotkey);
        }

        return clauses;
    }

    installFiniteStateMachines() {

        const fsm = new ArnavFiniteStateMachine().setInitialState("idle").reset();

        fsm.addTransitions(
            ["idle",     "dom_mouseover",  "selected", (fsm) => this.select(fsm)],
            ["selected", "dom_mouseup",    "idle",     (fsm) => this.command(fsm)],
            ["selected", "dom_mouseleave", "idle",     (fsm) => this.relax(fsm)],
            ["selected", "menu_closed",    "idle",     (fsm) => this.relax(fsm)]
        );

        this.addFiniteStateMachine(fsm);

        return this;
    }

    select(fsm) {
        this.displaySelected();
        this.perform(this.emit("menu_close").makeCollegial());
    }

    relax(fsm) {
        this.displayIdle();
    }

    command(fsm) {
        const commandInfo = {"commandCode": this.getCode()}
        this.relax();
        this.getChief().perform(this.emit("menu_commandSelected").setPayload(commandInfo));
    }
}


class ArnavPullDownMenuItemNested extends ArnavMenuItemNested {

    createMenu(srcObj) {
        return new ArnavPullDownMenu(this).load(srcObj);
    }

    getNestedMenuPosition() {
        return new ArnavVect(this.getChief().getRight(), this.getTop());
    }
    
    getNestedMenuPointer(dir="ltr") {
        return dir == "ltr" ? "▶" : "◀";
    }

    getNestedMenuPointerCssClassName(dir="ltr") {
        return dir == "ltr" ? "ltr" : "rtl";
    }

    assembleHeaderInnerDOMObjects() {

        const clauses = [];

        const label = document.createElement("div");
        label.appendChild(document.createTextNode(this.getLabelText()));
        clauses.push(label);

        if(this.menu) {

            const ar = document.createElement("div");
            ar.className = this.getNestedMenuPointerCssClassName("ltr");
            ar.appendChild(document.createTextNode(this.getNestedMenuPointer("ltr")));

            const al = document.createElement("div");
            al.appendChild(document.createTextNode(this.getNestedMenuPointer("rtl")));
            al.className = this.getNestedMenuPointerCssClassName("rtl");
            
            clauses.push(ar, al);
        }

        return clauses;
    }

    installFiniteStateMachines() {

        const fsm = new ArnavFiniteStateMachine().setInitialState("idle").reset();

        fsm.addTransitions(
            ["idle",     "dom_mouseover",  "selected", (fsm) => this.select(fsm)],
            ["selected", "dom_mouseleave", "idle",     (fsm) => this.relax(fsm)],
            ["selected", "menu_closed",    "idle",     (fsm) => this.relax(fsm)]
        );

        this.addFiniteStateMachine(fsm);

        return this;
    }

    select(fsm) {
        this.displaySelected();
        this.menu.perform(this.emit("menu_open").makePrivate());
    }

    relax(fsm) {
        this.displayIdle();
    }
}


class ArnavPullDownMenu extends ArnavMenu {

    createMenuItemCommand(srcObj) {
        return new ArnavPullDownMenuItemCommand(this).load(srcObj);
    }

    createMenuItemNested(srcObj) {
        return new ArnavPullDownMenuItemNested(this).load(srcObj);
    }

    installFiniteStateMachines() {

        const fsm = new ArnavFiniteStateMachine().setInitialState("closed").reset();

        fsm.addTransitions(
            ["closed", "menu_open",            "opened", (fsm) => this.open(fsm)],
            ["opened", "menu_close",           "closed", (fsm) => this.close(fsm)],
            ["opened", "menu_commandSelected", "closed", (fsm) => this.close(fsm)]
        );

        this.addFiniteStateMachine(fsm);

        return this;
    }

    handle__dom_mouseover(task) {
        this.cease(task);
    }

    open(fsm) {
        this.setPosition(this.getChief().getNestedMenuPosition());
        this.show();
    }

    close(fsm) {
        this.hide();
    }
}


// Main menu

class ArnavMainMenuItem extends ArnavMenuItemNested {

    createMenu(srcObj) {
        return new ArnavPullDownMenu(this).load(srcObj);
    }
    
    installFiniteStateMachines() {

        const fsm = new ArnavFiniteStateMachine().setInitialState("idle").reset();

        fsm.addTransitions(
            ["idle",     "dom_mouseover",        "active",   (fsm) => this.activate(fsm)],
            ["idle",     "menu_itemSelected",    "ready",    (fsm) => this.getReady(fsm)],
            ["active",   "dom_mousedown",        "excited",  (fsm) => this.exite(fsm)],
            ["active",   "dom_mouseleave",       "idle",     (fsm) => this.relax(fsm)],
            ["ready",    "dom_mouseover",        "selected", (fsm) => this.select(fsm)],
            ["ready",    "dom_mouseover",        "excited",  (fsm) => this.exite(fsm)],
            ["ready",    "menu_commandSelected", "idle",     (fsm) => this.relax(fsm)],
            ["ready",    "menu_userCancelled",   "idle",     (fsm) => this.relax(fsm)],
            ["ready",    "menu_itemDeselected",  "idle",     (fsm) => this.relax(fsm)],
            ["excited",  "menu_select",          "selected", (fsm) => this.select(fsm)],
            ["selected", "menu_itemSelected",    "ready",    (fsm) => this.getReady(fsm)],
            ["selected", "menu_commandSelected", "idle",     (fsm) => this.relax(fsm)],
            ["selected", "menu_userCancelled",   "idle",     (fsm) => this.relax(fsm)],
            ["selected", "dom_mousedown",        "wary"],
            ["wary",     "dom_mouseup",          "active",   (fsm) => this.deselect(fsm)],
        );

        this.addFiniteStateMachine(fsm);

        return this;
    }

    activate(fsm) {
        this.displayActive();
        this.menu.perform(this.emit("menu_close").makePrivate());
    }

    getReady(fsm) {
        this.displayIdle();
        this.menu.perform(this.emit("menu_close").makeSinker());
    }

    getNestedMenuPosition() {
        return new ArnavVect(0, 0);
    }

    exite(fsm) {
        this.getChief().perform(this.emit("menu_itemSelected").makeBroadcast());
        this.perform(this.emit("menu_select").makePrivate());
    }

    select(fsm) {
        this.displaySelected();
        this.menu.perform(this.emit("menu_open").makePrivate());
    } 
    
    deselect(fsm) {
        this.displayIdle();
        this.getChief().perform(this.emit("menu_itemDeselected").makeBroadcast());
        this.menu.perform(this.emit("menu_close").makePrivate());
    } 

    relax(fsm) {
        this.displayIdle();
    }
}


class ArnavMainMenu extends ArnavMenu {

    constructor(chief, options=null, id=undefined) {
        super(chief, options, id);
        this.setInitialDisplay();
    }

    createMenuItem(srcObj) {
        return new ArnavMainMenuItem(this).load(srcObj);
    }
}


// Hamburger

// TBD
