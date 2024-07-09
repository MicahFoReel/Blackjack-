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
const amountSelect = document.querySelector("select");
const container = document.querySelector("div");
const generateButton = document.querySelector("#generate");
const resetButton = document.querySelector("#reset");

generateButton.addEventListener("click", function(){
    if(decks.length != 0)
        container.append(getRandomCard())
    else
        alert("The Deck is empty");
});

resetButton.addEventListener("click", function(){
    location.reload();
} );

amountSelect.addEventListener("change", changeAmount);




function changeAmount(e){
    
    console.log(this.value);
    deckAmount = parseInt(this.value);
    decks = generateDeck(deckAmount);
};

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
    return cardImage;
}

/*==== END OF SECTION ====*/





/**============================================
 *               Active code
 *=============================================**/
// let decks = generateDeck(1);







/*=============== END OF SECTION ==============*/



