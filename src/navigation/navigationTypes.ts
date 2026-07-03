import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  LanguageSelection: undefined;
  Welcome: undefined;
  PlushSelection: undefined;
  Comparison: undefined;
  ParentalGate: {
    targetScreen: keyof RootStackParamList;
    targetParams?: {
      selectedPlushId?: string;
    };
  };
  LandingHome: {
    selectedPlushId?: string;
  };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type RoutePropType<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
