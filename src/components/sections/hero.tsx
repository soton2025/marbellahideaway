'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, MessageCircle, Instagram, Calendar } from 'lucide-react'
import { TikTokIcon } from '@/components/icons/tiktok'
import { InstagramGrid } from '@/components/ui/instagram-embed'
import { getInstagramContent } from '@/lib/instagram'
import { generateWhatsAppUrl } from '@/lib/utils'
import { InstagramMedia } from '@/types/instagram'

interface HeroProps {
  onBookingClick?: () => void
}

export function Hero({ onBookingClick }: HeroProps) {
  const [instagramMedia, setInstagramMedia] = useState<InstagramMedia[]>([])
  const [showInstagramFeed, setShowInstagramFeed] = useState(false)
  const [, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -200])
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3])

  useEffect(() => {
    const loadInstagramContent = async () => {
      try {
        const media = await getInstagramContent(true) // Use mock data for now
        setInstagramMedia(media.slice(0, 6)) // Show first 6 posts
      } catch (error) {
        console.error('Failed to load Instagram content:', error)
      }
    }

    loadInstagramContent()
  }, [])

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in booking Marbella Hideaway for my upcoming stay. Could you please provide availability and pricing information?`
    window.open(generateWhatsAppUrl(message), '_blank')
  }

  const scrollToContent = () => {
    const contentSection = document.getElementById('content')
    contentSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y, opacity }} className="relative h-full w-full">
          {/* Fallback background image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/gallery/terracotta-terrace-lounge.jpg")'
            }}
          />
          
          {/* Video overlay (hidden until video loads) */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={() => setIsVideoLoaded(true)}
            style={{ opacity: 0 }}
            onCanPlay={(e) => {
              const video = e.target as HTMLVideoElement;
              video.style.opacity = '1';
            }}
          >
            <source src="/videos/lagoon-pool.mp4" type="video/mp4" />
          </video>
          
          {/* Orange-tinted overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-orange-900/20 to-black/30" />
          
          {/* Subtle warm texture overlay */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-soft-light"
            style={{
              backgroundImage: 'url(\"data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f97316\" fill-opacity=\"0.1\"%3E%3Cpath d=\"m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")'
            }}
          />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Navigation */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 left-0 right-0 z-20 p-6 lg:p-8"
        >
          <nav className="flex items-center justify-between">
            <div className="text-2xl lg:text-3xl font-canela font-bold text-white">
              Marbella Hideaway
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#experiences" className="text-white/90 hover:text-white transition-colors">
                Experiences
              </a>
              <a href="#bedrooms" className="text-white/90 hover:text-white transition-colors">
                Bedrooms
              </a>
              <a href="#gallery" className="text-white/90 hover:text-white transition-colors">
                Gallery
              </a>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowInstagramFeed(!showInstagramFeed)}
                  className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="hidden lg:inline">@marbellahideaway</span>
                </button>
                <a
                  href="https://www.tiktok.com/@marbellahideaway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
                >
                  <TikTokIcon className="w-4 h-4" />
                  <span className="hidden lg:inline">TikTok</span>
                </a>
              </div>
            </div>

            {/* Mobile Social Links */}
            <div className="flex md:hidden items-center space-x-3">
              <button
                onClick={() => setShowInstagramFeed(!showInstagramFeed)}
                className="text-white/90 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <a
                href="https://www.tiktok.com/@marbellahideaway"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </nav>
        </motion.header>

        {/* Main Hero Content */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-8">
          <div className="text-center text-white max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-5xl lg:text-7xl font-canela font-light mb-6 leading-tight">
                Marbella&apos;s Most
                <span className="block text-orange-300 italic">
                  Private Hideaway
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/90">
                A fresh and contemporary intimate paradise that oozes serenity and sophistication 
                in the heart of glamorous Marbella
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsAppClick}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-medium flex items-center space-x-2 transition-colors shadow-soft"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Enquiry</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onBookingClick}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 px-8 py-4 rounded-xl font-medium flex items-center space-x-2 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Check Availability</span>
                </motion.button>
              </div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/80"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>6 Luxury Bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Lagoon Pool</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>5 Min to Puerto Banús</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Golden Mile Location</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Instagram Feed Overlay */}
        {showInstagramFeed && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-white/95 backdrop-blur-md z-30 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Instagram className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-canela text-stone-800">@marbellahideaway</h3>
              </div>
              <button
                onClick={() => setShowInstagramFeed(false)}
                className="text-stone-800 hover:text-orange-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-stone-500 mb-2">Follow our journey</p>
              <div className="text-2xl font-medium text-stone-800">74K followers</div>
            </div>

            {instagramMedia.length > 0 && (
              <InstagramGrid
                media={instagramMedia}
                columns={2}
                showCaptions={true}
                className="gap-3"
              />
            )}
          </motion.div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.button
            onClick={scrollToContent}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/80 hover:text-white transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}