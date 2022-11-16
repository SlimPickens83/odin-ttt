// Player objects

const player = (id, name, symbol) => {
    return{id, name, symbol};
 }
 
const playerOne = player("player1", "input", 'X');
const playerTwo = player("player2", "input", 'O');

// Gameboard module

const board = ( function() {
	'use strict';

    const gameboard = document.getElementById("gameboard");
	const boardArray = [];
    const squares = 3;
    let indexNum = 1;

	return {
		createBoard: function() {
			for (let i = 0; i < squares; i++) {

				const row = document.createElement("div");
				row.classList.add("row");
				gameboard.appendChild(row);

				for (let j = 0; j < squares; j++) {
					const box = document.createElement("div");
                    box.setAttribute('id', indexNum);
					box.classList.add("box", "gameText");
					
					row.appendChild(box);                    
                    boardArray.push(box);

                    if (indexNum < 9) {
                        indexNum++;
                    } else {
                        indexNum = 1;
                    }

                }
 
			}

		}     
	};

})();


// Gameplay module

const round = ( function() {
    'use strict';

    const turn = document.getElementById("turn"); 
    let livePlayer = {};
    let turnCount = 1;
    let gameIni = false;
    let gameActive = false;

    function _rollInitiative () {
        let ini = Math.random()*100;
        let roll = {};

        if (ini < 50) {
            roll = playerOne;
        } else if (ini >= 50) {
            roll = playerTwo;
        }

        return roll;

    }

    function _startGame () {
        const startButton = document.getElementById("game");
        const p1 = document.getElementById("p1");
        const p2 = document.getElementById("p2");      
    
        startButton.addEventListener("click", function() {
            while (gameboard.firstChild) {
                gameboard.removeChild(gameboard.firstChild);
            }
                
            board.createBoard();

            turnCount = 1;

            turn.textContent = "[        ]";

            playerOne.name = prompt("Player One, please enter your name:");
            playerTwo.name = prompt("Player Two, please enter your name:");
    
            p1.textContent = playerOne.name;
            p2.textContent = playerTwo.name;

            livePlayer = _rollInitiative();

            turn.textContent = `[    ${livePlayer.name} goes first!    ]`;

            gameIni = true;
            gameActive = true;

            round.playerTurn();
    
        });
      
    }

    function _isWinner () {
        const winnersObject = (x, y, z) => {
            const a = document.getElementById(x);
            const b = document.getElementById(y);
            const c = document.getElementById(z);

            return {a, b, c};

        };
        
        const one = winnersObject(1, 2, 3);
        const two = winnersObject(4, 5, 6);
        const three = winnersObject(7, 8, 9);
        const four = winnersObject(1, 4, 7);
        const five = winnersObject(2, 5, 8);
        const six = winnersObject(3, 6, 9);
        const seven = winnersObject(1, 5, 9);
        const eight = winnersObject(3, 5, 7);
        
        const winners = [one, two, three, four, five, six, seven, eight];

        for (let i = 0; i < 8; i++) {
            if (winners[i].a.textContent === "X" && winners[i].b.textContent === "X" && winners[i].c.textContent === "X") {
                winners[i].a.classList.add("winStyle");
                winners[i].b.classList.add("winStyle");
                winners[i].c.classList.add("winStyle");
                return true;
            } else if (winners[i].a.textContent === "O" && winners[i].b.textContent === "O" && winners[i].c.textContent === "O") {
                winners[i].a.classList.add("winStyle");
                winners[i].b.classList.add("winStyle");
                winners[i].c.classList.add("winStyle");
                return true;
            }
        }

    }

    function _boxValue (x, y) {
        if (y === true) {
            turn.textContent = "[    Game over. Select 'Start New Game' to play again.    ]";

        } else {    
            x.textContent = livePlayer.symbol; 

            turnCount++;

            if (livePlayer === playerOne) {
                livePlayer = playerTwo;
            } else if (livePlayer === playerTwo) {
                livePlayer = playerOne;
            }

            round.playerTurn();

        }

    }

    function _boardSpec(x) {
        for (let l = 1; l <= 9; l++) {
            const box = document.getElementById(l);
            
            if (x === true) {
                turn.textContent = `[    ${livePlayer} wins! Select 'Start New Game' to play again.   ]`;

            } else if (box.textContent != 'X' && box.textContent != 'O') {
                box.addEventListener("click", function () {  
                        _boxValue(box, x);
                        turn.textContent = `[    Turn ${turnCount}: ${livePlayer.name}    ]`;
                });

            } else {
                box.addEventListener("click", function () {
                    turn.textContent = "Invalid move. Please select another square.";
                });

            }
        }
    }

    return {
        playerTurn: function() {
            if (gameIni === false) {
                _startGame();
            }

            let victor = _isWinner();

            if (victor === true) {
                if (livePlayer === playerOne) {
                    livePlayer = playerTwo;
                } else if (livePlayer === playerTwo) {
                    livePlayer = playerOne;
                }

                turn.textContent = `[    ${livePlayer} wins! Select 'Start New Game' to play again.   ]`;

                alert(`${livePlayer.name} wins!`);
                alert("Game over. Select 'Start New Game' to play again.");
                gameActive = false;

            } else if (turnCount > 9) {
                turn.textContent = "[    Tie. Select 'Start New Game' to play again.    }";
                gameActive = false;

            }

            for (let k = 1; k <= 9; k++) {
                const oldBox = document.getElementById(k);
                const newBox = oldBox.cloneNode(true);

                if(oldBox.textContent != 'X' && oldBox.textContent != 'O') {
                    oldBox.parentNode.replaceChild(newBox, oldBox);
                }
    
            }

            if (gameActive === true) {
                _boardSpec(victor);

            }              
           
        }
    };

})();


// Play game

board.createBoard();
round.playerTurn();
