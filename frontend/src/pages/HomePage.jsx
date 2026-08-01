import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Film, Sparkles, Play, Star, ChevronRight, Monitor, Zap, ShieldCheck } from 'lucide-react';
import { VirtualLobby } from '../3d/VirtualLobby';

export function HomePage({ movies, onSelectMovie, onNavigate }) {
  const nowShowing = movies.filter(m => m.status === 'NOW_SHOWING');
  const comingSoon = movies.filter(m => m.status === 'COMING_SOON');

  return (
    <div className="space-y-12 pb-16">

      {/* 3D HERO VIRTUAL LOBBY PREVIEW */}
      <section className="relative h-[520px] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl glass-panel-neon group">
        <Canvas className="w-full h-full">
          <VirtualLobby movies={movies} onSelectMovie={onSelectMovie} />
        </Canvas>

        {/* Hero Overlay Callout */}
        <div className="absolute top-6 left-6 z-10 pointer-events-none max-w-lg space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen 3D Ticket Booking
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
            STEP INSIDE THE <span className="text-neon-cyan">FUTURE</span> OF CINEMA
          </h1>
          <p className="text-sm text-gray-300">
            Interactive 3D Virtual Lobby • Real-time 3D Seat Selection • Spatial Audio
          </p>
        </div>

        {/* Enter Lobby Button Overlay */}
        <div className="absolute bottom-6 right-6 z-10">
          <button
            onClick={() => onNavigate('lobby')}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition-all text-white font-bold text-sm shadow-xl shadow-cyan-500/30"
          >
            <Play className="w-4 h-4 fill-current" /> Enter Full 3D Lobby
          </button>
        </div>
      </section>

      {/* NOW SHOWING SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Film className="w-6 h-6 text-cyan-400" /> Now Showing in 3D
            </h2>
            <p className="text-xs text-gray-400">Select a movie to pick your 3D seats</p>
          </div>
          <button
            onClick={() => onNavigate('movies')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            View All Movies <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nowShowing.map(movie => (
            <div
              key={movie.id}
              onClick={() => onSelectMovie(movie)}
              className="group relative rounded-2xl overflow-hidden glass-panel border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-2 cursor-pointer shadow-lg"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* 3D Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-cyan-500 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-md">
                  3D IMAX
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-yellow-400 text-xs font-bold border border-slate-700">
                  <Star className="w-3.5 h-3.5 fill-current" /> {movie.rating}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <span>{movie.genre}</span> • <span>{movie.durationMinutes} min</span>
                </p>
                
                <button className="w-full py-2.5 rounded-xl bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-600 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 mt-2">
                  <Monitor className="w-3.5 h-3.5" /> Book 3D Seats
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS BANNER */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl space-y-2 border-l-4 border-l-cyan-400">
          <div className="p-3 w-fit rounded-xl bg-cyan-500/20 text-cyan-400">
            <Zap className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-lg">Interactive 3D Seats</h4>
          <p className="text-xs text-gray-400">Every seat is a physical 3D object that lifts, glows, and rotates on mouse interaction.</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-2 border-l-4 border-l-purple-400">
          <div className="p-3 w-fit rounded-xl bg-purple-500/20 text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-lg">3D Concessions Bar</h4>
          <p className="text-xs text-gray-400">Spin and view 3D models of popcorn, gourmet burgers, and beverages before booking.</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-2 border-l-4 border-l-pink-400">
          <div className="p-3 w-fit rounded-xl bg-pink-500/20 text-pink-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-lg">Instant QR Digital Ticket</h4>
          <p className="text-xs text-gray-400">Encrypted digital passes generated instantly with scannable QR code for zero-wait entrance.</p>
        </div>
      </section>

      {/* COMING SOON GRID */}
      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-400" /> Coming Soon in 3D
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comingSoon.map(movie => (
            <div key={movie.id} className="glass-panel p-4 rounded-2xl flex gap-4 items-center border border-slate-800">
              <img src={movie.posterUrl} alt={movie.title} className="w-24 h-32 object-cover rounded-xl" />
              <div className="space-y-2 flex-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  EXPECTED SOON
                </span>
                <h4 className="font-bold text-white text-lg">{movie.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-2">{movie.synopsis}</p>
                <div className="text-xs text-cyan-400 font-semibold">Director: {movie.director}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
