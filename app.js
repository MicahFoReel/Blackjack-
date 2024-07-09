//#region Randomiser
/**============================================
 *             Random Card selection
 *=============================================**/


/**======================
 *          Cards
 *========================**/
const suits = ["hearts", "diamonds", "spades", "clubs"];
//                0          1           2        3
const cardName = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
//                 0      1                                               11     12       13


/*==== END OF CARDS ====*/

/**======================
 *    Deck limiter
 *========================**/


const generateDeck = (amount) => {
    const deck = [];
    for(let i = 0; i < amount; i++){
        for (let suit of suits) {                  //Creates an array of 1 deck of cards
            for (let name of cardName) {
                deck.push(`${name}_of_${suit}`);
                
            }
        }
    }
    return deck
}


/**=======================================
 * Generate, reset button and deck select
 *========================================**/
// const amountSelect = document.querySelector("#select");
// const container = document.querySelector("div");
// const generateButton = document.querySelector("#generate");
// const resetButton = document.querySelector("#reset");

// generateButton.addEventListener("click", function(){
//     if(decks.length != 0)
//         container.append(getRandomCard())
//     else
//         alert("The Deck is empty");
// });

// resetButton.addEventListener("click", function(){
//     location.reload();
// } );

// amountSelect.addEventListener("change", changeAmount);




// function changeAmount(e){
    
//     console.log(this.value);
//     deckAmount = parseInt(this.value);
//     decks = generateDeck(deckAmount);
// };

/*==== END OF SECTION ====*/


/**======================
 *   Random card gen
 *========================**/
function getRandomCard() {

    let randomCardIndex = Math.floor(Math.random() * decks.length);
    let randomCard = decks[randomCardIndex];
    decks.splice(randomCardIndex,1);

    let cardImage = document.createElement("img");  //Create an image and then add the path to its src
    cardImage.src = `cards\\${randomCard}.png`;
    cardImage.id = "card";
    cardImage.classList.add("card");
    return [cardImage, randomCard.split("_")[0]];
}

/*==== END OF SECTION ====*/





/**============================================
 *               Active code
 *=============================================**/
// let decks = generateDeck(1);







/*=============== END OF SECTION ==============*/




//#endregion

/**============================================
 *               Card values
 *=============================================**/

const cardValues = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "jack": 10,
    "queen": 10,
    "king": 10,
    "ace": 11 // Typically, Aces can be worth 1 or 11, but you can handle the flexibility separately
};

function getCardValue(card){
    return cardValues[card];
}


/**============================================
 *                Scores
 *=============================================**/
let playerScore = 0;
let dealerScore = 0;
let playerAce = 0;
let dealerAce = 0;
const pScore = document.querySelector("#playerScore");
const dScore = document.querySelector("#dealerScore");
let playerBust = false;
let dealerBust = false;
let gameEnd = true;
let hiddenRevealed = false;
let gameStart = false;


/**============================================
 *         Buttons, Boards and Select 
 *=============================================**/
const hitButton = document.querySelector("#hitButton");
const standButton = document.querySelector("#standButton");
const playerBoard = document.querySelector("#playerBoard");
const dealerBoard = document.querySelector("#dealerBoard");
const resetButton = document.querySelector("#resetButton");
const deckSelect = document.querySelector("select");
resetButton.addEventListener("click", reset);
resetButton.disabled = true;
hitButton.disabled = true;
standButton.disabled = true;


/**============================================
 *              Toggle reset
 *=============================================**/

function toggleReset(){
    resetButton.disabled = !resetButton.disabled;
};

/**============================================
 *            Toggle Hit and Stand
 *=============================================**/
function toggleHitAndStand(){
    hitButton.disabled = !hitButton.disabled;
    standButton.disabled = !standButton.disabled;
};


/**============================================
 *              Toggle gameStart
 *=============================================**/
function toggleGameStart(){
    gameStart = !gameStart;
}

/**============================================
 *               Deck Select
 *=============================================**/
let decks = generateDeck(1);
let deckAmount = 1;
deckSelect.addEventListener("change", changeDeckAmount);

function changeDeckAmount(e){

    console.log(this.value);
    deckAmount = parseInt(this.value);
    toggleReset();
    reset();
    decks = generateDeck(deckAmount);
};

/**============================================
 *               Start Game
 *=============================================**/
let turns = -1;

const audio = document.querySelector("#background-audio")
// audio.play();
function startGame(){
    setTimeout(toggleGameStart, 2299);
    setTimeout(toggleReset, 2300);
    setTimeout(toggleHitAndStand,2300);
    setTimeout(hit, 1000);
    setTimeout(dealerHit,1400);
    setTimeout(hit, 1700);
    setTimeout(dealerHitHidden, 2000);
}
// startGame()

/**========================================================================
 *                           Betting
 *========================================================================**/

//#region Betting

let betAmount = 0;
let balance = 1000;
let balancelast = 1000;
let doubled = false;
const money = document.querySelector("#money");
const bValue = document.querySelector("#betValue");

const fiveChip = document.getElementById("5_chip");
const tenChip = document.getElementById("10_chip");
const twentyFiveChip = document.getElementById("25_chip");
const fiftyChip = document.getElementById("50_chip");
const hundredChip = document.getElementById("100_chip");
const betButton = document.querySelector("#betButton");
const undoButton = document.querySelector("#undoButton");
const doubleButton = document.querySelector("#doubleButton");
const allInButton = document.querySelector("#allInButton");


fiveChip.addEventListener("click", updateBet);
tenChip.addEventListener("click", updateBet);
twentyFiveChip.addEventListener("click", updateBet);
fiftyChip.addEventListener("click", updateBet);
hundredChip.addEventListener("click", updateBet);
betButton.addEventListener("click", bet);
undoButton.addEventListener("click", undo);
doubleButton.addEventListener("click", double);
allInButton.addEventListener("click", allInBet);


function updateBet(){
    let chipValue = parseInt((this.id).split("_")[0]);
    if(!gameEnd == true){
        alert("You cannot place a bet midgame.")
        return;
    }
    if(betAmount == 0)
        balancelast = balance;
    if(balance >= chipValue){
        balance = balance - chipValue;
        money.innerText = balance;
        betAmount += chipValue;
        bValue.innerText = betAmount;
    }
    else{
        alert("Your balance is too low.")
    }
}

function double(){
    if(!gameEnd && !hiddenRevealed){
        if(balance >= betAmount){
            balance -= betAmount;
            betAmount = betAmount*2;
            bValue.innerText = betAmount;
            money.innerText = balance;
            setTimeout(hit,500);
            doubled = true;
        }
        else{
            alert("You don't have enough money");
        }
    }
    else{
        alert("Can only double when its your first move");
    }
}

function allInBet(){
    if(!gameEnd == true){
        alert("You cannot place a bet midgame.")
        return;
    }
    if(betAmount == 0)
        balancelast = balance;
    if(balance == 0){
        alert('You need money to go all in');
    }    
    else{
        betAmount += balance;
        balance = 0;
        bValue.innerText = betAmount;
        money.innerText = balance;
    }


}



function bet(){
    if(!gameEnd || document.getElementById("playerBoard").children.length != 0){
        alert("You need to play the next hand to bet.");
        
    }
    else if(betAmount > 0){
        gameEnd = false;
        startGame();
    }

    else{
        alert("You need to bet to play.");
    }
}

function undo(){
    betAmount = 0;
    balance = balancelast;
    bValue.innerText = betAmount;
    money.innerText = balance;
}

function winBet(){
    if(document.getElementById("playerBoard").children.length == 2 && playerScore == 21){
        balance += betAmount + betAmount*3/2;
        money.innerText = balance;
        betAmount = 0;
        bValue.innerText = 0;
    }
    else{
        balance += betAmount*2;
        money.innerText = balance;
        betAmount = 0;
        bValue.innerText = 0;
    }

}

function loseBet(){
    betAmount = 0;
    bValue.innerText = 0;
}

function push(){
    balance += betAmount;
    money.innerText = balance;
    betAmount = 0;
    bValue.innerText = 0;
}


//#endregion

/*=============== END OF SECTION ==============*/

/**============================================
 *               Hit button
 *=============================================**/
hitButton.addEventListener("click", hit);

function hit(){
    if(decks.length != 0){
        let card = getRandomCard();
        playerBoard.append(card[0]);
        playerScore += getCardValue(card[1]);
        // console.log("player card: "+card[1]);
        if(card[1] == "ace"){
            playerAce++;
        }
        if(playerScore > 21){
            if(playerAce > 0){
                playerAce --;
                playerScore -= 10;
                pScore.innerText = playerScore;
            }
            else{
                pScore.innerText = `${playerScore} BUST!`;
                playerBust = true;
                setTimeout(dealerHit,700);
                standButton.disabled = true;
                hitButton.disabled = true;
                document.querySelector("#titleCard").innerText = "Dealer Wins";
                loseBet();

                gameEnd = true;
            }

        }
        else{
            pScore.innerText = playerScore;
        }

        if(playerScore == 21 || doubled == true){
            setTimeout(dealerHit, 700);
        }

        
    }
    else{
        alert("The Deck is empty, reshuffling");
        decks = generateDeck(deckAmount);
        hit();
    }
    
    
}

/**============================================
 *               Dealer draws
 *=============================================**/
function dealerHit(){
    if(decks.length != 0){
        let card = getRandomCard();
        if(hiddenRevealed == false && gameStart == true){
            hiddenRevealed = true;
            hiddenCard.parentNode.replaceChild(card[0], hiddenCard);
            dealerScore += getCardValue(card[1]);
            dScore.innerText = dealerScore;
            if(playerBust)
                return;
        }
        else{
            dealerBoard.append(card[0]);
            dealerScore += getCardValue(card[1]);
            console.log("dealer card: "+card[1]);
        }
        if(card[1] == "ace"){
            dealerAce++;
        }
        if(dealerScore > 21){
            if(dealerAce > 0){
                dealerAce --;
                dealerScore -= 10;
                dScore.innerText = dealerScore;
            }
            else{
                dScore.innerText = `${dealerScore} BUST!`;
                dealerBust = true;
                standButton.disabled = true;
                hitButton.disabled = true;
                document.querySelector("#titleCard").innerText = `Player Wins!   $${betAmount*2}`;
                winBet();
                gameEnd = true;
                
            }

        }
        else{
            dScore.innerText = dealerScore;
        }

        if(document.getElementById("playerBoard").children.length == 2 && playerScore == 21){
            document.querySelector("#titleCard").innerText = `Player Wins, Blackjack!    $${betAmount + betAmount*3/2}`;
            winBet();
            gameEnd = true;
            return;
        }
        if(dealerScore < 17 && hiddenRevealed == true){
            setTimeout(dealerHit,500);
        }
        
        if(hiddenRevealed == true && dealerScore >= 17){
            if(dealerScore <= 21 && playerScore <= 21){
                standButton.disabled = true;
                hitButton.disabled = true;
                if(dealerScore == playerScore ){
                    if(document.getElementById("playerBoard").children.length == 2 && playerScore == 21){
                        document.querySelector("#titleCard").innerText = `Player Wins, Blackjack!    $${betAmount + betAmount*3/2}`;
                        winBet();
                    }
                    else{
                        document.querySelector("#titleCard").innerText = `Push   $${betAmount}`;
                        push();
                    }

                    gameEnd = true;
                }
                else if(dealerScore > playerScore){
                    document.querySelector("#titleCard").innerText = "Dealer Wins";
                    loseBet();
                    gameEnd = true;
                }
                else if (playerScore > dealerScore){
                    if(document.getElementById("playerBoard").children.length == 2 && playerScore == 21){
                        document.querySelector("#titleCard").innerText = `Player Wins, Blackjack!    $${betAmount + betAmount*3/2}`;
                        winBet();
                    }
                    else{
                        document.querySelector("#titleCard").innerText = `Player Wins!   $${betAmount*2}`;
                        winBet();
                    }

                    gameEnd = true;
                }
                    
                
            
            }

        }

    }
    else{
        alert("The Deck is empty, reshuffling");
        decks = generateDeck(deckAmount);
        dealerHit();
    }
}


/**============================================
 *               Hidden Card
 *=============================================**/

const hiddenCard = document.createElement("img");
hiddenCard.src = "cards/card_back.png";
hiddenCard.classList.add("card");
hiddenCard.id = "hidden";


function dealerHitHidden(){
    if(decks.length != 0){
        dealerBoard.append(hiddenCard);
    }
    else{
        alert("The Deck is empty, reshuffling");
        decks = generateDeck(deckAmount);
        dealerHitHidden();
    }
}

/**============================================
 *           Old non-used function
 *=============================================**/
function dealerShowHidden(){
    turns ++;
    if(decks.length != 0){
        let card = getRandomCard();
        hiddenCard.parentNode.replaceChild(card[0], hiddenCard);
        dealerScore += getCardValue(card[1]);
        dScore.innerText = dealerScore;
        if(playerBust){
            return;
        }
        /**========================================================================
         *                        If dealer gets 2 aces
         *========================================================================**/
        if(card[1] == "ace"){
            dealerAce++;
        }
        if(dealerScore > 21){
            if(dealerAce > 0){
                dealerAce --;
                dealerScore -= 10;
                dScore.innerText = dealerScore;
            }
            
        }
        /*---------------------------- END OF SECTION ----------------------------*/
        
        
        if(dealerScore >= 17){
            if(dealerScore > playerScore){
                standButton.disabled = true;
                hitButton.disabled = true;
                document.querySelector("#titleCard").innerText = "Dealer Wins";
                gameEnd = true;
            }
            else{
                setTimeout(dealerHit,500);
            }
        }
        else{
            setTimeout(dealerHit,500);
        }

    }
    else{
        alert("The Deck is empty, reshuffling");
        decks = generateDeck(deckAmount);
        dealerShowHidden();
    }
    
}

/*=============== END OF SECTION ==============*/





/*=============== END OF SECTION ==============*/

/**============================================
 *               Stand Button
 *=============================================**/
standButton.addEventListener("click", dealerHit);
// standButton.addEventListener("click", function(){
//     hiddenRevealed = true;
// })




/*=============== END OF SECTION ==============*/



/**============================================
 *              Reset Button
 *=============================================**/


function reset(){
    if(gameEnd == true){
        hitButton.disabled = true;
        standButton.disabled = true;
        toggleReset();
        //toggleHitAndStand();
        playerBoard.innerHTML = "";
        dealerBoard.innerHTML = "";
        pScore.innerText = "0";
        dScore.innerText = "0";
        playerScore = 0;
        dealerScore = 0;
        turns = -1;
        hiddenRevealed = false;
        gameStart = false;
        console.dir(this.localName);
        if(this.localName != "button"){
            decks = generateDeck(deckAmount);
        }
        playerBust = false;
        dealerBust = false;
        playerAce = 0;
        dealerAce = 0;
        doubled = false;
        gameEnd = true;
        document.querySelector("#titleCard").innerText = "Welcome to Blackjack";

    }
    else{
        alert("The game is not finished yet.")
    }

}











