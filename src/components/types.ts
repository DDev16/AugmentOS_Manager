import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Homepage: undefined;
  SettingsPage: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Homepage'>;
