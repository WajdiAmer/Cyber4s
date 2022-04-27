
//TODO:
//      - King and Knight extract to function


const BOARD_SIZE = 8;
const WHITE_TEAM = 'White';
const BLACK_TEAM = 'Black';
const PAWN = 'Pawn';
const ROOK = 'Rook';
const KNIGHT = 'Knight';
const BISHOP = 'Bishop';
const QUEEN = 'Queen';
const KING = 'King';
const CHESS_BOARD = 'chess-board'

let selectedPiece;
let table;
let gameManager;


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
  image.draggable = false;
  cell.appendChild(image);
}

function showMovesForPiece(row, col) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possibleMovement');
      table.rows[i].cells[j].classList.remove('selectedCell');
    }
  }

  const piece = gameManager.boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = gameManager.getPossibleMoves(piece);
    for (let possibleMove of possibleMoves) {
      table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possibleMovement');
    }
  }
  table.rows[row].cells[col].classList.add('selectedCell');
  selectedPiece = piece;
}

function onCellClick(row, col) {
  if (selectedPiece === undefined) {
    showMovesForPiece(row, col);
  } else if (gameManager.tryMove(selectedPiece, row, col)) {
    selectedPiece = undefined;
    createChessBoard(gameManager.boardData);
  } else {
    showMovesForPiece(row, col);
  }
}


function initGame() {
  gameManager = new GameManager(WHITE_TEAM);
  createChessBoard(gameManager.boardData);
}

function createChessBoard() {
  table = document.getElementById(CHESS_BOARD);
  if (table !== null) {
    table.remove();
  }

  const containerDiv = document.createElement('div');
  containerDiv.className = 'containerDiv';
  document.body.appendChild(containerDiv);
  table = document.createElement('table');
  table.id = CHESS_BOARD;
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
        cell.addEventListener('click', () => onCellClick(row, col));
    }
  }

  for(let piece of gameManager.boardData.pieces) {
          // (     Cell Place by [row, col]       )
    addImage(table.rows[piece.row].cells[piece.col], piece.team, piece.type);
  }

  if(gameManager.winner !== undefined) {
    const winnerPopup = document.createElement('div');
    winnerPopup.textContent = gameManager.winner + ' Player Wins!';
    winnerPopup.classList.add('winnerPopup');
    table.appendChild(winnerPopup);
    // cell.classList.remove('td:hover');
  }
}

initGame();
