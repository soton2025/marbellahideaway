export interface Review {
  id: string
  name: string
  location: string
  avatar?: string
  rating: number
  date: string
  review: string
  highlight?: string
  instagramHandle?: string
  instagramPostId?: string
  images?: string[]
  verified: boolean
  source: 'tripadvisor' | 'google' | 'airbnb' | 'instagram' | 'tiktok' | 'direct'
  stayDuration: string
  roomType?: string
  travelType: 'family' | 'couple' | 'friends' | 'business' | 'solo'
}

export const reviews: Review[] = [
  {
    id: 'review-1',
    name: 'Sophie & James',
    location: 'London, UK',
    avatar: '/images/avatars/sophie-james.jpg',
    rating: 5,
    date: '2024-01-15',
    review: 'Absolutely stunning villa! The lagoon pool is exactly as magical as in the photos. Simon was incredibly welcoming with prosecco on arrival and the housekeeper had everything perfectly prepared. The master suite has the most breathtaking sea views and the bathroom is pure luxury. We\'ll definitely be back!',
    highlight: 'The lagoon pool is exactly as magical as in the photos',
    verified: true,
    source: 'tripadvisor',
    stayDuration: '7 nights',
    roomType: 'Master Suite',
    travelType: 'couple',
    images: ['/images/reviews/sophie-james-pool.jpg', '/images/reviews/sophie-james-sunset.jpg']
  },
  {
    id: 'review-2',
    name: 'Maria Rodriguez',
    location: 'Madrid, Spain',
    avatar: '/images/avatars/maria-rodriguez.jpg',
    rating: 5,
    date: '2024-01-08',
    review: 'Una experiencia increíble! The bohemian design is so authentic and the terracotta terraces are perfect for morning coffee. Being just 5 minutes from Puerto Banús but feeling completely private was exactly what we needed. The kitchen has everything you could possibly want.',
    highlight: 'Being just 5 minutes from Puerto Banús but feeling completely private',
    instagramHandle: '@maria_travels_spain',
    instagramPostId: 'mock-instagram-1',
    verified: true,
    source: 'instagram',
    stayDuration: '4 nights',
    roomType: 'Terracotta Suite',
    travelType: 'family',
    images: ['/images/reviews/maria-terrace.jpg']
  },
  {
    id: 'review-3',
    name: 'David & Emily Chen',
    location: 'San Francisco, USA',
    avatar: '/images/avatars/david-emily-chen.jpg',
    rating: 5,
    date: '2024-01-02',
    review: 'This place exceeded all expectations. We stayed in the Bohemian Loft and loved the exposed beams and rooftop access. The whole property feels like a private resort. White Company linens were a lovely touch and the concierge service was impeccable. Already planning our next visit!',
    highlight: 'The whole property feels like a private resort',
    verified: true,
    source: 'airbnb',
    stayDuration: '5 nights',
    roomType: 'Bohemian Loft',
    travelType: 'couple'
  },
  {
    id: 'review-4',
    name: 'Alessandro Fontana',
    location: 'Milan, Italy',
    avatar: '/images/avatars/alessandro-fontana.jpg',
    rating: 5,
    date: '2023-12-28',
    review: 'Perfect location on the Golden Mile. We could walk to restaurants and the beach, but the villa itself is so beautiful we didn\'t want to leave! The Lagoon Room with direct pool access was amazing for our morning swims. Simon\'s recommendations for local spots were spot on.',
    highlight: 'The villa itself is so beautiful we didn\'t want to leave!',
    instagramHandle: '@alessandro_lifestyle',
    instagramPostId: 'mock-instagram-2',
    verified: true,
    source: 'instagram',
    stayDuration: '6 nights',
    roomType: 'Lagoon Room',
    travelType: 'friends',
    images: ['/images/reviews/alessandro-pool.jpg', '/images/reviews/alessandro-friends.jpg']
  },
  {
    id: 'review-5',
    name: 'Rachel Thompson',
    location: 'Sydney, Australia',
    avatar: '/images/avatars/rachel-thompson.jpg',
    rating: 5,
    date: '2023-12-20',
    review: 'Travelled here for a girlfriend\'s getaway and it was absolutely perfect. The Sand Dune Room was so peaceful and the photography opportunities around the property are endless. We spent hours by the pool with the incredible reflections at sunset. Highly recommend!',
    highlight: 'The photography opportunities around the property are endless',
    verified: true,
    source: 'google',
    stayDuration: '3 nights',
    roomType: 'Sand Dune Room',
    travelType: 'friends'
  },
  {
    id: 'review-6',
    name: 'Thomas & Helena Johansson',
    location: 'Stockholm, Sweden',
    avatar: '/images/avatars/thomas-helena.jpg',
    rating: 5,
    date: '2023-12-15',
    review: 'Our honeymoon at Marbella Hideaway was a dream come true. The Olive Grove Room surrounded by ancient olive trees was so romantic. The attention to detail everywhere is incredible - from the handmade ceramics to the luxury toiletries. Thank you for making our stay unforgettable!',
    highlight: 'Our honeymoon at Marbella Hideaway was a dream come true',
    verified: true,
    source: 'direct',
    stayDuration: '10 nights',
    roomType: 'Olive Grove Room',
    travelType: 'couple'
  },
  {
    id: 'review-7',
    name: 'Lucia Fernández',
    location: 'Barcelona, Spain',
    avatar: '/images/avatars/lucia-fernandez.jpg',
    rating: 5,
    date: '2023-12-10',
    review: '¡Increíble! Made a TikTok about the lagoon pool and it went viral - the place is even more stunning in person. The bohemian vibes are exactly what I was looking for. Perfect for content creation and relaxation. The terracotta terraces are pure magic at golden hour!',
    highlight: 'The place is even more stunning in person',
    instagramHandle: '@lucia_travels',
    verified: true,
    source: 'tiktok',
    stayDuration: '4 nights',
    roomType: 'Lagoon Room',
    travelType: 'solo',
    images: ['/images/reviews/lucia-tiktok-pool.jpg', '/images/reviews/lucia-golden-hour.jpg']
  }
]

export const reviewStats = {
  averageRating: 5.0,
  totalReviews: 152,
  ratingBreakdown: {
    5: 147,
    4: 5,
    3: 0,
    2: 0,
    1: 0
  },
  sourceBreakdown: {
    tripadvisor: 65,
    google: 38,
    airbnb: 24,
    instagram: 15,
    tiktok: 5,
    direct: 5
  }
}