import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";
import King from "./king";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    // Override
    public moveTo(board : Board, newSquare : Square) {
        // check if the move is en passant : it is known that the move is valid at this point, so its sufficient to check:
            // (1) whether move is diagonally infront of current square
            // (2) whether square being moved to is empty
        var currentSquare = board.findPiece(this);
        var colDiff = currentSquare.col - newSquare.col;

        if (Math.abs(colDiff) == 1 && board.whatsAt(newSquare) == undefined) {
            board.setPiece(Square.at(currentSquare.row, newSquare.col), undefined);
        }

        // if not, just call super
        super.moveTo(board, newSquare);
    }

    public getAvailableMoves(board: Board) {
        var availableMoves : Square[] = [];

        var currentSquare : Square = board.findPiece(this);

        var direction = this.player == Player.WHITE ? 1 : -1;

        var inFrontY = currentSquare.row + direction;
        var twoInFrontY = currentSquare.row + direction * 2;

        var inFront : Square = new Square(inFrontY, currentSquare.col)
        var twoInFront : Square = new Square(twoInFrontY, currentSquare.col);

        // pawns may move forward once if there is nothing blocking
        // pawns may move forward twice if there is nothing blocking, and they have not moved this game
        if (inFrontY >= 0 && inFrontY < gameSettings.BOARD_SIZE && board.whatsAt(inFront) == undefined) {
            availableMoves.push(inFront);
            if (!this.hasPieceMoved() && twoInFrontY >= 0 && twoInFrontY < gameSettings.BOARD_SIZE && board.whatsAt(twoInFront) == undefined) {
                availableMoves.push(twoInFront);
            }
        }

        var diagonals : Square[] = [new Square(inFront.row, inFront.col + 1), new Square(inFront.row, inFront.col - 1)];
        diagonals.forEach(toMove => {
            if (board.squareInBounds(toMove)) {
                var pieceAt = board.whatsAt(toMove);
                if (pieceAt != undefined && pieceAt.player != this.player && ! (pieceAt instanceof King)) {
                    availableMoves.push(toMove);
                }
            }
        })

        // en passant
        // if there is an opposing pawn adjacent AND we're in the correct rank (map player enum to rank) AND opposing pawn has moved once
        var enPassantRank = this.player == Player.WHITE ? 4 : 3;
        var enPassantDirection = this.player == Player.WHITE ? 1 : -1;
        for (var x of [1, -1]) {
            var squareToAttack = new Square(currentSquare.row, currentSquare.col + x);
            var pieceToAttack = board.whatsAt(squareToAttack);
            if (currentSquare.row == enPassantRank && pieceToAttack instanceof Pawn && pieceToAttack.player != this.player && pieceToAttack.numberMoves == 1 && board.getLastMoved() == pieceToAttack) {
                var enPassantSquare = new Square (squareToAttack.row + enPassantDirection, squareToAttack.col);
                if (board.whatsAt(enPassantSquare) == undefined) {
                    availableMoves.push(enPassantSquare);
                }
            }
        }

        return availableMoves;
    }
}
