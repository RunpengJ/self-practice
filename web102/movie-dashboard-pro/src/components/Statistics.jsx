// src/components/Statistics.jsx
import React from 'react';
import { Film, Star, TrendingUp, Award, Users, Calendar, Zap } from 'lucide-react';

const Statistics = ({ statistics }) => {
  const { totalMovies, averageRating, highRatedPercentage, popularGenres } = statistics;

  const statCards = [
    {
      title: "Total Movies",
      value: totalMovies,
      icon: Film,
      gradient: "bg-gradient-primary",
      description: "In collection",
      animation: "animate-pulse"
    },
    {
      title: "Average Rating", 
      value: averageRating,
      icon: Star,
      gradient: "bg-gradient-warning",
      description: "User score",
      animation: "animate-float"
    },
    {
      title: "Premium Quality",
      value: `${highRatedPercentage}%`,
      icon: TrendingUp,
      gradient: "bg-gradient-success", 
      description: "Rating ≥ 7.5",
      animation: "animate-pulse"
    },
    {
      title: "Top Genres",
      value: popularGenres.length,
      icon: Award,
      gradient: "bg-gradient-danger",
      description: "Categories",
      animation: "animate-float"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div 
            key={card.title}
            className="stat-card group"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 opacity-10 rounded-2xl transition-opacity duration-300 group-hover:opacity-20">
              <div className={`w-full h-full rounded-2xl ${card.gradient}`}></div>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  {card.title}
                </p>
                <div className="space-y-1">
                  <p className="text-3xl font-extrabold text-white">
                    {card.value}
                  </p>
                  <p className="text-xs text-slate-500">
                    {card.description}
                  </p>
                </div>
              </div>
              
              <div className={`relative p-4 rounded-xl ${card.gradient} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className={`w-8 h-8 text-white ${card.animation}`} />
                <div className="absolute inset-0 rounded-xl bg-white opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Popular genres detail for the last card */}
            {card.title === "Top Genres" && popularGenres.length > 0 && (
              <div className="relative z-10 mt-4 pt-4 border-t border-slate-700">
                <div className="space-y-2">
                  {popularGenres.slice(0, 3).map((genre, genreIndex) => (
                    <div key={genre.name} className="flex justify-between items-center">
                      <span className="text-sm text-slate-300 font-medium">
                        {genre.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${(genre.count / popularGenres[0].count) * 100}%`,
                              animationDelay: `${genreIndex * 300}ms`
                            }}
                          ></div>
                        </div>
                        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-full font-medium">
                          {genre.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional stats for other cards */}
            {card.title === "Average Rating" && (
              <div className="relative z-10 mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(averageRating / 2) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-slate-600'
                      } transition-colors duration-300`}
                      style={{ animationDelay: `${star * 100}ms` }}
                    />
                  ))}
                  <span className="text-xs text-slate-400 ml-2">
                    ({averageRating}/10)
                  </span>
                </div>
              </div>
            )}

            {card.title === "Total Movies" && (
              <div className="relative z-10 mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Users className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>Updated</span>
                  </div>
                </div>
              </div>
            )}

            {card.title === "Premium Quality" && (
              <div className="relative z-10 mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-success rounded-full transition-all duration-1000"
                      style={{ width: `${highRatedPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-emerald-400 font-medium">
                    {highRatedPercentage}%
                  </span>
                </div>
              </div>
            )}

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
              <div className={`w-full h-full rounded-2xl ${card.gradient} blur-xl`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Statistics;