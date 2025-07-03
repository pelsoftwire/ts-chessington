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

        availableMoves.push(new Square(currentSquare.row + direction, currentSquare.col));
        if (!this.hasPieceMoved()) {
            availableMoves.push(new Square(currentSquare.row + direction * 2, currentSquare.col));
        }

        return availableMoves;
    }
}
