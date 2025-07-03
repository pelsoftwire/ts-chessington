import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import gameSettings from "../gameSettings";
import slidingMovement from "./slidingMovement";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        var cardinals : [number, number][] = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

        return slidingMovement(board, cardinals, this);
    }
}
