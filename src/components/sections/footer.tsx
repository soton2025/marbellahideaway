'use client'

import { Instagram, MessageCircle, MapPin, Phone, Mail } from 'lucide-react'
import { TikTokIcon } from '@/components/icons/tiktok'
import { generateWhatsAppUrl } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleWhatsAppClick = () => {
    const message = `Hi! I'd like to learn more about Marbella Hideaway and availability for my upcoming stay.`
    window.open(generateWhatsAppUrl(message), '_blank')
  }

  return (
    <footer className="bg-stone-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-canela mb-4">Marbella Hideaway</h3>
            <p className="text-white/80 mb-6 leading-relaxed max-w-md">
              Marbella&apos;s most private hideaway. A luxury 6-bedroom villa with lagoon pool 
              in the heart of the Golden Mile, where serenity meets sophistication.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <a
                href="https://instagram.com/marbellahideaway"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.tiktok.com/@marbellahideaway"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors group"
              >
                <TikTokIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <button
                onClick={handleWhatsAppClick}
                className="bg-orange-600 hover:bg-orange-700 rounded-full p-3 transition-colors group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <a href="#gallery" className="text-white/80 hover:text-white transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#booking" className="text-white/80 hover:text-white transition-colors">
                  Availability
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-white/80 hover:text-white transition-colors">
                  Guest Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-orange-400 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  Golden Mile<br />
                  Marbella, Spain 29602
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a 
                  href="tel:+34672249724"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  +34 672 24 97 24
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a 
                  href="mailto:hello@marbellahideaway.com"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  hello@marbellahideaway.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-canela text-orange-400 mb-1">#1</div>
              <div className="text-sm text-white/80">Villa Rental</div>
            </div>
            <div>
              <div className="text-2xl font-canela text-orange-400 mb-1">74K</div>
              <div className="text-sm text-white/80">Instagram Followers</div>
            </div>
            <div>
              <div className="text-2xl font-canela text-orange-400 mb-1">4.8★</div>
              <div className="text-sm text-white/80">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-canela text-orange-400 mb-1">47</div>
              <div className="text-sm text-white/80">Reviews</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {currentYear} Marbella Hideaway. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 text-sm">
            <a href="/privacy" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-white/60 hover:text-white transition-colors">
              Terms of Service
            </a>
            <span className="text-white/40">•</span>
            <span className="text-white/60">
              Follow us: 
              <a 
                href="https://instagram.com/marbellahideaway" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-orange-400 transition-colors ml-1"
              >
                @marbellahideaway
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}