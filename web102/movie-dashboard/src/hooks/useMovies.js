// src/hooks/useMovies.js
import { useState, useEffect } from 'react';
import { fetchPopularMovies, fetchGenres, searchMovies } from '../utils/api';

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [ratingRange, setRatingRange] = useState([0, 10]);

  // Fetch genres list
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await fetchGenres();
        setGenres(genreList);
      } catch (err) {
        setError(err.message);
      }
    };
    loadGenres();
  }, []);

  // Fetch movie data
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        let movieData;
        if (searchQuery.trim()) {
          movieData = await searchMovies(searchQuery);
        } else {
          movieData = await fetchPopularMovies();
        }
        setMovies(movieData.results || []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const debounceTimer = setTimeout(loadMovies, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Filter movies
  const filteredMovies = movies.filter(movie => {
    const matchesGenre = !selectedGenre || movie.genre_ids.includes(parseInt(selectedGenre));
    const matchesRating = movie.vote_average >= ratingRange[0] && movie.vote_average <= ratingRange[1];
    return matchesGenre && matchesRating;
  });

  // Calculate statistics
  const statistics = {
    totalMovies: filteredMovies.length,
    averageRating: filteredMovies.length > 0 
      ? (filteredMovies.reduce((sum, movie) => sum + movie.vote_average, 0) / filteredMovies.length).toFixed(1)
      : 0,
    highRatedPercentage: filteredMovies.length > 0 
      ? Math.round((filteredMovies.filter(movie => movie.vote_average >= 7.5).length / filteredMovies.length) * 100)
      : 0,
    popularGenres: genres.length > 0 ? getPopularGenres(filteredMovies, genres) : []
  };

  // Calculate most popular genres
  function getPopularGenres(movies, genreList) {
    const genreCount = {};
    movies.forEach(movie => {
      movie.genre_ids.forEach(genreId => {
        genreCount[genreId] = (genreCount[genreId] || 0) + 1;
      });
    });

    const sortedGenres = Object.entries(genreCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([genreId, count]) => ({
        name: genreList.find(g => g.id === parseInt(genreId))?.name || 'Unknown',
        count
      }));

    return sortedGenres;
  }

  return {
    movies: filteredMovies,
    genres,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    ratingRange,
    setRatingRange,
    statistics
  };
};