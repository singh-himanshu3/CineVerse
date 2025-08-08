import React from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';

const MovieModal = ({ movie, onClose }) => {
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';
  const TMDB_PAGE = 'https://www.themoviedb.org/movie/';

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">

      
      <div className="bg-gray-800 text-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 relative">

        
        <button onClick={onClose} className="absolute cursor-pointer top-4 right-4 text-2xl text-white hover:text-red-600">
          <FaTimes />
        </button>

        <div className="flex flex-col md:flex-row">
          <img
            src={movie.poster_path ? `${IMAGE_PATH}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-l-lg"
          />
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
              <p className="text-gray-300 mb-6">{movie.overview}</p>
              <div className="flex items-center mb-6">
                <FaStar className="text-yellow-400 mr-2" />
                <span className="text-xl font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-gray-400 ml-4">Release Date: {movie.release_date}</span>
              </div>
            </div>
            <a
              href={`${TMDB_PAGE}${movie.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white font-bold text-center py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              More Info & Watch Options
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieModal;