const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');
const username1 = document.querySelector('.button1');
const username2 = document.querySelector('.button2');
const inputData1 = document.querySelector('.input1');
const inputData2 = document.querySelector('.input2');
const playerUsername1 = document.querySelector('.username1');
const playerUsername2 = document.querySelector('.username2');
const playerScore1 = document.querySelector('.scoreP1');
const playerScore2 = document.querySelector('.scoreP2');
const leaderboardDisplay = document.querySelector('.scoreboard');
const BASE_URL = 'https://crudcrud.com/api/053ebf79a96c4cb2a86ea6cfd35ad373/tictactoe/';

const xSymbol = '×';
const oSymbol = '○';

let gameIsLive = true;
let xIsNext = true;
let winner = null;


leaderboard();

//Giving the usernames to recognize
const playerIndicator1 = () => {
    playerUsername1.innerHTML = inputData1.value;
    let response = axios.get(BASE_URL)
    .then(response => {
        let playerArray = response.data;
        const user = inputData1.value;
        if (playerArray.length === 0){
            obj = {user : user, score: 0};
            axios.post(BASE_URL, obj);
            playerScore1.innerHTML = obj.score;
        }else{
            let notInArray = true;
            for (let i in playerArray){
                x = playerArray[i];
                if(x.user === inputData1.value){
                    notInArray = false;
                    playerScore1.innerHTML = x.score;
                    // calculate score and add to total score of user
                    console.log(playerArray);
                }
            }
            if(notInArray == true){
                alert(user);
                obj = {user : user, score: 0};
                axios.post(BASE_URL, obj);
                playerScore1.innerHTML = obj.score;
                console.log(playerArray);
            }
        }
    }).catch((err) => {console.log(err)});
}
const playerIndicator2 = () => {
    playerUsername2.innerHTML = inputData2.value;
    let response = axios.get(BASE_URL)
    .then(response => {
        let playerArray = response.data;
        const user = inputData2.value;
        if(playerArray.length === 0){
            obj = {user: user, score: 0};
            axios.post(BASE_URL, obj);
            playerScore2.innerHTML = obj.score;
        }else{
            let notInArray = true;
            for(let i in playerArray){
                x = playerArray[i];
                if(x.user === inputData2.value){
                    notInArray = false;
                    playerScore2.innerHTML = x.score;
                    console.log(playerArray);
                }
            }
            if(notInArray == true){
                obj = {user: user, score: 0};
                axios.post(BASE_URL, obj);
                playerScore2.innerHTML = obj.score;
                console.log(playerArray);
            }
        }
    }).catch((err) => {console.log(err)});
}
username1.addEventListener('click', playerIndicator1);
username2.addEventListener('click', playerIndicator2);


const letterToSymbol = (letter) => letter === 'x' ? xSymbol:oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    if (winner === 'x'){
        // console.log(playerUsername1)
        let response = axios.get(BASE_URL)
        .then(response => {
            let playerArray = response.data;
            for(let i in playerArray){
                let x = playerArray[i];
                if(playerUsername1.innerText === x.user){
                    x.score += 2;
                    console.log({user: x.user, score: x.score});
                    const baseurl = `${BASE_URL}` + x._id;
                    axios.put(baseurl, {user: x.user, score: x.score});
                }
            }
        }).catch((err) => {console.log(err)});
        statusDiv.innerHTML = letterToSymbol(winner) + " has won!";
    }else{
        // console.log(playerUsername2)tcs
        let response = axios.get(BASE_URL)
        .then(response => {
            let playerArray = response.data;
            for(let i in playerArray){
                let x = playerArray[i];
                if(playerUsername2.innerText === x.user){
                    x.score += 2;
                    console.log(x);
                    const baseurl = `${BASE_URL}` + x._id;
                    axios.put(baseurl, {user: x.user, score: x.score});
                }
            }
        }).catch((err) => {console.log(err)});
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
        let response = axios.get(BASE_URL)
        .then(response => {
            let playerArray = response.data;
            playerArray.forEach(element => {
                if(playerUsername1.innerText === element.user){
                    element.score += 1;
                    const baseurl = `${BASE_URL}` + element._id;
                    axios.put(baseurl, {user: element.user, score: element.score});
                }
                if(playerUsername2.innerText === element.user){
                    element.score += 1;
                    const baseurl = `${BASE_URL}` + element._id;
                    axios.put(baseurl, {user: element.user, score: element.score});
                }
            });
        }).catch((err) => {console.log(err)});
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
    leaderboard();
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


async function leaderboard(){
    const response = await axios.get(BASE_URL)
    .then(response => {
        playerArray = response.data;
        playerArray.sort(function(a,b) {
            return a.score - b.score;
        });
        playerArray.reverse();
        console.log(playerArray);
        playerArray.forEach(element => {
            let username = document.createElement('p');
            let score = document.createElement('p');
            username.innerHTML = element.user;
            score.innerHTML = element.score;
            leaderboardDisplay.append(username);
            leaderboardDisplay.append(score);
        })
    }).catch((err) => {console.log(err)});
}
