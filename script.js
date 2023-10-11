document.addEventListener('DOMContentLoaded', function() {
    const area = document.querySelector('#area');
    const currentPlayer = document.getElementById('curPlyr');
    let player = 'x';

    const stat = {
        'x': 0,
        'o': 0,
        'd': 0
    };

    const winIndex = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    for (let i = 1; i < 10; i++) {
        area.innerHTML += "<div class='cell' pos=" + i + "></div>";
    }

    const cell = document.querySelectorAll('.cell');

    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener('click', cellClick, false);
    }

    function cellClick() {

        var data = [];
        
        if(!this.innerHTML) {
            this.innerHTML = player;
            this.classList.add(player);
        }else {
            alert("Ячейка занята");
            return;
        }
    
        for(var i in cell){
            if(cell[i].innerHTML == player){
                data.push(parseInt(cell[i].getAttribute('pos')));
            }
        }
    
        if(checkWin(data)) {
            stat[player] += 1;
            restart("Выграл: " + player);
        }else {
            var draw = true;
            for(var i in cell) {
                if(cell[i].innerHTML == '') draw = false;
            }
            if(draw) {
                stat.d += 1;
                restart("Ничья");
            }
        }
    
        player = player == "x" ? "o" : "x";
        currentPlayer.innerHTML = player.toUpperCase();
    }
    
    

    function checkWin(data) {
        for (let i in winIndex) {
            let win = true;
            for (let j in winIndex[i]) {
                const id = winIndex[i][j];
                const ind = data.indexOf(id);

                if (ind === -1) {
                    win = false;
                }
            }

            if (win) return true;
        }
        return false;
    }

    function restart(text) {
        alert(text);
        for (let i = 0; i < cell.length; i++) {
            cell[i].innerHTML = '';
        }
        updateStat();

        currentPlayer.textContent = 'X';
    }

    function updateStat() {
        document.getElementById('sX').innerHTML = stat.x;
        document.getElementById('sO').innerHTML = stat.o;
        document.getElementById('sD').innerHTML = stat.d;
    }
});
