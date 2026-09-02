import React, { useState, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import MenuCard from './components/MenuCard';
import ItemModal from './components/ItemModal';
import CartDrawer from './components/CartDrawer';
import AddonsSection from './components/AddonsSection';
import Footer from './components/Footer';
import { MENU_ITEMS, CATEGORIES } from './data/menuData';
import { SearchX, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedModalItem, setSelectedModalItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const menuSectionRef = useRef(null);

  const scrollToMenu = () => {
    if (menuSectionRef.current) {
      menuSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    scrollToMenu();
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }
      if (dietaryFilter === 'popular' && !item.isPopular) return false;
      if (dietaryFilter === 'veggie' && !item.isVegetarian) return false;
      if (dietaryFilter === 'seafood' && !item.isSeafood) return false;

      return true;
    });
  }, [activeCategory, searchQuery, dietaryFilter]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartSum = cartItems.reduce((total, cartEntry) => {
    const addonsCost = (cartEntry.selectedAddons || []).reduce((a, b) => a + b.price, 0);
    return total + (cartEntry.item.price + addonsCost) * cartEntry.quantity;
  }, 0);

  const handleAddToCart = (item, quantity = 1, selectedAddons = []) => {
    const existingIndex = cartItems.findIndex(
      (entry) =>
        entry.item.id === item.id &&
        JSON.stringify(entry.selectedAddons || []) === JSON.stringify(selectedAddons || [])
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { item, quantity, selectedAddons }]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      const updated = [...cartItems];
      updated[index].quantity = newQty;
      setCartItems(updated);
    }
  };

  const handleRemoveItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#090B0E] text-gray-100 flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <Hero onExploreMenu={scrollToMenu} />

      <div ref={menuSectionRef}>
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 sm:pb-12">
        
        {/* Header Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center space-x-3">
              <span>
                {activeCategory === 'all'
                  ? 'All Menu'
                  : CATEGORIES.find((c) => c.id === activeCategory)?.name}
              </span>
              <span className="text-xs text-gray-400 font-normal">
                ({filteredItems.length})
              </span>
            </h2>
          </div>

          {/* Simple Gold Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                dietaryFilter === 'all'
                  ? 'bg-[#D4AF37] text-black shadow-gold-glow'
                  : 'bg-[#131822] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietaryFilter('popular')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                dietaryFilter === 'popular'
                  ? 'bg-[#D4AF37] text-black shadow-gold-glow'
                  : 'bg-[#131822] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setDietaryFilter('veggie')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                dietaryFilter === 'veggie'
                  ? 'bg-[#D4AF37] text-black shadow-gold-glow'
                  : 'bg-[#131822] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              Veggie
            </button>
            <button
              onClick={() => setDietaryFilter('seafood')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                dietaryFilter === 'seafood'
                  ? 'bg-[#D4AF37] text-black shadow-gold-glow'
                  : 'bg-[#131822] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              Seafood
            </button>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#131822] rounded-3xl border border-white/10">
            <SearchX className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white">No items found</h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
                setActiveCategory('all');
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#D4AF37] text-black font-extrabold text-xs"
            >
              Show All Items
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col space-y-4'
            }
          >
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                viewMode={viewMode}
                onSelect={(selected) => setSelectedModalItem(selected)}
                onAddToCart={(target) => handleAddToCart(target)}
              />
            ))}
          </div>
        )}

      </main>

      <AddonsSection onAddToCart={(addon) => handleAddToCart(addon)} />
      <Footer />

      {/* Floating Bottom Quick Cart Bar for Mobile */}
      <AnimatePresence>
        {totalCartCount > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 z-40 sm:hidden"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-[#D4AF37] text-black font-extrabold p-3.5 rounded-full shadow-2xl flex items-center justify-between border border-black/20 active:scale-98 transition-transform btn-shimmer-effect"
            >
              <div className="flex items-center space-x-2">
                <span className="bg-black text-[#D4AF37] text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
                <span className="text-sm">View Order</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-base font-black">${totalCartSum.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedModalItem && (
        <ItemModal
          item={selectedModalItem}
          onClose={() => setSelectedModalItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
