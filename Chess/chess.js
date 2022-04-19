const BOARD_SIZE = 8;
const WHITE_TEAM = 'White';
const BLACK_TEAM = 'Black';

let selectedCell;

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
  
  result.push(new Piece(0, 0, "Rook", WHITE_TEAM));
  result.push(new Piece(0, 7, "Rook", WHITE_TEAM));
  result.push(new Piece(0, 1, "Knight", WHITE_TEAM));
  result.push(new Piece(0, 6, "Knight", WHITE_TEAM));
  result.push(new Piece(0, 2, "Bishop", WHITE_TEAM));
  result.push(new Piece(0, 5, "Bishop", WHITE_TEAM));
  result.push(new Piece(0, 4, "King", WHITE_TEAM));
  result.push(new Piece(0, 3, "Queen", WHITE_TEAM));
  
  result.push(new Piece(7, 0, "Rook", BLACK_TEAM));
  result.push(new Piece(7, 7, "Rook", BLACK_TEAM));
  result.push(new Piece(7, 1, "Knight", BLACK_TEAM));
  result.push(new Piece(7, 6, "Knight", BLACK_TEAM));
  result.push(new Piece(7, 2, "Bishop", BLACK_TEAM));
  result.push(new Piece(7, 5, "Bishop", BLACK_TEAM));
  result.push(new Piece(7, 4, "King", BLACK_TEAM));
  result.push(new Piece(7, 3, "Queen", BLACK_TEAM));

  for (let i = 0 ; i < BOARD_SIZE ; i++) {
    result.push(new Piece(1, i, "Pawn", WHITE_TEAM));
    result.push(new Piece(6, i, "Pawn", BLACK_TEAM));
  }

  return result;
}

function addImage(cell, team, type) { 
  const image = document.createElement('img');
  image.src = './chessPieces/' + team + '/' + type + '.png';
  cell.appendChild(image);
}

function addImageByIndex(cell, team, index) {
  if (index === 0 || index === 7) {
    addImage(cell, team, 'rook');
  } else if (index === 1 || index === 6) {
    addImage(cell, team, 'knight');
  } else if (index === 2 || index === 5) {
    addImage(cell, team, 'bishop');
  } else if (index === 3) {
    addImage(cell, team, 'queen');
  } else if (index === 4) {
    addImage(cell, team, 'king');
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
  const table1 = document.createElement('table');
  containerDiv.appendChild(table1);
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = table1.insertRow();
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
    addImage(table1.rows[piece.row].cells[piece.col], piece.team, piece.type);
  }
}

window.addEventListener('load', createChessBoard);
