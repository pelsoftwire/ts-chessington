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
        var toMove : Square = new Square(x, y);
        while (0 <= x && x < gameSettings.BOARD_SIZE && 0 <= y && y < gameSettings.BOARD_SIZE && board.whatsAt(toMove) == undefined) {
            availableMoves.push(toMove);
            x += xp;
            y += yp;
            toMove = new Square(x, y);

            // TODO: Figure out why this doesnt work
            //toMove.row += xp;
            //toMove.col += yp;
        }
    }

    return availableMoves;
}
