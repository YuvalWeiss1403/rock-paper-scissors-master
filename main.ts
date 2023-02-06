// get elements from document.
const rulesButton = document.getElementById('rules-button') as HTMLButtonElement | null;
const rulesModal = document.getElementById('rules-modal') as HTMLDivElement | null;
const modalCloseButton = document.getElementById('close-button') as HTMLElement | null;
const step1Container = document.getElementById('step-one') as HTMLDivElement | null;
const step2Container = document.getElementById('step-two') as HTMLDivElement | null;
const waitForHousePicked =document.getElementById('wait-for-house-picked') as HTMLDivElement | null;
const whoWonMessage =document.getElementById('who-won') as HTMLDivElement | null;
const scoreValue =document.getElementById('score-value') as HTMLDivElement | null;
const playAgain = document.getElementById('play-again') as HTMLButtonElement | null;

// create local storage element to store the user game score.
let scoreValueStorage:string = JSON.parse(localStorage.getItem("UserScore"));

// update the score value from local storage when reloading.
updateScoreValue(Number(scoreValueStorage)); 


// create an enums with all the game options
enum gameOptions{
    rock = 'rock',
    paper = 'paper',
    scissors = 'scissors'
}
// creating an object that the key represent an options and the value represents who it can win 
const WinnerORLoser:object ={
    rock:"scissors",
    paper:"rock",
    scissors: "paper"
};

// generate a random option from enums properties
function randomHomePlayer(): string {
    const index :number= Math.floor(Math.random() * Object.keys(gameOptions).length);
    const value :string= Object.values(gameOptions)[index];
    return gameOptions[value];
}

// open the rules modal when clicking the rules button
rulesButton?.addEventListener('click',()=>{
    if(rulesModal)
    {
        rulesModal.style.display = 'block';
    }
});

// when the user clicks on the x button on the modal, the modal closes
modalCloseButton?.addEventListener('click',()=>{
    if(rulesModal)
    {
        rulesModal.style.display = 'none';
    }
})

// When the user clicks anywhere outside of the modal,  the modal closes
window.onclick = function(event) {
  if (event.target == rulesModal && rulesModal) {
    rulesModal.style.display = "none";
  }
}

// calling the iconStepOneClicked function to create a game between user and the computer 
// and displaying result on 
for(const key of Object.keys(gameOptions)){
    const button = document.getElementById(`${key}-button`) as HTMLButtonElement | null;
    button?.addEventListener('click',()=>{
        iconStepOneClicked(`${key}`);
    });
}

// reloading the page when user wants to play again
playAgain?.addEventListener('click',()=>{
    window.location.reload();
});

// moving between step1 to step2 when one of the options clicked
function iconStepOneClicked(icon:string){
    //checking if the container is not null - if not it will display step 2 and not display step 1
    if(step1Container && step2Container){
        step1Container.style.display = 'none';
        step2Container.style.display = 'flex';
    }

    // creating the users picked element by applying the class and id to the element
    // according on the clicked element.
    const youPickedContainer = document.getElementById('you-picked') as HTMLDivElement | null;
    const pickedButton:HTMLDivElement = document.createElement('div');
    pickedButton.id = `${icon}-button` ;
    pickedButton.className = `${icon}-container`;
    const imgInButton:HTMLElement = document.createElement('span');
    imgInButton.id = `${icon}`;
    pickedButton.appendChild(imgInButton);
    youPickedContainer?.appendChild(pickedButton);

    // creating an element with the random option
    const randomHousePick : String = randomHomePlayer();

    // calling the function to display the random option after 2 seconds
    setTimeout(()=>{
        if(waitForHousePicked){
            waitForHousePicked.style.display ='none';
        }
        addHousePickedIcon(randomHousePick)
        whoWon(icon ,randomHousePick);
        if(playAgain){
            playAgain.style.display='block';
        }
    },2000);

}

// creating the house picked option by applying its class and id  by the name of the options
function addHousePickedIcon(icon:String):void{
    const youPickedContainer = document.getElementById('house-picked') as HTMLDivElement | null;
    const pickedButton:HTMLDivElement = document.createElement('div');
    pickedButton.id = `${icon}-button` ;
    pickedButton.className = `${icon}-container`;
    const imgInButton:HTMLElement = document.createElement('span');
    imgInButton.id = `${icon}`;
    pickedButton.appendChild(imgInButton);
    youPickedContainer?.appendChild(pickedButton);
}


// check and update score 
function whoWon(youPicked:String,housePicked:String):void{
    //getting the value of the current score
    let currentScore:number = Number(scoreValue?.innerHTML);
    
    // checking that the whoWonMessage element is not null
    if(whoWonMessage){
    // first checking if the elements are equal and the result is null.
    if(youPicked === housePicked){
        whoWonMessage.innerHTML = "IT'S A TIE";
    // comparing between WinnerORLoser objects to the elements in the game
    }else if(WinnerORLoser[`${youPicked}`]==housePicked){
        whoWonMessage.innerHTML = "YOU WIN";
        currentScore++;
    }else{
        whoWonMessage.innerHTML = "YOU LOSE";
        currentScore--;
    }
    }
    // if the scoreValue element is not null , its value will update to the new score
        updateScoreValue(currentScore);
}


function updateScoreValue(value:number){
    if(value == 0){
        localStorage.setItem("UserScore", JSON.stringify(12));
        scoreValue.innerHTML = 12;

    }else{
        localStorage.setItem("UserScore", JSON.stringify(value));
        scoreValue.innerHTML = value;
    }
}