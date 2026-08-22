import { View, Text } from 'react-native';
import React from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

const SafeAreaView = styled(RNSafeAreaView);

const subscriptions: Record<string, { name: string; description: string }> = {
  spotify: {
    name: 'Spotify',
    description: 'Music streaming subscription',
  },
  claude: {
    name: 'Claude Max',
    description: 'AI assistant subscription',
  },
};

const SubscriptionDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const subscription = id ? subscriptions[id] : undefined;

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      {subscription ? (
        <>
          <Text className="text-2xl font-bold mb-2">{subscription.name}</Text>
          <Text className="text-lg mb-4">{subscription.description}</Text>
          <Text className="text-sm text-gray-600">ID: {id}</Text>
        </>
      ) : (
        <Text className="text-xl text-destructive">Subscription not found</Text>
      )}
      <Link href="/public" className="mt-4 text-primary">
        Go Back
      </Link>
    </SafeAreaView>
  );
};

export default SubscriptionDetails;
