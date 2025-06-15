
let currentPlayer = 'X';
let board = Array(9).fill(null);
let scoreX = 0;
let scoreO = 0;
const boardDiv = document.getElementById('board');
const statusDiv = document.getElementById('status');
const scoreXSpan = document.getElementById('scoreX');
const scoreOSpan = document.getElementById('scoreO');

function drawBoard() {
  boardDiv.innerHTML = '';
  board.forEach((cell, idx) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = 'cell';
    cellDiv.textContent = cell;
    cellDiv.onclick = () => handleMove(idx);
    boardDiv.appendChild(cellDiv);
  });
}

function handleMove(idx) {
  if (board[idx] || checkWinner()) return;
  board[idx] = currentPlayer;
  drawBoard();
  const winner = checkWinner();
  if (winner) {
    statusDiv.textContent = `Pemenang: ${winner}`;
    if (winner === 'X') scoreX++; else scoreO++;
    scoreXSpan.textContent = scoreX;
    scoreOSpan.textContent = scoreO;
    startConfetti();
    setTimeout(stopConfetti, 3000);
  } else if (board.every(cell => cell)) {
    statusDiv.textContent = 'Seri!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `Giliran: ${currentPlayer}`;
  }
}

function checkWinner() {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (const [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  statusDiv.textContent = 'Giliran: X';
  drawBoard();
}

function resetScore() {
  scoreX = 0;
  scoreO = 0;
  scoreXSpan.textContent = '0';
  scoreOSpan.textContent = '0';
}

window.onload = () => {
  drawBoard();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
};
