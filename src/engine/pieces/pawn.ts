import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";
import King from "./king";

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

        // pawns may move forward once if there is nothing blocking
        // pawns may move forward twice if there is nothing blocking, and they have not moved this game
        if (inFrontY >= 0 && inFrontY < gameSettings.BOARD_SIZE && board.whatsAt(inFront) == undefined) {
            availableMoves.push(inFront);
            if (!this.hasPieceMoved() && twoInFrontY >= 0 && twoInFrontY < gameSettings.BOARD_SIZE && board.whatsAt(twoInFront) == undefined) {
                availableMoves.push(twoInFront);
            }
        }

        var diagonals : Square[] = [new Square(inFront.row, inFront.col + 1), new Square(inFront.row, inFront.col - 1)];
        diagonals.forEach(toMove => {
            if (board.squareInBounds(toMove)) {
                var pieceAt = board.whatsAt(toMove);
                if (pieceAt != undefined && pieceAt.player != this.player && ! (pieceAt instanceof King)) {
                    availableMoves.push(toMove);
                }
            }
        })

        return availableMoves;
    }
}
