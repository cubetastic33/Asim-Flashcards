const addDeckContainer = document.querySelector('.card-container.add');
const deckNameField = document.querySelector('#name');
const modalAddDeck = document.querySelector('#add-deck-modal-background');
const decksList = document.querySelector('#decks-list');
const deckDataElement = document.getElementById('deck-data');
const deckDataAttributes = deckDataElement.attributes;

for (let i = 0; i < deckDataAttributes.length; i++) {
  const attr = deckDataAttributes[i];
  if (attr.name.startsWith('data-deck')) {
    const [deckName, newCards, reviewCards] = attr.value.split('|');
    createNewDeckElement(deckName, parseInt(newCards), parseInt(reviewCards));

  }
}

function createNewDeckElement(deckName, newCardsCount, reviewCardsCount) {
  const listItem = document.createElement('li');

  const newDeckElement = document.createElement('div');
  newDeckElement.className = 'card-container card';
  newDeckElement.setAttribute('onclick', `navigateToFlashcards('${deckName}')`);
  newDeckElement.textContent = deckName;

  const trashCanBackground = document.createElement('div');
  trashCanBackground.className = 'trash-icon-background';

  const trashCanIcon = document.createElement('span');
  trashCanIcon.className = 'trash-icon';
  trashCanIcon.innerHTML = '<i class="fa fa-trash"></i>';
  trashCanIcon.setAttribute('data-deck-name', deckName);

  trashCanIcon.addEventListener('click', event => {
    event.stopPropagation(); // Prevent the click event from propagating to the card element
    const confirmed = confirm('Are you sure you want to delete this deck?');
    if (confirmed) {
      fetch('/delete_deck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deckName),
      }).then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete deck');
        }
        // Remove the card element from the deck list
        listItem.remove();
      }).catch((error) => {
        console.error(error);
        alert('Failed to delete deck');
      });
    }
  });


  const cardStatusList = document.createElement('ul');
  cardStatusList.style.cssText = 'display: flex; flex-direction: column; justify-content: center; margin-top: 50px;';

  const newCards = document.createElement('div');
  newCards.className = 'status-container new';
  newCards.innerHTML = `<span class="num">${newCardsCount}</span> new`;

  const reviewCards = document.createElement('div');
  reviewCards.className = 'status-container review';
  reviewCards.innerHTML = `<span class="num">${reviewCardsCount}</span> review`;

  cardStatusList.appendChild(newCards);
  cardStatusList.appendChild(reviewCards);
  trashCanBackground.appendChild(trashCanIcon);
  newDeckElement.appendChild(trashCanBackground);
  newDeckElement.appendChild(cardStatusList);

  listItem.appendChild(newDeckElement);
  decksList.insertBefore(listItem, addDeckContainer.parentElement);
}


function handleDeleteClick(deckName, listItem) {
  const confirmed = confirm('Are you sure you want to delete this deck?');
  if (confirmed) {
    const formData = new FormData();
    formData.append('name', deckName);

    fetch('/delete_deck', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete deck');
        }
        // Remove the card element from the deck list
        listItem.remove();
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to delete deck');
      });
  }
}


addDeckContainer.addEventListener('click', () => {
  modalAddDeck.style.display = 'block';
});

const addDeckButton = document.querySelector('#add-deck-btn');

addDeckButton.addEventListener('click', async () => {
  const deckName = deckNameField.value;
  if (!deckName) {
    // Display an error message if empty.
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Please provide a deck name';
    errorMessage.className = 'error';
    document.body.appendChild(errorMessage);

    // Fade out the error message after a few seconds.
    setTimeout(() => {
      errorMessage.style.opacity = '0';
    }, 2000);

    // Remove the error message after the fade-out effect is complete.
    setTimeout(() => {
      document.body.removeChild(errorMessage);
    }, 3000);

    return;
  }
  console.log(`Deck name: ${deckName}`);
  // do something with the deck name, like add it to a list of decks
  let message;
  const data = new FormData();
  data.append('name', deckName);
  await fetch('/create_deck', {
    method: 'POST',
    body: data,
  }).then(response => response.json()).then(data => {
    message = data;
  });
  if (!Object.hasOwn(message, 'status')) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Deck already exists';
    errorMessage.className = 'error';
    document.body.appendChild(errorMessage);

    // Fade out the error message after a few seconds.
    setTimeout(() => {
      errorMessage.style.opacity = '0';
    }, 2000);

    // Remove the error message after the fade-out effect is complete.
    setTimeout(() => {
      document.body.removeChild(errorMessage);
    }, 3000);

    return;
  }

  createNewDeckElement(deckName, message.new_cards, message.review_cards);


  // Display a confirmation message.
  const confirmation = document.createElement('div');
  confirmation.textContent = 'Deck created successfully!';
  confirmation.className = 'confirmation';
  document.body.appendChild(confirmation);

  // Fade out the confirmation message after a few seconds.
  setTimeout(() => {
    confirmation.style.opacity = '0';
  }, 2000);

  // Remove the confirmation message after the fade-out effect is complete.
  setTimeout(() => {
    document.body.removeChild(confirmation);
  }, 3000);
  modalAddDeck.style.display = 'none';
  deckNameField.value = '';
});

const closeBtn = document.getElementsByClassName('close')[0];
closeBtn.onclick = function () {
  modalAddDeck.style.display = 'none';
};


const darkmode = document.getElementById("darkmode-icon");
 darkmode.addEventListener("click", switchToDarkMode);
 var mode = false;
 
 function switchToDarkMode() {
    darkmode.innerText = darkmode.innerText === "dark_mode" ? "light_mode" : "dark_mode";
    document.querySelector(".navbar").classList.toggle("switchToDarkMode-header");
    document.querySelector(".modal").classList.toggle("switchToDarkMode-header");
    document.querySelector(".nav-title").classList.toggle("switchToDarkMode-header");
    document.querySelector("#ham").classList.toggle("switchToDarkMode-hamburger");
    document.querySelector("#bur").classList.toggle("switchToDarkMode-hamburger");
    document.querySelector("#ger").classList.toggle("switchToDarkMode-hamburger");
    document.querySelector(".timer").classList.toggle("switchToDarkMode-timer");
    
    document.body.classList.toggle("switchToDarkMode-body");
    

    if(mode){
        mode = false;
        document.querySelector("#darkmode-icon").style.backgroundColor = "#ffffff";
        document.querySelector("#timer-icon").style.backgroundColor = "#ffffff";
        document.querySelector(".navbar-hamburger").style.backgroundColor = "#ffffff";
    } else {
        mode = true;
        document.querySelector("#darkmode-icon").style.backgroundColor = "#232222";
        document.querySelector("#timer-icon").style.backgroundColor = "#232222";
        document.querySelector(".navbar-hamburger").style.backgroundColor = "#232222";
    }

    var linkTexts = document.querySelectorAll(".link-text");
    linkTexts.forEach((element) => {
        element.classList.toggle("switchToDarkMode-links");
    })

    var decks = document.querySelectorAll(".card-container");
    decks.forEach((deckMode) => {
      deckMode.classList.toggle("switchToDarkMode-body")
   })

 }