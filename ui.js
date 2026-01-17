function updateBoardUIAndTurn(game) {
  const cells = document.querySelectorAll('.playing-grid > div');
  cells.forEach((cell, i) => {
    cell.textContent = game.gameboard[i];
  });
     
  document.getElementById('name1').classList.toggle('active-turn', game.turn === player1);
  document.getElementById('name2').classList.toggle('active-turn', game.turn === player2);
}


function handleEndOfGame(game){
    
    if (game.winner !== 'draw') {
        game.win_pattern.forEach(i => {
            document.getElementById(`num${i + 1}`).style.backgroundColor = 'lightgreen';
        });
    }

    const congrats = document.createElement('div');
    congrats.className = 'congrats-popup';
    congrats.textContent = game.winner === 'draw' ? "It's a draw!" : `Congratulations ${game.winner.name} ! You won !`;
    congrats.style.backgroundColor = game.winner === 'draw' ? 'lightyellow' : 'lightgreen';

    const container = document.getElementById('congrats-container');
    container.innerHTML = '';
    container.appendChild(congrats);

    setTimeout(() => { container.innerHTML = ''; }, 3000);

    updateScoreboard(player1, player2);
}


function updateScoreboard(player1, player2) {
  document.getElementById('score1').textContent = player1.score;
    document.getElementById('score2').textContent = player2.score;
    document.getElementById('next-round').classList.remove('hidden');

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


function resetUI() {
    const cells = document.querySelectorAll('.playing-grid > div');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '';
    });

    document.getElementById('name1').classList.remove('active-turn');
    document.getElementById('name2').classList.remove('active-turn');
    document.getElementById('congrats-container').innerHTML = '';
    document.getElementById('next-round').classList.add('hidden');
    
}



