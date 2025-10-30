const editProfile = document.querySelector(".profile__edit-profile");
const editProfile__modal = document.querySelector("#edit-profile-modal");
const modalClose__profile = editProfile__modal.querySelector(
  ".modal__close-button"
);

const newPost = document.querySelector(".profile__new-post");
const newPost__modal = document.querySelector("#new-post-modal");
const modalClose__newPost = newPost__modal.querySelector(
  ".modal__close-button"
);

editProfile.addEventListener("click", function () {
  editProfile__modal.classList.add("modal_is-open");
});

modalClose__profile.addEventListener("click", function () {
  editProfile__modal.classList.remove("modal_is-open");
});

newPost.addEventListener("click", function () {
  newPost__modal.classList.add("modal_is-open");
});

modalClose__newPost.addEventListener("click", function () {
  newPost__modal.classList.remove("modal_is-open");
});
