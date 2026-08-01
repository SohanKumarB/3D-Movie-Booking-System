import React from 'react';
import { Canvas } from '@react-three/fiber';
import { VirtualLobby } from '../3d/VirtualLobby';
import { Sparkles, ArrowLeft, Film } from 'lucide-react';

export function LobbyPage({ movies, onSelectMovie, onNavigate }) {
  return (
    <div className="relative w-full h-[calc(100vh-100px)] rounded-3xl overflow-hidden glass-panel-neon border border-cyan-500/30">
      
      {/* 3D Canvas Context */}
      <Canvas className="w-full h-full">
        <VirtualLobby movies={movies} onSelectMovie={onSelectMovie} />
      </Canvas>

      {/* Top Floating Controls */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs font-semibold hover:bg-slate-800 transition-colors backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md">
          <Sparkles className="w-4 h-4" /> Virtual Cinema Lobby Mode
        </div>
      </div>

      {/* Bottom Floating Instructions Card */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 glass-panel px-6 py-3 rounded-2xl flex items-center gap-6 border border-cyan-500/30 text-xs text-gray-200">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          <span>Move mouse to pan camera angle</span>
        </div>
        <div className="h-4 w-[1px] bg-slate-700" />
        <div className="flex items-center gap-2 text-cyan-300 font-bold">
          <Film className="w-4 h-4" /> Click floating poster to start 3D seat booking
        </div>
      </div>

    </div>
  );
}
