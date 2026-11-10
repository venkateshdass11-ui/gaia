import React, { useState } from 'react';
import { 
  ShoppingBag, 
  CheckCircle, 
  Plus, 
  Minus, 
  X, 
  ExternalLink 
} from 'lucide-react';
import type { MenuItem } from '../data/restaurantData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { item: MenuItem; quantity: number }[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('takeaway');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, entry) => sum + (entry.item.price * entry.quantity), 0);
  const packagingFee = cart.length > 0 ? 30 : 0;
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + packagingFee + taxes;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
  };

  const getWhatsAppOrderLink = () => {
    const itemsText = cart
      .map(entry => `• ${entry.item.name} x${entry.quantity} (₹${entry.item.price * entry.quantity})`)
      .join('%0A');
    const msg = `Hello Gaia, I would like to place a ${orderType.toUpperCase()} order:%0A%0A${itemsText}%0A%0A*Total:* ₹${grandTotal}%0A*Name:* ${customerName}%0A*Phone:* ${phone}%0A${orderType === 'delivery' ? `*Address:* ${deliveryAddress}` : '*Pickup: JP Nagar Outlet*'}`;
    return `https://wa.me/917022598649?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-[#FCFAF5] border border-[#7A9F4F]/30 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-[#2F5D3A] text-[#F6F1E4] px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-full bg-[#7A9F4F]/20 text-[#C9A24B]">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif text-xl font-semibold">Order Direct & Save</h3>
              <p className="text-xs text-[#F6F1E4]/80">Save 15% directly vs delivery aggregators</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#F6F1E4]/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto grow">
          {isOrdered ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#7A9F4F]/20 text-[#2F5D3A] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#23291F]">Order Received!</h4>
              <p className="text-stone-600 text-sm max-w-sm mx-auto">
                Thank you, {customerName}! Our master kitchen has received your ticket. We are preparing your freshly cooked dishes with love.
              </p>

              <div className="bg-white p-4 rounded-xl border border-stone-200 text-left text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Service:</span>
                  <span className="font-medium capitalize text-[#2F5D3A]">{orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Total Payable:</span>
                  <span className="font-bold text-[#C8643B]">₹{grandTotal} (UPI / Cash / Card)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Ready In:</span>
                  <span className="font-medium text-stone-800">25–35 minutes</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={getWhatsAppOrderLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:brightness-105 transition"
                >
                  <span>Track / Chat on WhatsApp</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => {
                    setIsOrdered(false);
                    onClearCart();
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-medium transition"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Type Switcher */}
              <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2 text-sm font-medium rounded-lg transition ${
                    orderType === 'takeaway'
                      ? 'bg-white shadow-sm text-[#2F5D3A] font-semibold'
                      : 'text-stone-600 hover:text-[#23291F]'
                  }`}
                >
                  🥡 Direct Takeaway (Quick Pickup)
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2 text-sm font-medium rounded-lg transition ${
                    orderType === 'delivery'
                      ? 'bg-white shadow-sm text-[#2F5D3A] font-semibold'
                      : 'text-stone-600 hover:text-[#23291F]'
                  }`}
                >
                  🛵 Direct Delivery (JP Nagar & 7km)
                </button>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-xl border border-dashed border-stone-300 mb-6">
                  <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                  <p className="text-stone-600 text-sm font-medium">Your culinary basket is empty</p>
                  <p className="text-stone-400 text-xs mt-1">Browse our menu below and add signature dishes.</p>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Selected Dishes</h4>
                  <div className="divide-y divide-stone-100 bg-white rounded-xl border border-stone-200 p-2">
                    {cart.map(({ item, quantity }) => (
                      <div key={item.id} className="py-2.5 px-2 flex items-center justify-between text-sm">
                        <div className="grow pr-3">
                          <div className="font-semibold text-[#23291F] flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#7A9F4F] inline-block"></span>
                            <span>{item.name}</span>
                          </div>
                          <div className="text-xs text-stone-500">₹{item.price} each</div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1 hover:bg-stone-200 text-stone-700 transition"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-semibold">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1 hover:bg-stone-200 text-stone-700 transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="font-semibold text-stone-900 w-16 text-right">
                            ₹{item.price * quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bill calculation */}
                  <div className="bg-[#2F5D3A]/5 border border-[#2F5D3A]/15 rounded-xl p-3 text-xs space-y-1.5">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Eco-friendly packaging</span>
                      <span>₹{packagingFee}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Taxes (5% GST)</span>
                      <span>₹{taxes}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#23291F] border-t border-[#2F5D3A]/20 pt-1.5">
                      <span>Total Amount</span>
                      <span className="text-[#C8643B]">₹{grandTotal}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form details if items present */}
              {cart.length > 0 && (
                <form onSubmit={handlePlaceOrder} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#23291F] mb-1">Your Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5D3A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#23291F] mb-1">Contact Phone *</label>
                      <input 
                        type="tel" 
                        required 
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5D3A]"
                      />
                    </div>
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-xs font-semibold text-[#23291F] mb-1">Delivery Address (within 7km of JP Nagar) *</label>
                      <textarea
                        required
                        rows={2}
                        value={deliveryAddress}
                        onChange={e => setDeliveryAddress(e.target.value)}
                        placeholder="Flat/House No, Building, Street, Landmark"
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5D3A]"
                      />
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#2F5D3A] hover:bg-[#1B2A1F] text-white py-3 rounded-xl font-medium transition shadow-md flex items-center justify-center space-x-2"
                    >
                      <span>Place Direct Order (Pay on Delivery/Pickup)</span>
                      <CheckCircle className="w-5 h-5 text-[#7A9F4F]" />
                    </button>
                  </div>
                </form>
              )}

              {/* Aggregator links as alternative */}
              <div className="mt-5 pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span>Prefer delivery apps?</span>
                  <span className="text-[#C8643B] font-medium">Aggregator partners</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <a
                    href="https://www.zomato.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-red-200 bg-red-50 text-red-700 text-center hover:bg-red-100 transition"
                  >
                    Order on Zomato
                  </a>
                  <a
                    href="https://www.swiggy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-700 text-center hover:bg-orange-100 transition"
                  >
                    Order on Swiggy
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
