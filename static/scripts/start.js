const urlParams = new URLSearchParams(window.location.search);
const deckId = urlParams.get('deck');
const deckName = document.querySelector('.deck-title');

function navigateToQuiz(deckId) {
  window.location.href = `study?deck=${deckId}`;
}

(async () => {

  // Get the modal
  const modal = document.getElementById("add-flashcard-modal");

  // Append each flashcard to the container element
  const container = document.getElementById('flashcard-container');

  const addCardContainer = document.createElement('div');
  addCardContainer.className = 'flashcard';
  container.appendChild(addCardContainer);

  addCardContainer.addEventListener('click', function() {
      modal.style.display = 'block';
    });

  // Create plus sign
  const plusSign = document.createElement('div');
  plusSign.className = 'plus-sign';
  addCardContainer.appendChild(plusSign);

  // Create vertical line
  const verticalLine = document.createElement('div');
  verticalLine.className = 'vertical';
  plusSign.appendChild(verticalLine);

  // Create horizontal line
  const horizontalLine = document.createElement('div');
  horizontalLine.className = 'horizontal';
  plusSign.appendChild(horizontalLine);

  deckName.innerHTML = "Automata Theory"
  // Replace this array with code that fetches flashcards from a database
  var cards;
  await fetch('/get_flashcards?' + new URLSearchParams({
    name: deckId
})).then((response) => response.json())
.then((responseJson) => {
  cards = responseJson;
});
  /*
  const cards = [
    { front: 'What is an automaton?' },
    { front: 'What is a deterministic finite automaton (DFA)?' },
    { front: 'What is a non-deterministic finite automaton (NFA)?' },
    { front: 'What is a regular expression?' },
    { front: 'What is the Pumping Lemma?' },
    { front: 'What is the Myhill-Nerode Theorem?' },
  ];
  */
  console.log(cards)
  for (let card of cards) {
    const flashcard = document.createElement('div');
    flashcard.className = 'flashcard';
    flashcard.textContent = card.front;
    container.appendChild(flashcard);
  }
  // Get the <span> element that closes the modal
  const closeBtn = document.getElementsByClassName("close")[0];

  // Get the button that opens the modal
  const addCardBtn = document.getElementById("add-flashcard-btn");

  addCardBtn.onclick = async function() {
      const frontCard = document.querySelector("#front").value;
      const backCard = document.querySelector("#back").value;
    
      if (!frontCard || !backCard) {
        // Display an error message if either #front or #back is empty.
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Please fill in both front and back fields.";
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
    
      // This is where you could add the front and back to the database.
      const data = new FormData();
      data.append("name", deckId)
      data.append("front", frontCard)
      data.append("back", backCard)
      await fetch('/create_flashcard', {
        method: 'POST',
        body: data
      })
    
      // Display a confirmation message.
      const confirmation = document.createElement("div");
      confirmation.textContent = "Card created successfully!";
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
    
      // Clear the #front and #back input fields.
      document.querySelector("#front").value = "";
      document.querySelector("#back").value = "";
    };
    
    
    

  closeBtn.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
})();