const playersInfo = document.querySelector('.game-info');
const playingGrid = document.querySelector('.playing-grid');
const scoreboard = document.querySelector('.board');

function startNewRound(player1, player2) {
    game = init();
    game.turn = Math.random() < 0.5 ? player1 : player2;
    displayStarter(game.turn);
}

function handleCellClicks() {
    const cells = document.querySelectorAll('.playing-grid > div');
    cells.forEach(cell => {
        cell.onclick = null;
        
        cell.onclick = () => {
            if (game.winner) return;
            const index = parseInt(cell.id.replace('num', '')) - 1;
            if (game.gameboard[index] !== '') return;
            play(index, game);
            updateUI(game);
            updateScoreboard(player1, player2);
        };
    });
}


function handleSubmitClick() {
    const submitBtn = document.querySelector('.submit');
    submitBtn.onclick = (event) => {
        event.preventDefault();
         
        const name1 = document.getElementById('player1').value.trim();
        const name2 = document.getElementById('player2').value.trim();
          
        if (!name1 || !name2) {
            alert("Please enter both player names!");
            return; 
        }
        
        player1.name = name1;
        player2.name = name2;

        document.getElementById('name1').textContent = name1;
        document.getElementById('name2').textContent = name2;
        
        playersInfo.classList.add('hidden');
        playingGrid.classList.remove('hidden');
        scoreboard.classList.remove('hidden');
        
        startNewRound(player1, player2);
        handleCellClicks();
        updateScoreboard(player1, player2);
    };
}

function handleNextRoundClick() {
    const nextRoundBtn = document.querySelector('.play-again');
    nextRoundBtn.onclick =  () => {
        if (!game.winner) return;  

        startNewRound(player1, player2);
        const cells = document.querySelectorAll('.playing-grid > div');
        resetCellsColors(cells);
        handleCellClicks();
        updateUI(game);
    };
}


handleSubmitClick();
handleNextRoundClick();

