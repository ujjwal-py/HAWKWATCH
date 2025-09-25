import { ImageSourcePropType } from 'react-native'

// Shared assets from the main web app
export const SHARED_ASSETS = {
  logo: require('../../public/HawkWatchLogo.png'),
  cat1: require('../../public/cat1.png'),
  cupcakes: require('../../public/cupcakes.png'),
  tableWithThings: require('../../public/tableWithThings.jpg'),
  
  // Video assets
  videos: {
    fighting0: '../../public/videos/Fighting0.mp4',
    fighting1: '../../public/videos/Fighting1.mp4',
    robbery1: '../../public/videos/Robbery1.mp4',
    shoplifting1: '../../public/videos/Shoplifting1.mp4',
  },
  
  // GIF assets
  gifs: {
    gallery: '../../public/gifs/gallary.gif',
  },
  
  // Bounding boxes data
  boundingBoxes: {
    fighting0: '../../public/bounding_boxes/Fighting0_boxes.json',
    fighting1: '../../public/bounding_boxes/Fighting1_boxes.json',
    robbery1: '../../public/bounding_boxes/Robbery1_boxes.json',
  }
}

// Theme constants matching the main web app
export const THEME = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    primary: '#9C27B0', // Purple accent
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    danger: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    }
  }
}

// Glass morphism effect styles matching web app
export const GLASS_EFFECT = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)', // Note: Limited support in React Native
}

// Common component styles matching web design
export const COMMON_STYLES = {
  container: {
    flex: 1,
    backgroundColor: THEME.colors.black,
  },
  
  header: {
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.gray[700],
  },
  
  headerTitle: {
    fontSize: THEME.fontSize.xl,
    fontWeight: 'bold' as const,
    color: THEME.colors.white,
    textShadowColor: 'rgba(255, 255, 255, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  
  card: {
    backgroundColor: THEME.colors.gray[800],
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    marginVertical: THEME.spacing.sm,
    borderWidth: 1,
    borderColor: THEME.colors.gray[700],
    ...THEME.shadows.md,
  },
  
  button: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  
  buttonText: {
    color: THEME.colors.white,
    fontSize: THEME.fontSize.base,
    fontWeight: '600' as const,
  },
  
  dangerButton: {
    backgroundColor: THEME.colors.danger,
  },
  
  warningButton: {
    backgroundColor: THEME.colors.warning,
  },
}