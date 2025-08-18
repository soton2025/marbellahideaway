export interface InstagramMedia {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  permalink: string
  caption?: string
  timestamp: string
  thumbnail_url?: string
  children?: {
    data: InstagramMedia[]
  }
}

export interface InstagramStory {
  id: string
  media_type: 'IMAGE' | 'VIDEO'
  media_url: string
  thumbnail_url?: string
  timestamp: string
}

export interface InstagramHighlight {
  id: string
  title: string
  cover_media: {
    media_url: string
  }
  stories: InstagramStory[]
}

export interface InstagramProfile {
  id: string
  username: string
  account_type: string
  media_count: number
  followers_count?: number
}

export interface InstagramApiResponse<T> {
  data: T[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
    previous?: string
  }
}

export interface InstagramConfig {
  accessToken: string
  userId: string
  apiVersion: string
}