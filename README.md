# Marbella Hideaway - Luxury Villa Website

A premium, fintech-smooth website for Marbella Hideaway luxury villa rental, featuring Spanish bohemian lagoon design with Instagram integration and sophisticated booking system.

## 🏡 Features

### Design & Experience
- **Spanish Bohemian Lagoon Theme**: Terracotta, olive, sand, and lagoon teal color palette
- **Premium Typography**: Canela for headings, Inter for UI
- **Fintech-Smooth Interactions**: Subtle parallax and micro-interactions
- **Mobile-First Responsive Design**: Seamless across all devices

### Core Components
- **Hero Section**: Lagoon pool video background with Instagram highlights
- **6 Bedroom Showcase**: Elegant cards with room details and Instagram integration
- **Masonry Gallery**: Professional photography mixed with live Instagram content
- **Premium Calendar**: Availability with seasonal pricing and "Likely price" badges
- **WhatsApp Integration**: Pre-filled inquiry messages
- **Guest Reviews**: Curated testimonials with Instagram stories

### Social Media Integration
- **Instagram**: Real-time content embedding, highlight reels, 74K followers
- **TikTok**: Direct links to @marbellahideaway TikTok for video content
- User-generated content display across platforms
- Social proof throughout the booking flow

### Booking System
- Google Calendar integration
- Seasonal pricing engine
- Dynamic availability calendar
- WhatsApp-based inquiry system
- Price estimation with seasonal badges

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **APIs**: Instagram Basic Display API, Google Calendar API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd marbella-hideaway
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your API keys and configuration values.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors
- **Terracotta**: `#B85450` (primary accent)
- **Olive**: `#6B7A5A` (secondary accent)
- **Sand**: `#E6D7C3` (neutral background)
- **Lagoon Teal**: `#4A9B8E` (primary brand)
- **Warm White**: `#FFFEF9` (main background)

### Typography
- **Headings**: Canela (elegant serif)
- **Body**: Inter (clean sans-serif)
- **UI Elements**: Inter with specific weights

## 🔧 Configuration

### Instagram API Setup
1. Create a Facebook Developer account
2. Set up Instagram Basic Display API
3. Get your access token and user ID
4. Add to environment variables

### Google Calendar Integration
1. Create a Google Cloud Project
2. Enable Calendar API
3. Create credentials
4. Add to environment variables

### WhatsApp Integration
- Uses web WhatsApp with pre-filled messages
- Customizable phone number in environment

## 🌐 Deployment

Deploy to Vercel with automatic CI/CD:
```bash
vercel --prod
```

## 📊 Performance

- **Core Web Vitals Optimized**: Fast loading, responsive, stable
- **Image Optimization**: Next.js automatic optimization
- **Font Loading**: Optimized web fonts with fallbacks
- **Code Splitting**: Automatic route-based code splitting
- **SEO Optimized**: Structured data, meta tags, sitemap

---

Built with ❤️ for Marbella Hideaway - Where luxury meets tranquility.
