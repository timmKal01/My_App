import '@/global.css';
import { Link } from 'expo-router';
import { Text } from 'react-native';
import {
  SafeAreaView as RNSafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { components } from '@/constants/theme';

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  const insets = useSafeAreaInsets();
  const tabBar = components.tabBar;
  const bottomPadding =
    tabBar.height + Math.max(insets.bottom, tabBar.horizontalInset);

  return (
    <SafeAreaView
      className="flex-1 bg-background p-5"
      style={{ paddingBottom: bottomPadding }}
    >
      <Text className="text-7xl font-sans-bold text-primary">Home</Text>
      <Link
        href="/onboarding"
        className="mt-4 font-sans-bold rounded bg-primary text-white p-4"
      >
        Go to Onboarding
      </Link>
      <Link
        href="/(Auth)/sign-in"
        className="mt-4 font-sans-bold rounded bg-primary text-white p-4"
      >
        Sign In
      </Link>
      <Link
        href="/(Auth)/sign-up"
        className="mt-4 font-sans-bold rounded bg-primary text-white p-4"
      >
        Sign Up
      </Link>
    </SafeAreaView>
  );
}
