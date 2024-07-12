window.addEventListener("DOMContentLoaded", () => {
    var tiles = Array.from(document.querySelectorAll(".tile"));
    var resetButton = document.querySelector("#reset");
    const player = document.querySelector(".display-player");
    var announcer = document.querySelector(".announcer");

    let currentPlayer = 'X';
    let gameON = true;
    let board = ['', '', '', '', '', '', '', '', ''];

    const playerXWin = "Player X win";
    const playerOWin =  "Player O win";
    const tie = "Tie";

    const winningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResult() {
        let roundWin = false;
        for (var i = 0; i < winningCondition.length; i++) {
            const [a, b, c] = winningCondition[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWin = true;
                break;
            }
        }
        if (roundWin) {
            announce(currentPlayer === 'X' ? playerXWin : playerOWin);
            gameON = false;
        } else if (!board.includes('')) {
            announce(tie);
            gameON = false;
        }
    }

    const announce = (type) => {
        switch(type){
            case playerOWin:
                announcer.innerHTML = "Player <span class='playerO'>O</span> Won";
                break;
            case playerXWin:
                announcer.innerHTML = "Player <span class='playerX'>X</span> Won";
                break;
            case tie:
                announcer.innerHTML = "It's a Tie";
                break;
        }
        announcer.classList.remove("hide");
    };

    const isValid = (tile) => {
        return tile.innerHTML === '';
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    const changePlayer = () => {
        player.classList.remove('player'+currentPlayer);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        player.innerHTML = currentPlayer;
        player.classList.add('player'+currentPlayer);
    };

    const userAction = (tile, index) => {
        if (isValid(tile) && gameON) {
            tile.innerHTML = currentPlayer;
            tile.classList.add('player'+currentPlayer);
            updateBoard(index);
            handleResult();
            changePlayer();
        }
    };

    const resetBoard = () => {
        gameON = true;
        board = ['', '', '', '', '', '', '', '', ''];
        announcer.classList.add("hide");

        currentPlayer = 'X';
        player.innerHTML = currentPlayer;
        player.classList.remove('playerO', 'playerX');

        tiles.forEach((tile) => {
            tile.innerHTML = '';
            tile.classList.remove("playerO", "playerX");
        });
    };

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => {
            userAction(tile, index);
        });
    });

    resetButton.addEventListener("click", resetBoard);
});