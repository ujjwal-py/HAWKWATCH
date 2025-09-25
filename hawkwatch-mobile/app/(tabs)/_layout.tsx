import { Tabs } from 'expo-router'
import { Camera, Video, Bell, User } from 'lucide-react-native'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#9C27B0',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#374151',
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#ffffff',
      }}
    >
      <Tabs.Screen
        name="live"
        options={{
          title: 'Live Analysis',
          tabBarIcon: ({ color, size }) => (
            <Camera color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="footages"
        options={{
          title: 'Footages',
          tabBarIcon: ({ color, size }) => (
            <Video color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Bell color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}
