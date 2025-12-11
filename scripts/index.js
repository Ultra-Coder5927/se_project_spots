const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const modalCloseProfile = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileForm = editProfileModal.querySelector(".modal__form");
const currentName = editProfileModal.querySelector("#profile-name-input");
const currentDescription = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPost = document.querySelector(".profile__new-post");
const newPostModal = document.querySelector("#new-post-modal");
const cardSubmitButton = newPostModal.querySelector(".modal__save");
const modalCloseNewPost = newPostModal.querySelector(".modal__close-button");
const newPostForm = newPostModal.querySelector(".modal__form");
const currentImage = newPostModal.querySelector("#card-image-input");
const currentCaption = newPostModal.querySelector("#card-caption-input");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button_type_preview"
);
const modalImageContainer = previewModal.querySelector(
  ".modal__image-container"
);
const modalImage = previewModal.querySelector(".modal__image");
const modalCaption = previewModal.querySelector(".modal__caption");

function openModal(modal) {
  modal.classList.add("modal_is-open");
  document.addEventListener("keydown", handleEscapeKey);
  document.addEventListener("click", handleClickOutside);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
  document.removeEventListener("keydown", handleEscapeKey);
  document.removeEventListener("click", handleClickOutside);
}

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDescription = cardElement.querySelector(".card__description");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardDescription.textContent = data.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-liked");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    const cardElement = deleteButton.closest(".card");
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    modalCaption.textContent = data.name;
    modalImage.src = data.link;
    modalImage.alt = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

editProfileButton.addEventListener("click", function () {
  currentName.value = profileName.textContent;
  currentDescription.value = profileDescription.textContent;

  resetValidation(editProfileForm, [currentName, currentDescription], settings);
  openModal(editProfileModal);
});

modalCloseProfile.addEventListener("click", function () {
  closeModal(editProfileModal);
});

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_is-open");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

function handleClickOutside(evt) {
  if (evt.target.classList.contains("modal")) {
    const activeModal = document.querySelector(".modal_is-open");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = currentName.value;
  profileDescription.textContent = currentDescription.value;

  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

newPost.addEventListener("click", function () {
  openModal(newPostModal);
});

modalCloseNewPost.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const cardElement = getCardElement({
    name: currentCaption.value,
    link: currentImage.value,
  });

  cardsList.prepend(cardElement);
  newPostForm.reset();
  disableButton(cardSubmitButton, settings);
  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
