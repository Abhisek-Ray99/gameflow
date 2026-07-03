export const colors = {
  // Brand Colors
  yellow: '#FFDF17',
  amber: '#FFB300',
  pinkRed: '#DB1A4E',
  deepPurple: '#2C2263', // Used for primary button

  // Primary Theme Colors matching PDF
  background: '#5A4FC4', // Full screen background (violet-purple)
  cardBackground: '#463AA3', // Card option background (darker purple)
  buttonBackground: '#2C2263', // Navy button background
  buttonSecondaryBackground: '#FFFFFF', // White button background
  textPrimary: '#FFFFFF', // Primary text is now white
  textSecondary: 'rgba(255, 255, 255, 0.75)', // Subtitles in light-purple/white
  border: '#FFFFFF', // Selection border
  white: '#FFFFFF',
  
  // Interactive / State Colors
  error: '#EF4444',
  success: '#10B981',
  disabled: 'rgba(255, 255, 255, 0.3)',
  disabledText: 'rgba(255, 255, 255, 0.5)',
  overlay: 'rgba(0, 0, 0, 0.4)',

  // Highlights
  purpleHighlight: 'rgba(255, 255, 255, 0.1)',
  pinkHighlight: 'rgba(219, 26, 78, 0.05)',
  yellowHighlight: 'rgba(255, 223, 23, 0.1)',
};

export type ColorsType = typeof colors;
