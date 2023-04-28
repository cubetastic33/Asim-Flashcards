const addDeckContainer = document.querySelector(".card-container.add");
const deckNameField = document.querySelector("#name");
const modalAddDeck = document.querySelector("#add-deck-modal-background");

addDeckContainer.addEventListener("click", () => {
  modalAddDeck.style.display = "block";
});

const addDeckButton = document.querySelector("#add-deck-btn");

addDeckButton.addEventListener("click", () => {
  const deckName = deckNameField.value;
  if (!deckName) {
    // Display an error message if empty.
    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Please provide a deck name";
    errorMessage.className = "error";
    document.body.appendChild(errorMessage);

    // Fade out the error message after a few seconds.
    setTimeout(() => {
      errorMessage.style.opacity = "0";
    }, 2000);

    // Remove the error message after the fade-out effect is complete.
    setTimeout(() => {
      document.body.removeChild(errorMessage);
    }, 3000);

    return;
  }
  console.log(`Deck name: ${deckName}`);
  // do something with the deck name, like add it to a list of decks

   // Display a confirmation message.
   const confirmation = document.createElement("div");
   confirmation.textContent = "Deck created successfully!";
   confirmation.className = "confirmation";
   document.body.appendChild(confirmation);
 
   // Fade out the confirmation message after a few seconds.
   setTimeout(() => {
     confirmation.style.opacity = "0";
   }, 2000);
 
   // Remove the confirmation message after the fade-out effect is complete.
   setTimeout(() => {
     document.body.removeChild(confirmation);
   }, 3000);
  modalAddDeck.style.display = "none";
  deckNameField.value = '';
});

const closeBtn = document.getElementsByClassName("close")[0];
closeBtn.onclick = function() {
  modalAddDeck.style.display = "none";
}
