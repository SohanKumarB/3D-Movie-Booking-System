import React, { useState } from 'react';
import { Search, Film, Star, Monitor, Filter } from 'lucide-react';

export function MoviesPage({ movies, onSelectMovie }) {
  const [search, setSearch] = useState('');
  const [filterGenre, setFilterGenre] = useState('ALL');

  const genres = ['ALL', 'Sci-Fi / Action', 'Action / Mystery', 'Sci-Fi / Fantasy', 'Sci-Fi / Adventure'];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase()) ||
                          movie.genre.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = filterGenre === 'ALL' || movie.genre.includes(filterGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Search & Filter Header */}
      <div className="glass-panel p-6 rounded-3xl space-y-4 border border-cyan-500/20">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Film className="w-6 h-6 text-cyan-400" /> Cinema Catalog
            </h2>
            <p className="text-xs text-gray-400">Discover Now Showing & Upcoming 3D IMAX releases</p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movie title, genre..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Genre Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar">
          <Filter className="w-4 h-4 text-cyan-400 mr-1" />
          {genres.map(g => (
            <button
              key={g}
              onClick={() => setFilterGenre(g)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filterGenre === g
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900 text-gray-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map(movie => (
          <div
            key={movie.id}
            onClick={() => onSelectMovie(movie)}
            className="group relative rounded-3xl overflow-hidden glass-panel border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-2 cursor-pointer shadow-xl flex flex-col"
          >
            <div className="relative h-96 overflow-hidden">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 font-black text-xs tracking-wider uppercase">
                3D IMAX
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-yellow-400 text-xs font-bold border border-slate-700">
                <Star className="w-3.5 h-3.5 fill-current" /> {movie.rating}
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-white text-xl group-hover:text-cyan-300 transition-colors">
                  {movie.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{movie.genre} • {movie.durationMinutes} min • {movie.ageRating}</p>
                <p className="text-xs text-gray-300 mt-2 line-clamp-2 leading-relaxed">{movie.synopsis}</p>
              </div>

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-xs text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
                <Monitor className="w-4 h-4" /> Select & Book 3D Seats
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
