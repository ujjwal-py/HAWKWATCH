import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import { Camera, CameraView } from 'expo-camera'
import { Ionicons } from '@expo/vector-icons'

interface Timestamp {
  timestamp: string
  description: string
  isDangerous: boolean
}

export default function LiveAnalysisScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [timestamps, setTimestamps] = useState<Timestamp[]>([])
  const [transcript, setTranscript] = useState('')
  const [facing, setFacing] = useState<'front' | 'back'>('back')
  const cameraRef = useRef<CameraView>(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const startRecording = async () => {
    if (!cameraRef.current) return

    try {
      setIsRecording(true)
      setIsAnalyzing(true)
      
      // Start real-time analysis (simplified for mobile)
      startAnalysisLoop()
      
    } catch (error) {
      console.error('Error starting recording:', error)
      Alert.alert('Error', 'Failed to start recording')
      setIsRecording(false)
      setIsAnalyzing(false)
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsAnalyzing(false)
  }

  const startAnalysisLoop = () => {
    // Simulate analysis every 3 seconds (like web app)
    const interval = setInterval(() => {
      if (!isRecording) {
        clearInterval(interval)
        return
      }
      
      analyzeFrame()
    }, 3000)
  }

  const analyzeFrame = async () => {
    try {
      // Simulate frame capture and analysis
      // In real implementation, this would use TensorFlow.js and Gemini API
      const mockEvents = [
        { description: 'Person detected in frame', isDangerous: false },
        { description: 'Suspicious movement detected', isDangerous: true },
        { description: 'Normal activity observed', isDangerous: false },
      ]
      
      const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)]
      const currentTime = new Date().toLocaleTimeString()
      
      if (Math.random() > 0.7) { // 30% chance of event
        const newTimestamp: Timestamp = {
          timestamp: currentTime,
          description: randomEvent.description,
          isDangerous: randomEvent.isDangerous
        }
        
        setTimestamps(prev => [...prev, newTimestamp])
        
        if (randomEvent.isDangerous) {
          Alert.alert('⚠️ Security Alert', randomEvent.description)
        }
      }
    } catch (error) {
      console.error('Analysis error:', error)
    }
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'))
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => Camera.requestCameraPermissionsAsync()}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🦅 Live Security Analysis</Text>
        <Text style={styles.subtitle}>AI-powered real-time monitoring</Text>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView 
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
        >
          <View style={styles.cameraOverlay}>
            {isAnalyzing && (
              <View style={styles.analysisIndicator}>
                <Text style={styles.analysisText}>🤖 Analyzing...</Text>
              </View>
            )}
          </View>
        </CameraView>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.flipButton}
          onPress={toggleCameraFacing}
        >
          <Ionicons name="camera-reverse" size={24} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.recordButton, isRecording && styles.recordingButton]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Ionicons 
            name={isRecording ? "stop" : "play"} 
            size={32} 
            color="#ffffff" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.flipButton}
          onPress={() => setTimestamps([])}
        >
          <Ionicons name="trash" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.timeline}>
        <Text style={styles.timelineTitle}>Event Timeline ({timestamps.length})</Text>
        <View style={styles.timestampList}>
          {timestamps.slice(-3).map((item, index) => (
            <View 
              key={index} 
              style={[
                styles.timestampItem,
                item.isDangerous && styles.dangerousItem
              ]}
            >
              <Text style={styles.timestampTime}>{item.timestamp}</Text>
              <Text style={styles.timestampDesc}>{item.description}</Text>
              {item.isDangerous && (
                <Text style={styles.dangerTag}>⚠️ ALERT</Text>
              )}
            </View>
          ))}
          {timestamps.length === 0 && (
            <Text style={styles.emptyText}>No events detected yet</Text>
          )}
        </View>
      </View>
    </View>
  )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
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
  cameraContainer: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 16,
  },
  analysisIndicator: {
    backgroundColor: 'rgba(156, 39, 176, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  analysisText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#ef4444',
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeline: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  timestampList: {
    maxHeight: 120,
  },
  timestampItem: {
    backgroundColor: '#1f2937',
    padding: 12,
    marginVertical: 2,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#374151',
  },
  dangerousItem: {
    backgroundColor: '#991b1b',
    borderLeftColor: '#ef4444',
  },
  timestampTime: {
    color: '#9C27B0',
    fontSize: 12,
    fontWeight: '600',
  },
  timestampDesc: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 2,
  },
  dangerTag: {
    color: '#fbbf24',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  },
  emptyText: {
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#9C27B0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
})
