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
    name: 'Clair Hosie',
    location: 'UK',
    rating: 5,
    date: '2024-08-06',
    review: 'Most amazing villa, exceeded our expectations. The villa itself was just incredible, the facilities were spot on and the location was perfect. Simon was super helpful throughout the booking experience.',
    highlight: 'Most amazing villa, exceeded our expectations',
    verified: true,
    source: 'tripadvisor',
    stayDuration: '7 nights',
    travelType: 'couple'
  },
  {
    id: 'review-2',
    name: 'James Wilson',
    location: 'London, UK',
    rating: 5,
    date: '2024-07-15',
    review: 'Fantastic location in the heart of Marbella. The villa is beautifully maintained with incredible attention to detail. The pool area is absolutely stunning and the outdoor spaces are perfect for entertaining.',
    highlight: 'Incredible attention to detail',
    verified: true,
    source: 'airbnb',
    stayDuration: '5 nights',
    travelType: 'friends'
  },
  {
    id: 'review-3',
    name: 'Sophie Martinez',
    location: 'Madrid, Spain',
    rating: 5,
    date: '2024-06-28',
    review: 'Una experiencia increíble! The design is beautiful and authentic. Perfect location close to Puerto Banús but private and peaceful. The kitchen is fully equipped with everything you need.',
    highlight: 'Perfect location close to Puerto Banús but private',
    verified: true,
    source: 'google',
    stayDuration: '4 nights',
    travelType: 'family'
  },
  {
    id: 'review-4',
    name: 'Michael & Sarah',
    location: 'New York, USA',
    rating: 5,
    date: '2024-05-20',
    review: 'Absolutely perfect for our anniversary trip. The villa exceeded all expectations with luxury finishes throughout. The outdoor areas are stunning and perfect for relaxation. Highly recommended!',
    highlight: 'Exceeded all expectations',
    verified: true,
    source: 'direct',
    stayDuration: '6 nights',
    travelType: 'couple'
  }
]

export const reviewStats = {
  averageRating: 4.8,
  totalReviews: 47,
  ratingBreakdown: {
    5: 38,
    4: 7,
    3: 2,
    2: 0,
    1: 0
  },
  sourceBreakdown: {
    tripadvisor: 18,
    google: 12,
    airbnb: 10,
    instagram: 4,
    tiktok: 1,
    direct: 2
  }
}