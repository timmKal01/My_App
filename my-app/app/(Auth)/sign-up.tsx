import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const SignUp = () => {
  return (
    <View>
      <Text>Sign UP</Text>
      <Link href="/(Auth)/sign-up">Create Account</Link>
    </View>
  );
};
export default SignUp;
