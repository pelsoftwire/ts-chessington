import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import gameSettings from "../gameSettings";
import slidingMovement from "./slidingMovement";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        var cardinals : [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        return slidingMovement(board, cardinals, this);
    }
}
