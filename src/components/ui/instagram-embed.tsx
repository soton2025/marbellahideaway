'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Play, Heart, MessageCircle } from 'lucide-react'
import { InstagramMedia } from '@/types/instagram'
import { cn } from '@/lib/utils'

interface InstagramEmbedProps {
  media: InstagramMedia
  className?: string
  showCaption?: boolean
  showStats?: boolean
  priority?: boolean
}

export function InstagramEmbed({ 
  media, 
  className, 
  showCaption = true, 
  showStats = false,
  priority = false 
}: InstagramEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  const handleImageError = () => {
    setError(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden bg-sand rounded-xl",
        "transition-all duration-500 hover:shadow-medium",
        className
      )}
    >
      {/* Media Content */}
      <div className="relative aspect-square overflow-hidden">
        {media.media_type === 'VIDEO' ? (
          <div className="relative">
            <img
              src={media.thumbnail_url || media.media_url}
              alt="Instagram video thumbnail"
              className={cn(
                "w-full h-full object-cover transition-opacity duration-500",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading={priority ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-black/50 rounded-full p-4 backdrop-blur-sm"
              >
                <Play className="w-8 h-8 text-white fill-white" />
              </motion.div>
            </div>
          </div>
        ) : (
          <img
            src={media.media_url}
            alt={media.caption || 'Instagram post'}
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              "group-hover:scale-105",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={priority ? "eager" : "lazy"}
          />
        )}

        {/* Carousel Indicator */}
        {media.media_type === 'CAROUSEL_ALBUM' && (
          <div className="absolute top-4 right-4">
            <div className="bg-black/50 rounded-full px-3 py-1 backdrop-blur-sm">
              <span className="text-white text-sm font-medium">
                1/{media.children?.data.length || 1}
              </span>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 right-4">
            <motion.a
              href={media.permalink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="bg-white/90 rounded-full p-2 backdrop-blur-sm transition-colors hover:bg-white"
            >
              <ExternalLink className="w-4 h-4 text-charcoal" />
            </motion.a>
          </div>

          {showStats && (
            <div className="absolute bottom-4 left-4 flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-white">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">142</span>
              </div>
              <div className="flex items-center space-x-1 text-white">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">23</span>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {!isLoaded && !error && (
          <div className="absolute inset-0 bg-sand animate-pulse" />
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 bg-sand flex items-center justify-center">
            <div className="text-warm-gray text-center">
              <div className="w-8 h-8 mx-auto mb-2 opacity-50">📷</div>
              <p className="text-sm">Image unavailable</p>
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      {showCaption && media.caption && (
        <div className="p-4">
          <p className="text-sm text-charcoal line-clamp-3 leading-relaxed">
            {media.caption}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-warm-gray">
              {new Date(media.timestamp).toLocaleDateString()}
            </span>
            <a
              href={media.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-lagoon-teal hover:text-lagoon-teal-dark transition-colors"
            >
              View on Instagram
            </a>
          </div>
        </div>
      )}
    </motion.div>
  )
}

interface InstagramGridProps {
  media: InstagramMedia[]
  columns?: 2 | 3 | 4
  className?: string
  showCaptions?: boolean
  maxItems?: number
}

export function InstagramGrid({ 
  media, 
  columns = 3, 
  className,
  showCaptions = false,
  maxItems 
}: InstagramGridProps) {
  const displayedMedia = maxItems ? media.slice(0, maxItems) : media

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={cn(
      "grid gap-4",
      gridCols[columns],
      className
    )}>
      {displayedMedia.map((item, index) => (
        <InstagramEmbed
          key={item.id}
          media={item}
          showCaption={showCaptions}
          priority={index < 3}
        />
      ))}
    </div>
  )
}