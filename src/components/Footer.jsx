import React from 'react';
import NurosLogo from './NurosLogo';
import { Phone, MapPin, Clock, ArrowUp, Instagram, Facebook } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#07090D] border-t border-[#D4AF37]/30 text-gray-400 pt-16 pb-12 overflow-hidden">
      
      {/* Lattice accent bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Intro */}
          <div className="md:col-span-2 space-y-4">
            <NurosLogo size="medium" showTagline={true} className="items-start text-left" />
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-md leading-relaxed">
              Where unforgettable flavors meet vibrant late-night pub ambiance. Crafting premium pizzas, gourmet platters, fresh salads, and handcrafted burgers.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-[#131822] text-gray-400 hover:text-[#D4AF37] border border-white/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#131822] text-gray-400 hover:text-[#D4AF37] border border-white/10 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-widest uppercase flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Hours & Vibe</span>
            </h4>
            <ul className="text-xs space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Monday - Sunday:</span>
                <span className="text-gray-200 font-semibold">{RESTAURANT_INFO.openingHours}</span>
              </li>
              <li className="flex justify-between">
                <span>Late Night Kitchen:</span>
                <span className="text-red-400 font-semibold">Open Late</span>
              </li>
              <li className="text-[11px] text-gray-500 pt-1">
                Pub • Restaurant • Lounge
              </li>
            </ul>
          </div>

          {/* Contact & Delivery */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-widest uppercase flex items-center space-x-2">
              <Phone className="w-4 h-4 text-red-500" />
              <span>Delivery Hotline</span>
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="block p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-white font-bold text-base hover:border-red-400 transition-all text-center tracking-widest"
              >
                {RESTAURANT_INFO.phone}
              </a>
              <p className="text-[11px] text-gray-400">
                Call or WhatsApp for fast delivery directly to your doorstep.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright & scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} NŪROS Pub & Restaurant. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[#D4AF37] hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
