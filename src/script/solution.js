import Solver from "./class/solver"

export default function solvePuzzle(pieces) {
    return (new Solver(pieces)).getSolution()
}
