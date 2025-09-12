import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LiveAgentScreen = ({ navigation }: any) => {
  const [isMonitoring, setIsMonitoring] = useState(false);

  const eventLogs = [
    { id: 1, text: '✅ Person detected', time: '10:35 AM' },
    { id: 2, text: '⚠️ Suspicious movement', time: '10:32 AM' },
    { id: 3, text: '✅ Person detected', time: '10:30 AM' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.monitoringToggle}>
          <Text style={styles.monitoringLabel}>Monitoring:</Text>
          <Switch
            value={isMonitoring}
            onValueChange={setIsMonitoring}
            thumbColor="white"
            trackColor={{ false: '#2C2C2E', true: '#38e07b' }}
          />
        </View>
      </View>
      
      <View style={styles.cameraContainer}>
        <View style={styles.cameraPlaceholder}>
          <MaterialIcons name="videocam" size={80} color="#666" />
          <Text style={styles.cameraText}>Camera Feed</Text>
          {/* Bounding boxes overlay */}
          <View style={[styles.boundingBox, { top: '25%', left: '30%', width: '20%', height: '50%' }]} />
          <View style={[styles.boundingBox, { top: '40%', left: '65%', width: '15%', height: '40%' }]} />
        </View>
      </View>
      
      <View style={styles.eventSection}>
        <Text style={styles.eventTitle}>Event Log</Text>
        <ScrollView style={styles.eventList}>
          {eventLogs.map((event) => (
            <View key={event.id} style={styles.eventItem}>
              <Text style={styles.eventText}>{event.text}</Text>
              <Text style={styles.eventTime}>{event.time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      
      <TouchableOpacity style={styles.stopButton}>
        <MaterialIcons name="stop" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 60,
    backgroundColor: 'rgba(28, 28, 30, 0.8)',
  },
  monitoringToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  monitoringLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  cameraContainer: {
    margin: 16,
    aspectRatio: 4/3,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    color: '#9CA3AF',
    marginTop: 8,
    fontSize: 16,
  },
  boundingBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#38e07b',
  },
  eventSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  eventTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventList: {
    flex: 1,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  eventText: {
    color: 'white',
    fontSize: 16,
  },
  eventTime: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  stopButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    width: 64,
    height: 64,
    backgroundColor: '#EF4444',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default LiveAgentScreen;
