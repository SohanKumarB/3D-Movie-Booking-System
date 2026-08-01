import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CinemaHall3D } from '../3d/CinemaHall3D';
import { Food3DBar } from '../3d/Food3DBar';
import { INITIAL_THEATERS, SHOWTIMES, FOOD_ITEMS } from '../services/mockData';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { TicketModal } from '../components/TicketModal';
import { audioService } from '../services/audioService';
import {
  MapPin, Calendar, Clock, Armchair, ShoppingBag, CreditCard, CheckCircle,
  Camera, Plus, Minus, ShieldCheck, Sparkles, ChevronRight, ArrowLeft
} from 'lucide-react';

export function BookingFlowPage({ movie, onBack }) {
  const { addTicketToHistory } = useAuth();
  const {
    selectedSeats, toggleSeat,
    selectedFood, updateFoodQty,
    activeTicket, setActiveTicket,
    clearBooking
  } = useBooking();

  const [step, setStep] = useState(1); // 1: Time/Location, 2: 3D Seats, 3: Food 3D, 4: Payment
  const [selectedTheater, setSelectedTheater] = useState(INITIAL_THEATERS[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedShowtime, setSelectedShowtime] = useState(SHOWTIMES[2]); // 06:15 PM
  const [cameraMode, setCameraMode] = useState('overview'); // 'overview' | 'screen' | 'vip'
  const [activeFoodModel, setActiveFoodModel] = useState('popcorn');
  
  // Payment state
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [isProcessing, setIsProcessing] = useState(false);

  // Seat Price calculation
  const seatTotal = selectedSeats.reduce((acc, seatId) => {
    const row = seatId[0];
    const isVip = row === 'D' || row === 'E';
    return acc + (isVip ? selectedTheater.vipPrice : selectedTheater.standardPrice);
  }, 0);

  // Food Price calculation
  const foodTotal = Object.entries(selectedFood).reduce((acc, [foodId, qty]) => {
    const item = FOOD_ITEMS.find(f => f.id === foodId);
    return acc + (item ? item.price * qty : 0);
  }, 0);

  const grandTotal = Math.max(0, seatTotal + foodTotal - discount);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'MOVIE50' || couponCode.toUpperCase() === 'MOVIEVERSE') {
      setDiscount(5.00);
      audioService.playSuccessBeep();
      alert('🎉 Coupon Applied! $5.00 discount added.');
    } else {
      alert('Invalid coupon code. Try "MOVIEVERSE" for $5 off!');
    }
  };

  const handleSeatToggle = (seatId, price) => {
    toggleSeat(seatId);
  };

  const handleCheckout = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least 1 seat before checking out!');
      return;
    }

    setIsProcessing(true);
    audioService.playSuccessBeep();

    // Prepare food summary string
    const foodSummaryArray = Object.entries(selectedFood).map(([foodId, qty]) => {
      const item = FOOD_ITEMS.find(f => f.id === foodId);
      return `${item.name} x${qty}`;
    });
    const foodSummary = foodSummaryArray.length > 0 ? foodSummaryArray.join(', ') : 'None';

    const bookingPayload = {
      movieTitle: movie.title,
      theaterName: selectedTheater.name,
      showtime: selectedShowtime.time,
      date: selectedDate,
      seats: selectedSeats,
      foodSummary,
      totalPrice: grandTotal
    };

    const newTicket = await api.createBooking(bookingPayload);
    setIsProcessing(false);
    addTicketToHistory(newTicket);
    setActiveTicket(newTicket);
  };

  return (
    <div className="space-y-6 pb-16">

      {/* Booking Header Banner */}
      <div className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 border border-cyan-500/20">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-gray-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              Booking: <span className="text-neon-cyan">{movie.title}</span>
            </h2>
            <p className="text-xs text-gray-400">
              {selectedTheater.name} • {selectedDate} • {selectedShowtime.time}
            </p>
          </div>
        </div>

        {/* Step Indicator Wizard */}
        <div className="flex items-center gap-2 text-xs">
          {[
            { id: 1, label: 'Location & Time' },
            { id: 2, label: '3D Seat Selector' },
            { id: 3, label: '3D Concessions' },
            { id: 4, label: 'Payment' }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => s.id < step && setStep(s.id)}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                step === s.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                  : (step > s.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900 text-gray-500')
              }`}
            >
              {s.id}. {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: LOCATION, DATE & SHOWTIME */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cinema Location Selection */}
          <div className="lg:col-span-2 space-y-4 glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" /> Select Cinema Theater Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INITIAL_THEATERS.map(t => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTheater(t)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    selectedTheater.id === t.id
                      ? 'bg-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-sm">{t.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30 font-bold">
                      {t.screenType.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{t.address}, {t.city}</p>
                  <div className="text-xs text-cyan-300 font-semibold pt-1">
                    Standard: ${t.standardPrice} • VIP: ${t.vipPrice}
                  </div>
                </div>
              ))}
            </div>

            {/* Showtime Selection */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" /> Select Showtime Slot
              </h3>
              <div className="flex flex-wrap gap-3">
                {SHOWTIMES.map(st => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedShowtime(st)}
                    className={`px-4 py-3 rounded-2xl border text-xs font-bold transition-all ${
                      selectedShowtime.id === st.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 border-cyan-300 text-white shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-900 border-slate-800 text-gray-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-sm">{st.time}</div>
                    <div className="text-[10px] text-gray-300 font-normal">{st.format}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Summary Panel */}
          <div className="glass-panel p-6 rounded-3xl space-y-4 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <img src={movie.backdropUrl} alt={movie.title} className="w-full h-36 object-cover rounded-2xl" />
              <h4 className="font-extrabold text-white text-lg">{movie.title}</h4>
              <p className="text-xs text-gray-400">{movie.genre} • {movie.durationMinutes} min</p>
              
              <div className="space-y-2 text-xs pt-2 border-t border-slate-800">
                <div className="flex justify-between text-gray-300">
                  <span>Theater:</span>
                  <span className="font-semibold text-white">{selectedTheater.name}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Time:</span>
                  <span className="font-semibold text-cyan-300">{selectedShowtime.time}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-sm text-white shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
              Continue to 3D Seats <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: INTERACTIVE 3D SEAT SELECTION */}
      {step === 2 && (
        <div className="space-y-4">
          
          {/* 3D Seat Canvas Container */}
          <div className="relative w-full h-[520px] rounded-3xl overflow-hidden glass-panel-neon border border-cyan-500/30">
            <Canvas className="w-full h-full">
              <CinemaHall3D
                selectedMovie={movie}
                selectedSeats={selectedSeats}
                onSeatToggle={handleSeatToggle}
                cameraMode={cameraMode}
              />
            </Canvas>

            {/* Camera Angle Toggle Controls */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              {[
                { id: 'overview', label: 'Full Hall View' },
                { id: 'screen', label: 'Face Screen View' },
                { id: 'vip', label: 'VIP Rows Inspector' }
              ].map(cam => (
                <button
                  key={cam.id}
                  onClick={() => setCameraMode(cam.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all ${
                    cameraMode === cam.id
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900/80 border-slate-700 text-gray-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 inline mr-1" /> {cam.label}
                </button>
              ))}
            </div>

            {/* Seat Map Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-20 glass-panel px-4 py-2 rounded-2xl flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                <span className="text-gray-300">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-red-600" />
                <span className="text-gray-300">Booked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/80 animate-pulse" />
                <span className="text-cyan-300 font-bold">Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-purple-500" />
                <span className="text-purple-300">VIP Row ($24.99)</span>
              </div>
            </div>

            {/* Active Selection Floating Pill */}
            <div className="absolute top-4 right-4 z-20 glass-panel px-4 py-2 rounded-2xl text-xs text-right border border-cyan-500/30">
              <div className="text-gray-400">Selected ({selectedSeats.length} Seats):</div>
              <div className="text-cyan-300 font-extrabold text-sm">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
              </div>
            </div>
          </div>

          {/* Seat Footer Controls */}
          <div className="glass-panel p-4 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 block">Subtotal Seats:</span>
              <span className="text-2xl font-black text-neon-cyan">${seatTotal.toFixed(2)}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-gray-300 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (selectedSeats.length === 0) {
                    alert('Please select at least 1 seat!');
                    return;
                  }
                  setStep(3);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/20"
              >
                Add 3D Snacks & Food <ChevronRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: 3D CONCESSIONS FOOD BAR */}
      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 3D Model Interactive Preview Canvas */}
          <div className="lg:col-span-2 relative h-[450px] rounded-3xl overflow-hidden glass-panel-neon border border-cyan-500/30">
            <Canvas className="w-full h-full">
              <Food3DBar activeModel={activeFoodModel} />
            </Canvas>

            {/* Model Switcher Buttons */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              {FOOD_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveFoodModel(item.modelType)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    activeFoodModel === item.modelType
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900/80 border-slate-700 text-gray-400 hover:text-white'
                  }`}
                >
                  {item.image} {item.category}
                </button>
              ))}
            </div>

            <div className="absolute bottom-4 left-4 z-20 text-xs text-cyan-300 font-semibold bg-slate-950/80 px-3 py-1.5 rounded-xl backdrop-blur-md border border-cyan-500/20">
              🔄 Click & drag to rotate 3D food model 360°
            </div>
          </div>

          {/* Food Menu Selection */}
          <div className="glass-panel p-6 rounded-3xl space-y-4 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-purple-400" /> Cinema Concessions
              </h3>

              <div className="space-y-3">
                {FOOD_ITEMS.map(food => {
                  const qty = selectedFood[food.id] || 0;
                  return (
                    <div
                      key={food.id}
                      onClick={() => setActiveFoodModel(food.modelType)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        activeFoodModel === food.modelType
                          ? 'bg-purple-500/10 border-purple-400'
                          : 'bg-slate-900/80 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{food.image}</span>
                        <div>
                          <h5 className="font-bold text-white text-xs">{food.name}</h5>
                          <div className="text-[11px] text-cyan-300 font-semibold">${food.price.toFixed(2)}</div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => updateFoodQty(food.id, -1)}
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-white min-w-[16px] text-center">{qty}</span>
                        <button
                          onClick={() => updateFoodQty(food.id, 1)}
                          className="p-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Food & Drinks Total:</span>
                <span className="font-bold text-white">${foodTotal.toFixed(2)}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-gray-300"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/20"
                >
                  Proceed to Payment <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* STEP 4: CHECKOUT & PAYMENT SIMULATION */}
      {step === 4 && (
        <div className="max-w-2xl mx-auto glass-panel p-8 rounded-3xl space-y-6 border border-cyan-500/30">
          <h3 className="text-2xl font-black text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-cyan-400" /> Payment & Pass Checkout
          </h3>

          {/* Booking Recap */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-gray-300">
              <span>Movie:</span>
              <span className="font-bold text-white">{movie.title}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Seats Selected:</span>
              <span className="font-bold text-cyan-300">{selectedSeats.join(', ')}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Showtime:</span>
              <span className="font-bold text-white">{selectedShowtime.time}</span>
            </div>
            {foodTotal > 0 && (
              <div className="flex justify-between text-gray-300">
                <span>Concessions:</span>
                <span className="font-bold text-purple-300">${foodTotal.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Coupon Code Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter promo coupon (e.g. MOVIEVERSE)"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={applyCoupon}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white"
            >
              Apply
            </button>
          </div>

          {/* Interactive Credit Card Widget */}
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-cyan-900 to-purple-900 border border-cyan-400/40 space-y-4 text-white shadow-xl">
            <div className="flex justify-between items-center text-xs tracking-widest font-mono">
              <span>MOVIEVERSE CINEMA PASS</span>
              <span className="font-bold text-yellow-300">VISA DEBIT</span>
            </div>
            <div className="text-lg font-mono tracking-wider py-2">{cardNumber}</div>
            <div className="flex justify-between text-[11px] font-mono text-cyan-200">
              <div>CARDHOLDER: ALEX VANCE</div>
              <div>EXP: 12/28</div>
            </div>
          </div>

          {/* Final Price Summary */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Seat Tickets Total:</span>
              <span>${seatTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Concessions Addons:</span>
              <span>${foodTotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Promo Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-black text-white pt-2 border-t border-slate-800">
              <span>Grand Total:</span>
              <span className="text-neon-cyan">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Confirm & Pay Button */}
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" /> Confirm Payment & Generate 3D QR Ticket
              </>
            )}
          </button>
        </div>
      )}

      {/* Ticket Modal popup on completion */}
      {activeTicket && (
        <TicketModal
          ticket={activeTicket}
          onClose={() => {
            setActiveTicket(null);
            clearBooking();
            onBack();
          }}
        />
      )}

    </div>
  );
}
