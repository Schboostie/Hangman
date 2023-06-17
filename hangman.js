// Hangman game logic

// Array of words
const words = ['javascript', 'hangman', 'programming', 'computer', 'game'];

// Array of image URLs for hangman stages

const hangmanImages = [
  'https://www.oligalma.com/downloads/images/hangman/hangman/5.jpg',
  'https://www.oligalma.com/downloads/images/hangman/hangman/6.jpg',
  'https://www.oligalma.com/downloads/images/hangman/hangman/7.jpg',
  'https://www.oligalma.com/downloads/images/hangman/hangman/8.jpg',
  'https://www.oligalma.com/downloads/images/hangman/hangman/9.jpg',
  'https://www.oligalma.com/downloads/images/hangman/hangman/10.jpg'
];
/*
const hangmanImages = [
'https://media.gettyimages.com/id/97537744/photo/gallows-noose-on-white-background.jpg?s=612x612&amp;w=0&amp;k=20&amp;c=YOEPhXOHcySQhq9bjiZSab7JAdVrybkx2ugEvou25fY=',
  'https://media.gettyimages.com/id/173450176/photo/tyburn-during-the-reign-of-king-charles-i-site-near-marble-arch-london-notorious-for-its.jpg?s=612x612&amp;w=0&amp;k=20&amp;c=SoQhJ1rKYD6e12XepCMa_DRdKFaUPNmjxjqR3WIM3t8=',
  'https://www.oligalma.com/downloads/images/hangman/hangman/7.jpg',
'https://media.gettyimages.com/id/485240015/photo/the-mother-of-abdolah-hosseinzadeh-who-was-murdered-in-2007-slaps-balal-who-killed-her-son.jpg?s=612x612&amp;w=0&amp;k=20&amp;c=vGRIG_ch7wXkOLwjwf-aH631v17tU-78Hm47r4VnyZQ=',
'https://media.gettyimages.com/id/75981362/photo/perkin-warbeck-a-pretender-to-the-english-throne-is-executed-as-a-traitor-at-tyburn-23rd.jpg?s=612x612&amp;w=0&amp;k=20&amp;c=9MeRY_xyA0NTqKjRKwaA1M-EG_cJXsQ7d-kZ0emqfKk=',
'https://media.gettyimages.com/id/1490330242/photo/old-engraved-illustration-of-torture-of-huguenots.jpg?s=612x612&amp;w=0&amp;k=20&amp;c=xJog3fAvWSkeb6Q5hLJ43ByEmo0QPvbRyYGLeDcr1Jw='
];*/

// Initialize variables
let currentWord = '';
let guessedWord = [];
let incorrectGuesses = 0;

// Select DOM elements
const hangmanImg = document.getElementById('hangman-img');
const wordDisplay = document.getElementById('word-display');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const incorrectGuessesDiv = document.getElementById('incorrect-guesses');

// Generate a random word from the words array
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Initialize the game
function initGame() {
  // Reset variables
  currentWord = getRandomWord();
  guessedWord = Array(currentWord.length).fill('_');
  incorrectGuesses = 0;

  // Reset hangman image
  hangmanImg.style.backgroundImage = `url(${hangmanImages[0]})`;

  // Reset displayed word
  wordDisplay.textContent = guessedWord.join(' ');

  // Reset incorrect guesses
  incorrectGuessesDiv.textContent = '';

  // Clear letter input
  letterInput.value = '';
  letterInput.focus();
}

// Check if the guessed letter is correct
function checkGuess(letter) {
  let found = false;

  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === letter) {
      guessedWord[i] = letter;
      found = true;
    }
  }

  if (!found) {
    incorrectGuesses++;
    hangmanImg.style.backgroundImage = `url(${hangmanImages[incorrectGuesses]})`;
    incorrectGuessesDiv.textContent += letter.toUpperCase() + ' ';
  }

  wordDisplay.textContent = guessedWord.join(' ');

  if (guessedWord.join('') === currentWord) {
    endGame(true);
  } else if (incorrectGuesses === 5) {
    endGame(false);
  }
}

// End the game and show the result
function endGame(isWin) {
  if (isWin) {
    alert('Congratulations! You guessed the word.');
  } else {
    alert('Game over. You reached the maximum number of incorrect guesses.');
  }
  initGame();
}

// Event listener for the guess button
guessButton.addEventListener('click', () => {
  const letter = letterInput.value.toLowerCase();

  if (letter.length !== 1 || !letter.match(/[a-z]/i)) {
    alert('Please enter a single letter.');
    return;
  }

  if (guessedWord.includes(letter)) {
    alert('You already guessed that letter. Try a different one.');
    return;
  }

  checkGuess(letter);
  letterInput.value = '';
  letterInput.focus();
});

// Initialize the game on page load
window.addEventListener('load', initGame);
