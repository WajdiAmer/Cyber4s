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

  getPossibleMoves() {
    let relativeMoves;
    if (this.type === PAWN) {
      relativeMoves = this.getPawnRelativeMoves();
    } else if (this.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves();
    } else if (this.type === KNIGHT) {
      relativeMoves = this.getKnightRelativeMoves();
    } else if (this.type === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves();
    } else if (this.type === KING) {
      relativeMoves = this.getKingRelativeMoves();
    } else if (this.type === QUEEN) {
      relativeMoves = this.getQueenRelativeMoves();
    } else {
      console.log("Error: Unknown type", this.type)
    }

    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
    }

    let filteredMoves = [];
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }

  getPawnRelativeMoves() {
      if (this.team === WHITE_TEAM) {
        return [[1, 0]];
      } else if (this.team === BLACK_TEAM) {
        return [[-1, 0]];
      } else {
        console.log("Error: Unknown team - ", this.team);
      }
}

  getRookRelativeMoves() {
    let rookResult = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      rookResult.push([i, 0]);
      rookResult.push([-i, 0]);
      rookResult.push([0, i]);
      rookResult.push([0, -i]);
  }
  return rookResult;
  }

  getKnightRelativeMoves() {
    let knightResult = [];
    knightResult.push([1,2], [2, 1], [1,-2], [2, -1], [-1,2], [-2, 1], [-1,-2], [-2, -1]); 
    return knightResult;
  }

  getBishopRelativeMoves() {
    let bishopResult = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      bishopResult.push([i, i]);
      bishopResult.push([i, -i]);
      bishopResult.push([-i, i]);
      bishopResult.push([-i, -i]);
  }
    return bishopResult;
  }

  getKingRelativeMoves() {
    let kingResult = [];
    kingResult.push([-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]); // can be done also by two loops and a condition (to exclude [0,0])
    return kingResult;
  }

  getQueenRelativeMoves() {         // The Queen moves like The Rook and The Bishop combined so we get their movements and add them into The Queen movements
    let queenResult = [];
    let bishopResults = this.getBishopRelativeMoves();
    let rookResults = this.getRookRelativeMoves();
    
    queenResult = bishopResults;           // Adding the Bishop movements first
    for (let rookResult of rookResults) {  // Then adding the Rook movements like this in order to add them as array values and not as random numbers
      queenResult.push(rookResult);
    }

    return queenResult;
  }
}


class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
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
    let possibleMoves = piece.getPossibleMoves();
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
