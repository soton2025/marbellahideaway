'use client'
import { Hero } from '@/components/sections/hero'
import { Gallery } from '@/components/sections/gallery'
import { Booking } from '@/components/sections/booking'
import { Reviews } from '@/components/sections/reviews'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  const handleBookingClick = () => {
    const bookingSection = document.getElementById('booking')
    bookingSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleWhatsAppInquiry = (checkIn: Date, checkOut: Date, guests: number) => {
    // Analytics tracking could go here
    console.log('WhatsApp inquiry:', { checkIn, checkOut, guests })
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero onBookingClick={handleBookingClick} />
      
      {/* Content Anchor */}
      <div id="content" />
      
      {/* Gallery Section */}
      <Gallery showInstagramContent={true} />
      
      {/* Booking Section */}
      <Booking onWhatsAppInquiry={handleWhatsAppInquiry} />
      
      {/* Reviews Section */}
      <Reviews />

      {/* Footer */}
      <Footer />
    </main>
  )
}
