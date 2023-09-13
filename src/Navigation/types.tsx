import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  AuthStack: undefined;
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
};

export type OnboardingScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Onboarding'
>;

export type HomeScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type LoginScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;
export type RegisterScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;
export type ForgetScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgetPassword'
>;
