'use client'

import { useState } from 'react'
import { Hero } from '@/components/sections/hero'
import { Bedrooms } from '@/components/sections/bedrooms'
import { Gallery } from '@/components/sections/gallery'
import { Booking } from '@/components/sections/booking'
import { Reviews } from '@/components/sections/reviews'
import { Footer } from '@/components/sections/footer'
import { Bedroom } from '@/data/bedrooms'

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<{bedroom: Bedroom, imageIndex: number} | null>(null)

  const handleRoomClick = (bedroom: Bedroom, imageIndex: number) => {
    setSelectedRoom({ bedroom, imageIndex })
  }

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
      
      {/* Bedrooms Section */}
      <Bedrooms onRoomClick={handleRoomClick} />
      
      {/* Gallery Section */}
      <Gallery showInstagramContent={true} />
      
      {/* Booking Section */}
      <Booking onWhatsAppInquiry={handleWhatsAppInquiry} />
      
      {/* Reviews Section */}
      <Reviews />

      {/* Footer */}
      <Footer />

      {/* Room Details Modal */}
      {selectedRoom && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedRoom(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-canela text-charcoal">
                  {selectedRoom.bedroom.name}
                </h2>
                <button 
                  onClick={() => setSelectedRoom(null)}
                  className="text-warm-gray hover:text-charcoal transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedRoom.bedroom.images[selectedRoom.imageIndex]}
                    alt={selectedRoom.bedroom.name}
                    className="w-full aspect-[4/3] object-cover rounded-xl mb-4"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {selectedRoom.bedroom.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedRoom({
                          ...selectedRoom,
                          imageIndex: index
                        })}
                        className={`aspect-square rounded-lg overflow-hidden ${
                          index === selectedRoom.imageIndex 
                            ? 'ring-2 ring-lagoon-teal' 
                            : ''
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedRoom.bedroom.name} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-charcoal mb-2">About this room</h3>
                      <p className="text-warm-gray leading-relaxed">
                        {selectedRoom.bedroom.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-charcoal mb-2">Room Details</h4>
                        <div className="space-y-1 text-sm text-warm-gray">
                          <div>Size: {selectedRoom.bedroom.size}</div>
                          <div>Bed: {selectedRoom.bedroom.bedType}</div>
                          <div>View: {selectedRoom.bedroom.view}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-charcoal mb-2">Features</h4>
                        <ul className="space-y-1 text-sm text-warm-gray">
                          {selectedRoom.bedroom.features.slice(0, 3).map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-charcoal mb-2">Premium Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRoom.bedroom.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-sand text-charcoal text-sm rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedRoom(null)
                        handleBookingClick()
                      }}
                      className="w-full bg-lagoon-teal hover:bg-lagoon-teal-dark text-white py-4 rounded-xl font-medium transition-colors"
                    >
                      Check Availability
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
