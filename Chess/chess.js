
const containerDiv = document.createElement("div");
containerDiv.className = "containerDiv";
document.body.appendChild(containerDiv);

const chessTable = document.createElement("table");
containerDiv.appendChild(chessTable);


function rowStartDark(row) {
    for(let i=0; i<8; i++) {
      if(i % 2 == 0) {
        let chessTile = row.insertCell(i);
        chessTile.className = "darkTile";
      }
      else {
        let chessTile = row.insertCell(i);
        chessTile.className = "lightTile";
      }
    }
  }

  function rowStartLight(row) {
      for(let i=0; i<8; i++) {
        if(i % 2 == 0) {
          let chessTile = row.insertCell(i);
          chessTile.classList.add("lightTile");
        }
        else {
          let chessTile = row.insertCell(i);
          chessTile.classList.add("darkTile");
        }
      }
  }

for(let i=0; i<8; i++) {
  let chessRow = chessTable.insertRow(i);
  if (i % 2 == 0) {
    rowStartDark(chessRow);
  }
  else {
    rowStartLight(chessRow);
  }
}

let tiles = document.getElementsByTagName("td");
console.log(tiles);         //remove later

function insertPiece(color, type, index) {
  let piece = document.createElement("img");
  piece.src = "./chessPieces/" + color + "/" + type + ".png";
  tiles[index].appendChild(piece);
}

const blackKing = insertPiece("black", "King", 4);
const blackQueen = insertPiece("black", "Queen", 3);
const blackBishop1 = insertPiece("black", "Bishop", 2);
const blackBishop2 = insertPiece("black", "Bishop", 5);
const blackKnight1 = insertPiece("black", "Knight", 1);
const blackKnight2 = insertPiece("black", "Knight", 6);
const blackRook1 = insertPiece("black", "Rook", 0);
const blackRook2 = insertPiece("black", "Rook", 7);
const blackPawn = [0, 1, 2, 3, 4, 5, 6, 7];
for (let i = 0 ; i < 8 ; i++) {
  blackPawn[i] = insertPiece("black", "Pawn", i+8);
}

const whiteKing = insertPiece("white", "King", 60);
const whiteQueen = insertPiece("white", "Queen", 59);
const whiteBishop1 = insertPiece("white", "Bishop", 58);
const whiteBishop2 = insertPiece("white", "Bishop", 61);
const whiteKnight1 = insertPiece("white", "Knight", 57);
const whiteKnight2 = insertPiece("white", "Knight", 62);
const whiteRook1 = insertPiece("white", "Rook", 56);
const whiteRook2 = insertPiece("white", "Rook", 63);
const whitePawn = [0, 1, 2, 3, 4, 5, 6, 7];
for (let i = 0 ; i < 8 ; i++) {
  whitePawn[i] = insertPiece("white", "Pawn", i+48);
}