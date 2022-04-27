class Piece {
  constructor(row, col, type, team) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.team = team;
    this.opponent = this.getOpponent();
  }

  getOpponent() {
    if(this.team === WHITE_TEAM) {
      return BLACK_TEAM;
    }
    return WHITE_TEAM;
  }

  getPossibleMoves(boardData) {
    let moves;
    if (this.type === PAWN) {
      moves = this.getPawnMoves(boardData);
    } else if (this.type === ROOK) {
      moves = this.getRookMoves(boardData);
    } else if (this.type === KNIGHT) {
      moves = this.getKnightMoves(boardData);
    } else if (this.type === BISHOP) {
      moves = this.getBishopMoves(boardData);
    } else if (this.type === KING) {
      moves = this.getKingMoves(boardData);
    } else if (this.type === QUEEN) {
      moves = this.getQueenMoves(boardData);
    } else {
      console.log("Error: Unknown type", this.type);
    }

    let filteredMoves = [];
    for (let absoluteMove of moves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }

  getPawnMoves(boardData) {
    let result = [];
    let direction;
      if (this.team === BLACK_TEAM) {
        direction = -1;
      } else if (this.team === WHITE_TEAM) {
        direction = 1;
      } else {
        console.log("Error: Unknown team - ", this.team);
      }

      let nextMove = [this.row + direction, this.col];
      if (boardData.isEmpty(nextMove[0], nextMove[1])) {
        result.push(nextMove);
      }

      nextMove = [this.row + direction, this.col + direction];
      if (boardData.isPlayer(nextMove[0], nextMove[1], this.getOpponent())) {
        result.push(nextMove);
      }

      nextMove = [this.row + direction, this.col - direction];
      if (boardData.isPlayer(nextMove[0], nextMove[1], this.getOpponent())) {
        result.push(nextMove);
      }

      return result;
}


  
getMovesInDirection(directionRow, directionCol, boardData) {
  let result = [];

  for (let i = 1; i < BOARD_SIZE; i++) {
    let row = this.row + directionRow * i;
    let col = this.col + directionCol * i;
    if (boardData.isEmpty(row, col)) {
      result.push([row, col]);
    } else if (boardData.isPlayer(row, col, this.getOpponent())) {
      result.push([row, col]);
      return result;
    } else if (boardData.isPlayer(row, col, this.team)) {
      return result;
    }
  }
  return result;
  }

  getRookMoves(boardData) {
    let rookResult = [];
    rookResult = rookResult.concat(this.getMovesInDirection(-1, 0, boardData));
    rookResult = rookResult.concat(this.getMovesInDirection(1, 0, boardData));
    rookResult = rookResult.concat(this.getMovesInDirection(0, -1, boardData));
    rookResult = rookResult.concat(this.getMovesInDirection(0, 1, boardData));
    return rookResult;
  }

  
  getBishopMoves(boardData) {
    let bishopResult = [];
    bishopResult = bishopResult.concat(this.getMovesInDirection(1, 1, boardData));
    bishopResult = bishopResult.concat(this.getMovesInDirection(1, -1, boardData));
    bishopResult = bishopResult.concat(this.getMovesInDirection(-1, 1, boardData));
    bishopResult = bishopResult.concat(this.getMovesInDirection(-1, -1, boardData));
    return bishopResult;
  }


  getKnightMoves() {
    let knightResult = [];

    const relativeMoves = [[1,2], [2, 1], [1,-2], [2, -1], [-1,2], [-2, 1], [-1,-2], [-2, -1]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!gameManager.boardData.isPlayer(row, col, this.team)) {
        knightResult.push([row, col]);
      }
    }
    return knightResult;
  }


  getKingMoves() {
    let kingResult = [];

    const relativeMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!gameManager.boardData.isPlayer(row, col, this.team)) {
        kingResult.push([row, col]);
      }
    }
    return kingResult;
  }


  getQueenMoves(boardData) {         // The Queen moves like The Rook and The Bishop combined so we get their movements and add them into The Queen movements
    let queenResult = [];
    queenResult = this.getBishopMoves(boardData);
    queenResult = queenResult.concat(this.getRookMoves(boardData));
    return queenResult;
  }
}