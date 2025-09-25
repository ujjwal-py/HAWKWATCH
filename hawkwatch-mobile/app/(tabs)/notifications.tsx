import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

interface NotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  type: 'danger' | 'warning' | 'info' | 'success'
  isRead: boolean
  location?: string
  severity?: 'high' | 'medium' | 'low'
}

interface NotificationSettings {
  pushEnabled: boolean
  emailEnabled: boolean
  dangerAlerts: boolean
  warningAlerts: boolean
  infoAlerts: boolean
  quietHours: boolean
  quietStart: string
  quietEnd: string
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [settings, setSettings] = useState<NotificationSettings>({
    pushEnabled: true,
    emailEnabled: false,
    dangerAlerts: true,
    warningAlerts: true,
    infoAlerts: false,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00'
  })
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    loadNotifications()
    loadSettings()
    setupNotificationHandler()
  }, [])

  const setupNotificationHandler = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    })
  }

  const loadNotifications = async () => {
    try {
      const stored = await AsyncStorage.getItem('hawkwatch_notifications')
      if (stored) {
        setNotifications(JSON.parse(stored))
      } else {
        // Load demo notifications matching your web app's alert system
        const demoNotifications: NotificationItem[] = [
          {
            id: '1',
            title: 'DANGER: Robbery Detected',
            message: 'Individual enters store with hood up and approaches counter aggressively',
            timestamp: '2025-01-24T10:30:00Z',
            type: 'danger',
            isRead: false,
            location: 'Camera 1 - Front Entrance',
            severity: 'high'
          },
          {
            id: '2',
            title: 'WARNING: Suspicious Behavior',
            message: 'Person showing unusual movement patterns near restricted area',
            timestamp: '2025-01-24T09:15:00Z',
            type: 'warning',
            isRead: false,
            location: 'Camera 3 - Storage Area',
            severity: 'medium'
          },
          {
            id: '3',
            title: 'ALERT: Fighting Detected',
            message: 'Aggressive behavior and property damage detected',
            timestamp: '2025-01-24T08:45:00Z',
            type: 'danger',
            isRead: true,
            location: 'Camera 2 - Bar Area',
            severity: 'high'
          },
          {
            id: '4',
            title: 'INFO: System Update',
            message: 'HawkWatch AI analysis models updated successfully',
            timestamp: '2025-01-24T08:00:00Z',
            type: 'info',
            isRead: true,
            location: 'System',
            severity: 'low'
          },
          {
            id: '5',
            title: 'WARNING: Shoplifting Attempt',
            message: 'Item concealment detected, person exits without paying',
            timestamp: '2025-01-24T07:30:00Z',
            type: 'warning',
            isRead: false,
            location: 'Camera 4 - Retail Floor',
            severity: 'medium'
          }
        ]
        setNotifications(demoNotifications)
        await AsyncStorage.setItem('hawkwatch_notifications', JSON.stringify(demoNotifications))
      }
    } catch (error) {
      console.error('Error loading notifications:', error)
    }
  }

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem('hawkwatch_notification_settings')
      if (stored) {
        setSettings(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }

  const saveSettings = async (newSettings: NotificationSettings) => {
    try {
      await AsyncStorage.setItem('hawkwatch_notification_settings', JSON.stringify(newSettings))
      setSettings(newSettings)
    } catch (error) {
      console.error('Error saving settings:', error)
    }
  }

  const markAsRead = async (notificationId: string) => {
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    )
    setNotifications(updated)
    await AsyncStorage.setItem('hawkwatch_notifications', JSON.stringify(updated))
  }

  const markAllAsRead = async () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }))
    setNotifications(updated)
    await AsyncStorage.setItem('hawkwatch_notifications', JSON.stringify(updated))
  }

  const clearAllNotifications = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to delete all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            setNotifications([])
            await AsyncStorage.removeItem('hawkwatch_notifications')
          }
        }
      ]
    )
  }

  const formatTimestamp = (timestamp: string) => {
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

  const getNotificationIcon = (type: string, severity?: string) => {
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

  const getNotificationColor = (type: string) => {
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

  const renderNotificationItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !item.isRead && styles.unreadNotification
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={[
        styles.notificationIcon,
        { backgroundColor: getNotificationColor(item.type) }
      ]}>
        <Ionicons 
          name={getNotificationIcon(item.type, item.severity)} 
          size={24} 
          color="#ffffff" 
        />
      </View>
      
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{formatTimestamp(item.timestamp)}</Text>
        </View>
        
        <Text style={styles.notificationMessage}>{item.message}</Text>
        
        {item.location && (
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={12} color="#9ca3af" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        )}
        
        {item.severity && (
          <View style={[
            styles.severityBadge,
            { backgroundColor: item.severity === 'high' ? '#ef4444' : 
                             item.severity === 'medium' ? '#f59e0b' : '#6b7280' }
          ]}>
            <Text style={styles.severityText}>{item.severity.toUpperCase()}</Text>
          </View>
        )}
      </View>
      
      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  )

  const renderSettingsSection = () => (
    <View style={styles.settingsContainer}>
      <Text style={styles.settingsTitle}>Notification Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Push Notifications</Text>
        <Switch
          value={settings.pushEnabled}
          onValueChange={(value) => saveSettings({ ...settings, pushEnabled: value })}
          trackColor={{ false: '#374151', true: '#9C27B0' }}
          thumbColor={settings.pushEnabled ? '#ffffff' : '#9ca3af'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Danger Alerts</Text>
        <Switch
          value={settings.dangerAlerts}
          onValueChange={(value) => saveSettings({ ...settings, dangerAlerts: value })}
          trackColor={{ false: '#374151', true: '#ef4444' }}
          thumbColor={settings.dangerAlerts ? '#ffffff' : '#9ca3af'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Warning Alerts</Text>
        <Switch
          value={settings.warningAlerts}
          onValueChange={(value) => saveSettings({ ...settings, warningAlerts: value })}
          trackColor={{ false: '#374151', true: '#f59e0b' }}
          thumbColor={settings.warningAlerts ? '#ffffff' : '#9ca3af'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Info Notifications</Text>
        <Switch
          value={settings.infoAlerts}
          onValueChange={(value) => saveSettings({ ...settings, infoAlerts: value })}
          trackColor={{ false: '#374151', true: '#3b82f6' }}
          thumbColor={settings.infoAlerts ? '#ffffff' : '#9ca3af'}
        />
      </View>
    </View>
  )

  const unreadCount = notifications.filter(n => !n.isRead).length

  if (showSettings) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowSettings(false)}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.placeholder} />
        </View>
        {renderSettingsSection()}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          🔔 Notifications {unreadCount > 0 && `(${unreadCount})`}
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setShowSettings(true)}
          >
            <Ionicons name="settings" size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Ionicons name="checkmark-done" size={20} color={unreadCount > 0 ? "#ffffff" : "#6b7280"} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={clearAllNotifications}
          >
            <Ionicons name="trash" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="notifications-off" size={64} color="#6b7280" />
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptyText}>
            All security alerts and system notifications will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          style={styles.notificationList}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(255, 255, 255, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  placeholder: {
    width: 40,
  },
  notificationList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#374151',
    position: 'relative',
  },
  unreadNotification: {
    borderColor: '#9C27B0',
    backgroundColor: '#1e1b4b',
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    marginRight: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 4,
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  severityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  unreadDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9C27B0',
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
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  settingLabel: {
    fontSize: 16,
    color: '#ffffff',
  },
})