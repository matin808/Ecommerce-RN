import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
};

export type OnboardingScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Onboarding'
>;

export type HomeScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
