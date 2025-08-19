import { 
  InstagramMedia, 
  InstagramApiResponse, 
  InstagramConfig,
  InstagramProfile 
} from '@/types/instagram'

const INSTAGRAM_CONFIG: InstagramConfig = {
  accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || '',
  userId: process.env.INSTAGRAM_USER_ID || '',
  apiVersion: 'v21.0'
}

const BASE_URL = `https://graph.instagram.com/${INSTAGRAM_CONFIG.apiVersion}`

export class InstagramAPI {
  private config: InstagramConfig

  constructor(config?: Partial<InstagramConfig>) {
    this.config = { ...INSTAGRAM_CONFIG, ...config }
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`)
    
    // Add access token and other params
    url.searchParams.append('access_token', this.config.accessToken)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    const response = await fetch(url.toString())
    
    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getProfile(): Promise<InstagramProfile> {
    return this.makeRequest<InstagramProfile>(`/${this.config.userId}`, {
      fields: 'id,username,account_type,media_count,followers_count'
    })
  }

  async getMedia(limit: number = 12): Promise<InstagramApiResponse<InstagramMedia>> {
    return this.makeRequest<InstagramApiResponse<InstagramMedia>>(`/${this.config.userId}/media`, {
      fields: 'id,media_type,media_url,permalink,caption,timestamp,thumbnail_url,children{media_url,media_type}',
      limit: limit.toString()
    })
  }

  async getMediaById(mediaId: string): Promise<InstagramMedia> {
    return this.makeRequest<InstagramMedia>(`/${mediaId}`, {
      fields: 'id,media_type,media_url,permalink,caption,timestamp,thumbnail_url,children{media_url,media_type}'
    })
  }

  async getHashtagMedia(hashtag: string): Promise<InstagramApiResponse<InstagramMedia>> {
    // Note: This requires Instagram Basic Display API and additional permissions
    // For now, we'll return mock data or implement when permissions are available
    console.warn(`Hashtag media for ${hashtag} requires additional Instagram permissions`)
    return { data: [] }
  }
}

// Mock data for development/demo purposes
export const mockInstagramData: InstagramMedia[] = [
  {
    id: '1',
    media_type: 'IMAGE',
    media_url: '/images/gallery/kitchen-interior.jpg',
    permalink: 'https://instagram.com/p/mock1',
    caption: 'Cooking up memories in our gourmet kitchen 👨‍🍳 #MarbellaHideaway',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    media_type: 'IMAGE',
    media_url: '/images/gallery/outdoor-dining-setup.jpg',
    permalink: 'https://instagram.com/p/mock2',
    caption: 'Al fresco dining under the Spanish sky ✨ #LuxuryVilla',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    media_type: 'IMAGE',
    media_url: '/images/gallery/villa-entrance-facade.jpg',
    permalink: 'https://instagram.com/p/mock3',
    caption: 'Welcome to your private Mediterranean escape 🏡',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    media_type: 'IMAGE',
    media_url: '/images/gallery/main-living-room.jpg',
    permalink: 'https://instagram.com/p/mock4',
    caption: 'Relaxing in luxury at Marbella Hideaway 🛋️',
    timestamp: new Date(Date.now() - 259200000).toISOString(),
  }
]

// Create singleton instance
export const instagramAPI = new InstagramAPI()

// Helper function to get Instagram data with fallback to mock data
export async function getInstagramContent(useMockData: boolean = true): Promise<InstagramMedia[]> {
  if (useMockData || !INSTAGRAM_CONFIG.accessToken) {
    return mockInstagramData
  }

  try {
    const response = await instagramAPI.getMedia(12)
    return response.data
  } catch (error) {
    console.error('Failed to fetch Instagram data:', error)
    return mockInstagramData
  }
}