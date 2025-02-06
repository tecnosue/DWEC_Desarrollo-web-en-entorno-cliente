function createBoard() {
  // Para cada una de las 8 filas, crea un array nuevo de 8 null
  return new Array(8).fill(null).map(() => new Array(8).fill(null));
}

/**
 * Llena el tablero de ajedrez con las piezas en sus posiciones iniciales
 * usando caracteres Unicode para cada pieza.
 *
 * \u2654: Rey blanco   \u2655: Reina blanca   \u2656: Torre blanca
 * \u2657: Alfil blanco \u2658: Caballo blanco \u2659: Peón blanco
 *
 * \u265A: Rey negro    \u265B: Reina negra    \u265C: Torre negra
 * \u265D: Alfil negro  \u265E: Caballo negro  \u265F: Peón negro
 *
 */
function fillChessBoard(board) {
  // Fila 0: piezas negras (torre, caballo, alfil, dama, rey, alfil, caballo, torre)
  board[0][0] = "\u265C";
  board[0][1] = "\u265E";
  board[0][2] = "\u265D";
  board[0][3] = "\u265B";
  board[0][4] = "\u265A";
  board[0][5] = "\u265D";
  board[0][6] = "\u265E";
  board[0][7] = "\u265C";

  // Fila 1: peones negros
  for (let i = 0; i < 8; i++) {
    board[1][i] = "\u265F";
  }

  // Fila 6: peones blancos
  for (let i = 0; i < 8; i++) {
    board[6][i] = "\u2659";
  }

  // Fila 7: piezas blancas (torre, caballo, alfil, dama, rey, alfil, caballo, torre)
  board[7][0] = "\u2656";
  board[7][1] = "\u2658";
  board[7][2] = "\u2657";
  board[7][3] = "\u2655";
  board[7][4] = "\u2654";
  board[7][5] = "\u2657";
  board[7][6] = "\u2658";
  board[7][7] = "\u2656";
}

function createCell(cell) {
  // Si cell es null, mostramos cadena vacía
  let content = cell === null ? "" : cell;
  // Retornamos el td con su contenido
  return `<td>${content}</td>`;
}

function createRow(row) {
  return `<tr>${row.map(createCell).join(" ")}</tr>`;
}

function drawBoard(board) {
  let tableBoard = document.createElement("table");
  tableBoard.classList.add("chess");
  tableBoard.innerHTML = board.map(createRow).join(" ");
  return tableBoard;
}

// Crea una funció que plene el tauler amb les fitxes unicode de l'escacs. Crida-la en el moment adequat

/* ==================== EJECUCIÓN ==================== */

// 1. Creamos el tablero vacío (8x8).
let myBoard = createBoard();

// 2. Llenamos el tablero con las piezas de ajedrez en posiciones iniciales.
fillChessBoard(myBoard);

// 3. Dibujamos el tablero en la página y lo insertamos en el contenedor #board.
document.querySelector("#board").append(drawBoard(myBoard));
