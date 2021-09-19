


// 1. Create an array of phrases and write functions to choose a random phrase from that array.
// 2. Split the phrase into letters and put those letters onto the gameboard
// 3. Each time the player guesses a letter, you’ll need to compare the letter the player has chosen with the random phrase.
// 4. If the letter is in the phrase, you’ll update the game board with the chosen letters.
// 5. A player can keep choosing letters until they make five incorrect guesses

/*MAIN VARIABLES*/

const qwerty = document.getElementById("qwerty");
const phrases = [
    'Seize the day',
    'Live laugh love',
    'Only way is up',
    'Simply the best',
    'The sky is the limit'

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


//eventListener checks when a user presses a button on the screen keyboard

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


/* FUNCTIONS */


// selects a phrase in the array
function getRandomPhraseAsArray(arr) {

    const randomIndex = Math.floor(Math.random(arr) * arr.length);
    const arrayPhrase = phrases[randomIndex];

    const newArr = arrayPhrase.split('');
    return newArr;
}
let phraseArray = getRandomPhraseAsArray(phrases);
console.log(phraseArray);

// loops through array of characters and appends to #phrase ul to display the phrase
function addPhraseToDisplay(arr) {

    for (let i = 0; i < arr.length; i++) {
        const currentChar = arr[i];
        const list = document.querySelector('ul');
        const item = document.createElement('li');

        if ((/[a-zA-Z]/).test(currentChar)) {
            item.className = 'letter';
        } else {
            item.className = 'space';
        };
        item.textContent = currentChar;
        list.append(item);
    }
};
addPhraseToDisplay(phraseArray);

// checkLetter This main function should loop over the letters and check if they match the letter in the button the player has chosen.

function checkLetter(button) {

    const letters = document.querySelectorAll('.letter');
    let matched = false;

    for (let i = 0; i < letters.length; i++) {
        if (letters[i].textContent.toLowerCase() === button.textContent) {
            letters[i].classList.add('show');
            matched = true;
        }
    }
    return matched;
};

//create a checkWin function to see if length of .letter is equal to .show class to display win/lose overlay

function checkWin() {

    const showClass = document.querySelectorAll(".show");
    const letterClass = document.querySelectorAll(".letter");
    const title = document.querySelector(".title");

    if (showClass.length === letterClass.length) {

        overlay.className = "win";
        overlay.style.display = "flex";
        title.textContent = "You Won!";

    };

    if (missed > 4) {

        overlay.className = "lose";
        overlay.style.display = "flex";
        title.textContent = "You Lost!";
        
        const para = document.createElement("p");
        title.append(para);

        let theText = "";
        for (let i = 0; i < phraseArray.length; i++) {
            theText = theText + phraseArray[i];
        }

        para.textContent = `The answer was "${theText}"`;
        para.classList.add('answer');
    };

    // recreates the buttons in the keyboard, generates a new random phrase, and sets the number of misses to zero.

    btnReset.textContent = "Reset";
    btnReset.addEventListener('click', () => {
        // clearing the list items and creating new phrase array
        missed = 0;
        const list = document.querySelector('ul');
        list.innerHTML = ``;
        phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
        // reseting the heart images
        for (let i = 0; i < heart.length; i++) {
            heart[i].src = 'images/liveHeart.png';
        }
        // reseting the keyboard and enabling the keyboard
        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {

            buttons[i].removeAttribute('disabled');
            buttons[i].classList.remove('chosen');

        }

    });

};



