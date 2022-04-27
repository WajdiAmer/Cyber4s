class GameManager {
    constructor(firstTeam) {
        this.boardData = new BoardData();
        this.currentTeam = firstTeam;
        this.winner = undefined;
    }

    tryMove(piece, row, col) {
        const possibleMoves = this.getPossibleMoves(piece);
        for (const possibleMove of possibleMoves) {
            if (possibleMove[0] === row && possibleMove[1] === col) {
                const eatenPiece = this.boardData.removePiece(row, col);
                piece.row = row;
                piece.col = col;
                if (eatenPiece !== undefined && eatenPiece.type === KING) {
                    this.winner = piece.team;
                }
                this.currentTeam = piece.opponent;
                return true;
            }
        }
        return false;
    }

    getPossibleMoves(piece) {
        if (this.currentTeam !== piece.team || this.winner !== undefined) {
            return [];
        }
        return piece.getPossibleMoves(this.boardData);
    }
}