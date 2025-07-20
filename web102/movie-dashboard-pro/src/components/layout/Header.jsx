// src/components/layout/Header.jsx - 完全修复版本
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Bell, Menu, X, Filter } from 'lucide-react'
import { cn } from '../../lib/utils'

const Header = ({ onToggleSidebar, isSidebarCollapsed }) => {
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
    <header className="bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4 sticky top-0 z-30 min-h-[72px]">
      <div className="flex items-center h-full">
        {/* Left Section - Menu + Title */}
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          {/* Sidebar Toggle */}
          <motion.button
            onClick={onToggleSidebar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 bg-slate-800/60 border border-slate-600 rounded-xl hover:bg-slate-700 transition-colors flex-shrink-0"
          >
            <Menu className="w-5 h-5 text-slate-300" />
          </motion.button>
          
          {/* Page Title */}
          <motion.h1 
            key={location.pathname}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-white truncate"
          >
            {getPageTitle()}
          </motion.h1>
          
          {/* Breadcrumb for movie details */}
          {location.pathname.startsWith('/movie/') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden md:flex items-center space-x-2 text-slate-400"
            >
              <span>/</span>
              <span className="text-sm">Details</span>
            </motion.div>
          )}
        </div>

        {/* Right Section - Search + Actions */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          {/* Desktop Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <motion.div
                animate={{
                  scale: isSearchFocused ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "relative flex items-center w-80",
                  "bg-slate-800/60 border rounded-xl",
                  "transition-all duration-300",
                  isSearchFocused 
                    ? "border-blue-500/50 bg-slate-800/80" 
                    : "border-slate-600 hover:border-slate-500"
                )}
              >
                <Search className="w-4 h-4 text-slate-400 ml-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search movies..."
                  className="w-full bg-transparent text-white placeholder-slate-400 px-3 py-2.5 outline-none text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 mr-2 text-slate-400 hover:text-white transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Mobile Search Icon - 只在移动端显示 */}
            <motion.button
              onClick={() => navigate('/search')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2.5 bg-slate-800/60 border border-slate-600 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <Search className="w-5 h-5 text-slate-400" />
            </motion.button>

            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-slate-800/60 border border-slate-600 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <Filter className="w-5 h-5 text-slate-400" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 bg-slate-800/60 border border-slate-600 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </motion.button>

            {/* User Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl cursor-pointer flex items-center justify-center"
            >
              <span className="text-white font-semibold text-sm">U</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search suggestions - 只在桌面端搜索时显示 */}
      {isSearchFocused && searchQuery.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-slate-800/90 backdrop-blur-xl border border-slate-600 rounded-xl p-4 z-50 hidden md:block"
        >
          <p className="text-slate-400 text-sm">Press Enter to search for "{searchQuery}"</p>
        </motion.div>
      )}
    </header>
  )
}

export default Header