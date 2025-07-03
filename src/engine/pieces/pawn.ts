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

        var direction = this.player == Player.WHITE ? 1 : -1;

        var inFront : Square = new Square(currentSquare.row + direction, currentSquare.col)
        var twoInFront : Square = new Square(currentSquare.row + direction * 2, currentSquare.col);

        if (board.whatsAt(inFront) == undefined) {
            availableMoves.push(inFront);
            if (!this.hasPieceMoved() && board.whatsAt(twoInFront) == undefined) {
                availableMoves.push(twoInFront);
            }
        }

        return availableMoves;
    }
}
