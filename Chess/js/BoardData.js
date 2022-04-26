class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
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