//#region GamePlay(not betting)
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
let gameEnd = false;


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
 *               Deck Select
 *=============================================**/
let decks = generateDeck(1);
let deckAmount = 1;
deckSelect.addEventListener("change", changeDeckAmount);

function changeDeckAmount(e){

    console.log(this.value);
    deckAmount = parseInt(this.value);
    reset();
    decks = generateDeck(deckAmount);
};

/**============================================
 *               Start Game
 *=============================================**/
let turns = -1;

function startGame(){
    setTimeout(toggleReset, 2300);
    setTimeout(toggleHitAndStand,2300);
    setTimeout(hit, 1000);
    setTimeout(dealerHit,1400);
    setTimeout(hit, 1700);
    setTimeout(dealerHitHidden, 2000);
}
startGame()




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
        console.log("player card: "+card[1]);
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
                setTimeout(dealerShowHidden,700);
                standButton.disabled = true;
                hitButton.disabled = true;
                document.querySelector("#titleCard").innerText = "Dealer Wins";
                gameEnd = true;
            }

        }
        else{
            pScore.innerText = playerScore;
        }
        if(playerScore == 21){
            setTimeout(dealerShowHidden, 700);
        }
        
    }
    else{
        alert("The Deck is empty, reshuffling");
        decks = generateDeck(deckAmount);
        hit();
    }
    turns ++;
    
}

/**============================================
 *               Dealer draws
 *=============================================**/
function dealerHit(){
    if(decks.length != 0){
        let card = getRandomCard();
        dealerBoard.append(card[0]);
        dealerScore += getCardValue(card[1]);
        console.log("dealer card: "+card[1]);
        if(card[1] == "ace"){
            dealerAce++;
        }
        if(dealerScore < 17 && turns > 1){
            setTimeout(dealerHit,500);
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
                if(turns == 2 && playerScore == 21){
                    document.querySelector("#titleCard").innerText = "Player Wins, BLACKJACK";
                    gameEnd = true;
                }
                else{
                    document.querySelector("#titleCard").innerText = "Player Wins";
                    gameEnd = true;
                    
                }
                    
                
            }
            
        }
        else{
            dScore.innerText = dealerScore;
        }
        if(turns > 1 && dealerScore >= 17){
            if(dealerScore <= 21 && playerScore <= 21){
                standButton.disabled = true;
                hitButton.disabled = true;
                if(dealerScore == playerScore ){
                    document.querySelector("#titleCard").innerText = "Push";
                    gameEnd = true;
                }
                else if(dealerScore > playerScore){
                    document.querySelector("#titleCard").innerText = "Dealer Wins";
                    gameEnd = true;
                }
                else if (playerScore > dealerScore){
                    document.querySelector("#titleCard").innerText = "Player Wins";
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
    else
        alert("The Deck is empty");
}


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
                setTimeout(dealerHit(),500);
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

function dealerOnlyRevealHidden(){

}



/*=============== END OF SECTION ==============*/

/**============================================
 *               Stand Button
 *=============================================**/
standButton.addEventListener("click", dealerShowHidden);




/*=============== END OF SECTION ==============*/



/**============================================
 *              Reset Button
 *=============================================**/


function reset(){
    if(gameEnd == true){
        hitButton.disabled = false;
        standButton.disabled = false;
        toggleReset();
        toggleHitAndStand();
        playerBoard.innerHTML = "";
        dealerBoard.innerHTML = "";
        pScore.innerText = "0";
        dScore.innerText = "0";
        playerScore = 0;
        dealerScore = 0;
        turns = -1;
        console.dir(this.localName);
        if(this.localName != "button"){
            decks = generateDeck(deckAmount);
        }
        playerBust = false;
        dealerBust = false;
        playerAce = 0;
        dealerAce = 0;
        gameEnd = false
        document.querySelector("#titleCard").innerText = "Welcome to Blackjack";
        startGame();
    }
    else{
        alert("The game is not finished yet.")
    }

}
//#endregion 









