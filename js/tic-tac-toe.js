const board = document.querySelector('.board');
let currentPlayer = 'X';
let winner = null;
const cells = Array.from({ length: 9 }).fill(null);

function checkWinner() {
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }

  return null;
}

function handleCellClick(index) {
    if (winner || cells[index]) return;

    cells[index] = currentPlayer;
    render();

    winner = checkWinner();

    if (winner) {
        const winningCells = document.querySelectorAll(`.cell[data-index="${winner[0]}"], .cell[data-index="${winner[1]}"], .cell[data-index="${winner[2]}"]`);
        winningCells.forEach(cell => cell.classList.add(currentPlayer.toLowerCase() + '-win'));
        showModal(`Player ${currentPlayer} wins!`);
    } else if (!cells.includes(null)) {
        showModal("DRAW !");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Apply glow effect to clicked cell
    const clickedCell = document.querySelector(`.cell:nth-child(${index + 1})`);
    clickedCell.classList.add('glow');
}


function render() {
    board.innerHTML = '';
    cells.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (value === 'X') {
            cell.textContent = value;
            cell.style.color = 'lightblue'; // Set color for X
        } else if (value === 'O') {
            cell.textContent = value;
            cell.style.color = 'red'; // Set color for O
        }
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
    });
}


function resetGame() {
    cells.fill(null);
    currentPlayer = 'X';
    winner = null;
    // Remove glow effect from all cells
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('glow'));
    render();
}


function showModal(message) {
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    const gameModal = new bootstrap.Modal(document.getElementById('gameModal'));
    gameModal.show();
}


render();
