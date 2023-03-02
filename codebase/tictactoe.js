let vakjes = [] // collection of table details
let gameactive = false
let currsymbol = "X"
let music = new Audio('musicbackground.mp3')
music.loop = true

let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

for (let x = 0; x < 3; x++) {
    // columns
    let row = document.createElement("tr") // generates rows
    for (let y = 0; y < 3; y++) {
        // rows 
        let cell = document.createElement('td') //create the row
        
        cell.style.backgroundColor = (x % 2 !== y % 2) ? "grey" : "lightgrey"

        row.appendChild(cell); // add row to DOM
        vakjes.push(cell); // adds cells to #vakjes
    }

    document.querySelector('#bord').appendChild(row);  // selects css of bord
}

document.querySelectorAll('.symbolfactory span').forEach(symbol => {
    symbol.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('symbol', symbol.innerText);
    })
})

vakjes.forEach(vakje => {
    vakje.addEventListener('dragover', (e) => e.preventDefault());
    vakje.addEventListener('drop', (e) => dropTicOfTac(e));
})

musicPlayer();

function musicPlayer() { // functions should be either camalCase
    music.volume = 0.15;
    music.play();
    setTimeout(() => {
        music.play();
    }, 500);
}

function dropTicOfTac(event) {
    let symbol = event.dataTransfer.getData('symbol');
    let cell = event.target;
    music.play();
    if (currsymbol != symbol) {
        alert(`The current player is ${currsymbol} but you tried to place ${symbol}`);
        return;
    }

    if (!validatemove(cell)) {
        alert("You are not allowed to place a move here");
        return;
    }

    cell.innerText = symbol;

    if (currsymbol == "X") {
        currsymbol = "O";
    } else {
        currsymbol = "X";
    }

    let haswinnerresult = haswinner();

    if (haswinnerresult != null) {
        colorin(haswinnerresult[0]);
        setwinmessage(haswinnerresult[1])
    }
}

function validatemove(square) {
    return square.innerText == "" ? true : false;
}

function haswinner() {
    for (i = 0; i < winningConditions.length; i++) {
        t = winningConditions[i];
        let result = checksequence(t);
        if (result == null) {
            continue;
        }
        else {
            return [t, result]
        }
    }
}

function checksequence(t) {
    if (vakjes[t[0]].innerText == "X" && vakjes[t[1]].innerText == "X" && vakjes[t[2]].innerText == "X") {
        return "X"
    }

    if (vakjes[t[0]].innerText == "O" && vakjes[t[1]].innerText == "O" && vakjes[t[2]].innerText == "O") {
        return "O"
    } else {
        return
    }
}

function colorin(sequence) {
    for (i = 0; i < sequence.length; i++) {
        vakjes[sequence[i]].style.backgroundColor = "red";
    }
}

function setwinmessage(winner) {
    document.querySelector('.winnermessage span').innerHTML = `Congratiulations ${winner} has won the game!`;
}
