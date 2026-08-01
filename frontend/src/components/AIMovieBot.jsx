import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, Film } from 'lucide-react';

export function AIMovieBot({ movies, onSelectMovie }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '🍿 Hello cinephile! I am MovieBot AI. Tell me your mood or favorite genre, and I will recommend the ultimate 3D cinema experience!'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (userText) => {
    const query = userText || input;
    if (!query.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(newMsgs);
    setInput('');

    // AI recommendation logic simulation
    setTimeout(() => {
      let recMovie = movies[0];
      const lower = query.toLowerCase();
      if (lower.includes('dark') || lower.includes('batman') || lower.includes('crime')) {
        recMovie = movies.find(m => m.title.includes('Batman')) || movies[1];
      } else if (lower.includes('space') || lower.includes('time') || lower.includes('nolan')) {
        recMovie = movies.find(m => m.title.includes('Interstellar')) || movies[2];
      } else if (lower.includes('avatar') || lower.includes('alien') || lower.includes('nature')) {
        recMovie = movies.find(m => m.title.includes('Avatar')) || movies[3];
      } else if (lower.includes('action') || lower.includes('marvel') || lower.includes('avengers')) {
        recMovie = movies[0];
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Based on your preference for "${query}", I highly recommend watching "${recMovie.title}" in 3D IMAX!`,
          recommendedMovie: recMovie
        }
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-xl shadow-cyan-500/30 hover:scale-105 transition-transform border border-cyan-300/40 text-white font-semibold text-sm"
      >
        <Bot className="w-5 h-5 text-cyan-200 animate-bounce" />
        <span>AI MovieBot</span>
      </button>

      {/* AI Drawer Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] glass-panel-neon rounded-2xl p-4 flex flex-col h-[480px] shadow-2xl border border-cyan-500/30 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm flex items-center gap-1">
                  MovieBot AI <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                </h4>
                <p className="text-[10px] text-cyan-300">Powered by MovieVerse Neural Engine</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="flex gap-1.5 py-2 overflow-x-auto text-[11px] no-scrollbar">
            {['Action Spectacle', 'Mind-Bending Sci-Fi', 'Dark Mystery'].map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-3 py-2 px-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none'
                      : 'bg-slate-900/90 border border-slate-700 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Movie Recommendation Card inside chat */}
                {msg.recommendedMovie && (
                  <div className="mt-2 p-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 w-full flex items-center gap-3">
                    <img
                      src={msg.recommendedMovie.posterUrl}
                      alt={msg.recommendedMovie.title}
                      className="w-12 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{msg.recommendedMovie.title}</h5>
                      <p className="text-[10px] text-gray-400">{msg.recommendedMovie.genre} • ⭐ {msg.recommendedMovie.rating}</p>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onSelectMovie(msg.recommendedMovie);
                        }}
                        className="mt-1.5 w-full py-1 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 text-[10px] font-semibold text-white flex items-center justify-center gap-1"
                      >
                        <Film className="w-3 h-3" /> Book 3D Seats
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="pt-2 border-t border-cyan-500/20 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for movie suggestions..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
