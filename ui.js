function updateBoardUI(game) {
  const cells = document.querySelectorAll('.playing-grid > div');
  cells.forEach((cell, i) => {
    cell.textContent = game.gameboard[i];
    cell.style.backgroundColor = '';
  });
}


function highlightWinner(game) {
  if (game.win_pattern.length === 3) {
    game.win_pattern.forEach(i => {
      document.getElementById(`num${i + 1}`).style.backgroundColor = 'lightgreen';
    });
  }
}


function highlightTurn(game) {
  document.getElementById('name1').classList.remove('active-turn');
  document.getElementById('name2').classList.remove('active-turn');

  if (!isFinished(game)) {
    const current = game.turn === player1 ? 'name1' : 'name2';
    document.getElementById(current).classList.add('active-turn');
  }
}


function showCongrats(game) {
  if (!isFinished(game)) return;

  const congrats = document.createElement('div');
  congrats.className = 'congrats-popup';
  congrats.textContent = game.winner === 'draw' ? "It's a draw!" : `Congratulations ${game.winner.name} ! You won !`;
  congrats.style.backgroundColor = game.winner === 'draw' ? 'lightyellow' : 'lightgreen';

  const container = document.getElementById('congrats-container');
  container.innerHTML = '';
  container.appendChild(congrats);

  setTimeout(() => { container.innerHTML = ''; }, 3000);
}


function updateScoreboard(player1, player2) {
  document.getElementById('score1').textContent = player1.score;
  document.getElementById('score2').textContent = player2.score;
}


function displayStarter(player) {
  const firstPlayer = document.createElement('div');
  firstPlayer.className = 'first-player-popup';
  firstPlayer.textContent = `${player.name} starts !`;
  firstPlayer.style.backgroundColor = 'lightblue';

  const container = document.getElementById('first-player-container');
  container.innerHTML = '';
  container.appendChild(firstPlayer);

  setTimeout(() => { container.innerHTML = ''; }, 3000);
}

function resetCellsColors(cells) {
  cells.forEach(cell => { cell.style.backgroundColor = ''; });
}


function updateUI(game) {
  updateBoardUI(game);
  highlightWinner(game);
  highlightTurn(game);
  showCongrats(game);
}
