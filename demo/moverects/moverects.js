

class Quarter extends ArnavControl {

    constructor(chief, id) {
        super(chief, id);
        this.iAmMoving = false;
    }

    handle__mousedown(issue) {
        this.iAmMoving = true;
        this.goToFront();
        issue.terminate();
    }

    handle__mousemove(issue) {
        if(this.iAmMoving) {
            this.setLeft(this.getLeft() + issue.getPayload().movementX);
            this.setTop(this.getTop() + issue.getPayload().movementY);
        }

        issue.terminate();
    }

    handle__mouseup(issue) {
        this.iAmMoving = false;
    }

}


class Page extends ArnavPage {

    beforeRun() {
        console.log("Creating quarters...");
        this.q1 = (new Quarter(this, "q1")).bindDomObject();
        this.q2 = (new Quarter(this, "q2")).bindDomObject();
        this.q3 = (new Quarter(this, "q3")).bindDomObject();
        this.q4 = (new Quarter(this, "q4")).bindDomObject();
    }

}

class App extends ArnavApp {

    beforeRun() {
        console.log("Creating a page...");
        this.page = (new Page(this)).bindDomObject();
    }

}

var GLOBAL_APP = new App();