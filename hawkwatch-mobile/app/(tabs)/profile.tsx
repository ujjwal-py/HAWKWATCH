import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface UserProfile {
  email: string
  fullName: string
  organization?: string
  role?: string
  joinDate: string
  lastActive: string
}

interface AppSettings {
  darkMode: boolean
  notifications: boolean
  autoRecording: boolean
  highSensitivity: boolean
  saveToCloud: boolean
  dataRetention: number // days
}

export default function ProfileScreen() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [settings, setSettings] = useState<AppSettings>({
    darkMode: true,
    notifications: true,
    autoRecording: false,
    highSensitivity: false,
    saveToCloud: true,
    dataRetention: 30
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserProfile()
    loadAppSettings()
  }, [])

  const loadUserProfile = async () => {
    try {
      // Get current user from Supabase
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        console.error('Error fetching user:', error)
        setLoading(false)
        return
      }

      if (user) {
        const profile: UserProfile = {
          email: user.email || 'demo@hawkwatch.com',
          fullName: user.user_metadata?.full_name || 'Demo User',
          organization: 'Security Solutions Inc.',
          role: 'Security Manager',
          joinDate: user.created_at || '2025-01-01T00:00:00Z',
          lastActive: new Date().toISOString()
        }
        setUser(profile)
      } else {
        // Demo user if not logged in
        setUser({
          email: 'demo@hawkwatch.com',
          fullName: 'Demo User',
          organization: 'Security Solutions Inc.',
          role: 'Security Manager',
          joinDate: '2025-01-01T00:00:00Z',
          lastActive: new Date().toISOString()
        })
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadAppSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem('hawkwatch_app_settings')
      if (stored) {
        setSettings(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading app settings:', error)
    }
  }

  const saveAppSettings = async (newSettings: AppSettings) => {
    try {
      await AsyncStorage.setItem('hawkwatch_app_settings', JSON.stringify(newSettings))
      setSettings(newSettings)
    } catch (error) {
      console.error('Error saving app settings:', error)
    }
  }

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await supabase.auth.signOut()
              router.replace('/(auth-pages)/sign-in')
            } catch (error) {
              console.error('Error signing out:', error)
              Alert.alert('Error', 'Failed to sign out. Please try again.')
            }
          }
        }
      ]
    )
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all associated data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Feature Not Available', 'Account deletion is not available in the demo version.')
          }
        }
      ]
    )
  }

  const exportData = () => {
    Alert.alert('Export Data', 'Data export functionality will be available in the full version.')
  }

  const contactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Need help? Contact our support team:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Email Support', onPress: () => Alert.alert('Info', 'Email: support@hawkwatch.ai') },
        { text: 'Call Support', onPress: () => Alert.alert('Info', 'Phone: +1 (555) 123-4567') }
      ]
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return 'Active now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👤 Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </Text>
          </View>
        </View>
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.fullName}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          {user?.organization && (
            <Text style={styles.userOrganization}>{user.organization}</Text>
          )}
          {user?.role && (
            <Text style={styles.userRole}>{user.role}</Text>
          )}
        </View>

        <View style={styles.userStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatDate(user?.joinDate || '')}</Text>
            <Text style={styles.statLabel}>Member Since</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatLastActive(user?.lastActive || '')}</Text>
            <Text style={styles.statLabel}>Last Active</Text>
          </View>
        </View>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="moon" size={20} color="#9C27B0" />
            <Text style={styles.settingLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={settings.darkMode}
            onValueChange={(value) => saveAppSettings({ ...settings, darkMode: value })}
            trackColor={{ false: '#374151', true: '#9C27B0' }}
            thumbColor={settings.darkMode ? '#ffffff' : '#9ca3af'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications" size={20} color="#9C27B0" />
            <Text style={styles.settingLabel}>Push Notifications</Text>
          </View>
          <Switch
            value={settings.notifications}
            onValueChange={(value) => saveAppSettings({ ...settings, notifications: value })}
            trackColor={{ false: '#374151', true: '#9C27B0' }}
            thumbColor={settings.notifications ? '#ffffff' : '#9ca3af'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="play-circle" size={20} color="#9C27B0" />
            <Text style={styles.settingLabel}>Auto Recording</Text>
          </View>
          <Switch
            value={settings.autoRecording}
            onValueChange={(value) => saveAppSettings({ ...settings, autoRecording: value })}
            trackColor={{ false: '#374151', true: '#9C27B0' }}
            thumbColor={settings.autoRecording ? '#ffffff' : '#9ca3af'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="eye" size={20} color="#9C27B0" />
            <Text style={styles.settingLabel}>High Sensitivity Mode</Text>
          </View>
          <Switch
            value={settings.highSensitivity}
            onValueChange={(value) => saveAppSettings({ ...settings, highSensitivity: value })}
            trackColor={{ false: '#374151', true: '#9C27B0' }}
            thumbColor={settings.highSensitivity ? '#ffffff' : '#9ca3af'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="cloud-upload" size={20} color="#9C27B0" />
            <Text style={styles.settingLabel}>Save to Cloud</Text>
          </View>
          <Switch
            value={settings.saveToCloud}
            onValueChange={(value) => saveAppSettings({ ...settings, saveToCloud: value })}
            trackColor={{ false: '#374151', true: '#9C27B0' }}
            thumbColor={settings.saveToCloud ? '#ffffff' : '#9ca3af'}
          />
        </View>
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.actionItem} onPress={exportData}>
          <Ionicons name="download" size={20} color="#3b82f6" />
          <Text style={styles.actionText}>Export My Data</Text>
          <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={contactSupport}>
          <Ionicons name="help-circle" size={20} color="#10b981" />
          <Text style={styles.actionText}>Contact Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={handleDeleteAccount}>
          <Ionicons name="trash" size={20} color="#ef4444" />
          <Text style={[styles.actionText, { color: '#ef4444' }]}>Delete Account</Text>
          <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Sign Out Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Ionicons name="log-out" size={20} color="#ffffff" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appName}>HawkWatch Mobile</Text>
        <Text style={styles.appVersion}>Version 1.0.0 (Beta)</Text>
        <Text style={styles.appDescription}>
          AI-powered security surveillance system
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(255, 255, 255, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#9C27B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 8,
  },
  userOrganization: {
    fontSize: 14,
    color: '#9C27B0',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#6b7280',
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#374151',
    marginHorizontal: 20,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  actionText: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
    marginLeft: 12,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    paddingVertical: 16,
    borderRadius: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9C27B0',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
})
