import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../../services/supabase';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      navigation.replace('Main');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="shield" size={24} color="#22c55e" />
        <Text style={styles.headerTitle}>SecureGuard</Text>
      </View>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Logging in...' : 'Log In'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <TouchableOpacity style={styles.googleButton}>
          <MaterialIcons name="google" size={24} color="white" />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 60,
    gap: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  form: {
    gap: 16,
  },
  input: {
    height: 56,
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: 'white',
    fontSize: 16,
  },
  loginButton: {
    height: 56,
    backgroundColor: '#22c55e',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
  },
  signupLink: {
    color: '#4ade80',
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#374151',
  },
  dividerText: {
    color: '#6B7280',
    fontSize: 12,
    paddingHorizontal: 16,
    textTransform: 'uppercase',
  },
  googleButton: {
    height: 56,
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginScreen;