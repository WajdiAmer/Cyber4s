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

  addPieces(result, 0, WHITE_TEAM);
  addPieces(result, 7, BLACK_TEAM);

  for (let i = 0 ; i < BOARD_SIZE ; i++) {
    result.push(new Piece(1, i, "Pawn", WHITE_TEAM));
    result.push(new Piece(6, i, "Pawn", BLACK_TEAM));
  }

  return result;
}

function addPieces(result, row, team) {
  result.push(new Piece(row, 0, "Rook", team));
  result.push(new Piece(row, 7, "Rook", team));
  result.push(new Piece(row, 1, "Knight", team));
  result.push(new Piece(row, 6, "Knight", team));
  result.push(new Piece(row, 2, "Bishop", team));
  result.push(new Piece(row, 5, "Bishop", team));
  result.push(new Piece(row, 4, "King", team));
  result.push(new Piece(row, 3, "Queen", team));
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
