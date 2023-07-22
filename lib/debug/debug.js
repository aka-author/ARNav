class ToggleDirectionButton extends ArnavUIControl {

    handle__dom_click(task) {
        ArnavDOMUtils.toggleTextDirection();
        document.getElementsByTagName("html")[0].setAttribute("dir", ArnavDOMUtils.getTextDirection());

        console.log( document.getElementsByTagName("html")[0]);
        this.cease(task);
        this.perform(new ArnavTask("start").makeBroadcast())
    }

}

class CtrlRect extends ArnavUIControl {

    buildPlotPlan() {
        this.resetPlotPlan();
        this.addMasterZone();
        this.addHedgeZone(5, 4);
        this.plotPlan.addFramePeripheryZone(2, 10, this.getInteriorRect());
        this.plotPlan.id = this.getId()+"_pp";

        this.plotPlan.fp.outer.debugDisplay(this.getDOMObject());
        this.plotPlan.fp.inner.debugDisplay(this.getDOMObject());

        console.log(this.plotPlan);
    }

    addMovingTransitions(fsm) {
        fsm.addTransitions(
            ["calm", "ready_to_move", "moving"],
            ["moving", "dom_mousemove", "moving"],
            ["moving", "dom_mouseup", "calm"]
        );
    }

    addResizingTransitions(fsm) {

        const directions = this.getDirections();

        for(const dir of directions) {

           fsm.addTransitions(
                ["calm", `border_${dir}`, `ready_to_resize_${dir}`, (fsm) => this.get_ready_for_resizing(fsm)],
                [`ready_to_resize_${dir}`, "check_mousedown", `resizing_${dir}`, (fsm) => this.resize(fsm)],
                [`resizing_${dir}`, "check_mousemove", `resizing_${dir}`, (fsm) => this.resize(fsm)],
                [`resizing_${dir}`, "check_mouseup", `ready_to_resize_${dir}`, (fsm) => this.stop_resize(fsm)],
                [`ready_to_resize_${dir}`, "get_calm", "calm"]
            );

            for(const dir1 of directions)
                if(dir != dir1)
                    fsm.addTransitions(
                        [`ready_to_resize_${dir}`, `border_${dir1}`, `ready_to_resize_${dir1}`, 
                            (fsm) => this.get_ready_for_resizing(fsm)]);
           }
    }

    installFiniteStateMachines() {

        const winFsm = new ArnavFiniteStateMachine()
                .setDefaultTrigger((fsm) => this.ontrans(fsm))
                .setInitialState("calm")
                .reset()

        this.addMovingTransitions(winFsm);
        this.addResizingTransitions(winFsm);

        this.addFiniteStateMachine(winFsm);
    }

    handle__start(task) {
        
        let computedStyle = window.getComputedStyle(document.documentElement);
        let direction = computedStyle.getPropertyValue('direction');

        let start = parseInt(this.getArnavDOMElementProp(this.getDOMObject(), "start"));

        //const c = new ArnavCircle(new ArnavVect(30, 30), 20);
        //console.log(c);
        //c.debugDisplay(this.getDOMObject());

        this.setStart(start);           
    }


    // Displaying a banner

    appendBanner() {
        this.banner = document.createElement("div");
        this.banner.className = "banner";
        this.getDOMObject().appendChild(this.banner);
        return this;
    }
    
    showBanner(task) {
        /*
        if(!this.banner) 
            this.appendBanner();
        
        const localVect = this.getClientVect(task.getDOMEvent());
            
        const banner = `x: ${Math.round(localVect.x)}, y: ${Math.round(localVect.y)}`;
        this.banner.innerHTML = banner;
        */
        return this;
    }


    // Handling moving tasks

    handle__moving(task) {

    }


    // Handling resizing tasks

    handle__ready_to_resize_left(task) {
        this.setCursor("ew-resize");
    }

    handle__ready_to_resize_right(task) {
        this.setCursor("ew-resize");
    }

    handle__ready_to_resize_top(task) {
        this.setCursor("ns-resize");
    }

    handle__ready_to_resize_bottom(task) {
        this.setCursor("ns-resize");
    }

    handle__ready_to_resize_left_top(task) {
        this.setCursor("nwse-resize");
    }

    handle__ready_to_resize_right_top(task) {
        this.setCursor("nesw-resize");
    }

    handle__ready_to_resize_left_bottom(task) {
        this.setCursor("nesw-resize");
    }

    handle__ready_to_resize_right_bottom(task) {
        this.setCursor("nwse-resize");
    }

    handle__resize_left(task) {
        let deltaX = task.getPayload().dxLeft; 
        if(this.getWidth() > this.getMinWidth() ||  deltaX < 0) 
            this.resizeToLeft(Math.round(deltaX/window.devicePixelRatio));           
    }

    handle__resize_right(task) {
        let deltaX = task.getPayload().dxRight;
        if(this.getWidth() > this.getMinWidth() ||  deltaX > 0) 
            this.resizeToRight(deltaX);
    }

    handle__resize_top(task) {
        let deltaY = task.getPayload().dyTop; 
        if(this.getHeight() > this.getMinHeight() ||  deltaY < 0) 
            this.resizeToTop(deltaY);  
    }

    handle__resize_bottom(task) {
        let deltaY = task.getPayload().dyBottom;
        if(this.getHeight() > this.getMinHeight() || deltaY > 0) 
            this.resizeToBottom(deltaY);
    }

    handle__resize_left_top(task) {

        let deltaX = task.getPayload().dxLeft;
        let deltaY = task.getPayload().dyTop;
        
        if(!(this.getWidth() > this.getMinWidth() ||  deltaX < 0))
            deltaX = 0; 
        
        if(!(this.getHeight() > this.getMinHeight() ||  deltaY < 0))
            deltaY = 0;  

        this.resizeToLeftTop(deltaX, deltaY);
    }

    handle__resize_left_bottom(task) {

        let deltaX = task.getPayload().dxLeft;
        let deltaY = task.getPayload().dyBottom;
        
        if(!(this.getWidth() > this.getMinWidth() ||  deltaX < 0))
            deltaX = 0; 
        
        if(!(this.getHeight() > this.getMinHeight() ||  deltaY > 0)) 
            deltaY = 0;  

        this.resizeToLeftBottom(deltaX, deltaY);
    }

    handle__resize_right_top(task) {

        let deltaX = task.getPayload().dxRight;
        let deltaY = task.getPayload().dyTop;
        
        if(!(this.getWidth() > this.getMinWidth() ||  deltaX > 0))
            deltaX = 0; 
        
        if(!(this.getHeight() > this.getMinHeight() ||  deltaY < 0)) 
            deltaY = 0;  

        this.resizeToRightTop(deltaX, deltaY);
    }

    handle__resize_right_bottom(task) {

        let deltaX = task.getPayload().dxRight;
        let deltaY = task.getPayload().dyBottom;
        
        if(!(this.getWidth() > this.getMinWidth() ||  deltaX > 0))
            deltaX = 0; 
        
        if(!(this.getHeight() > this.getMinHeight() ||  deltaY > 0)) 
            deltaY = 0;  

        this.resizeToRightBottom(deltaX, deltaY);
    }

    get_ready_for_resizing(fsm) {
        const taskTypeName = fsm.getCurrStateName();
        this.perform(this.emit(taskTypeName).makePrivate());    
    }

    resize(fsm) {

        const currResizeTask = fsm.getLastPayload();
        
        const rect = this.getDOMObject().getBoundingClientRect();
        
        const currEvent = currResizeTask.getDOMEvent();
        
        const coords = {
            "dxLeft": currEvent.clientX - rect.left,
            "dxRight": currEvent.clientX - (rect.left + rect.width),
            "dyTop": currEvent.clientY - rect.top,
            "dyBottom": currEvent.clientY - (rect.top + rect.height)
        }

        const stateName = fsm.getCurrStateName();
        const taskTypeName = stateName.replace(/^resizing_/, "resize_");
        const resizeInternalTask = this.emit(taskTypeName).setPayload(coords).makePrivate();
        
        this.perform(resizeInternalTask);

        this.prevResizeTask = currResizeTask;
    }

    stop_resize() {
        this.prevResizeTask = null;
        this.setCursor("default");
        this.buildPlotPlan();
    }


    // Handling DOM tasks

    handle__check_mousemove(task) {

        this.showBanner(task);

        const zoneTags = this.getZoneTags(this.getLocalVect(task.getDOMEvent()));
        
        if(zoneTags.has("periphery")) {
            ArnavDOMUtils.startTremble(this.getDOMObject(), 1, 100, 3000);
        }

        if(zoneTags.has("header")) {
            /* Moving */
        } else if(zoneTags.has("hedge")) {
            const direction = zoneTags.selectOne(...this.getDirections());
            this.perform(this.emit("border_" + direction).makePrivate());
        } else {
            this.perform(this.emit("get_calm").makePrivate());
        }
    }
}

class Playground extends ArnavUIControl {

    handle__dom_mousemove(task) {
        this.perform(this.mutate(task, "check_mousemove").makeSinker());
        this.cease(task);
    }

    handle__dom_mousedown(task) {
        this.perform(this.mutate(task, "check_mousedown").makeSinker());
        this.cease(task);
    }

    handle__dom_mouseup(task) {
        this.perform(this.mutate(task, "check_mouseup").makeSinker());
        this.cease(task);
    }
}

function loadConfig(callback) {

    let cfg = new ArnavCfg("arnav_debug");

    cfg.load(
        {   "general": {
                "ipRelatedParams": {
                    "method": "get",
                    "url": "https://api.country.is",
                    "ip": undefined,
                    "country": undefined
                }
            },
            "name": "Karl Ivanovich",
            "page": {
                "width": 100,
                "height": 100
            },
            "list": {
                "length": "25",
                "selected": "karabas",
                "items": {
                    "start": "korova",
                    "finish": "koza"
                }
            } 
        }, () => {console.log(cfg.cfg); callback()}
    );
}

function start() {

    const page = new ArnavPage(null, null, "bodyPage");
    
    const mainMenu = new ArnavMainMenu(page).load(getDebugMenuData().mainMenu);
    console.log("turn on", mainMenu.turnOn());
    console.log(mainMenu.assembleDOMObject());
    document.getElementById("divPageHeader").appendChild(mainMenu.getDOMObject());

    page.turnOn().perform(new ArnavTask("start").makeSinker());
}

function debug() {
    loadConfig(start);
}


function getDebugMenuData() {

    const md  = { 
        "mainMenu": {
            "items": [
                {
                    "label": "קובץ",
                    "menu": {
                        "items": [
                            {"label": "جديد...", "hotkey": "Ctrl+N", "code": "new"},
                            {"label": "ئېچىڭ...", "hotkey": "Ctrl+O", "code": "open"},
                            {
                                "items": [    
                                    {"label": "Save", "hotkey": "Ctrl+S", "code": "save"},
                                    {"label": "Save As...", "code": "saveAs"}
                                ]
                            },   
                            {
                                "label": "Arnocles",
                                "menu": {
                                    "items": [
                                        {"label": "Arnocle 1"},
                                        {"label": "Arnocle 2"}
                                    ]
                                }
                            },
                            {"label": "Exit", "code": "exit"}
                        ]
                    }
                },
                {
                    "label": "Edit",
                    "menu": {
                        "items": [
                            {"label": "Undo", "hotkey": "Ctrl+Z", "code": "undo"},
                            {"label": "Cut", "hotkey": "Ctrl+C", "code": "cut"},
                            {"label": "Copy", "hotkey": "Ctrl+X", "code": "copy"},
                            {"label": "Paste", "hotkey": "Ctrl+V", "code": "paste"}
                        ]
                    }
                },
                {
                    "label": "View",
                    "menu": {
                        "items": [
                            {"label": "Toggle direction", "code": "dir"}
                        ]
                    }
                }                    
            ]
        }
    }

    return md;
}