import React from 'react';
import { FaStar } from 'react-icons/fa';

const MovieCard = ({ movie, onCardClick }) => {
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';

  return (
    <div onClick={() => onCardClick(movie)}
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
      <img
        src={movie.poster_path ? `${IMAGE_PATH}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
        alt={movie.title}
        className="w-full h-auto"
      />
      <div className="p-4">
        <h3 className="text-white text-lg font-bold truncate">{movie.title}</h3>
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-400 mr-2" />
          <span className="text-gray-400 font-semibold">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;