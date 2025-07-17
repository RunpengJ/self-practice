// src/components/charts/GenrePopularityChart.jsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const GenrePopularityChart = ({ data, compact = false, className = '' }) => {
  const COLORS = [
    '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', 
    '#f59e0b', '#ef4444', '#ec4899', '#6366f1'
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-3">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-blue-400">{`Movies: ${data.value}`}</p>
          <p className="text-gray-400">{`${data.percentage}%`}</p>
        </div>
      )
    }
    return null
  }

  const size = compact ? 150 : 250

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>
      {!compact && (
        <h3 className="text-xl font-bold text-white mb-6">Genre Popularity</h3>
      )}
      
      <ResponsiveContainer width="100%" height={compact ? 200 : 400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={size / 2}
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {!compact && <Tooltip content={<CustomTooltip />} />}
          {!compact && (
            <Legend 
              wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GenrePopularityChart 