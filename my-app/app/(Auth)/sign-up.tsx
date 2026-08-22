import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

const SafeAreaView = styled(RNSafeAreaView);


const SignUp = () => {
  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      <Text>Sign UP</Text>
      <Link href="/(Auth)/sign-in">Log into Account</Link>
    </SafeAreaView>
  );
};
export default SignUp;
