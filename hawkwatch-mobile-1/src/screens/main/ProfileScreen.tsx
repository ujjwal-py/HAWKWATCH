import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../../services/supabase';

const ProfileScreen = ({ navigation }: any) => {
  const [sensitivity, setSensitivity] = useState('Low');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace('Login');
  };

  const sensitivityOptions = ['Low', 'Medium', 'High'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/128x128/666/fff?text=EC' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <MaterialIcons name="edit" size={16} color="#111827" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Ethan Carter</Text>
            <Text style={styles.userRole}>Security Agent</Text>
            <Text style={styles.userId}>ID: 12345</Text>
          </View>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingCard}>
            <Text style={styles.settingTitle}>Model Sensitivity</Text>
            <Text style={styles.settingDescription}>
              Adjust the sensitivity of the detection models.
            </Text>
            
            <View style={styles.sensitivityToggle}>
              {sensitivityOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.sensitivityOption,
                    sensitivity === option && styles.activeSensitivityOption
                  ]}
                  onPress={() => setSensitivity(option)}
                >
                  <Text style={[
                    styles.sensitivityText,
                    sensitivity === option && styles.activeSensitivityText
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 48,
    gap: 24,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#38e07b',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userRole: {
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 4,
  },
  userId: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 2,
  },
  settingsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#9CA3AF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  settingCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 16,
  },
  settingTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 16,
  },
  sensitivityToggle: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    borderRadius: 24,
    padding: 4,
  },
  sensitivityOption: {
    flex: 1,
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeSensitivityOption: {
    backgroundColor: '#38e07b',
  },
  sensitivityText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  activeSensitivityText: {
    color: '#111827',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;