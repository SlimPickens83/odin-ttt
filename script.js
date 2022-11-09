const gameboard = document.getElementById("gameboard");
const squares = 3;


for (let i = 0; i < squares; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    gameboard.appendChild(row);

    for (let i = 0; i < squares; i++) {
        const box = document.createElement("div");        
        box.classList.add("box", "gameText");
        box.addEventListener("click", function(){
            box.textContent = "X";
        });

        row.appendChild(box);        

    }
   
}