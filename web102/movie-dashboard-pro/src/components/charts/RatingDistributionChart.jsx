// src/components/charts/RatingDistributionChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const RatingDistributionChart = ({ data, compact = false, className = '' }) => {
  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-3">
          <p className="text-white font-medium">{`Rating Range: ${label}`}</p>
          <p className="text-blue-400">
            {`Movies: ${payload[0].value}`}
          </p>
          <p className="text-gray-400">
            {`Percentage: ${data.percentage}%`}
          </p>
        </div>
      )
    }
    return null
  }

  const height = compact ? 200 : 400

  return (
    <motion.div 
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}
      variants={chartVariants}
      initial="hidden"
      animate="visible"
    >
      {!compact && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Rating Distribution</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-400">Movie Count</span>
          </div>
        </div>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="range" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: compact ? 10 : 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: compact ? 10 : 12 }}
          />
          {!compact && <Tooltip content={<CustomTooltip />} />}
          <Bar 
            dataKey="count" 
            fill="url(#barGradient)"
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default RatingDistributionChart 