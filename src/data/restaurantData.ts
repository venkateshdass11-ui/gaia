export interface MenuItem {
  id: string;
  name: string;
  category: 'Starters' | 'Mains' | 'Pizzas' | 'Asian' | 'Chinese' | 'Continental' | 'Desserts' | 'Beverages';
  description: string;
  price: number;
  image: string;
  tags: ('Vegan' | 'Jain' | 'Sugar-Free' | 'Gluten-Free' | 'Spicy' | "Chef's Special")[];
  featured?: boolean;
  rating?: number;
}

export const RESTAURANT_INFO = {
  name: "Gaia – Global Vegetarian",
  tagline: "Pure Vegetarian · Worldly Flavours · Rooted in Nature",
  address: "283, Phase 6, KR Layout, Outer Ring Road, JP Nagar, Bangalore",
  phone: "+91 70225 98649",
  cleanPhone: "+917022598649",
  whatsapp: "https://wa.me/917022598649?text=Hello%20Gaia,%20I%20would%20like%20to%20enquire%20about%20a%20table%20reservation",
  avgCost: "₹1,300 for two",
  rating: 4.2,
  ratingCount: 1582,
  openingHours: {
    lunch: "12:00 PM – 3:30 PM",
    dinner: "7:00 PM – 11:00 PM",
    weekendBrunch: "Saturday & Sunday: 11:30 AM – 4:00 PM"
  },
  amenities: [
    { name: "Valet & Free Parking", icon: "Car" },
    { name: "Wheelchair Accessible", icon: "Accessibility" },
    { name: "Step-free Entry", icon: "DoorOpen" },
    { name: "Indoor & Alfresco Dining", icon: "TreePine" },
    { name: "High Chairs Available", icon: "Baby" },
    { name: "High-Speed Wi-Fi", icon: "Wifi" },
    { name: "Dedicated Smoking Lounge", icon: "Cigarette" },
    { name: "Acoustically Treated / Less Noisy", icon: "Volume2" },
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "g1",
    name: "Truffle Edamame & Water Chestnut Dimsum",
    category: "Asian",
    description: "Translucent crystal dumplings infused with black truffle oil and crushed roasted chestnuts.",
    price: 495,
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegan", "Chef's Special"],
    featured: true,
    rating: 4.9
  },
  {
    id: "g2",
    name: "Smoked Paneer Pasanda Roulade",
    category: "Mains",
    description: "Handcrafted cottage cheese rolled with spiced pistachio-apricot mousse, simmered in velvety saffron shahi gravy.",
    price: 545,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    tags: ["Jain", "Chef's Special"],
    featured: true,
    rating: 4.8
  },
  {
    id: "g3",
    name: "Wild Forest Mushroom & Truffle Woodfire Pizza",
    category: "Pizzas",
    description: "48-hr fermented Neapolitan sourdough crust, porcini cream, fiordilatte mozzarella, thyme, and white truffle glaze.",
    price: 645,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    tags: ["Chef's Special"],
    featured: true,
    rating: 4.9
  },
  {
    id: "g4",
    name: "Avocado & Crisp Quinoa Tartare",
    category: "Starters",
    description: "Hass avocado ribbons tossed with Peruvian lime ponzu, popped red quinoa, lotus chips, and herb oil.",
    price: 465,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegan", "Gluten-Free"],
    featured: true,
    rating: 4.7
  },
  {
    id: "g5",
    name: "Subz Dum Biryani Awadhi Handi",
    category: "Mains",
    description: "Aromatic aged Dehradun basmati rice sealed with clay and whole spices, seasonal root vegetables, mint raita.",
    price: 485,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    tags: ["Jain", "Gluten-Free"],
    featured: true,
    rating: 4.8
  },
  {
    id: "g6",
    name: "Burrata & Heritage Tomato Carpaccio",
    category: "Continental",
    description: "Artisanal buffalo burrata, heirloom garden tomatoes, aged balsamic reduction, pine nut crumble, basil foam.",
    price: 525,
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22521?auto=format&fit=crop&w=800&q=80",
    tags: ["Gluten-Free"],
    featured: false,
    rating: 4.6
  },
  {
    id: "g7",
    name: "Crispy Lotus Stem in Honey Chilli Sichuan",
    category: "Chinese",
    description: "Flash-fried lotus roots glazed with sweet chilli reduction, scallions, roasted sesame seeds.",
    price: 425,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegan", "Spicy"],
    featured: false,
    rating: 4.5
  },
  {
    id: "g8",
    name: "Khao Soi Chiang Mai Curry Bowl",
    category: "Asian",
    description: "Fragrant coconut-turmeric broth with yellow noodles, silken tofu, fresh coriander, crisp shallots, lime wedges.",
    price: 515,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegan", "Spicy"],
    featured: false,
    rating: 4.7
  },
  {
    id: "g9",
    name: "Charred Broccoli & Almond Galouti",
    category: "Starters",
    description: "Melt-in-mouth smoked broccoli kebabs perfumed with cardamom and rose petals, served on mini saffron warqi parathas.",
    price: 445,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    tags: ["Chef's Special"],
    featured: false,
    rating: 4.8
  },
  {
    id: "g10",
    name: "Valrhona Dark Chocolate Ganache Tart",
    category: "Desserts",
    description: "70% single-origin dark chocolate, coconut butter crust, salted caramel drizzle, berry compote.",
    price: 395,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    tags: ["Sugar-Free", "Vegan"],
    featured: true,
    rating: 4.9
  },
  {
    id: "g11",
    name: "Kashmiri Kahwa & Saffron Infusion",
    category: "Beverages",
    description: "Green tea simmered with whole cinnamon, green cardamom pods, Kashmiri saffron strands, and crushed almonds.",
    price: 245,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegan", "Sugar-Free"],
    featured: false,
    rating: 4.7
  },
  {
    id: "g12",
    name: "Kokum & Basil Sparkling Cooler",
    category: "Beverages",
    description: "Handcrafted Malabar wild kokum elixir shaken with crushed basil, pink Himalayan salt, and sparkling soda.",
    price: 265,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegan", "Gluten-Free"],
    featured: false,
    rating: 4.8
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Ananya Deshmukh",
    city: "JP Nagar, Bengaluru",
    rating: 5,
    date: "2 days ago",
    comment: "Gaia is in a league of its own for pure vegetarian dining in South Bangalore. The Truffle Edamame Dimsum and Paneer Roulade were world-class! Super clean ambience and very courteous staff.",
    tag: "Verified Diner"
  },
  {
    id: 2,
    name: "Dr. Vikramaditya Rao",
    city: "Jayanagar",
    rating: 5,
    date: "1 week ago",
    comment: "Finding exquisite Jain culinary options that don't compromise on fine dining aesthetics is rare. Gaia excels effortlessly. Valet parking on Outer Ring Road was quick and smooth.",
    tag: "Family Gathering"
  },
  {
    id: 3,
    name: "Meera & Rohan Sen",
    city: "Bannerghatta Road",
    rating: 5,
    date: "2 weeks ago",
    comment: "Celebrated our 10th anniversary in their outdoor green terrace. The Woodfire Pizza and Dark Chocolate Tart were sublime. We no longer need to depend on delivery apps!",
    tag: "Anniversary Dinner"
  }
];

export const GALLERY_IMAGES = [
  {
    category: "Food",
    title: "Artisanal Woodfired Pizza",
    url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
  },
  {
    category: "Interiors",
    title: "Warm Botanical Dining Room",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
  },
  {
    category: "Food",
    title: "Handcrafted Truffle Dimsums",
    url: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=80"
  },
  {
    category: "Outdoor",
    title: "Alfresco Garden Terrace",
    url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80"
  },
  {
    category: "Interiors",
    title: "Warm Oak & Terracotta Seating",
    url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
  },
  {
    category: "Events",
    title: "Private Celebration Suite",
    url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80"
  }
];
