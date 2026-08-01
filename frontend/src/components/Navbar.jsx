import React, { useState } from 'react';
import { Film, MapPin, Sparkles, UserCheck, ShieldCheck, Volume2, VolumeX, CloudRain, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { audioService } from '../services/audioService';

export function Navbar({ onNavigate, currentPage, onToggleRain, isRainActive }) {
  const { user, loginAsUser, loginAsAdmin } = useAuth();
  const [muted, setMuted] = useState(false);
  const [selectedCity, setSelectedCity] = useState("New York (IMAX)");

  const handleSoundToggle = () => {
    const isMuted = audioService.toggleMute();
    setMuted(isMuted);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-cyan-500/20 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Film className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-extrabold text-xl tracking-wider text-white">
              MOVIE<span className="text-neon-cyan">VERSE</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                3D
              </span>
            </div>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Immersive Cinema Experience</p>
          </div>
        </div>

        {/* Location Selector */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-xs text-gray-300">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-transparent border-none text-gray-200 font-medium focus:outline-none cursor-pointer"
          >
            <option value="New York (IMAX)" className="bg-slate-900">New York • Grand IMAX</option>
            <option value="Los Angeles (Dolby)" className="bg-slate-900">Los Angeles • Dolby Dome</option>
            <option value="Tokyo (4DX)" className="bg-slate-900">Tokyo • Neosphere 4DX</option>
            <option value="London (Luxe)" className="bg-slate-900">London • Premiere Lounge</option>
          </select>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${currentPage === 'home' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-gray-300 hover:text-white'}`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('lobby')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${currentPage === 'lobby' ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40' : 'text-gray-300 hover:text-white'}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            3D Lobby
          </button>
          <button
            onClick={() => onNavigate('movies')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${currentPage === 'movies' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-gray-300 hover:text-white'}`}
          >
            Movies
          </button>
          {user.role === 'ROLE_ADMIN' && (
            <button
              onClick={() => onNavigate('admin')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${currentPage === 'admin' ? 'bg-pink-500/20 text-pink-300 border border-pink-400/40' : 'text-pink-400 hover:text-pink-300'}`}
            >
              Admin Panel
            </button>
          )}
        </nav>

        {/* Utility Controls (Sound, Rain Toggle, User/Admin Switch) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleRain}
            title="Toggle Rain Atmosphere"
            className={`p-2 rounded-lg border transition-all ${isRainActive ? 'bg-blue-500/20 border-blue-400 text-blue-300' : 'bg-slate-900 border-slate-700 text-gray-400 hover:text-white'}`}
          >
            <CloudRain className="w-4 h-4" />
          </button>

          <button
            onClick={handleSoundToggle}
            title={muted ? "Unmute Audio" : "Mute Audio"}
            className={`p-2 rounded-lg border transition-all ${muted ? 'bg-red-500/20 border-red-400 text-red-300' : 'bg-slate-900 border-slate-700 text-gray-400 hover:text-white'}`}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Role Switcher */}
          <button
            onClick={() => user.role === 'ROLE_USER' ? loginAsAdmin() : loginAsUser()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/50 text-xs font-semibold text-gray-200 transition-all"
          >
            {user.role === 'ROLE_ADMIN' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                <span>Admin</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>User</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
