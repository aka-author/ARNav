/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:    tree.js                                (\(\
 Func:		Implementing hierarchical models       (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavTreeModelLoader extends ArnavBureaucrat {

    extractNestedSrcNodes(src, currSrcNode) {
        return currSrcNode.nodes;
    }

    setModelNodeFields(src, srcNode) {


    }

    createModelNode(src, srcNode) {
        return new ArnavTree(this);
    }

    loadFromObject(src, currSrcNode=null) {

        let actualCurrSrcNode = currSrcNode || src;

        this.setModelNodeFields(src, actualCurrSrcNode);

        let nestedSrcNodes = this.extractNestedSrcNodes(src, actualCurrSrcNode);

        for(let nestedSrcNode of nestedSrcNodes) 
            this.addWorker(this.createModelNode(src, nestedSrcNode).loadFromObject(src, nestedSrcNode));

        return this;
    }

}

