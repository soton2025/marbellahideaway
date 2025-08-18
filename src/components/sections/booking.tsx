'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Calendar as CalendarIcon,
  MessageCircle,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Wifi,
  Car,
  Utensils,
  Shield
} from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { generateWhatsAppUrl, formatDate } from '@/lib/utils'
import { getPriceEstimate, formatPrice } from '@/lib/pricing'

interface BookingProps {
  onWhatsAppInquiry?: (checkIn: Date, checkOut: Date, guests: number) => void
}

export function Booking({ onWhatsAppInquiry }: BookingProps) {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)
  const [guestCount, setGuestCount] = useState(2)
  const [showCalendar, setShowCalendar] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: "-100px" })

  const handleDateSelect = (startDate: Date | null, endDate: Date | null) => {
    setSelectedStartDate(startDate)
    setSelectedEndDate(endDate)
  }

  const handleWhatsAppInquiry = () => {
    if (!selectedStartDate || !selectedEndDate) {
      setShowCalendar(true)
      return
    }

    const priceEstimate = getPriceEstimate(selectedStartDate, selectedEndDate)
    const message = `Hi! I'm interested in booking Marbella Hideaway:

📅 Check-in: ${formatDate(selectedStartDate)}
📅 Check-out: ${formatDate(selectedEndDate)}
👥 Guests: ${guestCount}
🏠 Nights: ${priceEstimate.nights}

Estimated price: ${formatPrice(priceEstimate.totalPrice)} (${priceEstimate.season.label})

Could you please confirm availability and provide the final quote? Thank you!`

    window.open(generateWhatsAppUrl(message), '_blank')
    onWhatsAppInquiry?.(selectedStartDate, selectedEndDate, guestCount)
  }

  const priceEstimate = selectedStartDate && selectedEndDate ? 
    getPriceEstimate(selectedStartDate, selectedEndDate) : null

  const inclusions = [
    { icon: Wifi, text: 'High-speed Wi-Fi throughout' },
    { icon: Car, text: 'Private parking for 3 cars' },
    { icon: Utensils, text: 'Fully equipped gourmet kitchen' },
    { icon: Shield, text: '24/7 concierge support' },
  ]

  return (
    <section id="booking" ref={sectionRef} className="py-20 px-6 lg:px-8 bg-warm-white">
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
            Book Your
            <span className="block text-lagoon-teal italic">Hideaway</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-warm-gray max-w-2xl mx-auto"
          >
            Experience luxury accommodation in the heart of Marbella&apos;s Golden Mile. 
            Check availability and get instant pricing for your perfect getaway.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-soft sticky top-8">
              <h3 className="text-2xl font-canela text-charcoal mb-6">Quick Inquiry</h3>
              
              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <button
                  onClick={() => setShowCalendar(true)}
                  className="w-full p-4 border border-sand rounded-xl text-left hover:border-lagoon-teal transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="w-5 h-5 text-lagoon-teal" />
                    <div>
                      <div className="text-sm text-warm-gray">Dates</div>
                      <div className="font-medium text-charcoal">
                        {selectedStartDate && selectedEndDate ? (
                          `${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`
                        ) : (
                          'Select check-in & check-out'
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Guests */}
                <div className="p-4 border border-sand rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-lagoon-teal" />
                      <div>
                        <div className="text-sm text-warm-gray">Guests</div>
                        <div className="font-medium text-charcoal">{guestCount} guests</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="w-8 h-8 rounded-full border border-sand hover:border-lagoon-teal flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{guestCount}</span>
                      <button
                        onClick={() => setGuestCount(Math.min(12, guestCount + 1))}
                        className="w-8 h-8 rounded-full border border-sand hover:border-lagoon-teal flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Estimate */}
              {priceEstimate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-lagoon-teal/10 to-terracotta/10 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-warm-gray">
                      Estimated total ({priceEstimate.nights} nights)
                    </span>
                    <div className="bg-white/80 rounded-full px-2 py-1 text-xs font-medium text-charcoal">
                      {priceEstimate.season.label}
                    </div>
                  </div>
                  <div className="text-3xl font-canela text-charcoal">
                    {formatPrice(priceEstimate.totalPrice)}
                  </div>
                  <div className="text-sm text-warm-gray mt-1">
                    {formatPrice(priceEstimate.pricePerNight)} per night
                  </div>
                </motion.div>
              )}

              {/* WhatsApp CTA */}
              <motion.button
                onClick={handleWhatsAppInquiry}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-terracotta hover:bg-terracotta-dark text-white py-4 px-6 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors shadow-medium"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Inquiry</span>
              </motion.button>

              <p className="text-xs text-warm-gray text-center mt-3">
                Get instant response • No booking fees • Secure payment
              </p>

              {/* Quick Facts */}
              <div className="mt-6 pt-6 border-t border-sand">
                <h4 className="font-medium text-charcoal mb-3">What&apos;s included</h4>
                <div className="space-y-2">
                  {inclusions.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <item.icon className="w-4 h-4 text-lagoon-teal" />
                      <span className="text-sm text-warm-gray">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Calendar 
              onDateSelect={handleDateSelect}
              className="h-fit"
            />

            {/* Booking Policies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 bg-white rounded-2xl p-6 shadow-soft"
            >
              <h3 className="text-xl font-canela text-charcoal mb-6">Booking Policies</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-lagoon-teal mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-charcoal">Flexible Cancellation</div>
                      <p className="text-sm text-warm-gray">Cancel up to 14 days before check-in for full refund</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-lagoon-teal mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-charcoal">Check-in / Check-out</div>
                      <p className="text-sm text-warm-gray">Check-in: 4:00 PM • Check-out: 11:00 AM</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-lagoon-teal mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-charcoal">Maximum Occupancy</div>
                      <p className="text-sm text-warm-gray">12 guests maximum • Additional fees may apply</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-charcoal">Minimum Stay</div>
                      <p className="text-sm text-warm-gray">3-7 nights minimum depending on season</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-sand">
                <p className="text-sm text-warm-gray leading-relaxed">
                  All bookings are subject to availability and final confirmation. Prices may vary based on 
                  exact dates, length of stay, and seasonal demand. Additional services like chef, 
                  housekeeping, and transfers can be arranged upon request.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setShowCalendar(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar 
              onDateSelect={(start, end) => {
                handleDateSelect(start, end)
                if (start && end) {
                  setShowCalendar(false)
                }
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}