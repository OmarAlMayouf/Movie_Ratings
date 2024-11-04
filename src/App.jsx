import { useRef } from "react"

const API_KEY = "e737ad74";

export default function App() {
  const movieNameRef = useRef(null);
  const error = useRef(null);
  const searchButton = useRef(null);
  const result = useRef(null);
  const resultWrapper = useRef(null);
  const movieTitleRef = useRef(null);
  const movieRatingRef = useRef(null);
  const movieDetailsRef = useRef(null);
  const movieGenreRef = useRef(null);
  const moviePlotRef = useRef(null);
  const movieCastRef = useRef(null);

  let getMovie = () => {
    let movieName = movieNameRef.current.value.trim();
    let url =  `https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`;
  
    if(movieName.length <= 0) {
      // show error
      resultWrapper.current.classList.add("hidden");
      error.current.classList.remove("hidden");
      error.current.innerHTML = `<h3>Please enter the title of a movie, TV show, or anime</h3>`;
    }
    else{
      // remove error div
      resultWrapper.current.classList.remove("hidden");
      error.current.classList.add("hidden");
      fetch(url).then((resp) => resp.json()).then((data) => {
        if (data.Response === "True") {
          let movie = data.Search[0];
          result.current.innerHTML = `<img class="object-cover object-center w-full" src="${movie.Poster}" alt="movie cover"/>`;
          movieTitleRef.current.innerHTML = `<h3>${movie.Title}</h3>`;
          let detailUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`;
          fetch(detailUrl).then((resp) => resp.json()).then((details) => {
            movieRatingRef.current.innerHTML = `
            <svg class="mr-3" xmlns="https://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="#fcd53f" d="m18.7 4.627l2.247 4.31a2.27 2.27 0 0 0 1.686 1.189l4.746.65c2.538.35 3.522 3.479 1.645 5.219l-3.25 2.999a2.23 2.23 0 0 0-.683 2.04l.793 4.398c.441 2.45-2.108 4.36-4.345 3.24l-4.536-2.25a2.28 2.28 0 0 0-2.006 0l-4.536 2.25c-2.238 1.11-4.786-.79-4.345-3.24l.793-4.399c.14-.75-.12-1.52-.682-2.04l-3.251-2.998c-1.877-1.73-.893-4.87 1.645-5.22l4.746-.65a2.23 2.23 0 0 0 1.686-1.189l2.248-4.309c1.144-2.17 4.264-2.17 5.398 0"/></svg>
            <h3>${details.imdbRating}</h3>`;
            movieDetailsRef.current.innerHTML = `<h3 class="mr-3">${details.Rated}</h3> <h3 class="mr-3">${details.Year}</h3> <h3>${details.Runtime}</h3>`;
            let genre = details.Genre.split(',');
            movieGenreRef.current.innerHTML = genre.map((genre, index) => 
              `<span key=${index} class="flex align-center p-2 justify-center border border-gray-500 rounded-lg">${genre.trim()}</span>`
            ).join('');
            moviePlotRef.current.innerHTML = `<h1 class="text-white text-2xl font-semibold">Plot:</h1><p class="text-gray-400 text-lg font-thin">${details.Plot}</p>`;
            movieCastRef.current.innerHTML = `<h1 class="text-white text-2xl font-semibold">Cast:</h1><p class="text-gray-400 text-lg font-thin">${details.Actors}</p>`;
          })
        } else {
          // show error
          resultWrapper.current.classList.add("hidden");
          error.current.classList.remove("hidden");
          error.current.innerHTML = `<h3>No results found</h3>`;
        }
      })
    }
  }
  return (
    <div class="w-full h-screen bg-black flex justify-center items-center bg-gradient-to-b to-blue-950 from-black overflow-hidden">
      {/*container*/}
      <div className="w-5/12 h-5/6 bg-black rounded-3xl px-10 py-20 border border-gray-500 shadow-inner shadow-white" >

        {/*input container*/}
        <div className="grid grid-cols-12 gap-5">
          {/*input field*/}
          <input className="h-12 col-span-9 rounded-md px-6 bg-transparent border-2 border-gray-500 hover:border-gray-400 focus:outline-none focus:border-gray-300 font-medium text-lg text-white placeholder:text-gray-500 placeholder:italic "ref={movieNameRef} placeholder='Search for movies, TV shows, or animes...' type="text" name="search" id="search"></input>
          {/*sumbit button*/}
          <button 
            className="h-12 col-span-3 rounded-md bg-gradient-to-b from-black to-blue-950 hover:to-blue-900 hover:scale-105 shadow-inner shadow-blue-700 text-white font-medium text-lg px-10 text-center"
            id="search-button" 
            type="submit"
            onClick={getMovie}
            ref={searchButton}>
            <span>Search</span>
          </button>
        </div>

        {/*error container*/}
        <div className="mt-5 flex justify-center items-center align-center h-full w-full text-white text-center text-2xl font-semibold" id="error" ref={error}></div>
        {/*result wrapper*/}
          <div className="hidden " id="result-wrapper"  ref={resultWrapper}>
          {/*results container*/}
          <div className="mt-5 grid grid-cols-12">
            {/*photo cover*/}
            <div className="col-span-5 flex h-96" id="result" ref={result}></div>
            <div className="col-span-7">
              {/*movie title*/}
              <div className="h-30 w-full text-white text-center text-4xl font-bold overflow-hidden" id="movie-title" ref={movieTitleRef}></div>
              {/*movie rating*/}
              <div className="mt-5 flex justify-center items-center h-10 w-full text-white text-center text-2xl font-semibold" id="movie-Rating" ref={movieRatingRef}></div>
              {/*movie details*/}
              <div className="mt-5 flex justify-center items-center h-10 w-full text-gray-500 text-center text-2xl font-thin" id="movie-Details" ref={movieDetailsRef}></div>
              {/*movie genre*/}
              <div className="pl-8 mt-10 grid grid-flow-col gap-10 h-10 w-full text-white text-center text-xl font-thin" id="movie-Genre" ref={movieGenreRef}></div>
            </div>
          </div>
          
          {/*movie plot*/}
          <div className="h-10 w-full mt-5 mb-20" id="movie-plot" ref={moviePlotRef}>

          </div>
          {/*movie cast*/}
          <div className="h-10 w-full " id="movie-cast" ref={movieCastRef}></div>
        </div>
      </div>
    </div>
  )
}