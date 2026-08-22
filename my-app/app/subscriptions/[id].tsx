import { View, Text } from 'react-native'
import React from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

const SafeAreaView = styled(RNSafeAreaView);

const subscriptions = {
  spotify: {
    name: 'Spotify Premium',
    price: '$10.99/month',
    description: 'Music streaming service with millions of songs and podcasts.',
  },
  claude: {
    name: 'Claude Pro',
    price: '$20/month',
    description: 'AI assistant subscription with advanced capabilities.',
  },
};

const SubscriptionDetails = () => {
  const {id}= useLocalSearchParams<{id: string}>();
  const subscription = subscriptions[id as keyof typeof subscriptions];

  if (!subscription) {
    return (
      <SafeAreaView className='flex-1 bg-background p-5'>
        <Text className="text-xl font-bold mb-4">Subscription Not Found</Text>
        <Text className="mb-4">The subscription ID &quot;{id}&quot; is not recognized.</Text>
        <Link href="/public">Go Back</Link>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      <Text className="text-2xl font-bold mb-4">{subscription.name}</Text>
      <Text className="text-lg font-semibold mb-2">{subscription.price}</Text>
      <Text className="mb-4">{subscription.description}</Text>
      <Link href="/public">Go Back</Link>
    </SafeAreaView>
  );
};

export default SubscriptionDetails
