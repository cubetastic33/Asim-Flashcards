document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const deckId = urlParams.get('deck');
    const deckName = document.querySelector('.deck-title');
  
    // Replace this array with code that fetches flashcards from a database
    deckName.innerHTML = "Automata Theory";
    const cards = [
      { front: 'What is an automaton?', back: 'An abstract machine that can perform computation' },
      { front: 'What is a deterministic finite automaton (DFA)?', back: 'A type of automaton where every state has exactly one transition for each possible input symbol' },
      { front: 'What is a non-deterministic finite automaton (NFA)?', back: 'A type of automaton where some states may have multiple transitions for the same input symbol' },
      { front: 'What is a regular expression?', back: 'A compact way of representing a language as a pattern of symbols' },
      { front: 'What is the Pumping Lemma?', back: 'A tool used to prove that certain languages are not regular' },
      { front: 'What is the Myhill-Nerode Theorem?', back: 'A theorem used to determine if a language is regular by examining the set of distinguishable strings' },
    ];
  
    // Append each flashcard to the container element
    const container = document.querySelector('.container');
    let currentCard = 0;
    displayCard(currentCard);
  
    function displayCard(index) {
        document.querySelector('.button-container').style.display = 'none';
        let flipped = false;
        container.innerHTML = '';
        if (index >= cards.length) {
          const messageContainer = document.createElement('div');
          messageContainer.className = 'message-container';
      
          const message = document.createElement('span');
          message.className = 'message';
          message.innerHTML = 'You completed the deck!';
      
          const backToStartBtn = document.createElement('button');
          backToStartBtn.innerHTML = 'Return to Start';
          backToStartBtn.className = 'return-to-start-btn'; // Add a class to the button
      
          backToStartBtn.addEventListener('click', function() {
            window.location.href = `start?deck=${deckId}`;
          });
      
          messageContainer.appendChild(message);
          messageContainer.appendChild(backToStartBtn);
      
          container.appendChild(messageContainer);
          document.querySelector('.button-container').style.display = 'none';
          return;
        }
      
        const card = cards[index];
        const flashcard = document.createElement('div');
        flashcard.className = 'card';
      
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
      
        const frontFace = document.createElement('div');
        frontFace.className = 'card-face card-face--front';
        const frontText = document.createElement('p');
        frontText.innerHTML = `${card.front}`;
        frontFace.appendChild(frontText);
      
        const backFace = document.createElement('div');
        backFace.className = 'card-face card-face--back';
        const backText = document.createElement('p');
        backText.innerHTML = `${card.back}`;
        backFace.appendChild(backText);
      
        cardInner.appendChild(frontFace);
        cardInner.appendChild(backFace);
      
        flashcard.appendChild(cardInner);
        container.appendChild(flashcard);
      
        // Add event listener to flip cards on click
        const cardInnerElement = flashcard.querySelector(".card-inner");
      
        cardInnerElement.addEventListener("click", function (e) {
          console.log("Card clicked");
          cardInnerElement.classList.toggle('is-flipped');
      
          // If the card is flipped to the back for the first time
          if (!flipped && cardInnerElement.classList.contains('is-flipped')) {
            flipped = true;
            setTimeout(() => {
              document.querySelector('.button-container').style.display = 'flex';
            }, 800); // 1000 milliseconds = 1 second delay
          }
        });
      
        function getNextCard(button) {
          // Log the current card and button
          console.log(`Card: ${card.front} | ${card.back} | Button: ${button}`);
      
          // Increment currentCard and display the next card
          currentCard++;
          displayCard(currentCard);
        }
      
        // Add event listeners to the button elements
        document.querySelector('#hard').addEventListener('click', () => getNextCard('Hard'));
        document.querySelector('#okay').addEventListener('click', () => getNextCard('Okay'));
        document.querySelector('#good').addEventListener('click', () => getNextCard('Good'));
        document.querySelector('#easy').addEventListener('click', () => getNextCard('Easy'));
      }
      });
  
  
    





  