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
                    box.setAttribute('id', indexNum);        ;
					box.classList.add("box", "gameText");
					box.addEventListener("click", function(){
						box.textContent = "X";
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

board.createBoard();


// Player objects

const player = (id, name) => {
   return{id, name};
}

const playerOne = player(1, "input1");
const playerTwo = player(2, "input2");

