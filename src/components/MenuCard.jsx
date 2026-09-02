import React, { useState } from 'react';
import { Plus, Eye, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function MenuCard({ item, onSelect, onAddToCart, viewMode = 'grid' }) {
  const [added, setAdded] = useState(false);
  const isGrid = viewMode === 'grid';

  const handleAddClick = (e) => {
    e.stopPropagation();
    onAddToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div 
      className={`group relative bg-[#11151F] border border-[#D4AF37]/20 rounded-2xl overflow-hidden hover:border-[#D4AF37]/60 hover:shadow-2xl transition-all duration-300 flex cv-auto gpu-fast ${
        isGrid ? 'flex-col h-full' : 'flex-row items-center p-4 gap-4'
      }`}
    >
      <div className="gold-corner-tr opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Image Preview */}
      <div 
        onClick={() => onSelect(item)}
        className={`relative overflow-hidden cursor-pointer bg-black/60 ${
          isGrid ? 'w-full h-48 sm:h-52' : 'w-28 h-28 sm:w-32 sm:h-32 rounded-xl flex-shrink-0'
        }`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 gpu-fast"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#11151F] via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />

        {/* Minimal Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1.5 z-10">
          {item.isPopular && (
            <span className="bg-[#D4AF37] text-black font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow">
              Popular
            </span>
          )}
          {item.isVegetarian && (
            <span className="bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
              Veggie
            </span>
          )}
          {item.isSeafood && (
            <span className="bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
              Seafood
            </span>
          )}
        </div>

        {/* Eye Hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-[#D4AF37] text-black p-2.5 rounded-full shadow-lg">
            <Eye className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className={`flex flex-col justify-between flex-grow ${isGrid ? 'p-5' : 'py-1'}`}>
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 
              onClick={() => onSelect(item)}
              className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors cursor-pointer leading-tight"
            >
              {item.name}
            </h3>

            <span className="text-lg font-black text-gold-gradient tracking-tight whitespace-nowrap">
              {item.price.toFixed(1).replace('.0', '')}{RESTAURANT_INFO.currency}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 font-light line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>
        </div>

        {/* Buttons with Added Check Animation */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
          <button
            onClick={() => onSelect(item)}
            className="text-xs text-gray-400 hover:text-[#D4AF37] font-semibold"
          >
            Details
          </button>

          <button
            onClick={handleAddClick}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-black shadow-gold-glow transition-all active:scale-90 ${
              added 
                ? 'bg-emerald-500 text-white scale-105' 
                : 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black hover:brightness-110'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
