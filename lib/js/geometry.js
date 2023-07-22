// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      geometry.js                               (\(\
// Func:        Locating points and shapes                (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavShape extends ArnavRoot {

    between(e1, p, e2) {
        return Math.min(e1, e2) <= p && p <= Math.max(e1, e2);
    }

    setParams(params) {
        return this;
    }

    distance(vect1, vect2) {
        const dx = vect1.x - vect2.x;
        const dy = vect1.y - vect2.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

    debugAssemble() {
        return document.createElement("div");
    }

    debugDisplay(containerElement, zIndex=1) {
        
        const debugDomObj = this.debugAssemble();

        ArnavDOMUtils.makeAbsolute(debugDomObj);
        ArnavDOMUtils.setBackgroundColor(debugDomObj, ArnavDOMUtils.randomColor());
        ArnavDOMUtils.setZIndex(debugDomObj, zIndex);

        containerElement.appendChild(debugDomObj);

        const left = ArnavDOMUtils.getLeft(debugDomObj);
        const top = ArnavDOMUtils.getTop(debugDomObj);

        ArnavDOMUtils.setTitle(debugDomObj, `(${left}, ${top})`);

        return this;
    }
}


class ArnavVect extends ArnavShape {

    constructor(x=undefined, y=undefined, id=undefined) {
        super(id);
        this.x = x;
        this.y = y;
    }

    setParams(params) {
        this.x = params.x;
        this.y = params.y;
        return this;
    }

    add(vect) {
        return new ArnavVect(this.x + vect.x, this.y + vect.y);
    }

    sub(vect) {
        return new ArnavVect(this.x - vect.x, this.y - vect.y);
    }

    debugAssemble() {
        
        const circle = document.createElement("div");
        ArnavDOMUtils.setRect(circle, this.x - 2, this.y - 2, 5, 5);

        return circle;
    }
}


class ArnavRegion extends ArnavShape {

    constructor(id=undefined) {
        super(id);
    }

    setPosition(vect) {
        return this;
    }

    getPosition() {
        return new ArnavVect(0, 0);
    }

    move(deltaVect) {
        this.setPosition(this.getPosition().add(deltaVect));
        return this;
    }

    getDirections() {
        return [];
    }

    belongs(vect) {
        return false;
    }

    getCenterVect() {
        return new ArnavVect(0, 0);
    }

    getBoundingRect() {
        return new ArnavRect(new ArnavVect(0, 0), new ArnavVect(0, 0));
    }

    debugAssemble() {
        return this.getPosition().debugAssemble();
    }
}


class ArnavRect extends ArnavRegion {

    constructor(diagEnd1=null, diagEnd2=null, id=undefined) {
        super(id);
        this.nail1 = diagEnd1;
        this.nail2 = diagEnd2;
    }

    setParams(params) {
        this.nail1 = params.diagEnd1;
        this.nail2 = params.diagEnd2;
        return this;
    }

    setLeft(left) {
        
        if(this.nail1.x < this.nail2.x)
            this.nail1.x = left;
        else
            this.nail2.x = left;

        return this;
    }

    getLeft() {
        return Math.min(this.nail1.x, this.nail2.x);
    }

    setTop(top) {
        
        if(this.nail1.y < this.nail2.y)
            this.nail1.y = top;
        else
            this.nail2.y = top;

        return this;
    }

    getTop() {
        return Math.min(this.nail1.y, this.nail2.y);
    }

    setWidth(width) {

        if(this.nail1.x < this.nail2.x)
            this.nail2.x = nail1.x + width;
        else
            this.nail1.x = nail2.x + width;

        return this;
    }

    getWidth() {
        return Math.abs(this.nail1.x - this.nail2.x);
    }

    setHeight(height) {

        if(this.nail1.y < this.nail2.y)
            this.nail2.y = nail1.y + height;
        else
            this.nail1.y = nail2.y + height;

        return this;
    }

    getHeight() {
        return Math.abs(this.nail1.y - this.nail2.y);
    }

    getRight() {
        return this.getLeft() + this.getWidth();
    }

    getBottom() {
        return this.getTop() + this.getHeight();
    }

    getDirections() {
        return ["top", "bottom", "left", "right", "left_top", "left_bottom", "right_top", "right_bottom"];
    }

    belongs(v) {
        return this.between(this.nail1.x, v.x, this.nail2.x) && this.between(this.nail1.y, v.y, this.nail2.y);
    }

    setPosition(vect) {
        this.setLeft(vect.x).setTop(vect.y);
        return this;
    }

    getPosition() {
        return new ArnavVect(this.getLeft(), this.getTop());
    }

    getCenterVect() {
        const centerX = (this.nail1.x + this.nail2.x)/2;
        const centerY = (this.nail1.y + this.nail2.y)/2;
        return new ArnavVect(centerX, centerY);
    }

    getBoundingRect() {
        return this;
    }

    debugAssemble() {
        const rect = document.createElement("div");
        ArnavDOMUtils.setRect(rect, this.getLeft(), this.getTop(), this.getWidth(), this.getHeight());
        return rect;
    }
}


class ArnavCircle extends ArnavRegion {

    constructor(center=null, r=undefined, id=undefined) {
        super(id);
        this.center = center;
        this.r = r;
    }

    setParams(params) {
        this.center = params.center;
        this.r = params.r;
        return this;
    }

    belongs(vect) {
        return this.distance(this.center, vect) <= this.r;
    }

    getBoundingRect() {
        const nail1 = new ArnavVect(this.center.x - this.r, this.center.y - this.r);
        const nail2 = new ArnavVect(this.center.x + this.r, this.center.y + this.r);
        return new ArnavRect(nail1, nail2);
    }

    setPosition(vect) {
        this.center = vect;
        return this;
    }

    getPosition() {
        return this.center;
    }

    getCenterVect() {
        return this.center;
    }

    move(deltaVect) {
        this.setPosition(this.getPosition().add(deltaVect));
        return this;
    }

    debugAssemble() {
        
        const circle = document.createElement("div");

        const br = this.getBoundingRect();
        
        ArnavDOMUtils.setRect(circle, br.getLeft(), br.getTop(), br.getWidth(), br.getHeight());
        ArnavDOMUtils.setBorderRadius(circle, this.r);
        
        return circle;
    }
}


class ArnavPeriphery extends ArnavRegion {

    constructor(inner=null, outer=null, id=undefined) {
        super(id);
        this.inner = inner;
        this.outer = outer;
    }

    setParams(params) {
        this.outer = params.outer;
        this.inner = params.inner; 
        return this;
    }

    alignToInnerCenter() {
        this.outer.move(this.outer.getCenterVect().sub(this.inner.getCenterVect()));
        return this;
    }

    belongs(vect) {
        return this.outer.belongs(vect) && !this.inner.belongs(vect);
    }
}


class ArnavFramePeriphery extends ArnavPeriphery {

    constructor(innerRect=null, peripheryWidth=undefined, id=undefined) {
        super(id);
        this.setParams({"innerRect": innerRect, "peripheryWidth": peripheryWidth});
    }

    encloseInnerRect(innerRect, peripheryWidth) {

        const innerLeftTop = new ArnavVect(innerRect.getLeft(), innerRect.getTop());
        const innerRightBottom = new ArnavVect(innerRect.getRight(), innerRect.getBottom()); 
        this.inner = new ArnavRect(innerLeftTop, innerRightBottom);

        const outerLeft = innerRect.getLeft() - peripheryWidth;
        const outerTop = innerRect.getTop() - peripheryWidth;
        const outerRight = innerRect.getRight() + peripheryWidth;
        const outerBottom  = innerRect.getBottom() + peripheryWidth;
        const outerLeftTop = new ArnavVect(outerLeft, outerTop);
        const outerRightBottom = new ArnavVect(outerRight, outerBottom);
        this.outer = new ArnavRect(outerLeftTop, outerRightBottom);

        return this;
    }

    setParams(params) {
        return this.encloseInnerRect(params.innerRect, params.peripheryWidth);
    }
}


class ArnavWasherPeriphery extends ArnavPeriphery {

    constructor(innerRect=null, diagRatio=undefined, id=undefined) {
        super(id);
        this.setParams({"innerRect": innerRect, "diagRatio": diagRatio});
    }

    encloseInnerRect(innerRect, diagRatio) {

        const innerLeftTop = new ArnavVect(innerRect.getLeft(), innerRect.getTop());
        const innerRightBottom = new ArnavVect(innerRect.getRight(), innerRect.getBottom()); 
        this.inner = new ArnavRect(innerLeftTop, innerRightBottom);

        const longSide = Math.max(inner.getWidth(), this.inner.getHeight());
        const r = diagRatio*longSide*0.7071067811865475;
        this.outer = new ArnavCircle(this.inner.getCenterVect(), r);

        return this;
    }

    setParams(params) {
        return this.encloseInnerRect(params.innerRect, params.diagRatio);
    }
}


class ArnavPlotPlan extends ArnavRoot {

    constructor(id=undefined) {
        super(id);
        this.zones = {};
        this.masterZone = null;
    }

    getWidth() {
        return this.masterZone.shape.getWidth();
    }

    addZone(shape, ...tags) {
        
        const zone = {"shape": shape, "tags": new ArnavTags(...tags)};

        this.zones[shape.getId()] = zone;
        
        if(!this.masterZone)
            this.masterZone = zone;

        return this;
    }

    setMasterZone(id) {
        this.masterZone = this.zones[id];
        return this;
    }

    addMasterZone(shape) {
        this.addZone(shape).setMasterZone(shape.getId());
        return this;
    }

    addHeaderZone(height) {
        this.addZone(
            new ArnavRect(
                new ArnavVect(0, 0), 
                new ArnavVect(this.getWidth(), height)), "header");
        
        return this;
    }

    addHedgeZone(cornerLength, borderWidth, clientRect) {

        const c = cornerLength;
        const b = borderWidth;

        const ltx = clientRect.getLeft() + b/2;  
        const lty = clientRect.getTop() + b/2;
        const lbx = clientRect.getLeft() + b/2;
        const lby = clientRect.getBottom() - b/2;
        const rtx = clientRect.getRight() - b/2; 
        const rty = clientRect.getTop() + b/2;
        const rbx = clientRect.getRight() - b/2;
        const rby = clientRect.getBottom() - b/2;

        const top = new ArnavRect(new ArnavVect(ltx+c, lty-b), new ArnavVect(rtx-c, rty+0));
        const bottom = new ArnavRect(new ArnavVect(lbx+c, lby), new ArnavVect(rbx-c, rby+b));
        const left = new ArnavRect(new ArnavVect(ltx-b, lty+c), new ArnavVect(ltx+0, lby-c));
        const right = new ArnavRect(new ArnavVect(rtx, rty+c), new ArnavVect(rbx+b, rby-c));

        this.addZone(top, "hedge", "top")
            .addZone(bottom, "hedge", "bottom")
            .addZone(left, "hedge", "left")
            .addZone(right, "hedge", "right");
        
        if(c > 0) {
            
            const left_top_horz = new ArnavRect(new ArnavVect(ltx-b, lty-b), new ArnavVect(ltx+c, lty));
            const left_top_vert = new ArnavRect(new ArnavVect(ltx-b, lty-b), new ArnavVect(ltx, lty+c));
            const right_top_horz = new ArnavRect(new ArnavVect(rtx+b, rty-b), new ArnavVect(ltx+c, rty));
            const right_top_vert = new ArnavRect(new ArnavVect(rtx+b, rty-b), new ArnavVect(rtx, rty+c));
            const left_bottom_horz = new ArnavRect(new ArnavVect(lbx-b, lby+b), new ArnavVect(lbx+c, lby));
            const left_bottom_vert = new ArnavRect(new ArnavVect(ltx-b, lby+b), new ArnavVect(ltx, rty-c));
            const right_bottom_horz = new ArnavRect(new ArnavVect(rtx+b, rby+b), new ArnavVect(rtx-c, rby));
            const right_bottom_vert = new ArnavRect(new ArnavVect(rtx+b, rby+b), new ArnavVect(rtx, rby-c));
    
            this.addZone(left_top_horz, "hedge", "left_top")
                .addZone(left_top_vert, "hedge", "left_top")
                .addZone(right_top_horz, "hedge", "right_top")
                .addZone(right_top_vert, "hedge", "right_top")
                .addZone(left_bottom_horz, "hedge", "left_bottom")
                .addZone(left_bottom_vert, "hedge", "left_bottom")
                .addZone(right_bottom_horz, "hedge", "right_bottom")
                .addZone(right_bottom_vert, "hedge", "right_bottom")
        }

        return this;
    }

    addFramePeripheryZone(hedgeWidth, peripheryWidth, clientRect) {

        const innerLeft = clientRect.getLeft() - hedgeWidth/2 - peripheryWidth;
        const innerTop = clientRect.getTop() - hedgeWidth/2 - peripheryWidth;
        const innerRight = clientRect.getRight() + hedgeWidth/2 + peripheryWidth;
        const innerBottom = clientRect.getBottom() + hedgeWidth/2 + peripheryWidth;
        const innerRect = new ArnavRect(new ArnavVect(innerLeft, innerTop), new ArnavVect(innerRight, innerBottom));

        const framePeriphery = new ArnavFramePeriphery(innerRect, peripheryWidth);
        console.log(framePeriphery);

        this.fp = framePeriphery;

        return this.addZone(framePeriphery, "periphery");
    }

    getZoneTags(vect) {
        
        let zoneTags = new ArnavTags();
    
        for(const zoneId in this.zones) {
            const zone = this.zones[zoneId];
            if(zone.shape.belongs(vect)) 
                zoneTags.mergeTags(zone.tags);
        }

        return zoneTags;
    }

    getDirections() {
        return !!this.masterZone ? this.masterZone.shape.getDirections() : [];
    }

    debugDisplay(containerElement) {
        for(const zoneId in this.zones)
            if(this.zones[zoneId].tags.list().length > 0)
                this.zones[zoneId].shape.debugDisplay(containerElement);
    }
}
