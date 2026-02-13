import "./index.css";
import {
  enableValidation,
  resetValidation,
  disableButton,
  settings,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3fbef0c6-3b67-405f-a8e7-9abeecc851d3",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([userInfo, cards]) => {
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;

    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileSubmitButton = editProfileModal.querySelector(".modal__save");
const modalCloseProfile = editProfileModal.querySelector(
  ".modal__close-button",
);
const editProfileForm = editProfileModal.querySelector(".modal__form");
const currentName = editProfileModal.querySelector("#profile-name-input");
const currentDescription = editProfileModal.querySelector(
  "#profile-description-input",
);

const newPost = document.querySelector(".profile__new-post");
const newPostModal = document.querySelector("#new-post-modal");
const cardSubmitButton = newPostModal.querySelector(".modal__save");
const modalCloseNewPost = newPostModal.querySelector(".modal__close-button");
const newPostForm = newPostModal.querySelector(".modal__form");
const currentImage = newPostModal.querySelector("#card-image-input");
const currentCaption = newPostModal.querySelector("#card-caption-input");

const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitButton = avatarModal.querySelector(".modal__save");
const avatarCloseNewPost = avatarModal.querySelector(".modal__close-button");
const avatarImage = avatarModal.querySelector("#profile-avatar-input");
const profileAvatar = document.querySelector(".profile__avatar");
const avatarButton = document.querySelector(".profile__avatar-btn");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = document.querySelector("#delete-form");
const deleteCloseButton = deleteModal.querySelector(".modal__close-button");
const deleteConfirmButton = deleteForm.querySelector(".modal__delete");
const deleteCancelButton = deleteForm.querySelector(".modal__cancel");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button_type_preview",
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

modalCloseProfile.addEventListener("click", function () {
  closeModal(editProfileModal);
});

deleteCloseButton.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteCancelButton.addEventListener("click", handleDeleteCancel);

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const actualCardElement = cardElement.querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDescription = cardElement.querySelector(".card__description");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardDescription.textContent = data.name;

  likeButton.addEventListener("click", (evt) => handleLike(evt, data._id));
  if (data.isLiked === true) {
    likeButton.classList.add("card__like-button_is-liked");
  }

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (evt) =>
    handleDeleteCard(actualCardElement, data),
  );

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

let selectedCard = null;
let selectedCardId = null;
function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteCancel() {
  selectedCard = null;
  selectedCardId = null;

  closeModal(deleteModal);
}

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-button_is-liked");

  api
    .changeLikeStatus(id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-button_is-liked");
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  toggleButtonLoading(deleteConfirmButton, true, "Deleting...");
  api
    .removeCard(selectedCardId)
    .then((data) => {
      selectedCard.remove();
      toggleButtonLoading(deleteConfirmButton, false);

      closeModal(deleteModal);
    })
    .catch((error) => {
      toggleButtonLoading(deleteConfirmButton, false);
      console.log(error);
    });
}

function toggleButtonLoading(buttonEl, isLoading, loadingText = "Saving...") {
  if (buttonEl.originalText == null) {
    buttonEl.originalText = buttonEl.textContent;
  }

  if (isLoading) {
    buttonEl.textContent = loadingText;
  } else {
    buttonEl.textContent = buttonEl.originalText;
  }
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  toggleButtonLoading(editProfileSubmitButton, true);
  api
    .editUserInfo({ name: currentName.value, about: currentDescription.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      toggleButtonLoading(editProfileSubmitButton, false);

      closeModal(editProfileModal);
    })
    .catch((error) => {
      toggleButtonLoading(editProfileSubmitButton, false);
      console.log(error);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  toggleButtonLoading(avatarSubmitButton, true);
  api
    .updateAvatar({ avatar: avatarImage.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      toggleButtonLoading(avatarSubmitButton, false);

      closeModal(avatarModal);
    })
    .catch((error) => {
      toggleButtonLoading(avatarSubmitButton, false);
      console.log(error);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  toggleButtonLoading(cardSubmitButton, true);
  api
    .addCard({ name: currentCaption.value, link: currentImage.value })
    .then((data) => {
      const cardElement = getCardElement(data);

      cardsList.prepend(cardElement);
      newPostForm.reset();
      toggleButtonLoading(cardSubmitButton, false);
      disableButton(cardSubmitButton, settings);
      closeModal(newPostModal);
    })
    .catch((error) => {
      toggleButtonLoading(cardSubmitButton, false);
      console.log(error);
    });
}

newPost.addEventListener("click", function () {
  openModal(newPostModal);
});

modalCloseNewPost.addEventListener("click", function () {
  closeModal(newPostModal);
});

avatarButton.addEventListener("click", function () {
  avatarForm.reset();
  resetValidation(avatarForm, [avatarImage], settings);
  disableButton(avatarSubmitButton, settings);
  openModal(avatarModal);
});

avatarCloseNewPost.addEventListener("click", function () {
  closeModal(avatarModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);
newPostForm.addEventListener("submit", handleAddCardSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);
