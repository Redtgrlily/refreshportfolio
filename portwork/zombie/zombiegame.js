// INSTRUCTIONS: Build a command-line based zombie fighting game. 
// =========================================================================================================

// In this game, you and a zombie will each be given a certain amount of health. (Perhaps: You 70, Zombie 15).

// For each round, you will be asked to guess a random number between 1 and 5.
// If your guess matches the random number of the Zombie -- you inflict a random amount of damage between 1 and 5. 
// If you guess does not match the random number of the Zombie -- the Zombie inflicts a random amount of damage 
//to you between 1 and 5.
// Each round the zombie is given a new random number and you must guess again. 

// The game ends when you or the zombie gets to 0 health. 

// Note: You should use the inquirer package to take in user commands.
// Major Warning: inquirer's prompt function is "asynchronous", which means that the majority of your game logic 
//will need to be inside the .then() function for your prompt. 

// ===========================================================================================================
const inquirer = require('inquirer');
var gameCounter = 0;

let gameData = {
    zombie: {
        health: 0,
        damage: 0
    },
    user: {
        health: 0,
        damage: 0
    }
}

// generates random numbers & stores them in gameData object
function getRandomNums() {
    gameData.zombie.health = parseInt(Math.random() * (100 - 50) + 50);
    gameData.user.health = parseInt(Math.random() * (100 - 50) + 50);
} // end getRandomNums

// checkResults
function checkResults() {
    if (gameData.zombie.health <= 0) {
        console.log('################################\n');
        console.log('YOU WON!');
        console.log('\n################################');
        process.exit();
    } else if (gameData.user.health <= 0) {
        console.log('################################\n');
        console.log('you lost dude...');
        console.log('\n################################');
        process.exit();
    } else {
        eachRound();
    }
}

function eachRound() {
    // randomize new health for new game only
    if (gameCounter === 0) {
        getRandomNums()
        gameCounter = gameCounter + 1;
    }

    inquirer.prompt([{
        type: "list",
        message: "Try to stay alive! Guess a number between [1-5]",
        choices: ["1", "2", "3", "4", "5"],
        name: "userGuess",
    }]).then(function(answers) {

        // generate random numbers each turn for zombie damage & user damage, convert to string
        gameData.zombie.damage = parseInt(Math.floor(Math.random() * 5) + 1).toString();
        gameData.user.damage = parseInt(Math.floor(Math.random() * 5) + 1).toString();

        // if userGuess === zombie guess 
        if (answers.userGuess === gameData.zombie.damage) {
            // decrease zombie health by user.damage
            gameData.zombie.damage -= gameData.user.damage;
            console.log('\n-----------------------------------------------------\n');
            console.log(`\nHIT! You hit the zombie with ${gameData.user.damage} damage.
Your health is ${gameData.user.health} and Zombie health is ${gameData.zombie.health}\n`);
            console.log('\n-----------------------------------------------------\n');

            // check health/round
            checkResults();
            // else if userGuess != zombie guess
        } else {
            // decrease user health by zombie.damage
            gameData.user.health -= gameData.zombie.damage;
            console.log('\n-----------------------------------------------------\n');
            console.log(`\nMISS! The Zombie Slashed you ${gameData.zombie.damage} damage. 
Your health is ${gameData.user.health} and the Zombie health is ${gameData.zombie.health}\n`);
            console.log('\n-----------------------------------------------------\n');

            // check health/round
            checkResults();
        }
    });

} // end startGame

// start game on load
eachRound();