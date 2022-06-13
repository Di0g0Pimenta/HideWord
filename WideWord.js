
var heigth = 6; //nember of guesses
var width = 5; //lenght of the word

var row = 0; //curremt guess (attempt #)
var col = 0; //current letter for that attempt

var gameOver = false;

var wordList = ["sagaz", "âmago", "negro", "êxito", "mexer"];
var guessList =["assim", "inato", "cerne", "ideia", "fosse"];
guessList = guessList.concat(wordList);

//var word = "CARRO";
var word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
console.log(word);

window.onload = function(){
    intialize();
}


function intialize(){

    //create the game board
    for(let r = 0; r <heigth; r++) {
        for(let c = 0; c < width; c++) {
            //<span id= "0-0" class="tile"></span>
            let tile = document.createElement("apan");
            tile.id = r.toString()+ "-" + c.toString();
            tile.classList.add("tile")
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }


    // Listen for Key Press
    document.addEventListener("keyup",(e) => {
        if(gameOver) return;

        //alert(e.code);
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            update();
        }


        if (!gameOver && row == heigth) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }

    })
}


function update() {
    let guess = "";
   document.getElementById("answer").innerText = "";
   
    //start processing 
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;
        guess += letter;
    }

    guess = guess.toLowerCase();
    if (!guessList.includes(guess)) {
        document.getElementById("answer").innerText = "Not in word list";
        return;
    }

    let correct = 0;
    let letterCount = {};
    for (let i =0; i < word.length; i++ ) {
        letter = word[i];
        if (letterCount[letter]) {
            letterCount[letter] += 1;
        }
        else {
            letterCount[letter] = 1;
        }
    }
    
    // first iteration, check all the correct ones
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;
        } 

        if (correct == width) {
            gameOver = true;
        }
    }

    //go again and mark whitch ones are present but in wrong position 
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        if (!currTile.classList.contains("correct")){
            // Is it in the word?
            if (word.includes(letter) && letterCount[letter] > 0) {
                currTile.classList.add("present");
                letterCount[letter] -= 1;
            } // Not in the word
            else {
                currTile.classList.add("absent");
            }
        }
    }

    row += 1; //start new row
    col = 0; //start at 0 for new row
}