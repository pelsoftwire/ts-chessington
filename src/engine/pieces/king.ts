import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        var currentPosition : Square = board.findPiece(this);
        var availableMoves : Square[] = [];

        var cardinals: [number, number][] = [[1, 1], [1, -1], [-1, -1], [-1, 1], [1, 0], [0, 1], [-1, 0], [0, -1]];

        for (const [xp, yp]  of cardinals) {
            var x = currentPosition.row + xp;
            var y = currentPosition.col + yp;
            if (0 <= x && x < gameSettings.BOARD_SIZE && 0 <= y && y < gameSettings.BOARD_SIZE) {
                var toMove : Square = new Square(x, y);
                var pieceAtSquare : Piece | undefined = board.whatsAt(toMove)

                // allow movement if space is empty, or if space contains an enemy piece that is NOT the king (taking a piece)
                if (pieceAtSquare == undefined || (pieceAtSquare.player != this.player && ! (pieceAtSquare instanceof King))) {
                    availableMoves.push(new Square(x, y));
                }
            }
        }

        return availableMoves;
    }
}
