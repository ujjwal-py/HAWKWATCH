import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View />
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <MaterialIcons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Welcome back, Alex</Text>
          <Text style={styles.welcomeSubtitle}>Your security agent is currently offline.</Text>
        </View>
        
        <View style={styles.videoContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/400x300/333/666?text=No+Feed' }}
            style={styles.videoPlaceholder}
          />
          <View style={styles.videoOverlay}>
            <MaterialIcons name="videocam-off" size={60} color="#6B7280" />
            <Text style={styles.videoText}>No live feed available</Text>
          </View>
        </View>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>People Detected</Text>
            <Text style={styles.statValue}>3</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Threats</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.goLiveButton}
          onPress={() => navigation.navigate('LiveAgent')}
        >
          <Text style={styles.goLiveText}>Go Live</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101713',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  welcome: {
    marginBottom: 24,
  },
  welcomeTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  welcomeSubtitle: {
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 4,
  },
  videoContainer: {
    aspectRatio: 16/9,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    opacity: 0.3,
  },
  videoOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    color: '#9CA3AF',
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1C2A22',
    padding: 16,
    borderRadius: 16,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
  },
  goLiveButton: {
    backgroundColor: '#4ade80',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goLiveText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
