import React, { useRef } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  const scrollContainerRef = useRef(null);

  const getCategoryCount = (catId) => {
    if (catId === 'all') return MENU_ITEMS.length;
    return MENU_ITEMS.filter(item => item.category === catId).length;
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catId, e) => {
    onSelectCategory(catId);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div className="sticky top-[60px] z-30 nav-solid border-b border-[#D4AF37]/25 py-2.5 shadow-xl gpu-fast">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative flex items-center">
        
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex items-center justify-center p-2 rounded-full bg-[#131822] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black border border-white/10 shadow-md transition-all active:scale-90 mr-2 flex-shrink-0"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Category Row */}
        <div
          ref={scrollContainerRef}
          className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 scroll-smooth w-full px-1"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = getCategoryCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={(e) => handleCategoryClick(cat.id, e)}
                className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-full whitespace-nowrap text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#D4AF37] text-black shadow-gold-glow scale-105 font-black btn-shimmer-effect'
                    : 'bg-[#131822] text-gray-200 hover:text-white border border-white/10 hover:border-[#D4AF37]/40'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-black/25 text-black font-black' 
                    : 'bg-white/10 text-gray-300 font-semibold'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="hidden sm:flex items-center justify-center p-2 rounded-full bg-[#131822] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black border border-white/10 shadow-md transition-all active:scale-90 ml-2 flex-shrink-0"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
