import { CSSProperties } from 'react';
import type { Theme } from '../types';

// Base color palette
const colors = {
  primary: '#007acc',
  secondary: '#333',
  background: '#f5f5f5',
  white: '#fff',
  gray: {
    50: '#f8f9fa',
    100: '#e9ecef',
    300: '#ddd',
    500: '#666',
    600: '#495057',
    700: '#6c757d',
  },
  blue: {
    50: '#f0f8ff',
    500: '#007acc',
  },
} as const;

// Base spacing
const spacing = {
  xs: '5px',
  sm: '10px',
  md: '15px',
  lg: '20px',
  xl: '30px',
} as const;

// Base border radius
const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
} as const;

// Base shadows
const shadows = {
  sm: '0 2px 4px rgba(0,0,0,0.1)',
  md: '0 4px 8px rgba(0,0,0,0.1)',
} as const;

// Base card style that can be reused
const baseCard: CSSProperties = {
  backgroundColor: colors.white,
  padding: spacing.lg,
  borderRadius: borderRadius.lg,
  boxShadow: shadows.sm,
  marginBottom: spacing.xl,
};

// Base button style
const baseButton: CSSProperties = {
  border: `1px solid ${colors.gray[300]}`,
  borderRadius: borderRadius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: colors.white,
  padding: spacing.md,
};

// Demo page styles
export const demoStyles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: spacing.lg,
    minHeight: '100vh',
    backgroundColor: colors.background,
  } as CSSProperties,

  title: {
    color: colors.secondary,
    marginBottom: spacing.xl,
  } as CSSProperties,

  configurationCard: {
    ...baseCard,
  } as CSSProperties,

  sectionTitle: {
    color: colors.gray[500],
    marginBottom: spacing.lg,
  } as CSSProperties,

  demoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: spacing.md,
    marginBottom: spacing.lg,
  } as CSSProperties,

  demoButton: (isSelected: boolean): CSSProperties => ({
    ...baseButton,
    border: isSelected ? `2px solid ${colors.primary}` : `1px solid ${colors.gray[300]}`,
    backgroundColor: isSelected ? colors.blue[50] : colors.white,
    textAlign: 'left',
  }),

  demoButtonTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  } as CSSProperties,

  demoButtonDescription: {
    fontSize: '0.9em',
    color: colors.gray[500],
  } as CSSProperties,

  configDisplay: {
    padding: spacing.md,
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.sm,
    border: `1px solid ${colors.gray[100]}`,
  } as CSSProperties,

  configTitle: {
    margin: '0 0 10px 0',
    color: colors.gray[600],
  } as CSSProperties,

  configCode: {
    margin: 0,
    fontSize: '0.9em',
    color: colors.gray[700],
    whiteSpace: 'pre-wrap',
  } as CSSProperties,

  themeCard: {
    ...baseCard,
  } as CSSProperties,

  themeButtonContainer: {
    display: 'flex',
    gap: spacing.sm,
    flexWrap: 'wrap',
  } as CSSProperties,

  themeButton: (backgroundColor: string): CSSProperties => ({
    padding: `${spacing.sm} ${spacing.md}`,
    border: `1px solid ${colors.gray[300]}`,
    borderRadius: borderRadius.sm,
    backgroundColor,
    color: colors.white,
    cursor: 'pointer',
    textTransform: 'capitalize',
  }),

  themeNote: {
    fontSize: '0.9em',
    color: colors.gray[500],
    marginTop: spacing.sm,
  } as CSSProperties,

  instructionsCard: {
    ...baseCard,
    marginBottom: 0, // Last card, no bottom margin
  } as CSSProperties,

  instructionsList: {
    color: colors.gray[500],
    lineHeight: '1.6',
  } as CSSProperties,
};

// Theme configurations for the demo
export const demoThemes: Record<string, Theme> = {
  blue: {
    primary: '#007acc',
    accent: '#005a9e',
    bubbleColor: '#0066cc',
  },
  green: {
    primary: '#28a745',
    accent: '#1e7e34',
    bubbleColor: '#20c997',
  },
  purple: {
    primary: '#6f42c1',
    accent: '#5a32a3',
    bubbleColor: '#8a63d2',
  },
  red: {
    primary: '#dc3545',
    accent: '#c82333',
    bubbleColor: '#e55353',
  },
};

// Demo configuration data
export const demoConfigurations = [
  {
    id: 'basic',
    title: 'Basic Widget',
    description: 'Default configuration with persistence enabled',
  },
  {
    id: 'no-persist',
    title: 'No Persistence',
    description: 'Widget without localStorage persistence',
  },
  {
    id: 'initially-open',
    title: 'Initially Open',
    description: 'Widget that starts in open state',
  },
  {
    id: 'maintenance',
    title: 'Maintenance Mode',
    description: 'Widget in maintenance mode (disabled)',
  },
  {
    id: 'offline',
    title: 'Offline Mode',
    description: 'Widget in offline state',
  },
  {
    id: 'themed',
    title: 'Custom Theme',
    description: 'Widget with custom blue theme',
  },
] as const;
