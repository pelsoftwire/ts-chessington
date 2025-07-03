import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        var currentSquare : Square = board.findPiece(this);
        if (this.player == Player.WHITE) {
            currentSquare.row = currentSquare.row + 1;
        } else {
            currentSquare.row = currentSquare.row - 1;
        }
        return [currentSquare];
    }
}
