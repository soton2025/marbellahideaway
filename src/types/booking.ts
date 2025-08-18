export interface BookingDate {
  date: string
  available: boolean
  price?: number
  minStay?: number
  season: 'low' | 'mid' | 'high' | 'peak'
  reason?: string // For blocked dates
}

export interface SeasonalPricing {
  season: 'low' | 'mid' | 'high' | 'peak'
  label: string
  basePrice: number
  color: string
  months: number[]
  description: string
}

export interface BookingInquiry {
  checkIn: string
  checkOut: string
  guests: number
  name: string
  email: string
  phone: string
  message?: string
  specialRequests?: string[]
}

export interface GoogleCalendarEvent {
  id: string
  summary: string
  start: {
    date?: string
    dateTime?: string
  }
  end: {
    date?: string
    dateTime?: string
  }
  status: 'confirmed' | 'tentative' | 'cancelled'
}