export default class Piece {

    constructor(piece) {
        this.id = piece.id
        this.edges = piece.edges
    }

    rotate(){
        this.edges = {
            top: this.edges.right,
            right: this.edges.bottom,
            bottom: this.edges.left,
            left: this.edges.top,
        }

        return this
    }

    isNearby(side, piece){
        return this.edges[side] && Object.values(piece.edges)
            .map(i => i ? i.edgeTypeId : 0)
            .filter(i => i)
            .includes(this.edges[side].edgeTypeId)
    }

    isNearbyOld(side, piece){
        for(let key in piece.edges){
            if(
                this.edges[side] && piece.edges[key]
                && this.edges[side].edgeTypeId == piece.edges[key].edgeTypeId
            ){
                return true
            }
        }

        return false
    }

}