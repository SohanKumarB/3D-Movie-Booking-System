import React from 'react';
import { Film, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 py-8 px-6 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-cyan-400" />
          <span className="font-extrabold text-white text-sm tracking-wider">MOVIEVERSE 3D</span>
          <span className="text-gray-500">• Immersive Cinema Booking Platform</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-cyan-300">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-300">Terms of Service</a>
          <a href="#" className="hover:text-cyan-300 font-semibold text-purple-400">Java Spring Boot API</a>
        </div>

        <div className="flex items-center gap-1 text-gray-500">
          Crafted with <Heart className="w-3.5 h-3.5 text-pink-500 fill-current" /> for 3D Movie Enthusiasts
        </div>

      </div>
    </footer>
  );
}
