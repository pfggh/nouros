import React, { useState, useEffect } from 'react';
import NurosLogo from './NurosLogo';
import { ShoppingBag, Search, Phone, LayoutGrid, List } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'glass-nav border-b border-[#D4AF37]/20 py-3 shadow-xl' 
        : 'bg-gradient-to-b from-[#090B0E]/95 to-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center">
          <NurosLogo size="small" showTagline={false} />
        </a>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
          <input
            type="text"
            placeholder="Search pizzas, salads, platters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#131822] border border-[#D4AF37]/30 rounded-full py-2 pl-11 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-3 rounded-full bg-[#131822] text-gray-300 hover:text-[#D4AF37] border border-white/10"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Grid/List View Toggle */}
          <div className="hidden sm:flex bg-[#131822] p-1.5 rounded-full border border-[#D4AF37]/20">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                viewMode === 'grid' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                viewMode === 'list' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              List
            </button>
          </div>

          {/* Large Delivery Hotline Button */}
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-full border border-[#D4AF37]/40 bg-[#131822] text-white hover:border-[#D4AF37] text-xs font-bold transition-all shadow-md"
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <span>Call {RESTAURANT_INFO.phone}</span>
          </a>

          {/* Large Prominent Order Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-extrabold text-sm shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            <span>Order</span>
            {cartCount > 0 && (
              <span className="bg-black text-[#D4AF37] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border border-[#D4AF37]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Expansion */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pt-3 pb-2 bg-[#090B0E] border-b border-[#D4AF37]/20">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131822] border border-[#D4AF37]/40 rounded-full py-2.5 pl-11 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
