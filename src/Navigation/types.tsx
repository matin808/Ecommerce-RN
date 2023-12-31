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
  Orders: undefined;
  Checkout: undefined;
  Settings: undefined;
  UpdateProfile: undefined;
  Profile: undefined;
  OrderDetails: {id: number; token: string};
  ChangePassword: undefined;
  AddressScreen: {id: any};
  OrderCompleted: undefined;
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
export type HomeScreenNavigationProps = NativeStackScreenProps<any, 'Home'>;
export type ProductDetailsNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetails'
>;
export type CartNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Cart'
>;
export type SettingsNavigationProps = NativeStackScreenProps<any, 'Settings'>;
export type OrderNavigationProps = NativeStackScreenProps<any, 'Orders'>;
export type CheckoutNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Checkout'
>;
export type UpdateProfileNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'UpdateProfile'
>;
export type ProfileNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;
export type OrderDetailsNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'OrderDetails'
>;
export type AddressScreensNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'AddressScreen'
>;
export type OrderCompletedScreensNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'OrderCompleted'
>;
export type ChangePassowrdScreensNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'ChangePassword'
>;
