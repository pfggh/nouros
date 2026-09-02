import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO, MENU_ITEMS } from '../data/menuData';
import { motion, AnimatePresence } from 'framer-motion';

export default function ItemModal({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);

  if (!item) return null;

  const addonList = MENU_ITEMS.filter(i => i.category === 'addons');

  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = (item.price + addonsTotal) * quantity;

  const handleConfirmAdd = () => {
    onAddToCart(item, quantity, selectedAddons);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-lg bg-[#131822] border border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="gold-corner-tl" />
          <div className="gold-corner-tr" />
          <div className="gold-corner-bl" />
          <div className="gold-corner-br" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-black/70 text-gray-300 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="relative w-full h-56 sm:h-64 bg-black">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131822] via-black/20 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  {item.name}
                </h2>
              </div>

              <span className="text-2xl font-black text-gold-gradient bg-[#090B0E]/90 px-3.5 py-1.5 rounded-2xl border border-[#D4AF37]/40">
                {item.price.toFixed(1).replace('.0', '')}{RESTAURANT_INFO.currency}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div>
              <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-1.5">
                Description
              </h4>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                {item.description}
              </p>
            </div>

            {/* Dips & Extras pair section */}
            {item.category !== 'beverages' && item.category !== 'addons' && (
              <div>
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3">
                  Add Extras & Dips
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {addonList.map((addon) => {
                    const isChecked = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all ${
                          isChecked 
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-gold-glow' 
                            : 'bg-[#090B0E] border-white/10 text-gray-300 hover:border-[#D4AF37]/40'
                        }`}
                      >
                        <span className="truncate pr-1">{addon.name}</span>
                        <span>+${addon.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Large Touch Footer */}
          <div className="p-5 bg-[#090B0E] border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 bg-[#131822] border border-white/10 rounded-full px-4 py-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="font-extrabold text-white text-base min-w-[24px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirmAdd}
              className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 py-4 px-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-extrabold text-base shadow-gold-glow transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Order — ${totalPrice.toFixed(1).replace('.0', '')}</span>
            </motion.button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
