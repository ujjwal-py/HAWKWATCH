// Shared data structures and utilities matching the main web app

export interface Timestamp {
  timestamp: string
  description: string
  isDangerous?: boolean
}

export interface SavedVideo {
  id: string
  name: string
  url: string
  thumbnailUrl: string
  timestamps: Timestamp[]
  createdAt: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  type: 'danger' | 'warning' | 'info' | 'success'
  isRead: boolean
  location?: string
  severity?: 'high' | 'medium' | 'low'
}

// Demo data matching your web app's content
export const DEMO_VIDEOS: SavedVideo[] = [
  {
    id: '1',
    name: 'Fighting0',
    url: '../public/videos/Fighting0.mp4',
    thumbnailUrl: '../public/videos/Fighting0_thumbnail.jpg',
    createdAt: '2025-09-25T10:30:00Z',
    timestamps: [
      { timestamp: '00:02', description: 'Individual becomes aggressive and throws items behind bar', isDangerous: true },
      { timestamp: '00:25', description: 'Individual escalates destructive behavior', isDangerous: true },
      { timestamp: '00:46', description: 'Continued aggressive behavior and property damage', isDangerous: true }
    ]
  },
  {
    id: '2',
    name: 'Shoplifting1',
    url: '../public/videos/Shoplifting1.mp4',
    thumbnailUrl: '../public/videos/Shoplifting1_thumbnail.jpg',
    createdAt: '2025-09-25T09:15:00Z',
    timestamps: [
      { timestamp: '00:05', description: 'Person enters store and browses items normally', isDangerous: false },
      { timestamp: '00:18', description: 'Suspicious behavior: looking around frequently', isDangerous: true },
      { timestamp: '00:32', description: 'Item concealment detected', isDangerous: true },
      { timestamp: '00:45', description: 'Person exits without paying', isDangerous: true }
    ]
  },
  {
    id: '3',
    name: 'Robbery1',
    url: '../public/videos/Robbery1.mp4',
    thumbnailUrl: '../public/videos/Robbery1_thumbnail.jpg',
    createdAt: '2025-09-25T08:45:00Z',
    timestamps: [
      { timestamp: '00:03', description: 'Individual enters store with hood up', isDangerous: true },
      { timestamp: '00:12', description: 'Approaches counter aggressively', isDangerous: true },
      { timestamp: '00:20', description: 'Demands money from cashier', isDangerous: true },
      { timestamp: '00:35', description: 'Flees scene with stolen goods', isDangerous: true }
    ]
  }
]

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'DANGER: Robbery Detected',
    message: 'Individual enters store with hood up and approaches counter aggressively',
    timestamp: '2025-09-25T10:30:00Z',
    type: 'danger',
    isRead: false,
    location: 'Camera 1 - Front Entrance',
    severity: 'high'
  },
  {
    id: '2',
    title: 'WARNING: Suspicious Behavior',
    message: 'Person showing unusual movement patterns near restricted area',
    timestamp: '2025-09-25T09:15:00Z',
    type: 'warning',
    isRead: false,
    location: 'Camera 3 - Storage Area',
    severity: 'medium'
  },
  {
    id: '3',
    title: 'ALERT: Fighting Detected',
    message: 'Aggressive behavior and property damage detected',
    timestamp: '2025-09-25T08:45:00Z',
    type: 'danger',
    isRead: true,
    location: 'Camera 2 - Bar Area',
    severity: 'high'
  },
  {
    id: '4',
    title: 'INFO: System Update',
    message: 'HawkWatch AI analysis models updated successfully',
    timestamp: '2025-09-25T08:00:00Z',
    type: 'info',
    isRead: true,
    location: 'System',
    severity: 'low'
  },
  {
    id: '5',
    title: 'WARNING: Shoplifting Attempt',
    message: 'Item concealment detected, person exits without paying',
    timestamp: '2025-09-25T07:30:00Z',
    type: 'warning',
    isRead: false,
    location: 'Camera 4 - Retail Floor',
    severity: 'medium'
  }
]

// Analysis patterns matching your web app's AI detection
export const THREAT_PATTERNS = {
  fighting: {
    keywords: ['aggressive', 'violence', 'fighting', 'attack', 'assault'],
    severity: 'high',
    color: '#ef4444'
  },
  robbery: {
    keywords: ['robbery', 'theft', 'steal', 'weapon', 'threaten'],
    severity: 'high',
    color: '#ef4444'
  },
  shoplifting: {
    keywords: ['shoplifting', 'concealment', 'hiding', 'suspicious'],
    severity: 'medium',
    color: '#f59e0b'
  },
  loitering: {
    keywords: ['loitering', 'lingering', 'suspicious behavior'],
    severity: 'low',
    color: '#3b82f6'
  }
}

// Utility functions matching web app logic
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  
  if (diffInHours < 1) {
    const minutes = Math.floor(diffInHours * 60)
    return `${minutes}m ago`
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`
  } else {
    return date.toLocaleDateString()
  }
}

export const getThreatLevel = (timestamps: Timestamp[]): 'high' | 'medium' | 'low' => {
  const dangerousCount = timestamps.filter(t => t.isDangerous).length
  const totalCount = timestamps.length
  const ratio = dangerousCount / totalCount
  
  if (ratio > 0.7) return 'high'
  if (ratio > 0.3) return 'medium'
  return 'low'
}

export const getNotificationIcon = (type: string): string => {
  switch (type) {
    case 'danger':
      return 'warning'
    case 'warning':
      return 'alert-circle'
    case 'info':
      return 'information-circle'
    case 'success':
      return 'checkmark-circle'
    default:
      return 'notifications'
  }
}

export const getNotificationColor = (type: string): string => {
  switch (type) {
    case 'danger':
      return '#ef4444'
    case 'warning':
      return '#f59e0b'
    case 'info':
      return '#3b82f6'
    case 'success':
      return '#10b981'
    default:
      return '#6b7280'
  }
}