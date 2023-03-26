const player = (name, mark) => {
    return {name, mark}
}



const game = (() => {

    player1 = prompt("Player One Name")
    player2 = prompt("Player Two Name")

    playerOne = player(player1, "X")
    playerTwo = player(player2, "O")

    const cells = document.querySelectorAll('.cell')
    const text = document.querySelector('.players_turn')
    const resBtn = document.querySelector('.rBtn')

    const winningCombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    let select = ["", "", "", "", "", "", "", "", ""]
    let activePlayer = playerOne.mark
    let players = playerOne.name
    let active = false
    start()


    function start() {
        cells.forEach(cell => cell.addEventListener('click', clickOnCell))
        resBtn.addEventListener('click', restart)
        text.textContent = `${players} turn now`
        active = true
    }

    
    function clickOnCell() {
        const value = this.dataset.value
        if(select[value]!= "" || !active){
            return
        }
        addContent(this, value)
        isHeWinner()
    }


    function addContent(cell, value) {
        select[value] = players
        cell.innerHTML = activePlayer
    }


    function isHeWinner() {
        let won = false
        let i 
        for(i = 0; i < winningCombo.length; i++) {
            let state = winningCombo[i]
            let cell_1 = select[state[0]]
            let cell_2 = select[state[1]]
            let cell_3 = select[state[2]]
            if(cell_1 == "" || cell_2 == "" || cell_3 == "") {
                continue
            }
            if(cell_1 == cell_2 && cell_2 == cell_3) {
                won = true
            }
        }

        if(won) {
            text.textContent = `${players} is winner`
            active = false
        } else if(!select.includes("")){
            text.textContent = 'Draw'
        } else {
            nextPlayer()
        }
    }


    function nextPlayer() {
        players = (players == playerOne.name) ? playerTwo.name : playerOne.name
        activePlayer = (activePlayer == playerOne.mark) ? playerTwo.mark : playerOne.mark
        text.textContent = `${players} turn now`
    }


    function restart() {
        select = ["", "", "", "", "", "", "", "", ""]
        activePlayer = playerOne.mark
        players = playerOne.name
        active = true
        text.textContent = `${players} turn now`

        cells.forEach(cell => cell.innerHTML = "")
    }
})();
