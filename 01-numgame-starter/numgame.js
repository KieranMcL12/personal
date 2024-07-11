// GUIDELINES:
//  1. Give every variable/const smallest scope
//  2. Grab HTML elements by tag and store in const
//  3. Put all other code inside functions

const numField = document.getElementById("num-field");
const messageText = document.getElementById("message-text");
const lineBreak = document.createElement('br');

let secret;
let min = 1;
let max = 100;

var myConfetti = confetti.create(null, {
    resize: true,
    useWorker: true
});

function load() {
    myConfetti({
        particleCount: 200,
        spread: 200
    });

    showTempMessage('Welcome!');

    numField.min = min;
    numField.max = max;
    numField.value = max;

    secret = Math.random();
    secret = secret * (max - min + 1);
    secret = secret + min;
    secret = Math.floor(secret);
}

function showTempMessage(message, duration = 2500) {
    const tempDiv = document.createElement('div');
    const tempDivP = document.createElement('p');

    tempDivP.textContent = message;
    tempDivP.style.animation = 'welcomeTextShow 0.3s ease, welcomeTextHide 0.3s ease 2.25s';
    tempDiv.appendChild(tempDivP);

    tempDiv.style.position = 'absolute';
    tempDiv.style.top = '0';
    tempDiv.style.left = '0';
    tempDiv.style.width = '100%';
    tempDiv.style.height = '100%';
    tempDiv.style.textAlign = 'center';
    tempDiv.style.paddingTop = '60%';
    tempDiv.style.verticalAlign = 'middle';
    tempDiv.style.fontSize = 'xxx-large';
    tempDiv.style.fontWeight = '900';
    tempDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';

    document.body.appendChild(tempDiv);

    setTimeout(() => {
        document.body.removeChild(tempDiv);
    }, duration);
}

// Correct Answer Screen
function showTempMessage2(message, duration = 2500) {
    const tempDiv2 = document.createElement('div');
    const tempDivP2 = document.createElement('p');

    tempDivP2.textContent = message;
    tempDivP2.style.animation = 'welcomeTextShow 0.3s ease, welcomeTextHide 0.3s ease 2.25s';
    tempDiv2.appendChild(tempDivP2);

    tempDiv2.style.position = 'absolute';
    tempDiv2.style.top = '0';
    tempDiv2.style.left = '0';
    tempDiv2.style.width = '100%';
    tempDiv2.style.height = '100%';
    tempDiv2.style.textAlign = 'center';
    tempDiv2.style.paddingTop = '60%';
    tempDiv2.style.verticalAlign = 'middle';
    tempDiv2.style.fontSize = 'xxx-large';
    tempDiv2.style.fontWeight = '900';
    tempDiv2.style.backgroundColor = 'rgba(0, 255, 127, 0.25)';

    document.body.appendChild(tempDiv2);

    setTimeout(() => {
        document.body.removeChild(tempDiv2);
    }, duration);
}

// Wrong Answer Screen
function showTempMessage3(message, duration = 2500) {
    const tempDiv3 = document.createElement('div');
    const tempDivP3 = document.createElement('p');

    tempDivP3.textContent = message;
    tempDivP3.style.animation = 'welcomeTextShow 0.3s ease, welcomeTextHide 0.3s ease 2.25s';
    tempDiv3.appendChild(tempDivP3);

    tempDiv3.style.position = 'absolute';
    tempDiv3.style.top = '0';
    tempDiv3.style.left = '0';
    tempDiv3.style.width = '100%';
    tempDiv3.style.height = '100%';
    tempDiv3.style.textAlign = 'center';
    tempDiv3.style.paddingTop = '60%';
    tempDiv3.style.verticalAlign = 'middle';
    tempDiv3.style.fontSize = 'xxx-large';
    tempDiv3.style.fontWeight = '900';
    tempDiv3.style.backgroundColor = 'rgba(255, 0, 0, 0.25)';

    document.body.appendChild(tempDiv3);

    setTimeout(() => {
        document.body.removeChild(tempDiv3);
    }, duration);
}

function makeGuess() {
    let guess = parseInt(numField.value);
    console.log(`Guess: ${guess}`);
    var guessText = `\n${guess}`;
    var invalidGuessText = `Invalid guess!`;
    messageText.innerHTML = "";

    if (guess < secret) {
        // messageText.innerHTML = `${guess} is too low!`;
        messageText.textContent += guessText;
        showTempMessage3(`${guess} is too low! Try again!`);
    } else if (guess > secret) {
        // messageText.innerHTML = `${guess} is too high!`;
        messageText.textContent += guessText;
        showTempMessage3(`${guess} is too high! Try again!`);
    } else if (guess == secret) {
        // messageText.innerHTML = `${guess} is correct!`;
        messageText.textContent += guessText;
        myConfetti({
            particleCount: 200,
            spread: 200
        });
        showTempMessage2(`${guess} is correct!`);
    } else {
        messageText.textContent += invalidGuessText;
        showTempMessage3('Invalid guess! Try again!');
    }
}