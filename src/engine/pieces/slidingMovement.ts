import Square from "../square";
import Board from "../board";
import gameSettings from "../gameSettings";
import Piece from "./piece";
import King from "./king";

export default function slidingMovement(board: Board, cardinals: [number, number][], piece: Piece): Square[] {

    var availableMoves : Square[] = [];
    var currentSquare : Square = board.findPiece(piece);

    for (const [xp, yp] of cardinals) {
        var x = currentSquare.row + xp;
        var y = currentSquare.col + yp;
        var toMove : Square = new Square(x, y);
        while (0 <= x && x < gameSettings.BOARD_SIZE && 0 <= y && y < gameSettings.BOARD_SIZE) {
            var pieceAtSquare : Piece | undefined  = board.whatsAt(toMove);

            // allow movement to empty spaces, or movement to spaces that contain an enemy piece that is NOT a king
            // if a space contains a piece, stop "sliding" in that direction after affirming whether that space can be moved to (cant move past pieces)
            if (pieceAtSquare == undefined) {
                availableMoves.push(toMove);
                x += xp;
                y += yp;
                toMove = new Square(x, y);
            } else if (pieceAtSquare.player != piece.player && ! (pieceAtSquare instanceof King)) {
                availableMoves.push(toMove);
                x += xp;
                y += yp;
                toMove = new Square(x, y);
                break;
            } else {
                break;
            }

            // TODO: Figure out why this doesnt work
            //toMove.row += xp;
            //toMove.col += yp;
        }
    }

    return availableMoves;
}
