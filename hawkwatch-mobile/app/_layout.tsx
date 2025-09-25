import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-url-polyfill/auto'
import '../global.css'

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#000000" />
      <Stack screenOptions={{ 
        headerStyle: { backgroundColor: '#000000' },
        headerTintColor: '#ffffff',
        contentStyle: { backgroundColor: '#000000' }
      }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}