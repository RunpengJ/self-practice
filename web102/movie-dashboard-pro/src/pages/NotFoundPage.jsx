// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="text-center space-y-6 max-w-md">
        <div className="relative">
          <h1 className="text-9xl font-bold text-white/10">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
          <p className="text-gray-400">The page you're looking for doesn't exist or has been moved.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          <Link
            to="/search"
            className="flex items-center space-x-2 px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-xl transition-colors"
          >
            <Search className="w-5 h-5" />
            <span>Search Movies</span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default NotFoundPage // src/pages/SearchPage.jsx