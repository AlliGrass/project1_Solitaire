
let cardStacks = [];
let rowStacks = []; 


const suits = ['H', 'D', 'C', 'S']; 
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function createDeck() {
    let deck = [];
        suits.forEach(suit => {
        values.forEach(value => {
        deck.push(suit + value);
        }); 
    });
    return deck;
}


function cardRandomiserSort() {
    let sortDeck = createDeck(); 
    let newDeck = []; 
    while (sortDeck.length !== 0) {
        let randomIndex = Math.floor(Math.random() * sortDeck.length); 
        newDeck.push(sortDeck[randomIndex]); 
        sortDeck.splice(randomIndex, 1); 
    }
    return newDeck; 
}


function initialiseCards() {
    let workingDeck = cardRandomiserSort();
    for (let i = 1; i <= 7; i++) {
        let currentStack = [];
        
   
        for (let j = 0; j < i; j++) {
            currentStack.push(workingDeck[0]);
            workingDeck.splice(0, 1);
        }
        
        cardStacks.push(currentStack)
    }

    cardStacks.unshift(workingDeck); 
    
    let flippedStack = [];
    cardStacks.push(flippedStack);

}




function createCard(card) {
    cardSuitValue = card[0];
    cardNumberValue = card.slice(1,3);

    let hiddenSuitValue = document.createElement("p");
    hiddenSuitValue.classList.add("hidden-suit-value");
    hiddenSuitValue.innerText = cardSuitValue;
    
    let hiddenNumValue = document.createElement("p");
    hiddenNumValue.classList.add("hidden-num-value");
    hiddenNumValue.innerText = cardNumberValue;

    switch(cardSuitValue) {
        case "H":
            cardSuitValue = "&heartsuit;";
            cardSuitColor = "card-suit-red";
            break;
        case "D":
            cardSuitValue = "&diamondsuit;"
            cardSuitColor = "card-suit-red";
            break;
        case "S":
            cardSuitValue = "&spadesuit;"
            cardSuitColor = "card-suit-black";
            break;
        case "C":
            cardSuitValue = "&clubsuit;"
            cardSuitColor = "card-suit-black";
            break;
    }

    switch(cardNumberValue) {
        case "11":
            cardNumberValue = "J";
            break;
        case "12":
            cardNumberValue = "Q";
            break;
        case "13":
            cardNumberValue = "K";
            break;
    }

    let topCardDiv = document.createElement("div");
    topCardDiv.classList.add("top-card");

    let bottomCardDiv = document.createElement("div");
    bottomCardDiv.classList.add("bottom-card");

    let topCardNumberP = document.createElement("p");
    topCardNumberP.classList.add("card-num-value");
    topCardNumberP.innerText = cardNumberValue;

    let topCardSuitP = document.createElement("p");
    topCardSuitP.classList.add("card-suit-value");
    topCardSuitP.innerHTML = cardSuitValue;

    let bottomCardNumberP = document.createElement("p");
    bottomCardNumberP.innerText = cardNumberValue;

    let bottomCardSuitP = document.createElement("p");
    bottomCardSuitP.innerHTML = cardSuitValue;

    let cardImageP = document.createElement("p");
    cardImageP.classList.add("card-info");
    cardImageP.innerHTML = cardSuitValue;




    topCardDiv.appendChild(topCardSuitP);
    topCardDiv.appendChild(topCardNumberP);

    bottomCardDiv.appendChild(bottomCardNumberP);
    bottomCardDiv.appendChild(bottomCardSuitP);



    let newCard = document.createElement("li");
    
    newCard.appendChild(topCardDiv);
    newCard.appendChild(cardImageP);
    newCard.appendChild(hiddenSuitValue);
    newCard.appendChild(hiddenNumValue);
    newCard.appendChild(bottomCardDiv);


    newCard.classList.add("shortened-card");
    newCard.classList.add("card-back");
    newCard.classList.add(cardSuitColor);

    

    return newCard;
}

function replaceLastCard(cardStack) {
    cardStack[cardStack.length-1].classList.remove("card-back");
    cardStack[cardStack.length-1].classList.remove("shortened-card");
    cardStack[cardStack.length-1].classList.add("card");
    cardStack[cardStack.length-1].classList.add("draggable");
    cardStack[cardStack.length-1].draggable = true;
}

function makeRemainderCardVisible(remainderCardLi) {
    remainderCardLi[remainderCardLi.length-1].classList.add("top-remainder-card");
    remainderCardLi[remainderCardLi.length-1].classList.add("draggable");
    remainderCardLi[remainderCardLi.length-1].querySelector(".hidden-suit-value").style.display = "none";
    remainderCardLi[remainderCardLi.length-1].querySelector(".hidden-num-value").style.display = "none";

}


function placeCardsOnTable() {

    for (i = 1; i <= 7; i++) {
        let currentStack = cardStacks[i];
        let placedCardStack;
        let currentStackRow = document.getElementById(`stack-row-${i}`);

        currentStack.forEach(card => {
            currentStackRow.appendChild(createCard(card));
        });
        placedCardStack = currentStackRow.getElementsByTagName("li");

        replaceLastCard(placedCardStack);
    }

    // rest of the cards cardStacks[0];

    let currentStack = cardStacks[0];

    let remainderCardStack = document.getElementById("non-flipped-stack");
    console.log(currentStack)
    currentStack.forEach(card => {

        let newCard = createCard(card);

        newCard.classList.remove("shortened-card");
        newCard.classList.add("card");


        remainderCardStack.appendChild(newCard);
        //place card in nonflipped stack, make last card visible
    });

    remainderCardLi = remainderCardStack.getElementsByTagName("li");

    makeRemainderCardVisible(remainderCardLi);


}



function flipRemainderCard(remainderCardHiddenLi, remainderCardShownLi, remainderCardShownStack) {
    remainderCardHiddenLi[remainderCardHiddenLi.length-1].classList.remove("top-remainder-card");
    remainderCardHiddenLi[remainderCardHiddenLi.length-1].classList.remove("card-back");


    remainderCardShownStack.appendChild(remainderCardHiddenLi[remainderCardHiddenLi.length-1]);

    remainderCardShownLi = remainderCardShownStack.getElementsByTagName("li");

    remainderCardShownLi[remainderCardShownLi.length-1].classList.add("top-flipped-card");
    remainderCardShownLi[remainderCardShownLi.length-1].draggable = true;
    remainderCardShownLi[remainderCardShownLi.length-1].classList.add("draggable");
    remainderCardShownLi[remainderCardShownLi.length-1].querySelector(".hidden-suit-value").style.display = "none";
    remainderCardShownLi[remainderCardShownLi.length-1].querySelector(".hidden-num-value").style.display = "none";
}

function resetRemainderCards(remainderCardHiddenLi, remainderCardShownLi, remainderCardShownStack, remainderCardHiddenStack) {
    remainderCardShownLi[remainderCardShownLi.length-1].classList.add("card-back");

    remainderCardHiddenStack.appendChild(remainderCardShownLi[remainderCardShownLi.length-1]);
}

function checkFlippedRemainderCards() {
    //check amount in flipped stack array, if 0, return to placeholder. if more than one, have last card be visible
    // let remainderFlippedStack = cardStacks[cardStacks.length-1];

    // if (remainderFlippedStack.length == 1) {
    //     remainderFlippedStack[remainderFlippedStack.length-1].classList.add("top-flipped-card");
    // }


}


function handleGetNewRemainderCard() {

    let remainderCardHiddenStack = document.getElementById("non-flipped-stack");
    let remainderCardShownStack = document.getElementById("flipped-stack");
    let remainderCardHiddenLi = remainderCardHiddenStack.getElementsByTagName("li");
    let remainderCardShownLi = remainderCardShownStack.getElementsByTagName("li");


    if (remainderCardHiddenLi.length > 1) { // flip card from hidden to shown
        remainderCardShownLi[remainderCardShownLi.length-1].classList.remove("top-flipped-card");
        


        flipRemainderCard(remainderCardHiddenLi, remainderCardShownLi, remainderCardShownStack)

        if(remainderCardHiddenLi.length !== 1) {
            remainderCardHiddenLi[remainderCardHiddenLi.length-1].classList.add("card-back");
        }
        remainderCardHiddenLi[remainderCardHiddenLi.length-1].classList.add("top-remainder-card");


        getNewRemainderCard.removeEventListener("click", handleGetNewRemainderCard)
        getNewRemainderCard = document.querySelector(".top-remainder-card");
        getNewRemainderCard.addEventListener("click", handleGetNewRemainderCard)
    } else if (remainderCardHiddenLi.length === 1) {
        while (remainderCardShownLi.length !== 1) {
            resetRemainderCards(remainderCardHiddenLi, remainderCardShownLi, remainderCardShownStack, remainderCardHiddenStack)
        }
        remainderCardHiddenLi[0].classList.remove("top-remainder-card");
        remainderCardHiddenLi[remainderCardHiddenLi.length-1].classList.add("top-remainder-card");  
    }




        // next in list 







    // }
        //  else if (remainderCardHiddenLi.length == 1) {

    //     while (remainderFlippedStack.length !== 0) {
            
    //         remainderCardHiddenStack.appendChild(remainderCardShownLi[remainderCardShownLi.length-1]);
    //     } // transfer cards from array to array
    //     remainderCardShownStack.classList.remove("hasCardUnder");


    //     remainderCardShownLi[0].classList.add("top-flipped-card");

    //     remainderCardHiddenLi[0].classList.remove("top-remainder-card");


    //     remainderCardHiddenLi[remainderCardHiddenLi.length-1].classList.add("top-remainder-card");
    //     remainderCardHiddenLi[remainderCardHiddenLi.length-1].classList.add("card-back");


    // } else {

    //     if (remainderCardHiddenLi.length == 1) {
    //         remainderCardShownLi[0].classList.remove("top-flipped-card");
    //     } else {
    //         remainderCardShownLi[remainderCardShownLi.length-1].classList.remove("top-flipped-card");
    //     }
    
    //     flipRemainderCard(remainderCardHiddenLi, remainderCardShownLi, remainderNonFlippedStack, remainderFlippedStack, remainderCardShownStack);
    
    
    //     if (remainderCardHiddenLi.length = 1) {
    //         remainderCardHiddenLi[0].classList.remove("card-back");
    //     }

    // }


    getNewRemainderCard.removeEventListener("click", handleGetNewRemainderCard)
    getNewRemainderCard = document.querySelector(".top-remainder-card");
    getNewRemainderCard.addEventListener("click", handleGetNewRemainderCard)


    initialiseDragCards();


    // remainderCardLi[remainderCardLi.length-1].classList.remove("top-card");

    

    // remainderFlippedStack.push(remainderCardLi[remainderCardLi.length-1]);









}

function handleDragStart(event){
    currentDraggingCard = event.target;
    console.log(currentDraggingCard)
    selectedCardSuitValue = currentDraggingCard.querySelector(".hidden-suit-value").innerText;
    selectedCardNumValue = currentDraggingCard.querySelector(".card-num-value").innerText;
}

function initialiseDragCards() {
    let draggableCards = document.querySelectorAll(".draggable"); // need to reinitialise when cards change positions
draggableCards.forEach( card => {
    card.draggable = true;
    card.addEventListener("dragstart", handleDragStart);
})
// everything above needs to be reinitialised
}

function shortenCards(ul){

    let destinationLists = ul.querySelectorAll("li");

    let previousCard = destinationLists[destinationLists.length-1];

    previousCard.classList.add("shortened-card");
    previousCard.classList.remove("card");


}


function revealNewCard(rowStack) {
    let cardStack = rowStack.querySelectorAll("li");
    let workingCard = cardStack[cardStack.length-1];
    workingCard.classList.remove("shortened-card");
    workingCard.classList.add("card");
    workingCard.classList.remove("card-back");
    workingCard.draggable = true;
    console.log(cardStack);
}



initialiseCards();

placeCardsOnTable();

initialiseDragCards();








var getNewRemainderCard = document.querySelector(".top-remainder-card");


getNewRemainderCard.addEventListener("click", handleGetNewRemainderCard);




var selectedCardNumValue;
var selectedCardSuitValue;
var currentDraggingCard





let dropZoneStacks = document.querySelectorAll(".dropZoneStack");

cardsAreCompatible = false;

var cardList;

// affect arrays directly

// row = array




//find row/array/card index
// comparisons DONE
// switch in array
// either also append elements
// OR recreate row based on array
// OR remove arrays











dropZoneStacks.forEach (ul =>{

    ul.addEventListener(
        "dragstart", (event) => {
            const parentId = event.target.parentElement.id;
            event.dataTransfer.setData('text/plain', event.target.id);
            event.dataTransfer.setData('parentId', parentId);
        }
    )

    ul.addEventListener(
        "dragenter",
        (event) => { // When applicable, activate drop using following function
          // prevent default to allow drop
            event.preventDefault();

            cardList = ul.querySelectorAll("li");
            card = cardList[cardList.length-1];


            var targetNum = card.querySelector(".hidden-num-value").innerHTML;
            var targetSuit = card.querySelector(".hidden-suit-value").textContent;



            switch (selectedCardNumValue){
                case "K":
                    selectedCardNumValue = "13";
                    break;
                case "Q":
                    selectedCardNumValue  = "12";
                    break;
                case "J":
                    selectedCardNumValue = "11";
                    break;
            }
            
            console.log(Number(selectedCardNumValue) === (targetNum - 1));
            if (Number(selectedCardNumValue) === (targetNum - 1)) { // checked 


                switch(selectedCardSuitValue) {
                case "H":
                case "D":
                    if(targetSuit === "S" || targetSuit === "C" || targetSuit === "E") {

                        cardsAreCompatible = true;
                    } else {
                        cardsAreCompatible = false;
                    }
                    break;
                case "C":
                case "S":
                    if(targetSuit === "H" || targetSuit === "D" || targetSuit === "E") {
                        cardsAreCompatible = true;
                    } else {
                        cardsAreCompatible = false;
                    }
                    break;
                default: 
                    cardsAreCompatible = false;
                    break;
                }
            } else {
                cardsAreCompatible = false;
            }

        }
    );

    ul.addEventListener(
        "dragover",
        (event) => {
            if(cardsAreCompatible) {
                event.preventDefault();
            }
        }
    )



    ul.addEventListener("drop", (event) => {
        event.preventDefault();
        shortenCards(ul)   



        ul.appendChild(currentDraggingCard);
        const parentId = event.dataTransfer.getData('parentId');
        const rowStack = document.getElementById(parentId);

        revealNewCard(rowStack);



        // function to check ul and show last card
      });
})


final-rowStacks.forEach (finalStack => {
    finalStack.addEventListener(
        "dragenter", (event) => {

            // comparisons to allow card into stacks
        }
    )

    finalStack.addEventListener(
        "dragover",
        (event) => {
            if(finalCardCompatible) {
                event.preventDefault();
            }
        }
    )



    ul.addEventListener("drop", (event) => {
        event.preventDefault();

        // function to check ul and show last card
      });
})



// Solitaire

/*
 
inital array of 52, refer to array when sorting cards (create working array for replayability)

sort using random num, remove card from array and update sort random to be the max length of working array

start by assign cards to working stacks that are immediately visible at bottom of screen, sort remainder (also random) within spare stack.

display back of card initially for all cards.

every row of working stacks is object (card value, visiblity boolean) // visibility boolean as class for array(?)

cycle through spare stack one by one, returning to start of deck when object (card value, visiblity boolean) ends



placeholder card(?) // CANNOT BE MOVED




troubleshooting: check that all arranged cards add up to 52 by checking lengths of arrays together


ascending cards check: check suit, then check value is ascending (reject or accept card into array) 
descending cards check: get first card, check if value and matching suit aligns (reject or accept card array merge)


functions :

- card visibility management
- confirm card can be placed
    - ascending final cards stacks (4 stack suits)
    - descending working cards stacks



Extra: 
- allow to remove card into working stacks again 
- allow autocomplete once all cards are revealed
    - function to check for all cards (within visibility management function)
        - if class, queryselectorall class and compare to amount in deck 52
    - display autocomplete button

- shorten card when not on top

*/





// Mastermind

/* 

randomise colours, assign them to numbers to be able to effectively random order + effective toggle

toggle through colours when press on button

submit button to enter code submission

evaluate input code. check for each pin in for loop (comparison array for multiples)

display comparison on right side of working space

if input code matches randomised initial code, reveal code at bottom of working space


functions: 
- toggle colours
- submit code
    - compare code to initial randomised code
        - display comparison result






*/