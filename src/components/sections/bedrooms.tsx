'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Maximize2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Instagram
} from 'lucide-react'
import { bedrooms, Bedroom } from '@/data/bedrooms'
import { cn } from '@/lib/utils'

interface BedroomCardProps {
  bedroom: Bedroom
  index: number
  onImageClick?: (bedroom: Bedroom, imageIndex: number) => void
}

function BedroomCard({ bedroom, index, onImageClick }: BedroomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === bedroom.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === 0 ? bedroom.images.length - 1 : prev - 1
    )
  }

  const getThemeColors = (id: string) => {
    switch (id) {
      case 'master-suite':
        return {
          accent: 'bg-lagoon-teal',
          light: 'bg-lagoon-teal-light',
          text: 'text-lagoon-teal-dark'
        }
      case 'lagoon-room':
        return {
          accent: 'bg-lagoon-teal',
          light: 'bg-lagoon-teal-light',
          text: 'text-lagoon-teal-dark'
        }
      case 'terracotta-suite':
        return {
          accent: 'bg-terracotta',
          light: 'bg-terracotta-light',
          text: 'text-terracotta-dark'
        }
      case 'olive-grove-room':
        return {
          accent: 'bg-olive',
          light: 'bg-olive-light',
          text: 'text-olive-dark'
        }
      case 'sand-dune-room':
        return {
          accent: 'bg-sand-dark',
          light: 'bg-sand',
          text: 'text-warm-gray'
        }
      case 'bohemian-loft':
        return {
          accent: 'bg-terracotta',
          light: 'bg-terracotta-light',
          text: 'text-terracotta-dark'
        }
      default:
        return {
          accent: 'bg-lagoon-teal',
          light: 'bg-lagoon-teal-light',
          text: 'text-lagoon-teal-dark'
        }
    }
  }

  const colors = getThemeColors(bedroom.id)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={bedroom.images[currentImageIndex]}
          alt={`${bedroom.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onClick={() => onImageClick?.(bedroom, currentImageIndex)}
        />
        
        {/* Image Navigation */}
        {bedroom.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-300",
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
            >
              <ChevronLeft className="w-4 h-4 text-charcoal" />
            </button>
            <button
              onClick={nextImage}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-300",
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
            >
              <ChevronRight className="w-4 h-4 text-charcoal" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {bedroom.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
            {bedroom.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex(idx)
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  idx === currentImageIndex ? "bg-white scale-125" : "bg-white/60 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        )}

        {/* Room Type Badge */}
        <div className="absolute top-4 left-4">
          <div className={cn("px-3 py-1 rounded-full text-xs font-medium text-white", colors.accent)}>
            {bedroom.bedType}
          </div>
        </div>

        {/* Instagram Badge */}
        {bedroom.instagramPostId && (
          <div className="absolute top-4 right-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
            >
              <Instagram className="w-4 h-4 text-charcoal" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-canela text-charcoal">
            {bedroom.name}
          </h3>
          <div className={cn("w-3 h-3 rounded-full", colors.accent)} />
        </div>

        {/* Key Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-warm-gray">
          <div className="flex items-center space-x-1">
            <Maximize2 className="w-4 h-4" />
            <span>{bedroom.size}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{bedroom.view}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-charcoal mb-6 leading-relaxed line-clamp-3">
          {bedroom.description}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {bedroom.features.slice(0, 4).map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-2 text-sm">
              <div className={cn("w-2 h-2 rounded-full", colors.light)} />
              <span className="text-warm-gray">{feature}</span>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div className="border-t border-sand pt-4">
          <h4 className="text-sm font-medium text-charcoal mb-3">Premium Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {bedroom.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  colors.light,
                  colors.text
                )}
              >
                {amenity}
              </span>
            ))}
            {bedroom.amenities.length > 3 && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-sand text-warm-gray">
                +{bedroom.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onImageClick?.(bedroom, 0)}
          className={cn(
            "w-full mt-6 py-3 px-4 rounded-xl font-medium text-white transition-colors",
            colors.accent,
            "hover:opacity-90"
          )}
        >
          View Room Details
        </motion.button>
      </div>
    </motion.div>
  )
}

interface BedroomsProps {
  onRoomClick?: (bedroom: Bedroom, imageIndex: number) => void
}

export function Bedrooms({ onRoomClick }: BedroomsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: "-100px" })

  return (
    <section 
      id="bedrooms" 
      ref={sectionRef}
      className="py-20 px-6 lg:px-8 bg-cream"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-6xl font-canela text-charcoal mb-6"
          >
            Six Stunning
            <span className="block text-lagoon-teal italic">Bedrooms</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-warm-gray max-w-2xl mx-auto"
          >
            Each bedroom at Marbella Hideaway tells its own story, combining luxury with the 
            authentic charm of Andalusian design and modern comfort.
          </motion.p>
        </div>

        {/* Bedrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bedrooms.map((bedroom, index) => (
            <BedroomCard
              key={bedroom.id}
              bedroom={bedroom}
              index={index}
              onImageClick={onRoomClick}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-warm-gray mb-6">
            Ready to experience the perfect blend of luxury and tranquility?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-terracotta hover:bg-terracotta-dark text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-soft"
          >
            Book Your Stay
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}