import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Onboarding: undefined;
  Tabs: undefined;
  AuthStack: undefined;
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  CategoryItems: {name: string};
  Home: undefined;
  ProductDetails: {id: number; name: string};
  Cart: undefined;
};

export type MyNavigationProp = NavigationProp<ParamListBase>;

export type OnboardingScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Onboarding'
>;

export type TabsScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Tabs'
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
export type CategoryItemsScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'CategoryItems'
>;
export type HomeScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type ProductDetailsNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetails'
>;
export type CartNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Cart'
>;
