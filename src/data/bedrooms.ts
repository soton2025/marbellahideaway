export interface Bedroom {
  id: string
  name: string
  description: string
  features: string[]
  images: string[]
  instagramPostId?: string
  size: string
  bedType: string
  view: string
  amenities: string[]
}

export const bedrooms: Bedroom[] = [
  {
    id: 'master-suite',
    name: 'Master Suite',
    description: 'Our crown jewel featuring panoramic views of the Mediterranean coastline through floor-to-ceiling windows. The ensuite bathroom boasts a freestanding bathtub perfect for sunset soaks.',
    size: '45m²',
    bedType: 'King Size Bed',
    view: 'Mediterranean Sea & Gardens',
    features: [
      'Private terrace with sea views',
      'Walk-in wardrobe',
      'Ensuite with freestanding bath',
      'Air conditioning',
      'Smart TV'
    ],
    amenities: [
      'Egyptian cotton linens',
      'Pillow menu',
      'Nespresso machine',
      'Mini bar',
      'Safe',
      'Bathrobe & slippers'
    ],
    images: [
      '/images/gallery/bedroom-master-suite.jpg',
      '/images/gallery/bedroom-terrace-view.jpg',
      '/images/bedrooms/master-suite-bath.jpg'
    ],
    instagramPostId: '1'
  },
  {
    id: 'lagoon-room',
    name: 'Lagoon Room',
    description: 'Overlooking our signature lagoon pool, this room captures the essence of tranquil waters with its soothing lagoon teal accents and natural textures.',
    size: '35m²',
    bedType: 'King Size Bed',
    view: 'Lagoon Pool & Gardens',
    features: [
      'Direct pool access',
      'Private patio',
      'Ensuite bathroom',
      'Air conditioning',
      'Smart TV'
    ],
    amenities: [
      'Premium bedding',
      'Aromatherapy diffuser',
      'Coffee station',
      'Pool towels',
      'Safe',
      'Hair dryer'
    ],
    images: [
      '/images/bedrooms/lagoon-room-1.jpg',
      '/images/bedrooms/lagoon-room-2.jpg',
      '/images/bedrooms/lagoon-room-patio.jpg'
    ],
    instagramPostId: '2'
  },
  {
    id: 'terracotta-suite',
    name: 'Terracotta Suite',
    description: 'Embracing warm earth tones and handcrafted furnishings, this suite reflects the bohemian spirit of Andalusian craftsmanship with modern luxury.',
    size: '40m²',
    bedType: 'King Size Bed',
    view: 'Garden Courtyard',
    features: [
      'Private courtyard',
      'Artisan tile work',
      'Ensuite with rain shower',
      'Air conditioning',
      'Smart TV'
    ],
    amenities: [
      'Organic cotton linens',
      'Handmade ceramics',
      'Tea selection',
      'Yoga mat',
      'Safe',
      'Luxury toiletries'
    ],
    images: [
      '/images/gallery/bedroom-terracotta-suite.jpg',
      '/images/gallery/bedroom-bohemian-loft.jpg',
      '/images/bedrooms/terracotta-courtyard.jpg'
    ],
    instagramPostId: '3'
  },
  {
    id: 'olive-grove-room',
    name: 'Olive Grove Room',
    description: 'Nestled among century-old olive trees, this peaceful retreat offers a connection to nature with its earthy olive green palette and garden views.',
    size: '32m²',
    bedType: 'Queen Size Bed',
    view: 'Olive Grove & Mountains',
    features: [
      'Garden level access',
      'Natural stone accents',
      'Ensuite bathroom',
      'Air conditioning',
      'Smart TV'
    ],
    amenities: [
      'Bamboo fiber bedding',
      'Essential oils',
      'Herbal tea collection',
      'Reading nook',
      'Safe',
      'Eco-friendly amenities'
    ],
    images: [
      '/images/bedrooms/olive-grove-1.jpg',
      '/images/bedrooms/olive-grove-2.jpg',
      '/images/bedrooms/olive-grove-garden.jpg'
    ],
    instagramPostId: '4'
  },
  {
    id: 'sand-dune-room',
    name: 'Sand Dune Room',
    description: 'Inspired by the golden beaches of Marbella, this light-filled room features sandy tones and textures that evoke the nearby Mediterranean shores.',
    size: '30m²',
    bedType: 'Queen Size Bed',
    view: 'Garden & Partial Sea View',
    features: [
      'Juliet balcony',
      'Textured wall treatments',
      'Ensuite bathroom',
      'Air conditioning',
      'Smart TV'
    ],
    amenities: [
      'Hypoallergenic bedding',
      'Beach-themed decor',
      'Coffee & tea facilities',
      'Beach bag',
      'Safe',
      'Seaside-inspired toiletries'
    ],
    images: [
      '/images/bedrooms/sand-dune-1.jpg',
      '/images/bedrooms/sand-dune-2.jpg',
      '/images/bedrooms/sand-dune-balcony.jpg'
    ]
  },
  {
    id: 'bohemian-loft',
    name: 'Bohemian Loft',
    description: 'Our unique loft space combines rustic wooden beams with contemporary comfort, creating an artistic sanctuary under the Andalusian sky.',
    size: '38m²',
    bedType: 'King Size Bed',
    view: 'Rooftop Terrace & Mountains',
    features: [
      'Exposed wooden beams',
      'Private rooftop access',
      'Ensuite bathroom',
      'Air conditioning',
      'Smart TV'
    ],
    amenities: [
      'Artisan textiles',
      'Meditation cushions',
      'Specialty coffee',
      'Art supplies',
      'Safe',
      'Boho-chic amenities'
    ],
    images: [
      '/images/gallery/bedroom-spa-suite.jpg',
      '/images/bedrooms/bohemian-loft-2.jpg',
      '/images/bedrooms/bohemian-loft-terrace.jpg'
    ]
  }
]