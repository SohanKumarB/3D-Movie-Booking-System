import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Download, Printer, Copy, Sparkles, X, Film, MapPin, Calendar, Clock, Armchair } from 'lucide-react';

export function TicketModal({ ticket, onClose }) {
  useEffect(() => {
    // Launch celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  if (!ticket) return null;

  const copyRefCode = () => {
    navigator.clipboard.writeText(ticket.bookingReference || 'MV-BOOKING-ID');
    alert('Booking Reference copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md glass-panel-neon rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/40">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-cyan-600 to-purple-600 p-4 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-slate-950/40 text-white hover:bg-slate-950"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-cyan-200 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-yellow-300" /> Official Cinema Pass
          </div>
          <h3 className="text-xl font-black text-white tracking-wide mt-1">MOVIEVERSE 3D</h3>
        </div>

        {/* Ticket Details Body */}
        <div className="p-6 space-y-5">
          
          {/* Success Status */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            <div>
              <div className="font-bold text-sm">Booking Confirmed!</div>
              <div className="text-[11px] text-emerald-300/80">Reference: {ticket.bookingReference}</div>
            </div>
            <button
              onClick={copyRefCode}
              title="Copy Booking Reference"
              className="ml-auto p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* Movie Title & Info */}
          <div className="space-y-3">
            <h4 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-cyan-400" />
              {ticket.movieTitle}
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="truncate">{ticket.theaterName}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{ticket.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4 text-pink-400" />
                <span>{ticket.showtime}</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <Armchair className="w-4 h-4 text-cyan-400" />
                <span>Seats: {ticket.seatNumbers}</span>
              </div>
            </div>
          </div>

          {/* Food Snacks summary if any */}
          {ticket.foodItems && ticket.foodItems !== 'None' && (
            <div className="text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-purple-300">
              🍿 Snacks: <span className="text-gray-200">{ticket.foodItems}</span>
            </div>
          )}

          {/* QR Code Section */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-slate-950 space-y-2">
            <QRCodeSVG
              value={ticket.qrCodeData || ticket.bookingReference}
              size={140}
              level="H"
              includeMargin={true}
            />
            <div className="text-[10px] font-mono tracking-widest text-slate-700">
              SCAN AT SCREEN ENTRANCE
            </div>
          </div>

          {/* Price & Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Total Paid</span>
              <span className="text-2xl font-black text-neon-cyan">${Number(ticket.totalPrice).toFixed(2)}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-xs font-semibold text-gray-200 transition-colors"
              >
                <Printer className="w-4 h-4" /> Print
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 text-xs font-bold text-white transition-all shadow-lg shadow-cyan-500/20"
              >
                Done
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
