let area = document.getElementById('area');
let cell = document.getElementsByClassName('cell');
let foxes_left = document.getElementById('foxes_left');
let games_played = document.getElementById('games_played');

let size = 9;

function createMatrix(size) {
    let numbers = new Set();
    while (true) {
        numbers.add(
            Math.floor(Math.random() * size ** 2)
        )
        if (numbers.size == size) {
            return numbers
        }
    }
}

let foxes = createMatrix(size);

let find_foxes = 0;

foxes_left.innerHTML = String(foxes.size - find_foxes);
games_played.innerHTML = String(0);

console.log(foxes);


for(let i = 0; i < size**2; i++) {
    area.innerHTML += "<div class='cell' pos=" + i + "></div>";
}


for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', cellClick, false);
}

function restart() {
    foxes = createMatrix(size);
    find_foxes = 0;
    foxes_left.innerHTML = String(foxes.size - find_foxes);
    console.log(foxes);

    for (let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = "";
    }
}

function cellClick() {

    if (this.innerHTML) {
        alert("Cell is already clicked");
        return;
    }

    const pos = Number(this.getAttribute('pos'))

    let column_index = pos % (size);
    let row_index = Math.floor(pos / (size));

    checkWin(row_index, column_index, this);
}
function rowElements(left, right, index) {
    let set = [];
    for (let i = left; i <= right; i++) {
        if (i !== index){
            set.push(i);
        }
    }
    return set;
}

function diagElements(column_index, row_index) {

    let set = []

    let maxIndex = size-1
    let index = column_index+row_index*size;


    // нисходящая диагональ
    let maxRightDownSteps = maxIndex - (column_index > row_index) ? column_index : row_index;
    let maxLeftUpSteps = (column_index > row_index) ? row_index : column_index;

    for (let i = index - maxLeftUpSteps*(size+1); i <= index + maxRightDownSteps*(size+1); i+=(size+1)) {
        if (i !== index) {
            set.push(i);
        }
    }

    // восходящая диагональ
    let maxRightUpSteps = (column_index > row_index) ? row_index : column_index;
    let maxLeftDownSteps = maxIndex - (column_index > row_index) ? column_index : row_index;

    for (let i = index - maxRightUpSteps*(size-1); i <= index + maxLeftDownSteps*(size-1); i+=(size-1)) {
        if (i !== index) {
            set.push(i);
        }
    }


    return set;
}

function columnElements(left, right, index) {
    let set = []
    for (let i = left; i <= right; i+=size) {
        if (i !== index) {
            set.push(i);
        }
    }
    return set;
}

function checkWin(row_index, column_index, that) {

    let index = column_index+row_index*size;

    if (foxes.has(index)) {
        that.innerHTML = "🦊";
        find_foxes += 1;
        foxes_left.innerHTML = String(foxes.size - find_foxes);
        return;
    }


    let row_left = row_index*size;
    let row_right = row_index*size+size-1;
    let column_top = column_index;
    let column_bottom = column_index+size*(size-1);


    let row_el = rowElements(row_left, row_right, index);
    let column_el = columnElements(column_top, column_bottom, index);
    let diag_el = diagElements(column_index, row_index);

    let intersections =  [...row_el, ...column_el, ...diag_el].filter(x => foxes.has(x)).length;

    if (find_foxes < foxes.size) {
        that.innerHTML = intersections;
        return;

    }
    else {
        alert("You win!");
        games_played.innerHTML = String(Number(games_played.innerHTML) + 1);
        restart();
        return;

    }
}