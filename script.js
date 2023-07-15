document.addEventListener('DOMContentLoaded', () => {
    const lines = Array.from(document.getElementsByClassName('line'));
    const cells = Array.from(document.getElementsByClassName('cell'));
    const result = document.getElementById('result');
    const newGameButton = document.getElementById('newGameButton');
  
    const player1 = 'blue';
    const player2 = 'pink';
    let currentPlayer = player1;
    let gameEnded = false;
  
    let gameBoard = [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ];
  
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => handleCellClick(index));
    });
  
    newGameButton.addEventListener('click', resetGame);
  
    function handleCellClick(index) {
      if (gameEnded) {
        return;
      }
  
      const lineIndex = Math.floor(index / 4);
      const colIndex = index % 4;
  
      if (gameBoard[lineIndex][colIndex] === '') {
        gameBoard[lineIndex][colIndex] = currentPlayer;
        cells[index].classList.add(currentPlayer);
  
        if (checkWinCondition(lineIndex, colIndex)) {
          result.textContent = `Player ${currentPlayer} wins!`;
          gameEnded = true;
        } else {
          currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
  
        if (checkTie() && !gameEnded) {
          result.textContent = "It's a tie!";
          gameEnded = true;
        }
      }
    }
  
    function checkWinCondition(lineIndex, colIndex) {
      const color = gameBoard[lineIndex][colIndex];
  
      // Check line
      let count = 0;
      for (let i = 0; i < 4; i++) {
        if (gameBoard[lineIndex][i] === color) {
          count++;
          if (count === 4) {
            return true;
          }
        } else {
          count = 0;
        }
      }
  
      // Check column
      count = 0;
      for (let i = 0; i < 4; i++) {
        if (gameBoard[i][colIndex] === color) {
          count++;
          if (count === 4) {
            return true;
          }
        } else {
          count = 0;
        }
      }
  
      // Check diagonal (top-left to bottom-right)
      count = 0;
      for (let i = -3; i < 4; i++) {
        const line = lineIndex + i;
        const col = colIndex + i;
        if (line >= 0 && line < 4 && col >= 0 && col < 4) {
          if (gameBoard[line][col] === color) {
            count++;
            if (count === 4) {
              return true;
            }
          } else {
            count = 0;
          }
        }
      }
  
      // Check diagonal (bottom-left to top-right)
      count = 0;
      for (let i = -3; i < 4; i++) {
        const line = lineIndex - i;
        const col = colIndex + i;
        if (line >= 0 && line < 4 && col >= 0 && col < 4) {
          if (gameBoard[line][col] === color) {
            count++;
            if (count === 4) {
              return true;
            }
          } else {
            count = 0;
          }
        }
      }
  
      return false;
    }
  
    function checkTie() {
      return gameBoard.flat().every((cell) => cell !== '');
    }
  
    function resetGame() {
      gameBoard = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
      ];
      currentPlayer = player1;
      gameEnded = false;
      result.textContent = '';
      cells.forEach((cell) => {
        cell.className = 'cell';
      });
    }
  });
  