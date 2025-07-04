import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";
import Rook from "./rook";

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

        var castlingCardinal: number[] = [-1,1]
        for(const dir of castlingCardinal) {
            var i = currentPosition.col + dir;
            var obstructedCastle = false;
            var inCheck = false;
            while(0< i && i< 7) {
                if(board.getPiece(Square.at(currentPosition.row, i))!==undefined){
                    obstructedCastle = true;
                    break;
                }
                if(Math.abs(i-currentPosition.col) <=2 && board.isAttacked(Square.at(currentPosition.row, i), this.player==Player.WHITE ? Player.BLACK : Player.WHITE)) {
                    // TODO fix available move override. Fix type.
                    inCheck = true;
                }
                i+= dir;
            }
            var cornerPiece:Piece|undefined = board.getPiece(Square.at(currentPosition.row, i));
            if(cornerPiece instanceof Rook && !obstructedCastle && !inCheck && this.numberMoves==0 && cornerPiece.numberMoves == 0) {
                availableMoves.push(Square.at(currentPosition.row, currentPosition.col+2*dir));
            }
        }

        return availableMoves;
    }
}
