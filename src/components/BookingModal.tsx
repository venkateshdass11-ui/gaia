import React, { useState } from 'react';
import { Sparkles, X, CheckCircle, Users, Phone, MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGuests?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, defaultGuests = 2 }) => {
  const [step, setStep] = useState<'form' | 'success' | 'large_group'>('form');
  const [formData, setFormData] = useState({
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:30',
    guests: defaultGuests,
    seating: 'indoor',
    name: '',
    phone: '',
    email: '',
    occasion: 'Casual Dining',
    specialRequests: '',
    needsHighChair: false,
    accessibleSeating: false
  });

  if (!isOpen) return null;

  const handleGuestChange = (num: number) => {
    setFormData(prev => ({ ...prev, guests: num }));
    if (num >= 10) {
      setStep('large_group');
    } else if (step === 'large_group') {
      setStep('form');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-[#FCFAF5] border border-[#7A9F4F]/30 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#2F5D3A] text-[#F6F1E4] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-full bg-[#7A9F4F]/20 text-[#C9A24B]">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif text-xl font-semibold">Reserve Your Table</h3>
              <p className="text-xs text-[#F6F1E4]/80">Gaia · Luxury Pure Vegetarian Dining</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#F6F1E4]/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#23291F] mb-1">Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white border border-[#2F5D3A]/20 rounded-lg px-3 py-2 text-sm text-[#23291F] focus:outline-none focus:ring-2 focus:ring-[#2F5D3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#23291F] mb-1">Time Slot</label>
                  <select
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-white border border-[#2F5D3A]/20 rounded-lg px-3 py-2 text-sm text-[#23291F] focus:outline-none focus:ring-2 focus:ring-[#2F5D3A]"
                  >
                    <optgroup label="Lunch (12:00 PM – 3:30 PM)">
                      <option value="12:00">12:00 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="14:00">2:00 PM</option>
                    </optgroup>
                    <optgroup label="Dinner (7:00 PM – 11:00 PM)">
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="21:30">9:30 PM</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#23291F] mb-1">Guests</label>
                <div className="grid grid-cols-6 gap-2">
                  {[2, 3, 4, 6, 8, 10].map(n => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => handleGuestChange(n)}
                      className={`py-2 text-sm font-medium rounded-lg border transition ${
                        formData.guests === n 
                          ? 'bg-[#2F5D3A] text-white border-[#2F5D3A]' 
                          : 'bg-white text-[#23291F] border-stone-200 hover:border-[#2F5D3A]'
                      }`}
                    >
                      {n === 10 ? '10+' : n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#23291F] mb-1">Seating Area Preference</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'indoor', label: '🌿 Indoor Fine Dining' },
                    { id: 'outdoor', label: '🪴 Alfresco Garden' },
                    { id: 'no_pref', label: '✨ First Available' }
                  ].map(seat => (
                    <button
                      type="button"
                      key={seat.id}
                      onClick={() => setFormData({ ...formData, seating: seat.id })}
                      className={`p-2.5 rounded-lg border text-center transition ${
                        formData.seating === seat.id
                          ? 'bg-[#2F5D3A]/10 border-[#2F5D3A] font-semibold text-[#2F5D3A]'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-[#7A9F4F]'
                      }`}
                    >
                      {seat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#23291F] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#2F5D3A]/20 rounded-lg px-3 py-2 text-sm text-[#23291F] focus:outline-none focus:ring-2 focus:ring-[#2F5D3A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#23291F] mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#2F5D3A]/20 rounded-lg px-3 py-2 text-sm text-[#23291F] focus:outline-none focus:ring-2 focus:ring-[#2F5D3A]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needsHighChair}
                    onChange={e => setFormData({ ...formData, needsHighChair: e.target.checked })}
                    className="rounded text-[#2F5D3A] focus:ring-[#2F5D3A]"
                  />
                  <span>Baby High Chair Needed</span>
                </label>
                <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.accessibleSeating}
                    onChange={e => setFormData({ ...formData, accessibleSeating: e.target.checked })}
                    className="rounded text-[#2F5D3A] focus:ring-[#2F5D3A]"
                  />
                  <span>Wheelchair / Step-Free Seating</span>
                </label>
              </div>

              <div className="pt-3 border-t border-stone-200">
                <button
                  type="submit"
                  className="w-full bg-[#C8643B] hover:bg-[#B4532E] text-white font-medium py-3 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 text-base"
                >
                  <span>Confirm Reservation</span>
                  <CheckCircle className="w-5 h-5" />
                </button>
                <p className="text-[11px] text-center text-stone-500 mt-2">
                  Instant confirmation via WhatsApp & SMS. No advance booking deposit required.
                </p>
              </div>
            </form>
          )}

          {step === 'large_group' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-[#C9A24B]/15 text-[#C8643B] rounded-full mx-auto flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-[#23291F]">Celebration & Large Group Dining</h4>
                <p className="text-sm text-stone-600 mt-1 max-w-md mx-auto">
                  For parties of 10 or more guests, our dedicated hospitality host will curate bespoke set menus, customized seating, and celebration arrangements.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 text-left space-y-2 text-sm text-stone-700">
                <p className="font-medium text-[#2F5D3A]">✨ Direct Group Host Concierge:</p>
                <p className="text-xs text-stone-600">Call directly or send your guest list & dietary requirements on WhatsApp for instant private dining booking.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`tel:${RESTAURANT_INFO.cleanPhone}`}
                  className="flex-1 bg-[#2F5D3A] text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-[#1B2A1F] transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 70225 98649</span>
                </a>
                <a
                  href={RESTAURANT_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:brightness-105 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => { setFormData({ ...formData, guests: 8 }); setStep('form'); }}
                className="text-xs text-stone-500 hover:text-stone-800 underline block mx-auto pt-2"
              >
                ← Back to standard booking for under 10 guests
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#7A9F4F]/20 text-[#2F5D3A] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle className="w-9 h-9" />
              </div>
              <div>
                <h4 className="font-serif text-2xl font-bold text-[#23291F]">Reservation Confirmed!</h4>
                <p className="text-stone-600 text-sm mt-1">
                  We look forward to hosting you at <span className="font-semibold text-[#2F5D3A]">Gaia – Global Vegetarian</span>.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200 text-left text-sm space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Name:</span>
                  <span className="font-semibold text-[#23291F]">{formData.name || 'Valued Guest'}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Date & Time:</span>
                  <span className="font-semibold text-[#23291F]">{formData.date} at {formData.time}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Guests & Area:</span>
                  <span className="font-semibold text-[#23291F]">{formData.guests} Guests · {formData.seating === 'outdoor' ? 'Alfresco Garden' : 'Indoor Dining'}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-stone-500">Confirmation Sent To:</span>
                  <span className="font-medium text-[#7A9F4F]">{formData.phone || '+91 70225 98649'}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/917022598649?text=Hi%20Gaia,%20I%20have%20booked%20table%20for%20${formData.guests}%20on%20${formData.date}%20under%20${encodeURIComponent(formData.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:brightness-105 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Receive Details on WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-medium transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
