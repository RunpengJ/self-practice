// src/pages/MovieDetail.jsx
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMovieDetails } from '../hooks/queries/useMovies'
import { getImageUrl, formatters } from '../lib/utils'
import { 
  ArrowLeft, Star, Calendar, Clock, DollarSign, 
  Globe, Play, Heart, Bookmark, Share 
} from 'lucide-react'

const MovieDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: movie, isLoading, error } = useMovieDetails(id)

  if (isLoading) return <MovieDetailSkeleton />
  if (error) return <ErrorState onRetry={() => navigate('/')} />
  if (!movie) return <NotFoundState />

  const {
    title, overview, poster_path, backdrop_path, vote_average,
    release_date, runtime, budget, revenue, genres, homepage,
    credits, images, videos, reviews, similar, production_companies,
    production_countries, spoken_languages, tagline
  } = movie

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={getImageUrl(backdrop_path, 'original')}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-16 w-full">
            {/* Back Button */}
            <motion.button
              onClick={() => navigate(-1)}
              className="mb-8 flex items-center space-x-2 text-white/80 hover:text-white transition-colors group"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:transform group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </motion.button>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Poster */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-shrink-0"
              >
                <img 
                  src={getImageUrl(poster_path, 'w500')}
                  alt={title}
                  className="w-80 h-auto rounded-2xl shadow-2xl"
                />
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex-1 space-y-6 max-w-3xl"
              >
                {/* Title & Tagline */}
                <div>
                  <h1 className="text-5xl font-bold text-white mb-2">{title}</h1>
                  {tagline && (
                    <p className="text-xl text-blue-400 italic">{tagline}</p>
                  )}
                </div>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{vote_average.toFixed(1)}/10</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatters.date(release_date)}</span>
                  </div>
                  {runtime > 0 && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>{formatters.duration(runtime)}</span>
                    </div>
                  )}
                  {budget > 0 && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5" />
                      <span>Budget: {formatters.currency(budget)}</span>
                    </div>
                  )}
                  {revenue > 0 && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5" />
                      <span>Revenue: {formatters.currency(revenue)}</span>
                    </div>
                  )}
                </div>

                {/* Overview */}
                <p className="text-lg text-white/90 leading-relaxed">
                  {overview}
                </p>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {genres?.map(genre => (
                    <span 
                      key={genre.id}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm text-white"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {videos?.results?.[0] && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
                    >
                      <Play className="w-5 h-5" />
                      <span>Watch Trailer</span>
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-xl transition-all"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Add to Favorites</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-xl transition-all"
                  >
                    <Bookmark className="w-5 h-5" />
                    <span>Watchlist</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-xl transition-all"
                  >
                    <Share className="w-5 h-5" />
                    <span>Share</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Cast Section */}
        {credits?.cast && credits.cast.length > 0 && (
          <CastSection cast={credits.cast} />
        )}
        
        {/* Production Info */}
        <ProductionSection 
          companies={production_companies}
          countries={production_countries}
          languages={spoken_languages}
          homepage={homepage}
        />
        
        {/* Gallery Section */}
        {images?.backdrops && images.backdrops.length > 0 && (
          <GallerySection images={images.backdrops} />
        )}
        
        {/* Reviews Section */}
        {reviews?.results && reviews.results.length > 0 && (
          <ReviewsSection reviews={reviews.results} />
        )}
        
        {/* Similar Movies */}
        {similar?.results && similar.results.length > 0 && (
          <SimilarMoviesSection movies={similar.results} />
        )}
      </div>
    </motion.div>
  )
}

// Cast Section Component
const CastSection = ({ cast }) => {
  const [showAll, setShowAll] = useState(false)
  const displayCast = showAll ? cast : cast.slice(0, 8)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Cast</h2>
        {cast.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            {showAll ? 'Show Less' : `Show All (${cast.length})`}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {displayCast.map((actor, index) => (
          <motion.div
            key={actor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors group"
          >
            <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
              <img 
                src={actor.profile_path ? getImageUrl(actor.profile_path, 'w185') : '/placeholder-person.jpg'}
                alt={actor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/placeholder-person.jpg'
                }}
              />
            </div>
            <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">{actor.name}</h3>
            <p className="text-gray-400 text-xs line-clamp-2">{actor.character}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Production Section Component
const ProductionSection = ({ companies, countries, languages, homepage }) => (
  <section className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Production Info</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies && companies.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Production Companies</h3>
          <div className="space-y-3">
            {companies.slice(0, 3).map(company => (
              <div key={company.id} className="flex items-center space-x-3">
                {company.logo_path && (
                  <img 
                    src={getImageUrl(company.logo_path, 'w154')}
                    alt={company.name}
                    className="w-8 h-8 object-contain bg-white rounded p-1"
                  />
                )}
                <span className="text-gray-300 text-sm">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {countries && countries.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Countries</h3>
          <div className="space-y-2">
            {countries.map(country => (
              <div key={country.iso_3166_1} className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {languages && languages.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Languages</h3>
          <div className="space-y-2">
            {languages.map(language => (
              <span 
                key={language.iso_639_1}
                className="inline-block px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full mr-2 mb-2"
              >
                {language.english_name}
              </span>
            ))}
          </div>
          {homepage && (
            <div className="mt-4">
              <a 
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Visit Official Website →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  </section>
)

// Gallery Section Component  
const GallerySection = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Gallery</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.slice(0, 12).map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative aspect-video overflow-hidden rounded-xl cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={getImageUrl(image.file_path, 'w500')}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm5 3a2 2 0 11-4 0 2 2 0 014 0zm4.5 8.5l2.5-3 2.5 3h-5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Reviews Section Component
const ReviewsSection = ({ reviews }) => (
  <section className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Reviews</h2>
    
    <div className="space-y-4">
      {reviews.slice(0, 3).map((review) => (
        <div key={review.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {review.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="text-white font-bold">{review.author}</h4>
                {review.author_details?.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-400 text-sm">{review.author_details.rating}/10</span>
                  </div>
                )}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                {review.content}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                {formatters.date(review.created_at)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)

// Similar Movies Section Component
const SimilarMoviesSection = ({ movies }) => (
  <section className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Similar Movies</h2>
    
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {movies.slice(0, 12).map((movie, index) => (
        <Link key={movie.id} to={`/movie/${movie.id}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl mb-2">
              <img 
                src={getImageUrl(movie.poster_path, 'w300')}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-white text-xs font-medium">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
            <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-blue-400 transition-colors">
              {movie.title}
            </h4>
            <p className="text-gray-400 text-xs">
              {new Date(movie.release_date).getFullYear()}
            </p>
          </motion.div>
        </Link>
      ))}
    </div>
  </section>
)

// Loading States
const MovieDetailSkeleton = () => (
  <div className="min-h-screen animate-pulse">
    <div className="h-screen bg-gradient-to-t from-black to-gray-800">
      <div className="absolute bottom-16 left-8 right-8">
        <div className="flex space-x-8">
          <div className="w-80 h-96 bg-white/10 rounded-2xl"></div>
          <div className="flex-1 space-y-6">
            <div className="h-12 bg-white/10 rounded w-2/3"></div>
            <div className="h-6 bg-white/10 rounded w-1/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-white/10 rounded"></div>
              <div className="h-4 bg-white/10 rounded w-5/6"></div>
              <div className="h-4 bg-white/10 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ErrorState = ({ onRetry }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-white">Error loading movie</h2>
      <p className="text-gray-400">Something went wrong while loading the movie details.</p>
      <button 
        onClick={onRetry}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
)

const NotFoundState = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-white">Movie Not Found</h2>
      <p className="text-gray-400">The movie you're looking for doesn't exist.</p>
      <Link 
        to="/"
        className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  </div>
)

export default MovieDetail