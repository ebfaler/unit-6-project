


// 1. Create an array of phrases and write functions to choose a random phrase from that array.
// 2. Split the phrase into letters and put those letters onto the gameboard
// 3. Each time the player guesses a letter, you’ll need to compare the letter the player has chosen with the random phrase.
// 4. If the letter is in the phrase, you’ll update the game board with the chosen letters.
// 5. A player can keep choosing letters until they make five incorrect guesses

/*MAIN VARIABLES*/

const qwerty =  document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const phrases = [
'seize the day',
'live laugh love',
'only way is up',
'simply the best',
'the sky is the limit'

];

const btnReset = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
let answers = [];
let missed = 0;
let heart = document.querySelectorAll('.tries img');



/*EVENT LISTENERS */

// hides the overlay page when user clicks start button
const hideOverlay = () => {

overlay.style.display = "none";    

}

btnReset.addEventListener('click', hideOverlay)



/* FUNCTIONS */


// selects a phrase in the array
function getRandomPhraseAsArray(arr) {
   
   const randomIndex =  Math.floor(Math.random(arr) * arr.length);
   const arrayPhrase = phrases[randomIndex];
 
   const newArr = arrayPhrase.split('');
   return newArr;  
}
const phraseArray = getRandomPhraseAsArray(phrases);
console.log(phraseArray);

// loops through array of characters and appends to #phrase ul
function addPhraseToDisplay(arr) {

   for(let i=0; i < arr.length; i++) {
      const currentChar = arr[i];
      const list = document.querySelector('ul');
      const item = document.createElement('li');
      
      if((/[a-zA-Z]/).test(currentChar)) {
        item.className = 'letter';
      } else {
        item.className = 'space';
      };
      item.textContent = currentChar;
      list.append(item);
    } 
};
addPhraseToDisplay(phraseArray);

// checkLetter The function should loop over the letters and check if they match the letter in the button the player has chosen.

function checkLetter(button) {
    
      const letters = document.querySelectorAll('.letter');
      let matched = false;

      for(let i=0; i < letters.length; i++) {
        if(letters[i].textContent.toLowerCase() === button.textContent) {
           letters[i].classList.add('show');
           matched = true;
        }  
      }
      return matched;
};

//add eventListener to check when a user presses a button on the screen keyboard

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
       e.target.className = 'chosen';
       e.target.disabled = true;

       const letterFound = checkLetter(e.target);
       
       if (!letterFound) {
           heart[missed].src = 'images/lostHeart.png';
           missed += 1;
    }
         checkWin();
  }
});

//create a checkWin function to see if .letter is equal to .show class

function checkWin() {

const showClass = document.querySelectorAll(".show");
const letterClass = document.querySelectorAll(".letter");
const title = document.querySelector(".title");

if (showClass.length === letterClass.length) {
    overlay.classList.add("win");
    overlay.style.display = "flex"; 
    title.textContent = "You Won!";
};

if (missed > 4) {

    overlay.classList.add("lose");
    overlay.style.display = "flex"; 
    title.textContent = "You Lost!";
};

};