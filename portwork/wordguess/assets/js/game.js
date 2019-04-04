//GLOBAL VARIABLES

var wordOptions = ["deaf","cochlear","sign","gallaudet","audism","clerc","bell","vineyard","hartford","oralism","communication"];

var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

var winCount = 0;
var lostCount = 0;
var guessesLeft = 15;


//FUNCTIONS

function startGame(){
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)]
    console.log(selectedWord)
    lettersInWord = selectedWord.split("");
    console.log(lettersInWord);
    numBlanks = lettersInWord.length;
    console.log(numBlanks);

    guessesLeft = 15;
    wrongLetters = [];
    blanksAndSuccesses = [];

    for(var i = 0; i<numBlanks; i++){
        blanksAndSuccesses.push("_");
    }
    console.log(blanksAndSuccesses);

    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");

    document.getElementById("numGuesses").innerHTML = guessesLeft;

    document.getElementById("winCounter").innerHTML = winCount;

    document.getElementById("lostCounter").innerHTML = lostCount;
}

function checkLetters(letter) {
    var isLetterInWord = false;

    for (var i = 0; i<numBlanks; i++) {
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }
    
    if (isLetterInWord) {
            for (var i = 0; i<numBlanks; i++) {
                if (selectedWord[i] == letter) {
                    blanksAndSuccesses[i] == letter;
                }
            }
        }
    else {
        console.log(blanksAndSuccesses);
        wrongLetters.push(letter);
        guessesLeft--;
    }

    }

function roundComplete(){
    console.log("Win Count: "+winCount+" "+"Loss Count: "+lostCount+"Guesses Left: "+guessesLeft);

    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("Correct! Point for you!");

        document.getElementById("winCounter").innerHTML = winCount;
        startGame();
    }
    else if (guessesLeft == 0) {
        lostCount++;
        alert("You lose!");

        document.getElementById("lostCounter").innerHTML = lostCount;

        startGame();
    }
}
    

//PROCESS
startGame();

document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(letterGuessed);
    checkLetters(letterGuessed);
    roundComplete();
}

