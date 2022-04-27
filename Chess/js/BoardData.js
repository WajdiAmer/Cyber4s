class BoardData {
  constructor() {
    this.pieces = this.getInitialBoard();
  }

  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
  }

  getInitialBoard() {
    let result = [];
  
    addPieces(result, 0, WHITE_TEAM);
    addPieces(result, 7, BLACK_TEAM);
  
    for (let i = 0 ; i < BOARD_SIZE ; i++) {
      result.push(new Piece(1, i, PAWN, WHITE_TEAM));
      result.push(new Piece(6, i, PAWN, BLACK_TEAM));
    }
  
    return result;
  }

  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  isPlayer(row, col, team) {
    const piece = this.getPiece(row, col);
    return piece !== undefined && piece.team === team;
  }
  
  removePiece(row, col) {
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i];
      if (piece.row === row && piece.col === col) {
        this.pieces.splice(i, 1);
      }
    }
  }

  // addHover(row, col) {
  //   const piece = this.getPiece(row, col);
  //   if (piece !== this.isEmpty) {
  //   piece.classList.add('piece:hover');
  //   } 
  // }
}