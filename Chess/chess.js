
//TODO: - Learn more about JS Classes and understand them.
//      - King and Knight extract to function
//      - Hover mouse cursor pointer style just for cells with pieces


const BOARD_SIZE = 8;
const WHITE_TEAM = 'White';
const BLACK_TEAM = 'Black';
const PAWN = 'Pawn';
const ROOK = 'Rook';
const KNIGHT = 'Knight';
const BISHOP = 'Bishop';
const QUEEN = 'Queen';
const KING = 'King';

let selectedCell;
let table;
let boardData;

class Piece {
  constructor(row, col, type, team) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.team = team;
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

    // let absoluteMoves = [];
    // for (let relativeMove of relativeMoves) {
    //   const absoluteRow = this.row + relativeMove[0];
    //   const absoluteCol = this.col + relativeMove[1];
    //   absoluteMoves.push([absoluteRow, absoluteCol]);
    // }

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
      if (!boardData.isPlayer(row, col, this.team)) {
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
      if (!boardData.isPlayer(row, col, this.team)) {
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
}


function getInitialBoard() {
  let result = [];

  addPieces(result, 0, WHITE_TEAM);
  addPieces(result, 7, BLACK_TEAM);

  for (let i = 0 ; i < BOARD_SIZE ; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_TEAM));
    result.push(new Piece(6, i, PAWN, BLACK_TEAM));
  }

  return result;
}

function addPieces(result, row, team) {
  result.push(new Piece(row, 0, ROOK, team));
  result.push(new Piece(row, 7, ROOK, team));
  result.push(new Piece(row, 1, KNIGHT, team));
  result.push(new Piece(row, 6, KNIGHT, team));
  result.push(new Piece(row, 2, BISHOP, team));
  result.push(new Piece(row, 5, BISHOP, team));
  result.push(new Piece(row, 4, KING, team));
  result.push(new Piece(row, 3, QUEEN, team));
}

function addImage(cell, team, type) { 
  const image = document.createElement('img');
  image.src = './chessPieces/' + team + '/' + type + '.png';
  cell.appendChild(image);
}


function onCellClick(e, row, col) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possibleMovement');
    }
  }
  
  
  const piece = boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves(boardData);
    for (let possibleMove of possibleMoves) {
    table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possibleMovement');
    }
  }

  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selectedCell');
  }

  selectedCell = e.currentTarget;
  selectedCell.classList.add('selectedCell');
}


function createChessBoard() {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'containerDiv';
  document.body.appendChild(containerDiv);
  table = document.createElement('table');
  containerDiv.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();
      if ((row + col) % 2 === 0) {
        cell.className = 'darkCell';
      } else {
        cell.className = 'lightCell';
      }
        cell.addEventListener('click', (e) => onCellClick(e, row, col));
    }
  }
  boardData = new BoardData(getInitialBoard());

  for(let piece of boardData.pieces) {
          // (     Cell Place by [row, col]       )
    addImage(table.rows[piece.row].cells[piece.col], piece.team, piece.type);
  }
}

createChessBoard();
