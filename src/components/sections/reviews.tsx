'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Star,
  Quote,
  Instagram,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Shield,
  Calendar,
  MapPin,
  Heart
} from 'lucide-react'
import { reviews, reviewStats, Review } from '@/data/reviews'
import { cn } from '@/lib/utils'

const sourceIcons = {
  tripadvisor: '🏆',
  google: '🔍',
  airbnb: '🏠',
  instagram: '📸',
  tiktok: '🎵',
  direct: '💌'
}

const sourceColors = {
  tripadvisor: 'bg-green-500',
  google: 'bg-blue-500',
  airbnb: 'bg-red-500',
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  tiktok: 'bg-black',
  direct: 'bg-orange-600'
}

const travelTypeIcons = {
  family: '👨‍👩‍👧‍👦',
  couple: '💕',
  friends: '👯‍♀️',
  business: '💼',
  solo: '🧳'
}

interface ReviewCardProps {
  review: Review
  index: number
}

function ReviewCard({ review, index }: ReviewCardProps) {
  const [showFullReview, setShowFullReview] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  const nextImage = () => {
    if (review.images && review.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % review.images!.length)
    }
  }

  const prevImage = () => {
    if (review.images && review.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + review.images!.length) % review.images!.length)
    }
  }

  const truncatedReview = review.review.length > 150 ? 
    review.review.substring(0, 150) + '...' : 
    review.review

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 font-medium text-sm">
                {review.name.charAt(0)}
              </span>
            </div>
            {review.verified && (
              <div className="absolute -bottom-1 -right-1 bg-orange-600 rounded-full p-1">
                <Shield className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-charcoal">{review.name}</h4>
              {review.instagramHandle && (
                <a
                  href={`https://instagram.com/${review.instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terracotta hover:text-terracotta-dark transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-warm-gray">
              <MapPin className="w-3 h-3" />
              <span>{review.location}</span>
            </div>
          </div>
        </div>

        {/* Source Badge */}
        <div className="flex items-center space-x-2">
          <div 
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium text-white flex items-center space-x-1",
              sourceColors[review.source]
            )}
          >
            <span>{sourceIcons[review.source]}</span>
            <span className="capitalize">{review.source}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-warm-gray"
              )}
            />
          ))}
        </div>
        <div className="text-sm text-warm-gray">
          {new Date(review.date).toLocaleDateString('en-GB', {
            month: 'short',
            year: 'numeric'
          })}
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        {review.highlight && (
          <div className="mb-3 p-3 bg-lagoon-teal/10 rounded-lg border-l-4 border-lagoon-teal">
            <Quote className="w-4 h-4 text-lagoon-teal mb-1" />
            <p className="text-sm italic text-charcoal">&ldquo;{review.highlight}&rdquo;</p>
          </div>
        )}
        
        <p className="text-charcoal leading-relaxed">
          {showFullReview ? review.review : truncatedReview}
        </p>
        
        {review.review.length > 150 && (
          <button
            onClick={() => setShowFullReview(!showFullReview)}
            className="text-lagoon-teal hover:text-lagoon-teal-dark text-sm mt-2 transition-colors"
          >
            {showFullReview ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4 relative">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src={review.images[currentImageIndex]}
              alt={`Review image by ${review.name}`}
              className="w-full h-full object-cover"
            />
            
            {review.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                  {review.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        idx === currentImageIndex ? "bg-white" : "bg-white/50"
                      )}
                    />
                  ))}
                </div>
              </>
            )}

            {review.instagramPostId && (
              <div className="absolute top-2 right-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-warm-gray pt-4 border-t border-sand">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{review.stayDuration}</span>
          </div>
          {review.roomType && (
            <div className="flex items-center space-x-1">
              <span>•</span>
              <span>{review.roomType}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <span>{travelTypeIcons[review.travelType]}</span>
          <span className="capitalize">{review.travelType}</span>
        </div>
      </div>
    </motion.div>
  )
}

export function Reviews() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: "-100px" })

  const displayedReviews = reviews.slice(0, 6)

  return (
    <section id="reviews" ref={sectionRef} className="py-20 px-6 lg:px-8 bg-cream">
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
            Guest
            <span className="block text-orange-400 italic">Stories</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-warm-gray max-w-2xl mx-auto mb-8"
          >
            Discover what makes Marbella Hideaway special through the experiences 
            of our cherished guests from around the world.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-3xl font-canela text-charcoal mb-1">
                {reviewStats.averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-sm text-warm-gray">Average Rating</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-canela text-charcoal mb-1">
                {reviewStats.totalReviews}
              </div>
              <div className="text-sm text-warm-gray">Total Reviews</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-canela text-charcoal mb-1">
                #1
              </div>
              <div className="text-sm text-warm-gray">on TripAdvisor</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-canela text-charcoal mb-1">
                96%
              </div>
              <div className="text-sm text-warm-gray">5-Star Reviews</div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedReviews.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-terracotta" />
              <h3 className="text-2xl font-canela text-charcoal">Ready to Create Your Story?</h3>
            </div>
            
            <p className="text-warm-gray mb-6 max-w-2xl mx-auto">
              Join hundreds of travelers who have discovered their perfect hideaway in Marbella. 
              Your unforgettable experience awaits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-terracotta hover:bg-terracotta-dark text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-medium"
              >
                Book Your Stay
              </motion.button>
              
              <motion.a
                href="https://www.tripadvisor.com/VacationRentalReview-g187439-d4214646-Marbella_Hideaway-Marbella_Costa_del_Sol_Province_of_Malaga_Andalucia.html"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border border-sand hover:border-lagoon-teal text-charcoal px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Read All Reviews</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}