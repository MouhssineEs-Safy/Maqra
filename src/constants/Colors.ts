export const Colors = {
  // Primary Theme based on reference
  primary: '#2B6777', // Deep Teal
  secondary: '#52AB98', // Lighter Teal
  accent: '#C8D8E4', // Pale Blue/Gray
  
  // UI Colors
  background: '#FAFAFA', // Clean White/Off-white
  surface: '#FFFFFF', // Pure White for cards
  text: '#1A1A1A', // Very Dark Gray for high contrast
  textMuted: '#8B95A5', // Medium Gray for subtitles
  border: '#E8ECF1', // Light border color

  // Status Colors
  reading: '#2B6777',
  completed: '#52AB98',
  toRead: '#8B95A5',
  onHold: '#C8D8E4',
};

export const Shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  soft: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  floating: {
    shadowColor: '#2B6777',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  }
};
