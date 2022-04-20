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

let pieces = [];
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
      // TODO: Get moves
    } else if (this.type === BISHOP) {
      // TODO: Get moves
    } else if (this.type === KING) {
      // TODO: Get moves
    } else if (this.type === QUEEN) {
      // TODO: Get moves
    } else {
      console.log("Unknown type", type)
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
      // TODO: Give different answer to black player
      return [[1, 0]];
}

  getRookRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
  }
  return result;
  }
}

                //BOARD DATA TASK..
// class BoardData {
//   constructor(pieces) {
//     this.pieces = pieces;
//   }

//   // Returns piece in row, col, or undefined if not exists.
//   getPiece(row, col) {

//   }
// }


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
  
  for (let piece of pieces) {
    if (piece.row === row && piece.col === col) {
      let possibleMoves = piece.getPossibleMoves();
      for (let possibleMove of possibleMoves)
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
      // cell.id = "cell-" + row.toString() + "_" + col.toString();     // Get cell place by Piece Class instead
      if ((row + col) % 2 === 0) {
        cell.className = 'darkCell';
      } else {
        cell.className = 'lightCell';
      }
        cell.addEventListener('click', (e) => onCellClick(e, row, col));
    }
  }
  pieces = getInitialBoard();

  for(let piece of pieces) {
          // (     Cell Place by [row, col]       )
    addImage(table.rows[piece.row].cells[piece.col], piece.team, piece.type);
  }
}

createChessBoard();
