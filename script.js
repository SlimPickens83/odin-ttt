// Player objects

const player = (id, name, symbol) => {
    return{id, name, symbol};
 }
 
const playerOne = player("player1", "input1", 'X');
const playerTwo = player("player2", "input2", 'O');
let playerSelect;
let turnCount = 1;

// Gameboard module

const board = ( function() {
	'use strict';

	return {
		createBoard: function() {
			const gameboard = document.getElementById("gameboard");
			const boardArray = [];
            const squares = 3;
            let indexNum = 1;

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

    let livePlayer = {};

    function _rollInitiative () {
        let ini = Math.random()*100;
        let roll;

        if (ini < 50) {
            roll = 1;
        } else if (ini >= 50) {
            roll = 2;
        }

        return roll;

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

    function _boardSpec(endGame) {        

        for (let l = 1; l <= 9; l++) {
            const box = document.getElementById(l);

            if (box.textContent != 'X' && box.textContent != '0') {
                box.addEventListener("click", function () {   
                        _boxValue(box, endGame);
                });

            } else {
                if (endGame === true) {
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
            // const gameboard = document.getElementById("gameboard");
            let victor = _isWinner();
            if (turnCount > 3) {
                console.log(`_isWinner: ${_isWinner()}`);
                console.log(`victor: ${victor}`);
            }

            if (turnCount === 1) {
                playerSelect = _rollInitiative();
            } else if (turnCount > 1) {
                if (playerSelect === 1) {
                    playerSelect = 2;
                } else if (playerSelect === 2) {
                    playerSelect = 1;
                }
            }

            if (playerSelect === 1) {
	            livePlayer = playerOne;
            } else if (playerSelect === 2) {
	            livePlayer = playerTwo;
            }      

            if (victor === true) {
                alert(`${livePlayer.name} wins!`);
                alert("Game over. Please refresh and play again.");

                // while (gameboard.firstChild) {
                //     gameboard.removeChild(gameboard.firstChild);
                //     }
            
                // board.createBoard();
            }

            for (let k = 1; k <= 9; k++) {
                const oldBox = document.getElementById(k);
                const newBox = oldBox.cloneNode(true);

                if(oldBox.textContent != 'X' && oldBox.textContent != 'O') {
                    oldBox.parentNode.replaceChild(newBox, oldBox);
                }
    
            }

            _boardSpec();            
           
        }
    };

})();


// Play game
if (turnCount === 1) {
    board.createBoard();
    round.playerTurn();
}