document.addEventListener('DOMContentLoaded', () => {
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
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('pos', i);
        area.appendChild(cell);
    }

    const cells = document.querySelectorAll('.cell');

    function cellClick() {
        if (!this.innerHTML) {
            this.innerHTML = player;
            this.classList.add(player);
        } else {
            alert('Ячейка занята');
            return;
        }

        const data = Array.from(cells)
            .filter(cell => cell.innerHTML === player)
            .map(cell => parseInt(cell.getAttribute('pos')));

        if (checkWin(data)) {
            stat[player] += 1;
            restart(`Выиграл: ${player}`);
        } else {
            const isDraw = Array.from(cells).every(cell => cell.innerHTML !== '');
            if (isDraw) {
                stat.d += 1;
                restart('Ничья');
            }
        }

        player = player === 'x' ? 'o' : 'x';
        currentPlayer.innerHTML = player.toUpperCase();
        currentPlayer.classList.remove('x', 'o');
        currentPlayer.classList.add(player);
    }

    cells.forEach(cell => {
        cell.addEventListener('click', cellClick);
    });

    function checkWin(data) {
        return winIndex.some(indices =>
            indices.every(index => data.includes(index))
        );
    }

    function restart(text) {
        alert(text);
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('x', 'o');
        });
        updateStat();
        currentPlayer.textContent = 'X';
    }

    function updateStat() {
        document.getElementById('sX').textContent = stat.x;
        document.getElementById('sO').textContent = stat.o;
        document.getElementById('sD').textContent = stat.d;
    }
});
