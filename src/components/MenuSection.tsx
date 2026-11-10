import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Check, 
  Download, 
  Flame, 
  Leaf, 
  Award, 
  WheatOff, 
  Heart
} from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import type { MenuItem } from '../data/restaurantData';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: Set<string>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, cartItemIds }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Starters', 'Mains', 'Pizzas', 'Asian', 'Chinese', 'Continental', 'Desserts', 'Beverages'];
  const tags = ['All', 'Vegan', 'Jain', 'Gluten-Free', 'Sugar-Free', 'Spicy', "Chef's Special"];

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesTag = selectedTag === 'All' || item.tags.includes(selectedTag as any);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTag && matchesSearch;
  });

  const getTagBadge = (tag: string) => {
    switch (tag) {
      case 'Vegan':
        return <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200"><Leaf className="w-3 h-3 text-emerald-600" /> Vegan</span>;
      case 'Jain':
        return <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">🌿 Jain Friendly</span>;
      case "Chef's Special":
        return <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#C9A24B]/20 text-[#856317] border border-[#C9A24B]/40"><Award className="w-3 h-3 text-[#C9A24B]" /> Chef's Signature</span>;
      case 'Gluten-Free':
        return <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200"><WheatOff className="w-3 h-3" /> Gluten-Free</span>;
      case 'Sugar-Free':
        return <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200"><Heart className="w-3 h-3" /> Sugar-Free</span>;
      case 'Spicy':
        return <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200"><Flame className="w-3 h-3 text-red-600" /> Spicy</span>;
      default:
        return null;
    }
  };

  return (
    <section id="menu" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A9F4F]/15 border border-[#7A9F4F]/30 text-[#2F5D3A] text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-3">
          <Leaf className="w-3.5 h-3.5 text-[#7A9F4F]" />
          <span>Curated Global Menu</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#23291F] tracking-tight leading-snug px-2">
          Where Global Recipes Meet Botanical Purity
        </h2>
        <p className="mt-3 sm:mt-4 text-[#23291F]/70 text-xs sm:text-base leading-relaxed px-2">
          Over 18 pages of celebrated artisanal delicacies spanning the Mediterranean, Orient, Awadh, and contemporary Europe. 100% vegetarian, unconditionally celebrated.
        </p>

        {/* Download PDF Menu button */}
        <div className="mt-5 sm:mt-6 flex flex-wrap justify-center items-center gap-3">
          <button
            onClick={() => alert("Downloading official Gaia 18-page food & beverage menu (PDF)...")}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-[#2F5D3A]/30 bg-white hover:bg-[#2F5D3A]/5 text-[#2F5D3A] font-semibold text-xs sm:text-sm transition shadow-sm"
          >
            <Download className="w-4 h-4 text-[#7A9F4F]" />
            <span>Download Full Menu PDF (19 Pages)</span>
          </button>
        </div>
      </div>

      {/* Sticky & Filter Controls */}
      <div className="sticky top-20 z-30 bg-[#F6F1E4]/95 backdrop-blur-md py-3 sm:py-4 border-y border-[#2F5D3A]/10 mb-6 sm:mb-8 space-y-2.5 sm:space-y-3">
        {/* Search bar */}
        <div className="relative max-w-md mx-auto px-1">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search our dishes (e.g., Truffle, Dimsum, Paneer)..."
            className="w-full pl-9 pr-8 py-2 sm:pl-10 sm:pr-4 sm:py-2.5 bg-white border border-[#2F5D3A]/20 rounded-xl text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2F5D3A] shadow-sm"
          />
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400 absolute left-3.5 sm:left-4 top-2.5 sm:top-3.5" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full w-5 h-5 flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Tabs (Horizontal Scrollable with hide-scrollbar) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 text-xs sm:text-sm justify-start md:justify-center px-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full font-medium whitespace-nowrap transition-all duration-200 text-xs sm:text-sm shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#2F5D3A] text-[#F6F1E4] shadow-md shadow-[#2F5D3A]/20 scale-105'
                  : 'bg-white text-stone-700 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dietary Tag Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto text-xs justify-start md:justify-center pt-0.5 px-1 scrollbar-none">
          <span className="text-stone-500 font-medium shrink-0 text-[10px] sm:text-[11px] uppercase tracking-wider">Dietary:</span>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg transition text-[11px] sm:text-xs whitespace-nowrap shrink-0 ${
                selectedTag === tag
                  ? 'bg-[#7A9F4F] text-white font-semibold'
                  : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-white/50 rounded-2xl border border-dashed border-[#2F5D3A]/20">
          <p className="text-stone-600 font-serif text-base sm:text-lg">No dishes found matching your current filter.</p>
          <button 
            onClick={() => { setActiveCategory('All'); setSelectedTag('All'); setSearchQuery(''); }}
            className="mt-2 text-xs sm:text-sm font-semibold text-[#2F5D3A] underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredItems.map(item => {
            const isInCart = cartItemIds.has(item.id);
            return (
              <div 
                key={item.id}
                className="group bg-[#FCFAF5] rounded-2xl overflow-hidden border border-[#2F5D3A]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative h-44 sm:h-56 overflow-hidden bg-stone-200">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => {
                        // Fallback image in case of network or image host drop
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    
                    {/* Indian Veg Mark (Green dot inside square border) */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-sm p-1 sm:p-1.5 rounded-md shadow-sm border border-stone-200 flex items-center justify-center">
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 border-2 border-emerald-600 rounded-sm flex items-center justify-center p-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                      </div>
                    </div>

                    {/* Category pill */}
                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-[#1B2A1F]/80 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold text-white tracking-wide">
                      {item.category}
                    </div>

                    {/* Rating badge */}
                    {item.rating && (
                      <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 bg-[#FCFAF5]/90 backdrop-blur-sm text-[#23291F] px-1.5 py-0.5 sm:px-2 rounded-md text-[11px] sm:text-xs font-bold flex items-center gap-1 shadow">
                        <span className="text-[#C9A24B]">★</span>
                        <span>{item.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    {/* Dietary tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2">
                      {item.tags.map(t => getTagBadge(t))}
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#23291F] group-hover:text-[#2F5D3A] transition leading-snug">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#23291F]/75 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer price & action */}
                <div className="p-4 sm:p-5 pt-0 mt-auto flex items-center justify-between border-t border-stone-100 pt-3">
                  <div>
                    <span className="text-[10px] sm:text-xs text-stone-500 block leading-tight">Price</span>
                    <span className="text-base sm:text-lg font-bold text-[#23291F]">₹{item.price}</span>
                  </div>

                  <button
                    onClick={() => onAddToCart(item)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 shadow-sm active:scale-95 ${
                      isInCart
                        ? 'bg-[#7A9F4F] text-white'
                        : 'bg-[#2F5D3A] hover:bg-[#1B2A1F] text-white hover:shadow-md'
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Added (+1)</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Add Dish</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
