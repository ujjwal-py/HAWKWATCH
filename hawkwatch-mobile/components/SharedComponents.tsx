import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { THEME } from '../lib/shared-assets'

interface SecurityAlertModalProps {
  visible: boolean
  title: string
  message: string
  type: 'danger' | 'warning' | 'info' | 'success'
  onClose: () => void
  onAction?: () => void
  actionText?: string
}

export const SecurityAlertModal: React.FC<SecurityAlertModalProps> = ({
  visible,
  title,
  message,
  type,
  onClose,
  onAction,
  actionText = 'OK'
}) => {
  if (!visible) return null

  const getAlertColor = () => {
    switch (type) {
      case 'danger':
        return THEME.colors.danger
      case 'warning':
        return THEME.colors.warning
      case 'info':
        return THEME.colors.info
      case 'success':
        return THEME.colors.success
      default:
        return THEME.colors.gray[500]
    }
  }

  const getAlertIcon = () => {
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

  return (
    <View style={styles.overlay}>
      <View style={[styles.modal, { borderLeftColor: getAlertColor() }]}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: getAlertColor() }]}>
            <Ionicons name={getAlertIcon()} size={24} color={THEME.colors.white} />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <Text style={styles.message}>{message}</Text>
        
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          
          {onAction && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: getAlertColor() }]}
              onPress={onAction}
            >
              <Text style={styles.actionButtonText}>{actionText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

interface TimestampListProps {
  timestamps: Array<{
    timestamp: string
    description: string
    isDangerous?: boolean
  }>
  onTimestampPress?: (timestamp: string) => void
}

export const TimestampList: React.FC<TimestampListProps> = ({
  timestamps,
  onTimestampPress
}) => {
  return (
    <View style={styles.timestampContainer}>
      {timestamps.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.timestampItem,
            item.isDangerous && styles.dangerousTimestamp
          ]}
          onPress={() => onTimestampPress?.(item.timestamp)}
        >
          <Text style={styles.timestampTime}>{item.timestamp}</Text>
          <Text style={styles.timestampDesc}>{item.description}</Text>
          {item.isDangerous && (
            <Text style={styles.dangerLabel}>⚠️ ALERT</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  )
}

interface EventFeedProps {
  events: Array<{
    id: string
    time: string
    description: string
    type: 'normal' | 'warning' | 'danger'
  }>
}

export const EventFeed: React.FC<EventFeedProps> = ({ events }) => {
  const getEventColor = (type: string) => {
    switch (type) {
      case 'danger':
        return THEME.colors.danger
      case 'warning':
        return THEME.colors.warning
      default:
        return THEME.colors.gray[400]
    }
  }

  return (
    <View style={styles.eventFeed}>
      {events.map((event) => (
        <View key={event.id} style={styles.eventItem}>
          <View style={[styles.eventDot, { backgroundColor: getEventColor(event.type) }]} />
          <View style={styles.eventContent}>
            <Text style={styles.eventTime}>{event.time}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

interface StatsOverviewProps {
  stats: {
    totalEvents: number
    dangerousEvents: number
    activeAlerts: number
    systemStatus: 'online' | 'offline' | 'maintenance'
  }
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const getStatusColor = () => {
    switch (stats.systemStatus) {
      case 'online':
        return THEME.colors.success
      case 'offline':
        return THEME.colors.danger
      case 'maintenance':
        return THEME.colors.warning
      default:
        return THEME.colors.gray[500]
    }
  }

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.totalEvents}</Text>
        <Text style={styles.statLabel}>Total Events</Text>
      </View>
      
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: THEME.colors.danger }]}>
          {stats.dangerousEvents}
        </Text>
        <Text style={styles.statLabel}>Dangerous Events</Text>
      </View>
      
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: THEME.colors.warning }]}>
          {stats.activeAlerts}
        </Text>
        <Text style={styles.statLabel}>Active Alerts</Text>
      </View>
      
      <View style={styles.statItem}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
        <Text style={[styles.statLabel, { color: getStatusColor() }]}>
          {stats.systemStatus.toUpperCase()}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: THEME.colors.gray[800],
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.xl,
    marginHorizontal: THEME.spacing.lg,
    borderLeftWidth: 4,
    minWidth: 300,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  title: {
    fontSize: THEME.fontSize.lg,
    fontWeight: 'bold',
    color: THEME.colors.white,
    flex: 1,
  },
  message: {
    fontSize: THEME.fontSize.base,
    color: THEME.colors.gray[300],
    lineHeight: 22,
    marginBottom: THEME.spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: THEME.spacing.md,
  },
  button: {
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.sm,
    borderRadius: THEME.borderRadius.md,
    minWidth: 80,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: THEME.colors.gray[600],
  },
  closeButtonText: {
    color: THEME.colors.gray[300],
    fontSize: THEME.fontSize.base,
  },
  actionButtonText: {
    color: THEME.colors.white,
    fontSize: THEME.fontSize.base,
    fontWeight: '600',
  },
  timestampContainer: {
    flex: 1,
  },
  timestampItem: {
    backgroundColor: THEME.colors.gray[800],
    padding: THEME.spacing.md,
    marginVertical: 4,
    borderRadius: THEME.borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: THEME.colors.gray[700],
  },
  dangerousTimestamp: {
    backgroundColor: '#991b1b',
    borderLeftColor: THEME.colors.danger,
  },
  timestampTime: {
    color: THEME.colors.primary,
    fontSize: THEME.fontSize.sm,
    fontWeight: '600',
    marginBottom: 4,
  },
  timestampDesc: {
    color: THEME.colors.white,
    fontSize: THEME.fontSize.sm,
    lineHeight: 20,
  },
  dangerLabel: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
  },
  eventFeed: {
    flex: 1,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.md,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: THEME.spacing.sm,
  },
  eventContent: {
    flex: 1,
  },
  eventTime: {
    fontSize: THEME.fontSize.xs,
    color: THEME.colors.gray[400],
    marginBottom: 2,
  },
  eventDescription: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.white,
    lineHeight: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: THEME.colors.gray[800],
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: THEME.fontSize['2xl'],
    fontWeight: 'bold',
    color: THEME.colors.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: THEME.fontSize.xs,
    color: THEME.colors.gray[400],
    textAlign: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
})