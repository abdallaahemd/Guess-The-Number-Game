let randomNumber= parseInt(Math.random() * 100 +1);
const submit = document.getElementById("subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const startOver = document.querySelector(".resultParas");
const LowOrHi  = document.querySelector(".lowOrHi");
const p = document.createElement("P");
let PreviosGuesses =[];
let numGuesses = 1;
let playGame = true;

if(playGame){
    submit.addEventListener('click',function (e) {
        e.preventDefault();
        const PlayerGuess = parseInt(userInput.value);
        validateGuess(PlayerGuess);
    })
}


function showModal({ type = "info", icon = "ℹ️", title, message, buttonText = "OK", onClose }) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
        <div class="modal modal-${type}" role="dialog" aria-modal="true">
            <div class="modal-icon">${icon}</div>
            <h2 class="modal-title">${title}</h2>
            <p class="modal-message">${message}</p>
            <button class="modal-btn">${buttonText}</button>
        </div>`;

    document.body.appendChild(overlay);

    const btn = overlay.querySelector(".modal-btn");
    btn.focus();

    function close() {
        overlay.remove();
        document.removeEventListener("keydown", onKey);
        if (onClose) onClose();
    }

    function onKey(e) {
        if (e.key === "Enter" || e.key === "Escape") close();
    }

    btn.addEventListener("click", close);
    overlay.addEventListener("click", e => {
        if (e.target === overlay) close();
    });
    document.addEventListener("keydown", onKey);
}


function validateGuess(TheGuess){
    if(isNaN(TheGuess)){
        showModal({
            type: "error",
            icon: "⚠️",
            title: "Invalid input",
            message: "Please enter a valid number."
        });
    }else if(TheGuess < 1 || TheGuess > 100){
        showModal({
            type: "error",
            icon: "🚫",
            title: "Out of range",
            message: "Please enter a number between 1 and 100."
        });
    }else{
        PreviosGuesses.push(`${TheGuess}`);
        if(numGuesses == 11){
            displayGuesses(TheGuess);
            displayMessage(`Game Over! Number Was ${randomNumber}`);
            showModal({
                type: "gameover",
                icon: "💀",
                title: "Game over",
                message: `The number was ${randomNumber}. Better luck next time!`
            });
            endGame();
        }else{
            displayGuesses(TheGuess);
            checkGuess(TheGuess);
        }
    }
}

function checkGuess(TheGuess){
    if (TheGuess == randomNumber) {
        displayMessage(`You guessed Correctly`);
        showModal({
            type: "success",
            icon: "🎉",
            title: "You got it!",
            message: `The number was ${randomNumber}. Well done!`
        });
        endGame();
    }else if (TheGuess < randomNumber) {
        displayMessage(`too low! Try Again!`);
    }else if (TheGuess > randomNumber) {
        displayMessage(`too Height! Try Again!`);
    }
}


function checkGuess(TheGuess){
    if (TheGuess == randomNumber) {
        alert(`You guessed Correctly`)
        displayMessage(`You guessed Correctly`);
        endGame();

    }else if (TheGuess < randomNumber) {
        displayMessage(`too low! Try Again!`);
    }else if (TheGuess > randomNumber) {
        displayMessage(`too Height! Try Again!`);
    }
}

function displayGuesses(TheGuess){
    userInput.value="";
    guessSlot.innerHTML+=` ,${TheGuess}`
    numGuesses++;
    remaining.innerHTML = `${11-numGuesses} `
}

function displayMessage(message) {
    LowOrHi.innerHTML = `<h1>${message}</h1>`
}

function endGame() {
    userInput.value="";
    userInput.setAttribute("disabled", "");

    p.classList.add("button");
    PreviosGuesses.innerHTML=`<h1 id="newGame"> Start New Game </h1>`
    startOver.append(p);

    playGame=false;

    newGame();
}

function newGame() {
    randomNumber=parseInt(Math.random()*100+1);
    PreviosGuesses=[];
    numGuesses=1;
    guessSlot.innerHTML="";
    LowOrHi.innerHTML="";
    remaining.innerHTML=`${11-numGuesses}   `;
    userInput.removeAttribute("disabled");
    startOver.removeAttribute(p);
    playGame=true;


    
}