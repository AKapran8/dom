const openAddNewMovieDialog = document.querySelector(".add-movie-btn");
const backdrop = document.querySelector("#backdrop");
const addModal = document.querySelector("#add-modal");
const addModalCancelBtn = addModal.children[1].children[0];
const addModalSubmitBtn = addModal.children[1].children[1];
const noMoviesText = document.querySelector("#entry-text");
const moviesList = document.querySelector("#movie-list");
const deleteModal = document.querySelector("#delete-modal");

const form = addModal.children[0];
const title = document.querySelector("#title");
const imageUrl = document.querySelector("#image-url");
const rating = document.querySelector("#rating");

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
  addModal.classList.remove("visible");
};

const AddModal = () => {
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
    noMoviesText.classList.add("unvisible");
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

const addNewMovie = () => {
  const movie = formValidator();

  if (movie) {
    movies.push(movie);
    AddModal();
    updateUI();
    resetForm();
  }
};

const formValidator = () => {
  const titleValue = "Tha Class of Elite";
  const imageUrlValue =
    "https://i.pinimg.com/originals/93/13/68/93136842d12d5865931e2950d351c81a.png";
  // const titleValue = title.value.trim();
  // const imageUrlValue = imageUrl.value.trim();
  const ratingValue = rating.value.trim();

  if (!titleValue) {
    alert("Movie Title can't be empty");
  }

  if (!imageUrlValue && !imageUrlValue.startsWith("http")) {
    alert("Url must be start with 'http or https'");
  }

  if (!ratingValue || !(+ratingValue > 0 && +ratingValue < 6)) {
    alert("Rating must be between 1 and 5");
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

openAddNewMovieDialog.addEventListener("click", AddModal);
backdrop.addEventListener("click", toggleBackdrop);
addModalCancelBtn.addEventListener("click", AddModal);
addModalSubmitBtn.addEventListener("click", addNewMovie);
