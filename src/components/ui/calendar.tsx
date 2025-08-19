'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  X
} from 'lucide-react'
import { BookingDate } from '@/types/booking'
import { 
  generateMockAvailability, 
  formatPrice, 
  getPriceEstimate,
  seasonalPricing 
} from '@/lib/pricing'
import { cn } from '@/lib/utils'

interface CalendarProps {
  onDateSelect?: (startDate: Date | null, endDate: Date | null) => void
  className?: string
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export function Calendar({ onDateSelect, className }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  
  const availability = useMemo(() => 
    generateMockAvailability(year, month), 
    [year, month]
  )
  
  const availabilityMap = useMemo(() => {
    const map = new Map<string, BookingDate>()
    availability.forEach(day => map.set(day.date, day))
    return map
  }, [availability])

  const daysInMonth = new Date(year, month - 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay()
  
  const previousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }
  
  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month - 1, day)
    const dayData = availabilityMap.get(clickedDate.toISOString().split('T')[0])
    
    if (!dayData?.available || clickedDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      return
    }

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Start new selection
      setSelectedStartDate(clickedDate)
      setSelectedEndDate(null)
      onDateSelect?.(clickedDate, null)
    } else {
      // Complete selection
      if (clickedDate < selectedStartDate) {
        // If clicked date is before start date, make it the new start
        setSelectedStartDate(clickedDate)
        setSelectedEndDate(selectedStartDate)
        onDateSelect?.(clickedDate, selectedStartDate)
      } else {
        // Normal case: clicked date is after start date
        setSelectedEndDate(clickedDate)
        onDateSelect?.(selectedStartDate, clickedDate)
      }
    }
  }

  const isDateInRange = (day: number) => {
    if (!selectedStartDate) return false
    
    const currentDateObj = new Date(year, month - 1, day)
    const endDate = selectedEndDate || hoveredDate
    
    if (!endDate) return false
    
    const start = selectedStartDate < endDate ? selectedStartDate : endDate
    const end = selectedStartDate < endDate ? endDate : selectedStartDate
    
    return currentDateObj >= start && currentDateObj <= end
  }

  const getDateStatus = (day: number) => {
    const dateObj = new Date(year, month - 1, day)
    const dateString = dateObj.toISOString().split('T')[0]
    const dayData = availabilityMap.get(dateString)
    const isToday = dateObj.toDateString() === new Date().toDateString()
    const isPast = dateObj < new Date(new Date().setHours(0, 0, 0, 0))
    
    const isStart = selectedStartDate?.toDateString() === dateObj.toDateString()
    const isEnd = selectedEndDate?.toDateString() === dateObj.toDateString()
    const inRange = isDateInRange(day)
    
    return {
      available: dayData?.available ?? false,
      price: dayData?.price,
      season: dayData?.season,
      reason: dayData?.reason,
      minStay: dayData?.minStay,
      isToday,
      isPast,
      isStart,
      isEnd,
      inRange
    }
  }

  const renderCalendarDays = () => {
    const days = []
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />)
    }
    
    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getDateStatus(day)
      const season = status.season ? seasonalPricing.find(s => s.season === status.season) : null
      
      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: status.available && !status.isPast ? 1.05 : 1 }}
          whileTap={{ scale: status.available && !status.isPast ? 0.95 : 1 }}
          className={cn(
            "aspect-square relative cursor-pointer rounded-lg transition-all duration-200",
            "flex flex-col items-center justify-center text-sm",
            status.isPast && "opacity-40 cursor-not-allowed",
            !status.available && !status.isPast && "opacity-60 cursor-not-allowed",
            status.available && !status.isPast && "hover:shadow-medium",
            status.inRange && "bg-orange-100",
            status.isStart && "bg-orange-600 text-white shadow-medium",
            status.isEnd && "bg-orange-600 text-white shadow-medium",
            status.isToday && !status.isStart && !status.isEnd && "ring-2 ring-orange-400 ring-offset-2"
          )}
          onClick={() => handleDateClick(day)}
          onMouseEnter={() => selectedStartDate && !selectedEndDate && setHoveredDate(new Date(year, month - 1, day))}
          onMouseLeave={() => setHoveredDate(null)}
        >
          <span className={cn(
            "font-medium mb-1",
            status.isStart || status.isEnd ? "text-white" : "text-charcoal"
          )}>
            {day}
          </span>
          
          {/* Price and season indicator */}
          {status.available && !status.isPast && status.price && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
              <div 
                className={cn(
                  "text-xs px-1 py-0.5 rounded text-white font-medium",
                  status.isStart || status.isEnd ? "bg-white/20" : "bg-black/70"
                )}
                style={{ 
                  backgroundColor: status.isStart || status.isEnd ? 
                    undefined : 
                    season?.color + '40' 
                }}
              >
                €{Math.round(status.price)}
              </div>
            </div>
          )}
          
          {/* Unavailable indicator */}
          {!status.available && !status.isPast && (
            <div className="absolute inset-0 flex items-center justify-center">
              <X className="w-4 h-4 text-warm-gray" />
            </div>
          )}
        </motion.div>
      )
    }
    
    return days
  }

  const priceEstimate = useMemo(() => {
    if (selectedStartDate && selectedEndDate) {
      return getPriceEstimate(selectedStartDate, selectedEndDate)
    }
    return null
  }, [selectedStartDate, selectedEndDate])

  return (
    <div className={cn("bg-white rounded-2xl p-6 shadow-soft", className)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-canela text-charcoal">
            {monthNames[month - 1]} {year}
          </h3>
          <p className="text-sm text-warm-gray mt-1">
            Select your check-in and check-out dates
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-sand rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-charcoal" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-sand rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-charcoal" />
          </button>
        </div>
      </div>

      {/* Season Legend */}
      <div className="mb-6 p-4 bg-sand/50 rounded-xl">
        <h4 className="text-sm font-medium text-charcoal mb-3">Seasonal Pricing</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {seasonalPricing.map((season) => (
            <div key={season.season} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: season.color }}
              />
              <div>
                <div className="text-xs font-medium text-charcoal">{season.label}</div>
                <div className="text-xs text-warm-gray">
                  {formatPrice(season.basePrice)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-warm-gray py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {renderCalendarDays()}
      </div>

      {/* Selection Summary */}
      <AnimatePresence>
        {selectedStartDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-t border-sand pt-6"
          >
            <div className="space-y-4">
              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-lagoon-teal/10 rounded-xl">
                  <div className="text-sm text-warm-gray mb-1">Check-in</div>
                  <div className="font-medium text-charcoal">
                    {selectedStartDate.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                </div>
                
                <div className="text-center p-3 bg-lagoon-teal/10 rounded-xl">
                  <div className="text-sm text-warm-gray mb-1">Check-out</div>
                  <div className="font-medium text-charcoal">
                    {selectedEndDate ? 
                      selectedEndDate.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short'
                      }) : 
                      'Select date'
                    }
                  </div>
                </div>
              </div>

              {/* Price Estimate */}
              {priceEstimate && (
                <div className="bg-gradient-to-r from-lagoon-teal/10 to-terracotta/10 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-warm-gray">Likely price for {priceEstimate.nights} nights</div>
                      <div className="text-2xl font-canela text-charcoal">
                        {formatPrice(priceEstimate.totalPrice)}
                      </div>
                      <div className="text-sm text-warm-gray">
                        {formatPrice(priceEstimate.pricePerNight)} per night • {priceEstimate.season.label}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-white/80 rounded-full px-3 py-1 text-xs font-medium text-charcoal">
                        Estimated
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear Selection */}
      {selectedStartDate && (
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setSelectedStartDate(null)
              setSelectedEndDate(null)
              onDateSelect?.(null, null)
            }}
            className="text-sm text-warm-gray hover:text-charcoal transition-colors"
          >
            Clear dates
          </button>
        </div>
      )}
    </div>
  )
}