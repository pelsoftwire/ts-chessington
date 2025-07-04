import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;
    private hasMoved: boolean;
    public numberMoves: number;

    public constructor(player: Player) {
        this.player = player;
        this.hasMoved = false;
        this.numberMoves = 0;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.hasMoved = true;
        this.numberMoves += 1;
    }

    public hasPieceMoved() {
        return this.hasMoved;
    }
}
