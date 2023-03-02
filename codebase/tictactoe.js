let vakjes = [] // collection of table details
let gameactive = false
let currSymbol = "X"
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

        row.appendChild(cell) // add row to DOM
        vakjes.push(cell) // adds cells to #vakjes
    }

    document.querySelector('#bord').appendChild(row)  // selects css of bord
}

document.querySelectorAll('.symbolfactory span').forEach(symbol => {
    symbol.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('symbol', symbol.innerText)
    })
})

vakjes.forEach(vakje => {
    vakje.addEventListener('dragover', (e) => e.preventDefault())
    vakje.addEventListener('drop', (e) => dropTicOfTac(e))
})

musicPlayer()

function musicPlayer() {
    music.volume = 0.15
    music.play()
}

function dropTicOfTac(event) {
    let symbol = event.dataTransfer.getData('symbol')
    let cell = event.target
    music.play()
    if (currSymbol != symbol) {
        alert(`The current player is ${currSymbol} but you tried to place ${symbol}`)
        return
    }

    if (!validateMove(cell)) {
        alert("You are not allowed to place a move here")
        return
    }

    cell.innerText = symbol

    if (currSymbol == "X") {
        currSymbol = "O"
    } else {
        currSymbol = "X"
    }

    let hasWinnerResult = hasWinner()

    if (hasWinnerResult != null) {
        colorIn(hasWinnerResult[0])
        setWinMessage(hasWinnerResult[1])
    }
}

function validateMove(square) {
    return square.innerText == "" ? true : false
}

function hasWinner() {
    for (i = 0; i < winningConditions.length; i++) {
        t = winningConditions[i]
        let result = checkSequence(t)
        
        if (result == null) {
            continue
        } else {
            return [t, result]
        }
    }
}

function checkSequence(t) {
    if (vakjes[t[0]].innerText == "X" && vakjes[t[1]].innerText == "X" && vakjes[t[2]].innerText == "X") {
        return "X"
    } else if (vakjes[t[0]].innerText == "O" && vakjes[t[1]].innerText == "O" && vakjes[t[2]].innerText == "O") {
        return "O"
    }
}

function colorIn(sequence) {
    for (i = 0; i < sequence.length; i++) {
        vakjes[sequence[i]].style.backgroundColor = "red"
    }
}

function setWinMessage(winner) {
    document.querySelector('.winnermessage span').innerHTML = `Congratiulations ${winner} has won the game!`
}
