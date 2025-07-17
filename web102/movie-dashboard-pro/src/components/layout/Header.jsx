// src/components/layout/Header.jsx
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Bell, Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // 根据当前路由获取页面标题
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard'
      case '/charts':
        return 'Analytics'
      case '/trending':
        return 'Trending Movies'
      case '/search':
        return 'Advanced Search'
      case '/watchlist':
        return 'My Watchlist'
      default:
        if (location.pathname.startsWith('/movie/')) {
          return 'Movie Details'
        }
        return 'CineScope'
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="bg-black/10 backdrop-blur-xl border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Page Title */}
        <div className="flex items-center space-x-4">
          <motion.h1 
            key={location.pathname}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-white"
          >
            {getPageTitle()}
          </motion.h1>
          
          {/* Breadcrumb for movie details */}
          {location.pathname.startsWith('/movie/') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 text-gray-400"
            >
              <span>/</span>
              <span className="text-sm">Details</span>
            </motion.div>
          )}
        </div>

        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative">
            <motion.div
              animate={{
                scale: isSearchFocused ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
              className={cn(
                "relative flex items-center",
                "bg-white/10 backdrop-blur-sm border rounded-xl",
                "transition-all duration-300",
                isSearchFocused 
                  ? "border-blue-500/50 bg-white/15" 
                  : "border-white/20 hover:border-white/30"
              )}
            >
              <Search className="w-4 h-4 text-gray-400 ml-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search movies..."
                className="w-full bg-transparent text-white placeholder-gray-400 px-3 py-2 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 mr-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          </form>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-200"
          >
            <Bell className="w-5 h-5 text-gray-400" />
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </motion.button>

          {/* Menu Toggle (for mobile) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-200"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </motion.button>

          {/* User Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full cursor-pointer"
          />
        </div>
      </div>

      {/* Search suggestions (可选) */}
      {isSearchFocused && searchQuery.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-4 z-50"
        >
          <p className="text-gray-400 text-sm">Press Enter to search for "{searchQuery}"</p>
        </motion.div>
      )}
    </header>
  )
}

export default Header