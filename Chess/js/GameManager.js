class GameManager {
    constructor(firstTeam) {
        this.boardData = new BoardData();
        this.currentTeam = firstTeam;
    }

    tryMove(piece, row, col) {
        const possibleMoves = this.getPossibleMoves(piece);
        for (const possibleMove of possibleMoves) {
            if (possibleMove[0] === row && possibleMove[1] === col) {
                this.boardData.removePiece(row, col);
                piece.row = row;
                piece.col = col;
                this.currentTeam = piece.opponent;
                return true;
            }
        }
        return false;
    }

    getPossibleMoves(piece) {
        if (this.currentTeam !== piece.team) {
            return [];
        }
        return piece.getPossibleMoves(this.boardData);
    }
}