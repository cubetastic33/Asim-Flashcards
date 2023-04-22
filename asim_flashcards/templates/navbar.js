var openModalButton = document.getElementById("openModal");
var navbarModal = document.querySelector(".modal");
var modalBackground = document.querySelector(".modal-background");
var modalClose = document.getElementById("modal-close");

openModalButton.addEventListener("click", function() {
  navbarModal.classList.add("active");
  modalBackground.classList.add("active");
});

modalClose.addEventListener("click", function() {
  navbarModal.classList.remove("active");
  modalBackground.classList.remove("active");
});