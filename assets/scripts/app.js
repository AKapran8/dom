const openAddNewMovieDielog = document.querySelector(".add-movie-btn");
const backdrop = document.querySelector("#backdrop");
const addModal = document.querySelector("#add-modal");
const addModalCancelBtn = addModal.children[1].children[0];
const addModalSubmitBtn = addModal.children[1].children[1];
const form = addModal.children[0];
const title = document.querySelector("#title");
const imageUrl = document.querySelector("#image-url");
const rating = document.querySelector("#rating");

const movies = [];

const toggleAddModalHandler = () => {
  backdrop.classList.toggle("visible");
  addModal.classList.toggle("visible");
};

const addNewMovie = () => {
  const movie = formValidator();

	if (movie) {
		movies.push(movie);
    toggleAddModalHandler();
  }
};

const formValidator = () => {
  const titleValue = title.value.trim();
  const imageUrlValue = imageUrl.value.trim();
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
		id: Math.random()
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

openAddNewMovieDielog.addEventListener("click", toggleAddModalHandler);
backdrop.addEventListener("click", toggleAddModalHandler);
addModalCancelBtn.addEventListener("click", toggleAddModalHandler);
addModalSubmitBtn.addEventListener("click", addNewMovie);
