let json;

// Returns a random integer between min and max
//   [min, min+1, min+2, ... , max-1, max]
function randInt(min, max) {
    let rand = Math.random();
    rand = rand * (max - min + 1);
    rand = rand + min;
    rand = Math.floor(rand);
    return rand;
}

const guessCount = document.getElementById('guess-count');
let guessesLeft = 6;

function loadGame() {
    fetch('./words_dictionary.json')
        .then(response => response.text())
        .then(text => {
            // Split the text by lines to get individual words
            json = JSON.parse(text);
            console.log('Words loaded!');
            wordsLoaded();
        })
        .catch(error => {
            console.error('Error fetching words: ', error);
        });

    guessCount.innerHTML = guessesLeft;
}

const randomWord = document.getElementById("random-word");
const guessField = document.getElementsByClassName("guess-field");
const feedbackText = document.getElementById("feedback");
const submitButton = document.getElementsByClassName("submit-button");

let allWords = [];
let fiveLetterWords = [];
let secret = '';

function wordsLoaded() {
    allWords = Object.keys(json);
    let randomIndex = randInt(0, allWords.length - 1);
    randomWord.innerHTML = allWords[randomIndex];

    for (let i = 0; i < allWords.length; i++) {
        let word = allWords[i];
        if (word.length != 5) continue;
        fiveLetterWords.push(word);
    }

    randomIndex = randInt(0, fiveLetterWords.length - 1);
    secret = fiveLetterWords[randomIndex];
}

function isWord(word) {
    // Check if the word exists as a key in the json object
    return json.hasOwnProperty(word);
}

function changeGuess() {
    let guess = guessField.value;
    if (guess.length < 5) return;
    if (guess.length > 5) {
        guessField.value = "";
        return;
    }
    console.log(`Guess: "${guess}" and Secret: "${secret}"`);
    if (!isWord(guess)) {
        feedbackText.innerHTML = `"${guess}" is not a word.`;
        // feedbackText.className = "show";
        // setTimeout(function () { feedbackText.className = feedbackText.className.replace("show", ""); }, 3000);
        guessField.value = "";
        return
    }
}

function submit() {
    if (guessField.value === "") {
        guessCount.innerHTML = guessesLeft;
    } else {
        guessesLeft -= 1;
        guessCount.innerHTML = guessesLeft;
    }

    const currentActive = document.querySelector(".active");
    const nextActive = currentActive.nextElementSibling;

    // Remove active class and styles from previous element
    if (currentActive) {
        currentActive.classList.remove("active");
    }

    // Add active class and styles to clicked element's parent
    if (nextActive) {
        nextActive.classList.add("active");
    }

    if (guessesLeft === 0) {
        gameOver();
    }
}

function gameOver() {
    guessCount.style.color = "var(--warning-red)";
}

// TODO: write function isWord(word)

// For checking word:  json.hasOwnProperty("programming")
// For array of words: let arr = Object.keys(json)
// For a random word:  let word = arr[randInt(0, arr.length - 1)];
