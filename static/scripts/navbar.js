// Get the modal and buttons
const navbarModal = document.getElementById("navbar-modal");
const openModalButton = document.getElementById("openModal");
const modalBackground = document.querySelector(".modal-background");
const modalClose = document.getElementById("modal-close");

// Open the modal
openModalButton.addEventListener("click", function() {
  navbarModal.classList.add("active");
  modalBackground.classList.add("active");
  timerModal.classList.remove("active");
});

// Close the modal
function closeModal() {
  navbarModal.classList.remove("active");
  modalBackground.classList.remove("active");
}

modalBackground.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

