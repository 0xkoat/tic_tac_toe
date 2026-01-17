function updateUI(game) {
    const cells = document.querySelectorAll('.playing-grid > div');

    for (let i = 0; i < 9; i++){
        const cell = document.getElementById(`num${i + 1}`);
        cell.textContent = game.gameboard[i];
        cell.style.backgroundColor = '';
    }

    if (game.cells_won.length === 3) {
        
        game.cells_won.forEach(index => {
            const cell = document.getElementById(`num${index + 1}`);
            cell.style.backgroundColor = 'lightgreen';
        });     
    }

    document.getElementById('name1').classList.remove('active-turn');
    document.getElementById('name2').classList.remove('active-turn');

    if (!game.winner) {
        if (game.turn === player1) {
            document.getElementById('name1').classList.add('active-turn');
        } else {
            document.getElementById('name2').classList.add('active-turn');
        }
    }

    if (game.winner) {
        const congrats = document.createElement('div');
        congrats.className = 'congrats-popup';
        congrats.textContent =  (game.winner === 'draw') ? "It's a draw!" : `Congratulations ${game.winner.name} ! You won !`; 
        congrats.style.backgroundColor = (game.winner === 'draw') ? 'lightyellow' : 'lightgreen';

        const container = document.getElementById('congrats-container');
        container.innerHTML = '';
        container.appendChild(congrats);

        setTimeout(() => {
            container.innerHTML = '';
        }, 3000);    
    }

}

function updateScoreboard(player1, player2) {
    const score1 = document.getElementById('score1');
    const score2 = document.getElementById('score2');
    score1.textContent = player1.score;
    score2.textContent = player2.score;
}

function displayStarter(player) {
    
    const firstPlayer = document.createElement('div');
    firstPlayer.className = 'first-player-popup';
    firstPlayer.textContent = `${player.name} starts !`;
    firstPlayer.style.backgroundColor = 'lightblue';

    const container = document.getElementById('first-player-container');
    container.innerHTML = '';
    container.appendChild(firstPlayer);

    setTimeout(() => {
        container.innerHTML = '';
    }, 3000);
}

function resetCellsColors(cells) {
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    })
}