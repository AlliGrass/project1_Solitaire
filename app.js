
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

    let hiddenstackValue = document.createElement("p");
    hiddenstackValue.classList.add("hidden-stack-value");
    hiddenstackValue.innerText = "workingCollection";




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
    newCard.appendChild(hiddenstackValue);
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
    remainderCardLi[remainderCardLi.length-1].querySelector(".hidden-stack-value").style.display = "none";
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
    remainderCardShownLi[remainderCardShownLi.length-1].querySelector(".hidden-stack-value").style.display = "none";
}

function resetRemainderCards(remainderCardHiddenLi, remainderCardShownLi, remainderCardShownStack, remainderCardHiddenStack) {
    remainderCardShownLi[remainderCardShownLi.length-1].classList.add("card-back");

    remainderCardHiddenStack.appendChild(remainderCardShownLi[remainderCardShownLi.length-1]);
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




    getNewRemainderCard.removeEventListener("click", handleGetNewRemainderCard)
    getNewRemainderCard = document.querySelector(".top-remainder-card");
    getNewRemainderCard.addEventListener("click", handleGetNewRemainderCard)


    initialiseDragCards();



}

function handleDragStart(event){
    currentDraggingCard = event.target;
    console.log(currentDraggingCard)
    selectedCardSuitValue = currentDraggingCard.querySelector(".hidden-suit-value").innerText;
    selectedCardNumValue = currentDraggingCard.querySelector(".card-num-value").innerText;
}

function initialiseDragCards() {
    let draggableCards = document.querySelectorAll(".draggable");
draggableCards.forEach( card => {
    card.draggable = true;
    card.addEventListener("dragstart", handleDragStart);
})
}

function shortenCards(ul){

    let destinationLists = ul.querySelectorAll("li");

    let previousCard = destinationLists[destinationLists.length-1];

    previousCard.classList.add("shortened-card");
    previousCard.classList.remove("card");


}


function revealNewCard(rowStack) {    
    if(rowStack.querySelectorAll("li") !== null) {
        let cardStack = rowStack.querySelectorAll("li");
        let workingCard = cardStack[cardStack.length-1];
        workingCard.classList.remove("shortened-card");
        workingCard.classList.add("card");
        workingCard.classList.remove("card-back");
        workingCard.classList.add("draggable");
        workingCard.draggable = true;
    }     
}

function revealCardUnder() {
    let flippedStack = document.getElementById("flipped-stack");
    let cardStack = flippedStack.querySelectorAll("li");
    let workingCard = cardStack[cardStack.length-1];
    workingCard.classList.add("top-flipped-card");;


}

function placeFinalCard(ul, currentCard) {

    let finalStacks = ul.querySelectorAll("li");

    let previousCard = finalStacks[finalStacks.length-2];
    previousCard.classList.add("hidden-Card");
    currentCard.querySelector(".hidden-stack-value").textContent = "finalCollection";
}

function checkGameWon() {
    let finalCardStackDiv = document.querySelector(".final-card-stacks");
    let finalCardStack = finalCardStackDiv.querySelectorAll(".dropZoneStack");
    let totalFinalisedCards = 0;
    finalCardStack.forEach( finalStack => {
        console.log(finalStack)
        let finalCardList = finalStack.querySelectorAll("li");
        totalFinalisedCards += finalCardList.length - 1;
    })
    console.log(totalFinalisedCards);
    if (totalFinalisedCards === 52) {
        winGameChanges()
    }
}


function winGameChanges() {
    document.querySelector(".winning-box").style.display = "block";
    document.querySelector(".winning-background-overlay").style.display = "block";

    let closeBtn = document.querySelector(".close-win-popup-btn");
    closeBtn.addEventListener("click", closeWinPopUp)

}

function closeWinPopUp() {
    document.querySelector(".winning-box").style.display = "none";
    document.querySelector(".winning-background-overlay").style.display = "none";
}

function handlePlayAgain() {
    closeWinPopUp()

    let finalCardStackDiv = document.querySelector(".final-card-stacks");
    console.log(finalCardStackDiv)
    let finalCardStack = finalCardStackDiv.querySelectorAll(".dropZoneStack");

    finalCardStack.forEach( finalStack => {

        while (finalStack.length !== 1) {
            finalStack.removeChild();
        }
    })

    initialiseCards();

    placeCardsOnTable();

    initialiseDragCards();
}


initialiseCards();

placeCardsOnTable();

initialiseDragCards();




var getNewRemainderCard = document.querySelector(".top-remainder-card");


getNewRemainderCard.addEventListener("click", handleGetNewRemainderCard);




var selectedCardNumValue;
var selectedCardSuitValue;
var currentDraggingCard;

var visibleCards;



let dropZoneStacks = document.querySelectorAll(".dropZoneStack");

cardsAreCompatible = false;

var cardList;

let rowStack;
let parentId;

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

            cardList = ul.querySelectorAll("li");
            card = cardList[cardList.length-1];

            var targetNum = card.querySelector(".hidden-num-value").innerHTML;
            var targetSuit = card.querySelector(".hidden-suit-value").textContent;
            var targetStack = card.querySelector(".hidden-stack-value").textContent;



            switch(targetStack) {
                case "workingCollection":

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


                    break;
                case "finalCollection":
                    
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

                    console.log(Number(targetNum)+ 1);
                    if (selectedCardSuitValue === targetSuit && Number(selectedCardNumValue) === Number(targetNum) + 1 ) {

                        cardsAreCompatible = true;
                        
                    } else {
                        cardsAreCompatible = false;
                    }



                break;

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
        var targetStack = card.querySelector(".hidden-stack-value").textContent;
        switch(targetStack) {
            case "workingCollection":

                parentId = event.dataTransfer.getData('parentId');
                rowStack = document.getElementById(parentId);
                shortenCards(ul);
                if (currentDraggingCard.classList.contains("top-flipped-card")) {
                    currentDraggingCard.classList.remove("top-flipped-card");
                    ul.appendChild(currentDraggingCard);
                    revealCardUnder();
                } else {
                    parentId = event.dataTransfer.getData('parentId');
                    rowStack = document.getElementById(parentId);

                    cardList = Array.from(rowStack.getElementsByTagName("li"));
                    shortenCards(ul);

                    let index = cardList.indexOf(currentDraggingCard);
                    let cardsToMove = cardList.slice(index);
                    
                    cardsToMove.forEach(card => {
                        ul.appendChild(card);
                    });

                    revealNewCard(rowStack);
                }
                  
                initialiseDragCards();
            
                break;
            case "finalCollection":

                if (currentDraggingCard.classList.contains("top-flipped-card")) {
                    currentDraggingCard.classList.remove("top-flipped-card");
                    ul.appendChild(currentDraggingCard);
                    revealCardUnder();
                }
                currentCard = ul.appendChild(currentDraggingCard);
                placeFinalCard(ul, currentCard)
                parentId = event.dataTransfer.getData('parentId');
                rowStack = document.getElementById(parentId);

                revealNewCard(rowStack);

                // check win
                checkGameWon();
                initialiseDragCards();
                break;

        }
        

      });
})

