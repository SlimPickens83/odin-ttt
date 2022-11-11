// Player objects

const player = (id, name, symbol) => {
    return{id, name, symbol};
 }
 
const playerOne = player(1, "input1", 'X');
const playerTwo = player(2, "input2", 'O');
let livePlayer;


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
					box.addEventListener("click", function(){
						box.textContent = 'X';
					});

					row.appendChild(box);
                    
                    boardArray.push(box);

                        console.log(`indexNum: ${indexNum}`);
                    indexNum++;
                        console.log(`indexNum after increment: ${indexNum}`);

                        console.log(i);

                }

                if (i === 2) {
                    console.log(boardArray);
                }
			}
		}
	};
})();


// Gameplay module

const round = ( function() {
    'use strict';

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

    function _winState (x) {
        if (x.a.textContent === "X" && x.b.textContent === "X" && x.c.textContent === "X") {
            return true;
        } else if (x.a.textContent === "O" && x.b.textContent === "O" && x.c.textContent === "O") {
            return true;
        }
    }

    function _findOut () {
        for (i = 0; i < 9; i++) {
                  won = _winState(winners[i]);
                  if (won === true) {
                      console.log(`${winners[i]} is a winner`);
                  }
              }
      }

    function _isWinner () {
        let i;

        const winnersObject = (a, b, c) => {
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
        let won = false;

        for (i = 0; i < 9; i++) {
            won = _findOut(winners[i]);
            if (won === true) {
                break;
            }
        }

        return won;

    }

    function _boardSpec() {
        let k;
        let turn = 0;

        for (k = 1; k <= 9; k++) {
            const box = document.getElementById(k);
            let result = false;
            let winningPlayer = "undecided";

            box.addEventListener("click", function(){
                box.textContent = livePlayer.symbol;

                if (turn >= 3) {
                    result = _isWinner();
                        console.log(`result: ${result}`);
                } else if (turn < 3 || result === false) {
                        console.log(`result: ${result}`);
                    turn++;
                    return turn;
                }
                
                if (result === true) {
                    winningPlayer = livePlayer;
                        console.log(`winningPlayer: ${winningPlayer}`);
                    alert(`${winningPlayer} wins!`);
                    board.createBoard();
                }
                           
            });
        }
    }

    return {
        playerTurn: function() {
            let turnCount = 1;
            let playerSelect = _rollInitiative();

            _boardSpec();
            
            if (turnCount === 1) {
                if (playerSelect === 1) {
                    livePlayer = playerOne;
                } else if (playerSelect === 2) {
                    livePlayer = playerTwo;
                }

                turnCount = _boardSpec();

            } else if (livePlayer === playerOne) {   
                livePlayer = playerTwo;

                turnCount = _boardSpec();

            } else if (livePlayer === playerTwo) {
                livePlayer = playerOne;

                turnCount = _boardSpec();

            }
        }
    };
})();


// Play game

board.createBoard();
round.playerTurn();