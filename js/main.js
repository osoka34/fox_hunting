let area = document.getElementById('area');
let cell = document.getElementsByClassName('cell');
let foxes_left = document.getElementById('foxes_left');
let games_played = document.getElementById('games_played');

let size = 9;


function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min) + min)
}

function createMatrix(size) {
    // let flag = true;
    while (true) {
        let arr =  [...Array(size)].map(() => Array(size).fill(0));
        arr = arr.map((_) => randomIntFromInterval(1, size ** 2))
        numbers = new Set(arr);
        if (numbers.size == size) {
            // numbers =
            return [...numbers]
        }
    }
}

let foxes = createMatrix(size);

let find_foxes = 0;

foxes_left.innerHTML = String(foxes.length - find_foxes);
games_played.innerHTML = String(0);

// console.log(String(foxes.length - find_foxes));
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
    foxes_left.innerHTML = String(foxes.length - find_foxes);
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

    let column_index = Number(this.getAttribute('pos')) % (size);
    let row_index = Math.floor(Number(this.getAttribute('pos')) / (size));

    let row_left = row_index*size;
    let row_right = row_index*size+size-1;
    let column_top = column_index;
    let column_bottom = column_index+size*(size-1);

    let index = column_index+row_index*size;

    let row_el = rowElements(row_left, row_right);
    let column_el = columnElements(column_top, column_bottom);

    let all_set = new Set([...row_el, ...column_el]);

    // TODO fix сделать через пересечение множеств

    let intersections = [...all_set].filter(x => foxes.includes(x)).length;

    let has = foxes.includes(index);

    if (find_foxes < foxes.length) {
        if (has) {
            this.innerHTML = "🦊";
            find_foxes += 1;
            foxes_left.innerHTML = String(foxes.length - find_foxes);
            return;
        }
        this.innerHTML = intersections;
        return;
    }
    else {
        alert("You win!");
        games_played.innerHTML = String(Number(games_played.innerHTML) + 1);
        restart();
        return;
    }
}
function rowElements(left, right) {
    let set = new Set();
    for (let i = left; i <= right; i++) {
        set.add(i);
    }
    return set;
}

function columnElements(left, right) {
    let set = new Set();
    for (let i = left; i <= right; i+=size) {
        set.add(i);
    }
    return set;
}