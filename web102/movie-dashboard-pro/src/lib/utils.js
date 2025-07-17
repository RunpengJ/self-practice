// src/lib/utils.js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind CSS类名合并工具
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// 图片URL生成函数
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder-movie.jpg'
  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/'
  return `${baseUrl}${size}${path}`
}

// 图表数据处理函数
export const processChartData = {
  // 评分分布计算
  ratingDistribution: (movies) => {
    if (!movies || movies.length === 0) return []
    
    const ranges = [
      { range: '0-2', min: 0, max: 2, color: '#ef4444' },
      { range: '2-4', min: 2, max: 4, color: '#f97316' },
      { range: '4-6', min: 4, max: 6, color: '#eab308' },
      { range: '6-8', min: 6, max: 8, color: '#22c55e' },
      { range: '8-10', min: 8, max: 10, color: '#3b82f6' }
    ]

    return ranges.map(({ range, min, max, color }) => {
      const count = movies.filter(movie => 
        movie.vote_average >= min && 
        (max === 10 ? movie.vote_average <= max : movie.vote_average < max)
      ).length
      
      const percentage = movies.length > 0 ? ((count / movies.length) * 100).toFixed(1) : 0
      
      return {
        range,
        count,
        color,
        percentage: parseFloat(percentage)
      }
    })
  },

  // 类型流行度计算
  genrePopularity: (movies, genres) => {
    if (!movies || movies.length === 0 || !genres) return []
    
    const genreCount = {}
    
    movies.forEach(movie => {
      if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
        movie.genre_ids.forEach(genreId => {
          genreCount[genreId] = (genreCount[genreId] || 0) + 1
        })
      }
    })

    return Object.entries(genreCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8) // 只显示前8个类型
      .map(([genreId, count]) => {
        const genre = genres.find(g => g.id === parseInt(genreId))
        const percentage = ((count / movies.length) * 100).toFixed(1)
        
        return {
          name: genre ? genre.name : 'Unknown',
          value: count,
          percentage: parseFloat(percentage),
          id: genreId
        }
      })
  },

  // 年份趋势计算
  yearlyTrends: (movies) => {
    if (!movies || movies.length === 0) return []
    
    const yearData = {}
    
    movies.forEach(movie => {
      if (movie.release_date) {
        const year = new Date(movie.release_date).getFullYear()
        if (!isNaN(year)) {
          if (!yearData[year]) {
            yearData[year] = { count: 0, totalRating: 0 }
          }
          yearData[year].count += 1
          yearData[year].totalRating += movie.vote_average || 0
        }
      }
    })

    return Object.entries(yearData)
      .map(([year, data]) => ({
        year: parseInt(year),
        count: data.count,
        averageRating: data.count > 0 ? (data.totalRating / data.count).toFixed(1) : 0,
        totalRating: data.totalRating
      }))
      .sort((a, b) => a.year - b.year)
      .filter(item => item.year >= 2000 && item.year <= new Date().getFullYear())
  }
}

// 格式化函数
export const formatters = {
  currency: (amount) => {
    if (!amount || amount === 0) return 'N/A'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  },
  
  number: (num) => {
    if (!num) return '0'
    return new Intl.NumberFormat('en-US').format(num)
  },
  
  percentage: (num) => {
    return `${num}%`
  },
  
  duration: (minutes) => {
    if (!minutes || minutes === 0) return 'N/A'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  },
  
  date: (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}