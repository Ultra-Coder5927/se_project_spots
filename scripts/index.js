const editProfile = document.querySelector(".profile__edit-profile");
const editProfile__modal = document.querySelector("#edit-profile-modal");
const modalClose__profile = editProfile__modal.querySelector(
  ".modal__close-button"
);
const editProfileForm = editProfile__modal.querySelector(".modal__form");
const currentName = editProfile__modal.querySelector("#profile-name-input");
const currentDescription = editProfile__modal.querySelector(
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

editProfile.addEventListener("click", function () {
  currentName.value = profileName.textContent;
  currentDescription.value = profileDescription.textContent;

  editProfile__modal.classList.add("modal_is-open");
});

modalClose__profile.addEventListener("click", function () {
  editProfile__modal.classList.remove("modal_is-open");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = currentName.value;
  profileDescription.textContent = currentDescription.value;

  editProfile__modal.classList.remove("modal_is-open");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

newPost.addEventListener("click", function () {
  newPost__modal.classList.add("modal_is-open");
});

modalClose__newPost.addEventListener("click", function () {
  newPost__modal.classList.remove("modal_is-open");
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log(currentImage.value);
  console.log(currentCaption.value);

  newPost__modal.classList.remove("modal_is-open");
}

newPostForm.addEventListener("submit", handleAddCardSubmit);
