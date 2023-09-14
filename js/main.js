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
        if (numbers.size === size) {
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

    const pos = Number(this.getAttribute('pos'))

    if (this.innerHTML) {
        alert("Cell is already clicked "+ pos);
        return;
    }

    // const pos = Number(this.getAttribute('pos'))

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

function sideDiagCheck(column_index, row_index, size) {
    if (row_index < (size - 1 - column_index)) {
        return true;
    } else if (row_index > (size - 1 - column_index)) {
        return false;
    } else {
        return false;
    }
}

function diagElements(column_index, row_index) {

    console.log(" \n");
    // console
    console.log("indexes= "+row_index +" "+ column_index);

    let set = []

    let maxIndex = size-1
    let index = column_index+row_index*size;


    // нисходящая диагональ
    let dmaxDownSteps = maxIndex - ((column_index >= row_index) ? column_index : row_index);
    let dmaxUpSteps = ((column_index >= row_index) ? row_index : column_index);

    console.log("нисходящая: "+dmaxDownSteps+" "+dmaxUpSteps);

    for (let i = index - dmaxUpSteps*(size+1); i <= index + dmaxDownSteps*(size+1); i+=(size+1)) {
        // console.log(i);
        if (i !== index) {
            set.push(i);
        }
    }

    // восходящая диагональ
    // let maxLeftDownSteps;
    // let maxRightUpSteps;
    // if (Math.max(row_index, column_index) < 5) {
    //     maxLeftDownSteps = column_index;
    //     maxRightUpSteps = row_index;
    // } else {
    //     maxLeftDownSteps = maxIndex - Math.max(row_index, column_index);
    //     maxRightUpSteps = Math.min(row_index, column_index);
    //
    // }


        // [ 0,  1,  2,  3,  4,  5,  6,  7,  8]
        // [ 9, 10, 11, 12, 13, 14, 15, 16, 17]
        // [18, 19, 20, 21, 22, 23, 24, 25, 26]
        // [27, 28, 29, 30, 31, 32, 33, 34, 35]
        // [36, 37, 38, 39, 40, 41, 42, 43, 44]
        // [45, 46, 47, 48, 49, 50, 51, 52, 53]
        // [54, 55, 56, 57, 58, 59, 60, 61, 62]
        // [63, 64, 65, 66, 67, 68, 69, 70, 71]
        // [72, 73, 74, 75, 76, 77, 78, 79, 80]


    // pos = 10, 1 1 index 11
    // pos = 70, 1 1 index 77
    // pos = 25, 6 1 index 27
    // pos = 55, 1 6 index 61
    // pos = 61, 2 1 index


    // восходящая диагональ

    let umaxDownSteps
    let umaxUpSteps

    if (!sideDiagCheck(column_index, row_index, size)) {
         umaxDownSteps = maxIndex - ((column_index >= row_index) ? column_index : row_index);
         umaxUpSteps = maxIndex - ((column_index >= row_index) ? row_index : column_index);
    } else {
         umaxDownSteps = ((column_index >= row_index) ? row_index : column_index);
         umaxUpSteps = ((column_index >= row_index) ? column_index : row_index);
    }

    console.log("восходящая: "+umaxDownSteps+" "+umaxUpSteps);

    for (let i = index - umaxUpSteps*(size-1); i <= index + umaxDownSteps*(size-1); i+=(size-1)) {
        if (i !== index) {
            set.push(i);
        }
    }
    console.log("pos: " + index);
    console.log(set);


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