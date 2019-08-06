// API/TMDBApi.js

const API_TOKEN = "e160e8a48d4ca4254a2e5d36fef9951e";

export function getFilmsFromApiWithSearchedText (text) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))

  
}