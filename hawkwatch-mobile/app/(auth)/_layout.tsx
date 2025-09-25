import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#000000' },
      headerTintColor: '#ffffff',
      contentStyle: { backgroundColor: '#000000' }
    }}>
      <Stack.Screen name="login" options={{ title: 'Sign In' }} />
      <Stack.Screen name="signup" options={{ title: 'Create Account' }} />
    </Stack>
  )
}