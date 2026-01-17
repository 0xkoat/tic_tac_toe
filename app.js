function Player(name, sign, score) {
  this.name = name;
  this.sign = sign;
  this.score = score;
}

const player1 = new Player('', 'X', 0);
const player2 = new Player('', 'O', 0);

let game = {
  gameboard: ['', '', '', '', '', '', '', '', ''],
  winner: '',
  win_pattern: [],
  turn: player1
};

const playersInfo = document.querySelector('.game-info');
const playingGrid = document.querySelector('.playing-grid');
const scoreboard = document.querySelector('.scoreboard');
const cells = document.querySelectorAll('.playing-grid > div');
const submitBtn = document.querySelector('.submit');
const nextRoundBtn = document.querySelector('.play-again');



function onCellClick(cell) {
  const index = parseInt(cell.id.replace('num', '')) - 1;
  if (isFinished(game) || game.gameboard[index] !== '') return;

  play(index, game);
  updateUI(game);
    
   if (isFinished(game)) {
        updateScoreboard(player1, player2);
    }
}

function onSubmitClick(event) {
  event.preventDefault();

  const name1 = document.getElementById('player1').value.trim();
  const name2 = document.getElementById('player2').value.trim();
  if (!name1 || !name2) return alert("Please enter both player names!");

  player1.name = name1;
  player2.name = name2;

  document.getElementById('name1').textContent = name1;
  document.getElementById('name2').textContent = name2;

  playersInfo.classList.add('hidden');
  playingGrid.classList.remove('hidden');
  scoreboard.classList.remove('hidden');

  startNewRound();
}

function onNextRoundClick() {
  if (!isFinished(game)) return;
  startNewRound();
}


function setCellClickEvents() {
  cells.forEach(cell => cell.onclick = () => onCellClick(cell));
}

function setAppEventListeners() {
  submitBtn.onclick = (e) => onSubmitClick(e);
  nextRoundBtn.onclick = () => onNextRoundClick();
}


function startNewRound() {
  game = init();
  game.turn = Math.random() < 0.5 ? player1 : player2;
  displayStarter(game.turn);
  resetCellsColors(cells);
  updateUI(game);
  setCellClickEvents();
}



setAppEventListeners();
