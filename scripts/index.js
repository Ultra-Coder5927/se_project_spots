const editProfile = document.querySelector(".profile__edit-profile");
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
const modalCloseNewPost = newPostModal.querySelector(".modal__close-button");
const newPostForm = newPostModal.querySelector(".modal__form");
const currentImage = newPostModal.querySelector("#card-image-input");
const currentCaption = newPostModal.querySelector("#card-caption-input");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function openModal(modal) {
  modal.classList.add("modal_is-open");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
}

editProfile.addEventListener("click", function () {
  currentName.value = profileName.textContent;
  currentDescription.value = profileDescription.textContent;

  openModal(editProfileModal);
});

modalCloseProfile.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-open");
});

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

  console.log(currentImage.value);
  console.log(currentCaption.value);

  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleAddCardSubmit);
