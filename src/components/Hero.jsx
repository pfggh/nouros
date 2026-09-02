import React from 'react';
import NurosLogo from './NurosLogo';
import { Phone, MessageCircle, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Hero({ onExploreMenu }) {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden gpu-fast">
      
      {/* Subtle Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Main Logo Card */}
        <div className="inline-block relative p-6 sm:p-10 mb-6 glass-card rounded-3xl shadow-2xl transition-transform hover:scale-[1.01]">
          <div className="gold-corner-tl" />
          <div className="gold-corner-tr" />

          <NurosLogo size="large" showTagline={true} />

          {/* Hotline Pill */}
          <div className="mt-5 inline-block px-4 py-1.5 rounded-full bg-[#090B0E] border border-[#D4AF37]/40 text-[#D4AF37] text-xs sm:text-sm font-bold tracking-wider">
            DELIVERY HOTLINE: <strong className="text-white text-base tracking-widest ml-1">{RESTAURANT_INFO.phone}</strong>
          </div>
        </div>

        {/* Tagline */}
        <p className="max-w-lg mx-auto text-gray-300 text-sm sm:text-base font-light mb-8 leading-relaxed">
          Artisan wood-fired pizzas, steak & chicken platters, fresh salads and subs.
        </p>

        {/* Buttons with Shimmer & Scale Animations */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 py-4 px-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-extrabold text-base shadow-gold-glow hover:brightness-110 active:scale-95 transition-all btn-shimmer-effect"
          >
            <Utensils className="w-5 h-5 stroke-[2.5]" />
            <span>Explore Menu</span>
          </button>

          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappPhone}?text=${encodeURIComponent('Hello NŪROS! I would like to place an order from your menu.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 py-4 px-8 rounded-full bg-[#25D366] text-black font-extrabold text-base shadow-lg hover:bg-[#20ba59] active:scale-95 transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-black" />
            <span>WhatsApp Order</span>
          </a>
        </div>

      </div>
    </section>
  );
}
