import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];
    private lastMoved : Piece | undefined;

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
        this.lastMoved= undefined;
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public isAttacked(squareToCheck:Square, attackingPlayer:Player):boolean {
        for(var i=0; i<this.board.length; i++){
            for(var j = 0; j < this.board.length; j++) {
                var piece = this.getPiece(Square.at(i,j));
                if(piece === undefined) {
                    continue;
                }
                if (piece.player == attackingPlayer) {
                    if (piece.getAvailableMoves(this).includes(squareToCheck)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }


    public getLastMoved(): Piece | undefined {
        return this.lastMoved;
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
            this.lastMoved = movingPiece;
        }
    }

    public whatsAt(square: Square) {
        return this.board[square.row][square.col];
    }

    public squareInBounds(square: Square) {
        return square.row >= 0 && square.row < this.board.length && square.col >= 0 && square.col < this.board.length;
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }
}
