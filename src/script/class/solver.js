import Piece from "./piece"

export default class Solver {

    constructor(pieces) {
        this.pieces = pieces.map(item => new Piece(item))
        this.solved = []
    }

    solve(){
        while(this.pieces[0].edges.top || this.pieces[0].edges.left){
            this.pieces[0].rotate()
        }

        this.solved.push(this.pieces.shift())

        while(this.pieces.length > 0){
            let lastPiece
            let searchSide

            if(this.solved.length % 10 === 0){
                lastPiece = this.solved[this.solved.length - 10]
                searchSide = "bottom"
            } else {
                lastPiece = this.solved[this.solved.length - 1]
                searchSide = "right"
            }

            let found = false

            this.pieces.forEach((piece, index) => {
                if(lastPiece.isNearby(searchSide, piece)){
                    const otherSide = searchSide == "right" ? "left" : "top"

                    while(lastPiece.edges[searchSide].edgeTypeId !== piece.edges[otherSide]?.edgeTypeId){
                        piece.rotate()
                    }

                    this.solved.push(piece)
                    this.pieces.splice(index, 1)

                    found = true
                    return false
                }
            })

            if(!found){
                throw new Error("forever loop detected, break")
                break
            }
        }

        return this
    }

    getSolution(){
        return this.solve().solved.map(item => item.id)
    }

}
