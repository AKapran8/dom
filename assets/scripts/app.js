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

const cancelBtnHandler = () => {
  toggleBackdropHandler();
};

const toggleBackdropHandler = () => {
  backdrop.classList.remove("visible");
  addModal.classList.remove("visible");
  deleteModal.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
  const movieIndex = movies.findIndex((el) => el.id === movieId);
  movies.splice(movieIndex, 1);
  moviesList.children[movieIndex].remove();
  toggleBackdropHandler();
  updateUI();
};

const deleteMovie = (movieId) => {
  deleteModal.classList.add("visible");
  backdrop.classList.add("visible");

  const cancelBtn = deleteModal.children[2].children[0];
  let addBtn = deleteModal.children[2].children[1];

  cancelBtn.removeEventListener("click", cancelBtnHandler);
  addBtn.replaceWith(addBtn.cloneNode(true));
  addBtn = deleteModal.children[2].children[1];

  cancelBtn.addEventListener("click", cancelBtnHandler);
  addBtn.addEventListener("click", deleteMovieHandler.bind(null, movieId));
};

const AddModalDialogHandler = () => {
  addModal.classList.toggle("visible");
  backdrop.classList.toggle("visible");
  resetForm();
};

const resetForm = () => {
  title.value = "";
  imageUrl.value = "";
  rating.value = "";
};

const updateUI = () => {
  if (movies.length > 0) {
    noMoviesText.style.display = "none";
  } else {
    noMoviesText.style.display = "block";
  }
};

const renderNewMovie = (movie) => {
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

  li.addEventListener("click", deleteMovie.bind(null, movie.id));
  moviesList.appendChild(li);
};

const submitMovieHandler = () => {
  const movie = formValidator();

  if (movie) {
    movies.push(movie);
    AddModalDialogHandler();
    updateUI();
    renderNewMovie(movie);
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
    !(
      imageUrlValue.startsWith("https://") ||
      imageUrlValue.startsWith("http://")
    )
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
addModalCancelBtn.addEventListener("click", cancelBtnHandler);
addModalSubmitBtn.addEventListener("click", submitMovieHandler);
