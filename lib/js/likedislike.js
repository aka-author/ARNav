/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:    likedilike.js                              (\(\
 Func:		Suggesting a user to like/dislike a topic  (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavLikeDislike extends ArnavControl {

    constructor(chief, id) {
        super(chief, id);
    }

    getFigureImgs() {
        return this.figureImgs;
    }

    likeDislike() {
        console.log("like dislike");
    }

}