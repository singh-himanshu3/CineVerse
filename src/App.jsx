import React, { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal'; 


function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query,setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  

  const handleSearch = (e) => {
    e.preventDefault(); 
    setSearchTerm(query); 
  };

  const handleGoHome = () => {
    setSearchTerm('');
    setQuery('');
  };
  
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY ;

useEffect(() => {
  const fetchMovies = async () => {
      setLoading(true);
      let url = '';

      if (searchTerm) {
          // If there's a search term, use the search endpoint
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`;
      } 
      else {
          // Otherwise, get popular movies
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      }

        
      try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setMovies(data.results);
        }
        else {
            console.error("API Error:", response.statusText);
            setMovies([]);
        }
      } 
      catch (error) {
          console.error("Failed to fetch movies:", error);
          setMovies([]);
      }
      setLoading(false);
  };

  fetchMovies();
}, [searchTerm]); 


  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 onClick={handleGoHome} className="text-4xl font-bold text-center text-red-600 mb-8 cursor-pointer hover:text-red-500 transition-colors duration-300">
          CineVerse
        </h1>
        
    <form onSubmit={handleSearch} className="mb-8 max-w-xl mx-auto">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button type="submit" className="bg-red-600 px-6 py-2 rounded-r-lg font-bold hover:bg-red-700">
          Search
        </button>
      </div>
    </form>

        {loading ? (
          <p className="text-center text-xl">Loading movies...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {movies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onCardClick={() => setSelectedMovie(movie)} 
            />
          ))}
          </div>
        )}
      </div>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
}

export default App;