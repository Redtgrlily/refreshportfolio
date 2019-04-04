/*
 Contains a constructor, Letter. This constructor should be able to either display an underlying 
 character or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter.
  That means the constructor should define:

    A string value to store the underlying character for the letter

    A boolean value that stores whether that letter has been guessed yet

    A function that returns the underlying character if the letter has been guessed, or a placeholder
     (like an underscore) if the letter has not been guessed

    A function that takes a character as an argument and checks it against the underlying character,
     updating the stored boolean value to true if it was guessed correctly

*/

function Letter(char) {
  
    this.visible = !/[a-z1-9]/i.test(char);

    this.char = char;
  }
  
  Letter.prototype.toString = function() {
    if (this.visible === true) {
      return this.char;
    }
    return "_";
  };
  
  Letter.prototype.getSolution = function() {
    return this.char;
  };
  
  Letter.prototype.guess = function(charGuess) {
    if (charGuess.toUpperCase() === this.char.toUpperCase()) {
      this.visible = true;
      return true;
    }
  
    return false;
  };
  
  module.exports = Letter;