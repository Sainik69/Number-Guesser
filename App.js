/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 100,
    winningNum = getRandomNum(min, max),
    guessLeft = 7;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message'),
      hint = document.querySelector('.hint')

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function () {
   let guess = parseInt(guessInput.value);
   console.log(guess);

   // Validate Input
   if (isNaN(guess) || guess > max || guess < min) {
      setMessage(`Please enter a number between ${min} and ${max}`, 'blue');
   }

   // Check if won
   if (guess === winningNum) {
      // Disable Input
      guessInput.disabled = true;
      // Change Border
      guessInput.style.border = '3px green solid';
      // Set Message
      setMessage(`${winningNum} is Correct! You Win!`, 'green');
   } else {
      // Wrong Number
      guessLeft -= 1;
      
      if (guessLeft === 0) {
         // Game Over
         guessInput.disabled = true;
         // Change Border
         guessInput.style.border = '3px red solid';
         // Set Message
         setMessage(`You Lose! 0 guesses are left! The correct number was ${winningNum}!`, 'red');
      } else {
         // Game continues - answer wrong
         // Change Border
         guessInput.style.border = '3px red solid';
         // Clear input
         guessInput.value = '';
         // Set Message
         setMessage(`${guess} is not correct! Try Again! You have ${guessLeft} guesses left!`, 'red');
      }
   }
   // Hint Player
   theHint(guess);
});

function theHint(guess) {
   if (guess < winningNum) {
      setHint('You have gone low! Guess a higher value!');
   } if (guess > winningNum) {
      setHint('You have gone high! Guess a low value!');
   } if (guess === winningNum) {
      setHint('');
   }
}

function setMessage(msg, color) {
   message.style.color = color;
   message.textContent = msg;
}
function setHint(hnt) {
   hint.style.color = 'purple';
   hint.textContent = hnt;
}
// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}