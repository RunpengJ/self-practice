// src/utils/api.js - 扩展现有的API文件
import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3'

// 创建axios实例
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

// 现有的API函数 (保持不变)
export const fetchGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list')
    return response.data.genres
  } catch (error) {
    console.error('Error fetching genres:', error)
    throw new Error(`Failed to fetch genres: ${error.message}`)
  }
}

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', {
      params: { page }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    throw new Error(`Failed to fetch popular movies: ${error.message}`)
  }
}

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: { query, page }
    })
    return response.data
  } catch (error) {
    console.error('Error searching movies:', error)
    throw new Error(`Failed to search movies: ${error.message}`)
  }
}

// 新增的API函数 - 电影详情相关
export const fetchMovieDetails = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,images,videos,reviews,similar,recommendations'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching movie details:', error)
    if (error.response?.status === 404) {
      throw new Error('Movie not found')
    }
    throw new Error(`Failed to fetch movie details: ${error.message}`)
  }
}

export const fetchMovieCredits = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/credits`)
    return response.data
  } catch (error) {
    console.error('Error fetching movie credits:', error)
    throw new Error(`Failed to fetch movie credits: ${error.message}`)
  }
}

export const fetchMovieImages = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/images`)
    return response.data
  } catch (error) {
    console.error('Error fetching movie images:', error)
    throw new Error(`Failed to fetch movie images: ${error.message}`)
  }
}

export const fetchMovieVideos = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/videos`)
    return response.data
  } catch (error) {
    console.error('Error fetching movie videos:', error)
    throw new Error(`Failed to fetch movie videos: ${error.message}`)
  }
}

export const fetchMovieReviews = async (id, page = 1) => {
  try {
    const response = await api.get(`/movie/${id}/reviews`, {
      params: { page }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching movie reviews:', error)
    throw new Error(`Failed to fetch movie reviews: ${error.message}`)
  }
}

export const fetchSimilarMovies = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/similar`)
    return response.data
  } catch (error) {
    console.error('Error fetching similar movies:', error)
    throw new Error(`Failed to fetch similar movies: ${error.message}`)
  }
}

export const fetchRecommendedMovies = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/recommendations`)
    return response.data
  } catch (error) {
    console.error('Error fetching recommended movies:', error)
    throw new Error(`Failed to fetch recommended movies: ${error.message}`)
  }
}

// 高级搜索函数
export const discoverMovies = async (filters = {}) => {
  try {
    const params = {
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      page: 1,
      ...filters
    }
    
    const response = await api.get('/discover/movie', { params })
    return response.data
  } catch (error) {
    console.error('Error discovering movies:', error)
    throw new Error(`Failed to discover movies: ${error.message}`)
  }
}

// 趋势电影
export const fetchTrendingMovies = async (timeWindow = 'week') => {
  try {
    const response = await api.get(`/trending/movie/${timeWindow}`)
    return response.data
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    throw new Error(`Failed to fetch trending movies: ${error.message}`)
  }
}

// 即将上映
export const fetchUpcomingMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/upcoming', {
      params: { page }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching upcoming movies:', error)
    throw new Error(`Failed to fetch upcoming movies: ${error.message}`)
  }
}

// 正在热映
export const fetchNowPlayingMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/now_playing', {
      params: { page }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching now playing movies:', error)
    throw new Error(`Failed to fetch now playing movies: ${error.message}`)
  }
}

// 评分最高
export const fetchTopRatedMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/top_rated', {
      params: { page }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching top rated movies:', error)
    throw new Error(`Failed to fetch top rated movies: ${error.message}`)
  }
}