const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell')

const xSymbol = '×';
const oSymbol = '○';

let gameIsLive = true;
let xIsNext = true;
let winner = null;

const letterToSymbol = (letter) => letter === 'x' ? xSymbol:oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    if (winner === 'x'){
        statusDiv.innerHTML = letterToSymbol(winner) + " has won!";
    }else{
        statusDiv.innerHTML = "<span>" + letterToSymbol(winner) + " has won! </span>";
    }
}

function checkGameStatus(){
    const topLeft = cellDivs[0].classList[2];
    const topMiddle = cellDivs[1].classList[2];
    const topRight = cellDivs[2].classList[2];
    const middleLeft = cellDivs[3].classList[2];
    const middleMiddle = cellDivs[4].classList[2];
    const middleRight = cellDivs[5].classList[2];
    const bottomLeft = cellDivs[6].classList[2];
    const bottomMiddle = cellDivs[7].classList[2];
    const bottomRight = cellDivs[8].classList[2];

    if(topLeft && (topLeft === topMiddle && topMiddle === topRight)){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    }else if(middleLeft && (middleLeft === middleMiddle && middleMiddle === middleRight)){
        handleWin(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
    }else if(bottomLeft && (bottomLeft === bottomMiddle && bottomMiddle === bottomRight)){
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    }else if(topLeft && (topLeft === middleLeft && middleLeft === bottomLeft)){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    }else if(topMiddle && (topMiddle === middleMiddle && middleMiddle === bottomMiddle)){
        handleWin(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
    }else if(topRight && (topRight === middleRight && middleRight === bottomRight)){
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    }else if(topLeft && (topLeft === middleMiddle && middleMiddle === bottomRight)){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    }else if(topRight && (topRight === middleMiddle && middleMiddle === bottomLeft)){
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    }else if(topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
        gameIsLive = false;
        statusDiv.innerHTML = "This game is a tie";
    }else{
        xIsNext = !xIsNext;
        if (xIsNext){
            statusDiv.innerHTML = xSymbol + "'s Turn";
        }else{
            statusDiv.innerHTML = "<span>" + oSymbol + "'s Turn</span>";
        }
    }
}


const handleReset = () => {
    xIsNext = true;
    statusDiv.innerHTML = xSymbol + "'s" + " Turn";
    winner = null;
    for(var i = 0; i < cellDivs.length; i++){
        cellDivs[i].classList.remove('x');
        cellDivs[i].classList.remove('o');
        cellDivs[i].classList.remove('won');
    }
}

const cellHandler = (e) => {
    const classList = e.target.classList;
    
    if (classList[2] === 'x' || classList[2] === 'o'){
        return;
    }

    if (xIsNext){
        classList.add('x');
        checkGameStatus();
    }
    else {
        classList.add('o');
        checkGameStatus();
    }
};

resetDiv.addEventListener('click', handleReset);

for (var i = 0 ; i < cellDivs.length; i++){
    cellDivs[i].addEventListener('click', cellHandler);
}