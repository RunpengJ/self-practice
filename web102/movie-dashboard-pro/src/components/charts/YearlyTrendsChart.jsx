// src/components/charts/YearlyTrendsChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const YearlyTrendsChart = ({ data, compact = false, className = '' }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-3">
          <p className="text-white font-medium">{`Year: ${label}`}</p>
          <p className="text-green-400">
            {`Movies: ${payload[0].value}`}
          </p>
          <p className="text-blue-400">
            {`Avg Rating: ${payload[1].value}/10`}
          </p>
        </div>
      )
    }
    return null
  }

  const height = compact ? 200 : 400

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>
      {!compact && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Yearly Trends</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Movie Count</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Avg Rating</span>
            </div>
          </div>
        </div>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="countGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="year" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: compact ? 10 : 12 }}
          />
          <YAxis 
            yAxisId="count"
            orientation="left"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: compact ? 10 : 12 }}
          />
          <YAxis 
            yAxisId="rating"
            orientation="right"
            domain={[0, 10]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: compact ? 10 : 12 }}
          />
          {!compact && <Tooltip content={<CustomTooltip />} />}
          <Line 
            yAxisId="count"
            type="monotone" 
            dataKey="count" 
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            animationDuration={1500}
          />
          <Line 
            yAxisId="rating"
            type="monotone" 
            dataKey="averageRating" 
            stroke="#3b82f6"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default YearlyTrendsChart