import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Phone, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart 
}) {
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isOpen) return null;

  const totalSum = cartItems.reduce((total, cartEntry) => {
    const addonsCost = (cartEntry.selectedAddons || []).reduce((a, b) => a + b.price, 0);
    return total + (cartEntry.item.price + addonsCost) * cartEntry.quantity;
  }, 0);

  const handleWhatsAppCheckout = () => {
    let text = `🔥 *NEW ORDER — NŪROS PUB & RESTAURANT* 🔥\n\n`;
    
    cartItems.forEach((entry, idx) => {
      const itemTotal = (entry.item.price + (entry.selectedAddons || []).reduce((a, b) => a + b.price, 0)) * entry.quantity;
      text += `${idx + 1}. *${entry.item.name}* x${entry.quantity} — $${itemTotal}\n`;
      if (entry.selectedAddons && entry.selectedAddons.length > 0) {
        text += `   + Dips: ${entry.selectedAddons.map(a => a.name).join(', ')}\n`;
      }
    });

    text += `\n💰 *Total:* $${totalSum.toFixed(2)}`;
    if (customerNotes.trim()) {
      text += `\n📝 *Notes:* ${customerNotes}`;
    }
    text += `\n\n📍 Delivery Phone: ${RESTAURANT_INFO.phone}`;

    const url = `https://wa.me/${RESTAURANT_INFO.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-[#090B0E] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 bg-[#131822] border-b border-[#D4AF37]/20 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="text-xl font-serif font-bold text-white">Your Order</h2>
                <span className="bg-[#D4AF37] text-black text-xs font-black px-2.5 py-0.5 rounded-full">
                  {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <ShoppingBag className="w-14 h-14 mx-auto stroke-1 opacity-30 mb-3" />
                  <p className="text-lg font-bold text-white">Your cart is empty</p>
                  <p className="text-xs text-gray-400 mt-1">Select menu items to get started!</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs text-gray-400 border-b border-white/5 pb-2">
                    <span>Selected Items</span>
                    <button
                      onClick={onClearCart}
                      className="text-gray-400 hover:text-white flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cartItems.map((entry, index) => {
                      const addonsCost = (entry.selectedAddons || []).reduce((a, b) => a + b.price, 0);
                      const itemSubtotal = (entry.item.price + addonsCost) * entry.quantity;

                      return (
                        <motion.div
                          key={index}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-[#131822] border border-white/5 rounded-2xl p-3.5 flex items-start space-x-3"
                        >
                          <img
                            src={entry.item.image}
                            alt={entry.item.name}
                            className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="text-sm font-bold text-white truncate">
                                {entry.item.name}
                              </h4>
                              <span className="text-sm font-black text-gold-gradient ml-2">
                                ${itemSubtotal.toFixed(1).replace('.0', '')}
                              </span>
                            </div>

                            {entry.selectedAddons && entry.selectedAddons.length > 0 && (
                              <p className="text-[11px] text-[#D4AF37] mt-0.5">
                                + {entry.selectedAddons.map(a => a.name).join(', ')}
                              </p>
                            )}

                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                              <div className="flex items-center space-x-2 bg-[#090B0E] border border-white/10 rounded-full px-2.5 py-1 text-xs">
                                <button
                                  onClick={() => onUpdateQuantity(index, entry.quantity - 1)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-extrabold text-white px-1.5">{entry.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(index, entry.quantity + 1)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(index)}
                                className="text-gray-400 hover:text-white p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">
                      Order Notes / Instructions
                    </label>
                    <textarea
                      rows="2"
                      placeholder="e.g. Extra dip, no onions..."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full bg-[#131822] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Large Footer Buttons */}
            {cartItems.length > 0 && (
              <div className="p-5 bg-[#131822] border-t border-[#D4AF37]/30 space-y-3">
                <div className="flex items-center justify-between text-base font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-2xl text-gold-gradient font-black">${totalSum.toFixed(2)}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center space-x-2 py-4 rounded-full bg-[#25D366] text-black font-extrabold text-base shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-black" />
                  <span>Send WhatsApp Order</span>
                </motion.button>

                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-full bg-[#090B0E] border border-[#D4AF37]/40 text-white font-bold text-sm hover:border-[#D4AF37] transition-all"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Call Delivery: {RESTAURANT_INFO.phone}</span>
                </a>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
