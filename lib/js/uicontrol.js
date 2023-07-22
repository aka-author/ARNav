// * * ** *** ***** ******** ************* *********************
// Product:     Arnav 
// Part:        Front-end JS library
// Module:      uicontrol.js                               (\(\
// Func:        Managing DOM controls that can be visible  (^.^)  
// * * ** *** ***** ******** ************* *********************

class ArnavUIControl extends ArnavDOMControl {

    constructor(chief, options=null, id=undefined) {

        super(chief, options, id);

        this.minWidth = 10;
        this.minHeight = 10;

        this.plotPlan = new ArnavPlotPlan();
    }

    show() {
		ArnavDOMUtils.show(this.getDOMObject());
		return this;
	}
	
	hide() {
		ArnavDOMUtils.hide(this.getDOMObject());
		return this;
	}

    setCursor(cursor) {
        ArnavDOMUtils.setCursor(this.getDOMObject(), cursor);
        return this;
    }

    setMinWidth(pxMinWidth) {
        this.minWidth = pxMinWidth;
        return this;
    }

    getMinWidth() {
        return this.minWidth;
    }

    setMinHeight(pxMinHeight) {
        this.minHeight = pxMinHeight;
        return this;
    }
    
    getMinHeight() {
        return this.minHeight;
    }

    getHeight() {
        return ArnavDOMUtils.getHeight(this.getDOMObject());
    }

    setHeight(pxHeight) {
        ArnavDOMUtils.setHeight(this.getDOMObject(), pxHeight);
        return this;
    }

    getWidth() {
        return ArnavDOMUtils.getWidth(this.getDOMObject());
    }

    setWidth(pxWidth) {
        ArnavDOMUtils.setWidth(this.getDOMObject(), pxWidth);
        return this;
    }

    getLeft() {
        return ArnavDOMUtils.getLeft(this.getDOMObject());  
    }

    setLeft(pxLeft) {
        ArnavDOMUtils.setLeft(this.getDOMObject(), pxLeft);
        return this;
    }

    getRight() {
        return ArnavDOMUtils.getRight(this.getDOMObject()); 
    }

    getTop() {
        return ArnavDOMUtils.getTop(this.getDOMObject());  
    }

    setTop(pxTop) {
        ArnavDOMUtils.setTop(this.getDOMObject(), pxTop);
        return this;
    }

    getBottom() {
        return ArnavDOMUtils.getBottom(this.getDOMObject()); 
    }

    setStart(pxStart) {
        ArnavDOMUtils.setStart(this.getDOMObject(), pxStart);
        return this;
    }

    getStart() {
        return ArnavDOMUtils.getStart(this.getDOMObject());
    }

    getStop() {
        return ArnavDOMUtils.getStop(this.getDOMObject());
    }

    getWidthWithBorders() {
        return ArnavDOMUtils.getWidthWithBorders(this.getDOMObject());
    }

    getBorderWidth() {
        return (this.getWidthWithBorders() - this.getWidth())/2;
    }

    getLeftBorderWidth() {
        return ArnavDOMUtils.getLeftBorderWidth(this.getDOMObject());
    }

    getRightBorderWidth() {
        return ArnavDOMUtils.getRightBorderWidth(this.getDOMObject());
    }

    getTopBorderWidth() {
        return ArnavDOMUtils.getTopBorderWidth(this.getDOMObject());
    }

    getBottomBorderWidth() {
        return ArnavDOMUtils.getBottomBorderWidth(this.getDOMObject());
    }

    getHeightWithBorders() {
        return ArnavDOMUtils.getHeightWithBorders(this.getDOMObject());
    }

    getWidthWithMargins() {
        return ArnavDOMUtils.getWidthWithMargins(this.getDOMObject());
    }

    getHeightWithMargins() {
        return ArnavDOMUtils.getHeightWithMargins(this.getDOMObject());
    }

    getLeftMarginWidth() {
        return ArnavDOMUtils.getLeftMarginWidth(this.getDOMObject());
    }

    getRightMarginWidth() {
        return ArnavDOMUtils.getRightMarginWidth(this.getDOMObject());
    }

    getTopMarginWidth() {
        return ArnavDOMUtils.getTopMarginWidth(this.getDOMObject());
    }

    getBottomMarginWidth() {
        return ArnavDOMUtils.getBottomMarginWidth(this.getDOMObject());
    }

    setPosition(vect) {
        return ArnavDOMUtils.isLTR() ?
                    this.setLeft(vect.x).setTop(vect.y) :
                    this.setLeft(vect.x - this.getWidth()).setTop(vect.y);
    }

    getInteriorRect() {

        const leftTopVect = new ArnavVect(this.getLeftBorderWidth(), this.getTopBorderWidth());
        const rightBottomVect = new ArnavVect(this.getWidth(), this.getHeight());

        return new ArnavRect(leftTopVect, rightBottomVect);
    }

    getLocalBoundingRect() {
        
        const leftTop = new ArnavVect(0, 0);
        
        const rightTopX = this.getWidth() + this.getRightBorderWidth();
        const rightTopY = this.getHeight() + this.getBottomBorderWidth();
        const rightBottom = new ArnavVect(rightTopX, rightTopY);
        
        return new ArnavRect(leftTop, rightBottom);
    }

    getBoundingRect() {
        
        const leftTop = new ArnavVect(this.getLeft(), this.getTop());
        
        const rightTopX = this.getLeft() + this.getWidth() + this.getRightBorderWidth();
        const rightTopY = this.getTop() + this.getHeight() + this.getBottomBorderWidth();
        const rightBottom = new ArnavVect(rightTopX, rightTopY);
        
        return new ArnavRect(leftTop, rightBottom);
    }

    getMarginalRect() {

        const left = this.getLeft() - this.getLeftMarginWidth();
        const right = this.getBoundingRect().getRight() + this.getRightMarginWidth();
        const top = this.getTop() - this.getTopMarginWidth();
        const bottom = this.getBoundingRect().getBottom() + this.getBottomMarginWidth();
        
        const leftTop = new ArnavVector(left, top);
        const rightBottom = new ArnavVect(right, bottom);

        return new ArnavRect(leftTop, rightBottom);
    }

    getOperationalRegion() {
        return this.getInteriorRect();
    }

    resizeToLeft(pxDelta) {

		const currLeft = this.getLeft();
		const currWidth = this.getWidth();
		const newLeft = currLeft + pxDelta;
		const newWidth = currWidth - pxDelta;

		this.setLeft(newLeft);
        this.setWidth(newWidth);

		return this;
	}

	resizeToRight(pxDelta) {

		const currWidth = this.getWidth();
		const newWidth = currWidth + pxDelta;

		ArnavDOMUtils.setWidth(this.getDOMObject(), newWidth);

		return this;
	}

    resizeToTop(pxDelta) {
        
		const currTop = this.getTop();
		const currHeight = this.getHeight();
		const newTop = currTop + pxDelta;
		const newHeight = currHeight - pxDelta;

		this.setTop(newTop);
        this.setHeight(newHeight);

		return this;
	}

    resizeToBottom(pxDelta) {

		const currHeight = this.getHeight();
		const newHeight = currHeight + pxDelta;
		this.setHeight(newHeight);

		return this;
	}

    resizeToLeftTop(pxDeltaX, pxDeltaY) {
        this.resizeToLeft(pxDeltaX);
        this.resizeToTop(pxDeltaY);
        return this;
    }
    
    resizeToLeftBottom(pxDeltaX, pxDeltaY) {
        this.resizeToLeft(pxDeltaX);
        this.resizeToBottom(pxDeltaY);
        return this;
    }

    resizeToRightTop(pxDeltaX, pxDeltaY) {
        this.resizeToRight(pxDeltaX);
        this.resizeToTop(pxDeltaY);
        return this;
    }

    resizeToRightBottom(pxDeltaX, pxDeltaY) {
        this.resizeToRight(pxDeltaX);
        this.resizeToBottom(pxDeltaY);
        return this;
    }

    resizeToStart(pxDelta) {
        return ArnavDOMUtils.isLTR() ? this.resizeToLeft(pxDelta) : this.resizeToRight(pxDelta);
    }

    resizeToStop(pxDelta) {
        return ArnavDOMUtils.isLTR() ? this.resizeToRight(pxDelta) : this.resizeToLeft(pxDelta);
    }

    move(pxDeltaX, pxDeltaY) {

        this.setLeft(this.getLeft() + pxDeltaX);
        this.setTop(this.getTop() + pxDeltaY);

        return this;
    }

    moveDir(pxDeltaX, pxDeltaY) {
        return this.movePhys(ArnavDOMUtils.isLTR() ? pxDeltaX : -pxDeltaX, pxDeltaY);
    }

    getLocalVect(domEvent) {
        return ArnavDOMUtils.getEventLocalVect(domEvent, this.getDOMObject());
    }

    addZone(shape, ...tags) {
        this.plotPlan.addZone(shape, ...tags);
        return this;
    }

    addMasterZone(shape=null) {
        const actualShape = !!shape ? shape : this.getLocalBoundingRect();
        this.plotPlan.addMasterZone(actualShape);
        return this;
    }

    addHeaderZone(shape) {
        this.addZone(shape, "header");
        return this;
    }

    addHedgeZone(cornerLength=0, borderWidth=undefined) {
        let actualBorderWidth = !!borderWidth ? borderWidth : this.getBorderWidth();
        this.plotPlan.addHedgeZone(cornerLength, actualBorderWidth, this.getLocalBoundingRect());
        return this;
    }

    getDirections() {
        return this.plotPlan.getDirections();
    }

    resetPlotPlan() {
        this.plotPlan.zones = {};
        this.masterZone = null;
    }

    buildPlotPlan() {
        
    }

    getZoneTags(localVect) {
        return this.plotPlan.getZoneTags(localVect);
    }

    bind() {
        super.bind();
        this.buildPlotPlan();
        return this;
    }

}
