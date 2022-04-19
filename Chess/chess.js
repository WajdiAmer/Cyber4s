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

function addImageByIndex(cell, team, index) {
  if (index === 0 || index === 7) {
    addImage(cell, team, ROOK);
  } else if (index === 1 || index === 6) {
    addImage(cell, team, KNIGHT);
  } else if (index === 2 || index === 5) {
    addImage(cell, team, BISHOP);
  } else if (index === 3) {
    addImage(cell, team, QUEEN);
  } else if (index === 4) {
    addImage(cell, team, KING);
  }
}


function onCellClick(e) {
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
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = table.insertRow();
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = row.insertCell();
      cell.id = "cell-" + i.toString() + "_" + j.toString();
      if ((i + j) % 2 === 0) {
        cell.className = 'lightCell';
      } else {
        cell.className = 'darkCell';
      }
        cell.addEventListener('click', onCellClick);
    }
  }
  pieces = getInitialBoard();

  for(let piece of pieces) {
    addImage(table.rows[piece.row].cells[piece.col], piece.team, piece.type);
  }
}

window.addEventListener('load', createChessBoard);
