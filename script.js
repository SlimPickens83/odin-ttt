// Player objects

const player = (id, name, symbol) => {
    return{id, name, symbol};
 }
 
const playerOne = player("player1", "input", 'X');
const playerTwo = player("player2", "input", 'O');

// Start button module

// const startGame = ( function() {
//     return {
//         createPlayers: function() {
//             const startButton = document.getElementById("game");
//             const p1 = document.getElementById("p1");
//             const p2 = document.getElementById("p2");

//             startButton.addEventListener("click", function() {
//                 playerOne.name = prompt("Player One, please enter your name:");
//                 playerTwo.name = prompt("Player Two, please enter your name:");

//                 p1.textContent = playerOne.name;
//                 p2.textContent = playerTwo.name;

//             });
//         }
//     }   
// })();


// Gameboard module

const board = ( function() {
	'use strict';

    const gameboard = document.getElementById("gameboard");
    const button = document.getElementById("reset");
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

                    indexNum++;

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

            turn.textContent = "[        ]";

            playerOne.name = prompt("Player One, please enter your name:");
            playerTwo.name = prompt("Player Two, please enter your name:");
    
            p1.textContent = playerOne.name;
            p2.textContent = playerTwo.name;

            livePlayer = _rollInitiative();

            turn.textContent = `[    ${livePlayer.name} goes first!    ]`;
    
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
                return true;
            } else if (winners[i].a.textContent === "O" && winners[i].b.textContent === "O" && winners[i].c.textContent === "O") {
                return true;
            }
        }

    }

    function _boxValue (x, y) {
            x.textContent = livePlayer.symbol;      

            if (y === true) {
                alert("Game over. Please refresh and play again.");
            } else {    
                turnCount++;
                round.playerTurn();
            }

    }

    function _boardSpec(victor) { 

        for (let l = 1; l <= 9; l++) {
            const box = document.getElementById(l);   

            if (box.textContent != 'X' && box.textContent != '0') {
                box.addEventListener("click", function () {   
                        _boxValue(box, victor);
                        turn.textContent = `[    Turn ${turnCount}: ${livePlayer}    ]`;
                });

            } else {
                if (victor === true) {
                    turn.textContent = `[    ${livePlayer} wins!    ]`;
                    alert("Game over. Please refresh and play again.");
                } else {
                    box.addEventListener("click", function () {
                        alert("Invalid move. Please select another square.");
                    });
                }

            }

        }
    }

    return {
        playerTurn: function() {
            let victor = _isWinner();

            if (turnCount > 3) {
                console.log(`_isWinner: ${_isWinner()}`);
                console.log(`victor: ${victor}`);

            }

            if (turnCount === 1) {
                _startGame();

            } else if (turnCount > 1) {
                if (livePlayer === playerOne) {
                    livePlayer = playerTwo;
                } else if (livePlayer === playerTwo) {
                    livePlayer = playerOne;
                }

            }            

            if (victor === true) {
                alert(`${livePlayer.name} wins!`);
                alert("Game over. Select 'Start New Game' to play again.");

            }

            for (let k = 1; k <= 9; k++) {
                const oldBox = document.getElementById(k);
                const newBox = oldBox.cloneNode(true);

                if(oldBox.textContent != 'X' && oldBox.textContent != 'O') {
                    oldBox.parentNode.replaceChild(newBox, oldBox);
                }
    
            }

            _boardSpec(victor);            
           
        }
    };

})();


// Play game

board.createBoard();
round.playerTurn();
