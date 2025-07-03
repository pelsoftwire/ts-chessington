import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        var availableMoves : Square[] = [];

        var currentSquare : Square = board.findPiece(this);

        var direction = this.player == Player.WHITE ? 1 : -1;

        var inFrontY = currentSquare.row + direction;
        var twoInFrontY = currentSquare.row + direction * 2;

        var inFront : Square = new Square(inFrontY, currentSquare.col)
        var twoInFront : Square = new Square(twoInFrontY, currentSquare.col);

        if (inFrontY >= 0 && inFrontY < gameSettings.BOARD_SIZE && board.whatsAt(inFront) == undefined) {
            availableMoves.push(inFront);
            if (!this.hasPieceMoved() && twoInFrontY >= 0 && twoInFrontY < gameSettings.BOARD_SIZE && board.whatsAt(twoInFront) == undefined) {
                availableMoves.push(twoInFront);
            }
        }

        return availableMoves;
    }
}
