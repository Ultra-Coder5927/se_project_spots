const editProfile = document.querySelector(".profile__edit-profile");
const edit__Profile__modal = document.querySelector("#edit-profile-modal");
const modalClose__profile = edit__Profile__modal.querySelector(
  ".modal__close-button"
);
const editProfileForm = edit__Profile__modal.querySelector(".modal__form");
const currentName = edit__Profile__modal.querySelector("#profile-name-input");
const currentDescription = edit__Profile__modal.querySelector(
  "#profile-description-input"
);

const newPost = document.querySelector(".profile__new-post");
const newPost__modal = document.querySelector("#new-post-modal");
const modalClose__newPost = newPost__modal.querySelector(
  ".modal__close-button"
);
const newPostForm = newPost__modal.querySelector(".modal__form");
const currentImage = newPost__modal.querySelector("#card-image-input");
const currentCaption = newPost__modal.querySelector("#card-caption-input");

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

  openModal(edit__Profile__modal);
});

modalClose__profile.addEventListener("click", function () {
  edit__Profile__modal.classList.remove("modal_is-open");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = currentName.value;
  profileDescription.textContent = currentDescription.value;

  closeModal(edit__Profile__modal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

newPost.addEventListener("click", function () {
  openModal(newPost__modal);
});

modalClose__newPost.addEventListener("click", function () {
  closeModal(newPost__modal);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log(currentImage.value);
  console.log(currentCaption.value);

  closeModal(newPost__modal);
}

newPostForm.addEventListener("submit", handleAddCardSubmit);
