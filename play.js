function Player(name, sign, score) {
    this.name = name;
    this.sign = sign;
    this.score = score;
}

const player1 = new Player('', 'X', 0);
const player2 = new Player('', 'O', 0);

let game = {
    gameboard: ['', '', '', '', '', '', '', '', ''],
    gameStarted: false,
    winner: '',
    cells_won: [],
    turn: player1,
    
};

const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function init() {
    return {
    gameboard: ['', '', '', '', '', '', '', '', ''],
    winner: '',
    cells_won: [],
    turn: player1,
    }
}

function play(num, game) {
    
    game.gameboard[num] = game.turn.sign;

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (game.gameboard[a] && game.gameboard[a] === game.gameboard[b] && game.gameboard[a] === game.gameboard[c]) {
            game.winner = game.turn;
            game.cells_won = pattern;
            game.turn.score++;
            return;
        }
    }

    if (!game.gameboard.includes('')) {
        game.winner = 'draw';
        return;
    }

    if (game.turn === player1) {
        game.turn = player2;
    }
    else {
        game.turn = player1;
    }

    return 

}

