

window.addEventListener('DOMContentLoaded', () => {
    const squares = Array.from(document.getElementsByClassName("square"));
    const playerDisplay = document.getElementById("msg_turn");
    const resetButton = document.getElementById("reset");
    const announcer = document.getElementById("announcer_msg")


    let table = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const X_WON = 'X_WON';
    const O_WON = 'O_WON';
    const TIE = 'TIE';


    const winningIndices = [
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
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningIndices[i];
            const a = table[winCondition[0]];
            const b = table[winCondition[1]];
            const c = table[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

            if (roundWon) {
                announceResult(currentPlayer === 'X' ? X_WON : O_WON);
                isGameActive = false;
                return;
                }

            if (!table.includes(''))
                announceResult(TIE);
            }

    const announceResult = (type) => {
        switch(type){
            case O_WON:
                announcer.innerHTML = 'Player' + ' <span class="playerO">O</span>' + "'s " + 'won';
                break;
            case X_WON:
                announcer.innerHTML = 'Player' + ' <span class="playerX">X</span>' + "'s " + 'won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

 


    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (square, index) => {
        if((square.innerText !== 'X' || square.innerText !== 'O') && isGameActive) {
            square.innerText = currentPlayer;
            square.classList.add(`player${currentPlayer}`);
            table[index] = currentPlayer;
            handleResult();
            changePlayer();
        }
    }
    
    const resettable = () => {
        table = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        squares.forEach(square => {
            square.innerText = '';
            square.classList.remove('playerX');
            square.classList.remove('playerO');
        });
    }

    squares.forEach( (square, index) => {
        square.addEventListener('click', () => userAction(square, index));
    });

    resetButton.addEventListener('click', resettable);
});