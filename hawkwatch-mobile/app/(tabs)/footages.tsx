import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Timestamp {
  timestamp: string
  description: string
  isDangerous?: boolean
}

interface SavedVideo {
  id: string
  name: string
  url: string
  thumbnailUrl: string
  timestamps: Timestamp[]
  createdAt: string
}

export default function FootagesScreen() {
  const [savedVideos, setSavedVideos] = useState<SavedVideo[]>([])
  const [selectedVideo, setSelectedVideo] = useState<SavedVideo | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    loadSavedVideos()
  }, [])

  const loadSavedVideos = async () => {
    try {
      const stored = await AsyncStorage.getItem('hawkwatch_videos')
      if (stored) {
        setSavedVideos(JSON.parse(stored))
      } else {
        // Load demo videos matching your web app data
        const demoVideos: SavedVideo[] = [
          {
            id: '1',
            name: 'Fighting0',
            url: '/videos/Fighting0.mp4',
            thumbnailUrl: '/placeholder.svg?height=120&width=160',
            createdAt: '2025-01-24T10:30:00Z',
            timestamps: [
              { timestamp: '00:02', description: 'Individual becomes aggressive and throws items behind bar', isDangerous: true },
              { timestamp: '00:25', description: 'Individual escalates destructive behavior', isDangerous: true },
              { timestamp: '00:46', description: 'Continued aggressive behavior and property damage', isDangerous: true }
            ]
          },
          {
            id: '2',
            name: 'Shoplifting1',
            url: '/videos/Shoplifting1.mp4',
            thumbnailUrl: '/placeholder.svg?height=120&width=160',
            createdAt: '2025-01-24T09:15:00Z',
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
            url: '/videos/Robbery1.mp4',
            thumbnailUrl: '/placeholder.svg?height=120&width=160',
            createdAt: '2025-01-24T08:45:00Z',
            timestamps: [
              { timestamp: '00:03', description: 'Individual enters store with hood up', isDangerous: true },
              { timestamp: '00:12', description: 'Approaches counter aggressively', isDangerous: true },
              { timestamp: '00:20', description: 'Demands money from cashier', isDangerous: true },
              { timestamp: '00:35', description: 'Flees scene with stolen goods', isDangerous: true }
            ]
          }
        ]
        setSavedVideos(demoVideos)
        await AsyncStorage.setItem('hawkwatch_videos', JSON.stringify(demoVideos))
      }
    } catch (error) {
      console.error('Error loading videos:', error)
    }
  }

  const selectVideo = (video: SavedVideo) => {
    setSelectedVideo(video)
    setIsPlaying(false)
  }

  const goBack = () => {
    setSelectedVideo(null)
    setIsPlaying(false)
  }

  const jumpToTimestamp = (timestamp: string) => {
    const [minutes, seconds] = timestamp.split(':').map(Number)
    const timeInMillis = (minutes * 60 + seconds) * 1000
    Alert.alert('Jump to Timestamp', `Would jump to ${timestamp} (${timeInMillis}ms)`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const renderVideoItem = ({ item }: { item: SavedVideo }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => selectVideo(item)}
    >
      <View style={styles.thumbnail}>
        <Ionicons name="videocam" size={40} color="#9C27B0" />
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.name}</Text>
        <Text style={styles.videoDate}>{formatDate(item.createdAt)}</Text>
        <Text style={styles.videoStats}>
          {item.timestamps.length} events • 
          {item.timestamps.filter(t => t.isDangerous).length} alerts
        </Text>
      </View>
      <View style={styles.videoStatus}>
        {item.timestamps.some(t => t.isDangerous) && (
          <View style={styles.alertBadge}>
            <Text style={styles.alertText}>⚠️</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  const renderTimestamp = ({ item }: { item: Timestamp }) => (
    <TouchableOpacity
      style={[
        styles.timestampItem,
        item.isDangerous && styles.dangerousTimestamp
      ]}
      onPress={() => jumpToTimestamp(item.timestamp)}
    >
      <Text style={styles.timestampTime}>{item.timestamp}</Text>
      <Text style={styles.timestampDesc}>{item.description}</Text>
      {item.isDangerous && (
        <Text style={styles.dangerLabel}>⚠️ ALERT</Text>
      )}
    </TouchableOpacity>
  )

  if (selectedVideo) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>{selectedVideo.name}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.videoPlayerContainer}>
          {/* Placeholder for video player - in production this would be expo-av Video component */}
          <View style={styles.videoPlaceholder}>
            <Ionicons name="play-circle" size={80} color="#9C27B0" />
            <Text style={styles.placeholderText}>Video Player</Text>
            <Text style={styles.placeholderSubtext}>
              {selectedVideo.name} • {selectedVideo.timestamps.length} events
            </Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={24} 
              color="#ffffff" 
            />
            <Text style={styles.controlText}>
              {isPlaying ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timelineSection}>
          <Text style={styles.timelineTitle}>
            Key Moments Timeline ({selectedVideo.timestamps.length})
          </Text>
          <FlatList
            data={selectedVideo.timestamps}
            renderItem={renderTimestamp}
            keyExtractor={(item, index) => index.toString()}
            style={styles.timestampList}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSimple}>
        <Text style={styles.title}>🎥 Video Footages</Text>
        <Text style={styles.subtitle}>Recorded surveillance videos with AI analysis</Text>
      </View>

      {savedVideos.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="videocam-off" size={64} color="#6b7280" />
          <Text style={styles.emptyTitle}>No Videos Found</Text>
          <Text style={styles.emptyText}>
            Start recording from the Live Analysis tab to see videos here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedVideos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          style={styles.videoList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerSimple: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(255, 255, 255, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#9C27B0',
    marginTop: 5,
  },
  videoList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 60,
    backgroundColor: '#374151',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  videoDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  videoStats: {
    fontSize: 12,
    color: '#6b7280',
  },
  videoStatus: {
    alignItems: 'center',
  },
  alertBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  alertText: {
    fontSize: 16,
  },
  videoPlayerContainer: {
    height: 250,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1f2937',
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 12,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9C27B0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  controlText: {
    color: '#ffffff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  timelineSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  timestampList: {
    flex: 1,
  },
  timestampItem: {
    backgroundColor: '#1f2937',
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#374151',
  },
  dangerousTimestamp: {
    backgroundColor: '#991b1b',
    borderLeftColor: '#ef4444',
  },
  timestampTime: {
    color: '#9C27B0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  timestampDesc: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
  },
  dangerLabel: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
})