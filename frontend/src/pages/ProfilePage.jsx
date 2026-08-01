import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Award, Ticket, Star, QrCode } from 'lucide-react';
import { TicketModal } from '../components/TicketModal';

export function ProfilePage() {
  const { user, savedTickets } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Profile Header */}
      <div className="glass-panel-neon p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 border border-cyan-500/30">
        <img src={user.avatar} alt={user.fullName} className="w-24 h-24 rounded-full border-2 border-cyan-400 object-cover shadow-xl" />
        <div className="space-y-1 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold">
            {user.role === 'ROLE_ADMIN' ? 'Cinema Admin' : 'Cinephile Member'}
          </div>
          <h2 className="text-2xl font-black text-white">{user.fullName}</h2>
          <p className="text-xs text-gray-400">{user.email} • @{user.username}</p>
        </div>

        {/* Loyalty Rewards Box */}
        <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 border border-purple-500/30">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest">MovieVerse Rewards</div>
            <div className="text-2xl font-black text-purple-400">{user.rewardPoints} Points</div>
            <div className="text-[10px] text-gray-400">Earn 50 pts per ticket booked</div>
          </div>
        </div>
      </div>

      {/* Booking History Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Ticket className="w-5 h-5 text-cyan-400" /> Your Digital Cinema Passes ({savedTickets.length})
        </h3>

        {savedTickets.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center space-y-3 text-gray-400 border border-slate-800">
            <Ticket className="w-12 h-12 text-slate-700 mx-auto" />
            <p className="text-sm">No active tickets yet. Book your first 3D movie experience now!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedTickets.map((t, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-cyan-500/40 transition-all cursor-pointer"
                onClick={() => setSelectedTicket(t)}
              >
                <div className="space-y-1">
                  <div className="font-bold text-white text-base">{t.movieTitle}</div>
                  <div className="text-xs text-gray-400">{t.theaterName} • {t.showtime}</div>
                  <div className="text-xs text-cyan-300 font-semibold">Seats: {t.seatNumbers}</div>
                </div>

                <button className="flex items-center gap-1 px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs font-bold border border-cyan-400/30">
                  <QrCode className="w-4 h-4" /> View QR
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ticket Viewer Modal */}
      {selectedTicket && (
        <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}

    </div>
  );
}
