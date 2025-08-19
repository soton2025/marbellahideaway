'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Instagram, 
  Camera, 
  Heart,
  MessageCircle,
  Share2,
  ZoomIn
} from 'lucide-react'
import { TikTokIcon } from '@/components/icons/tiktok'
import { getInstagramContent } from '@/lib/instagram'
import { InstagramMedia } from '@/types/instagram'
import { cn } from '@/lib/utils'

interface GalleryItem {
  id: string
  type: 'professional' | 'instagram'
  src: string
  alt: string
  caption?: string
  category: 'villa' | 'pool' | 'bedroom' | 'dining' | 'exterior' | 'amenities'
  aspectRatio: 'square' | 'portrait' | 'landscape'
  instagramData?: InstagramMedia
}

const professionalPhotos: Omit<GalleryItem, 'type'>[] = [
  {
    id: 'pool-lounging-area',
    src: '/images/gallery/pool-area-loungers.jpg',
    alt: 'Pool area with luxury sun loungers and umbrellas',
    caption: 'Premium sun loungers for the perfect poolside relaxation',
    category: 'pool',
    aspectRatio: 'landscape'
  },
  {
    id: 'villa-exterior-terraces',
    src: '/images/gallery/villa-exterior-terraces.jpg',
    alt: 'Villa exterior showcasing multiple terrace levels',
    caption: 'Mediterranean architecture with cascading terrace levels',
    category: 'exterior',
    aspectRatio: 'landscape'
  },
  {
    id: 'outdoor-dining-setup',
    src: '/images/gallery/outdoor-dining-setup.jpg',
    alt: 'Elegant outdoor dining setup',
    caption: 'Al fresco dining perfection under the Andalusian sky',
    category: 'dining',
    aspectRatio: 'landscape'
  },
  {
    id: 'gourmet-kitchen',
    src: '/images/gallery/kitchen-interior.jpg',
    alt: 'Fully equipped gourmet kitchen',
    caption: 'Gourmet kitchen with everything you need for culinary adventures',
    category: 'amenities',
    aspectRatio: 'landscape'
  },
  {
    id: 'living-area',
    src: '/images/gallery/living-area-interior.jpg',
    alt: 'Comfortable living area with modern furnishings',
    caption: 'Elegant living spaces designed for relaxation and socializing',
    category: 'amenities',
    aspectRatio: 'portrait'
  },
  {
    id: 'villa-entrance',
    src: '/images/gallery/villa-entrance-facade.jpg',
    alt: 'Villa entrance and facade',
    caption: 'Welcome to your private Marbella hideaway',
    category: 'exterior',
    aspectRatio: 'square'
  },
  {
    id: 'main-living-room',
    src: '/images/gallery/main-living-room.jpg',
    alt: 'Main living room with exposed wooden beams and fireplace',
    caption: 'Spectacular living room with exposed beams, fireplace, and marble floors',
    category: 'amenities',
    aspectRatio: 'landscape'
  },
  {
    id: 'covered-terrace-service',
    src: '/images/gallery/covered-terrace-champagne.jpg',
    alt: 'Covered terrace with premium champagne service',
    caption: 'Premium champagne service on our elegant covered terrace',
    category: 'dining',
    aspectRatio: 'square'
  }
]

interface LightboxProps {
  items: GalleryItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

function Lightbox({ items, currentIndex, isOpen, onClose, onNext, onPrev }: LightboxProps) {
  const currentItem = items[currentIndex]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowRight':
          onNext()
          break
        case 'ArrowLeft':
          onPrev()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen || !currentItem) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-60 text-white hover:text-white/70 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Navigation */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-60 text-white hover:text-white/70 transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-60 text-white hover:text-white/70 transition-colors"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Content */}
        <div className="h-full flex items-center justify-center p-6" onClick={(e) => e.stopPropagation()}>
          <div className="max-w-6xl w-full">
            <motion.img
              key={currentItem.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={currentItem.src}
              alt={currentItem.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {/* Info Bar */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex items-center justify-between"
            >
              <div>
                <p className="text-white text-lg mb-2">{currentItem.caption}</p>
                <div className="flex items-center space-x-4 text-sm text-white/70">
                  <div className="flex items-center space-x-1">
                    {currentItem.type === 'instagram' ? (
                      <Instagram className="w-4 h-4" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                    <span className="capitalize">{currentItem.type}</span>
                  </div>
                  <div className="capitalize">{currentItem.category}</div>
                </div>
              </div>

              {currentItem.type === 'instagram' && currentItem.instagramData && (
                <div className="flex items-center space-x-4 text-white/70">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>142</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>23</span>
                  </div>
                  <button className="hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Counter */}
            <div className="text-center mt-4 text-white/50 text-sm">
              {currentIndex + 1} of {items.length}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

interface GalleryProps {
  showInstagramContent?: boolean
}

export function Gallery({ showInstagramContent = true }: GalleryProps) {
  const [allItems, setAllItems] = useState<GalleryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: "-100px" })

  const categories = [
    { id: 'all', label: 'All', icon: Camera },
    { id: 'villa', label: 'Villa', icon: Camera },
    { id: 'pool', label: 'Pool', icon: Camera },
    { id: 'bedroom', label: 'Bedrooms', icon: Camera },
    { id: 'dining', label: 'Dining', icon: Camera },
    { id: 'amenities', label: 'Amenities', icon: Camera },
  ]

  useEffect(() => {
    const loadContent = async () => {
      // Prepare professional photos
      const professionalItems: GalleryItem[] = professionalPhotos.map(photo => ({
        ...photo,
        type: 'professional'
      }))

      // Load Instagram content if enabled
      let instagramItems: GalleryItem[] = []
      if (showInstagramContent) {
        try {
          const media = await getInstagramContent(true)
          
          instagramItems = media.map((item, index) => ({
            id: `instagram-${item.id}`,
            type: 'instagram' as const,
            src: item.media_url,
            alt: item.caption || `Instagram post ${index + 1}`,
            caption: item.caption,
            category: 'villa' as const, // Default category for Instagram posts
            aspectRatio: 'square' as const,
            instagramData: item
          }))
        } catch (error) {
          console.error('Failed to load Instagram content:', error)
        }
      }

      // Combine and shuffle for organic look
      const combined = [...professionalItems, ...instagramItems]
      const shuffled = combined.sort(() => Math.random() - 0.5)
      
      setAllItems(shuffled)
      setFilteredItems(shuffled)
    }

    loadContent()
  }, [showInstagramContent])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(allItems)
    } else {
      setFilteredItems(allItems.filter(item => item.category === selectedCategory))
    }
  }, [selectedCategory, allItems])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  const getGridItemClass = (aspectRatio: string) => {
    const baseClass = "relative group cursor-pointer overflow-hidden rounded-xl"
    
    switch (aspectRatio) {
      case 'portrait':
        return `${baseClass} row-span-2`
      case 'landscape':
        return `${baseClass} col-span-2`
      case 'square':
      default:
        return baseClass
    }
  }

  return (
    <section id="gallery" ref={sectionRef} className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-6xl font-canela text-charcoal mb-6"
          >
            Villa
            <span className="block text-orange-400 italic">Gallery</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-warm-gray max-w-2xl mx-auto mb-8"
          >
            Experience the beauty of our luxury villa through stunning photography
            showcasing every detail of your perfect hideaway.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300",
                selectedCategory === category.id
                  ? "bg-orange-600 text-white shadow-medium"
                  : "bg-sand text-warm-gray hover:bg-sand-dark"
              )}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={getGridItemClass(item.aspectRatio)}
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <div class="text-center">
                          <div class="text-2xl mb-2">🏖️</div>
                          <div class="text-sm font-medium">Villa Image</div>
                          <div class="text-xs opacity-70">Loading...</div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>

                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1",
                    item.type === 'instagram' 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                      : "bg-black/50 text-white"
                  )}>
                    {item.type === 'instagram' ? (
                      <Instagram className="w-3 h-3" />
                    ) : (
                      <Camera className="w-3 h-3" />
                    )}
                    <span className="capitalize">{item.type}</span>
                  </div>
                </div>

                {/* Caption */}
                {item.caption && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm line-clamp-2 bg-black/50 rounded p-2">
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Media Embeds */}
        {showInstagramContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-canela text-charcoal mb-4">Follow Our Journey</h3>
              <p className="text-warm-gray">See real moments from our guests and get inspired for your stay</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Instagram Embed */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="flex items-center mb-4">
                  <Instagram className="w-6 h-6 text-orange-600 mr-2" />
                  <h4 className="text-lg font-medium text-charcoal">Instagram Feed</h4>
                </div>
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-gray-500">
                    <Instagram className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Latest Instagram Posts</p>
                    <p className="text-xs">74K followers @marbellahideaway</p>
                  </div>
                </div>
                <motion.a
                  href="https://instagram.com/marbellahideaway"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-medium text-center block transition-transform"
                >
                  View on Instagram
                </motion.a>
              </div>

              {/* TikTok Embed */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="flex items-center mb-4">
                  <TikTokIcon className="w-6 h-6 text-black mr-2" />
                  <h4 className="text-lg font-medium text-charcoal">TikTok Videos</h4>
                </div>
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-gray-500">
                    <TikTokIcon className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Villa Tour Videos</p>
                    <p className="text-xs">@marbellahideaway</p>
                  </div>
                </div>
                <motion.a
                  href="https://www.tiktok.com/@marbellahideaway"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="w-full bg-black text-white py-3 px-4 rounded-xl font-medium text-center block transition-transform"
                >
                  Watch on TikTok
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  )
}