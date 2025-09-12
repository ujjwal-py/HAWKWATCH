import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AlertsScreen = ({ navigation }: any) => {
  const [showThreatModal, setShowThreatModal] = useState(true);

  const alerts = [
    { id: 1, title: 'Motion detected', location: 'Backyard - 10:30 AM', type: 'normal' },
    { id: 2, title: 'Door Unlocked', location: 'Front Door - 9:15 AM', type: 'normal' },
    { id: 3, title: 'Window Opened', location: 'Living Room - Yesterday', type: 'normal' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alerts</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content}>
        {alerts.map((alert) => (
          <View key={alert.id} style={styles.alertItem}>
            <View style={styles.alertIcon}>
              <MaterialIcons name="notifications" size={24} color="#38e07b" />
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertLocation}>{alert.location}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      
      {/* Threat Detection Modal */}
      <Modal
        visible={showThreatModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>⚠️</Text>
            <Text style={styles.modalTitle}>Threat detected!</Text>
            <Text style={styles.modalSubtitle}>
              Unusual activity detected near the main entrance.
            </Text>
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={() => setShowThreatModal(false)}
            >
              <Text style={styles.dismissButtonText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    gap: 16,
  },
  alertIcon: {
    backgroundColor: 'rgba(56, 224, 123, 0.2)',
    padding: 12,
    borderRadius: 20,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  alertLocation: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalContent: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  modalTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalSubtitle: {
    color: '#9CA3AF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  dismissButton: {
    backgroundColor: '#38e07b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: '100%',
  },
  dismissButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AlertsScreen;
