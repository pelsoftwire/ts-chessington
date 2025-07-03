import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        var currentPosition : Square = board.findPiece(this);
        var availableMoves : Square[] = [];

        var cardinals: [number, number][] = [[2, 1], [1, 2]];
        var masks: [number, number][] = [[1, 1], [1, -1], [-1, -1], [-1, 1]];

        for (const [xa, ya]  of cardinals) {
            for (const [dx, dy] of masks) {
                var x = currentPosition.row + xa * dx;
                var y = currentPosition.col + ya * dy;
                if (0 <= x && x < gameSettings.BOARD_SIZE && 0 <= y && y < gameSettings.BOARD_SIZE) {
                    availableMoves.push(new Square(x, y));
                }
            }
        }

        return availableMoves;

    }
}
