const color = {
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'darkblue',
    5: 'brown',
    6: 'aqua',
    7: 'black',
    8: 'white'
}

const size = {
    0: 'Easy',
    1: 'Medium',
    2: 'Hard'
}

let cells = [];
let mine = [];
let count = [];
let bomb = [];
let move, time, t;
let n = 10;
let countBomb = 10;
let leave = 0;
let countFlag = 0;
let bombFlag = 0;

let divMain = document.createElement('main');
divMain.className = 'main';
document.body.appendChild(divMain);

let popup = document.createElement('div');
popup.className = 'popup';
divMain.appendChild(popup);

let divMean = document.createElement('div');
divMean.className = 'mean open';
divMain.appendChild(divMean);

let setting = document.createElement('button');
setting.className = 'setting';
setting.innerHTML = '&#128736;';
divMean.appendChild(setting);

let divCountBomb = document.createElement('div');
divCountBomb.className = 'count-bomb';
divCountBomb.innerHTML = 'Bomb: ' + n;
divMean.appendChild(divCountBomb);

let divCountFlag = document.createElement('div');
divCountFlag.className = 'count-flag';
divCountFlag.innerHTML = 'Flag: ' + countBomb;
divMean.appendChild(divCountFlag);

let divMove = document.createElement('div');
divMove.className = 'move';
divMove.innerHTML = 0;
divMean.appendChild(divMove);

let divTime = document.createElement('div');
divTime.className = 'time';
divTime.innerHTML = 0;
divMean.appendChild(divTime);

let newGameButton = document.createElement('button');
newGameButton.className = 'new-game-button';
newGameButton.innerHTML = 'New game';
divMean.appendChild(newGameButton);

let divField = document.createElement('div');
divField.className = 'field';
divMain.appendChild(divField);




let divChangeSize = document.createElement('div');
divChangeSize.className = 'size';
popup.appendChild(divChangeSize);

let selectSize = document.createElement('p');
selectSize.innerHTML = 'Level';
divChangeSize.appendChild(selectSize);

let inputNumber = document.createElement('div');
inputNumber.className = 'input-level';
divChangeSize.appendChild(inputNumber);

for (let i = 0; i < 3; i++) {
    let input = document.createElement('input');
    input.type = 'radio';
    input.id = 'size' + i;
    input.name = 'sizechange';
    input.className = 'radio-change';
    let label = document.createElement('label');
    label.for = 'size' + i;
    label.innerHTML = size[i];
    label.className = 'sizelabel' + i;
    inputNumber.appendChild(input);
    inputNumber.appendChild(label);
}
document.querySelector('#size0').checked = true;

let divChangeBomb = document.createElement('div');
divChangeBomb.className = 'bomb';
popup.appendChild(divChangeBomb);

let selectBomb = document.createElement('p');
selectBomb.innerHTML = 'Bombs';
divChangeBomb.appendChild(selectBomb);

let number = document.createElement('input');
number.type = 'number';
number.className = 'input-count-bomb';
number.min = 10;
number.max = 99;
number.value = 10;
number.name = 'number';
divChangeBomb.appendChild(number);

let divChangeTheme = document.createElement('div');
divChangeTheme.className = 'theme';
popup.appendChild(divChangeTheme);

let selectTheme = document.createElement('p');
selectTheme.innerHTML = 'Theme';
divChangeTheme.appendChild(selectTheme);

let inputTheme = document.createElement('div');
inputTheme.className = 'input-theme';
divChangeTheme.appendChild(inputTheme);

let theme1 = document.createElement('input');
theme1.type = 'radio';
theme1.id = 'theme-dark';
theme1.name = 'themechange';
theme1.className = 'radio-change-theme';
let label = document.createElement('label');
label.for = 'theme-dark';
label.innerHTML = 'Dark';
label.className = 'theme-dark';
inputTheme.appendChild(theme1);
inputTheme.appendChild(label);

theme1.checked = true;

let theme2 = document.createElement('input');
theme2.type = 'radio';
theme2.id = 'theme-light';
theme2.name = 'themechange';
theme2.className = 'radio-change-theme';
let label2 = document.createElement('label');
label2.for = 'theme-light';
label2.innerHTML = 'Light';
label2.className = 'theme-light';
inputTheme.appendChild(theme2);
inputTheme.appendChild(label2);

let closePopup = document.createElement('div');
closePopup.className = 'close';
popup.appendChild(closePopup);

let closeButton = document.createElement('button');
closeButton.className = 'close-button';
closeButton.innerHTML = '&#10008;';
closePopup.appendChild(closeButton);

let newSet = document.createElement('button');
newSet.className = 'new-set-button';
newSet.innerHTML = 'Save';
closePopup.appendChild(newSet);

createCell();
newGame();

newGameButton.addEventListener('click', newGame);

setting.addEventListener('click', () => {
    popup.classList.add('open');
    divMean.classList.remove('open');
});

closeButton.addEventListener('click', () => {
    popup.classList.remove('open');
    divMean.classList.add('open');
});

newSet.addEventListener('click', () => {
    popup.classList.remove('open');
    divMean.classList.add('open');
    const radio = document.querySelectorAll('.radio-change');
    const theme = document.querySelectorAll('.radio-change-theme');
    const cell = document.querySelectorAll('.cell');
    countBomb = number.value;
    if (countBomb > 99) {
        countBomb = 99;
        number.value = 99;
    }
    if (countBomb < 10) {
        countBomb = 10;
        number.value = 10;
    }
    for (let i = 0; i < radio.length; i++)
        if (radio[i].checked) {
            if (i === 0) n = 10;
            if (i === 1) n = 15;
            if (i === 2) n = 25;
        }

    divCountBomb.innerHTML = 'Bomb: ' + countBomb;
    divCountFlag.innerHTML = 'Flag: ' + countBomb;

    for (let i = 0; i < cell.length; i++)
        divField.removeChild(cell[i]);

    createCell();
    newGame();

    let elements = divMain.getElementsByTagName('*');

    for (let i = 0; i < theme.length; i++) {
        if (theme[i].checked) {
            if (i !== 0) {
                for (let i = 0; i < elements.length; i++)
                    elements[i].classList.add('light');
            }
            else {
                for (let i = 0; i < elements.length; i++)
                    elements[i].classList.remove('light');
            }
        }
    }
});


function createCell() {
    cells = [];
    for (let i = 0; i < n; i++) {
        let arr = [];
        for (let j = 0; j < n; j++) {
            let cell = document.createElement('button');
            cell.className = 'cell';
            cell.id = 'i' + i + 'j' + j;
            divField.appendChild(cell);
            arr.push(cell)
        }
        cells.push(arr)
    }
    divField.style.width = 50 * n + 'px';
}



function timer() {
    t = setTimeout(() => {
        time++;
        divTime.innerHTML = 'Time: ' + time;
        timer();
    }, 1000);
}


function newGame() {
    clearTimeout(t);
    leave = 0;
    countFlag = 0;
    bombFlag = 0;
    move = 0;
    time = 0;
    divTime.innerHTML = 'Time: ' + 0;
    divMove.innerHTML = 'Move: ' + 0;
    divCountFlag.innerHTML = 'Flag: ' + countBomb;
    for (let i = 0; i < cells[0].length; i++) {
        for (let j = 0; j < cells[0].length; j++) {
            cells[i][j].classList.remove('check');
            cells[i][j].classList.remove('flag');
            cells[i][j].innerHTML = '';
            cells[i][j].removeEventListener('click', game);
            cells[i][j].removeEventListener('contextmenu', flag);
            cells[i][j].addEventListener('click', createBomb);
            cells[i][j].addEventListener('click', game);
        }
    }
}


function flag() {
    event.preventDefault();
    let str = event.currentTarget.id;
    let a = Number(str.slice(1, str.indexOf('j')));
    let b = Number(str.slice(str.indexOf('j') + 1));
    divMove.innerHTML = 'Move: ' + move;
    if (!cells[a][b].classList.contains('flag')) {
            countFlag++;
            divCountFlag.innerHTML = 'Flag: ' + (countBomb - countFlag);
            cells[a][b].innerHTML = '&#128681;';
            cells[a][b].classList.add('flag');
            cells[a][b].removeEventListener('click', game);
            if (bomb[a][b] === 1) bombFlag++;
    }
    else {
        cells[a][b].classList.remove('flag');
        cells[a][b].innerHTML = '';
        cells[a][b].addEventListener('click', game);
        countFlag--;
        divCountFlag.innerHTML = 'Flag: ' + (countBomb - countFlag);
        if (bomb[a][b] === 1) bombFlag--;
    }
    if (leave + bombFlag === n * n) {
        alert(`Hooray! You found all mines in ${time} seconds and ${move} moves`);
        clearTimeout(t);
    }
}



function endGame() {
    clearTimeout(t);
    for (let i = 0; i < cells[0].length; i++) {
        for (let j = 0; j < cells[0].length; j++) {
            cells[i][j].removeEventListener('click', game);
            cells[i][j].removeEventListener('contextmenu', flag);
            if (mine[i][j] === 1) {
                cells[i][j].innerHTML = '&#128163;';
                cells[i][j].classList.add('check');
                cells[i][j].classList.remove('flag');
            }
        }
    }
}


function game() {
    let str = event.currentTarget.id;
    let a = Number(str.slice(1, str.indexOf('j')));
    let b = Number(str.slice(str.indexOf('j') + 1));
    move++;
    divMove.innerHTML = 'Move: ' + move;
    if (mine[a][b] === 1) {
        alert('Game over. Try again');
        endGame();
    }
    else {
        gameHeight(a, b);
        gameWidth(a, b);
        leave = document.querySelectorAll('.check').length;
        if (leave === n * n - countBomb) {
            alert(`Hooray! You found all mines in ${time} seconds and ${move} moves`);
            clearTimeout(t);
        }
    }
}


function gameHeight(a, b) {
    let x3, x4;
    if (bomb[a][b] === 10) bomb[a][b] = 0;
    for (let i = a; i >= 0; i--) {
        if (bomb[i][b] === 1) {
            x3 = i + 1;
            i = -1;
        }
        else
            if (bomb[i][b] === 10) {
                x3 = i;
                i = -1;
            }
    }
    for (let i = a; i < n; i++) {
        if (bomb[i][b] === 1) {
            x4 = i - 1;
            i = n;
        }
        else
            if (bomb[i][b] === 10) {
                x4 = i;
                i = n;
            }
    }

    if (typeof x3 === 'undefined') x3 = 0;
    if (typeof x4 === 'undefined') x4 = (n - 1);
    if (bomb[a][b] === 0) bomb[a][b] = 10;

    for (let i = x3; i <= x4; i++) {
        cells[i][b].removeEventListener('click', game);
        cells[i][b].removeEventListener('contextmenu', flag);
        cells[i][b].classList.add('check');
        if (cells[i][b].classList.contains('flag')) {
            cells[i][b].classList.remove('flag');
            countFlag--;
            divCountFlag.innerHTML = 'Flag: ' + (countBomb - countFlag);
            cells[i][b].innerHTML = '';
        }

        if (bomb[i][b] === 0)  gameWidth(i, b);
    }

    setColorAndCount(x3, b);
    setColorAndCount(x4, b);
}

function gameWidth(a, b) {
    let x1, x2;
    if (bomb[a][b] === 10) bomb[a][b] = 0;
    for (let i = b; i >= 0; i--) {
        if (bomb[a][i] === 1) {
            x1 = i + 1;
            i = -1;
        }
        else if (bomb[a][i] === 10) {
            x1 = i;
            i = -1;
        }
    }
    for (let i = b; i < n; i++) {
        if (bomb[a][i] === 1) {
            x2 = i - 1;
            i = n;
        }
        else if (bomb[a][i] === 10) {
            x2 = i;
            i = n;
        }
    }
    if (typeof x1 === 'undefined') x1 = 0;
    if (typeof x2 === 'undefined') x2 = (n - 1);
    if (bomb[a][b] === 0) bomb[a][b] = 10;
    
    for (let i = x1; i <= x2; i++) {
        cells[a][i].removeEventListener('click', game);
        cells[a][i].removeEventListener('contextmenu', flag);
        cells[a][i].classList.add('check');
        if (cells[a][i].classList.contains('flag')) {
            cells[a][i].classList.remove('flag');
            countFlag--;
            divCountFlag.innerHTML = 'Flag: ' + (countBomb - countFlag);
            cells[a][i].innerHTML = '';
        }

        if (bomb[a][i] === 0) gameHeight(a, i);
    }

    setColorAndCount(a, x1);
    setColorAndCount(a, x2);
}


function setColorAndCount(a, b) {
    if (countMine(a, b) !== 0) {
        cells[a][b].innerHTML = countMine(a, b);
        cells[a][b].style.color = color[countMine(a, b)];
    }
}

function countMine(a, b) {
    let count = 0;
    if (b !== 0 && mine[a][b - 1] === 1) count++;
    if (b !== (n - 1) && mine[a][b + 1] === 1) count++;
    if (b !== 0 && a !== (n - 1) && mine[a + 1][b - 1] === 1) count++;
    if (a !== (n - 1) && mine[a + 1][b] === 1) count++;
    if (a !== (n - 1) && b !== (n - 1) && mine[a + 1][b + 1] === 1) count++;
    if (b !== 0 && a !== 0 && mine[a - 1][b - 1] === 1) count++;
    if (a !== 0 && mine[a - 1][b] === 1) count++;
    if (a !== 0 && b !== (n - 1) && mine[a - 1][b + 1] === 1) count++;
    return count;
}

function createBomb() {
    for (let i = 0; i < cells[0].length; i++) {
        for (let j = 0; j < cells[0].length; j++) {
            cells[i][j].removeEventListener('click', createBomb);
            cells[i][j].addEventListener('contextmenu', flag);
        }
    }

    let mineArray = [];
    mine = [];
    bomb = [];
    count = [];
    while (mineArray.length < countBomb) mineArray.push(1);
    while (mineArray.length < n * n) {
        mineArray.push(0);
    }
    mineArray.sort(() => Math.random() - 0.5);
    for (let i = 0; i < n * n; i += n) {
        let arr = [];
        for (let j = i; j < i + n; j++) {
            arr.push(mineArray[j])
        }
        mine.push(arr)
    }

    let str = event.currentTarget.id;
    let a = Number(str.slice(1, str.indexOf('j')));
    let b = Number(str.slice(str.indexOf('j') + 1));
    while (mine[a][b] !== 0) createBomb();

    if (mine[a][b] === 0)
        computeCountBomb();
}


function computeCountBomb() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (mine[i][j] !== 1) {
                if (countMine(i, j) !== 0)
                    count.push(10)
                else
                    count.push(0);
            }
            else
                count.push(1);
        }
    }

    for (let i = 0; i < n * n; i += n) {
        let arr = [];
        for (let j = i; j < i + n; j++)
            arr.push(count[j])
        bomb.push(arr)
    }
    timer();
}
