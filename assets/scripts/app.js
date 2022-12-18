const addNewMovieDialog = document.querySelector(".add-movie-btn");

const backdrop = document.querySelector("#backdrop");
const addModal = document.querySelector("#add-modal");
const deleteModal = document.querySelector("#delete-modal");

const addModalCancelBtn = addModal.children[1].children[0];
const addModalSubmitBtn = addModal.children[1].children[1];

const noMoviesText = document.querySelector("#entry-text");
const moviesList = document.querySelector("#movie-list");

const form = addModal.children[0];
const title = document.querySelector("#title");
const imageUrl = document.querySelector("#image-url");
const rating = document.querySelector("#rating");

const movies = [];

const toggleBackdropHandler = () => {
  backdrop.classList.toggle("visible");
};

const AddModalDialogHandler = () => {
  addModal.classList.toggle("visible");
  toggleBackdropHandler();
  resetForm();
};

const resetForm = () => {
  title.value = "";
  imageUrl.value = "";
  rating.value = "";
};

const updateUI = () => {
  noMoviesText.classList.add("unvisible");

  if (movies.length > 0) {
    moviesList.textContent = "";
    movies.forEach((movie) => {
      const li = document.createElement("li");
      li.classList.add("movie-element");
      li.innerHTML = `<div class="movie-element__image">
				<img src=${movie.imageUrl} alt="${movie.title}" />
			</div>
			<div class="movie-element__info">
				<h2 >${movie.title}</h2>
				<p>${movie.rating} with 5 starts</p>
			</div>
			`;
      moviesList.appendChild(li);
    });
  } else {
    noMoviesText.classList.remove("unvisible");
  }
};

const submitMovieHandler = () => {
  const movie = formValidator();

  if (movie) {
    movies.push(movie);
    AddModalDialogHandler();
    updateUI();
  }
};

const formValidator = () => {
  const titleValue = title.value.trim();
  const imageUrlValue = imageUrl.value.trim();
  const ratingValue = rating.value.trim();

  if (!titleValue) {
    return alert("Movie's Title can't be empty");
  }

  if (
    !imageUrlValue ||
    !imageUrlValue.startsWith("https://") ||
    !imageUrlValue.startsWith("http://")
  ) {
    return alert("Url can't be empty");
  }

  if (!ratingValue || !(+ratingValue > 0 && +ratingValue < 6)) {
    return alert("Rating must be between 1 and 5");
  }

  const movie = {
    title: titleValue,
    imageUrl: imageUrlValue,
    rating: ratingValue,
    id: Math.random(),
  };

  if (
    titleValue &&
    imageUrlValue &&
    ratingValue &&
    +ratingValue > 0 &&
    +ratingValue < 6
  ) {
    return movie;
  }
};

addNewMovieDialog.addEventListener("click", AddModalDialogHandler);
backdrop.addEventListener("click", toggleBackdropHandler);
addModalCancelBtn.addEventListener("click", AddModalDialogHandler);
addModalSubmitBtn.addEventListener("click", submitMovieHandler);
