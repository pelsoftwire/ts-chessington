import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        var availableMoves : Square[] = [];

        var currentSquare : Square = board.findPiece(this);
        if (this.player == Player.WHITE) {
            availableMoves.push(new Square(currentSquare.row + 1, currentSquare.col));
            if (!this.hasPieceMoved()) {
                availableMoves.push(new Square(currentSquare.row + 2, currentSquare.col));
            }
        } else {
            availableMoves.push(new Square(currentSquare.row - 1, currentSquare.col));
            if (!this.hasPieceMoved()) {
                availableMoves.push(new Square(currentSquare.row - 2, currentSquare.col));
            }
        }
        return availableMoves;
    }
}
