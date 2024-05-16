const gameInfo = document.querySelector(".game-info");
const container = document.querySelector(".tic-tac-toe");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
let count;

const winningPositions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// initialize the game
function initGame(){
    currentPlayer = "X";
    count = 0;
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{    //UI
        box.innerText = "";
        box.classList.remove("win");
    });
    newGameBtn.classList.remove("active");
    container.classList.remove("disable-clicks");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

// Event Listener
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

function handleClick(index){
    if(gameGrid[index] === ""){
        gameGrid[index] = currentPlayer;
        boxes[index].innerHTML = currentPlayer; // UI
        // swap turn
        swapTurn();
        // check win
        ifWin();
    }
}

function swapTurn(){
    currentPlayer = (currentPlayer==="X")?"O":"X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;   // UI
}

function ifWin(){
    let ans = "";
    count += 1;
    winningPositions.forEach((position)=>{
        if(gameGrid[position[0]]!=="" && gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]]){
            // get winner
            ans = gameGrid[position[0]];
            // make boxes green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    // winner
    if(ans!==""){
        gameInfo.innerText = `Winner - ${ans}`;
        newGameBtn.classList.add("active");
        container.classList.add("disable-clicks");
        return;
    }
    if(count === 9){
        gameInfo.innerText = `Game Tied`;
        newGameBtn.classList.add("active");
        container.classList.add("disable-clicks");
    }
}

// New Game
newGameBtn.addEventListener("click", initGame);