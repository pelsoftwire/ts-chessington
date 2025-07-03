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

        var cardinals : [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];

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
}
