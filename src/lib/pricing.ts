import { SeasonalPricing, BookingDate } from '@/types/booking'

export const seasonalPricing: SeasonalPricing[] = [
  {
    season: 'low',
    label: 'Low Season',
    basePrice: 1200,
    color: '#6B7A5A', // olive
    months: [1, 2, 11, 12], // Jan, Feb, Nov, Dec
    description: 'Peaceful winter months with mild Mediterranean weather'
  },
  {
    season: 'mid',
    label: 'Mid Season',
    basePrice: 1800,
    color: '#4A9B8E', // lagoon-teal
    months: [3, 4, 5, 10], // Mar, Apr, May, Oct
    description: 'Perfect weather for exploring Marbella and the Costa del Sol'
  },
  {
    season: 'high',
    label: 'High Season',
    basePrice: 2500,
    color: '#B85450', // terracotta
    months: [6, 9], // Jun, Sep
    description: 'Warm summer evenings and vibrant Marbella atmosphere'
  },
  {
    season: 'peak',
    label: 'Peak Season',
    basePrice: 3200,
    color: '#D4716D', // terracotta-light
    months: [7, 8], // Jul, Aug
    description: 'Summer at its finest with maximum sunshine and energy'
  }
]

export function getSeasonForDate(date: Date): SeasonalPricing {
  const month = date.getMonth() + 1 // getMonth() returns 0-11
  
  const season = seasonalPricing.find(s => s.months.includes(month))
  return season || seasonalPricing[0] // fallback to low season
}

export function calculatePrice(date: Date, nights: number = 1): number {
  const season = getSeasonForDate(date)
  let totalPrice = season.basePrice * nights
  
  // Weekend surcharge (Friday/Saturday)
  const dayOfWeek = date.getDay()
  if (dayOfWeek === 5 || dayOfWeek === 6) {
    totalPrice *= 1.2 // 20% weekend surcharge
  }
  
  // Holiday surcharge (simplified - you'd integrate with a holidays API)
  const holidays = getHolidays(date.getFullYear())
  const dateString = date.toISOString().split('T')[0]
  if (holidays.includes(dateString)) {
    totalPrice *= 1.5 // 50% holiday surcharge
  }
  
  return Math.round(totalPrice)
}

function getHolidays(year: number): string[] {
  // Simplified holiday list for demonstration
  // In production, integrate with a holidays API
  return [
    `${year}-01-01`, // New Year
    `${year}-04-01`, // Easter Sunday (approximate)
    `${year}-05-01`, // Labour Day
    `${year}-08-15`, // Assumption of Mary
    `${year}-10-12`, // National Day of Spain
    `${year}-11-01`, // All Saints Day
    `${year}-12-06`, // Constitution Day
    `${year}-12-08`, // Immaculate Conception
    `${year}-12-25`, // Christmas
    `${year}-12-31`, // New Year's Eve
  ]
}

export function getPriceEstimate(checkIn: Date, checkOut: Date): {
  totalPrice: number
  pricePerNight: number
  nights: number
  season: SeasonalPricing
  breakdown: Array<{ date: string, price: number, season: string }>
} {
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  const breakdown: Array<{ date: string, price: number, season: string }> = []
  let totalPrice = 0
  
  const current = new Date(checkIn)
  while (current < checkOut) {
    const nightPrice = calculatePrice(current)
    const season = getSeasonForDate(current)
    
    breakdown.push({
      date: current.toISOString().split('T')[0],
      price: nightPrice,
      season: season.label
    })
    
    totalPrice += nightPrice
    current.setDate(current.getDate() + 1)
  }
  
  const averagePerNight = Math.round(totalPrice / nights)
  const primarySeason = getSeasonForDate(checkIn)
  
  return {
    totalPrice,
    pricePerNight: averagePerNight,
    nights,
    season: primarySeason,
    breakdown
  }
}

export function formatPrice(price: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Mock data for availability (in production, this would come from Google Calendar API)
export function generateMockAvailability(year: number, month: number): BookingDate[] {
  const daysInMonth = new Date(year, month, 0).getDate()
  const availability: BookingDate[] = []
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day)
    const dateString = date.toISOString().split('T')[0]
    const season = getSeasonForDate(date)
    
    // Mock some unavailable dates
    const isUnavailable = Math.random() < 0.15 // 15% chance of being unavailable
    const reason = isUnavailable ? 
      ['Maintenance', 'Private Event', 'Already Booked'][Math.floor(Math.random() * 3)] : 
      undefined
    
    availability.push({
      date: dateString,
      available: !isUnavailable,
      price: calculatePrice(date),
      minStay: season.season === 'peak' ? 7 : season.season === 'high' ? 5 : 3,
      season: season.season,
      reason
    })
  }
  
  return availability
}