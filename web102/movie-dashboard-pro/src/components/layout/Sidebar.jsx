// src/components/layout/Sidebar.jsx
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Film, BarChart3, Search, TrendingUp, 
  Settings, User, Home, Bookmark 
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const navigationItems = [
    { path: '/', icon: Home, label: 'Dashboard', badge: null },
    { path: '/charts', icon: BarChart3, label: 'Analytics', badge: 'New' },
    { path: '/trending', icon: TrendingUp, label: 'Trending', badge: null },
    { path: '/search', icon: Search, label: 'Advanced Search', badge: null },
    { path: '/watchlist', icon: Bookmark, label: 'Watchlist', badge: null },
  ]

  return (
    <motion.aside 
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-72 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Film className="w-8 h-8 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">CineScope</h1>
            <p className="text-xs text-gray-400">Movie Analytics</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : ''}`} />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-500/10 border border-blue-500/30 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-medium text-sm">Movie Explorer</p>
            <p className="text-gray-400 text-xs">Premium Member</p>
          </div>
          <Settings className="w-4 h-4 text-gray-400 hover:text-white transition-colors cursor-pointer" />
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar