import React, { useState } from 'react';
import { DollarSign, Ticket, Film, ShieldCheck, Plus, Lock, Users, BarChart3, Trash2 } from 'lucide-react';

export function AdminPage({ movies, setMovies }) {
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('Sci-Fi / Action');
  const [newDuration, setNewDuration] = useState('145');

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMovie = {
      id: Date.now(),
      title: newTitle,
      synopsis: 'A groundbreaking new 3D cinematic release.',
      genre: newGenre,
      durationMinutes: Number(newDuration),
      rating: 4.8,
      posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
      backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80',
      status: 'NOW_SHOWING',
      is3dAvailable: true
    };

    setMovies(prev => [newMovie, ...prev]);
    setNewTitle('');
    alert(`Movie "${newTitle}" added to 3D catalog!`);
  };

  const handleDeleteMovie = (id) => {
    setMovies(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-400 space-y-1">
          <div className="text-xs text-gray-400 font-semibold uppercase">Total Revenue</div>
          <div className="text-2xl font-black text-neon-cyan">$14,290.50</div>
          <div className="text-[10px] text-emerald-400">+18.4% from last week</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-purple-400 space-y-1">
          <div className="text-xs text-gray-400 font-semibold uppercase">Total Bookings</div>
          <div className="text-2xl font-black text-purple-400">482 Passes</div>
          <div className="text-[10px] text-gray-400">across 4 theaters</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-pink-400 space-y-1">
          <div className="text-xs text-gray-400 font-semibold uppercase">Theater Occupancy</div>
          <div className="text-2xl font-black text-pink-400">88.2%</div>
          <div className="text-[10px] text-pink-300">High Demand</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-yellow-400 space-y-1">
          <div className="text-xs text-gray-400 font-semibold uppercase">3D Glasses Inventory</div>
          <div className="text-2xl font-black text-yellow-400">1,200 Pairs</div>
          <div className="text-[10px] text-gray-400">Sterilized & Ready</div>
        </div>
      </div>

      {/* Admin Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Add Movie Form */}
        <div className="glass-panel p-6 rounded-3xl space-y-4 border border-cyan-500/20">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyan-400" /> Add New 3D Movie Release
          </h3>

          <form onSubmit={handleAddMovie} className="space-y-3 text-xs">
            <div>
              <label className="text-gray-300 block mb-1">Movie Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Avatar 4: Deep Ocean"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-1">Genre</label>
              <input
                type="text"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-1">Duration (Minutes)</label>
              <input
                type="number"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-white text-xs shadow-lg shadow-cyan-500/20"
            >
              Add Movie to 3D Theater
            </button>
          </form>
        </div>

        {/* Existing Movies List */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl space-y-4 border border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-purple-400" /> Active Cinema Catalog ({movies.length})
          </h3>

          <div className="space-y-3">
            {movies.map(m => (
              <div key={m.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={m.posterUrl} alt={m.title} className="w-10 h-14 object-cover rounded-lg" />
                  <div>
                    <h5 className="font-bold text-white text-sm">{m.title}</h5>
                    <p className="text-xs text-gray-400">{m.genre} • {m.durationMinutes} min</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-400/30">
                    {m.status}
                  </span>
                  <button
                    onClick={() => handleDeleteMovie(m.id)}
                    className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
