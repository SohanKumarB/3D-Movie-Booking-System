export const INITIAL_MOVIES = [
  {
    id: 1,
    title: "Avengers: Secret Wars",
    synopsis: "The multiversal saga reaches its epic climax as heroes from every reality unite to save the universe from complete collapse.",
    genre: "Sci-Fi / Action",
    durationMinutes: 182,
    rating: 4.9,
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    ageRating: "PG-13",
    status: "NOW_SHOWING",
    is3dAvailable: true,
    director: "Russo Brothers",
    cast: ["Robert Downey Jr.", "Benedict Cumberbatch", "Hugh Jackman"]
  },
  {
    id: 2,
    title: "The Batman II: Dark Knight Reborn",
    synopsis: "In the flooded ruins of Gotham, Bruce Wayne descends deeper into the city's shadows to confront a terrifying new criminal mastermind.",
    genre: "Action / Mystery",
    durationMinutes: 175,
    rating: 4.8,
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/mqqft2x_Aa4",
    ageRating: "PG-13",
    status: "NOW_SHOWING",
    is3dAvailable: true,
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Colin Farrell"]
  },
  {
    id: 3,
    title: "Interstellar: Beyond Singularity",
    synopsis: "A decade after humanity's salvation, a mysterious sub-space signal pulls a crew of deep space explorers beyond the event horizon.",
    genre: "Sci-Fi / Adventure",
    durationMinutes: 169,
    rating: 5.0,
    posterUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
    ageRating: "PG-13",
    status: "NOW_SHOWING",
    is3dAvailable: true,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
  },
  {
    id: 4,
    title: "Avatar 3: Fire and Ash",
    synopsis: "Jake Sully and Neytiri encounter the Ash People, a fierce volcanic Na'vi clan, threatening the fragile peace of Pandora.",
    genre: "Sci-Fi / Fantasy",
    durationMinutes: 190,
    rating: 4.9,
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/d9MyW72ELq0",
    ageRating: "PG-13",
    status: "NOW_SHOWING",
    is3dAvailable: true,
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldaña", "Sigourney Weaver"]
  },
  {
    id: 5,
    title: "Cyberpunk 2077: Neon Redemption",
    synopsis: "In Night City, a rogue mercenary uncovers a corporate conspiracy that threatens to rewrite human consciousness.",
    genre: "Sci-Fi / Cyberpunk",
    durationMinutes: 142,
    rating: 4.7,
    posterUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/8X2kIfS6fb8",
    ageRating: "R",
    status: "COMING_SOON",
    is3dAvailable: true,
    director: "Keanu Reeves",
    cast: ["Keanu Reeves", "Idris Elba", "Ana de Armas"]
  },
  {
    id: 6,
    title: "Dune: Messiah",
    synopsis: "Paul Atreides faces the galactic consequences of his rise to Emperor as conspiracies brew within his own court.",
    genre: "Sci-Fi / Drama",
    durationMinutes: 165,
    rating: 4.9,
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/embed/Way9Dexny3w",
    ageRating: "PG-13",
    status: "COMING_SOON",
    is3dAvailable: true,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Florence Pugh"]
  }
];

export const INITIAL_THEATERS = [
  {
    id: 101,
    name: "MovieVerse Grand IMAX 3D",
    city: "New York",
    address: "7th Avenue, Times Square",
    screenType: "IMAX Laser 3D + 12-Channel Audio",
    vipPrice: 24.99,
    standardPrice: 16.99
  },
  {
    id: 102,
    name: "MovieVerse Dolby Cyberdome",
    city: "Los Angeles",
    address: "Sunset Blvd, Hollywood",
    screenType: "Dolby Cinema 3D Atmos",
    vipPrice: 26.99,
    standardPrice: 18.99
  },
  {
    id: 103,
    name: "MovieVerse Neosphere 4DX",
    city: "Tokyo",
    address: "Shibuya Crossing Tower",
    screenType: "4DX Motion & Haptics 3D",
    vipPrice: 28.99,
    standardPrice: 19.99
  },
  {
    id: 104,
    name: "MovieVerse Premiere Lounge",
    city: "London",
    address: "Leicester Square",
    screenType: "Laser VIP Recliner 3D",
    vipPrice: 29.99,
    standardPrice: 21.99
  }
];

export const SHOWTIMES = [
  { id: 201, time: "11:30 AM", format: "3D IMAX" },
  { id: 202, time: "02:45 PM", format: "3D Dolby" },
  { id: 203, time: "06:15 PM", format: "3D IMAX Prime" },
  { id: 204, time: "09:30 PM", format: "3D Midnight Luxe" },
  { id: 205, time: "11:45 PM", format: "3D Night Owl" }
];

export const FOOD_ITEMS = [
  {
    id: 'food_1',
    name: 'Jumbo Neon Popcorn Bucket',
    category: 'Popcorn',
    price: 8.99,
    description: 'Hot buttered popcorn in a glowing collectible MovieVerse bucket',
    image: '🍿',
    modelType: 'popcorn',
    calories: '450 kcal'
  },
  {
    id: 'food_2',
    name: 'Cyber Cola Zero (Large)',
    category: 'Drinks',
    price: 5.49,
    description: 'Chilled carbonated beverage with custom 3D straw & ice',
    image: '🥤',
    modelType: 'drink',
    calories: '0 kcal'
  },
  {
    id: 'food_3',
    name: 'Gourmet Double Cheeseburger',
    category: 'Hot Food',
    price: 11.99,
    description: 'Angus beef patty, smoked cheddar, brioche bun & secret sauce',
    image: '🍔',
    modelType: 'burger',
    calories: '720 kcal'
  },
  {
    id: 'food_4',
    name: 'Artisan Pepperoni Slice',
    category: 'Hot Food',
    price: 7.99,
    description: 'Crispy stone-baked pizza slice with mozzarella cheese',
    image: '🍕',
    modelType: 'pizza',
    calories: '510 kcal'
  }
];
