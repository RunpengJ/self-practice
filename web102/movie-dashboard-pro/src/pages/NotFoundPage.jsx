// src/pages/NotFoundPage.jsx - 适配新侧边栏
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft, Film } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8 max-w-2xl mx-auto"
        >
          {/* 404 Illustration */}
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-[12rem] md:text-[16rem] font-bold text-slate-800/20 leading-none select-none">
              404
            </h1>
            
            {/* Centered Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <Film className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-8 left-8 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center"
            >
              <Search className="w-6 h-6 text-blue-400" />
            </motion.div>
            
            <motion.div
              animate={{ y: [20, -20, 20] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-8 right-8 w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center"
            >
              <Home className="w-8 h-8 text-purple-400" />
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                The page you're looking for seems to have vanished into the digital void. 
                It might have been moved, deleted, or perhaps it never existed at all.
              </p>
            </motion.div>

            {/* Error Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">What can you do?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-medium">Check the URL</p>
                    <p className="text-slate-400 text-sm">Make sure the address is correct</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-medium">Go back</p>
                    <p className="text-slate-400 text-sm">Return to the previous page</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-medium">Start fresh</p>
                    <p className="text-slate-400 text-sm">Visit our homepage</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-medium">Search movies</p>
                    <p className="text-slate-400 text-sm">Find what you're looking for</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg transition-all duration-200"
                >
                  <Home className="w-5 h-5" />
                  <span>Back to Dashboard</span>
                </motion.button>
              </Link>
              
              <Link to="/search">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-8 py-4 bg-slate-700/50 border border-slate-600 hover:bg-slate-600/50 text-white rounded-xl font-semibold transition-all duration-200"
                >
                  <Search className="w-5 h-5" />
                  <span>Search Movies</span>
                </motion.button>
              </Link>

              <motion.button
                onClick={() => window.history.back()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-8 py-4 bg-slate-700/50 border border-slate-600 hover:bg-slate-600/50 text-white rounded-xl font-semibold transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center pt-8 border-t border-slate-700/50"
          >
            <p className="text-slate-500 text-sm">
              🎬 Fun fact: The first 404 error was created in 1993 at CERN, 
              the same place where the World Wide Web was invented!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage