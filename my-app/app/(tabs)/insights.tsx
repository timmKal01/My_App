import { Text } from 'react-native';
import React from 'react';
import { SafeAreaView as RNSafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { components } from '@/constants/theme';

const SafeAreaView = styled(RNSafeAreaView);

const Insights = () => {
  const insets = useSafeAreaInsets();
  const tabBar = components.tabBar;
  const bottomPadding = tabBar.height + Math.max(insets.bottom, tabBar.horizontalInset);

  return (
    <SafeAreaView className='flex-1 bg-background p-5' style={{ paddingBottom: bottomPadding }}>
      <Text>Insights</Text>
    </SafeAreaView>
  );
};

export default Insights;
