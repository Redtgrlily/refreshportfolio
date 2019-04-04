/*
 Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

    An array of new Letter objects representing the letters of the underlying word

    A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.

    A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)

*/

var Letter = require("./letter");

function Word(word) {
  this.letters = word.split("").map(function(char) {
    return new Letter(char);
  });
}

Word.prototype.getSolution = function() {
  return this.letters.map(function(letter) { 
    return letter.getSolution(); 
  }).join(""); 
};

Word.prototype.toString = function() {
  return this.letters.join(" ");
};

Word.prototype.guessLetter = function(char) {
  var foundLetter = false;
  this.letters.forEach(function(letter) {
    if (letter.guess(char)) {
      foundLetter = true;
    }
  });

  console.log("\n" + this + "\n");

  return foundLetter;
};


Word.prototype.guessedCorrectly = function() {

  return this.letters.every(function(letter) {
    return letter.visible;
  });
};

module.exports = Word;