// Globals
// 1. Constants
const API_URL = "http://localhost:3000";
const endpoint = "films";

// 2. State
let firstMovieData = undefined;

// 3. DOM elements
const firstMovieCardEl = document.querySelector(".first-movie div.movie");

// Steps to get the app working
showFirstMovieDetails();

// Helper functions
async function showFirstMovieDetails() {
  // Get movie details from API
  const movieData = await getMovie(1);
  // Add movie data to state
  firstMovieData = movieData;
  // Render new state data
  renderFirstMovie(firstMovieData);
}

async function getMovie(movieId) {
  const movieData = await fetchMovie(movieId);
  return movieData;
}

async function fetchMovie(id) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`);

    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    const data = await response.json(); // Parse the data as JSON
    return data;
  } catch (error) {
    console.error(`There was a problem with your fetch operation: ${error}`);
  }
}

function renderFirstMovie(data) {
  const firstMovieCardPosterEl = firstMovieCardEl.querySelector("img");
  const firstMovieCardTitleEl = firstMovieCardEl.querySelector(".title");
  const firstMovieCardRuntime = firstMovieCardEl.querySelector(".runtime");
  const firstMovieCardShowtime = firstMovieCardEl.querySelector(".showtime");
  const firstMovieCardAvailableTickets =
    firstMovieCardEl.querySelector(".available-tickets");

  firstMovieCardPosterEl.setAttribute("src", data.poster);
  firstMovieCardPosterEl.setAttribute("alt", data.title);
  firstMovieCardTitleEl.textContent = `Title: ${data.title}`;
  firstMovieCardRuntime.textContent = `Runtime: ${data.runtime} mins`;
  firstMovieCardShowtime.textContent = `Showtime: ${data.showtime}`;

  const availableTickets = data.capacity - data.tickets_sold;
  firstMovieCardAvailableTickets.textContent = `Available Tickets: ${availableTickets}`;
}
