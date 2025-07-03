import Square from "../square";
import Board from "../board";
import gameSettings from "../gameSettings";
import Piece from "./piece";

export default function slidingMovement(board: Board, cardinals: [number, number][], piece: Piece): Square[] {

    var availableMoves : Square[] = [];
    var currentSquare : Square = board.findPiece(piece);

    for (const [xp, yp] of cardinals) {
        var x = currentSquare.row + xp;
        var y = currentSquare.col + yp;
        while (0 <= x && x < gameSettings.BOARD_SIZE && 0 <= y && y < gameSettings.BOARD_SIZE) {
            availableMoves.push(new Square(x, y));
            x += xp;
            y += yp;
        }
    }

    return availableMoves;
}
