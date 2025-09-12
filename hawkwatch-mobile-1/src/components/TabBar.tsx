import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const getTabIcon = (routeName: string, focused: boolean) => {
    let iconName: keyof typeof MaterialIcons.glyphMap = 'home';
    
    switch (routeName) {
      case 'Dashboard':
        iconName = 'dashboard';
        break;
      case 'LiveAgent':
        iconName = 'videocam';
        break;
      case 'Alerts':
        iconName = 'notifications';
        break;
      case 'Profile':
        iconName = 'person';
        break;
    }
    
    return (
      <MaterialIcons 
        name={iconName} 
        size={24} 
        color={focused ? '#38e07b' : '#9CA3AF'} 
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined 
            ? options.tabBarLabel 
            : options.title !== undefined 
            ? options.title 
            : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tab}
            >
              {getTabIcon(route.name, isFocused)}
              <Text style={[
                styles.tabLabel,
                { color: isFocused ? '#38e07b' : '#9CA3AF' }
              ]}>
                {label}
              </Text>
              {route.name === 'Alerts' && (
                <View style={styles.notificationBadge} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: '35%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#111827',
  },
});

export default TabBar;
