import { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Users, 
  ArrowRight, 
  Menu, 
  X, 
  ShoppingBag, 
  ExternalLink, 
  TreePine 
} from 'lucide-react';
import { RESTAURANT_INFO, MENU_ITEMS, REVIEWS, GALLERY_IMAGES } from './data/restaurantData';
import type { MenuItem } from './data/restaurantData';
import { BookingModal } from './components/BookingModal';
import { OrderModal } from './components/OrderModal';
import { MenuSection } from './components/MenuSection';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'All' | 'Food' | 'Interiors' | 'Outdoor' | 'Events'>('All');
  const [activeDishIndex, setActiveDishIndex] = useState(0);

  // Cart state
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(entry => entry.item.id === item.id);
      if (existing) {
        return prev.map(entry => 
          entry.item.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(entry => {
          if (entry.item.id === id) {
            const nextQty = entry.quantity + delta;
            return nextQty > 0 ? { ...entry, quantity: nextQty } : null;
          }
          return entry;
        })
        .filter(Boolean) as { item: MenuItem; quantity: number }[];
    });
  };

  const totalCartCount = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  const cartItemIds = new Set(cart.map(e => e.item.id));

  const featuredDishes = MENU_ITEMS.filter(m => m.featured);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E4] text-[#23291F] overflow-x-hidden w-full max-w-full">
      {/* 1. TOP ANNOUNCEMENT BAR & REAL-TIME STATUS (Hidden on mobile as requested) */}
      <aside aria-label="Announcement" className="hidden md:block bg-[#1B2A1F] text-[#F6F1E4] text-xs py-2 px-4 border-b border-[#7A9F4F]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#7A9F4F]/30 text-[#A8D379] px-2.5 py-0.5 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-[#7A9F4F] animate-pulse"></span>
              Open Now · Lunch till 3:30 PM & Dinner at 7:00 PM
            </span>
            <span className="hidden sm:inline text-[#F6F1E4]/70">|</span>
            <span className="hidden sm:inline text-[#F6F1E4]/80">
              🌿 100% Pure Vegetarian · Jain & Vegan Specialised
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#F6F1E4]/90">
            <a 
              href={`tel:${RESTAURANT_INFO.cleanPhone}`}
              className="hover:text-[#C9A24B] transition flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>+91 70225 98649</span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href={RESTAURANT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </aside>

      {/* 2. STICKY MAIN NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#FCFAF5]/95 backdrop-blur-md border-b border-[#2F5D3A]/15 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Tagline */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full bg-[#2F5D3A] text-[#F6F1E4] flex items-center justify-center font-serif text-2xl font-bold shadow-md group-hover:scale-105 transition">
                G
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2F5D3A] block leading-none">
                  GAIA
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-500 font-semibold mt-1 block">
                  Global Vegetarian · JP Nagar
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#23291F]">
              <a href="#about" className="hover:text-[#2F5D3A] transition">Our Story</a>
              <a href="#cuisines" className="hover:text-[#2F5D3A] transition">Cuisines</a>
              <a href="#menu" className="hover:text-[#2F5D3A] transition">Digital Menu</a>
              <a href="#events" className="hover:text-[#2F5D3A] transition">Private Dining</a>
              <a href="#gallery" className="hover:text-[#2F5D3A] transition">Ambience</a>
              <a href="#reviews" className="hover:text-[#2F5D3A] transition">Reviews</a>
              <a href="#location" className="hover:text-[#2F5D3A] transition">Directions</a>
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* Cart / Direct order trigger */}
              <button
                onClick={() => setIsOrderOpen(true)}
                className="relative px-3.5 py-2.5 rounded-xl border border-[#2F5D3A]/20 bg-white hover:bg-stone-50 text-[#23291F] font-semibold text-xs transition flex items-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#2F5D3A]" />
                <span>Direct Order</span>
                {totalCartCount > 0 && (
                  <span className="bg-[#C8643B] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Primary Book Table CTA */}
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-[#C8643B] hover:bg-[#B4532E] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table</span>
              </button>
            </div>

            {/* Mobile menu hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setIsOrderOpen(true)}
                className="relative p-2 text-[#2F5D3A]"
                aria-label="View basket"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalCartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#C8643B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 hover:text-black"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FCFAF5] border-b border-stone-200 px-4 pt-3 pb-6 space-y-3">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800 border-b border-stone-100"
            >
              Our Story
            </a>
            <a 
              href="#cuisines" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800 border-b border-stone-100"
            >
              Cuisines
            </a>
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800 border-b border-stone-100"
            >
              Digital Menu
            </a>
            <a 
              href="#events" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800 border-b border-stone-100"
            >
              Events & Private Dining
            </a>
            <a 
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800 border-b border-stone-100"
            >
              Ambience & Photos
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800 border-b border-stone-100"
            >
              Guest Testimonials
            </a>
            <a 
              href="#location" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800"
            >
              Location & Hours
            </a>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); setIsBookingOpen(true); }}
                className="w-full bg-[#C8643B] text-white py-3 rounded-xl font-semibold text-center shadow"
              >
                Book a Table Now
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); setIsOrderOpen(true); }}
                className="w-full bg-[#2F5D3A] text-white py-3 rounded-xl font-semibold text-center"
              >
                Order Direct Takeaway / Delivery
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-end lg:items-center bg-[#1B2A1F] text-white overflow-hidden">
        
        {/* Fullscreen Background Video for Mobile (Guaranteed Auto-play, Muted, PlaysInline) */}
        <div className="absolute inset-0 z-0 lg:hidden overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            // @ts-ignore
            webkit-playsinline="true"
            preload="auto"
            className="w-full h-full object-cover object-center filter brightness-[0.7]"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Subtle cinematic gradient: clear at top, rich dark fade at bottom for headline legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#142018] via-[#1B2A1F]/60 to-black/30 pointer-events-none" />
        </div>

        {/* Desktop Ambient Background Texture */}
        <div className="absolute inset-0 z-0 hidden lg:block bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#2F5D3A]/30 via-[#1B2A1F] to-[#142018]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Content Column: On Mobile, placed at the bottom with headline and only 2 buttons */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
              
              {/* Rating & Location pill (Shown on desktop/tablet, hidden on extra small mobile to keep hero clean) */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-[#F6F1E4] shadow-sm">
                <span className="flex items-center text-[#C9A24B]">
                  <Star className="w-4 h-4 fill-current" />
                  <strong className="ml-1 text-white">4.2</strong>
                </span>
                <span className="text-white/40">•</span>
                <span>1,582+ Dining Ratings</span>
                <span className="text-white/40">•</span>
                <span>JP Nagar, Outer Ring Road</span>
              </div>

              {/* Main Headline placed at the bottom on mobile */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F6F1E4] leading-[1.18] drop-shadow-md">
                Plant-Based Dining, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E2F0D9] via-[#C9A24B] to-[#E2F0D9]">
                  Elevated to an Art Form.
                </span>
              </h1>

              {/* Tagline description (Shown on desktop & tablets) */}
              <p className="hidden sm:block text-base sm:text-lg text-[#F6F1E4]/85 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Named after the Greek goddess of Mother Earth. Welcome to Gaia — Bengaluru’s premier luxury-casual sanctuary where pure vegetarian cuisine is celebrated with world-class craft and botanical purity.
              </p>

              {/* Dietary highlight badges (Shown on tablet and desktop) */}
              <div className="hidden sm:flex flex-wrap justify-center lg:justify-start items-center gap-2 text-xs font-medium text-stone-200">
                <span className="bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 100% Vegetarian
                </span>
                <span className="bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm">
                  🌿 Dedicated Jain Menu
                </span>
                <span className="bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm">
                  🌱 Vegan & Sugar-Free Options
                </span>
                <span className="bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm">
                  👨‍👩‍👧‍👦 Family & Large-Group Seating
                </span>
              </div>

              {/* ONLY TWO BUTTONS IN MOBILE HERO */}
              <div className="pt-2 flex flex-row items-center justify-center lg:justify-start gap-3 w-full max-w-sm mx-auto lg:mx-0">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="flex-1 bg-[#C8643B] hover:bg-[#B4532E] text-white font-semibold py-3 px-4 sm:px-8 sm:py-4 rounded-xl text-xs sm:text-base shadow-xl hover:shadow-2xl transition duration-300 flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Book Table</span>
                </button>
                <a
                  href="#menu"
                  className="flex-1 bg-white/20 hover:bg-white/30 text-[#F6F1E4] border border-white/40 font-semibold py-3 px-4 sm:px-8 sm:py-4 rounded-xl text-xs sm:text-base backdrop-blur-md transition duration-300 flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>View Menu</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A24B]" />
                </a>
              </div>

              {/* Quick snapshot info (Desktop / Tablet only) */}
              <div className="hidden sm:grid pt-6 border-t border-white/15 grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
                <div>
                  <span className="block text-xl font-serif font-bold text-[#C9A24B]">₹1,300</span>
                  <span className="text-xs text-stone-300">Average for two</span>
                </div>
                <div>
                  <span className="block text-xl font-serif font-bold text-[#C9A24B]">5 Cuisines</span>
                  <span className="text-xs text-stone-300">Pan-Asian, Italian & Awadh</span>
                </div>
                <div>
                  <span className="block text-xl font-serif font-bold text-[#C9A24B]">Valet Parking</span>
                  <span className="text-xs text-stone-300">Free dedicated bays</span>
                </div>
                <div>
                  <span className="block text-xl font-serif font-bold text-[#C9A24B]">Outdoor & Indoor</span>
                  <span className="text-xs text-stone-300">Alfresco garden terrace</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Video Container on Desktop (5 Cols) */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-[2rem] overflow-hidden p-2 bg-gradient-to-b from-[#C9A24B]/40 via-[#2F5D3A]/30 to-[#C9A24B]/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#C9A24B]/30">
                <div className="relative rounded-[1.6rem] overflow-hidden aspect-[9/16] bg-black shadow-inner">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/hero-video.mp4" type="video/mp4" />
                  </video>
                  {/* Subtle video aesthetic vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Floating Luxury Badges on Video */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                    <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold border border-white/20 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      Gaia Live Ambience
                    </span>
                    <span className="bg-[#C9A24B]/90 text-stone-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                      Pure Veg
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-white pointer-events-none">
                    <p className="font-serif font-semibold text-sm">Experience Gaia</p>
                    <p className="text-[11px] text-stone-300">Bespoke luxury-casual dining on Outer Ring Road, JP Nagar</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CURRENT OFFERS & PRIVILEGES BANNER (PRD Functional Requirement) */}
      <section className="bg-[#2F5D3A] text-white py-4 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <span className="p-2 rounded-full bg-[#C9A24B] text-[#1B2A1F] shrink-0 hidden sm:block">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-wide flex items-center gap-2 justify-center md:justify-start">
                <span>Direct Dine-In & Takeaway Privilege:</span>
                <span className="bg-[#C8643B] text-white text-xs px-2 py-0.5 rounded-full font-bold">15% OFF</span>
              </p>
              <p className="text-xs text-[#F6F1E4]/80">
                Book directly on this official website to skip 3rd party aggregator markups and enjoy complimentary chef's amuse-bouche.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="shrink-0 bg-[#F6F1E4] hover:bg-white text-[#2F5D3A] font-bold text-xs uppercase px-5 py-2.5 rounded-lg tracking-wider transition shadow"
          >
            Claim Table Offer
          </button>
        </div>
      </section>

      {/* 5. ABOUT US / OUR STORY (PRD Requirement: Philosophy, Name Gaia, Sustainability) */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A9F4F]/15 border border-[#7A9F4F]/30 text-[#2F5D3A] text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4">
              <TreePine className="w-3.5 h-3.5 text-[#7A9F4F]" />
              <span>The Philosophy of Gaia</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#23291F] leading-tight">
              Honouring Mother Earth Through Conscious Gastronomy
            </h2>
            
            {/* Detailed Story Paragraphs (Hidden on mobile as requested, shown on tablet & desktop) */}
            <div className="hidden md:block mt-6 text-[#23291F]/80 space-y-4 text-base leading-relaxed">
              <p>
                In classical mythology, <strong>Gaia</strong> is the primordial earth mother — the living, breathing organism that nourishes all living things. Too often, vegetarian dining is portrayed as an afterthought or a restrictive substitute.
              </p>
              <p>
                At Gaia JP Nagar, we set out with a radical conviction: <span className="text-[#2F5D3A] font-semibold">plant-based ingredients can be as indulgent, complex, and celebratory as any Michelin-starred kitchen in the world</span>. We source farm-fresh organic produce from local Karnataka estates, cold-pressed cold-chain oils, and handcrafted cheeses.
              </p>
              <p>
                From authentic hand-stretched Neapolitan crusts fermented over 48 hours to delicately pleated black truffle dimsums, every recipe honors the natural world without compromising on lavish dining comfort.
              </p>
            </div>

            {/* Quality pillars */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-[#FCFAF5] p-4 rounded-xl border border-stone-200">
                <span className="text-[#7A9F4F] font-bold text-lg block">100% Uncompromised</span>
                <span className="text-xs text-stone-600">Strictly dedicated vegetarian kitchen with separate Jain preparation zones.</span>
              </div>
              <div className="bg-[#FCFAF5] p-4 rounded-xl border border-stone-200">
                <span className="text-[#C8643B] font-bold text-lg block">Earth-To-Table</span>
                <span className="text-xs text-stone-600">Zero artificial colors or preservatives. Biodegradable delivery packaging.</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80" 
                alt="Fresh Avocado Tartare"
                className="rounded-2xl shadow-lg object-cover h-64 sm:h-72 w-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=700&q=80" 
                alt="Gaia Outdoor Green Terrace"
                className="rounded-2xl shadow-lg object-cover h-64 sm:h-72 w-full mt-6"
              />
            </div>
            {/* Center floating award badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#2F5D3A] text-[#F6F1E4] px-6 py-4 rounded-2xl shadow-2xl border border-[#7A9F4F]/40 text-center w-64">
              <Award className="w-6 h-6 text-[#C9A24B] mx-auto mb-1" />
              <div className="text-xs font-semibold tracking-wider uppercase text-[#C9A24B]">Award Winner</div>
              <div className="text-sm font-serif font-bold">Best Luxury-Casual Veg 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUISINES SHOWCASE (North Indian, Chinese, Continental, Asian, Pizza) */}
      <section id="cuisines" className="py-12 sm:py-20 bg-[#FCFAF5] border-y border-[#2F5D3A]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
            <span className="text-[#C8643B] font-semibold text-xs uppercase tracking-widest block mb-1.5 sm:mb-2">A Culinary Voyage</span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#23291F]">
              Five Global Cuisines Under One Sanctuary
            </h2>
            <p className="mt-2 sm:mt-4 text-[#23291F]/70 text-xs sm:text-base">
              Each culinary specialty at Gaia is headed by dedicated master chefs trained in their respective regional traditions.
            </p>
          </div>

          {/* Responsive Cuisines: Horizontal swipe on small mobile, grid on sm/desktop */}
          <div className="flex sm:grid overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-5 snap-x snap-mandatory">
            {[
              {
                title: "North Indian",
                desc: "Slow-simmered Awadhi gravies, charcoal-tandoor flatbreads, and saffron-scented dum biryanis.",
                img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
                highlight: "Smoked Paneer Pasanda"
              },
              {
                title: "Artisanal Pizza",
                desc: "48-hour slow fermented sourdough, San Marzano tomato coulis, wild forest mushrooms.",
                img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
                highlight: "Truffle Porcini Crust"
              },
              {
                title: "Pan-Asian",
                desc: "Silken crystal dimsums, Chiang Mai curries, lotus stem crunch, and aromatic broth bowls.",
                img: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
                highlight: "Edamame Truffle Dumpling"
              },
              {
                title: "Continental",
                desc: "Artisanal burrata carpaccio, roasted asparagus risotto, and heirloom garden salads.",
                img: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22521?auto=format&fit=crop&w=600&q=80",
                highlight: "Piedmont Burrata"
              },
              {
                title: "Chinese Wok",
                desc: "Crisp Sichuan lotus roots, wok-tossed Cantonese greens, and chili pepper crisps.",
                img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
                highlight: "Honey Sichuan Stem"
              }
            ].map(c => (
              <div 
                key={c.title}
                className="w-[78vw] max-w-[280px] sm:w-auto shrink-0 sm:shrink bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col snap-start"
              >
                <div className="h-40 sm:h-44 overflow-hidden relative">
                  <img 
                    src={c.img} 
                    alt={c.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-white font-serif font-bold text-base sm:text-lg">
                    {c.title}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    {c.desc}
                  </p>
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400">Must Try:</span>
                    <span className="font-semibold text-[#2F5D3A]">{c.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DIGITAL MENU COMPONENT (PRD Requirement 6.2) */}
      <MenuSection 
        onAddToCart={handleAddToCart}
        cartItemIds={cartItemIds}
      />

      {/* 8. FEATURED DISH CAROUSEL (PRD Functional Requirement) */}
      <section className="py-16 bg-[#2F5D3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-[#C9A24B] text-xs font-semibold uppercase tracking-widest block">Handpicked Masterpieces</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1">Chef's Signature Selections</h2>
            </div>
            <div className="flex items-center gap-2">
              {featuredDishes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDishIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeDishIndex === i ? 'w-8 bg-[#C9A24B]' : 'w-2.5 bg-white/30'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Active Featured Dish Card */}
          <div className="bg-[#1B2A1F] rounded-3xl p-6 sm:p-10 border border-[#7A9F4F]/30 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-2xl">
            <div className="order-2 lg:order-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-[#C9A24B]/20 text-[#C9A24B] border border-[#C9A24B]/30 px-3 py-1 rounded-full text-xs font-bold">
                  ★ {featuredDishes[activeDishIndex].rating} / 5.0 Rating
                </span>
                <span className="bg-[#7A9F4F]/20 text-[#A8D379] px-3 py-1 rounded-full text-xs font-semibold">
                  {featuredDishes[activeDishIndex].category}
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F1E4]">
                {featuredDishes[activeDishIndex].name}
              </h3>
              <p className="text-[#F6F1E4]/80 text-sm sm:text-base leading-relaxed">
                {featuredDishes[activeDishIndex].description}
              </p>
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-bold text-[#C9A24B]">₹{featuredDishes[activeDishIndex].price}</span>
                <span className="text-xs text-stone-400">Pure Veg · Freshly Crafted to Order</span>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => handleAddToCart(featuredDishes[activeDishIndex])}
                  className="bg-[#C8643B] hover:bg-[#B4532E] text-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-md flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Direct Order</span>
                </button>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-white/10 hover:bg-white/20 text-[#F6F1E4] px-6 py-3 rounded-xl font-semibold text-sm transition border border-white/20"
                >
                  Reserve Table to Taste
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2 h-72 sm:h-96 rounded-2xl overflow-hidden relative shadow-lg">
              <img 
                src={featuredDishes[activeDishIndex].image} 
                alt={featuredDishes[activeDishIndex].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. EVENTS & PRIVATE CELEBRATIONS (PRD Requirement 6.6) */}
      <section id="events" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FCFAF5] rounded-3xl border border-[#2F5D3A]/20 p-8 sm:p-14 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8643B]/10 text-[#C8643B] text-xs font-semibold uppercase tracking-wider mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Celebrations & Group Dining</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#23291F] leading-tight">
              Bespoke Banquets, Birthdays & Corporate Gatherings
            </h2>
            <p className="mt-4 text-[#23291F]/80 text-sm sm:text-base leading-relaxed">
              Whether you are hosting an intimate 15-guest family milestone, a baby shower, an anniversary, or a 60-seat corporate gathering, Gaia provides dedicated dining enclosures, customized live-counter menus, high chairs, and valet reception.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-[#23291F]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A9F4F] shrink-0" />
                <span>Indoor air-conditioned private dining suites (up to 40 guests)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A9F4F] shrink-0" />
                <span>Alfresco starlit garden lounge section (up to 60 guests)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A9F4F] shrink-0" />
                <span>Custom curated 4-course & 5-course degustation packages with Jain options</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A9F4F] shrink-0" />
                <span>Acoustically balanced interiors — less noisy for speeches & elder conversations</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-[#2F5D3A] hover:bg-[#1B2A1F] text-white px-6 py-3.5 rounded-xl font-medium text-sm transition shadow-md"
              >
                Enquire For Large Group Event
              </button>
              <a
                href={`tel:${RESTAURANT_INFO.cleanPhone}`}
                className="bg-white border border-[#2F5D3A]/30 text-[#2F5D3A] hover:bg-[#2F5D3A]/5 px-6 py-3.5 rounded-xl font-medium text-sm transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Talk to Event Coordinator</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80" 
              alt="Gaia Private Dining Celebration Suite"
              className="rounded-2xl shadow-xl object-cover h-80 sm:h-96 w-full"
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-stone-200 text-xs hidden sm:block">
              <p className="font-bold text-[#2F5D3A]">✨ Group Capacity: 10 – 80 Guests</p>
              <p className="text-stone-500">Dedicated banquet host & valet</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PHOTO GALLERY & AMBIENCE (PRD Requirement 6.5) */}
      <section id="gallery" className="py-20 bg-[#FCFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#7A9F4F] text-xs font-semibold uppercase tracking-widest block mb-2">Visual Tour</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#23291F]">
              Step Inside the Sanctuary
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base">
              A serene oasis on Outer Ring Road, JP Nagar. Warm oak wood, living greenery, and soft diffused lighting.
            </p>

            {/* Gallery Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {(['All', 'Food', 'Interiors', 'Outdoor', 'Events'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    galleryFilter === cat
                      ? 'bg-[#2F5D3A] text-white'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.filter(img => galleryFilter === 'All' || img.category === galleryFilter).map((img, i) => (
              <div 
                key={i} 
                className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md bg-stone-100"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C9A24B]">{img.category}</span>
                  <h4 className="font-serif text-lg font-bold">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. GUEST REVIEWS & SOCIAL PROOF (PRD Requirement 6.1) */}
      <section id="reviews" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A24B]/20 text-[#856317] text-xs font-bold uppercase tracking-wider mb-2">
            ★ 4.2 Rated on Zomato & Google (1,582+ Reviews)
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#23291F]">
            Loved by Diners Across Bangalore
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Verified words from guests who celebrate milestones, quiet dinners, and family lunches with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map(r => (
            <div 
              key={r.id}
              className="bg-[#FCFAF5] p-6 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#C9A24B]">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {r.tag}
                  </span>
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 mt-6 flex items-center justify-between text-xs">
                <div>
                  <span className="font-serif font-bold text-stone-900 block text-sm">{r.name}</span>
                  <span className="text-stone-500">{r.city}</span>
                </div>
                <span className="text-stone-400">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. AMENITIES, LOCATION, MAP & HOURS (PRD Requirement 6.8) */}
      <section id="location" className="py-20 bg-[#FCFAF5] border-t border-[#2F5D3A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Hours, Contact & Amenities */}
            <div className="space-y-8">
              <div>
                <span className="text-[#C8643B] text-xs font-semibold uppercase tracking-widest block mb-2">Visit Gaia</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#23291F]">
                  Location & Operating Hours
                </h2>
                <p className="mt-2 text-stone-600 text-sm leading-relaxed">
                  Conveniently situated along the bustling Outer Ring Road in JP Nagar Phase 6, featuring easy step-free access and dedicated valet services.
                </p>
              </div>

              {/* Hours Card */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
                <h3 className="font-serif font-bold text-lg text-[#2F5D3A] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#7A9F4F]" />
                  <span>Daily Dining Timings</span>
                </h3>
                <div className="divide-y divide-stone-100 text-sm">
                  <div className="py-2 flex justify-between">
                    <span className="text-stone-600 font-medium">Lunch Service</span>
                    <span className="font-bold text-stone-900">{RESTAURANT_INFO.openingHours.lunch}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-stone-600 font-medium">Dinner Service</span>
                    <span className="font-bold text-stone-900">{RESTAURANT_INFO.openingHours.dinner}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-stone-600 font-medium">Weekend Brunch</span>
                    <span className="font-bold text-[#C8643B]">{RESTAURANT_INFO.openingHours.weekendBrunch}</span>
                  </div>
                </div>
              </div>

              {/* Amenities list */}
              <div>
                <h3 className="font-serif font-bold text-lg text-[#23291F] mb-3">
                  Diner Amenities & Comforts
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {RESTAURANT_INFO.amenities.map(a => (
                    <div key={a.name} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-stone-200 text-stone-700">
                      <span className="w-2 h-2 rounded-full bg-[#7A9F4F]"></span>
                      <span className="font-medium">{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`tel:${RESTAURANT_INFO.cleanPhone}`}
                  className="flex-1 bg-[#2F5D3A] text-white py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#1B2A1F] transition shadow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 70225 98649</span>
                </a>
                <a
                  href="https://maps.google.com/?q=283+Phase+6+KR+Layout+Outer+Ring+Road+JP+Nagar+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white border border-[#2F5D3A]/30 text-[#2F5D3A] py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-stone-50 transition shadow-sm"
                >
                  <MapPin className="w-4 h-4 text-[#C8643B]" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

            {/* Right: Embedded Interactive Map Container */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-md flex flex-col">
              <div className="p-4 bg-[#2F5D3A] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C9A24B]" />
                  <span className="text-xs font-medium">283, Phase 6, KR Layout, Outer Ring Road, JP Nagar</span>
                </div>
                <a
                  href="https://maps.google.com/?q=283+Phase+6+KR+Layout+Outer+Ring+Road+JP+Nagar+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#C9A24B] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map embed iframe */}
              <div className="relative w-full h-[380px] lg:h-full min-h-[350px] bg-stone-200">
                <iframe
                  title="Gaia Restaurant Location Map"
                  src="https://maps.google.com/maps?q=JP%20Nagar%20Outer%20Ring%20Road%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  aria-label="Map showing Gaia restaurant location in JP Nagar"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. NEWSLETTER & OFFERS SUBSCRIPTION (PRD Requirement 6.9) */}
      <section className="bg-[#1B2A1F] text-white py-14 px-4 border-t border-[#7A9F4F]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[#C9A24B] text-xs font-semibold uppercase tracking-widest">Exclusive Privileges</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold">
            Subscribe for Seasonal Tasting Menus & Festive Invitations
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto">
            Receive exclusive invites to our seasonal harvest degustations, chef pop-ups, and special dining offers.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for joining the Gaia Inner Circle! Welcome gift details sent to your phone.");
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
          >
            <input 
              type="text" 
              required
              placeholder="Your WhatsApp Phone (+91 ...)" 
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#7A9F4F] grow"
            />
            <button 
              type="submit"
              className="bg-[#C8643B] hover:bg-[#B4532E] text-white font-semibold px-6 py-3 rounded-xl text-sm transition shadow shrink-0"
            >
              Join Circle
            </button>
          </form>
          <p className="text-[11px] text-stone-500">
            We value your privacy. In compliance with India's Digital Personal Data Protection Act.
          </p>
        </div>
      </section>

      {/* 14. FOOTER (Night Olive surface as per PRD) */}
      <footer className="bg-[#142018] text-[#F6F1E4] py-14 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2F5D3A] text-white flex items-center justify-center font-serif text-xl font-bold">
                G
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                GAIA
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Gaia – Global Vegetarian is JP Nagar’s flagship pure-vegetarian luxury casual dining destination. Celebrating Mother Earth's bounties across five global culinary arts.
            </p>
            <div className="text-xs text-[#C9A24B] font-medium">
              Average Cost: ₹1,300 for two diners
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#about" className="hover:text-white transition">Our Story & Sustainability</a></li>
              <li><a href="#cuisines" className="hover:text-white transition">Pan-Asian, Continental & Pizzas</a></li>
              <li><a href="#menu" className="hover:text-white transition">19-Page Digital Food & Drinks Menu</a></li>
              <li><a href="#events" className="hover:text-white transition">Private Celebrations & Banquets</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Ambience & Terrace Gallery</a></li>
              <li><a href="#reviews" className="hover:text-white transition">Zomato & Google Diner Reviews</a></li>
            </ul>
          </div>

          {/* Col 3: Dietary Transparency */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white mb-4">Dietary Transparency</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>100% Pure Vegetarian Premises</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Dedicated Root-Free Jain Food</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                <span>Dairy-Free Vegan Selections</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span>Sugar-Free & Low-GI Desserts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span>Nut & Gluten Advisory On Request</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Contact */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white mb-4">Restaurant Address</h4>
            <address className="not-italic text-xs text-stone-400 space-y-2 leading-relaxed">
              <p>283, Phase 6, KR Layout, Outer Ring Road, JP Nagar, Bangalore – 560078</p>
              <p>Phone: <a href="tel:+917022598649" className="text-white hover:underline">+91 70225 98649</a></p>
              <p>Valet Reception: Available during all service hours</p>
            </address>

            <div className="mt-4 flex gap-3 text-xs">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-[#C8643B] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-[#B4532E] transition"
              >
                Table Booking
              </button>
              <button 
                onClick={() => setIsOrderOpen(true)}
                className="bg-[#2F5D3A] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-[#1B2A1F] transition"
              >
                Order Direct
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Gaia – Global Vegetarian. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-300">Terms of Dining</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-300">Cancellation Policy</a>
          </div>
        </div>
      </footer>

      {/* Floating Action Button on Mobile */}
      <div className="fixed bottom-4 right-4 z-40 sm:hidden flex flex-col gap-2">
        <button
          onClick={() => setIsBookingOpen(true)}
          className="bg-[#C8643B] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center border-2 border-white"
          aria-label="Book a table"
        >
          <Calendar className="w-6 h-6" />
        </button>
      </div>

      {/* Modals */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />

      <OrderModal 
        isOpen={isOrderOpen} 
        onClose={() => setIsOrderOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}

export default App;
