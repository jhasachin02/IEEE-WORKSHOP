document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById("search-input").value;
    searchMovies(searchTerm);
  });


 
function searchMovies(searchTerm) {
  fetch(`http://www.omdbapi.com/?apikey=8cb0928d&s=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        const movies = data.Search;
        displayMovies(movies);
      } else {
        document.getElementById(
          "movie-details"
        ).innerHTML = `<p>No movies found with the term "${searchTerm}"</p>`;
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayMovies(movies) {
  const movieDetails = document.getElementById("movie-details");
  movieDetails.innerHTML = "";
  movies.forEach((movie) => {
    movieDetails.innerHTML += `
            <div>
                <h2>${movie.Title}</h2>
                <p>Year: ${movie.Year}</p>
                <p>Type: ${movie.Type}</p>
                <img src="${movie.Poster}" alt="${movie.Title} Poster" style="max-width: 200px;">
            </div>
        `;
  });
}
