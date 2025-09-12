import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SplashScreen = ({ navigation }: any) => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconInner}>
            <MaterialIcons name="security" size={80} color="white" />
          </View>
        </View>
        <Text style={styles.title}>Guardian Shield</Text>
        <Text style={styles.subtitle}>Protecting your world</Text>
      </View>
      
      <View style={styles.loading}>
        <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#122118',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: 100,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  iconInner: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 25,
    borderRadius: 50,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 18,
  },
  loading: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  spinner: {
    width: 64,
    height: 64,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#38e07b',
    borderRadius: 32,
    marginBottom: 16,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
});

export default SplashScreen;
