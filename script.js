let gameboard = ['', '', '', '', '', '', '', '', ''];
let player1 = '';
let player2 = '';
let player1Score = 0;
let player2Score = 0;
let turn = true;
let cells;
let gameStarted = false;


function playerOnePlay(cell) { 
    cell.textContent = 'X';
    return cell;
}

function playerTwoPlay(cell) {
    cell.textContent = 'O';
    return cell;
}

document.addEventListener('DOMContentLoaded', function () {
    
    const submitButtons = document.querySelectorAll('.submit');
    const playingGrid = document.querySelector('.playing-grid');
    cells = document.querySelectorAll('.playing-grid > div');

    playingGrid.classList.add('hidden');

    submitButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const player1Input = document.getElementById('player1').value.trim();
            const player2Input = document.getElementById('player2').value.trim();

            player1 = player1Input;
            player2 = player2Input;
            
            if (player1 && player2 && !gameStarted) {
                gameStarted = true;
                playingGrid.classList.remove('hidden');
                document.querySelector('.game-info').style.display = 'none';
                showInitialScoreboard();
                setupGame();
            }
        });
    });
});


function showInitialScoreboard() {
    const scoreboard = createScoreboard();
    const container = document.getElementById('scoreboard-container');
    container.innerHTML = '';
    container.appendChild(scoreboard);
}

function setupGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}


function handleCellClick() {
    if (!gameStarted) return;

    const block = this.id;
    const element = document.getElementById(block);

    if (!element.textContent) {
            
            if (turn) {
                
                playerOnePlay(element);
                const index = parseInt(block.replace('num', '')) - 1;
                gameboard[index] = 'X';
                
                const result = checkWin();
                if (result) {
                    if (result.winner === 'X') {
                        playerOneWins(result.cells);
                    }
                    else if (result.winner === 'draw') {
                        draw();
                    }
                }
                turn = !turn;
                
            }
            else {
                
                playerTwoPlay(element);
                const index = parseInt(block.replace('num', '')) - 1;
                gameboard[index] = 'O';
                
                const result = checkWin();
                if (result) {
                    if (result.winner === 'O') {
                        playerTwoWins(result.cells);
                    }
                    else if (result.winner === 'draw') {
                        draw();
                    }
                }
                turn = !turn;
            }
        }
}


function createScoreboard() {
    
    const scoreboard = document.createElement('div');
    scoreboard.className = 'board';

    const title = document.createElement('h3');
    title.className = 'title';
    title.textContent = 'SCOREBOARD';
    scoreboard.appendChild(title);

    
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    
    
    const player1Box = document.createElement('div');
    player1Box.className = 'player-score-box';
    
    const name1 = document.createElement('div');
    name1.className = 'player-name-large';
    name1.textContent = player1;
    player1Box.appendChild(name1);
    
    const score1Value = document.createElement('div');
    score1Value.className = 'score-number';
    score1Value.textContent = player1Score;
    player1Box.appendChild(score1Value);
    
    
    const colon = document.createElement('div');
    colon.className = 'colon-separator';
    colon.textContent = ':';
    
     
    const player2Box = document.createElement('div');
    player2Box.className = 'player-score-box';
    
    const name2 = document.createElement('div');
    name2.className = 'player-name-large';
    name2.textContent = player2;
    player2Box.appendChild(name2);
    
    const score2Value = document.createElement('div');
    score2Value.className = 'score-number';
    score2Value.textContent = player2Score;
    player2Box.appendChild(score2Value);
    
    
    scoreDisplay.appendChild(player1Box);
    scoreDisplay.appendChild(colon);
    scoreDisplay.appendChild(player2Box);
    
    scoreboard.appendChild(scoreDisplay);

    
    const playAgainBtn = document.createElement('button');
    playAgainBtn.className = 'play-again';
    playAgainBtn.textContent = 'Next Round';
    
    playAgainBtn.addEventListener('click', function () {
        playAgain();
    });
    
    scoreboard.appendChild(playAgainBtn);
        
    return scoreboard;
}

function displayScoreboard(scoreboard){
    const container = document.getElementById('scoreboard-container');
    container.innerHTML = '';
    container.appendChild(scoreboard);
}

function playAgain() {
    
    turn = true;
    gameboard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '';
    });

    const congratsContainer = document.getElementById('congrats-container');
    congratsContainer.innerHTML = '';
}


function checkWin() {
    
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
            return {
                winner: gameboard[a],
                cells: pattern
            };
        }
    }

    if (!gameboard.includes('')) {
        return { winner: 'draw' };
    }
    return null;                
}


function playerOneWins(cells) {
    
    player1Score++;
    updateScoreboard();
    showCongratulations(`${player1} wins !`, 'lightgreen');
    highlightWinningCells(cells, 'lightgreen');

}


function playerTwoWins(cells) {  
    
    player2Score++;
    updateScoreboard();
    showCongratulations(`${player2} wins !`, 'lightgreen');
    highlightWinningCells(cells, 'lightgreen');

}


function draw() {
    showCongratulations("It's a draw!", 'lightyellow');
}


function showCongratulations(message, color) {
    const congrats = document.createElement('div');
    congrats.className = 'congrats-popup';
    congrats.textContent = message;
    congrats.style.backgroundColor = color;

    const container = document.getElementById('congrats-container');
    container.innerHTML = '';
    container.appendChild(congrats);

    setTimeout(() => {
        container.innerHTML = '';
    }, 3000);    
}


function highlightWinningCells(cellsIndices, color) {
    cellsIndices.forEach(cellIndex => {
        const cellId = 'num' + (cellIndex + 1);
        const cell = document.getElementById(cellId);
        cell.style.backgroundColor = color;
    });
}


function updateScoreboard() {
    const container = document.getElementById('scoreboard-container');
    if (container.firstChild) {
        
        const score1 = container.querySelector('.player-score-box:first-child .score-number');
        const score2 = container.querySelector('.player-score-box:last-child .score-number');
        
        if (score1) score1.textContent = player1Score;
        if (score2) score2.textContent = player2Score;
    } else {
        showInitialScoreboard();
    }
}