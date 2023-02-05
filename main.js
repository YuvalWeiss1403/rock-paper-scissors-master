// get elements from document.
var rulesButton = document.getElementById('rules-button');
var rulesModal = document.getElementById('rules-modal');
var modalCloseButton = document.getElementById('close-button');
var rockButton = document.getElementById('rock-button');
var paperButton = document.getElementById('paper-button');
var scissorsButton = document.getElementById('scissors-button');
var step1Container = document.getElementById('step-one');
var step2Container = document.getElementById('step-two');
var waitForHousePicked = document.getElementById('wait-for-house-picked');
var whoWonMessage = document.getElementById('who-won');
var scoreValue = document.getElementById('score-value');
var playAgain = document.getElementById('play-again');
// create local storage element to store the user game score.
var scoreValueStorage = JSON.parse(localStorage.getItem("UserScore"));
// update the score value from local storage when reloading.
updateScoreValue(Number(scoreValueStorage));
// create an enums with all the game options
var gameOptions;
(function (gameOptions) {
    gameOptions["rock"] = "rock";
    gameOptions["paper"] = "paper";
    gameOptions["scissors"] = "scissors";
})(gameOptions || (gameOptions = {}));
// generate a random option from enums properties
function randomHomePlayer() {
    var index = Math.floor(Math.random() * Object.keys(gameOptions).length);
    var value = Object.values(gameOptions)[index];
    return gameOptions[value];
}
// open the rules modal when clicking the rules button
rulesButton === null || rulesButton === void 0 ? void 0 : rulesButton.addEventListener('click', function () {
    if (rulesModal) {
        rulesModal.style.display = 'block';
    }
});
// when the user clicks on the x button on the modal, the modal closes
modalCloseButton === null || modalCloseButton === void 0 ? void 0 : modalCloseButton.addEventListener('click', function () {
    if (rulesModal) {
        rulesModal.style.display = 'none';
    }
});
// When the user clicks anywhere outside of the modal,  the modal closes
window.onclick = function (event) {
    if (event.target == rulesModal && rulesModal) {
        rulesModal.style.display = "none";
    }
};
// calling the iconStepOneClicked function to create a game between user and the computer 
// and displaying result on screen
rockButton === null || rockButton === void 0 ? void 0 : rockButton.addEventListener('click', function () {
    iconStepOneClicked("rock");
});
paperButton === null || paperButton === void 0 ? void 0 : paperButton.addEventListener('click', function () {
    iconStepOneClicked("paper");
});
scissorsButton === null || scissorsButton === void 0 ? void 0 : scissorsButton.addEventListener('click', function () {
    iconStepOneClicked("scissors");
});
// reloading the page when user wants to play again
playAgain === null || playAgain === void 0 ? void 0 : playAgain.addEventListener('click', function () {
    window.location.reload();
});
// moving between step1 to step2 when one of the options clicked
function iconStepOneClicked(icon) {
    //checking if the container is not null - if not it will display step 2 and not display step 1
    if (step1Container && step2Container) {
        step1Container.style.display = 'none';
        step2Container.style.display = 'flex';
    }
    // creating the users picked element by applying the class and id to the element
    // according on the clicked element.
    var youPickedContainer = document.getElementById('you-picked');
    var pickedButton = document.createElement('div');
    pickedButton.id = "".concat(icon, "-button");
    pickedButton.className = "".concat(icon, "-container");
    var imgInButton = document.createElement('span');
    imgInButton.id = "".concat(icon);
    pickedButton.appendChild(imgInButton);
    youPickedContainer === null || youPickedContainer === void 0 ? void 0 : youPickedContainer.appendChild(pickedButton);
    // creating an element with the random option
    var randomHousePick = randomHomePlayer();
    // calling the function to display the random option after 2 seconds
    setTimeout(function () {
        if (waitForHousePicked) {
            waitForHousePicked.style.display = 'none';
        }
        addHousePickedIcon(randomHousePick);
        whoWon(icon, randomHousePick);
        if (playAgain) {
            playAgain.style.display = 'block';
        }
    }, 2000);
}
// creating the house picked option by applying its class and id  by the name of the options
function addHousePickedIcon(icon) {
    var youPickedContainer = document.getElementById('house-picked');
    var pickedButton = document.createElement('div');
    pickedButton.id = "".concat(icon, "-button");
    pickedButton.className = "".concat(icon, "-container");
    var imgInButton = document.createElement('span');
    imgInButton.id = "".concat(icon);
    pickedButton.appendChild(imgInButton);
    youPickedContainer === null || youPickedContainer === void 0 ? void 0 : youPickedContainer.appendChild(pickedButton);
}
// creating an object that the key represent an options and the value represents who it can win 
var WinnerORLoser = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
};
// check and update score 
function whoWon(youPicked, housePicked) {
    //getting the value of the current score
    var currentScore = Number(scoreValue === null || scoreValue === void 0 ? void 0 : scoreValue.innerHTML);
    // checking that the whoWonMessage element is not null
    if (whoWonMessage) {
        // first checking if the elements are equal and the result is null.
        if (youPicked === housePicked) {
            whoWonMessage.innerHTML = "IT'S A TIE";
            // comparing between WinnerORLoser objects to the elements in the game
        }
        else if (WinnerORLoser["".concat(youPicked)] == housePicked) {
            whoWonMessage.innerHTML = "YOU WIN";
            currentScore++;
        }
        else {
            whoWonMessage.innerHTML = "YOU LOSE";
            currentScore--;
        }
    }
    // if the scoreValue element is not null , its value will update to the new score
    updateScoreValue(currentScore);
}
function updateScoreValue(value) {
    if (value == 0) {
        localStorage.setItem("UserScore", JSON.stringify(12));
        scoreValue.innerHTML = 12;
    }
    else {
        localStorage.setItem("UserScore", JSON.stringify(value));
        scoreValue.innerHTML = value;
    }
}
