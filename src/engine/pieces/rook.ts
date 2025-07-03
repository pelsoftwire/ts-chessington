import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import gameSettings from "../gameSettings";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        var availableMoves : Square[] = [];
        var currentSquare : Square = board.findPiece(this);

        for (var i = currentSquare.row + 1; i < gameSettings.BOARD_SIZE; ++i) {
            availableMoves.push(new Square(i, currentSquare.col));
        }
        for (var i = currentSquare.row - 1; i >= 0; --i) {
            availableMoves.push(new Square(i, currentSquare.col));
        }
        for (var i = currentSquare.col + 1; i < gameSettings.BOARD_SIZE; ++i) {
            availableMoves.push(new Square(currentSquare.row, i));
        }
        for (var i = currentSquare.col - 1; i >= 0; --i) {
            availableMoves.push(new Square(currentSquare.row, i));
        }

        return availableMoves;
    }
}
