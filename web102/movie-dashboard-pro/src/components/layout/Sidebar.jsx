// src/components/layout/Sidebar.jsx - YouTube风格的侧边栏（改进版）
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Film, BarChart3, Search, TrendingUp, 
  Settings, User, Home, Bookmark, ChevronLeft, ChevronRight
} from 'lucide-react'

const Sidebar = ({ isCollapsed, onToggle, isMobile }) => {
  const location = useLocation()

  const navigationItems = [
    { path: '/', icon: Home, label: 'Dashboard', badge: null },
    { path: '/charts', icon: BarChart3, label: 'Analytics', badge: 'New' },
    { path: '/trending', icon: TrendingUp, label: 'Trending', badge: null },
    { path: '/search', icon: Search, label: 'Search', badge: null },
    { path: '/watchlist', icon: Bookmark, label: 'Watchlist', badge: null },
  ]

  const sidebarVariants = {
    expanded: { 
      width: isMobile ? '280px' : '280px',
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    collapsed: { 
      width: isMobile ? '0px' : '72px', // YouTube风格的窄宽度
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  }

  return (
    <>
      <motion.aside 
        variants={sidebarVariants}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        className={`
          fixed left-0 top-0 h-full bg-slate-900/95 backdrop-blur-xl 
          border-r border-slate-700/50 z-50 flex flex-col shadow-2xl group
          ${isMobile ? (isCollapsed ? 'pointer-events-none' : 'pointer-events-auto') : ''}
        `}
        style={{ 
          backdropFilter: 'blur(20px) saturate(180%)',
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)'
        }}
      >
        {/* Logo区域 - YouTube风格 */}
        <div className={`border-b border-slate-700/50 h-[72px] flex items-center ${
          isCollapsed ? 'justify-center px-3' : 'px-6'
        }`}>
          <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Film className="w-6 h-6 text-white" />
              </div>
              {!isCollapsed && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              )}
            </div>
            
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-xl font-bold text-white">CineScope</h1>
                  <p className="text-xs text-slate-400">Movie Analytics</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 导航菜单 - YouTube风格 */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path
            
            return (
              <div key={item.path} className="relative">
                <NavLink
                  to={item.path}
                  className={`
                    relative flex items-center transition-all duration-200 group mx-2 my-1
                    ${isActive 
                      ? 'bg-slate-700/50 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                    }
                    ${isCollapsed 
                      ? 'rounded-xl p-4 flex-col justify-center' 
                      : 'rounded-xl px-4 py-3 space-x-3'
                    }
                  `}
                >
                  <item.icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
                  
                  {isCollapsed ? (
                    // 折叠状态：只显示图标和简短标签
                    <span className="text-xs font-medium mt-1.5 text-center leading-none">
                      {item.path === '/search' ? 'Search' : item.label}
                    </span>
                  ) : (
                    // 展开状态：显示完整信息
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between flex-1"
                      >
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* 活跃状态指示器 */}
                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </NavLink>
              </div>
            )
          })}
        </nav>

        {/* 用户信息区域 - 简化设计 */}
        <div className={`p-2 border-t border-slate-700/50 ${isCollapsed ? 'px-3' : 'px-4'}`}>
          <div className={`flex items-center ${
            isCollapsed 
              ? 'flex-col p-2 space-y-2' 
              : 'space-x-3 p-3 bg-slate-800/30 rounded-xl'
          }`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            
            {!isCollapsed && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1"
                >
                  <p className="text-white font-medium text-sm">Explorer</p>
                  <p className="text-slate-400 text-xs">Premium</p>
                </motion.div>
              </AnimatePresence>
            )}
            
            {!isCollapsed && (
              <AnimatePresence>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </motion.button>
              </AnimatePresence>
            )}

            {isCollapsed && (
              <span className="text-xs text-slate-400 text-center">Account</span>
            )}
          </div>
        </div>

        {/* 折叠/展开按钮 - 桌面端在hover时显示 */}
        {!isMobile && (
          <motion.button
            onClick={onToggle}
            className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isCollapsed ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronLeft className="w-3 h-3" />
            )}
          </motion.button>
        )}

        {/* 移动端切换按钮 */}
        {isMobile && !isCollapsed && (
          <motion.button
            onClick={onToggle}
            className="absolute top-4 right-4 w-8 h-8 bg-slate-800/80 border border-slate-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
        )}
      </motion.aside>
    </>
  )
}

export default Sidebar