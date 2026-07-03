import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigationTypes';

// Import Screens
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PlushSelectionScreen from '../screens/PlushSelectionScreen';
import ComparisonScreen from '../screens/ComparisonScreen';
import ParentalGateScreen from '../screens/ParentalGate';
import LandingHomeScreen from '../screens/LandingHomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="LanguageSelection"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FCFCFA' }, // Light-mode background
      }}
    >
      <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="PlushSelection" component={PlushSelectionScreen} />
      <Stack.Screen name="Comparison" component={ComparisonScreen} />
      <Stack.Screen name="ParentalGate" component={ParentalGateScreen} />
      <Stack.Screen name="LandingHome" component={LandingHomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
