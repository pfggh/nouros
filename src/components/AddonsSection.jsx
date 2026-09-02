import React from 'react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';
import { Plus } from 'lucide-react';

export default function AddonsSection({ onAddToCart }) {
  const addons = MENU_ITEMS.filter(i => i.category === 'addons');

  return (
    <section className="py-12 bg-gradient-to-b from-[#090B0E] via-[#131822] to-[#090B0E] border-y border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-md mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Dips & Extras
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            House made sauces and extra meat portions
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {addons.map((addon) => (
            <div
              key={addon.id}
              className="bg-[#090B0E] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 rounded-2xl p-4 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors truncate pr-1">
                    {addon.name}
                  </h4>
                  <span className="text-sm font-black text-gold-gradient">
                    {addon.price.toFixed(1).replace('.0', '')}{RESTAURANT_INFO.currency}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-light line-clamp-2 mb-4">
                  {addon.description}
                </p>
              </div>

              <button
                onClick={() => onAddToCart(addon)}
                className="w-full py-2.5 rounded-xl bg-[#131822] hover:bg-[#D4AF37] hover:text-black border border-white/10 text-xs text-white font-extrabold transition-all flex items-center justify-center space-x-1"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Extra</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
