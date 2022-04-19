const BOARD_SIZE = 8;
const WHITE_TYPE = 'White';
const BLACK_TYPE = 'Black';

let selectedCell;

function addImage(cell, type, name) {
  const image = document.createElement('img');
  image.src = './chessPieces/' + type + '/' + name + '.png';
  cell.appendChild(image);
}

function addImageByIndex(cell, type, index) {
  if (index === 0 || index === 7) {
    addImage(cell, type, 'rook');
  } else if (index === 1 || index === 6) {
    addImage(cell, type, 'knight');
  } else if (index === 2 || index === 5) {
    addImage(cell, type, 'bishop');
  } else if (index === 3) {
    addImage(cell, type, 'queen');
  } else if (index === 4) {
    addImage(cell, type, 'king');
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

      if (i === 0) {
        addImageByIndex(cell, WHITE_TYPE, j);
      } else if (i === 1) {
        addImage(cell, WHITE_TYPE, 'pawn');
      } else if (i === 6) {
        addImage(cell, BLACK_TYPE, 'pawn');
      } else if (i === 7) {
        addImageByIndex(cell, BLACK_TYPE, j);
      }
    }
  }
}

window.addEventListener('load', createChessBoard);
